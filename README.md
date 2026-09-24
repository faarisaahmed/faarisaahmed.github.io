# faarisaahmed.github.io

My homepage: every project I've made, grouped and browsable, with READMEs readable in place.

**Live:** https://faarisaahmed.github.io

## How it works

- `projects.config.json`: the groups, their order, and a short tagline and tags for each repo. Any new public repo that isn't listed shows up automatically under **More Projects** until you place it.
- `scripts/build.py` pulls repo metadata, GitHub Pages URLs, latest releases and READMEs from the GitHub API into `data/`.
- A GitHub Action (`.github/workflows/refresh.yml`) re-runs the build every day, and whenever the config changes, so the site stays in sync.
- The site is plain HTML/CSS/JS with no build step: `index.html`, `styles.css`, `app.js`.

## Local preview

```sh
python3 scripts/build.py        # uses `gh auth token` if GITHUB_TOKEN isn't set
python3 -m http.server 8000     # then open http://localhost:8000
```

Deep link to any README with `#/<repo-name>`, e.g. `https://faarisaahmed.github.io/#/Beastfly`.
