# AdaB Health — Investor & Stakeholder Overview

> _Recovery is personal. Care should be too._

A **standalone, single-page pitch microsite** for demoing AdaB Health / AdabX to
partners and investors (GPHA Philadelphia, Rescue Mission Trenton). It tells the
whole story on one scrollable page — hero, at-a-glance stats, an honest 10-sprint
roadmap, sprint cards, an illustrative "command center" dashboard, a capability
table, an audience-aware demo run-of-show, and a Q&A — with a **light/dark toggle**
for the room.

**It is accurate by design.** Every sprint status and capability reflects the real
codebase: 7 sprints are live and tested, Sprint 2 (billing) is honestly marked as
deferred/next, and Sprints 9–10 show their built data foundations with the AI /
optimizer as the next build. The only illustrative content is the "command center"
metrics section, which is clearly labeled sample data.

## Why it's a separate project

Deliberately **isolated** from the main AdaB Health app — no shared code, server,
or data — so iterating on the pitch here can never destabilize the live demo. It's
a zero-dependency static site: `node server.js` (or Replit **Run**) just works, and
it also hosts cleanly on **GitHub Pages** (no server needed there).

## Run / host it

```bash
npm start          # → http://localhost:3000   (or: node server.js)
```
**GitHub Pages (free, recommended for presenting):** repo **Settings → Pages →
Deploy from a branch → main / root**. Your live URL:
`https://faarisaahmed.github.io/adab-health-demo/`.

## Present it

- Present **full-screen**. Use the **Co-founder / CEO ↔ Investor** toggle (top) to
  switch the talking points *and* the demo run-of-show to the right audience.
- Click **Open live app** to jump to the real product for the live portion (set the
  URL first — see below).
- Hover the acuity trend for per-month values; use **◐ Theme** for the room.

## Customize (all content is in one `<script>` block in `index.html`)

| Edit this constant | To change |
|---|---|
| `LINKS.liveApp` | the **Open live app** button URL (your Replit deployment). Also `LINKS.github`. |
| `STATS` | the four headline stat tiles |
| `SPRINTS` | the roadmap + sprint cards (status: `done` → Live, `foundation`, `next`; append `(na)` to an output line to mark it not-yet-built) |
| `TALKING` | audience talking points (`ceo` / `investor`) |
| `DEMO` | the run-of-show steps per audience |
| `CAPS` | the capability table rows (`yes` / `foundation` / `next`) |
| `QA` | the questions & answers |
| `DATA` | the illustrative "command center" numbers |

No build step — edit and refresh.

## Accuracy vs. an earlier deck

An earlier version of this overview described the product from the *original plan*
and marked several unbuilt features (notably the **Sprint 2 billing engine**) as
"Completed." This version is reconciled against the actual code so a live demo never
promises a feature that isn't there. Honest framing for the gaps:
- **Billing (Sprint 2):** scoped next revenue build — needs a design partner + PROMISe/payer credentials.
- **Predictive AI / optimization (Sprints 9–10):** data foundations are live; the model/optimizer are the fast-follow, built on real labelled outcomes with bias-checking and clinician oversight.

> **Illustrative sample data** in the metrics section — not a live feed or real
> patient records. AdaB Health is a reflective care-navigation tool, not a
> diagnostic instrument.
