# HOME PAGE AUDIT — wafasmart.tech (`dist/index.html`)

Backup taken before any edit: `backup-home-20261110-084823/` (dist, build, firebase.json, .firebaserc, GIT_HEAD.txt, GIT_STATUS.txt).

## 1. Source of truth (IMPORTANT)

- Home page generator: `build/home.js` → writes `build/src/index-3d.html` (+ `build/src/css/home.css`,
  extra CSS in `build/src/home/extra.css` and `build/src/home/cube.css`).
- `build/build.js` (last lines) copies `build/src/index-3d.html` over `dist/index.html`.
- **Mismatch found:** live `dist/index.html` (371 KB) contains an extra inline `<style id="perf-opt">`
  block (and matching JS/CSS "performance mode" patches) that is NOT in `build/src/index-3d.html`
  (124 KB). Running `node build/build.js` would overwrite `dist/index.html` and drop those
  performance patches. Any home change must re-apply them or move them into the source.

## 2. Measured on the live dist build (Chromium, 1440 px and 390 px)

- Console errors: 0 · JS page errors: 0 · horizontal overflow: none recorded.
- One `<h1>` ("WAFA SMART TECH™"); 26 `<section>` blocks; 205 `<img>` tags.
- Images without src before scroll are lazy-loaded (not broken). After scrolling the whole page,
  no image has `src` with `naturalWidth` 0 that is complete.
- **Text blocks wrapping to more than 2 lines (3D-box candidates): ~20**, e.g.
  - hero lead "One house for everything a business needs online — …" (3 lines, hero-fade)
  - "Every website we ship is the same standard …" (3 lines)
  - service card "Malware, PHP backdoors & blacklist cleanup" (4 lines)
  - "Salon, gym, car dealer, shaadi hall, event, courier …" (4 lines)
  - demo intro "Three complete designs of YOUR business …" (3 lines)
  - process/FAQ/price-note paragraphs (3–4 lines each)
- **Low-resolution / upscaled images** (natural width < displayed width × DPR):
  - desktop: 60 images, e.g. `service-*-160/480.webp` shown at 181–259 px, `demo-surgical-a-320`
    shown at 589 px, `service-website-640` shown at 783 px, `stock9-640` at 589 px.
  - mobile (2× DPR): 183 images, e.g. `stock18w-1600.webp` at 390 px, `about-team-1600.webp`
    at 390 px (fine), `service-*-640` served as 156 px wide (srcset picks too small a variant),
    `demo-*-320` shown at 36–44 px (wasteful, not blurry).
  - Root cause: the `sizes` attribute in `build/home.js` (`pic()` helper, default
    `"(max-width:700px) 82vw, 420px"`) does not match the real card widths, so the browser picks
    a smaller srcset file than needed. Fix by correcting `sizes` per usage and adding larger
    (≥ 2× display) variants for cards that show big.
- `backdrop` / inline background images: none are used for content images (all `<img>`).

## 3. Demo showcase

- Home demo cards are `demo-*` images (surgical, group, travel, ERP, real-estate) that link to
  `/demos.html` and live demo pages. Demo pages themselves must NOT be edited.

## 4. Open decisions (need owner)

1. Keep `build/src/index-3d.html` + `build/home.js` as the source and move the perf patches into it,
   OR keep editing `dist/index.html` directly (not reproducible by build).
2. New photos: use existing `build/src/assets/img/stock*` only, or allow fetching new
   royalty-free photos (Unsplash/Pexels) with license check.

## 5. Status

- Step 0 backup: DONE.
- Step 1 audit: PARTIAL (measurements above; screenshots not visually reviewed).
- Steps 2–8 (image fix, 3D boxes, demo framing, polish, verify, deploy): NOT STARTED — waiting for decisions in §4.
