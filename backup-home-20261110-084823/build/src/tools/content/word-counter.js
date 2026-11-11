"use strict";
const H = require("./_helpers.js");
module.exports = {
  name: "Word Counter",
  short: "Count words, characters, sentences, reading time and a Latin-vs-Urdu script breakdown for any text — live, in your browser.",
  title: "Word Counter — Urdu & English Text Stats | Wafa Smart",
  desc: "Free word counter with Urdu and English support: words, characters, sentences, reading time, top keywords and a live script breakdown. No upload.",
  h1: "Word Counter — words, characters and Urdu script, counted live",
  kw: ["word counter", "urdu word counter", "character counter online", "words and characters count", "reading time calculator", "count urdu words"],
  intro: [
    "A word counter looks at your text and tells you how many words, characters, sentences and paragraphs it holds, plus how long it takes to read aloud. This one is built to be Urdu-ready: the counting engine understands Arabic-script words and Latin words in the same paragraph, so a mixed English-Urdu assignment, a Facebook post or a notice board caption gets an honest tally instead of a broken one. Every number updates the moment you type — there is no button to press and nothing is uploaded.",
    "Students writing an Urdu essay or a report need a reliable character and word limit, editors tracking a column's length need reading time, and social-media writers need to stay under a caption limit. The per-script breakdown answers the question a plain counter cannot: how much of this text is Latin letters, how much is Urdu or Arabic script, and how many digits, so you can see at a glance whether your piece is balanced or leaning one way.",
    "Urdu is counted Nastaliq-safe. The text is read as raw code points with no Unicode normalisation, so the zero-width joiner and the shaping marks that hold a Nastaliq ligature together are never disturbed, and the Urdu character total matches what you actually wrote. On top of the basics you get unique-word count, a top-ten keyword list with occurrence counts, and reading time at 200 words-per-minute and speaking time at 130 words-per-minute."
  ],
  steps: [
    "Type or paste your text — English, Urdu, or a mix of both — into the big box.",
    "Watch the counts update live: characters, words, sentences, paragraphs and unique words appear as stat cards.",
    "Press 'Paste sample Urdu text' if you want a ready-made Urdu paragraph to test the counter against.",
    "Scroll the result panel for the reading time, speaking time, top-ten keyword list and the Latin / Urdu / digits breakdown.",
    "Press 'Reset' to clear the box and start again with a fresh piece of text."
  ],
  ur: "Apna text (Urdu, English ya dono) bade box me likhein ya paste karein — har count foran badal jayega: alfaz, huroof, jumle, paragraphs. 'Paste sample Urdu text' dabakar Urdu paragraph test karein. Neeche parhne aur bolne ka waqt, top keywords aur Urdu script ka breakdown milega. Reset se sab clear.",
  features: [
    "Live word, character (with and without spaces), sentence and paragraph counts",
    "Urdu-ready: Arabic-script words detected with /[\p{Arabic}]/u, no normalization",
    "Per-script breakdown — Latin letters, Urdu/Arabic letters and digits, side by side",
    "Reading time at 200 wpm and speaking time at 130 wpm",
    "Unique-word count and a top-ten keyword list with occurrence counts",
    "Nastaliq-safe Urdu character count that preserves ZWJ and joining marks"
  ],
  tips: [
    "Use the without-spaces figure when a form limits characters strictly; use with-spaces for a normal column length.",
    "Reading time assumes 200 words per minute, a fair pace for English; slow Urdu reading runs nearer 160 wpm.",
    "The keyword list ignores common words like 'and' and 'کے' so the useful terms float to the top.",
    "Paste a finished draft, not the outline — the numbers are only meaningful for the text you will publish.",
    "Mixed Urdu-English headings still count cleanly; each run of letters between spaces is one word."
  ],
  faqs: [
    { q: "Does the word counter handle Urdu correctly?", a: "Yes. Words are matched with a Unicode-property pattern that treats an Arabic-script run and a Latin-script run the same way, and Urdu characters are detected with /[\p{Arabic}]/u, so 'اور' and 'and' each count as one word." },
    { q: "Why is my Urdu character count different from the visible letters?", a: "Urdu uses invisible joiners and the zero-width joiner (ZWJ) to hold a word's shape. This counter reads raw code points without normalising them, so the count matches what you typed, not a stripped-down version." },
    { q: "How is reading time calculated?", a: "Words divided by 200 per minute for silent reading and 130 per minute for speaking aloud — the two figures most speechwriters and editors use." },
    { q: "Does it count sentences in Urdu too?", a: "Yes. A sentence ends at a full stop, question mark, exclamation or the Urdu danda (۔ / |), and empty lines are not counted." },
    H.faqFree("Word Counter"), H.faqPrivacy("Word Counter","text")
  ],
  related: [["case-converter", "Clean the text casing"], ["remove-duplicate-lines", "Tidy pasted lines"], ["lorem-ipsum-generator", "Fill placeholder text"], ["json-formatter", "Format structured data"]],
  ui: `<section class="t-card" aria-label="Your text">
  <div class="fld wide"><label for="txt">Paste or type your text</label>
  <textarea id="txt" class="ta text" rows="8" spellcheck="false" placeholder="Type here, or paste English / Urdu text…"></textarea></div>
</section>
<section class="t-card opts" aria-label="Word count options">
  <div class="acts">
    <button id="sample" class="btn btn-ghost" type="button">Paste sample Urdu text</button>
    <button id="go" class="btn" type="button">Count now</button>
    <button id="rst" class="btn btn-ghost" type="button">Reset</button>
  </div>
  <p id="status" role="status" aria-live="polite" class="hint"></p>
  <p id="err" class="err" role="alert" hidden></p>
  <div id="out"></div>
</section>`
};
