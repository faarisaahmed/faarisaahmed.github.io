// Capture a preview image of every live deployment for the Live page.
//
//   npm i --no-save puppeteer-core
//   node scripts/screenshots.mjs [repo ...]        # all, or just the named repos
//   python3 scripts/build.py                       # picks up the new images
//
// Set CHROME=/path/to/chrome if Chrome isn't in the default macOS location.
import { mkdir } from "node:fs/promises";
import { readFileSync } from "node:fs";
import puppeteer from "puppeteer-core";

const root = new URL("..", import.meta.url);
const data = JSON.parse(readFileSync(new URL("data/projects.json", root)));
const only = process.argv.slice(2);
const chrome = process.env.CHROME || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const targets = data.groups
  .flatMap((g) => g.projects)
  .map((p) => ({ name: p.name, url: p.live || p.links.find((l) => l.primary)?.url }))
  .filter((t) => t.url && (!only.length || only.includes(t.name)));

// Some pages need a nudge before they show anything worth capturing.
const prep = {
  "super-mario-bros-rl-model": async (page) => {
    await page.mouse.click(640, 400);
    await new Promise((r) => setTimeout(r, 12000));
  },
};

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
  const path = new URL(`assets/shots/${t.name}.webp`, root).pathname;
  await page.screenshot({ path, type: "webp", quality: 78 });
  console.log(`✓ ${t.name}`);
  await page.close();
}

await browser.close();
