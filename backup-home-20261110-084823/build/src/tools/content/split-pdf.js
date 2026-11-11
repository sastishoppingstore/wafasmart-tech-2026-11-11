"use strict";
const H = require("./_helpers.js");
module.exports = {
  name: "Split PDF",
  short: "Break a big PDF into separate files by page ranges — every 1 page, a range you type, or fixed-size chunks.",
  kw: ["split pdf", "split pdf online", "pdf splitter", "split pdf by range", "separate pdf pages"],
  title: "Split PDF Online — by Page Range or Chunks | Wafa Smart",
  desc: "Split a PDF into separate files by page range, fixed chunks or one file per page. Choose ranges like 1-3,5,9. Free, private, browser-only.",
  h1: "Split PDF — cut one file into exactly the pieces you need",
  libs: ["pdf-lib"],
  intro: [
    "Splitting a PDF means turning one long document into two or more smaller ones. The reasons are usually practical: an examiner wants only chapter 3, a bank portal refuses attachments over 5 MB, or each payslip in the yearly bundle must go out as its own file. This page reads your document with pdf-lib in the browser and writes the requested ranges as separate downloads, so nobody else ever sees the contents.",
    "You describe what you want in plain page arithmetic. 'Every page separately' produces one file per page named with its number. 'Fixed chunks' groups, say, 10 pages at a time. 'Custom ranges' takes the notation you already know — 1-3, 7, 12-15 — and creates one PDF for each range you list. Ranges can overlap and do not need to be in order; 5-8,1-4 is a quick way to reorder a two-part document without merging anything.",
    "Because splitting copies page objects instead of repainting them, the pages that come out are byte-for-byte the same quality as the ones that went in: fonts, links and vector drawings survive, and text stays searchable. A ZIP button collects all the pieces into a single archive so the download bar does not fill with twelve files."
  ],
  steps: [
    "Drop a .pdf into the box; the page count appears beside the file name as soon as it is read.",
    "Pick a mode: one file per page, fixed chunks of N pages, or custom ranges.",
    "For custom ranges type the pages you want, separated by commas — for example 1-4, 9, 12-16.",
    "Press 'Split PDF' (pdf-lib streams from the CDN on the first click only).",
    "Download each piece from the results list, or press 'Download ZIP' for all of them at once."
  ],
  ur: "PDF box me dal dein, phir mode chunein — har page alag file, barabar chunks (jaise 10-10 pages), ya apna range jaise 1-4,9,12-16. 'Split PDF' dabate hi chhoti files ban jati hain. Sab process aapke device par, file kabhi upload nahi hoti.",
  features: [
    "Three modes: one-per-page, fixed-size chunks, or typed custom ranges",
    "Comma ranges support single pages and pairs together (1-3, 7, 12-15)",
    "Reorder-free copy keeps vector text, links and fonts intact",
    "Results listed with page counts and file sizes before you save",
    "One ZIP for all parts when a split produces many files",
    "Works on protected-free files of 50+ pages without a timeout"
  ],
  tips: [
    "Check the page count first — PDF viewers sometimes number cover pages differently from the tool, which is why ranges land off by one.",
    "If a portal caps attachments, split into chunks and lower the chunk size until the largest piece fits; page count alone does not predict size.",
    "For a yearly bundle of identical payslips, 'one file per page' plus a rename pass is faster than hunting each month manually.",
    "Keep the original untouched: split output is a new file, so a wrong range is cheap to redo.",
    "Very large images inside a few pages usually cause size problems — those pages are better converted with PDF to Images."
  ],
  faqs: [
    { q: "What range notation does it accept?", a: "Hyphens for spans and commas to separate them: 1-4, 9, 12-16. Spaces are ignored and out-of-order entries are allowed; anything outside the document's page count is reported before you press split." },
    { q: "Will the split files be the same quality?", a: "Yes — pages are copied, not re-rendered, so a split file opened next to the original looks identical and searches the same." },
    H.faqFree("Split PDF"), H.faqPrivacy("Split PDF","PDF"),
    { q: "Can I split a 200-page PDF?", a: "Yes, if your device has memory for it. Most laptops manage a few hundred pages; if a tab crashes, first use Extract PDF Pages to halve the file, then split the halves." },
    { q: "Why does it ask me to download an engine?", a: "The page is a normal static file. The pdf-lib code (about 0.5 MB) is fetched from jsDelivr with a fixed version and integrity hash the first time you press Split, then reused from cache." }
  ],
  related: [["merge-pdf", "Merge pieces back"], ["extract-pdf-pages", "Keep only a range"], ["delete-pdf-pages", "Cut pages out"], ["pdf-to-images", "Pages as images"], ["image-to-pdf", "Rebuild from photos"]],
  ui: `<section class="t-card">
  <div id="dz" class="dz" tabindex="0" role="button" data-accept-hint="a .pdf file" aria-label="Add a PDF. Drop here or press Enter to choose.">
    <svg class="dz-ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3h8l4 4v14H7z"/><path d="M15 3v4h4"/><path d="M3 12h6M15 12h6"/></svg>
    <b>Drop the PDF to split</b><span>One file at a time. Page count is read instantly, in the browser.</span>
    <input type="file" id="file" accept="application/pdf,.pdf" hidden>
  </div>
  <p id="finfo" class="hint" hidden></p>
</section>
<section class="t-card opts" aria-label="Split options">
  <div class="fld"><label for="mode">Mode</label><select id="mode"><option value="each">One file per page</option><option value="chunk" selected>Fixed chunks</option><option value="custom">Custom ranges</option></select></div>
  <div class="fld" id="chunkf"><label for="chunk">Pages per file</label><input type="number" id="chunk" min="1" max="500" value="5"></div>
  <div class="fld wide" id="rangef" hidden><label for="ranges">Ranges (e.g. 1-4, 9, 12-16)</label><input type="text" id="ranges" placeholder="1-4, 9, 12-16" autocomplete="off"></div>
  <div class="acts"><button id="go" class="btn" type="button" disabled>Split PDF</button><button id="zip" class="btn btn-ghost" type="button" disabled>Download ZIP</button><button id="clear" class="btn btn-ghost" type="button" disabled>Remove file</button></div>
  <div class="prog" hidden><div id="bar" class="prog-i"></div></div>
  <p id="status" role="status" aria-live="polite" class="hint"></p>
  <div id="out" class="results" aria-label="Split results"></div>
  <p id="err" class="err" role="alert" hidden></p>
</section>`
};
