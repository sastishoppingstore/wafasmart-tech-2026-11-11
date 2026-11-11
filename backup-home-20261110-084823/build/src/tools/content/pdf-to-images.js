"use strict";
const H = require("./_helpers.js");
module.exports = {
  name: "PDF to Images",
  short: "Export every page of a PDF as JPG or PNG at 1×–4× scale, preview them on screen and grab the whole set as one ZIP.",
  title: "PDF to Images — JPG/PNG Pages + ZIP | Wafa Smart",
  desc: "Convert PDF pages to JPG or PNG at up to 4× resolution, preview every page, and download the full set as one ZIP file. Private, in-browser.",
  h1: "PDF to Images — export each page as a crisp JPG or PNG",
  libs: ["pdfjs", "pdfjs-worker", "jszip"],
  intro: [
    "Sometimes a document has to travel as pictures: a contract that must be posted as slides, homework pages to send on WhatsApp, or each slide of a deck uploaded as separate images. This converter opens your PDF inside the browser with Mozilla's pdf.js renderer, paints every page onto a canvas at the resolution you choose, and hands you JPG or PNG files back — no account, no upload queue, no watermark stamped on page three.",
    "Scale is the knob that matters here. At 1× a page is screen-sized; at 2× you get roughly 144 dpi, which prints acceptably; at 3×–4× small footnotes and table figures stay legible when someone zooms on a phone. The trade-off is file size, so the default is 2× for JPG and you can push a single important page to 4× without re-exporting everything.",
    "Long files are handled page by page with the UI kept responsive: a progress bar tracks the current page, each finished thumbnail appears as it is rendered, and a per-page download button sits next to a 'Download all as ZIP' action so a 50-page report leaves your browser as exactly one file. Password-protected PDFs are detected and reported clearly instead of failing silently."
  ],
  steps: [
    "Drop your .pdf onto the box (or tap it on mobile and pick from Files/Downloads).",
    "Choose the output format — JPG for photos and small files, PNG for sharp text and line art.",
    "Choose scale: 1× (fast preview), 2× (recommended, roughly 144 dpi), 3× or 4× for print or tiny text.",
    "Press 'Convert PDF'. pdf.js loads from the pinned CDN on this click; the worker is fetched next and pages start rendering one by one.",
    "Save a single page with its button, or press 'Download ZIP' to get every page named page-01.jpg, page-02.jpg, and so on."
  ],
  ur: "Apni PDF is box me dal dein, format (JPG ya PNG) aur scale (2× behtareen) chunein, phir 'Convert PDF' dabayein. Har page ki preview aate hi nazar aati hai — ek page download karein ya poora set ZIP me le lein. Sab kuch aapke browser me, koi upload nahi.",
  features: [
    "JPG or PNG output at 1×, 2×, 3× or 4× scale (up to about 288 dpi)",
    "Page-by-page rendering with a live progress bar — the tab stays responsive",
    "Preview grid with per-page download plus one ZIP containing every page",
    "Handles landscape, mixed-size and very tall pages without cropping",
    "Transparent-free white background so scanned pages look identical",
    "Works on files with 50+ pages; ZIP packing is also local (JSZip)"
  ],
  tips: [
    "Use PNG for text-heavy pages: JPG can halo small serif fonts at 1×, PNG keeps them razor-sharp.",
    "A 200-page export at 4× can exhaust tab memory — split it first with the Split PDF tool, then convert each half.",
    "If a page is mostly a photograph, JPG at quality around 0.9 gives you a tenth of PNG's weight with no visible loss.",
    "Slides exported at 2× fit neatly as Instagram carousels after a quick crop with the Crop Image tool.",
    "Keep ZIP selected while the tab is open: the archive is rebuilt on click, so closing early discards it."
  ],
  faqs: [
    { q: "Can I convert only some pages?", a: "Yes — every rendered page has its own download button, so you can grab page 4 alone. To keep a range as a new document, use Extract PDF Pages first, then convert that smaller PDF." },
    H.faqFree("PDF to Images"), H.faqPrivacy("PDF to Images","PDF"),
    { q: "Why did my PDF open as blank or fail?", a: "Two usual causes: the file is password-protected (the tool tells you so instead of guessing), or it is corrupted. Try opening it in a normal PDF reader; if that works, re-save it once and retry here." },
    { q: "Does it keep the original page size exactly?", a: "The image is the page painted at your chosen scale, so an A4 page at 2× comes out roughly 1190×1684 pixels — the same proportions, no letterboxing." },
    H.faqMobile("PDF to Images")
  ],
  related: [["merge-pdf", "Merge PDFs first"], ["split-pdf", "Split large PDFs"], ["image-to-pdf", "Images back to PDF"], ["compress-image", "Shrink exported JPGs"], ["crop-image", "Crop a page"]],
  ui: `<section class="t-card">
  <div id="dz" class="dz" tabindex="0" role="button" data-accept-hint="a .pdf file" aria-label="Add a PDF. Drop file here or press Enter to choose.">
    <svg class="dz-ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3h8l4 4v14H7z"/><path d="M15 3v4h4"/><path d="M10 14h4M10 17h4"/></svg>
    <b>Drop your PDF</b><span>Or click / Enter to choose. One file at a time, any page count.</span>
    <input type="file" id="file" accept="application/pdf,.pdf" hidden>
  </div>
  <p id="finfo" class="hint" hidden></p>
</section>
<section class="t-card opts" aria-label="Options">
  <div class="fld"><label for="fmt">Format</label><select id="fmt"><option value="image/jpeg">JPG</option><option value="image/png">PNG</option></select></div>
  <div class="fld"><label for="scale">Scale</label><select id="scale"><option value="1">1× (fast)</option><option value="2" selected>2× (recommended)</option><option value="3">3× (print)</option><option value="4">4× (tiny text)</option></select></div>
  <div class="acts">
    <button id="go" class="btn" type="button" disabled>Convert PDF</button>
    <button id="zip" class="btn btn-ghost" type="button" disabled>Download all as ZIP</button>
    <button id="clear" class="btn btn-ghost" type="button" disabled>Remove file</button>
  </div>
  <div class="prog" hidden><div id="bar" class="prog-i"></div></div>
  <p id="status" role="status" aria-live="polite" class="hint"></p>
  <p id="err" class="err" role="alert" hidden></p>
  <div id="grid" class="out-grid" aria-label="Converted pages"></div>
</section>`
};
