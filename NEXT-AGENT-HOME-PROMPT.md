# NEXT AGENT PROMPT — wafasmart.tech HOME PAGE: 3D + state-of-the-art redesign + deploy

Paste everything below the line into the next agent. It is self-contained.

---

You are working on the marketing website **wafasmart.tech** (Wafa Smart Tech, Lahore, Pakistan).
Working directory: `/home/ubuntu/wafa-smart-tech`. Shell: `sh`. Git branch: `main`.
The owner writes in Roman Urdu / Urdu-English. Reply to the owner in the same language mix,
keep final summaries short, and show what you changed and the live URLs.

## 0. Goal (in the owner's words, translated)

1. Make the **HOME PAGE** (`dist/index.html`) beautiful and "state of the art".
2. Any text block that wraps to **more than 2 lines** must be put inside a **3D box** (a card with
   depth, perspective, shadow and a subtle tilt/hover). Short 1–2 line text stays plain.
3. The **demo showcase** on the home page must look beautiful and show the demos nicely
   (framed previews, clear titles, links to the existing demo pages).
4. **Blurry / dhundli images**: find every blurry, pixelated, upscaled or low-quality image on
   the home page and REPLACE it with a sharp, good image (see §4). Fix the zoom/scale problem.
5. Make the whole home page look polished: spacing, typography, colors, hero, sections,
   mobile layout, micro-interactions, dark/light section rhythm — all consistent.
6. Build, verify, and **deploy to Firebase Hosting** (project `wafasmart-tech`).

## 1. HARD RULES (do not break these)

- **Do NOT touch any other page.** Off-limits (do not edit, rebuild-overwrite, delete or move):
  - all demo pages: `demo1`, `demo2`, `demo3`, `demo4`, `demo5` … `demo13`, `demo20`, `demo21`,
    `demo30`–`demo32`, `demo40`–`demo42`, `demo60`, `school1`, `school2`, `spgroup`, and their
    folders/zip files in `dist/` and at repo root (`demo*.html`, `demos/`, `dist/demo*/`);
  - the tools section: `dist/tools/`, `dist/fileen/`, `build/src/tools/`, `build/tools-*.js`;
  - `sfiva-clone/`, `_13zip/`, `_drive/`, `_hw/`, `vibe_images/`, `backup-live-*`, `wafa-3d.html`,
    `wafa-smart-tech-stackcp.zip`, `gsc-sa.json` (never print or commit its contents).
- **Shared CSS/JS affects every page.** If you change `build/src/css/styles.css`,
  `build/src/css/3d.css`, `build/src/js/main.js`, `3d.js` or `i18n.js`, every other service/page
  can change. Prefer **home-only** styles and scripts (e.g. a new `build/src/css/home-v2.css`
  loaded only when `file === "index.html"`, or a `home.css` hook already used by the home page).
  If you must touch a shared file, scope the rules with a home-only class/body attribute and
  re-check at least: `services.html`, `ai-agents.html`, `pricing.html`, `demo*.html` is NOT
  to be changed but must still look the same.
- **Do not delete** existing content, prices, phone number, SEO text, schema, Urdu text.
- **Do not change prices.** Fixed rates are: website **PKR 14,000**, website + management
  **20,000**, AI/voice **23,500**, Android/Windows **30,000**, iOS **35,000**; emergency
  recovery hacked website/PHP **7,000**, hacked WhatsApp **5,000**. Source: `build/src/data/site.js`.
- **Keep the WhatsApp number** as it is in `site.js` (0324 6627054 / wa.me link).
- **Keep SEO:** `<title>`, meta description, canonical, OG/Twitter tags, JSON-LD on the home page,
  `hreflang`, `<h1>` (one only), heading order, `alt` text on every image.
- **Keep accessibility:** keyboard focus visible, 44px touch targets, `prefers-reduced-motion`
  respected (no heavy motion when set), color contrast WCAG AA.
- **Keep performance:** no new heavy JS libraries. Images as WebP with `<picture>` fallback,
  `loading="lazy"` below the fold, explicit `width`/`height`. Mobile should stay fast.
- **Keep the Urdu toggle** (`data-ur` / `data-i18n` attributes) working for any new text you add
  (add Urdu text for new visible strings, or at least keep the English fallback).
- **Git is dirty.** Many files already have uncommitted changes from earlier rounds. Do NOT
  run `git checkout --`, `git reset --hard`, `git stash drop`, or `git clean` on the repo.
  Do not revert other people's/previous changes. Only edit what the home task needs.
- Each write and each shell command may be asked for approval by the user. Explain briefly
  why a command is needed. If the user refuses, do not retry it silently.

## 2. STEP 0 — BACKUP FIRST (mandatory, before any edit)

Create a timestamped backup of everything you will touch or deploy:

```sh
TS=$(date +%Y%m%d-%H%M%S)
mkdir -p backup-home-$TS
cp -a dist build firebase.json .firebaserc backup-home-$TS/
cp -a build/build.js backup-home-$TS/ 2>/dev/null
git rev-parse HEAD > backup-home-$TS/GIT_HEAD.txt
git status --short > backup-home-$TS/GIT_STATUS.txt
echo "backup-home-$TS"
```

Note: `cp -a build` copies `node_modules` if present — exclude it if it is very large
(use `rsync -a --exclude node_modules build backup-home-$TS/`). Write the backup folder name
into your first progress message. Do not continue until the backup exists.

## 3. STEP 1 — AUDIT THE CURRENT HOME PAGE

1. Find the generator for the home page. Candidates (check which one really writes
   `dist/index.html`): `build/build.js` (function `head`, home body), `build/home.js`,
   `build/src/home/`, `build/src/index-3d.html`, `build/src/css/home.css`, `build/src/js/home.js`.
   Read `build/build.js` near the `index.html` output and the `build/README` if present.
   Open `build/src/data/site.js` for the text/services/prices.
2. Build the current state: `node build/build.js` (writes `dist/`). Then run the QA gate:
   `node build/scripts/check.js` — it must say PASSED.
3. Start a local static server in the background (run_command with background: true), e.g.
   `python3 -m http.server 8080 --directory dist`, and read it with read_output.
4. Take screenshots of the home page at **320, 390, 768, 1280, 1920 px** wide (Playwright
   if available: check `node_modules/playwright` or `build/browser-audit.js` for how earlier
   rounds did it; otherwise use a headless browser that exists on the machine). Save them in
   a folder like `/tmp/home-audit/`. Look at them.
5. List:
   - every text block on the home page that wraps to **more than 2 lines** (measure with
     `getClientRects().length` or line-height math on desktop and mobile);
   - every image on the home page: file path, natural size, displayed size, and whether it is
     blurry (natural width < 2× displayed width, JPEG artifacts, or a CSS `filter: blur`,
     `transform: scale` zoom on hover that makes it soft);
   - every demo card and where it links.
6. Write the audit result into `HOME-AUDIT.md` (short table). This is required before editing.

## 4. STEP 2 — IMAGES (fix the blurry / zoomed ones)

- For each blurry image: pick a replacement, in this priority order:
  1. An existing sharp image in `build/src/assets/img/stock/`, `build/src/assets/img/stock-drop/`,
     `build/src/assets/img/raw/` or `dist/assets/img/` that matches the subject.
  2. A new image downloaded from a royalty-free source (Unsplash / Pexels / Pixabay) with its
     license checked (use `web_search` to find the page, `web_fetch` to read the license).
     Save only the file you use, at a sensible size (≥ 2× the displayed width, max ~1600 px
     wide), convert to WebP (+ keep a JPEG/PNG fallback if the page uses `<picture>`).
  3. If no good photo exists, create an **inline SVG illustration** or a CSS gradient art
     instead of a blurry photo. Do not use placeholders that look unfinished.
- Do not use images that are copyrighted without license. Do not remove alt text.
- Optimise: target each image < 150 KB (hero < 250 KB). Use
  `build/scripts/optimize-images.py` if Pillow is available, otherwise `cwebp`/Pillow manually.
- The "zoom" problem: if an image is scaled with `transform: scale(...)` or a hover zoom on a
  small image, reduce the scale to ≤ 1.04 and make sure the source is big enough so zoom
  stays sharp. Use `object-fit: cover` with correct `aspect-ratio` rather than stretching.

## 5. STEP 3 — 3D BOXES FOR LONG TEXT (> 2 lines)

- Rule: a paragraph, card description, feature line or quote whose rendered height is more
  than 2 lines goes inside a 3D box component: `perspective` parent, `transform-style: preserve-3d`
  card, soft shadow (`box-shadow` with layered depth), a 1px gradient border, a top "face"
  or highlight, and a gentle tilt on hover (≤ 6°, disabled under `prefers-reduced-motion`
  and on touch devices).
- Short text (1–2 lines) stays as normal text. Do not make the whole page a wall of boxes.
- Keep the text readable: min 16px body on mobile, line-height ≥ 1.5, no text clipped inside
  the box, no horizontal scroll at 320 px.
- Reuse the existing `.card3d`, `.w3d-*`, `.panel3d`, `.price3d` components where they exist
  (see `build/build.js` ~ lines 340–500 and `build/src/css/3d.css`) before adding new ones.

## 6. STEP 4 — DEMO SHOWCASE (beautiful, but do not edit demo pages)

- The home page shows demo designs. Make each demo a **framed preview card**: a browser-like
  frame (top bar + dots) with a sharp screenshot or a live `<iframe>` preview loaded lazily
  (`loading="lazy"`, `sandbox`-safe, only same-origin pages). Use a real screenshot of each
  demo page taken from the local server (`/demo1.html`, `/demo2/`, `/demo3.html`, `/demo4/`, etc.)
  — save screenshots as WebP under `dist/assets/img/` (new file names only, e.g. `demo-preview-1.webp`).
  Do NOT modify the demo HTML files themselves.
- Each demo card: title, one-line description (≤ 2 lines, in the 3D box rule), "Open demo" link
  (opens the existing page in a new tab) and "Pick this design" WhatsApp link (existing
  `wa.me` pattern in `build/build.js`).
- Keep the existing demo URLs exactly as they are in `firebase.json` rewrites.

## 7. STEP 5 — WHOLE-PAGE "STATE OF THE ART" POLISH (home only)

- Consistent spacing scale (8px grid), fluid typography (`clamp()`), a clean color system
  (navy `#050d20`, gold `#f4c430`, emerald `#25d366` already in the brand — keep them).
- Hero: strong headline (one `<h1>`), sub-headline ≤ 2 lines, two CTAs (Get Free Demo,
  WhatsApp), trust strip, and a 3D hero visual. No heavy continuous animation on mobile.
- Sections in this order (keep content, improve layout): hero → trust/credentials → 3D service
  cards (21 build services + recovery) → demos showcase → why us → process → pricing (PKR cards)
  → portfolio → testimonials → FAQ → blog teasers → final CTA → footer.
- Micro-interactions: subtle hover lift, focus ring, button press. Respect reduced motion.
- Mobile first: check 320 px — no clipped buttons, no horizontal scroll, all tap targets ≥ 44px.
- Check console: zero JS errors on the home page.

## 8. STEP 6 — VERIFY

Run all of these and fix until they pass:

1. `node build/build.js` — completes without error.
2. `node build/scripts/check.js` — PASSED (links, assets, SEO fields, JSON-LD).
3. Browser check of **home page only** at 320 / 390 / 768 / 1280 / 1920 px:
   no horizontal overflow, no console errors, no broken images (naturalWidth > 0 for all `<img>`),
   no text clipped, all CTAs clickable.
4. Quick regression look at 3 other pages (`services.html`, `pricing.html`, `ai-agents.html`)
   to confirm shared CSS did not break them. Demo pages must be byte-identical to the backup:
   `diff -r backup-home-*/dist/demo1.html dist/demo1.html` etc. (only check, do not edit).
5. Write the results in `HOME-AUDIT.md` (before/after screenshots list, image sizes, long-text
   list, console errors = 0).

## 9. STEP 7 — DEPLOY TO FIREBASE

- Check `firebase.json` (public = `dist`) and `.firebaserc` (project alias `wafasmart-tech`).
- Confirm the Firebase CLI is available: `firebase --version` (or `npx firebase-tools --version`).
- Deploy hosting only:
  `firebase deploy --only hosting --project wafasmart-tech`
  (the user must approve this command). Do NOT deploy functions or rules.
- After deploy, verify with `web_fetch` / curl:
  - https://wafasmart-tech.web.app/
  - https://wafasmart.tech/
  - https://www.wafasmart.tech/
  Check HTTP 200 and that the new home content is live (e.g. a unique class name or text).
- Also spot-check https://wafasmart.tech/demo1 and /tools that they still load (they must be unchanged).

## 10. STEP 8 — DOCS

- Append a short section to `TASKS.md` (round "home 3D redesign"): what changed, what the
  backup folder is, the live URLs, and how to rollback
  (`cp -a backup-home-<TS>/dist/. dist/` then `firebase deploy --only hosting`).
- Do not rewrite other docs.

## 11. FINAL REPORT (keep short)

Tell the owner, in Roman Urdu/English:
- backup folder name;
- what changed on the home page (3D boxes, images replaced, demo showcase, polish);
- which images were replaced and why;
- test results (screens, console errors, QA gate);
- deploy status and the three live URLs;
- anything NOT done and why (e.g. no license-free image found → used SVG art).

Stop when the home page is deployed, verified, and documented. Do not start other pages.
