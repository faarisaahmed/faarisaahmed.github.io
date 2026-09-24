#!/usr/bin/env python3
"""Fetch repo metadata + READMEs from GitHub and write data/ for the homepage.

Usage:  GITHUB_TOKEN=... python3 scripts/build.py
Falls back to `gh auth token` locally, and works unauthenticated (rate limited).
"""
import base64
import json
import os
import shutil
import subprocess
import urllib.error
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CONFIG = json.loads((ROOT / "projects.config.json").read_text())
USER = CONFIG["user"]
DATA = ROOT / "data"
READMES = DATA / "readmes"
SHOTS = ROOT / "assets" / "shots"


def token():
    if os.environ.get("GITHUB_TOKEN"):
        return os.environ["GITHUB_TOKEN"]
    try:
        return subprocess.check_output(["gh", "auth", "token"], text=True, stderr=subprocess.DEVNULL).strip()
    except Exception:
        return None


TOKEN = token()


def api(path):
    req = urllib.request.Request(f"https://api.github.com{path}")
    req.add_header("Accept", "application/vnd.github+json")
    req.add_header("X-GitHub-Api-Version", "2022-11-28")
    if TOKEN:
        req.add_header("Authorization", f"Bearer {TOKEN}")
    try:
        with urllib.request.urlopen(req) as res:
            return json.load(res)
    except urllib.error.HTTPError as e:
        if e.code == 404:
            return None
        raise


def all_repos():
    repos, page = [], 1
    while True:
        batch = api(f"/users/{USER}/repos?per_page=100&type=owner&page={page}")
        repos += batch
        if len(batch) < 100:
            return repos
        page += 1


def main():
    profile = api(f"/users/{USER}")
    repos = {r["name"]: r for r in all_repos()}
    excluded = set(CONFIG.get("exclude", []))
    repos = {
        n: r for n, r in repos.items()
        if n not in excluded and not r["private"] and (CONFIG.get("includeForks") or not r["fork"])
    }

    if READMES.exists():
        shutil.rmtree(READMES)
    READMES.mkdir(parents=True)

    def project(name, extra):
        r = repos[name]
        pages = f"https://{USER}.github.io/{name}/" if r["has_pages"] else None
        homepage = (r.get("homepage") or "").strip() or None
        live = pages or homepage
        release = api(f"/repos/{USER}/{name}/releases/latest")
        readme = api(f"/repos/{USER}/{name}/readme")
        has_readme = False
        if readme and readme.get("content"):
            text = base64.b64decode(readme["content"]).decode("utf-8", "replace")
            if len(text.strip().splitlines()) > 1 or len(text.strip()) > 60:
                (READMES / f"{name}.md").write_text(text)
                has_readme = True
        links = list(extra.get("links", []))
        shot = SHOTS / f"{name}.webp"
        if homepage and homepage != pages and not any(l["url"] == homepage for l in links):
            links.append({"label": "Website", "url": homepage})
        return {
            "name": name,
            "title": extra.get("title", name),
            "tagline": extra.get("tagline") or r.get("description") or "",
            "description": r.get("description") or "",
            "tags": extra.get("tags", []),
            "url": r["html_url"],
            "live": live,
            "liveLabel": extra.get("liveLabel", "Live site"),
            "links": links,
            "language": r.get("language"),
            "stars": r["stargazers_count"],
            "forks": r["forks_count"],
            "created": r["created_at"],
            "pushed": r["pushed_at"],
            "branch": r["default_branch"],
            "release": {"tag": release["tag_name"], "url": release["html_url"]} if release else None,
            "readme": has_readme,
            "shot": f"/assets/shots/{name}.webp" if shot.exists() else None,
        }

    groups, placed = [], set()
    for g in CONFIG["groups"]:
        items = []
        for entry in g["repos"]:
            if entry["name"] in repos:
                items.append(project(entry["name"], entry))
                placed.add(entry["name"])
        if items:
            groups.append({k: g[k] for k in ("id", "title", "blurb", "accent", "icon")} | {"projects": items})

    leftover = sorted((n for n in repos if n not in placed), key=lambda n: repos[n]["pushed_at"], reverse=True)
    if leftover:
        fb = CONFIG["fallbackGroup"]
        groups.append(dict(fb, projects=[project(n, {}) for n in leftover]))

    out = {
        "profile": {
            "login": profile["login"],
            "name": profile.get("name") or profile["login"],
            "bio": profile.get("bio") or "",
            "location": profile.get("location") or "",
            "url": profile["html_url"],
            "followers": profile["followers"],
            "since": profile["created_at"],
        },
        "about": CONFIG.get("about", []),
        "pinned": [n for n in CONFIG.get("pinned", []) if n in repos],
        "groups": groups,
    }
    (DATA / "projects.json").write_text(json.dumps(out, indent=2, ensure_ascii=False) + "\n")
    total = sum(len(g["projects"]) for g in groups)
    print(f"Wrote {total} projects in {len(groups)} groups" + (f" ({len(leftover)} ungrouped)" if leftover else ""))


if __name__ == "__main__":
    main()
