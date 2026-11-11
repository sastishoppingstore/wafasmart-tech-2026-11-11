"use strict";
const H = require("./_helpers.js");
const K = require("./_kit.js");
module.exports = {
  name: "Image to Base64",
  short: "Turn an image into a base64 data URI you can paste straight into HTML, CSS or JavaScript — with copy buttons and size maths.",
  title: "Image to Base64 Data URI — HTML & CSS Snippet | Wafa Smart",
  desc: "Convert an image to a base64 data URI online: ready-made HTML, CSS and JS snippets, size overhead shown, one-tap copy. Free, private, no upload.",
  h1: "Image to Base64 — data URIs for HTML, CSS and JS",
  libs: ["heic2any"],
  kw: ["image to base64", "base64 image encoder", "data uri generator", "convert image to base64 online", "base64 png to html", "inline image css"],
  intro: [
    "A data URI is a file written as text and embedded where a URL would normally go. Instead of the browser making a second request for logo.png, the picture arrives inside your HTML or CSS as a long string beginning data:image/png;base64,. For small assets that is a genuine win: one fewer round trip, no broken link when an email client blocks remote images, and a template that can be handed over as a single file.",
    "Paste an image in here and the tool encodes it and hands back four things: the bare data URI, an HTML `<img>` tag with it already inserted, a CSS `background-image` rule, and a JavaScript string literal. Each is one tap to copy, so you can drop the snippet into a page, a Shopify theme section, an HTML email or a Tampermonkey script without editing by hand. The byte maths is shown too — original size, encoded size and the roughly 33% overhead base64 always costs — because that overhead is the reason you should only inline icons, badges and small backgrounds, never photographs.",
    "Encoding happens entirely in your browser from the file you selected, so an image under contract, a client logo you have not been given permission to host, or a personal photo never touches a server. There is no upload endpoint on this page at all: the string you copy is built from FileReader on your own machine, and closing the tab discards it. HEIC files are decoded first, and you may re-encode to JPG, PNG or WebP if the original is too heavy to inline."
  ],
  steps: [
    "Drop in the image you want to inline — an icon, logo or small background works best.",
    "Keep the original bytes, or re-encode as JPG/PNG/WebP to shrink what gets embedded.",
    "Press Encode and read the size report (encoded output is about a third larger than the file).",
    "Choose the snippet style — data URI, HTML, CSS or JavaScript — and press Copy.",
    "Paste it into your code. For anything above roughly 30 KB, host the file instead."
  ],
  ur: "Image dalain, Encode dabayein — base64 data URI ban jayegi, aur sath me HTML, CSS aur JavaScript ki ready snippet bhi. Copy dabakar apne code me paste kar lein. Chhoti icons aur logos ke liye behtareen; bari photos inline na karein kyunke base64 se file ka size takreeban 33% barh jata hai.",
  features: [
    "Four output styles: bare URI, HTML img, CSS background, JS string",
    "Live byte report including the base64 expansion and MIME type",
    "Optional re-encoding to JPG, PNG or WebP before embedding",
    "One-tap copy plus a .txt download for very long strings",
    "Visual preview of what the URI actually resolves to",
    "Handles HEIC input by decoding it before encoding"
  ],
  tips: [
    "Inline icons, logos and small textures; a 200 KB photo inlined in HTML delays first paint more than a cached file would.",
    "For CSS, put the URI in quotes: `background-image:url(\"data:image/svg…\")` avoids surprises with plus signs.",
    "SVG is already text — paste it into HTML directly instead of base64-encoding it.",
    "Some email clients cap message size: check the encoded length, not the file size, before inlining.",
    "Re-encode to WebP first if the target page is heavy — 30% smaller file means 30% smaller string."
  ],
  faqs: [
    H.faqFree("Image to Base64", "There is no file-size cap other than your browser's memory."),
    H.faqPrivacy("Image to Base64", "image"),
    { q: "Why is the base64 text longer than my image?", a: "Base64 encodes every three bytes as four characters, so any encoded file is about one third bigger. That is the format's fixed cost, not a bug in this tool." },
    { q: "Is a data URI bad for SEO or performance?", a: "For a few small icons, no. Inlining large or many images bloats the HTML document, blocks rendering and cannot be cached separately — that is when a normal file URL wins." },
    { q: "Can I embed a PDF this way?", a: "Not on this page — it is built for images. The PDF tools here work on documents directly instead." },
    { q: "Will the plus signs break my HTML?", a: "Base64 uses + and / which are safe inside attribute values, but if you paste the string into a URL query, encode it first." },
    H.faqMobile("Image to Base64", " The .txt download is the easiest way to move a long string to another app.")
  ],
  related: [["qr-code-generator", "Generate QR as SVG"], ["jpg-to-png", "Convert before encoding"], ["webp-to-jpg", "Convert WebP out"], ["compress-image", "Make it small enough to inline"], ["json-formatter", "Paste into JSON"]],
  ui: K.DZ("Add an image to encode", "image/*,.heic,.heif", false) +
    K.FORM(`<div class="fld"><label for="mode">Snippet style</label><select id="mode"><option value="uri">Data URI only</option><option value="html">HTML &lt;img&gt; tag</option><option value="css">CSS background rule</option><option value="js">JavaScript string</option></select></div>
  <div class="fld"><label for="fmt">Encode as</label><select id="fmt"><option value="keep" selected>Keep original bytes</option><option value="image/jpeg">Re-encode as JPG</option><option value="image/png">Re-encode as PNG</option><option value="image/webp">Re-encode as WebP</option></select></div>
  <div class="acts"><button id="go" class="btn" type="button" disabled>Encode to Base64</button><button id="clear" class="btn btn-ghost" type="button" disabled>Clear</button></div>
  <p id="status" role="status" aria-live="polite" class="hint"></p>
  <div id="out" class="stack"></div>`, "Encode", "base64.txt", "Output") +
    `<section class="t-card" id="resCard" hidden aria-label="Encoded result">
  <div class="fld"><label for="code">Result</label><textarea id="code" class="ta text" rows="8" readonly spellcheck="false"></textarea></div>
  <div class="acts"><button id="copy" class="btn" type="button">Copy to clipboard</button><a id="dl" class="btn btn-ghost" href="#" download="base64.txt">Download as .txt</a></div>
  <p class="hint" id="truncated" hidden>The box shows the first few thousand characters only — Copy or Download gives you the complete string.</p>
</section>`
};
