"use strict";
const H = require("./_helpers.js");
const PICKER = `<section class="t-card">
  <div id="dz" class="dz" tabindex="0" role="button" data-accept-hint="a .pdf file" aria-label="Add a PDF. Drop here or press Enter to choose.">
    <svg class="dz-ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3h8l4 4v14H7z"/><path d="M15 3v4h4"/><path d="m9 13 2 2 4-4"/></svg>
    <b>Drop your PDF</b><span>Page numbers appear as buttons as soon as the file is read — click to toggle.</span>
    <input type="file" id="file" accept="application/pdf,.pdf" hidden>
  </div>
  <p id="finfo" class="hint" hidden></p>
  <div id="chips" class="chips" role="group" aria-label="Pages — click to toggle selection" hidden></div>
  <p class="hint"><span class="k sw-del"></span> marked for removal &nbsp; <span class="k sw-keep"></span> will stay</p>
</section>`;
const BAR = `<div class="acts"><button id="go" class="btn" type="button" disabled></button><button id="all" class="btn btn-ghost" type="button" disabled>Select all</button><button id="none" class="btn btn-ghost" type="button" disabled>Clear selection</button></div>
  <div class="prog" hidden><div id="bar" class="prog-i"></div></div>
  <p id="status" role="status" aria-live="polite" class="hint"></p>
  <a id="dl" class="btn btn-wa" href="#" hidden download="output.pdf">Download PDF</a>
  <p id="err" class="err" role="alert" hidden></p>`;

module.exports = {
  name: "Delete PDF Pages",
  short: "Click the page numbers you want gone and rebuild the PDF without them — no re-upload, no page-range maths.",
  kw: ["delete pdf pages", "remove pages from pdf", "delete page from pdf online", "pdf page remover", "remove blank pages from pdf"],
  title: "Delete PDF Pages — Remove Pages from a PDF | Wafa Smart",
  desc: "Remove unwanted pages from a PDF by clicking their numbers, then download a clean file. Keeps text searchable. Free, private, in-browser.",
  h1: "Delete PDF Pages — take out the pages you do not want",
  libs: ["pdf-lib"],
  module: "pdf-page-picker",
  intro: [
    "Deleting pages is the everyday repair job of PDF work: the blank sheet a scanner invented, the second page of someone else's bank statement that must not be forwarded, the draft clause replaced in the last minute. Instead of typing ranges, this tool lists every page number as a button — tap the ones that should disappear, and the remaining pages are written into a new PDF in their original order.",
    "Under the hood pdf-lib reads your document's page tree, copies every page you kept into a fresh document and leaves the rest behind. Because pages are copied as objects rather than re-printed, your text stays selectable, hyperlinks keep working, and embedded fonts come along unharmed. The deleted pages are not merely hidden — they are not in the output file at all, which matters when you are removing something confidential before sharing.",
    "For long documents the number grid scrolls instead of stretching, and 'Select all' / 'Clear selection' prevent accidental mass deletion. Nothing is saved until you press Download, so an undo is just one more click. If you would rather keep two pages than delete two hundred, the sibling tool Extract PDF Pages does exactly the opposite selection."
  ],
  steps: [
    "Drop your .pdf onto the box — the page-number buttons appear as soon as the file is parsed.",
    "Click every page you want removed; marked pages turn red and are skipped when rebuilding.",
    "Check the summary line: it tells you how many pages the output will contain.",
    "Press 'Create PDF' (this also loads the pdf-lib engine from the pinned CDN, once per browser).",
    "Download the cleaned file; the original on your device is untouched."
  ],
  ur: "PDF dalte hi har page ka number button ban jata hai. Jo pages hatane hain un par click karein (laal ho jayenge) phir 'Create PDF' dabayein. Bache hue pages ki nayi PDF download ho jayegi — original file asl mehfooz rehti hai, kuch upload nahi hota.",
  features: [
    "Visual page picker — click numbers, no range syntax to remember",
    "Live summary: pages kept, pages removed, approximate output size",
    "Copied pages keep text, links, forms appearance and fonts",
    "Removed pages are genuinely absent from the new file, not hidden",
    "Safe by default: nothing is written until you press the button",
    "Works on 50+ page documents with a scrollable picker grid"
  ],
  tips: [
    "Delete a test page first if you are unsure which numbering your scanner used — the preview counter updates instantly.",
    "If the file is password-protected, the tool says so; unlock it once in any reader, then come back.",
    "For removing one middle page from a 300-page book, deletion and extraction cost the same time — pick whichever selection feels smaller.",
    "Rotate-flip issues are separate: deleting will not straighten a sideways page, use PDF to Images plus Image to PDF for that.",
    "Keep the removed-page list written down if the document may need to be rebuilt later — deletion is not reversible inside this page."
  ],
  faqs: [
    { q: "Will deleting pages blur the rest of the document?", a: "No. Kept pages are copied byte-for-byte, so the output's quality equals the input's. Only re-rendering tools lose sharpness." },
    { q: "Are the deleted pages recoverable from the new file?", a: "No — they are not written into it at all. That is what makes this safe for removing confidential sheets before sharing." },
    H.faqFree("Delete PDF Pages"), H.faqPrivacy("Delete PDF Pages","PDF"),
    { q: "Can I delete pages and then re-order what is left?", a: "Not in this tool — deletion keeps the original order. For reordering, split the file into ranges and merge the pieces in the order you want." },
    H.faqOffline("Delete PDF Pages")
  ],
  related: [["extract-pdf-pages", "Keep only chosen pages"], ["split-pdf", "Split into pieces"], ["merge-pdf", "Join files"], ["pdf-to-images", "Pages as images"], ["image-to-pdf", "Rebuild a PDF"]],
  mode: "delete",
  ui: PICKER + `<section class="t-card opts" aria-label="Actions">` + BAR + `</section>`
};
