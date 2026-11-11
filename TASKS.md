# Fix & Speed-up Plan — 2026-10-30 (round 2)

User report (round 2): many tools still do not work completely; fix them all, especially the
UAE VAT calculator. Improve its SEO, put the calculator at the very top of the page, move the
extra content below, make it work, and add better keywords. The earlier round covered speed,
animations, mobile layout, admin login, 42 tools, and the first Firebase deploy.

## Task list

- [x] 1. Baseline audit in a real browser (console errors, mobile overflow, dead controls).
- [x] 2. Remove continuous/heavy animation (fixed animated backgrounds, orbs, marquee,
      cube spin, 3D tilt, shine/ping, backdrop blur) and reduce JS work on scroll/pointer.
- [x] 3. Fix shared tool runtime (hub search selector, language toggle, results, errors).
- [x] 4. Fix every broken tool module and its page wiring (all 42 tools).
- [x] 5. Fix mobile layout: no clipped buttons, no horizontal scroll, 44px targets.
- [x] 6. Harden admin login (storage failures, session handling, clear errors).
- [x] 7. Rebuild `dist/`, run browser regression tests for all tools.
- [x] 8. Deploy to Firebase Hosting (`wafasmart-tech`) and verify live URLs.
- [x] 9. Update handover docs with what changed.
- [x] 10. Re-test every tool's primary flow with real inputs/files (42/42).
- [x] 11. Rebuild UAE VAT page: calculator first, SEO content below, keywords/schema.
- [x] 12. Remove the speed-test page-load 429 / third-party lookup.
- [x] 13. Deploy round-2 changes and verify the live UAE VAT page.

## What was fixed

### Shared runtime / template
- Hub search now targets `.t3d-card[data-search]` and the `#no-res` state correctly.
- Every generated tool page has `<main class="tools-main">` so mobile CSS applies.
- `WST_T.LIBS` is now copied into `T.LIBS`; this fixed QR, PDF, ZIP and HEIC actions.
- All pinned CDN libs are advertised on every tool page (still lazy-loaded on first use).
- Single-file image tools replace the previous file instead of silently keeping it.
- Removing a tile now refreshes the Clear/Run button state.
- Free Tools nav/footer insertion is idempotent (no duplicate links).

### Tool logic
- Delete/Extract PDF Pages: fixed undefined `$$` crash; page picker works.
- Password Generator: restored the full A–Z uppercase pool.
- QR Code Generator: preview canvas was zeroed after generating; fixed.
- Split PDF: Clear button re-enables after a file loads; object URLs revoked.
- HEIC to JPG and Image to PDF: verified with a real HEIC sample.
- Age Calculator: real Umm al-Qura Hijri age + config-based Desi/Bikrami conversion.
- Zakat: jewellery toggle and selected currency now affect the result.
- Khums: selected currency + Khums-year date now shown in the result.
- Gym Calculator: metric/imperial conversion, US Navy body-fat units, Karvonen HR
  zones, 1RM units, water result and duplicate-warning fixes.
- Lorem Ipsum: words/list modes now respect the requested count and HTML format.
- Internet Speed Test: no network requests or auto-run on page load; Start is manual.
- Mobile hero images: 4K JPEGs replaced with ~29–58 KB WebP versions.
- Admin: safe storage wrappers, login persists across reload/new tab, reset-local-admin
  button, fixed nested content/pricing path saving, ARIA group instead of broken tablist.

### Performance / accessibility
- Global performance mode: no CSS animations/transitions, no backdrop blur, no orbs,
  marquee, cube auto-spin, 3D tilt, shine or ping effects; reveal elements stay visible.
- `main.js` / `3d.js` ambient work disabled; `tools-3d.js` is a no-op.
- Fixed ARIA: review `role="list"` children are `listitem`; gym/admin tablists are groups.

### 2026-10-30 round 2 — UAE VAT SEO + all-tool verification
- UAE VAT calculator moved to the **very top** of the page (immediately after breadcrumbs);
  the long hero/about/FAQ content now sits below the tool. Added `.tool-first` styling.
- Expanded the UAE VAT page:
  - 14 targeted keywords incl. Dubai, Abu Dhabi, AED, reverse VAT, FTA and GCC.
  - Better 53-character title and 155-character meta description.
  - Two new SEO sections: "UAE VAT formula" and "VAT-inclusive vs VAT-exclusive examples"
    with calculation tables.
  - 10 FAQs covering 2026 rate, manual formula, Dubai/Abu Dhabi, zero-rated vs exempt,
    and other GCC countries.
  - `WebApplication` schema now uses `FinanceApplication` + AED; added `HowTo` schema;
    FAQ and Breadcrumb schemas remain.
- `tools-build.js` now emits `<meta name="keywords">` for every tool, hub and category page,
  adds HowTo schema for every tool, and uses `t.uiFirst` to put a calculator first.
- Related-tool cards no longer say "3D animated" (effects were removed).
- Speed test no longer performs any third-party lookup on page load; connection details
  load only after Start. This removes the Cloudflare 429 seen by the browser audit.
- Fixed missing keyword arrays on the four PDF tools (merge, split, delete, extract).

## Test results (Playwright, local `dist/` server)

- 54 pages at 320 / 360 / 390 / 768 px: **0 horizontal-overflow or clipped-control problems**.
- 54 pages: **0 uncaught console/page errors** (including the speed-test 429 fix).
- 42/42 tool modules initialise clean (`node build/tools-smoke.js`).
- 42/42 static wiring audit clean (`node build/tools-audit.js`).
- 42/42 primary tool flows pass in a real browser (21 calculator/text + 19 image/PDF +
  gym + manual speed test).
- Real-file tests: image→PDF, PDF→images, merge, split, delete, extract, resize,
  compress, JPG/PNG/WebP/HEIC conversion, crop, rotate, watermark, base64, passport,
  QR (URL/text/WhatsApp/WiFi), and speed test.
- Calculator/text tests: BMI, BMR, body fat, 1RM, HR zones, water, age (Gregorian/
  Hijri/Desi), percentage, discount, EMI, GPA/CGPA, Zakat, Khums, VAT, salary tax,
  word count, case conversion, duplicate lines, lorem, password, JSON, unit converter.
- Admin: default login, reload, new tab, custom password, logout, reset, content save,
  pricing save.
- No continuous CSS animations found on any of the 54 pages.
- UAE VAT page: calculator starts at ~122 px from the top on mobile (above the hero),
  add/remove/0%/custom-rate cases pass, one H1, 14 meta keywords, 2 formula tables,
  10 FAQs, and valid WebApplication + FAQPage + HowTo + Breadcrumb JSON-LD.

## Success checks

- [x] Zero uncaught console errors on every page.
- [x] No horizontal overflow at 320/360/390/768 px.
- [x] Every calculator/text tool produces a result in a browser test.
- [x] Every image/PDF tool processes a real sample file.
- [x] No continuous CSS/JS animation left running when idle.
- [x] Admin login works after reload/new tab and reports storage errors clearly.
- [x] `firebase deploy --only hosting` succeeds and live pages return 200.
- [x] Live admin dashboard has 0 horizontal overflow at 320/360/390 px.
- [x] UAE VAT calculator is the first content block, works in add/remove/custom modes,
      and has keywords, HowTo, FAQ and formula content.
- [x] Round-2 deploy to Firebase succeeded; live UAE VAT page, hub, admin, speed-test idle state and PDF merge verified.

---

# SEO Content Round — 2026-10-30

User request: UAE VAT SEO, another Pakistan tool/guide cluster, and free domain/free hosting
content — add 19 more SEO pages/articles and make the site's SEO stronger.

## Task list

- [x] 1. Plan 19 unique SEO articles across three clusters: UAE VAT (7), Pakistan tools/money (6), free domain & hosting (6).
- [x] 2. Build a reusable blog article template with title/description/keywords/canonical/OG/Twitter, Article + FAQ + Breadcrumb schema.
- [x] 3. Write and generate the 19 article pages under `/blog/`.
- [x] 4. Rebuild `/blog.html` with category groups, cards, updated SEO head and ItemList schema.
- [x] 5. Add all 19 URLs to `sitemap.xml` with lastmod and hreflang alternates.
- [x] 6. Add strong internal links: articles ↔ tools ↔ pricing/website services ↔ related guides.
- [x] 7. Test all 19 pages at 320/360/390/768 px for overflow, console errors, canonical/meta/schema and broken links.
- [x] 8. Deploy to Firebase and verify live blog index + sample article pages.

## What was added

- **7 UAE VAT guides:** calculator guide, reverse VAT, inclusive vs exclusive, 2026 rates,
  registration thresholds, tax-invoice checklist, VAT-return mistakes.
- **6 Pakistan guides:** salary tax calculator, Zakat, BMI, compress image to 50KB,
  free PDF tools for students, freelancer tax checklist.
- **6 free domain/hosting guides:** free domain options, static hosting comparison,
  host free in Pakistan, free SSL, free business website, domain vs hosting.
- New builder: `build/blog-build.js`; content in `build/blog/data-{uae,pakistan,hosting}.js`.
- New pages use Article + FAQPage + BreadcrumbList schema; `/blog.html` uses ItemList.
- 7 tool pages now link to their matching long-form guide (`guide` / `guideTitle` fields).
- `build/browser-audit.js` now includes `/blog.html` and every `/blog/*.html` page.

## Test results (local)

- 76 pages at 360 px: **0 overflow, 0 clipped controls, 0 console/page errors**.
- 20 blog pages at 320 / 360 / 390 / 768 px: **0 problems**.
- All 19 new pages: 1 H1, unique title/description, keywords, canonical, 4 FAQs,
  valid Organization + WebSite + Article + FAQPage + BreadcrumbList JSON-LD.
- 74 internal hrefs crawled: **0 real 404s** (two font URLs return 200 via curl;
  Playwright navigation reports null for direct font requests).
- `/blog.html`: 21 cards, 21 unique article links, 0 mobile overflow.
- Sitemap: 21 blog URLs total (19 new + 2 existing).

## Live deploy

- `firebase deploy --only hosting --project wafasmart-tech` succeeded: 393 files.
- All 19 live article URLs return 200 with canonical + 5 valid JSON-LD blocks.
- Live `/blog.html`: 200, 21 cards, 21 unique links, 1 H1.
- Live `/sitemap.xml`: 21 blog URLs, guide markers present.
- Live 390 px and 320 px checks on blog index, two articles and the UAE VAT tool:
  0 overflow, 0 clipped controls, 0 console/page errors.
- Live UAE VAT tool still has the working calculator and the new guide link.

---

# Building Material Calculator Round — 2026-10-30

User request: add a building material calculator with brick/block selection, stories,
grey vs complete finishing, researched brick/cement/steel/sand quantities, and
location SEO for Punjab, Lahore, Karachi, Dubai and Sharjah.

## Task list

- [x] 1. Research construction-material ratios: bricks per sq ft, blocks per sq ft, cement bags, steel kg, sand and crush per covered sq ft, plus Pakistan/UAE cost ranges.
- [x] 2. Add a new 43rd tool: `building-material-calculator` with calculator-first layout (`uiFirst: true`).
- [x] 3. Add brick/block selection (4.5", 9", 13.5" brick; 4", 6", 8" block), 1–5 stories, grey/semi/complete finishing, economy/standard/premium quality, wastage.
- [x] 4. Add city/region cost planning for Lahore, Punjab, Karachi, Islamabad, Dubai, Sharjah, Abu Dhabi and other UAE emirates (PKR/AED).
- [x] 5. Show bricks/blocks, cement bags, steel kg/tons, sand cft/tons, crush cft/tons, tiles and paint; add copy-summary and reset.
- [x] 6. Add 32 SEO keywords, meta keywords, WebApplication + HowTo + FAQPage + BreadcrumbList schema, research/sources section, city tables and 12 FAQs.
- [x] 7. Add 3 supporting guides: building-material calculator guide, Lahore/Karachi construction cost, Dubai/Sharjah material cost.
- [x] 8. Link the tool to the guide and the guides back to the tool; add the construction group to `/blog.html`.
- [x] 9. Add the new tool and 3 guide URLs to `sitemap.xml`.
- [x] 10. Test all combinations, mobile widths, internal links, copy button and live deployment.

## Research basis

- 9" brick wall ≈ 9 bricks/sq ft; 4.5" ≈ 4.5; 13.5" ≈ 13.5.
- 8" block wall ≈ 1.05–1.125 blocks/sq ft.
- Grey-structure planning base: ~0.43 cement bags, 4.2 kg steel, 1.75 cft sand, 1.45 cft crush per covered sq ft.
- Pakistan planning rates in PKR/sq ft; UAE planning rates in AED/sq ft; all marked as estimates.
- Sources listed on the tool page: Avenir brick calculator, Grey Structure Calculator Pakistan, Engel & Völkers Dubai, PBS price statistics and Inch Calculator.

## Test results

- `node build/tools-audit.js`: 43/43 built tool pages wired correctly.
- `node build/tools-smoke.js`: all 43 tool modules initialised clean.
- `node build/browser-audit.js`: 80 pages at 360 px — 0 overflow, 0 clipped controls, 0 console/page errors.
- 192 city × masonry × finish combinations: 0 failures (PKR/AED, bricks/blocks, grey/semi/complete).
- 20 checks on the new tool, 3 guides and blog index at 320/360/390/768 px: 0 problems.
- 73 internal links crawled: 0 broken.
- Copy-summary button writes the full material list to the clipboard.
- Live 320/390 px calculator checks: 0 overflow, 0 console errors.

## Live deploy

- `firebase deploy --only hosting --project wafasmart-tech` succeeded: 400 files.
- Live tool: `https://wafasmart.tech/tools/building-material-calculator` → 200.
- Live guides and `/blog.html` → 200.
- Live sitemap includes the new tool and all 3 guide URLs.
- Blog index now has 24 cards (22 generated guides + 2 featured articles).

## Home page 3D redesign + image sharpness polish (2026-11-10)

- **What changed:** home page (`dist/index.html`) now wraps every text block that renders
  longer than 2 lines in a 3D "depth" panel (`.tb3d`), themed dark on dark/photo/emerald
  sections and light on `.eco-light`/`.eco-stone`/`.sd53`/`.qc-sec` sections. Demo/preview
  images get a framed, lifted browser-like rim. `srcset` was widened on 203 `<img>` tags to
  include every existing WebP variant (incl. `stockNw-*` wide variants) and a runtime helper
  sets an accurate `sizes` from the measured layout width, so large screens pick sharp files.
- **Pipeline (home only):** edit `build/src/home/v2.css` + `build/src/home/v2.js` ->
  `node build/scripts/home-v2.js` -> writes `dist/index.html` (idempotent; re-applies the
  inline `perf-opt` block). Do **not** run `build/build.js`/`build/home.js` for home changes.
- **Verified:** 13 desktop / 21 mobile `.tb3d` boxes, 0 console/page errors, no horizontal
  overflow, CLS <= 0.019, one `<h1>`, all 205 images have `alt`, 0 broken images, desktop soft
  images down 30 -> 8 (all 1.1-1.6x, full-bleed backgrounds). `check.js`: no `index.html:` issues.
- **Untouched:** demo pages (`demo1..demo60`, `demo5-13.html`, `demos/`, `dist/demo*/`),
  `school1/2`, `spgroup`, tools, prices and the WhatsApp number are unchanged.
- **Deployed:** `firebase deploy --only hosting --project wafasmart-tech` (1327 files, 55 uploaded).
  Live: `https://wafasmart.tech/`, `https://www.wafasmart.tech/`, `https://wafasmart-tech.web.app/` -> 200.
- **Rollback:** `cp -a backup-home-20261110-084823/dist/. dist/` then redeploy.

## Home hero: animated backdrop + price fix (2026-11-10, second pass)

- **Hero photo removed:** the blurry "man with a laptop" hero image (`stock18w-1600`) is gone.
  The hero `<div class="hall-media">` is replaced by a pure-CSS animated backdrop
  (`.hero-art`: warm aurora blobs, faint code grid, rotating light sweep, rising dust motes) —
  no image request, GPU-only transform/opacity animations, honours `prefers-reduced-motion`.
- **Hero intro line removed:** the long "One house for everything a business needs online…"
  paragraph was dropped (owner found it hard to read). `dist/index.html` now has 0 hall-media
  and 0 lead paragraphs.
- **Hero doors fixed:** the plain doors used cream text designed for the old dark photo; on the
  light backdrop they now get a white surface with dark text.
- **Price bug fixed:** the portfolio case cards rendered `PKR NaN` (9 cards). Root cause:
  `build/src/data/site.js` `portfolio.forEach` computed the price but never wrote it back to
  `p.price`. Fixed there, plus the 9 rendered spots in `dist/index.html` and
  `build/src/index-3d.html` are now `PKR 14,000`.
- **Pipeline:** all of the above is applied idempotently by `node build/scripts/home-v2.js`
  (hero swap, `PKR NaN` -> `PKR 14,000`, srcset widening, CSS/JS injection).
- **Verified live:** hero-art present, 0 `PKR NaN`, 10 × `PKR 14,000`, 0 console/page errors,
  no overflow, CLS 0.0000, all images have `alt`. `/demos.html`, `/demo1`, `/tools`,
  `/services.html` still 200.
- **Rollback:** hero backup at `backup-home-hero-20261110-094933/index.before-hero.html`.
