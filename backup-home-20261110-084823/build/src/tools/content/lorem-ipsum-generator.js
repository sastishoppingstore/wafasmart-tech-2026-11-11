"use strict";
const H = require("./_helpers.js");
module.exports = {
  name: "Lorem Ipsum Generator",
  short: "Fill a layout with realistic placeholder text — paragraphs, sentences, words or list items, plain or wrapped in HTML.",
  title: "Lorem Ipsum Generator — Paragraphs, Words, HTML | Wafa Smart",
  desc: "Generate Lorem Ipsum placeholder text as paragraphs, sentences, words or list items. Start with 'Lorem ipsum' or wrap in HTML. Free and instant.",
  h1: "Lorem Ipsum Generator — placeholder text that fits your layout",
  kw: ["lorem ipsum generator", "lorem ipsum paragraphs", "dummy text generator", "placeholder text online", "lorem ipsum html", "filler text for design"],
  intro: [
    "Lorem Ipsum is the scrambled Latin filler text designers have used for centuries to show a layout without the reader getting distracted by real words. This generator makes as much of it as you need, in the shape you need: whole paragraphs, single sentences, a bare list of words, or ready-made list items — so a wireframe, a theme preview or a mockup can be filled in a couple of seconds instead of hand-typing the same block over and over.",
    "Two switches cover most workflows. Keep 'Start with Lorem ipsum' on when you want the classic opening line that everyone recognises, or turn it off for variety that reads less obviously like boilerplate. Turn 'Wrap in HTML' on and each paragraph comes back inside <p> tags, or list mode returns a real <ul> with <li> items you can paste straight into a template — no manual tagging, no broken markup.",
    "The word bank is the traditional Lorem Ipsum vocabulary, recombined so the same request never gives you the identical block twice in a row. Everything is assembled in your browser instantly, there is nothing to upload, and the copy button takes the finished text with one click so you can drop it into Figma, VS Code or a CMS draft."
  ],
  steps: [
    "Choose what to generate — paragraphs, sentences, words or list items — from the mode dropdown.",
    "Set how many you want in the count box.",
    "Leave 'Start with Lorem ipsum' on for the classic opening, or off for varied filler.",
    "Pick plain text or 'Wrap in HTML' so paragraphs come back inside <p> / <ul> tags.",
    "Press 'Generate' and use 'Copy text' to paste the filler into your design."
  ],
  ur: "Mode chunein (paragraphs, sentences, words ya list items), ginti set karein, chahein to 'Start with Lorem ipsum' on rakhein aur HTML wrap karwayein. 'Generate' dabane par browser me foran placeholder text ban jata hai — phir 'Copy text' se design me paste kar lein. Kuch upload nahi hota.",
  features: [
    "Four modes: paragraphs, sentences, words and ready list items",
    "Classic 'Lorem ipsum dolor sit amet' opening on a toggle",
    "Optional HTML wrapping with <p> for paragraphs and <ul>/<li> for lists",
    "Traditional Latin word bank recombined so no two runs are identical",
    "One-click copy for pasting straight into a design or code editor",
    "Runs fully offline in the tab — nothing uploaded, no length limit"
  ],
  tips: [
    "Match the count to the real content: if a card holds two paragraphs, generate two, so your layout test is honest.",
    "Use list mode to fill menus, feature bullets or pricing tables instead of typing dashes.",
    "Wrap in HTML when pasting into a template; leave it off when filling a text field or a design box.",
    "Turn the classic opener off when you are showing a client mockups and want the filler to look less canned.",
    "Generate words mode for tag clouds or metadata fields where full sentences would overflow."
  ],
  faqs: [
    { q: "Why is it called Lorem Ipsum?", a: "The first words of the standard filler are 'Lorem ipsum dolor sit amet', a garbled excerpt from a Latin text by Cicero. Designers kept the phrase, so any scrambled block built from that vocabulary is called Lorem Ipsum." },
    { q: "Will I get the same text every time?", a: "No. The generator recombines the word bank with randomness, so pressing Generate twice for the same request never returns a verbatim identical block — useful when you want varied mockups." },
    { q: "What does the HTML option produce?", a: "Paragraph mode wraps each block in <p>…</p>, and list mode returns a <ul> with one <li> per item, indented and ready to paste into a template without editing tags." },
    { q: "Is the filler text safe to ship?", a: "Lorem Ipsum is a public-domain placeholder with no meaning, but always replace it with real copy before launch — shipping dummy text looks unfinished to your users." },
    H.faqFree("Lorem Ipsum Generator"), H.faqOffline("Lorem Ipsum Generator")
  ],
  related: [["word-counter", "Check the text length"], ["case-converter", "Restyle the output"], ["json-formatter", "Format sample data"], ["qr-code-generator", "Encode a link"]],
  ui: `<section class="t-card opts" aria-label="Lorem Ipsum options">
  <div class="fld"><label for="mode">Generate</label><select id="mode"><option value="paragraphs" selected>Paragraphs</option><option value="sentences">Sentences</option><option value="words">Words</option><option value="list">List items</option></select></div>
  <div class="fld"><label for="count">How many</label><input type="number" id="count" min="1" max="500" value="3"></div>
  <div class="fld"><label for="start">First line</label><select id="start"><option value="y" selected>Start with 'Lorem ipsum'</option><option value="n">Random opening</option></select></div>
  <div class="fld"><label for="html">Output format</label><select id="html"><option value="txt" selected>Plain text</option><option value="p">Wrap paragraphs in &lt;p&gt;</option><option value="ul">Wrap list in &lt;ul&gt;/&lt;li&gt;</option></select></div>
  <div class="acts">
    <button id="go" class="btn" type="button">Generate</button>
    <button id="copy" class="btn btn-ghost" type="button" disabled>Copy text</button>
    <button id="rst" class="btn btn-ghost" type="button">Reset</button>
  </div>
  <p id="status" role="status" aria-live="polite" class="hint"></p>
  <p id="err" class="err" role="alert" hidden></p>
  <div id="out"></div>
</section>`
};
