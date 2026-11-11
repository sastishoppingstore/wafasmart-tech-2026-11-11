"use strict";
const H = require("./_helpers.js");
module.exports = {
  name: "Case Converter",
  short: "Flip text between UPPER, lower, Title, Sentence, camelCase, PascalCase, snake_case, kebab and reverse — live preview, free.",
  title: "Case Converter — Title, Camel, Snake, Kebab | Wafa Smart",
  desc: "Convert text to uppercase, lowercase, Title Case, camelCase, snake_case, kebab-case and more with live preview. Keep acronyms intact. No upload.",
  h1: "Case Converter — one click between ten text cases",
  kw: ["case converter", "uppercase to lowercase", "title case converter", "camelcase converter", "snake case converter", "sentence case online"],
  intro: [
    "Case is the invisible formatting that decides whether a headline looks professional, a variable name compiles, or a pasted paragraph screams at the reader. This converter rewrites your text into ten cases at once: UPPERCASE, lowercase, Title Case, Sentence case, camelCase, PascalCase, snake_case, kebab-case, aLtErNaTiNg and reversed. You pick the target case and the transformed text appears instantly below, with running word and character counts so you can confirm nothing was lost.",
    "The tool is aimed at the two jobs where case matters most. Writers and editors fixing an all-caps headline copied from a WhatsApp forward use Title or Sentence case with the acronym guard on, so 'CNN', 'ISPR', 'PTV' and 'NADRA' stay capitalised instead of being flattened to 'Cnn'. Developers naming identifiers paste a phrase into camelCase, PascalCase, snake_case or kebab-case to match a code style without hand-editing every space.",
    "Everything happens in your browser as you type — there is no upload, no limit on length and no watermark. Copy the result straight back with one button. Long documents are re-processed in chunks so the tab never freezes, and the original text stays in the box so you can try a different case against the same input as many times as you like."
  ],
  steps: [
    "Paste your raw text into the input box — a headline, a paragraph or a list of identifiers.",
    "Pick the target case from the dropdown (UPPER, Title, camelCase, snake_case and so on).",
    "For Title Case, leave 'Keep acronyms' on so words like CNN, NADRA or PTV are not down-cased.",
    "Watch the converted text and the live word/character counts appear in the result panel.",
    "Press 'Copy result' to take it, or 'Reset' to clear the box and start over."
  ],
  ur: "Apna text box me paste karein, phir dropdown me manchahta case chunein (UPPER, Title, camelCase, snake_case waghera). Title Case me 'Keep acronyms' on rakhein taake CNN, NADRA jaise alfaaz baray rahein. Natija foran nazar aata hai — Copy dabakar le lein, Reset se clear.",
  features: [
    "Ten cases: UPPER, lower, Title, Sentence, camelCase, PascalCase, snake_case, kebab-case, aLtErNaTiNg, reverse",
    "Live preview that updates on every keystroke — no waiting, no page reload",
    "Acronym guard for Title Case so all-caps abbreviations stay capitalised",
    "Word and character counts on both input and output to prove nothing dropped",
    "One-click Copy result button for pasting straight back into your editor",
    "Chunked processing keeps long documents responsive in the tab"
  ],
  tips: [
    "Turn the acronym guard off only when a genuine all-caps shout needs normalising — otherwise leave it on.",
    "snake_case and kebab-case are perfect for CSV headers or CSS class names: paste the label, pick the case, copy.",
    "For a proper headline, run Sentence case first to fix the shouty copy, then Title Case if you need every word capitalised.",
    "Reverse is a fun check, not a real cipher — never use it to hide anything sensitive.",
    "The box keeps your input, so switching between cases costs nothing; compare camelCase and PascalCase side by side."
  ],
  faqs: [
    { q: "What is the difference between camelCase and PascalCase?", a: "Both remove spaces and capitalise each word's first letter; camelCase keeps the very first letter lowercase (myVariableName) while PascalCase capitalises it (MyVariableName). This converter offers each as a separate option." },
    { q: "Will Title Case mess up my abbreviations?", a: "No — with 'Keep acronyms' on, any word that is already all uppercase and longer than one letter (CNN, NADRA, PTV) is left untouched. Turn it off if you want those down-cased too." },
    { q: "How is Sentence case detected?", a: "The text is split on sentence-ending punctuation, the first letter of each sentence is capitalised and the rest lowercased, so a paragraph copied in ALL CAPS becomes readable normal prose." },
    { q: "Does it change Urdu text?", a: "Case only exists for the Latin alphabet, so Urdu and Arabic-script letters pass through unchanged. The Latin words around them are still converted normally." },
    H.faqFree("Case Converter"), H.faqPrivacy("Case Converter", "text")
  ],
  related: [["word-counter", "Count the words"], ["remove-duplicate-lines", "Clean a pasted list"], ["json-formatter", "Format JSON text"], ["lorem-ipsum-generator", "Draft placeholder text"]],
  ui: `<section class="t-card" aria-label="Input text">
  <div class="fld wide"><label for="txt">Text to convert</label>
  <textarea id="txt" class="ta text" rows="7" spellcheck="false" placeholder="Paste text like: THE QUICK BROWN FOX MET CNN AT NADRA"></textarea></div>
</section>
<section class="t-card opts" aria-label="Case options">
  <div class="fld"><label for="mode">Target case</label><select id="mode">
    <option value="upper">UPPERCASE</option>
    <option value="lower">lowercase</option>
    <option value="title" selected>Title Case</option>
    <option value="sentence">Sentence case</option>
    <option value="camel">camelCase</option>
    <option value="pascal">PascalCase</option>
    <option value="snake">snake_case</option>
    <option value="kebab">kebab-case</option>
    <option value="alternating">aLtErNaTiNg</option>
    <option value="reverse">esreveR (reverse)</option>
  </select></div>
  <div class="fld"><label for="acro">Keep acronyms (Title Case)</label><select id="acro"><option value="y" selected>Yes — CNN stays CNN</option><option value="n">No — down-case everything</option></select></div>
  <div class="acts">
    <button id="go" class="btn" type="button">Convert case</button>
    <button id="copy" class="btn btn-ghost" type="button" disabled>Copy result</button>
    <button id="rst" class="btn btn-ghost" type="button">Reset</button>
  </div>
  <p id="status" role="status" aria-live="polite" class="hint"></p>
  <p id="err" class="err" role="alert" hidden></p>
  <div id="out"></div>
</section>`
};
