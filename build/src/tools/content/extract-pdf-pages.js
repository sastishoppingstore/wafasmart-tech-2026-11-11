"use strict";
const H = require("./_helpers.js");
module.exports = {
  name: "Extract PDF Pages",
  short: "Save only the pages you click as a brand-new PDF — perfect for pulling chapters, slides or receipts out of a big file.",
  kw: ["extract pdf pages", "extract pages from pdf", "save pages from pdf", "pdf page extractor", "split selected pdf pages"],
  title: "Extract PDF Pages — Save Selected Pages as PDF | Wafa Smart",
  desc: "Extract chosen pages from a PDF into a new file by clicking page numbers or typing a range like 3-7,12. Free, private, runs in your browser.",
  h1: "Extract PDF Pages — pull out only the sheets you need",
  libs: ["pdf-lib"],
  module: "pdf-page-picker",
  intro: [
    "Extraction is deletion seen from the other side: instead of asking which pages to throw away, you tick the ones to keep, and the tool writes those into a fresh PDF in the order you selected. It is the fastest route from a 60-page annual report to the eight-page schedule your accountant asked for, or from one merged bundle of receipts to individual vendor files.",
    "Every page of your document becomes a numbered button. Click them in any order — the selection list shows what you have picked so far, and you can also type a range such as 3-7,12 instead of tapping. Selected pages are copied with pdf-lib as real PDF objects, so text stays searchable, links stay clickable and the pages print exactly as they did in the source.",
    "Because the whole job happens in the browser tab, a 400-page statement archive never touches a server: no upload wait, no privacy question, no watermark. When you press Download you get extract.pdf (renameable) containing only your chosen pages — the original file stays on your device unchanged."
  ],
  steps: [
    "Drop the source .pdf into the box; page buttons render as soon as the file is parsed locally.",
    "Click the pages you want to keep, or type a range like 3-7,12 in the box and press Add.",
    "Review the selection strip — it lists page numbers in the output order.",
    "Press 'Create PDF' to build the new document (pdf-lib loads from the pinned CDN on this click).",
    "Download the extracted file and rename it if you like before saving."
  ],
  ur: "PDF dalne ke baad har page number button ban jata hai. Jo pages nikal ke alag file banani hain un par click karein — ya range likhein jaise 3-7,12. 'Create PDF' dabayein aur sirf chune hue pages ki nayi file download karein. Sab kuch aapke browser me, koi upload nahi.",
  features: [
    "Click-to-select page picker plus typed ranges (3-7,12 accepted)",
    "Output follows your selection order — handy for reassembling slides",
    "Real page copy: searchable text, live links, original fonts preserved",
    "Instant page count and size estimate before you commit",
    "Rename the result in the same step; default extract.pdf",
    "No server: a 50-page extraction finishes in seconds on a normal laptop"
  ],
  tips: [
    "Extract in one go rather than repeatedly if the file is large — every run re-reads the source.",
    "For an entire chapter, checking the start and end page in a reader first avoids the classic off-by-one.",
    "Need the extracted pages as pictures? Run PDF to Images on the small result — it is far quicker than rendering the big source.",
    "Duplicate selections are ignored, so tapping page 7 twice does not produce two copies.",
    "If the source is encrypted, extraction cannot read it; unlock once in a desktop reader, then extract here."
  ],
  faqs: [
    { q: "Does extraction keep text selectable?", a: "Yes. Pages are copied as PDF objects, not converted to photos, so searching and copy-paste behave exactly like the original." },
    { q: "Can I extract the same page twice?", a: "Selections are unique — page 7 appears once no matter how often you tap it. To duplicate a page, extract it, then merge the small file with itself." },
    H.faqFree("Extract PDF Pages"), H.faqPrivacy("Extract PDF Pages","PDF"),
    { q: "What is the difference between Extract and Delete?", a: "Extract keeps only what you pick; Delete removes what you pick and keeps the rest. Same engine, opposite selection — use whichever list is shorter." },
    H.faqMobile("Extract PDF Pages")
  ],
  related: [["delete-pdf-pages", "Remove unwanted pages"], ["split-pdf", "Split by ranges"], ["merge-pdf", "Combine extracted files"], ["pdf-to-images", "Extracted pages as JPG"], ["image-to-pdf", "Rebuild from images"]],
  mode: "extract",
  ui: `<section class="t-card">
  <div id="dz" class="dz" tabindex="0" role="button" data-accept-hint="a .pdf file" aria-label="Add a PDF. Drop here or press Enter to choose.">
    <svg class="dz-ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3h8l4 4v14H7z"/><path d="M15 3v4h4"/><path d="M12 11v6m-3-3h6"/></svg>
    <b>Drop the PDF to extract from</b><span>Page buttons appear once the file is read — click to pick, or type a range below.</span>
    <input type="file" id="file" accept="application/pdf,.pdf" hidden>
  </div>
  <p id="finfo" class="hint" hidden></p>
  <div class="fld"><label for="ranges">Or type ranges — e.g. 3-7,12</label><input type="text" id="ranges" placeholder="3-7,12" autocomplete="off"></div>
  <div id="chips" class="chips" role="group" aria-label="Pages — click to toggle selection" hidden></div>
  <p id="selinfo" class="hint">Selected: none yet.</p>
</section>
<section class="t-card opts" aria-label="Actions">
  <div class="fld"><label for="name">File name</label><input type="text" id="name" value="" placeholder="sample-extract" maxlength="40" autocomplete="off" spellcheck="false"></div>
  <div class="acts"><button id="go" class="btn" type="button" disabled>Create PDF</button><button id="all" class="btn btn-ghost" type="button" disabled>All pages</button><button id="none" class="btn btn-ghost" type="button" disabled>Clear selection</button></div>
  <div class="prog" hidden><div id="bar" class="prog-i"></div></div>
  <p id="status" role="status" aria-live="polite" class="hint"></p>
  <a id="dl" class="btn btn-wa" href="#" hidden download="extract.pdf">Download PDF</a>
  <p id="err" class="err" role="alert" hidden></p>
</section>`
};
