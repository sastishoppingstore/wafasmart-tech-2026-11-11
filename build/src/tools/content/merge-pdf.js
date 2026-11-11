"use strict";
const H = require("./_helpers.js");
const LIST = (hint) => `<section class="t-card">
  <div id="dz" class="dz" tabindex="0" role="button" data-accept-hint="PDF files" aria-label="Add PDF files. Drop here or press Enter to choose.">
    <svg class="dz-ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3h8l4 4v14H7z"/><path d="M15 3v4h4"/><path d="M12 11v6m-3-3h6"/></svg>
    <b>${hint}</b><span>Or click / Enter to choose. Multiple files supported — drag thumbnails to reorder.</span>
    <input type="file" id="file" accept="application/pdf,.pdf" multiple hidden>
  </div>
  <ul id="list" class="tiles" aria-label="Selected files, drag to reorder"></ul>
  <p id="empty" class="hint">No file yet.</p>
</section>`;
const BAR = `<div class="prog" hidden><div id="bar" class="prog-i"></div></div>
  <p id="status" role="status" aria-live="polite" class="hint"></p>
  <a id="dl" class="btn btn-wa" href="#" hidden download="output.pdf">Download PDF</a>
  <p id="err" class="err" role="alert" hidden></p>`;

module.exports = {
  name: "Merge PDF",
  short: "Stitch two or more PDFs into one document in the order you drag them — bookmarks-free, size-free, browser-only.",
  kw: ["merge pdf", "combine pdf files", "join pdf online", "merge pdf free", "pdf merger no upload"],
  guide: "/blog/pdf-tools-for-pakistani-students.html",
  guideTitle: "Free PDF tools for Pakistani students",
  title: "Merge PDF Files Online — Combine in Order | Wafa Smart",
  desc: "Combine two or more PDFs into one file, in the order you choose. Drag to reorder, merge up to 200 MB of pages locally. Free and private.",
  h1: "Merge PDF — join several files into one document",
  libs: ["pdf-lib"],
  intro: [
    "Merging means appending the pages of file B, C and D behind file A so the recipient opens one attachment instead of five. This page does it with pdf-lib entirely inside your browser tab: file bytes are read locally, copied page-by-page into a new document and saved back to you. There is no upload step, so a merge of four 30 MB scans takes seconds on a normal laptop rather than the minute-plus an online uploader needs.",
    "Order is the whole point of a merge, so the selected files appear as a draggable list — first thumbnail becomes the first page-block. The counter beside each file shows how many pages it contains, which makes it obvious if your appraisal report accidentally landed before your cover page. Renaming the output is a single text field; the default is merged.pdf.",
    "Mixed page sizes are preserved exactly: an A4 letter followed by two landscape statements keeps each page as it was, because merging copies page content rather than re-rendering it. That also means text stays selectable, searchable and printable, unlike tools that flatten everything to images."
  ],
  steps: [
    "Drop two or more .pdf files into the box (or click it and multi-select on mobile).",
    "Drag the file tiles so the order matches the document you want; ✕ removes one.",
    "Type a file name — appraisal-pack, invoice-march, anything readable.",
    "Press 'Merge PDF'. The pdf-lib engine is downloaded on that first click and cached afterwards.",
    "Hit 'Download PDF' once the progress bar completes to save the combined file."
  ],
  ur: "Do ya us se zyada PDF files is box me dal dein, drag karke apni marzi ka tarteeb banayein, naam likhein aur 'Merge PDF' dabayein. Ek hi PDF file ban jayegi — sab kuch aapke browser me hota hai, upload kuch nahi hota.",
  features: [
    "Unlimited files per merge (subject to your device's memory, not a server cap)",
    "Drag-to-reorder list with page counts before you commit",
    "Original page sizes and orientations preserved exactly",
    "Text remains selectable and searchable — pages are copied, not rasterised",
    "Instant re-merge: files stay in the list, adjust order and press again",
    "Nothing is stored: closing the tab discards every working copy"
  ],
  tips: [
    "Put the smallest file first if you are merging on an old phone — pdf-lib builds in memory in the order you give it.",
    "Encrypted PDFs cannot be copied by any browser tool; if the page reports one, open it in a reader, print to PDF, then merge.",
    "If the result feels too big, run the merged file through PDF to Images at 2× and rebuild — that path always compresses.",
    "Name files before merging, not after: most operating systems sort by name, which makes '01-cover.pdf', '02-body.pdf' ordering reliable.",
    "Keep a copy of each original: merging is a one-way operation, so a wrong order means re-merging, not undoing."
  ],
  faqs: [
    { q: "How many PDFs can I merge at once?", a: "There is no artificial limit. Practically, most laptops comfortably handle 10–20 files or a few hundred pages in one tab; if you hit a memory error, merge in two groups and then merge the groups." },
    { q: "Does merging reduce quality?", a: "No. Pages and their embedded fonts/images are copied as they are. Quality only drops if a source file was already compressed." },
    H.faqFree("Merge PDF"), H.faqPrivacy("Merge PDF","PDF files"),
    { q: "Can I merge a scanned photo PDF with a Word export?", a: "Yes — the input type does not matter, only that both are valid PDFs. Mixed page sizes are kept page-by-page." },
    H.faqOffline("Merge PDF")
  ],
  related: [["split-pdf", "Split the other way"], ["delete-pdf-pages", "Drop unwanted pages"], ["image-to-pdf", "Photos into PDF"], ["pdf-to-images", "Pages into images"], ["extract-pdf-pages", "Keep only a few pages"]],
  ui: LIST("Drop your PDFs") + `<section class="t-card opts" aria-label="Options">
  <div class="fld"><label for="name">File name</label><input type="text" id="name" value="merged" maxlength="40" autocomplete="off" spellcheck="false"></div>
  <div class="acts"><button id="go" class="btn" type="button" disabled>Merge PDF</button><button id="clear" class="btn btn-ghost" type="button" disabled>Clear all</button></div>
  ${BAR}
</section>`
};
