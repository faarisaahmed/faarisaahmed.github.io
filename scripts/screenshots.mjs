// Capture a preview image of every live deployment for the Live page.
//
//   npm i --no-save puppeteer-core
//   node scripts/screenshots.mjs [repo ...]        # all, or just the named repos
//   node scripts/screenshots.mjs --missing         # only deployments without an image yet
//   python3 scripts/build.py                       # picks up the new images
//
// Set CHROME=/path/to/chrome if Chrome isn't in the default macOS location.
import { mkdir } from "node:fs/promises";
import { existsSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer-core";

const root = new URL("..", import.meta.url);
const data = JSON.parse(readFileSync(new URL("data/projects.json", root)));
const args = process.argv.slice(2);
const missing = args.includes("--missing");
const only = args.filter((a) => !a.startsWith("--"));
const chrome = process.env.CHROME || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const targets = data.groups
  .flatMap((g) => g.projects)
  .map((p) => ({ name: p.name, url: p.live || p.links.find((l) => l.primary)?.url }))
  .filter((t) => t.url && (!only.length || only.includes(t.name)))
  .filter((t) => !missing || !existsSync(new URL(`assets/shots/${t.name}.webp`, root)));

// Some pages need a nudge before they show anything worth capturing.
const prep = {
  // A fresh new tab is just a clock on grey, so set one up the way you'd use it.
  "Alternative-NewTab": async (page) => {
    const wallpaper = "data:image/jpeg;base64," + readFileSync(new URL("scripts/newtab-wallpaper.jpg", root)).toString("base64");
    const sites = [
      ["Google", "google.com"], ["YouTube", "youtube.com"], ["Gmail", "mail.google.com"], ["GitHub", "github.com"],
      ["Reddit", "reddit.com"], ["Wikipedia", "wikipedia.org"], ["Maps", "maps.google.com"], ["Spotify", "spotify.com"],
    ];
    const layout = [
      { type: "clock", x: 6, y: 2, w: 2, h: 2 },
      { type: "search-bar", x: 5, y: 4, w: 4, h: 1 },
      ...sites.map(([name, host], i) => ({ type: "link-small", x: 3 + i, y: 5, w: 1, h: 1, name, url: `https://${host}` })),
    ];
    await page.evaluate((wallpaper, layout) => {
      localStorage.setItem("wallpaperImage", wallpaper);
      localStorage.setItem("tabLayout", JSON.stringify(layout));
    }, wallpaper, layout);
    await page.reload({ waitUntil: "networkidle2" });
    await new Promise((r) => setTimeout(r, 1500));
  },
  mc2: async (page) => {
    const skip = await page.$("xpath/.//*[normalize-space()='Skip for now']");
    await skip?.click();
    await new Promise((r) => setTimeout(r, 1000));
  },
  "super-mario-bros-rl-model": async (page) => {
    await page.mouse.click(640, 400);
    await new Promise((r) => setTimeout(r, 12000));
  },
};

if (!targets.length) process.exit(0);
await mkdir(new URL("assets/shots/", root), { recursive: true });
const browser = await puppeteer.launch({ executablePath: chrome, headless: "new", args: ["--use-angle=metal", "--enable-gpu"] });

for (const t of targets) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  try {
    await page.goto(t.url, { waitUntil: "networkidle2", timeout: 45000 });
  } catch {
    console.warn(`  (timed out waiting for ${t.url}, capturing anyway)`);
  }
  await new Promise((r) => setTimeout(r, 4000));
  await prep[t.name]?.(page);
  const path = fileURLToPath(new URL(`assets/shots/${t.name}.webp`, root));
  await page.screenshot({ path, type: "webp", quality: 78 });
  console.log(`✓ ${t.name}`);
  await page.close();
}

await browser.close();
