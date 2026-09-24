(() => {
  "use strict";

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const USER = "faarisaahmed";
  const PAGE = document.body.dataset.page;
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const behavior = reduceMotion ? "auto" : "smooth";

  const ICONS = {
    puzzle: '<svg viewBox="0 0 24 24" class="i"><path d="M19.4 14.6c.9 0 1.6-.8 1.6-1.7s-.7-1.6-1.6-1.6H18V8a2 2 0 0 0-2-2h-3.3V4.6c0-.9-.7-1.6-1.6-1.6s-1.7.7-1.7 1.6V6H6a2 2 0 0 0-2 2v3.3h1.4c1 0 1.7.8 1.7 1.7s-.8 1.6-1.7 1.6H4V18c0 1.1.9 2 2 2h3.4v-1.4c0-.9.7-1.7 1.6-1.7s1.7.8 1.7 1.7V20H16a2 2 0 0 0 2-2v-3.4z"/></svg>',
    gamepad: '<svg viewBox="0 0 24 24" class="i"><path d="M6 11h4M8 9v4M15 12h.01M18 10h.01"/><path d="M17.3 5H6.7a4 4 0 0 0-3.96 3.44l-.9 6.3A2.6 2.6 0 0 0 4.4 17.7c.8 0 1.53-.4 1.98-1.06L8 14h8l1.62 2.64c.45.66 1.19 1.06 1.98 1.06a2.6 2.6 0 0 0 2.57-2.96l-.9-6.3A4 4 0 0 0 17.3 5Z"/></svg>',
    globe: '<svg viewBox="0 0 24 24" class="i"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></svg>',
    chart: '<svg viewBox="0 0 24 24" class="i"><path d="M3 3v18h18"/><path d="m7 15 4-4 3 3 6-7"/><path d="M16 7h4v4"/></svg>',
    book: '<svg viewBox="0 0 24 24" class="i"><path d="M4 19.5V5a2 2 0 0 1 2-2h13v15H6.5A2.5 2.5 0 0 0 4 20.5 2.5 2.5 0 0 0 6.5 23H19"/><path d="M8 7h7M8 11h5"/></svg>',
    wrench: '<svg viewBox="0 0 24 24" class="i"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>',
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
    pin: '<svg viewBox="0 0 24 24" class="i"><path d="M12 17v5M9 3h6l-1 6 4 4v2H6v-2l4-4z"/></svg>',
    pinSm: '<svg viewBox="0 0 24 24" class="i" style="width:12px;height:12px"><path d="M12 17v5M9 3h6l-1 6 4 4v2H6v-2l4-4z"/></svg>',
    map: '<svg viewBox="0 0 24 24" class="i"><path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/></svg>',
    calendar: '<svg viewBox="0 0 24 24" class="i"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>',
    code: '<svg viewBox="0 0 24 24" class="i"><path d="m8 7-5 5 5 5M16 7l5 5-5 5"/></svg>',
    arrow: '<svg viewBox="0 0 24 24" class="i"><path d="M7 17 17 7M8 7h9v9"/></svg>',
    right: '<svg viewBox="0 0 24 24" class="i"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    close: '<svg viewBox="0 0 24 24" class="i"><path d="M6 6l12 12M18 6 6 18"/></svg>',
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

  const langTag = (lang) => lang ? `<span class="lang" style="--lang:${LANG_COLORS[lang] || "#8b93a1"}"><i></i>${esc(lang)}</span>` : "";
  const primaryLink = (p) => p.links.find((l) => l.primary);
  const isLive = (p) => Boolean(p.live || primaryLink(p));
  const host = (url) => url.replace(/^https?:\/\//, "").replace(/\/$/, "");

  let data;
  const byName = new Map();
  const all = () => [...byName.values()];

  /* ---------- Scrolling ---------- */
  // One helper for every programmatic scroll so nothing fights over the viewport.
  function scrollToY(y) {
    return new Promise((resolve) => {
      const target = Math.max(0, Math.min(y, document.documentElement.scrollHeight - innerHeight));
      if (Math.abs(scrollY - target) < 2) return resolve();
      let done = false;
      const finish = () => { if (!done) { done = true; removeEventListener("scrollend", finish); resolve(); } };
      addEventListener("scrollend", finish, { once: true });
      setTimeout(finish, 1200);
      scrollTo({ top: target, behavior });
    });
  }

  /* ---------- Shared rendering ---------- */
  function linkButtons(p, { readme = false, size = "btn-sm" } = {}) {
    const out = [];
    if (readme && p.readme) {
      out.push(`<button type="button" class="btn btn-accent ${size}" data-readme="${esc(p.name)}">${ICONS.readme} Read the README</button>`);
    }
    const primary = p.links.filter((l) => l.primary);
    for (const l of primary) {
      out.push(`<a class="btn btn-primary ${size}" href="${esc(l.url)}" target="_blank" rel="noopener">${ICONS.play} ${esc(l.label)}</a>`);
    }
    if (p.live) {
      out.push(`<a class="btn ${primary.length ? "btn-ghost" : "btn-primary"} ${size}" href="${esc(p.live)}" target="_blank" rel="noopener">${ICONS.external} ${esc(p.liveLabel)}</a>`);
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

  function card(p, i) {
    const live = primaryLink(p)?.url || p.live;
    return `
      <article class="card spot in-view" style="--accent:${p.group.accent};--i:${i}">
        <button class="card-hit" type="button" data-readme="${esc(p.name)}" aria-label="Open ${esc(p.title)}"></button>
        <div class="card-top">
          <span class="card-group">${esc(p.group.title)}</span>
          ${isLive(p) ? '<span class="badge badge-live">Live</span>' : ""}
        </div>
        <h3>${esc(p.title)}</h3>
        <p>${esc(p.tagline)}</p>
        <div class="card-foot">
          ${langTag(p.language)}
          <div class="card-links">
            ${live ? `<a class="icon-btn" href="${esc(live)}" target="_blank" rel="noopener" aria-label="Open live site" title="Open live site">${ICONS.arrow}</a>` : ""}
            <a class="icon-btn" href="${esc(p.url)}" target="_blank" rel="noopener" aria-label="GitHub repository" title="GitHub">${ICONS.github}</a>
          </div>
        </div>
      </article>`;
  }

  const pinned = () => data.pinned.map((n) => byName.get(n)).filter(Boolean);

  function countUp() {
    $$("[data-count]").forEach((el, idx) => {
      const target = +el.dataset.count;
      if (reduceMotion) { el.textContent = target; return; }
      const dur = 1400, start = performance.now() + 400 + idx * 120;
      const tick = (now) => {
        const t = Math.min(1, Math.max(0, (now - start) / dur));
        el.textContent = Math.round(target * (1 - Math.pow(1 - t, 4)));
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  }

  /* ---------- Global behaviour ---------- */
  function bindGlobal() {
    const nav = $(".site-nav");
    const onScroll = () => nav.classList.toggle("scrolled", scrollY > 8);
    addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    // Spotlight follows the pointer on any .spot surface.
    document.addEventListener("pointermove", (e) => {
      const el = e.target.closest?.(".spot");
      if (!el) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - r.left}px`);
      el.style.setProperty("--my", `${e.clientY - r.top}px`);
    }, { passive: true });

    document.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-readme]");
      if (btn) { e.preventDefault(); openReadme(btn.dataset.readme); }
    });
  }

  let revealIO;
  function reveal(root = document) {
    const els = $$(".in-view", root);
    if (reduceMotion) { els.forEach((el) => el.classList.remove("in-view")); return; }
    revealIO ??= new IntersectionObserver((entries) => {
      for (const en of entries) {
        if (!en.isIntersecting) continue;
        const el = en.target;
        revealIO.unobserve(el);
        el.classList.add("shown");
        // Drop the helper classes afterwards so hover transitions aren't delayed.
        setTimeout(() => el.classList.remove("in-view", "shown"), 900 + (+el.style.getPropertyValue("--i") || 0) * 40);
      }
    }, { rootMargin: "0px 0px -6% 0px" });
    els.forEach((el) => revealIO.observe(el));
  }

  /* ---------- About page ---------- */
  function pageAbout() {
    const { profile, groups } = data;
    const projects = all();
    const liveCount = projects.filter(isLive).length;

    $("#bio").textContent = profile.bio || "";
    if (profile.location) $("#location").textContent = profile.location;
    $("#stats").innerHTML = [
      [projects.length, "Projects"],
      [liveCount, "Live sites"],
      [groups.length, "Categories"],
    ].map(([n, l]) => `<div><dt>${l}</dt><dd data-count="${n}">0</dd></div>`).join("");
    countUp();

    $("#about-text").innerHTML = data.about.map((p) => `<p>${esc(p)}</p>`).join("");

    const langCounts = {};
    for (const p of projects) if (p.language) langCounts[p.language] = (langCounts[p.language] || 0) + 1;
    const topLangs = Object.entries(langCounts).sort((a, b) => b[1] - a[1]).slice(0, 4).map(([l]) => l);
    const since = new Date(profile.since).getFullYear();
    $("#facts").innerHTML = [
      profile.location && [ICONS.map, "Based in", esc(profile.location)],
      [ICONS.calendar, "Building since", since],
      [ICONS.code, "Writes mostly", `<span class="langs">${topLangs.map(langTag).join("")}</span>`],
      [ICONS.globe, "Live right now", `<a class="more" href="/live/">${liveCount} sites ${ICONS.right}</a>`],
    ].filter(Boolean).map(([icon, k, v]) => `<li><span>${icon}${k}</span><strong>${v}</strong></li>`).join("");

    $("#pinned").innerHTML = pinned().map(card).join("");

    $("#tiles").innerHTML = groups.map((g, i) => `
      <a class="tile spot in-view" href="/projects/#${g.id}" style="--accent:${g.accent};--i:${i}">
        <div class="tile-top">
          <div class="group-icon">${ICONS[g.icon] || ICONS.spark}</div>
          <span class="arrow">${ICONS.arrow}</span>
        </div>
        <div>
          <span class="count">${String(g.projects.length).padStart(2, "0")} projects</span>
          <h3>${esc(g.title)}</h3>
        </div>
        <p>${esc(g.blurb)}</p>
      </a>`).join("");

    const recent = [...projects].sort((a, b) => b.pushed.localeCompare(a.pushed)).slice(0, 6);
    $("#recent").innerHTML = recent.map((p, i) => `
      <li class="spot in-view" style="--accent:${p.group.accent};--i:${i}">
        <button type="button" data-readme="${esc(p.name)}">
          <span class="t"><strong>${esc(p.title)}</strong><span>${esc(p.group.title)}</span></span>
          <time datetime="${p.pushed}">${ago(p.pushed)}</time>
        </button>
      </li>`).join("");

    reveal();
  }

  /* ---------- Projects page ---------- */
  function pageProjects() {
    const { groups } = data;
    const pinnedSet = new Set(data.pinned);
    $("#count").textContent = all().length;
    $("#pinned").innerHTML = pinned().map(card).join("");

    const item = (p, i) => {
      const desc = p.description && p.description !== p.tagline ? p.description : p.tagline;
      const meta = [
        p.language && `<li>${langTag(p.language)}</li>`,
        `<li>${ICONS.clock} Updated ${ago(p.pushed)}</li>`,
        p.stars > 0 && `<li>${ICONS.star} ${p.stars} star${p.stars === 1 ? "" : "s"}</li>`,
        p.release && `<li>${ICONS.tag} ${esc(p.release.tag)}</li>`,
      ].filter(Boolean).join("");
      return `
        <li class="item spot in-view" id="p-${esc(p.name)}" data-name="${esc(p.name)}" style="--i:${Math.min(i, 6)}">
          <button class="item-head" type="button" aria-expanded="false" aria-controls="panel-${esc(p.name)}">
            <span class="item-num">${String(i + 1).padStart(2, "0")}</span>
            <span class="item-main">
              <span class="item-title">${esc(p.title)}${pinnedSet.has(p.name) ? `<span class="badge badge-pin">${ICONS.pinSm} Pinned</span>` : ""}${isLive(p) ? '<span class="badge badge-live">Live</span>' : ""}${p.release ? `<span class="badge badge-release">${esc(p.release.tag)}</span>` : ""}</span>
              <span class="item-tagline">${esc(p.tagline)}</span>
            </span>
            <span class="item-side">${langTag(p.language)}<span class="chev">${ICONS.chevron}</span></span>
          </button>
          <div class="item-panel" id="panel-${esc(p.name)}" role="region" aria-label="${esc(p.title)} details">
            <div>
              <div class="item-body">
                <p class="item-desc">${esc(desc)}</p>
                ${p.tags.length ? `<div class="tags">${p.tags.map((t) => `<span class="tag">${esc(t)}</span>`).join("")}</div>` : ""}
                <ul class="meta">${meta}</ul>
                <div class="actions">${linkButtons(p, { readme: true })}</div>
              </div>
            </div>
          </div>
        </li>`;
    };

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
        <ul class="list">${g.projects.map(item).join("")}</ul>
      </section>`).join("");

    // Expand / collapse
    $("#groups").addEventListener("click", (e) => {
      const head = e.target.closest(".item-head");
      if (!head) return;
      const it = head.closest(".item");
      const open = !it.classList.contains("open");
      it.classList.toggle("open", open);
      head.setAttribute("aria-expanded", open);
    });

    // Sticky toolbar + scroll spy
    const bar = $("#toolbar");
    const chipsEl = $("#chips");
    const chips = $$(".chip");
    const sections = $$(".group");
    const offset = () => $(".site-nav").offsetHeight + bar.offsetHeight + 12;
    let lock = false;

    const setActive = (id) => {
      for (const c of chips) {
        const on = c.dataset.group === id;
        if (on && !c.classList.contains("active")) {
          // Scroll only the chip row, horizontally. Never scrollIntoView: it would hijack the page scroll.
          const left = c.offsetLeft - (chipsEl.clientWidth - c.offsetWidth) / 2;
          chipsEl.scrollTo({ left, behavior });
        }
        c.classList.toggle("active", on);
      }
    };

    const spy = () => {
      bar.classList.toggle("stuck", bar.getBoundingClientRect().top <= $(".site-nav").offsetHeight + 1);
      if (lock) return;
      const line = offset() + 40;
      let current = null;
      const visible = sections.filter((s) => !s.hidden);
      for (const s of visible) if (s.getBoundingClientRect().top <= line) current = s.id;
      if (innerHeight + scrollY >= document.documentElement.scrollHeight - 4 && visible.length) current = visible.at(-1).id;
      setActive(current);
    };
    addEventListener("scroll", spy, { passive: true });
    addEventListener("resize", spy, { passive: true });

    const goTo = async (id, instant = false) => {
      const sec = document.getElementById(id);
      if (!sec || sec.hidden) return;
      const y = sec.getBoundingClientRect().top + scrollY - offset() + 1;
      lock = true;
      setActive(id);
      history.replaceState(null, "", `#${id}`);
      if (instant) scrollTo({ top: y, behavior: "auto" });
      else await scrollToY(y);
      lock = false;
      spy();
    };

    chipsEl.addEventListener("click", (e) => {
      const c = e.target.closest(".chip");
      if (!c) return;
      e.preventDefault();
      goTo(c.dataset.group);
    });

    // Search
    const input = $("#search");
    const searchBox = input.closest(".search");
    const apply = () => {
      const q = input.value.trim().toLowerCase();
      const terms = q.split(/\s+/).filter(Boolean);
      let shown = 0;
      for (const sec of sections) {
        let n = 0;
        for (const it of $$(".item", sec)) {
          const p = byName.get(it.dataset.name);
          const hay = [p.title, p.name, p.tagline, p.description, p.language, p.group.title, ...p.tags].join(" ").toLowerCase();
          const match = terms.every((t) => hay.includes(t));
          it.hidden = !match;
          if (match) { n++; it.classList.remove("in-view", "shown"); }
        }
        sec.hidden = n === 0;
        shown += n;
      }
      for (const c of chips) c.hidden = document.getElementById(c.dataset.group).hidden;
      searchBox.classList.toggle("filled", q.length > 0);
      $("#empty").hidden = shown > 0;
      $("#empty-q").textContent = `“${input.value.trim()}”`;
      spy();
    };
    input.addEventListener("input", () => {
      apply();
      const top = $("#groups").getBoundingClientRect().top + scrollY - offset();
      if (input.value && scrollY < top - 4) scrollToY(top);
    });
    input.addEventListener("keydown", (e) => {
      if (e.key === "Escape") { input.value = ""; apply(); input.blur(); }
    });
    $("#empty-clear").addEventListener("click", () => { input.value = ""; apply(); input.focus(); });
    addEventListener("keydown", (e) => {
      const typing = /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement?.tagName);
      if (e.key === "/" && !typing && !$("#modal")?.open) { e.preventDefault(); input.focus(); }
    });

    reveal();
    spy();

    addEventListener("hashchange", () => {
      const id = location.hash.slice(1);
      if (document.getElementById(id)?.classList.contains("group")) goTo(id, true);
    });

    // Arriving from a link like /projects/#games: content was rendered after load, so jump now.
    const id = location.hash.slice(1);
    if (id && !id.startsWith("/") && document.getElementById(id)?.classList.contains("group")) {
      $$(".in-view").forEach((el) => el.classList.remove("in-view"));
      requestAnimationFrame(() => goTo(id, true));
      // The browser's own fragment scroll can land after ours (it retries until load), so correct once more.
      if (document.readyState !== "complete") addEventListener("load", () => goTo(id, true), { once: true });
    }
  }

  /* ---------- Live page ---------- */
  function pageLive() {
    const pinnedSet = new Set(data.pinned);
    const deployments = all()
      .filter(isLive)
      .sort((a, b) => (pinnedSet.has(b.name) - pinnedSet.has(a.name)) || b.pushed.localeCompare(a.pushed));
    $("#count").textContent = deployments.length;

    const groupsWithLive = data.groups.filter((g) => deployments.some((p) => p.group.id === g.id));
    $("#filters").innerHTML = [`<button type="button" class="chip active" data-filter="">All <span class="count">${deployments.length}</span></button>`]
      .concat(groupsWithLive.map((g) => `<button type="button" class="chip" data-filter="${g.id}" style="--chip:${g.accent}">${esc(g.title)} <span class="count">${deployments.filter((p) => p.group.id === g.id).length}</span></button>`))
      .join("");

    $("#live").innerHTML = deployments.map((p, i) => {
      const url = primaryLink(p)?.url || p.live;
      const extra = primaryLink(p) && p.live ? `<a class="btn btn-ghost" href="${esc(p.live)}" target="_blank" rel="noopener">${ICONS.external} ${esc(p.liveLabel)}</a>` : "";
      return `
        <article class="live-card spot in-view" data-group="${p.group.id}" style="--accent:${p.group.accent};--i:${i % 6}">
          <a class="shot" href="${esc(url)}" target="_blank" rel="noopener" aria-label="Open ${esc(p.title)}">
            ${p.shot ? `<img src="${esc(p.shot)}" alt="" loading="lazy" decoding="async">` : `<span class="shot-fallback">${esc(p.title[0])}</span>`}
            <span class="shot-open">${ICONS.external} Open</span>
          </a>
          <div class="live-body">
            <div class="card-top" style="margin:0">
              <span class="card-group">${esc(p.group.title)}</span>
              ${pinnedSet.has(p.name) ? `<span class="badge badge-pin">${ICONS.pinSm} Pinned</span>` : ""}
            </div>
            <h3>${esc(p.title)}</h3>
            <div class="live-url">${esc(host(url))}</div>
            <p>${esc(p.tagline)}</p>
            <div class="card-links">
              <a class="btn btn-primary" href="${esc(url)}" target="_blank" rel="noopener">${ICONS.play} ${esc(primaryLink(p)?.label || "Open")}</a>
              ${extra}
              ${p.readme ? `<button type="button" class="btn btn-ghost" data-readme="${esc(p.name)}">${ICONS.readme} README</button>` : ""}
              <a class="icon-btn" href="${esc(p.url)}" target="_blank" rel="noopener" aria-label="GitHub repository" title="GitHub" style="width:32px;height:32px;border-radius:999px">${ICONS.github}</a>
            </div>
          </div>
        </article>`;
    }).join("");

    $("#filters").addEventListener("click", (e) => {
      const c = e.target.closest(".chip");
      if (!c) return;
      $$(".chip", $("#filters")).forEach((x) => x.classList.toggle("active", x === c));
      const f = c.dataset.filter;
      $$(".live-card").forEach((el) => {
        el.hidden = f && el.dataset.group !== f;
        el.classList.remove("in-view", "shown");
      });
    });

    reveal();
  }

  /* ---------- README modal ---------- */
  let modal, readmeEl;
  const cache = new Map();

  function buildModal() {
    document.body.insertAdjacentHTML("beforeend", `
      <dialog class="modal" id="modal" aria-labelledby="modal-title">
        <div class="modal-shell">
          <header class="modal-head">
            <div>
              <p class="modal-group" id="modal-group"></p>
              <h2 id="modal-title"></h2>
              <p class="modal-tagline" id="modal-tagline"></p>
            </div>
            <button class="icon-btn" type="button" id="modal-close" aria-label="Close">${ICONS.close}</button>
            <div class="modal-actions" id="modal-actions"></div>
          </header>
          <div class="modal-body" id="modal-body" tabindex="-1">
            <article class="markdown" id="readme"></article>
          </div>
        </div>
      </dialog>`);
    modal = $("#modal");
    readmeEl = $("#readme");

    modal.addEventListener("close", () => {
      document.body.classList.remove("modal-open");
      if (!location.hash.startsWith("#/")) return;
      if (history.state?.readme) history.back();
      else history.replaceState(null, "", location.pathname + location.search);
    });
    modal.addEventListener("click", (e) => {
      if (e.target === modal) modal.close();
      const a = e.target.closest("a[data-anchor]");
      if (a) {
        e.preventDefault();
        readmeEl.querySelector(`#readme-${CSS.escape(a.dataset.anchor)}`)?.scrollIntoView({ behavior });
      }
    });
    $("#modal-close").addEventListener("click", () => modal.close());
    addEventListener("popstate", route);
  }

  function route() {
    const m = location.hash.match(/^#\/(.+)$/);
    if (m) openReadme(decodeURIComponent(m[1]), { push: false });
    else if (modal.open) modal.close();
  }

  const libsReady = () => new Promise((resolve) => {
    const check = () => (window.marked && window.DOMPurify ? resolve() : setTimeout(check, 40));
    check();
  });

  const slug = (s) => s.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");
  const isRelative = (u) => u && !/^([a-z][a-z0-9+.-]*:|\/\/|#)/i.test(u);

  function renderMarkdown(md, p) {
    const raw = `https://raw.githubusercontent.com/${USER}/${p.name}/${p.branch}/`;
    const blob = `https://github.com/${USER}/${p.name}/blob/${p.branch}/`;
    const tpl = document.createElement("template");
    tpl.innerHTML = DOMPurify.sanitize(marked.parse(md, { gfm: true }), { ADD_ATTR: ["target"] });
    const root = tpl.content;

    if (root.firstElementChild?.tagName === "H1") root.firstElementChild.remove();

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
    if (window.hljs) readmeEl.querySelectorAll("pre code[class*='language-']").forEach((c) => {
      try { hljs.highlightElement(c); } catch {}
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
        const res = await fetch(`/data/readmes/${encodeURIComponent(name)}.md`);
        if (!res.ok) throw new Error(res.status);
        md = await res.text();
        cache.set(name, md);
      }
      await libsReady();
      if ($("#modal-title").textContent !== p.title) return; // user already opened another one
      renderMarkdown(md, p);
    } catch {
      readmeEl.innerHTML = `<div class="readme-state"><p>Couldn't load the README.</p><a class="btn btn-ghost btn-sm" href="${esc(p.url)}#readme" target="_blank" rel="noopener">${ICONS.github} Read it on GitHub</a></div>`;
    }
  }

  /* ---------- Lumaflies ---------- */
  function motes() {
    const canvas = $("#motes");
    const ctx = canvas?.getContext("2d");
    if (!ctx) return;
    if (reduceMotion) { canvas.remove(); return; }

    // Pre-render one soft glow per colour; each frame is then just cheap drawImage calls.
    const sprite = (rgb) => {
      const s = document.createElement("canvas");
      s.width = s.height = 64;
      const g = s.getContext("2d");
      const grad = g.createRadialGradient(32, 32, 0, 32, 32, 32);
      grad.addColorStop(0, `rgba(${rgb},1)`);
      grad.addColorStop(0.16, `rgba(${rgb},0.5)`);
      grad.addColorStop(1, `rgba(${rgb},0)`);
      g.fillStyle = grad;
      g.fillRect(0, 0, 64, 64);
      return s;
    };
    const cool = sprite("196,214,245");
    const warm = sprite("240,214,160");

    let w, h, flies = [], raf = 0;
    const make = (initial) => ({
      x: Math.random() * w,
      y: initial ? Math.random() * h : h + 20,
      r: 0.5 + Math.random() * 1.4,
      vx: (Math.random() - 0.5) * 0.12,
      vy: -(0.08 + Math.random() * 0.26),
      phase: Math.random() * Math.PI * 2,
      speed: 0.004 + Math.random() * 0.012,
      img: Math.random() < 0.18 ? warm : cool,
    });

    const resize = () => {
      const dpr = Math.min(devicePixelRatio || 1, 2);
      w = innerWidth; h = innerHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(Math.min(44, (w * h) / 30000));
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
        ctx.globalAlpha = 0.15 + 0.45 * (0.5 + 0.5 * Math.sin(f.phase * 1.7));
        const R = f.r * 7;
        ctx.drawImage(f.img, f.x - R, f.y - R, R * 2, R * 2);
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(frame);
    };
    const start = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(frame); };

    resize();
    let t;
    addEventListener("resize", () => { clearTimeout(t); t = setTimeout(() => { resize(); start(); }, 150); });
    document.addEventListener("visibilitychange", () => (document.hidden ? cancelAnimationFrame(raf) : start()));
    start();
  }

  /* ---------- Boot ---------- */
  async function boot() {
    motes();
    bindGlobal();
    buildModal();
    try {
      const res = await fetch("/data/projects.json", { cache: "no-cache" });
      data = await res.json();
    } catch {
      const main = $("main");
      if (main) main.insertAdjacentHTML("afterbegin", `<div class="empty"><p>Couldn't load projects.</p><a class="btn btn-ghost" href="https://github.com/${USER}?tab=repositories">See them on GitHub</a></div>`);
      return;
    }
    for (const g of data.groups) for (const p of g.projects) byName.set(p.name, { ...p, group: g });
    ({ about: pageAbout, projects: pageProjects, live: pageLive })[PAGE]?.();
    route();
  }

  boot();
})();
