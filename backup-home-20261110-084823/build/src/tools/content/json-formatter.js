"use strict";
const H = require("./_helpers.js");
module.exports = {
  name: "JSON Formatter",
  short: "Prettify or minify JSON, validate it with a clear line-and-column error, sort keys, and see input vs output size instantly.",
  title: "JSON Formatter — Pretty Print, Minify, Validate | Wafa Smart",
  desc: "Pretty-print, minify and validate JSON with human-readable line and column errors. Sort keys, pick 2/4/tab indent, copy the result. Free, private.",
  h1: "JSON Formatter — pretty-print, minify and validate",
  kw: ["json formatter", "json validator online", "pretty print json", "minify json", "sort json keys", "json beautifier"],
  intro: [
    "JSON is read by machines but edited by humans, and a single missing comma or stray quote can stop an entire config from loading. This formatter takes any JSON you paste and either beautifies it — one field per line, indented at 2 spaces, 4 spaces or a tab — or minifies it down to the tightest possible bytes for shipping to a browser or an API. On top of that it validates your input and, when the JSON is broken, tells you the exact line and column of the failure in plain words instead of a cryptic stack trace.",
    "Developers wiring up an API response, students checking an assignment file and analysts tidying a config all need the same thing: a reliable, instant answer to 'is this valid, and if not, where?'. A key-sorting option rewrites every object so keys line up alphabetically, which makes two JSON files diffable side by side and turns a messy dump into something readable. Input and output sizes are shown as bytes so you can watch a minify step shrink a payload.",
    "The whole job runs in your browser tab, so sensitive data — API keys, user records, a production config — is never uploaded to a validation service. Long inputs are handled in chunks with a progress bar so the page stays responsive on a multi-megabyte file, and the formatted result can be copied straight back with one click."
  ],
  steps: [
    "Paste your JSON into the box — raw API output, a config file or anything in between.",
    "Choose 'Pretty print' or 'Minify' from the mode dropdown.",
    "For pretty output pick your indent (2 spaces, 4 spaces or a tab) and toggle key sorting.",
    "Press 'Format JSON'; if it is invalid, read the line and column shown in the error box.",
    "Use 'Copy result' to take the formatted JSON, and watch the input vs output byte counts."
  ],
  ur: "Apna JSON box me paste karein, mode chunein (Pretty print ya Minify), chahein to indent (2/4/tab) aur keys sort ka option set karein. 'Format JSON' dabane par sahi JSON khoobsurati se format ho jata hai; agar ghalt ho to line aur column parhat clear error milta hai. Copy se result le lein — data browser se bahar nahi jata.",
  features: [
    "Pretty-print with a choice of 2-space, 4-space or tab indent",
    "One-click minify to the smallest valid JSON",
    "Human-readable validation error pinpointing line and column",
    "Alphabetical key sorting so configs diff cleanly",
    "Input vs output byte size shown with T.bytes formatting",
    "Chunked, progress-tracked processing that keeps huge files responsive"
  ],
  tips: [
    "When the error gives a line and column, count back to that spot — a trailing comma before a } is the single most common JSON bug.",
    "Sort keys before comparing two versions of a config file; identical content then produces an identical diff.",
    "Minify the JSON you ship to users, but keep a pretty copy in version control — readable history beats one long line.",
    "Paste a response body here instead of a logging service when it holds API keys or personal data.",
    "Use minify mode to check how much a pretty config really costs in bytes before you embed it."
  ],
  faqs: [
    { q: "Does it fix invalid JSON for me?", a: "No, it finds the exact problem and tells you where it is (line and column) so you can correct it yourself. Guessing and auto-patching would silently change what your data means, which this tool avoids on purpose." },
    { q: "Why is my large JSON slow or frozen?", a: "Parsing a many-megabyte file is genuinely heavy work. The page reads and scans the text in chunks with a progress bar so the tab stays responsive, but a very large single value still needs one big parse step." },
    { q: "Is my data uploaded for validation?", a: "No. The browser's own JSON.parse does the validation locally, so a config full of secrets or a user export never leaves the tab — there is no request to intercept." },
    { q: "What does 'sort keys' change?", a: "It rewrites each object so its properties appear in alphabetical order (arrays keep their order). Values are untouched, and the sorted output is functionally identical JSON." },
    H.faqFree("JSON Formatter"), H.faqSafe("JSON Formatter", "data")
  ],
  related: [["case-converter", "Clean text casing"], ["remove-duplicate-lines", "Tidy a list"], ["word-counter", "Measure the text"], ["unit-converter", "More utilities"]],
  ui: `<section class="t-card" aria-label="JSON input">
  <div class="fld wide"><label for="txt">Paste JSON</label>
  <textarea id="txt" class="ta" rows="8" spellcheck="false" autocomplete="off" placeholder='{"name":"WAFA","tools":["qr","json"],"free":true}'></textarea></div>
</section>
<section class="t-card opts" aria-label="Format options">
  <div class="fld"><label for="mode">Mode</label><select id="mode"><option value="pretty" selected>Pretty print</option><option value="minify">Minify</option></select></div>
  <div class="fld"><label for="indent">Indent</label><select id="indent"><option value="2" selected>2 spaces</option><option value="4">4 spaces</option><option value="tab">Tab</option></select></div>
  <div class="fld"><label for="sortk">Sort keys</label><select id="sortk"><option value="n" selected>No</option><option value="y">Yes, A–Z</option></select></div>
  <div class="acts">
    <button id="go" class="btn" type="button">Format JSON</button>
    <button id="copy" class="btn btn-ghost" type="button" disabled>Copy result</button>
    <button id="rst" class="btn btn-ghost" type="button">Reset</button>
  </div>
  <div class="prog" hidden><div id="bar" class="prog-i"></div></div>
  <p id="status" role="status" aria-live="polite" class="hint"></p>
  <p id="err" class="err" role="alert" hidden></p>
  <div id="out"></div>
</section>`
};
