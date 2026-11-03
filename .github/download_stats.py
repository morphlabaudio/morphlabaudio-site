#!/usr/bin/env python3
"""Add today's GitHub release download counts to a CSV, one row per release.

Usage: python3 download_stats.py <file.csv>
Run daily by .github/workflows/download-stats.yml (CSV lives on the `stats` branch).
GitHub only keeps the running total per file, so the history exists only from these snapshots.
"""
import csv, datetime, json, os, sys, urllib.request

REPO = "morphlabaudio/morphlabaudio-site"
FIELDS = ["date", "tag", "plugin", "version", "published", "mac", "win", "manual"]


def releases():
    page, out = 1, []
    while True:
        req = urllib.request.Request(
            f"https://api.github.com/repos/{REPO}/releases?per_page=100&page={page}",
            headers={"Accept": "application/vnd.github+json", "User-Agent": "morphlab-download-stats"})
        if os.environ.get("GITHUB_TOKEN"):
            req.add_header("Authorization", "Bearer " + os.environ["GITHUB_TOKEN"])
        batch = json.load(urllib.request.urlopen(req))
        out += batch
        if len(batch) < 100:
            return out
        page += 1


def main(path):
    today = datetime.datetime.now(datetime.timezone.utc).date().isoformat()
    rows = []
    if os.path.exists(path):
        with open(path, newline="") as f:
            rows = [r for r in csv.DictReader(f) if r["date"] != today]  # re-running the same day replaces it
    for r in releases():
        if r["draft"] or "-v" not in r["tag_name"]:
            continue
        n = {"mac": 0, "win": 0, "manual": 0}
        for a in r["assets"]:  # <file>-mac.dmg / -win.zip / -manual.pdf
            kind = a["name"].rsplit("-", 1)[-1].split(".")[0]
            if kind in n:
                n[kind] += a["download_count"]
        tag = r["tag_name"]
        rows.append({"date": today, "tag": tag, "plugin": (r["name"] or tag).rsplit(" v", 1)[0],
                     "version": tag.rsplit("-v", 1)[1], "published": r["published_at"][:10], **n})
    rows.sort(key=lambda r: (r["date"], r["plugin"], [int(x) for x in r["version"].split(".") if x.isdigit()]))
    with open(path, "w", newline="") as f:
        w = csv.DictWriter(f, FIELDS)
        w.writeheader()
        w.writerows(rows)
    print(f"{today}: {sum(1 for r in rows if r['date'] == today)} releases")


if __name__ == "__main__":
    main(sys.argv[1])
