# Is Sea of Sorrow out?

An unofficial fan tracker for *Hollow Knight: Silksong – Sea of Sorrow*. Not affiliated with Team Cherry.

**Site:** https://faarisaahmed.github.io/skong-dlc-wait/

## How it works
- `.github/workflows/check.yml` runs `scripts/check.mjs` about every 5 minutes. It checks:
  - Team Cherry's blog RSS
  - official Steam announcements for Silksong (app 1030300)
  - Team Cherry's YouTube channel
  - Steam build, branch and DLC changes (via api.steamcmd.net)
- **NO**: nothing new since the watch began.
- **MAYBE**: something new from any of those sources in the last 14 days.
- **YES**: an official post *title* mentions Sea of Sorrow **and** says it's out ("out now", "now live", "available now", …).
- Every new signal sends a push to the ntfy topic in `data/config.json` and opens a GitHub issue that @mentions the owner (which sends an email).

## Force the answer
Edit `data/override.json` and set `"status"` to `"YES"`, `"MAYBE"` or `"NO"`. Set it back to `null` to hand control back to the watcher.

## Fonts
Uses **Trajan Pro** if it's installed on your device. Otherwise it falls back to **Cinzel**, a free look-alike from Google Fonts.
