(() => {
  "use strict";

  const $ = (sel, root = document) => root.querySelector(sel);
  const USER = "faarisaahmed";
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

  const ICONS = {
    mask: '<svg viewBox="0 0 24 24" class="i-fill"><path d="M7.4 10.9C5.5 8.8 4.4 5.5 5.1 1.4c1.5 2.1 3.4 5 4.9 8a8 8 0 0 1 4 0c1.5-3 3.4-5.9 4.9-8 .7 4.1-.4 7.4-2.3 9.5 1.9 1.2 3.1 3 3.1 5 0 3.9-3.8 6.6-7.7 6.6S4.3 19.8 4.3 15.9c0-2 1.2-3.8 3.1-5Z"/><ellipse cx="8.9" cy="15.6" rx="1.85" ry="2.75" fill="#0b0e14" opacity=".92"/><ellipse cx="15.1" cy="15.6" rx="1.85" ry="2.75" fill="#0b0e14" opacity=".92"/></svg>',
    gamepad: '<svg viewBox="0 0 24 24" class="i"><path d="M6 11h4M8 9v4M15 12h.01M18 10h.01"/><path d="M17.3 5H6.7a4 4 0 0 0-3.96 3.44l-.9 6.3A2.6 2.6 0 0 0 4.4 17.7c.8 0 1.53-.4 1.98-1.06L8 14h8l1.62 2.64c.45.66 1.19 1.06 1.98 1.06a2.6 2.6 0 0 0 2.57-2.96l-.9-6.3A4 4 0 0 0 17.3 5Z"/></svg>',
    globe: '<svg viewBox="0 0 24 24" class="i"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></svg>',
    chart: '<svg viewBox="0 0 24 24" class="i"><path d="M3 3v18h18"/><path d="m7 15 4-4 3 3 6-7"/><path d="M16 7h4v4"/></svg>',
    book: '<svg viewBox="0 0 24 24" class="i"><path d="M4 19.5V5a2 2 0 0 1 2-2h13v15H6.5A2.5 2.5 0 0 0 4 20.5 2.5 2.5 0 0 0 6.5 23H19"/><path d="M8 7h7M8 11h5"/></svg>',
    wrench: '<svg viewBox="0 0 24 24" class="i"><path d="M14.7 6.3a4 4 0 0 0 5 5L21 13a7 7 0 0 1-2 2l-8.5 8.5a2.1 2.1 0 0 1-3-3L16 12a7 7 0 0 1 2-2"/><path d="M14.7 6.3 17 4l3 3-2.3 2.3"/></svg>',
    spark: '<svg viewBox="0 0 24 24" class="i"><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6"/></svg>',
    chevron: '<svg viewBox="0 0 24 24" class="i"><path d="m6 9 6 6 6-6"/></svg>',
    readme: '<svg viewBox="0 0 24 24" class="i"><path d="M2 5h6a4 4 0 0 1 4 4v11a3 3 0 0 0-3-3H2zM22 5h-6a4 4 0 0 0-4 4v11a3 3 0 0 1 3-3h7z"/></svg>',
    external: '<svg viewBox="0 0 24 24" class="i"><path d="M7 17 17 7M8 7h9v9"/></svg>',
    github: '<svg viewBox="0 0 16 16" class="i-fill"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.4 7.4 0 0 1 2-.27c.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z"/></svg>',
    play: '<svg viewBox="0 0 24 24" class="i"><path d="M7 4v16l13-8z"/></svg>',
    clock: '<svg viewBox="0 0 24 24" class="i"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    star: '<svg viewBox="0 0 24 24" class="i"><path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/></svg>',
    tag: '<svg viewBox="0 0 24 24" class="i"><path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0L3 13V3h10l7.6 7.6a2 2 0 0 1 0 2.8Z"/><circle cx="7.5" cy="7.5" r="1.5"/></svg>',
    download: '<svg viewBox="0 0 24 24" class="i"><path d="M12 3v12M7 10l5 5 5-5M5 21h14"/></svg>',
  };

  const LANG_COLORS = {
    "C#": "#178600", Python: "#3572A5", JavaScript: "#f1e05a", TypeScript: "#3178c6",
    HTML: "#e34c26", CSS: "#563d7c", Swift: "#F05138", Java: "#b07219", Go: "#00ADD8",
    Rust: "#dea584", Lua: "#000080", Shell: "#89e051", "C++": "#f34b7d", C: "#555555",
  };

  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
  function ago(iso) {
    const s = (new Date(iso) - Date.now()) / 1000;
    const units = [["year", 31536000], ["month", 2592000], ["week", 604800], ["day", 86400], ["hour", 3600], ["minute", 60]];
    for (const [u, n] of units) if (Math.abs(s) >= n) return rtf.format(Math.round(s / n), u);
    return "just now";
  }

  const byName = new Map();
  let data;

  /* ---------- Render ---------- */
  function linkButtons(p, { readme = false, size = "btn-sm" } = {}) {
    const out = [];
    if (readme && p.readme) {
      out.push(`<button type="button" class="btn btn-accent ${size}" data-readme="${esc(p.name)}">${ICONS.readme} Read the README</button>`);
    }
    const primaryExtra = p.links.filter((l) => l.primary);
    for (const l of primaryExtra) {
      out.push(`<a class="btn btn-primary ${size}" href="${esc(l.url)}" target="_blank" rel="noopener">${ICONS.play} ${esc(l.label)}</a>`);
    }
    if (p.live) {
      const cls = primaryExtra.length ? "btn-ghost" : "btn-primary";
      out.push(`<a class="btn ${cls} ${size}" href="${esc(p.live)}" target="_blank" rel="noopener">${ICONS.external} ${esc(p.liveLabel)}</a>`);
    }
    out.push(`<a class="btn btn-ghost ${size}" href="${esc(p.url)}" target="_blank" rel="noopener">${ICONS.github} GitHub</a>`);
    if (p.release) {
      out.push(`<a class="btn btn-ghost ${size}" href="${esc(p.release.url)}" target="_blank" rel="noopener">${ICONS.download} ${esc(p.release.tag)}</a>`);
    }
    for (const l of p.links.filter((l) => !l.primary)) {
      out.push(`<a class="btn btn-ghost ${size}" href="${esc(l.url)}" target="_blank" rel="noopener">${ICONS.external} ${esc(l.label)}</a>`);
    }
    return out.join("");
  }

  function renderItem(p, i) {
    const desc = p.description && p.description !== p.tagline ? p.description : "";
    const lang = p.language ? `<span class="lang" style="--lang:${LANG_COLORS[p.language] || "#8b93a1"}"><i></i>${esc(p.language)}</span>` : "";
    const meta = [
      p.language && `<li>${lang}</li>`,
      `<li>${ICONS.clock} Updated ${ago(p.pushed)}</li>`,
      p.stars > 0 && `<li>${ICONS.star} ${p.stars} star${p.stars === 1 ? "" : "s"}</li>`,
      p.release && `<li>${ICONS.tag} ${esc(p.release.tag)}</li>`,
    ].filter(Boolean).join("");

    return `
      <li class="item in-view" id="p-${esc(p.name)}" data-name="${esc(p.name)}" style="--i:${Math.min(i, 8)}">
        <button class="item-head" type="button" aria-expanded="false" aria-controls="panel-${esc(p.name)}">
          <span class="item-num">${String(i + 1).padStart(2, "0")}</span>
          <span class="item-main">
            <span class="item-title">${esc(p.title)}${p.live || p.links.some((l) => l.primary) ? '<span class="badge badge-live">Live</span>' : ""}${p.release ? `<span class="badge badge-release">${esc(p.release.tag)}</span>` : ""}</span>
            <span class="item-tagline">${esc(p.tagline)}</span>
          </span>
          <span class="item-side">${lang}<span class="chev">${ICONS.chevron}</span></span>
        </button>
        <div class="item-panel" id="panel-${esc(p.name)}" role="region" aria-label="${esc(p.title)} details">
          <div>
            <div class="item-body">
              <p class="item-desc">${esc(desc || p.tagline)}</p>
              ${p.tags.length ? `<div class="tags">${p.tags.map((t) => `<span class="tag">${esc(t)}</span>`).join("")}</div>` : ""}
              <ul class="meta">${meta}</ul>
              <div class="actions">${linkButtons(p, { readme: true })}</div>
            </div>
          </div>
        </div>
      </li>`;
  }

  function render() {
    const { profile, groups } = data;
    $("#bio").textContent = profile.bio || "";
    if (profile.location) $("#location").textContent = profile.location;

    const all = groups.flatMap((g) => g.projects);
    const silksong = groups.find((g) => g.id === "silksong");
    const stats = [
      [all.length, "Projects"],
      silksong && [silksong.projects.length, "Silksong mods"],
      [all.filter((p) => p.live || p.links.some((l) => l.primary)).length, "Live to try"],
    ].filter(Boolean);
    $("#stats").innerHTML = stats.map(([n, l]) => `<div><dt>${l}</dt><dd data-count="${n}">0</dd></div>`).join("");

    $("#chips").innerHTML = groups.map((g) =>
      `<a class="chip" href="#${g.id}" data-group="${g.id}" style="--chip:${g.accent}">${esc(g.title)} <span class="count">${g.projects.length}</span></a>`
    ).join("");

    $("#groups").innerHTML = groups.map((g) => `
      <section class="group" id="${g.id}" style="--accent:${g.accent}" aria-labelledby="h-${g.id}">
        <div class="group-head">
          <div class="group-icon">${ICONS[g.icon] || ICONS.spark}</div>
          <div class="group-title">
            <h2 id="h-${g.id}">${esc(g.title)} <span class="n">${String(g.projects.length).padStart(2, "0")}</span></h2>
            <p>${esc(g.blurb)}</p>
          </div>
        </div>
        <ul class="list">${g.projects.map(renderItem).join("")}</ul>
      </section>`).join("");

    for (const g of groups) for (const p of g.projects) byName.set(p.name, { ...p, group: g });
  }

  /* ---------- Count-up ---------- */
  function countUp() {
    document.querySelectorAll("[data-count]").forEach((el, idx) => {
      const target = +el.dataset.count;
      if (reduceMotion) { el.textContent = target; return; }
      const dur = 1400, start = performance.now() + 500 + idx * 120;
      const tick = (now) => {
        const t = Math.min(1, Math.max(0, (now - start) / dur));
        el.textContent = Math.round(target * (1 - Math.pow(1 - t, 4)));
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  }

  /* ---------- Interactions ---------- */
  function toggle(item, force) {
    const open = force ?? !item.classList.contains("open");
    item.classList.toggle("open", open);
    item.querySelector(".item-head").setAttribute("aria-expanded", open);
  }

  function bindList() {
    const groupsEl = $("#groups");

    groupsEl.addEventListener("click", (e) => {
      const readmeBtn = e.target.closest("[data-readme]");
      if (readmeBtn) { openReadme(readmeBtn.dataset.readme); return; }
      const head = e.target.closest(".item-head");
      if (head) toggle(head.closest(".item"));
    });

    groupsEl.addEventListener("pointermove", (e) => {
      const item = e.target.closest(".item");
      if (!item) return;
      const r = item.getBoundingClientRect();
      item.style.setProperty("--mx", `${e.clientX - r.left}px`);
      item.style.setProperty("--my", `${e.clientY - r.top}px`);
    });

    // Reveal rows as they scroll in, then drop the helper classes so hover transitions aren't delayed.
    const io = new IntersectionObserver((entries) => {
      for (const en of entries) {
        if (!en.isIntersecting) continue;
        const el = en.target;
        el.classList.add("shown");
        io.unobserve(el);
        const done = () => el.classList.remove("in-view", "shown");
        el.addEventListener("transitionend", (ev) => ev.propertyName === "transform" && done(), { once: false });
        setTimeout(done, 1400);
      }
    }, { rootMargin: "0px 0px -8% 0px" });
    document.querySelectorAll(".in-view").forEach((el) => (reduceMotion ? el.classList.remove("in-view") : io.observe(el)));
  }

  function bindToolbar() {
    const bar = $("#toolbar");
    const sentinel = document.createElement("div");
    bar.before(sentinel);
    new IntersectionObserver(([en]) => bar.classList.toggle("stuck", !en.isIntersecting)).observe(sentinel);

    const chips = [...document.querySelectorAll(".chip")];
    const setActive = (id) => chips.forEach((c) => {
      const on = c.dataset.group === id;
      if (on && !c.classList.contains("active")) c.scrollIntoView({ block: "nearest", inline: "nearest", behavior: reduceMotion ? "auto" : "smooth" });
      c.classList.toggle("active", on);
    });

    const sections = [...document.querySelectorAll(".group")];
    const onScroll = () => {
      const y = innerHeight * 0.35;
      let current = null;
      for (const s of sections) {
        if (s.hidden) continue;
        if (s.getBoundingClientRect().top <= y) current = s.id;
      }
      setActive(current);
    };
    addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  function bindSearch() {
    const input = $("#search");
    const empty = $("#empty");

    const apply = () => {
      const q = input.value.trim().toLowerCase();
      const terms = q.split(/\s+/).filter(Boolean);
      let shown = 0;
      document.querySelectorAll(".group").forEach((sec) => {
        let n = 0;
        sec.querySelectorAll(".item").forEach((item) => {
          const p = byName.get(item.dataset.name);
          const hay = [p.title, p.name, p.tagline, p.description, p.language, p.group.title, ...p.tags].join(" ").toLowerCase();
          const match = terms.every((t) => hay.includes(t));
          item.hidden = !match;
          if (match) { n++; item.classList.remove("in-view", "shown"); }
        });
        sec.hidden = n === 0;
        shown += n;
      });
      document.querySelectorAll(".chip").forEach((c) => (c.hidden = $(`#${c.dataset.group}`).hidden));
      empty.hidden = shown > 0;
      $("#empty-q").textContent = `“${input.value.trim()}”`;
    };

    input.addEventListener("input", () => {
      apply();
      if (input.value && scrollY < $("#projects").offsetTop - 120) {
        $("#projects").scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
      }
    });
    input.addEventListener("keydown", (e) => {
      if (e.key === "Escape") { input.value = ""; apply(); input.blur(); }
    });
    $("#empty-clear").addEventListener("click", () => { input.value = ""; apply(); input.focus(); });

    addEventListener("keydown", (e) => {
      const typing = /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement?.tagName) || document.activeElement?.isContentEditable;
      if (e.key === "/" && !typing && !$("#modal").open) { e.preventDefault(); input.focus(); }
    });
  }

  /* ---------- README modal ---------- */
  const modal = $("#modal");
  const readmeEl = $("#readme");
  const cache = new Map();

  function libsReady() {
    return new Promise((resolve) => {
      const check = () => (window.marked && window.DOMPurify ? resolve() : setTimeout(check, 40));
      check();
    });
  }

  const slug = (s) => s.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");
  const isRelative = (u) => u && !/^([a-z][a-z0-9+.-]*:|\/\/|#)/i.test(u);

  function renderMarkdown(md, p) {
    const raw = `https://raw.githubusercontent.com/${USER}/${p.name}/${p.branch}/`;
    const blob = `https://github.com/${USER}/${p.name}/blob/${p.branch}/`;
    const html = DOMPurify.sanitize(marked.parse(md, { gfm: true }), { ADD_ATTR: ["target"] });
    const tpl = document.createElement("template");
    tpl.innerHTML = html;
    const root = tpl.content;

    const first = root.firstElementChild;
    if (first && first.tagName === "H1") first.remove();

    const fix = (u, base) => new URL(u.replace(/^\//, ""), base).href;
    root.querySelectorAll("img[src], video[src], source[src]").forEach((el) => {
      const src = el.getAttribute("src");
      if (isRelative(src)) el.setAttribute("src", fix(src, raw));
      el.setAttribute("loading", "lazy");
    });
    root.querySelectorAll("source[srcset]").forEach((el) => {
      const s = el.getAttribute("srcset");
      if (isRelative(s)) el.setAttribute("srcset", fix(s, raw));
    });
    root.querySelectorAll("a[href]").forEach((a) => {
      const href = a.getAttribute("href");
      if (href.startsWith("#")) { a.dataset.anchor = href.slice(1); return; }
      if (isRelative(href)) a.setAttribute("href", fix(href, blob));
      a.target = "_blank";
      a.rel = "noopener";
    });
    const seen = {};
    root.querySelectorAll("h1,h2,h3,h4,h5,h6").forEach((h) => {
      let id = slug(h.textContent);
      if (seen[id] != null) id = `${id}-${++seen[id]}`; else seen[id] = 0;
      h.id = `readme-${id}`;
    });
    root.querySelectorAll("table").forEach((t) => {
      const wrap = document.createElement("div");
      wrap.className = "table-wrap";
      t.replaceWith(wrap);
      wrap.append(t);
    });

    readmeEl.replaceChildren(root);
    if (window.hljs) readmeEl.querySelectorAll("pre code").forEach((c) => {
      if (/language-/.test(c.className)) { try { hljs.highlightElement(c); } catch {} }
    });
  }

  async function openReadme(name, { push = true } = {}) {
    const p = byName.get(name);
    if (!p) return;

    modal.style.setProperty("--accent", p.group.accent);
    $("#modal-group").textContent = p.group.title;
    $("#modal-title").textContent = p.title;
    $("#modal-tagline").textContent = p.tagline;
    $("#modal-actions").innerHTML = linkButtons(p);
    $("#modal-body").scrollTop = 0;

    if (!modal.open) {
      modal.showModal();
      $("#modal-body").focus({ preventScroll: true });
      document.body.classList.add("modal-open");
    }
    if (push && location.hash !== `#/${name}`) history.pushState({ readme: name }, "", `#/${name}`);

    if (!p.readme) {
      readmeEl.innerHTML = `<div class="readme-state"><p>No README for this one yet.</p><a class="btn btn-ghost btn-sm" href="${esc(p.url)}" target="_blank" rel="noopener">${ICONS.github} Browse the code</a></div>`;
      return;
    }

    readmeEl.innerHTML = `<div class="skeleton">${Array.from({ length: 9 }, (_, i) => `<span style="width:${i ? 62 + ((i * 29) % 36) : 45}%"></span>`).join("")}</div>`;
    try {
      let md = cache.get(name);
      if (!md) {
        const res = await fetch(`data/readmes/${encodeURIComponent(name)}.md`);
        if (!res.ok) throw new Error(res.status);
        md = await res.text();
        cache.set(name, md);
      }
      await libsReady();
      if ($("#modal-title").textContent !== p.title) return; // user already moved on
      renderMarkdown(md, p);
    } catch {
      readmeEl.innerHTML = `<div class="readme-state"><p>Couldn't load the README.</p><a class="btn btn-ghost btn-sm" href="${esc(p.url)}#readme" target="_blank" rel="noopener">${ICONS.github} Read it on GitHub</a></div>`;
    }
  }

  function closeModal() {
    if (modal.open) modal.close();
  }

  modal.addEventListener("close", () => {
    document.body.classList.remove("modal-open");
    if (!location.hash.startsWith("#/")) return;
    if (history.state?.readme) history.back();
    else history.replaceState(null, "", location.pathname + location.search);
  });
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
    const a = e.target.closest("a[data-anchor]");
    if (a) {
      e.preventDefault();
      const target = readmeEl.querySelector(`#readme-${CSS.escape(a.dataset.anchor)}`);
      target?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
    }
  });
  $("#modal-close").addEventListener("click", () => closeModal());

  function routeFromHash() {
    const m = location.hash.match(/^#\/(.+)$/);
    if (m) openReadme(decodeURIComponent(m[1]), { push: false });
    else closeModal();
  }
  addEventListener("popstate", routeFromHash);

  /* ---------- Lumaflies ---------- */
  function motes() {
    const canvas = $("#motes");
    const ctx = canvas.getContext("2d");
    if (reduceMotion || !ctx) { canvas.remove(); return; }
    let w, h, dpr, flies = [], raf;

    const make = (initial) => ({
      x: Math.random() * w,
      y: initial ? Math.random() * h : h + 20,
      r: 0.5 + Math.random() * 1.4,
      vx: (Math.random() - 0.5) * 0.12,
      vy: -(0.08 + Math.random() * 0.28),
      phase: Math.random() * Math.PI * 2,
      speed: 0.004 + Math.random() * 0.012,
      warm: Math.random() < 0.18,
    });

    const resize = () => {
      dpr = Math.min(devicePixelRatio || 1, 2);
      w = innerWidth; h = innerHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(Math.min(48, (w * h) / 30000));
      flies = Array.from({ length: count }, () => make(true));
    };

    const frame = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";
      for (const f of flies) {
        f.phase += f.speed;
        f.x += f.vx + Math.sin(f.phase) * 0.18;
        f.y += f.vy;
        if (f.y < -20 || f.x < -20 || f.x > w + 20) Object.assign(f, make(false));
        const a = 0.15 + 0.45 * (0.5 + 0.5 * Math.sin(f.phase * 1.7));
        const R = f.r * 7;
        const g = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, R);
        const c = f.warm ? "240,214,160" : "196,214,245";
        g.addColorStop(0, `rgba(${c},${a})`);
        g.addColorStop(0.18, `rgba(${c},${a * 0.45})`);
        g.addColorStop(1, `rgba(${c},0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(f.x, f.y, R, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(frame);
    };

    resize();
    addEventListener("resize", () => { cancelAnimationFrame(raf); resize(); frame(); });
    document.addEventListener("visibilitychange", () => {
      cancelAnimationFrame(raf);
      if (!document.hidden) frame();
    });
    frame();
  }

  /* ---------- Boot ---------- */
  async function boot() {
    motes();
    try {
      const res = await fetch("data/projects.json", { cache: "no-cache" });
      data = await res.json();
    } catch {
      $("#groups").innerHTML = `<div class="empty"><p>Couldn't load projects.</p><a class="btn btn-ghost" href="https://github.com/${USER}?tab=repositories">See them on GitHub</a></div>`;
      return;
    }
    render();
    countUp();
    bindList();
    bindToolbar();
    bindSearch();
    routeFromHash();
  }

  boot();
})();
