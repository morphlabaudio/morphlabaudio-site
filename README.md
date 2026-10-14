# morphlabaudio.com

Source of the MorphLab Audio website, deployed with Cloudflare Pages.
This repository also hosts the plugin downloads (Releases) and the bug reports / feature requests (Issues).

## Publishing a new version
1. Create a release with tag `<id>-v<version>` (e.g. `morphclipper-v3.3`).
2. Attach three files with fixed names: `<File>-mac.dmg`, `<File>-win.zip`, `<File>-manual.pdf`.
3. Update `version` for that product in the `PRODUCTS` list at the top of the script in `index.html`, then push.

Screenshots live in `img/<id>.webp`.
