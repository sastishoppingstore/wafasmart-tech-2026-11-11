"use strict";
const H = require("./_helpers.js");
module.exports = {
  name: "Remove Duplicate Lines",
  short: "Clean a list fast — drop repeated lines, ignore case or spaces, sort, count occurrences, and strip blank rows.",
  title: "Remove Duplicate Lines — Clean, Sort, Count | Wafa Smart",
  desc: "Delete duplicate lines from any list. Trim spaces, ignore case, keep first or last, sort, drop blanks and count occurrences. Free, private, in-browser.",
  h1: "Remove Duplicate Lines — tidy, sort and count any list",
  kw: ["remove duplicate lines", "delete duplicate rows online", "unique lines tool", "sort and remove duplicates", "count duplicate lines", "clean text list"],
  intro: [
    "Pasted lists are messy. A phone-number export, a column copied from Excel, a roll-number sheet or a set of addresses collected over weeks always has repeats, and nobody wants to delete them by hand row by row. This tool takes the whole block, keeps each line once, and gives you back a clean list — with the original and cleaned line counts shown side by side so you can see exactly how many rows disappeared.",
    "The options cover the real cases. Trim leading and trailing spaces so 'Ali ' and 'Ali' are recognised as the same entry, ignore case when 'Karachi' and 'karachi' should merge, choose keep-first or keep-last to decide which copy survives, drop empty lines, sort the output ascending or descending, and switch to a count-occurrences mode that prints each unique line with how many times it appeared — perfect for turning a transaction list into a frequency summary.",
    "Everything is processed locally, so a list of thousands of lines never leaves your device and no number is uploaded to some server. The work runs in chunks with a live progress bar, which keeps the browser responsive on a long paste, and the cleaned result can be copied straight back into your spreadsheet."
  ],
  steps: [
    "Paste your list into the box — one entry per line, exactly as you have it.",
    "Tick 'Ignore case' if A and a should be treated as the same line, and 'Trim spaces' if entries are padded.",
    "Choose keep-first or keep-last, and whether to remove empty lines.",
    "Pick a sort order (none, ascending, descending) or switch on 'Count occurrences' mode.",
    "Press 'Process lines' to get the clean list, then Copy result to take it back to your sheet."
  ],
  ur: "Apni list (har line alfaaz ke sath) box me paste karein. Agar zaroori ho to 'Ignore case' aur 'Trim spaces' on karein, keep-first/keep-last chunein, sort ya 'Count occurrences' mode set karein. 'Process lines' dabayein — duplicate lines hat jayengi aur original vs result count saamne aayega. Phir Copy se wapas le lein.",
  features: [
    "Removes repeated lines while keeping your original order",
    "Ignore-case and trim-spaces matching so near-duplicates merge",
    "Keep-first or keep-last control over which copy survives",
    "Optional removal of empty lines and ascending / descending sort",
    "Count-occurrences mode that turns the list into a frequency table",
    "Original vs result line counts shown as stat cards, chunked for big pastes"
  ],
  tips: [
    "Trim spaces for anything copied from a PDF or WhatsApp, where invisible padding is common.",
    "Keep-first preserves your original order; keep-last is handy when later lines are corrections of earlier ones.",
    "Use count mode to spot which name or number appears most in a transaction list before you clean it.",
    "Sorting ascending is the fastest way to eyeball whether any duplicates actually remain.",
    "Keep a copy of the raw list: this tool produces a new cleaned block rather than editing your file."
  ],
  faqs: [
    { q: "What counts as a duplicate line?", a: "Two lines are duplicates when they match exactly after your chosen rules — with 'Trim spaces' each line's surrounding blanks are removed first, and with 'Ignore case' the comparison is case-insensitive. Nothing else is changed." },
    { q: "Does the tool keep the first or the last copy?", a: "You choose. 'Keep first' returns the earliest occurrence in its original position; 'Keep last' uses the content of the final occurrence, so a corrected trailing line overwrites an earlier typo." },
    { q: "What does count-occurrences mode do?", a: "Instead of just removing repeats it prints every unique line with the number of times it appeared, sorted most-frequent first — a quick frequency report from a raw list." },
    { q: "Will my line content be edited?", a: "No. Only the surrounding whitespace is trimmed if you turn that option on; the visible characters of a surviving line are copied unchanged." },
    H.faqFree("Remove Duplicate Lines"), H.faqPrivacy("Remove Duplicate Lines", "list")
  ],
  related: [["case-converter", "Normalise the casing first"], ["word-counter", "Count the cleaned list"], ["json-formatter", "Format structured data"], ["lorem-ipsum-generator", "Generate sample lines"]],
  ui: `<section class="t-card" aria-label="Your lines">
  <div class="fld wide"><label for="txt">Paste your list — one entry per line</label>
  <textarea id="txt" class="ta text" rows="8" spellcheck="false" placeholder="Ali&#10;Ali&#10;Sara&#10;Sara&#10;Bilal"></textarea></div>
</section>
<section class="t-card opts" aria-label="Options">
  <div class="fld"><label for="keep">Which copy to keep</label><select id="keep"><option value="first" selected>Keep first</option><option value="last">Keep last</option></select></div>
  <div class="fld"><label for="sort">Sort output</label><select id="sort"><option value="none" selected>No sort (keep order)</option><option value="asc">Ascending</option><option value="desc">Descending</option></select></div>
  <div class="fld"><label for="mode">Result mode</label><select id="mode"><option value="dedupe" selected>Remove duplicates</option><option value="count">Count occurrences</option></select></div>
  <div class="fld"><label for="opts">Matching options</label><select id="opts">
    <option value="t,i,e" selected>Trim spaces · Ignore case · Drop empty lines</option>
    <option value="t,i">Trim spaces · Ignore case</option>
    <option value="t">Trim spaces only</option>
    <option value="">Exact match</option>
  </select></div>
  <div class="acts">
    <button id="go" class="btn" type="button">Process lines</button>
    <button id="copy" class="btn btn-ghost" type="button" disabled>Copy result</button>
    <button id="rst" class="btn btn-ghost" type="button">Reset</button>
  </div>
  <div class="prog" hidden><div id="bar" class="prog-i"></div></div>
  <p id="status" role="status" aria-live="polite" class="hint"></p>
  <p id="err" class="err" role="alert" hidden></p>
  <div id="out"></div>
</section>`
};
