# TOOLS BUILD — Handover & Progress Log (wafasmart.tech /tools section)

> **READ THIS FIRST if you are a new agent continuing this work.**
> This file is the live log of what was built, why, and what remains.
> Update the "Progress log" section after every completed step.
> User instruction: "ek ek ker k bnay or sath document me likhte jay" — build incrementally, document everything here, stop for review after each batch.

## 0. Non-negotiable rules (from the user's brief)

1. NEVER modify/move/delete existing pages, components, CSS, routes. Only ADD files.
   The ONLY existing files that may be touched: main nav + footer (one "Free Tools" link each), `dist/sitemap.xml`, `dist/robots.txt`, `firebase.json`. Exact diffs must be shown to the user before applying. Patch script: `build/patch-existing.js` (dry-run by default, `--apply` to write, auto-backup).
2. No backend. No Cloud Functions/Firestore/Storage. Everything runs client-side. "Your files never leave your device" note on every tool page.
3. Spark plan: 360 MB/day bandwidth. Each tool page ≤ ~100 KB gzipped first load (excluding CDN libs). SVG icons only, no big images.
4. Heavy libs (pdf-lib, pdf.js, JSZip, qrcode, heic2any) load from jsDelivr **only on user action**, pinned version + SRI `integrity` + `crossorigin`. Never bundle >300 KB into hosting.
5. Mobile-first, accessible, CLS < 0.1, LCP < 2.5s.
6. Pre-rendered HTML per tool (no SPA). Files: `/tools/<slug>.html`; canonicals extensionless `/tools/<slug>` — requires the two `hosting.rewrites` rules in Task 1 (static files are matched before rewrites, so both forms work).

## 1. Phase 0 — Recon report (DONE 2026-10-28)

**Stack:** Plain static HTML. Firebase Hosting (project `wafasmart.tech`, `public: "dist"`, Spark plan).
- `build/build.js` (1156 lines) renders most pages into `dist/` from templates + data in `build/src/data/site.js` and `landing.js`. It is NOT to be run or edited (would rewrite existing pages — violates constraint 1).
- `dist/` contains the deployed files: ~50 HTML pages, `assets/css/styles.css` + `3d.css`, `assets/js/{main,i18n,3d,admin}.js`, `assets/img/*.webp`, fonts (Manrope/Sora/Noto Nastaliq woff2), `sw.js`, `manifest.webmanifest`, `sitemap.xml`, `robots.txt`, `blog/`.
- Note: `dist/index.html` is an OLD self-contained generation (inline CSS, different header). All other pages (services/about/etc.) are the CURRENT format: external `styles.css` + `3d.css`, `<header class="hdr">`, footer with Company list, scripts `main.js`/`3d.js`/`i18n.js` deferred. Copy header/footer markup FROM `dist/services.html`, not index.html.
- `dist/_headers` exists but firebase.json `ignore` excludes it; headers live in firebase.json only.

**Design tokens (from `dist/assets/css/styles.css` :root, line 14):**
`--bg:#050d20 --bg-2:#08152e --bg-3:#0c1c3d --line:rgba(148,169,255,.16) --line-2:rgba(148,169,255,.3) --txt:#eaf0ff --txt-2:#aab8e6 --txt-3:#7382ad --cy:#f4c430 (gold) --vi:#2f6bff --mg:#ff4d5e --gr:#25d366 --am:#ffd166 --grad:linear-gradient(115deg,#ffd75e,#f4c430 45%,#5aa2ff) --r-lg:26px --r-md:18px --r-sm:12px --nav-h:74px --maxw:1200px` Font stack `--ff:"Segoe UI Variable Display","Segoe UI",Inter,Roboto,"Helvetica Neue",Arial,system-ui,sans-serif` (already system fonts; Urdu: Noto Nastaliq via styles.css). Brand: "WAFA Smart Tech", WhatsApp +92 324 6627054, email info@wafasmart.tech, canonical base `https://wafasmart.tech`, pages use `.html` extensions and `?`-free URLs.

**Weights (gzipped):** styles.css 15.0 KB, main.js ~6 KB. Budget for tools pages is comfortable.

**Header/footer behaviour:** `.burger` toggle handled by main.js; `lang-toggle` by i18n.js. On tools pages we include main.js (for burger) with `type="module"`? — NO: main.js is a classic script, `<script src="/assets/js/main.js" defer>`. We copy the same tag. i18n dictionary does not know tool pages → we do NOT include i18n.js on tools pages, and our own tools.js provides a minimal EN↔UR toggle for the `data-ur` attribute we use.

**PDF lib chosen:** pdf-lib 1.17.1 (2021, way >2 weeks old). jsDelivr `https://cdn.jsdelivr.net/npm/pdf-lib@1.17.1/dist/pdf-lib.min.js`, 525,099 B, SRI `sha384-weMABwrltA6jWR8DDe9Jp5blk+tZQh7ugpCsF3JwSA53WZM9/14PjS5LAJNHNjAI`.

## 2. Architecture decided

- Sources live in `build/src/tools/` (new dir, never touched by existing build).
- `build/tools-build.js <slug...>` renders pre-rendered HTML into `dist/tools/` and `dist/tools/index.html` (hub). Runs ON DEMAND only.
- `build/tools.config.js` — single array of tool metadata (slug, category, title, desc, keywords, H1, FAQs, steps, related). Every page = template + its entry. Adding a batch = adding entries + a per-tool JS module.
- Shared runtime: `dist/tools/assets/tools.css`, `dist/tools/assets/tools.js` (dropzone, file-size fmt, progress, errors, download helper, object-URL revoke, lazy CDN loader with SRI, EXIF-aware `createImageBitmap`). Per-tool logic in `dist/tools/assets/t/<slug>.js`, loaded via `<script type="module">` only on that page.
- Shared header/footer markup functions live inside `build/tools-build.js` (copied tokens/design from `dist/services.html` + one added "Free Tools" nav link).
- `build/patch-existing.js`: idempotent, adds nav link `<li><a href="/tools/index.html" data-i18n="nav.tools">Free Tools</a></li>` after Blog link in ALL dist/*.html (and blog posts) `<header>`, footer Company list link, sitemap entries, robots.txt line. Prints unified diff; `--apply` writes with backups in `build/backups/tools-patch-<date>/`.

## 3. Progress log

- 2026-10-28 Phase 0 recon DONE.
- 2026-10-28 Phase 1 DONE: shared system (`tools.config.js`, `tools.js`, `tools.css`, `tools-build.js`) + reference page image-to-pdf + hub.
- 2026-10-28 **Phase 2 DONE — all 37 tool pages built** (batch B 6 PDF, batch A 11 image, batch C 12 calculators + 3 config JSON, batch D 8 text/utility) + `/tools/index.html` hub with working search.
  Audit: HTML 7.5–9 KB gz, tools.css 3.4 KB, tools.js 6.5 KB, per-page JS 0.9–2.6 KB → first load ≈35–40 KB. Titles ≤60, descs ≤155, duplicate-paragraphs=0, no "soon" cards left.
- **No existing site file modified before Task 1; Task 1 applied 2026-10-28 (nav/footer/i18n/build.js + sitemap + robots + firebase.json). DEPLOYED 2026-10-28 with `firebase deploy --only hosting` (324 files, production `https://wafasmart.tech`).**
- TODO Task 2 `keywords.md`.
- TODO browser verification of every tool (deferred by the user: "test bad me kre ge"). Node-side checks exist: `build/tools-smoke.js` (all 42 modules init clean against their real page DOM) and `build/speedtest-check.js` (speed-test engine measured 23.73 down / 23.57 up against a simulated 24 Mbps link).

### 2026-10-28 session B (speed test + mobile + deploy)

- **Internet Speed Test was never working** (the live page 404'd its own module; the old script used `L.map()` without Leaflet, a `mode:'same-origin'` cross-origin fetch, ipapi.co, single-shot download, no auto-run). Rewritten:
  - `build/src/tools/t/internet-speed-test.js` — real engine: 8–12 serial Cloudflare `__down?bytes=1` round trips (first discarded) → min/avg/jitter; 3–6 parallel download streams with bytes counted from the `ReadableStream`, sampled every 250 ms into a window of 4–11 s; upload from `XMLHttpRequest.upload.onprogress` of a random `crypto.getRandomValues` payload, aggregated across streams (per-stream averaging under-reported by the stream count — fixed); log-scale dial (`getTotalLength` + `stroke-dashoffset` + needle `rotate(a 110 120)`); quick/standard/precise data budgets (12/35/80 MB caps); auto-start after 320 ms unless `navigator.connection.saveData`; Stop aborts the `AbortController` and every in-flight XHR; jsDelivr fallback for download if Cloudflare is blocked and an honest "upload not measurable" instead of a fake number.
  - `build/src/tools/content/internet-speed-test.js` — new SEO copy + gauge/phase/prog/stat markup; every id the engine reads now exists in the page (`g-arc needle mbps unit phase bar go stop profile err ping min jitter down up rating engine`).
  - Both Cloudflare endpoints re-checked from this machine: `__down` and `__up` return `Access-Control-Allow-Origin: *` (POST allowed, `content-type` exposed).
- **`tools.config.js` was corrupt** — a previous agent appended two duplicated blocks to the `TOOLS` array plus a stray comma that created a sparse hole, which made `tools-build.js` throw `Cannot read properties of undefined (reading 'slug')`. Deduplicated: 42 unique entries, age/zakat keyword sets merged into their canonical entries, `resize-compress-image` given `module: "image-size-adjuster"`, speed-test entry renamed (no "& Map").
- **`resize-compress-image` was a verbatim clone of `image-size-adjuster`** (same title/desc/h1/paragraphs → 9 duplicate paragraphs + a title collision). Rewritten with unique copy; audit now `duplicate-paragraphs=0`.
- **Extensionless pages**: `dist/tools/<slug>` files were tracked in git but stale. `tools-build.js` now writes the twin from the same HTML on every build (canonical still points at `…/<slug>.html`, firebase rewrites unchanged). No tool was deleted.
- **Mobile-first pass in `tools.css`** (the "half the screen is empty, I have to zoom" report):
  - `.ta` textarea was `font-size:.9rem` = 14.85 px → iOS Safari zooms the whole page on focus. Every control (`.fld` inputs/selects/textarea, `.row-item`, `.hub-search input`, `.ta`) is now `1rem` (≥16 px) — no more focus zoom.
  - `.tool-hero` had `padding: … clamp(16px,4vw,0)` (invalid: min>max → 0) and a glow pseudo-element at `inset:-10% -6% -20%` sticking 12 % past the viewport. Padding fixed, glow moved to `inset:0`, hero `overflow:hidden`.
  - `.tbl` gets `table-layout:fixed` + `overflow-wrap:anywhere`; `max-width:100%` on img/svg/canvas; `min-width:0` on all grid/flex children so a long filename or base64 string cannot push a column wider than the screen.
  - App feel: 44 px chips/buttons, `touch-action:manipulation`, full-width action buttons under 640 px, one-column options under 400 px, safe-area bottom padding, `-webkit-text-size-adjust:100%`, and a `@media (hover:none)` block that disables the card-lift transforms which stick after a tap on touch. All mobile overrides sit at the END of the file so they win over the later 3D-theme rules.
- **New scripts:** `build/tools-audit.js` (id/asset/hub-link wiring), `build/tools-smoke.js` (loads tools.js + each module in a stub DOM built from that page's real ids), `build/speedtest-check.js` (behavioural test of the speed engine). `build/patch-existing.js` fixes: the sitemap function bailed out after finding one tools URL, and `addFooter` could insert a second Free Tools `<li>`; both idempotent now.
- **Not done:** no real-browser test of any tool (no browser on this machine), `keywords.md`, and the marketing homepage `dist/index.html` (old generation) still has no Free Tools nav link — it will get one from `build/build.js` on the next marketing rebuild.

### 2026-10-29 session C (speed, mobile, all-tool fixes, admin, deploy)

User reported the live site still felt slow (even the mouse), mobile buttons were cut,
many tools were dummy, and admin login often failed. This session did a full real-browser
pass and fixed the shared causes rather than individual pages.

**Performance**
- Added a global "performance mode" at the end of `styles.css`, `3d.css` and
  `tools-3d.css`: no CSS animations/transitions, no `backdrop-filter`, no orbs/marquee/
  cube spin/shine/ping, reveal elements forced visible, cards keep a light static shadow.
- `main.js`: ambient neural canvas, tilt and count-up disabled; testimonial auto-play
  removed (manual dots/swipe still work).
- `3d.js`: cube auto-rotation, tilt and count-up disabled; reveals show immediately.
- `tools-3d.js`: now a no-op (static CSS 3D styling remains).
- `dist/index.html` inline CSS/JS got the same treatment; `build/src/index-3d.html`
  updated so a future marketing build keeps it.
- Replaced four 4K tool hero JPEGs (774 KB–1.3 MB) with 29–58 KB WebP versions and
  added `width`/`height`; tool page transfer dropped from ~1.3 MB to ~200 KB locally.

**Shared tools runtime**
- `T.LIBS` now copies the inline `WST_T.LIBS` manifest. This was the root cause of
  "Unknown library qr" and would also have broken PDF/ZIP/HEIC on pages whose config
  did not list the lib. Every page now advertises all pinned libs; they still lazy-load.
- `tools-build.js`: idempotent Free Tools nav/footer insertion (services.html already
  had the link, so the old code would have duplicated it), `class="tools-main"` on every
  tool page, all libs in the inline manifest, WebP hero images.
- Hub search now uses `.t3d-card[data-search]` (the old `.tool-card` selector found
  nothing). `#no-res` logic fixed.
- `T.imageTool`: a new single file replaces the previous one; tile removal refreshes
  Clear/Run state. `T.dropzone`/`T.tileList` behaviour otherwise unchanged.

**Tool fixes**
- Delete/Extract PDF Pages: `$$` was undefined in `pdf-page-picker.js`; added `const $$ = T.$$`.
- Password Generator: uppercase pool contained a literal ellipsis instead of N–Z.
- QR Generator: the preview canvas was set to 0×0 after generating; removed that.
- Split PDF: Clear button now enabled after load; reset revokes output URLs.
- HEIC to JPG / Image to PDF: verified with a real HEIC file; all libs now available.
- Age Calculator: real Hijri (Umm al-Qura via `Intl`) and Desi/Bikrami conversion from
  `desi-months.json`; Gregorian totals, next birthday, ±2 day Hijri adjustment.
- Zakat: jewellery checkbox now excludes/includes gold/silver grams; results use the
  selected currency; nisab and 2.5% math verified.
- Khums: selected currency and Khums-year start date shown in the result.
- Gym: units selector converts kg/lb and cm/in, labels update; US Navy body-fat formula
  now receives inches; Karvonen HR zones; 1RM unit suffix; water result no longer reset
  by `main.js` count-up; duplicate warning removed.
- Lorem Ipsum: words mode generates the requested number of words; list mode produces
  list items and respects `<ul>/<li>` output.
- Internet Speed Test: removed auto-run/network on page load (was causing Cloudflare
  429s and wasted bandwidth); Start is manual and still measures correctly.
- Mobile hero images: 4K JPEGs replaced with WebP (see performance above).

**Admin**
- `admin.js` (source + `dist/assets/js/admin.js`): safe localStorage/sessionStorage
  wrappers, in-memory fallback, clear storage warning, auth persisted across reload/new
  tab, logout clears both stores, "reset local admin" button with confirm.
- Fixed nested `data-path` / `data-pk` saving (`setPath`) — the old loop called
  `shift()` twice and wrote to the wrong object.
- ARIA: `.adm-side` and `.gym-tabs` changed from `role="tablist"` to `role="group"`;
  review articles got `role="listitem"`; testimonial dots are a group.

**Verification (Playwright, local server on `dist/`)**
- 50 pages at 320/360/390/768 px: 0 overflow/clipped controls, 0 page/console errors.
- `node build/tools-smoke.js`: 42/42 modules initialise clean.
- `node build/tools-audit.js`: 42/42 pages pass static wiring.
- Real files: image→PDF, PDF→images, merge, split, delete, extract, resize, compress,
  JPG/PNG/WebP/HEIC, crop, rotate, watermark, base64, passport, QR URL/text/WA/WiFi,
  speed test; calculator/text tools all produce results; admin default/custom/reset.
- No continuous CSS animation found on any page.
- `build/browser-audit.js` remains available for regression at 360 px; temp test scripts
  from this session were removed after use.

**Deploy (done 2026-10-29):** `firebase deploy --only hosting --project wafasmart-tech`
succeeded (Firebase CLI 15.34.1, 324 files). Live checks:
- `https://wafasmart.tech/`, `/tools/`, tool pages, `/admin.html`, WebP assets,
  `tools.js` and `admin.js` all return **200**.
- Live hub search, BMI calculator, merge-PDF with real files and admin login work.
- Live admin dashboard has **0 horizontal overflow at 320/360/390 px**.
- Live CSS contains the performance-mode and admin mobile-containment rules.

Redeploy later with the same command. After changing global CSS/JS, copy the files to
`dist/assets/...` (or run the relevant build) before deploying.

### 2026-10-30 session D (UAE VAT SEO/order + full tool re-test)

User reported that many tools still did not work completely and asked specifically for the
UAE VAT calculator: fix it, improve SEO, put the calculator at the very top, move the extra
content below, and add better keywords.

**UAE VAT calculator**
- `content/uae-vat-calculator.js` now sets `uiFirst: true`; `tools-build.js` renders the tool
  block immediately after the breadcrumb and the hero/docs below it. `.tool-first` CSS keeps
  the gap tight on mobile. On a 390 px viewport the calculator starts at ~122 px, above the
  hero (previously ~471 px).
- Calculator logic was re-tested: add 5% (1,000 → 1,050), remove 5% (1,050 → 1,000),
  0% (1,000 → 1,000), custom 15% (1,000 → 1,150); no console errors.
- SEO: title `UAE VAT Calculator 2026 — Add or Remove 5% VAT in AED`, 155-char description,
  14 keywords (Dubai, Abu Dhabi, AED, reverse VAT, FTA, GCC, formula, etc.).
- Added two content sections with tables: `UAE VAT formula (5% standard rate)` and
  `VAT-inclusive vs VAT-exclusive examples`; 10 FAQs covering 2026 rate, manual formula,
  Dubai/Abu Dhabi, zero-rated vs exempt and other GCC states.
- JSON-LD: `WebApplication` is now `FinanceApplication` with `priceCurrency: AED`; added
  `HowTo`; FAQPage and BreadcrumbList remain. `tools-build.js` supports optional
  `t.sections` and `t.uiFirst`.

**SEO system-wide**
- `metaHead()` now emits `<meta name="keywords">` from `t.kw` for every tool page, plus
  hub/category keywords.
- `ldHowTo` is emitted for every tool with steps.
- Related-tool cards no longer claim "3D animated" (effects were removed in session C).
- Added keyword arrays to merge-pdf, split-pdf, delete-pdf-pages and extract-pdf-pages.

**Speed test**
- Removed the automatic `locate()` call on page load. The connection panel now fills only
  after Start, so no third-party request happens on arrival and the browser audit no longer
  sees a Cloudflare 429. Manual speed test still measures ping/download/upload.

**Verification**
- `node build/tools-audit.js`: 42/42 clean.
- `node build/tools-smoke.js`: 42/42 modules initialise.
- `node build/browser-audit.js`: 54 pages, 0 problems (no console/page errors, no overflow).
- 54 pages at 320/360/390/768 px: 0 overflow/clipped-control problems.
- 42/42 primary tool flows pass in Playwright: 21 calculator/text, 19 image/PDF with real
  PNG/JPG/WebP/HEIC/PDF samples, gym tabs, and manual speed test.
- UAE VAT page has one H1, 14 keywords, 2 tables, 10 FAQs and valid JSON-LD types
  WebApplication + FAQPage + HowTo + BreadcrumbList.

**Deploy:** round-2 deploy completed successfully (374 files). Live verification passed:
`https://wafasmart.tech/tools/uae-vat-calculator` returns 200, the calculator starts at
~122 px on a 390 px viewport, add/remove/custom VAT all work, and the page serves the new
title, description, 14 keywords, 2 tables, 10 FAQs and four valid JSON-LD blocks. Live
speed-test page stays idle until Start, and live PDF merge + QR generation still work.


## 4. Known facts future agent needs

- Existing sitemap uses `<xhtml:link hreflang>` blocks + lastmod 2026-10-22 style; new tool entries append before `</urlset>`.
- firebase.json already has X-Content-Type-Options/Referrer-Policy under `"source": "**"`; user asked to keep + set HTML cache ~1h: change `**/*.html` rule `no-cache` → `public, max-age=3600, must-revalidate` and add immutable rule for `/tools/assets/*`. Diff must be shown first.
- pdf-lib API: `PDFDocument.create()`, `embedJpg/embedPng` (no embedHeic — convert via canvas first), `page.setSize/Width/Height` in PDF points (72/inch). A4=595.28×841.89, Letter=612×792.
- For image→PDF we re-encode every input to JPEG via canvas (handles transparency w/ white background, EXIF via `imageOrientation:"from-image"`, and heic/png/webp/tiff inputs uniformly) — keeps pdf-lib usage trivial and file sizes predictable.
- HEIC support: `heic2any` **0.0.4** from jsDelivr with SRI (0.0.40/0.0.42 do not exist), lazy-loaded only when a .heic file is dropped. QR uses cdnjs `qrcode-generator` 1.4.4 (npm `qrcode` has no standalone browser bundle).
- Word counter must count Unicode words: `text.trim().match(/[\p{L}\p{N}'’\-]+/gu)` — handles Urdu/Arabic script.


## 5. Final deliverables (appended 2026-10-28)

### (a) Tree of every added file
**Build sources:**
- build/patch-existing.js
- build/tools-build.js
- build/src/tools/tools.config.js
- build/src/tools/tools.css
- build/src/tools/tools.js
- build/src/tools/config/{pakistan-tax.json,uae-vat.json,zakat.json}
- build/src/tools/content/_helpers.js, _kit.js + 42 content/*.js
- build/src/tools/t/*.js (modules + per-page scripts)

**Dist outputs:**
- dist/tools/index.html + 42 tool HTML pages (each also written extensionless as `/tools/<slug>`)
- dist/tools/assets/tools.css, tools.js
- dist/tools/assets/config/*.json
- dist/tools/assets/t/*.js (42 files; shared modules copied per slug)

### (b) Diff of every existing file touched (from Task 1)
Backups stored in `build/backups/tools-patch-2026-10-28/`.

**dist/*.html and dist/blog/*.html (45 files):** Added `<li><a href="/tools/index.html" data-i18n="nav.tools">Free Tools</a></li>` immediately before Contact in nav (where nav-links present). Added same link in Footer Company list before Contact (where Company section present). `dist/index.html` skipped (different header structure, nav anchor missing) — noted as error.
**build/build.js:** Added `["tools", "Free Tools", "فری ٹولز", "/tools/index.html"]` to nav L array before contact; added Free Tools to footer Company row before contact.
**build/src/js/i18n.js, dist/assets/js/i18n.js:** Added `"nav.tools": "فری ٹولز"` next to `"nav.contact": "رابطہ"`.
**dist/sitemap.xml:** Inserted 43 `<url>` entries (hub + 42 tools) before `</urlset>` with lastmod 2026-10-28, hreflang en/ur/x-default, changefreq monthly, hub priority 0.9, others 0.8.
**dist/robots.txt:** Added `Allow: /tools/` under `Allow: /`.
**firebase.json:** Added rewrites for `/tools` and `/tools/:slug`; changed `**/*.html` cache to `public, max-age=3600, must-revalidate`; added immutable cache rule for `/tools/assets/**`. Existing security headers unchanged.

### (c) Exact library list with pinned versions + SRI
From `build/src/tools/tools.config.js` (all hashed):
- pdf-lib 1.17.1 — https://cdn.jsdelivr.net/npm/pdf-lib@1.17.1/dist/pdf-lib.min.js (525099 B) SRI: `sha384-weMABwrltA6jWR8DDe9Jp5blk+tZQh7ugpCsF3JwSA53WZM9/14PjS5LAJNHNjAI` global: PDFLib
- jszip 3.10.1 — https://cdn.jsdelivr.net/npm/jszip@3.10.1/dist/jszip.min.js (97630 B) SRI: `sha384-+mbV2IY1Zk/X1p/nWllGySJSUN8uMs+gUAN10Or95UBH0fpj6GfKgPmgC5EXieXG` global: JSZip
- pdfjs-dist 3.11.174 — https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/build/pdf.min.js (320004 B) SRI: `sha384-/1qUCSGwTur9vjf/z9lmu/eCUYbpOTgSjmpbMQZ1/CtX2v/WcAIKqRv+U1DUCG6e` global: pdfjsLib; worker: https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/build/pdf.worker.min.js (1087212 B) SRI: `sha384-SnzOobpRMLXZ52iJvZm/C0fYw0OQemTXzTjIsdsfMcrCtCEe9qgzxTd3RSklO5x2`
- heic2any 0.0.4 — https://cdn.jsdelivr.net/npm/heic2any@0.0.4/dist/heic2any.min.js (1351840 B) SRI: `sha384-OTofQ0MEeiSgh62havBcemCIK0gqj809wX6UA0uPISNMRnR6NZyCdGzX3SbLrgwL` global: heic2any
- qrcode-generator 1.4.4 — https://cdnjs.cloudflare.com/ajax/libs/qrcode-generator/1.4.4/qrcode.min.js (20387 B) SRI: `sha384-mZT2gIty7ZDdOGkxfP6joZcYdMW1Jvj9dRlfpTmaJAKKXTqzygtB22k7FLe+KZC1` global: qrcode

### (d) Per-page first-load weight table (from `node build/tools-build.js --report`)
Key assets (gzipped): tools.css 3.48 KB, tools.js 6.55 KB, site styles.css ~15 KB loaded by header. Per-tool HTML 7.5-9.3 KB gz, per-tool JS 0.9-2.6 KB gz. First load ≈35-40 KB excluding CDN libs. Full report available via `node build/tools-build.js --report`.

### (e) Known limitations
- HEIC conversion needs a ~1.3 MB WASM decoder from CDN on first use (connection required).
- Very large PDFs can exhaust browser memory past ~60 MB.
- compress-image may not reach an aggressive KB target on a huge photo (reports smallest possible).
- Passport maker cannot auto-detect faces (manual position sliders).
- FBR/Zakat/VAT rates are indicative JSON values — verify and edit as needed.
- Tool docs are English + Roman Urdu.

### (f) Deploy command (run 2026-10-28, redeploy after any rebuild)
```bash
firebase deploy --only hosting --project wafasmart-tech
```

### (g) Google Search Console steps
1. Verify domain `wafasmart.tech` in Google Search Console.
2. Submit sitemap: `https://wafasmart.tech/sitemap.xml`
3. URL-Inspect a few tool pages (e.g. `/tools/`, `/tools/compress-image`, `/tools/image-to-pdf`)
4. Request Indexing for key pages
5. Watch "tools" query group after ~1-2 weeks for impressions/clicks

---

## 6. SEO content round — 19 blog guides (2026-10-30)

### What was added
- 19 new SEO articles under `dist/blog/`:
  - 7 UAE VAT guides (calculator, reverse VAT, inclusive/exclusive, rates, registration,
    tax invoice, VAT return).
  - 6 Pakistan guides (salary tax, Zakat, BMI, compress to 50KB, PDF tools, freelancer tax).
  - 6 free domain/hosting guides (free domain, static hosting comparison, free hosting in
    Pakistan, SSL, small-business website, domain vs hosting).
- Rebuilt `dist/blog.html` with 21 cards in four groups (UAE VAT, Pakistan, hosting,
  AI/earning), updated title/description/keywords and `ItemList` schema.
- Every article has unique title/description/keywords/canonical/OG/Twitter plus
  `Article` + `FAQPage` + `BreadcrumbList` JSON-LD.
- Added all 19 URLs to `dist/sitemap.xml` inside `<!-- BLOG-GUIDES -->` markers.
- Added `guide` / `guideTitle` fields to 7 tool content files (UAE VAT, salary tax, Zakat,
  BMI, compress image, image size adjuster, merge PDF); `tools-build.js` renders a
  "Read the full guide" link in the tool docs.
- `build/browser-audit.js` now includes `/blog.html` and every `/blog/*.html` page.

### Files
- `build/blog-build.js` — generator; reads `dist/blog.html` for the shared shell, writes
  articles, rebuilds the blog index and updates the sitemap. Re-runnable.
- `build/blog/data-uae.js`, `build/blog/data-pakistan.js`, `build/blog/data-hosting.js`.
- `SEO-CONTENT-PLAN.md` — list of all 19 URLs and rebuild steps.
- `TASKS.md` — completed task list and test results.

### Verification
- `node build/browser-audit.js`: 76 pages, 0 problems at 360 px.
- 20 blog pages at 320/360/390/768 px: 0 overflow, 0 console/page errors.
- All 19 new pages: 1 H1, unique meta, 4 FAQs, valid JSON-LD.
- 74 internal hrefs crawled: 0 real 404s.
- `/blog.html`: 21 cards, 21 unique links.
- Sitemap: 21 blog URLs (19 new + 2 existing).
- `node build/tools-audit.js` and `node build/tools-smoke.js` still pass 42/42.

### Rebuild / deploy
```bash
node build/blog-build.js
node build/browser-audit.js
firebase deploy --only hosting --project wafasmart-tech
```

### Notes
- The free-domain article is honest about the difference between a free subdomain and a
  paid custom domain; it does not promise a permanent free .com.
- UAE VAT/FBR/Zakat figures are marked "verify with the authority"; they are general
  information, not tax advice.
- `dist/` is generated. Do not hand-edit generated article files; edit the data files and
  rerun `build/blog-build.js`.

### Live deploy result (2026-10-30)
- Firebase Hosting deploy succeeded: 393 files.
- All 19 new article URLs return 200; live `/blog.html` has 21 cards and 21 unique links.
- Live sitemap has 21 blog URLs. Live 320/390 px checks: 0 overflow, 0 console errors.

---

## 7. Building material calculator + construction cluster (2026-10-30)

### What was added
- New 43rd tool: `/tools/building-material-calculator` — calculator-first page (`uiFirst: true`).
- Inputs: covered area (sq ft, sq m, Marla, Kanal), 1–5 stories, brick or block wall type,
  grey/semi/complete finishing, economy/standard/premium quality, city/region and wastage.
- Outputs: bricks or blocks, cement bags (50 kg), steel kg/tons, sand cft/tons, crush cft/tons,
  tiles and paint when finishing, plus a PKR/AED cost range and copy-summary.
- 32 target keywords covering building material calculator, Lahore, Karachi, Punjab, Dubai,
  Sharjah, bricks, cement, steel, sand, crush, grey structure and construction cost.
- Schema: WebApplication + HowTo + FAQPage + BreadcrumbList; research/sources section.
- Three supporting guides:
  - `/blog/building-material-calculator-guide.html`
  - `/blog/house-construction-cost-lahore-karachi-2026.html`
  - `/blog/building-material-cost-dubai-sharjah-2026.html`
- Blog index rebuilt with a “Construction and building material guides” group; 24 cards total.
- Sitemap updated with the new tool and 3 guide URLs.

### Files
- `build/src/tools/content/building-material-calculator.js` — page content, SEO, tables, FAQs, sources.
- `build/src/tools/t/building-material-calculator.js` — calculator runtime.
- `build/blog/data-construction.js` — 3 construction guides.
- `build/blog-build.js` — now loads `data-construction.js` and renders the construction group.
- `build/src/tools/tools.config.js` — 43rd catalog entry and hub description.
- `build/src/tools/catpages.js` — calculator category count updated to fifteen.
- `build/tools-build.js` — short name, card blurb and `sources` rendering.

### Verification
- 43/43 tool modules initialise; 43/43 static wiring audit passes.
- 80 pages at 360 px: 0 overflow, 0 clipped controls, 0 console/page errors.
- 192 city × masonry × finish combinations: 0 failures.
- 20 mobile checks at 320/360/390/768 px on the new tool, guides and blog index: 0 problems.
- 73 internal links: 0 broken.
- Copy-summary tested with clipboard permissions.
- Live deploy succeeded (400 files); live tool, guides and sitemap return 200.

### Rebuild / deploy
```bash
node build/tools-build.js
node build/blog-build.js
node build/browser-audit.js
firebase deploy --only hosting --project wafasmart-tech
```

### Notes
- Construction ratios and city rates are planning assumptions, not a BOQ or contractor quote.
- The calculator applies wastage and a storey factor; verify steel and concrete with structural drawings.
- `dist/` is generated; edit the content/data files and rebuild.

---

## 8. Homepage rebuild, service catalogue at PKR 14,000, live-demo gallery (2026-11-01)

### What changed
- **Homepage is now generated, not hand-edited.** `build/home.js` renders
  `build/src/index-3d.html` + `build/src/css/home.css`; `build/build.js` copies it over
  `dist/index.html`. It keeps the cloned storefront's design system and every section from
  hero to footer (cube first), with all copy, links and imagery replaced by our own
  web-dev/software content. Zero clone text, zero clone media.
- **CSS is pruned, not vendored.** A brace-matching parser keeps only the selectors the page
  actually uses (1264 of 6545) plus a small state-class allowlist, strips any declaration
  pointing at clone `url()` paths and rewrites font URLs to `/assets/fonts/…`.
  Result: 93.7 KB raw / **21.1 KB gzipped**, page HTML 21.3 KB gzipped.
- Hand-written additions to that design live in `build/src/home/extra.css` and
  `build/src/home/cube.css` (appended by `home.js`, never edited in `sfiva.min.css`).
- **32 services**, every website vertical at the published **PKR 14,000** flat rate
  (business, travel, hotel, school, hospital, property, job portal, e-commerce, LMS,
  donation, restaurant, salon, gym, car dealer, wedding/event, shaadi/banquet hall, courier,
  pharmacy, masjid, import-export, law firm). Management/ERP/POS 20,000 · AI/voice/receptionist/bot
  23,500 · Android/Windows 30,000 · iOS 35,000. Each has its own page, JSON-LD and Roman Urdu copy.
- New homepage sections: **credentials** (`cert-strip cs-charter`, the cube's people band) and
  the **14,000 rate band** (`season-band`) with a 10-card drag rail of the new verticals.
  Mega menu now spans 5 groups covering all 32 services.
- **`/demos.html` — new page.** Nine live demo builds, each photographed from the running page
  (`build/scripts/demo-shots.js`), grouped as "three designs, one brief" (Sterlix A/B/C) plus the
  travel, ERP (Roman Urdu + full Urdu), real-estate and SP Group builds. Linked from the homepage
  work rail, the portfolio page and the footer on every page. Registered in `PAGES`, so it is in
  the sitemap (58 URLs).
- **Speed test fixed for real.** `t/internet-speed-test.js` aborted the whole run when
  `speed.cloudflare.com` refused ping; it now falls back to a small jsDelivr file for
  latency and continues to the download/upload stages. Verified on this host with Cloudflare
  returning 429: completes with a real figure (505 Mbps) instead of failing.
- **Brand set is our own, at 4K.** `build/scripts/brand-kit.js` draws the gold-"W" badge as SVG
  and composites it in Chromium: `logo.webp`/`logo.png`, `icon-192/512`, `icon-maskable-512`,
  `apple-touch-icon`, `favicon-16/32`, `logo-master.webp` (3840) and the social share card
  `og-cover.jpg` (1200×630, master 3840×2016). Text is auto-fitted so nothing overflows.
- **Image pipeline.** `build/scripts/webp-kit.js` turns artwork into a 3840 master
  (`build/src/assets/img/raw/`) plus served ladders (square 160–880, wide 320–1600).
  `build/scripts/stock-kit.js` is the equivalent for downloaded photography — see the note below.

### Product photography: why the cards still use our own artwork
The instruction was to download free stock instead of generating. What the reachable sources
actually offer from this server:
- Openverse API — unreachable (timeout). Pexels, Burst, Pixabay, Unsplash — 403 or require an
  API key we don't have. `source.unsplash.com` — 503 (retired).
- ImageSearch results for these subjects are marketplace renders (alicdn / 3d66), not
  free-licensed.
- Wikimedia Commons is reachable and free-licensed, but its coverage of *modern commercial
  subjects* is poor: "hair salon" returns village-museum and 1970s archive shots, "car dealer"
  returns UK geograph photos, and most matches are CC BY / CC BY-SA, which obliges us to publish
  an author + licence credit for each image on the page. Downloads from `upload.wikimedia.org`
  were also being cut off with 429 and several originals fail to decode in Chromium.
So `stock-kit.js` ships with the pipeline (search → licence filter → centre-crop → 4K master +
ladder) and a **`build/src/assets/img/stock-drop/` folder: drop any licensed photo there as
`<stem>.jpg` and `node build/scripts/stock-kit.js` converts and swaps it in on the next build.**
Until then the cards keep the generated isometric set, which is licence-clean and matches the
navy/gold design.

### Files
- `build/home.js` — homepage generator (sections, mega menu, `picW()` responsive helper).
- `build/src/home/extra.css`, `build/src/home/cube.css` — additive design CSS.
- `build/build.js` — 32 service pages, `demos()` page, footer link, `${NSVC}` counts.
- `build/src/data/site.js` — services, `SERVICE_PRICES`, FAQ rate answer, `LIVEDEMOS`.
- `build/scripts/{webp-kit,brand-kit,stock-kit,demo-shots,home-audit,site-audit}.js`.

### Verification (all local, before deploy)
- `site-audit.js --live`: **150 pages, 741 assets, 0 broken internal references**, 2 flagged
  pages — `/demo2/2.html` (an unlinked scratch file whose `images/*.jpg` were never committed)
  and one lazy-load `ERR_ABORTED` that disappears when the page is scrolled normally.
- `home-audit.js` desktop 1440 + mobile 390: 0 console errors, 0 failed requests, 0 dead links,
  0 clone references, 0 images without width/height, **0 page-level horizontal overflow**,
  13 sections, cards {services 34, packages 5, work 12, reviews 10, faqs 12, cities 38, tools 5}.
- `tools-audit.js` 43/43 · `tools-smoke.js` 43/43 modules initialise clean.
- Known gap: `dist/demo60/` is empty and referenced nowhere in git history — nothing to restore.

### Rebuild / deploy
```bash
node build/home.js && node build/build.js && node build/tools-build.js
node build/scripts/site-audit.js --live      # serve dist on 127.0.0.1:8199 first
node build/scripts/home-audit.js
firebase deploy --only hosting --project wafasmart-tech
```

### 8b. Full section-by-section reference match + deploy (2026-11-01)
The homepage was rewritten to follow the reference storefront's exact node order — 28 nodes
separated by `div.sec-seam`: `hall` (cream hero + 8 portals) → `ribbon` → `cert-strip` →
`qc-sec` (16 quick links) → `signature` → `season-band` (18 + 6 men rail) → `new-in` (10 work
cards) → `scene55` → `gift-salon` (8 extras) → `sd53` same-day check → `sales-cal` (3 offers +
live countdowns) → `houses` (8 bento tiles) → `estate55` → `scene55` → `pantry` (stack) →
`sets` (5 packages + 4 add-ons + 18 services) → `films` (18 live screens) → `eco-trust` →
`easy-order` → `next-drop` (24 launches) → `eco-grow` (8 partners) → `biz-band` → `export-band`
→ `scene55` → `boutiques` (offices) → `journal` → `finale` → `footer`. Every section is our
copy, our links, our imagery — no clone word, no clone media, no `<video>` (we own none).

- **Pruner fix (important).** `used()` now strips `:not(.x)` before the class/id check. A class
  inside `:not()` must be *absent* for the rule to apply, so treating it as "unused" was silently
  dropping default-layout rules site-wide (e.g. the `.houses:not(.compact) .h0` bento spans).
- **3D cube placement — deliberate change.** The cube moved out of the hero into the
  `#signature` product stage (`.stage.lh-stage > .stage-product`), which is the reference's own
  hero-product slot and still lands in the first scroll. `extra.css` neutralises the stage's
  product-PNG float/mask for the cube and mirrors `.sfv` as our `.hw` wordmark class.
- **Runtime JS** (`build/src/js/home.js`) gained: hero dust canvas (reduced-motion aware,
  DPR-scaled, pauses off-screen), stage parallax for `[data-sat]`/`[data-depth]`, offer
  `[data-countdown-to]`, the `[data-sd-check]` city answer (reads an embedded
  `[data-cities]` JSON, builds the reply with DOM nodes — no `innerHTML` on user input),
  `[data-textsize]` big-text toggle persisted to `wst.bigtext`, and a `mailto:` newsletter
  handoff. No third-party calls, nothing stored.
- **OG share card regenerated** via ImageGen → Chromium canvas → 1200×630 `og-cover.jpg`
  (our cube motif, gold-on-dark, PKR 14,000 badge, four cities). `og:image:width/height`
  corrected from 2400×1250 to 1200×630.
- **No within-section image duplicates** (the `new-in` repeats are hover-only `.p-alt` swap
  images, never shown at once). Hero doors and the add-on rail were re-pointed to distinct
  images to clear the last visible collisions.
- **Verified then deployed.** Local render at 1440 + 390: 1 h1, 0 console errors, 0 failed
  requests, 206 images none broken, 0 video, no horizontal overflow, all interactive widgets
  working, 0 clone tokens in `dist/index.html` + `home.css`. Critical path HTML 32.5 KB +
  CSS 32.5 KB + JS 5.3 KB gz. `firebase deploy --only hosting` shipped 1179 files; live check
  of `/`, `/tools`, `/tools/zakat-calculator`, `/demo4`, `/demo40`, `/demos.html`, home
  assets and the OG image all **200**, homepage clean, single h1. Tools and demos were not
  touched — they resolve at their existing indexed URLs.
