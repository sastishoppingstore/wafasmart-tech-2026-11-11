"use strict";
const H = require("./_helpers.js");
const K = require("./_kit.js");
module.exports = {
  name: "Add Watermark",
  short: "Stamp your name, brand or “DRAFT” across photos — corner or full diagonal tile, with opacity and size you control.",
  title: "Add Watermark to Photo Online — Tile & Corner | Wafa Smart",
  desc: "Watermark images free in your browser: text or brand name, corner or tiled diagonal, opacity, size and colour. Batch, PNG transparency, no upload.",
  h1: "Add Watermark — protect photos before you post them",
  libs: ["heic2any", "jszip"],
  kw: ["add watermark to image", "photo watermark online", "watermark maker", "diagonal watermark", "copyright watermark photo", "image watermark free"],
  intro: [
    "A watermark is a claim of ownership painted into the pixels, which is the only kind that survives being screenshotted. Photographers use it on proof sets, sellers on marketplace listings, teachers on worksheets, and anyone sending a draft mockup uses “DRAFT” to stop it being presented as final. This page stamps text onto your images in the browser and hands the marked file straight back to you.",
    "Two layouts cover the realistic cases. A corner mark sits bottom-right (or wherever you place it on the nine-position grid) at a size and opacity that identifies without spoiling. A tiled diagonal mark repeats your text across the whole frame at an angle, which is the pattern resellers and content thieves cannot crop out — remove one repeat and five more remain. Both write directly into the image, so the mark travels with the file wherever it goes.",
    "Your original stays untouched: the output is a new file, named after the old one with -watermarked appended. Transparent PNGs can keep their alpha channel if you choose PNG output, so a watermark added to a logo or a product cut-out does not arrive with a white box behind it. Everything happens on your device — no upload, no account, no service that keeps a copy of client work you were never allowed to distribute."
  ],
  steps: [
    "Drop the photos you want marked into the box (several at once works).",
    "Type the watermark text — your name, brand, @handle or the word DRAFT.",
    "Choose a position on the grid, or tick Tile diagonally to cover the frame.",
    "Set size, opacity and colour; add a shadow if the photo is busy.",
    "Press Add Watermark and save each file, or grab the batch as one ZIP."
  ],
  ur: "Photo dalain, apna naam ya brand text likhein, phir jagah chunein (corner) ya “Tile diagonally” check karein taake poore photo par repeat ho. Size aur opacity set karke Add Watermark dabayein. Text pixels me baith jata hai, is liye screenshot karne se bhi nahi nikalta. File kahin upload nahi hoti.",
  features: [
    "Corners, centre or a repeating diagonal tile",
    "Size measured against the image, so one setting fits a whole batch",
    "Opacity and colour control, including semi-transparent grey",
    "Optional drop shadow so the mark reads on snow or black cloth",
    "PNG output preserves existing transparency",
    "Batch watermarking with a single ZIP download"
  ],
  tips: [
    "45–60% opacity is the sweet spot: visible in a thumbnail, not obnoxious full-size.",
    "Place a corner mark where the thief crops least — bottom-right of the frame, not the middle of the subject.",
    "For tiled marks, longer text repeats fewer times and looks less spammy.",
    "Add the watermark last, after cropping and resizing, so its relative size is what you intended.",
    "Keep unwatermarked originals; a watermarked JPG cannot be un-marked."
  ],
  faqs: [
    H.faqFree("Add Watermark", "There is no premium tier removing a logo you never saw."),
    H.faqPrivacy("Add Watermark", "photo"),
    { q: "Can the watermark be removed?", a: "Anything painted into pixels can in principle be edited out, but a tiled diagonal mark is genuinely tedious to remove, which is the point. Corner marks over a plain area are the easiest to erase." },
    { q: "Does it support an image logo instead of text?", a: "This page stamps text. A logo can be converted to a base64 string with the Image to Base64 tool and used in CSS, but pasting one image over another is not part of this tool." },
    { q: "Will the text be crisp on a big print file?", a: "Size is a percentage of the image, so a 6000 px file gets proportionally larger lettering. For print, keep opacity high and add the shadow off." },
    { q: "Why does my watermark look blocky on dark photos?", a: "Low opacity on a busy background forces the browser to anti-alias against noise. Raise the size a notch or switch on the drop shadow." },
    H.faqMobile("Add Watermark", " Long text is easier with the phone's own keyboard suggestions.")
  ],
  related: [["image-to-base64", "Embed a mark in CSS"], ["crop-image", "Crop before marking"], ["compress-image", "Shrink after marking"], ["image-resizer", "Resize for Instagram"], ["png-to-jpg", "Flatten the PNG"]],
  ui: K.DZ("Add photos to watermark", "image/*,.heic,.heif") +
    K.FORM(`<div class="fld"><label for="txt">Watermark text</label><input type="text" id="txt" maxlength="60" placeholder="e.g. © Wafa Smart Tech" value="© Wafa Smart Tech"></div>
  <div class="fld"><label id="poslbl">Position</label><div class="segs" role="group" aria-labelledby="poslbl">
    <button type="button" class="seg" data-pos="nw" aria-pressed="false">Top left</button>
    <button type="button" class="seg" data-pos="ne" aria-pressed="false">Top right</button>
    <button type="button" class="seg" data-pos="sw" aria-pressed="false">Bottom left</button>
    <button type="button" class="seg" data-pos="se" aria-pressed="true">Bottom right</button>
    <button type="button" class="seg" data-pos="c" aria-pressed="false">Centre</button>
    <button type="button" class="seg" data-pos="tile" aria-pressed="false">Tile diagonally</button>
  </div></div>
  <div class="fld"><label for="size">Text size (% of image width) <output id="sv" for="size">6%</output></label><input type="range" id="size" min="1" max="20" value="6"></div>
  <div class="fld"><label for="op">Opacity <output id="ov" for="op">55%</output></label><input type="range" id="op" min="5" max="100" value="55"></div>
  <div class="fld"><label for="col">Colour</label><div class="row-item"><input type="color" id="col" value="#ffffff" aria-label="Watermark colour"><span class="tiny muted">White reads on most photos</span></div></div>
  <div class="fld"><label for="ang">Angle <output id="av" for="ang">0°</output></label><input type="range" id="ang" min="-60" max="60" value="0"></div>
  <div class="fld"><label class="rng"><input type="checkbox" id="sh" checked style="width:auto"> Drop shadow (readable on busy shots)</label></div>
  <div class="fld"><label for="fmt">Output format</label><select id="fmt"><option value="image/jpeg">JPG</option><option value="image/png">PNG (keeps transparency)</option><option value="image/webp">WebP</option></select></div>
  <div class="fld"><label for="q">Quality <output id="qv" for="q">90%</output></label><input type="range" id="q" min="40" max="100" value="90"></div>`, "Add Watermark", "watermarked.zip", "Watermark")
};
