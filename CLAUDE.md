# MorphLab Audio — website (morphlabaudio.com)

Handoff from the Claude cloud session of 2026-10-14. Rey talks to you in Italian; reply in Italian.

## What this is
Static one-page site where people download Rey's **free** audio plugins (macOS + Windows) and report bugs / suggest features.
Mastering services and more studio photos come later — not on the site yet.

- **Live:** https://morphlabaudio-site.pages.dev — custom domain `morphlabaudio.com` (domain registered on Cloudflare)
- **Hosting:** Cloudflare Pages, connected to this GitHub repo. **Every push to `main` deploys automatically** (~1 min). No build step: framework None, output dir `/`.
- **Repo:** `morphlabaudio/morphlabaudio-site` (GitHub account `morphlabaudio`). The same repo also holds:
  - **Releases** = the download files
  - **Issues** = bug reports / feature requests (forms in `.github/ISSUE_TEMPLATE/`)
- **Contact email:** info@morphlabaudio.com (the only address used on the site)

## Files
```
index.html                      the whole site (HTML + CSS + JS, no framework)
img/hero.jpg                    studio photo, already graded to green duotone (2000px, ~200 KB)
img/<id>.webp                   plugin UI screenshots for the cards (taken from page 1 of each manual, max 1200px)
img/full/<id>.webp              same screenshot at the manual's full resolution, lossless; opened by clicking a card image
.github/ISSUE_TEMPLATE/         bug_report.yml, feature_request.yml, config.yml (field id "plugin" is prefilled by the site)
README.md                       short publishing notes
```

## Products — the `PRODUCTS` list at the top of the `<script>` in index.html
| id | name | version | group |
|---|---|---|---|
| morphclipper | MorphClipper | 3.2 | plugins |
| morphlator | MorPhlator | 2.2 | plugins |
| morphtransient | MorphTransient | 2.4 | plugins |
| morphdynamic | MorphDynamic MB Transient | 2.7 | plugins |
| morphase | MorPhase | 2.1 | plugins |
| morphalign | MorPhalign | 3.1 | plugins |
| rx92 | RX92 | 2.1 | plugins |
| morphcontrolxl | MorphControl XL | 1.2 | tools (needs Novation Launch Control XL) |

All are free. Each entry has `id, file, name, version, group, tag, text` (+ optional `formats`).

## Download URLs (do not break)
`https://github.com/morphlabaudio/morphlabaudio-site/releases/download/<id>-v<version>/<file>-{mac.dmg|win.zip|manual.pdf}`
All 8 releases are published with 3 assets each. Buttons show the visitor's OS first (Windows if UA says Windows, else macOS).

### Publishing a new plugin version
1. Build the distro as usual (DMG in `Vst Developer/<Plugin>_vX/…OSX.dmg`, zip in `Vst Windows/<Plugin> vX/…WIN.zip`).
2. `gh release create <id>-v<ver> <file>-mac.dmg <file>-win.zip <file>-manual.pdf --repo morphlabaudio/morphlabaudio-site --target main --title "<Name> v<ver>"`
   (copy/rename the files to the fixed names first — see `../publish_releases.sh`, which does exactly this for the current lineup and skips existing tags; update its LIST for new versions).
3. Bump `version` in `PRODUCTS`, commit, push. The card and full-size image URLs carry `?v=<version>`, so a new screenshot reaches browsers that cached the old one (the CDN sends max-age 4h).
New screenshot: pdfimages is not installed; use pypdf (`PdfReader(pdf).pages[0].images[0].image`) → save lossless webp as `img/full/<id>.webp`, and resized to max 1200px as `img/<id>.webp` (quality ~82).

## Design system (from Rey's logo mockup "05k — Con griglia tecnica e LAB verde")
- Colours: bg `#141416`, panel `#1B1B1E`, text `#EDEDEA`, muted `#8A8A8F`, lines `#3A3A3F`, **green `#5BD15B`**. Black / green / white only. Dark-only site.
- Fonts: **Unbounded** (300/500/900) for headings, labels, buttons; Schibsted Grotesk for body text.
- Logo/wordmark: "MORPH" solid white, "LAB" outlined in green (`-webkit-text-stroke`), white dot after it. Thin strips above/below with letter-spaced small caps (MORPHLAB / ML—01, AUDIO PLUGINS / VST3 · AU).
- Hero: full-screen studio photo + 80px technical grid + dark gradients (left side darker for the wordmark). Rey approved the current brightness ("un pelo più luminoso" already applied).
- Sections start with a strip "01 — Plugins", "02 — Tools", "03 — Install", "04 — Feedback"; H2 has one word outlined in green.
- Buttons: pill, Unbounded uppercase, primary = green with black text.

## Known facts / caveats
- Mac builds are **ad-hoc signed, not notarized** → install section tells users System Settings → Privacy & Security → "Open Anyway". Apple Developer account ($99/yr) would remove this — not done yet.
- Windows: Inno Setup installer inside the zip; SmartScreen warning is expected.
- "64-bit" for Windows VST3 is stated on the site but was not verified on the actual builds.
- Newsletter (2026-10-16): signup form in `#news` with required consent checkbox and a privacy notice (4 languages). Tool chosen: **Kit**, not set up yet.
  Until then sign-ups go to Rey's Google Form (`GFORM` in the script: form id + entry ids for Email, Language, Consent) → responses sheet on his Drive.
  When Kit is ready: fill `KIT_FORM` (Kit then takes over, with double opt-in), export the sheet as CSV and import it in Kit (Language → custom field `language`).
  The privacy text names Google Forms and Kit; change it if the tools change.
- Languages: EN/IT/NL/FR picker. English lives in the HTML and `PRODUCTS`; other languages in `I18N`. New product or changed text → update `I18N` too.
- Donations: Ko-fi `ko-fi.com/morphlabaudio` (const `KOFI` in the script) — section "05 — Support" at the bottom, "Donate" in the top nav, "Support" in the footer, and a popup after the visitor's first installer download (once per visitor, localStorage key `ml-tip-shown`). Plain link, NOT Ko-fi's widget script. PayPal button postponed by Rey (2026-10-15).
- Instagram link is Rey's own account `instagram.com/morpheus_909` (2026-10-15).

## Next ideas (not started)
- Per-plugin pages with more screenshots and before/after audio examples
- Kit account + domain authentication (DKIM CNAMEs, DMARC) — then switch the form to Kit
- Instagram setup; later the mastering services section and studio photos
- Cloudflare Email Routing check for info@
- Apple notarization

## Checking your work
Open `index.html` locally (or `python3 -m http.server`), check desktop and ~390px mobile width (no horizontal scroll), then push. After pushing, the Cloudflare Pages check on the commit should be green.

## Private files
`_redirects` sends `/CLAUDE.md`, `/README.md` and `/.github/*` back to the home page, so they are not readable on the website. If you add other internal files to the repo, add them there too. (The GitHub repo itself is public — it has to be, for the release downloads to work.)
