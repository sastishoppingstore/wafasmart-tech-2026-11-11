"use strict";
const H = require("./_helpers.js");
const K = require("./_kit.js");
module.exports = {
  name: "Crop Image",
  short: "Draw a box on your photo and crop it — freehand or locked to square, story, passport and other real ratios.",
  title: "Crop Image Online — Square, Story, Passport | Wafa Smart",
  desc: "Crop any photo in the browser: drag a box, lock 1:1, 9:16, 35:45 passport or free, then save as JPG, PNG or WebP. Free, private, no upload.",
  h1: "Crop Image — drag the box, keep the pixels you want",
  libs: ["heic2any"],
  kw: ["crop image online", "crop photo to square", "crop image to ratio", "passport photo crop", "crop photo without upload", "crop 1:1"],
  intro: [
    "Cropping is the one edit almost everybody actually needs: cut away the busy edge, turn a landscape frame into a square for Instagram, or squeeze a photo into the 35×45 mm box a passport form asks for. This tool does exactly that, with the crop drawn by hand on a live preview of your own picture rather than guessed from a slider.",
    "Drag anywhere on the image to draw a selection. Grab inside it and slide it about to reposition; grab an edge or corner to resize. Locking an aspect ratio constrains the box while you drag, so a square stays square and a 9:16 story frame stays a story frame no matter how you move it. The four number boxes underneath show the selection in real source pixels — type exact values there when a form specifies them, and the box on the picture follows.",
    "Nothing is upscaled: the crop keeps the original resolution of the pixels you selected, and you may optionally set an output width to resize the cropped area in the same step (crop to a face, then export it at 1080 px, in one press). Transparent PNGs stay transparent when you choose PNG output, and iPhone HEIC files decode here too. Your photo is read into page memory and the cropped result is handed back as a download — no upload, no server holding a copy of it."
  ],
  steps: [
    "Drop a photo into the box — JPG, PNG, WebP, GIF, BMP or HEIC.",
    "Pick an aspect lock (Free, 1:1, 4:3, 9:16, passport 35:45) or skip it and draw freehand.",
    "Drag on the picture to mark the crop; adjust by dragging the edges or typing exact X / Y / width / height.",
    "Choose the output format, quality, and an optional output width.",
    "Press Crop, then Save. Preview shows the result before you download it."
  ],
  ur: "Photo dalain, uspar box drag karke kaatna ho hissa chunein. Chahein to 1:1 (Instagram), 9:16 (story) ya passport 35×45 ka ratio lock kar lein — box usi shape me rahega. Neeche boxes me exact pixels bhi likh sakte hain. Crop dabakar file download kar lein; aapka photo device se bahar nahi jata.",
  features: [
    "Hand-drawn selection on a live preview of the actual image",
    "Eight aspect locks including Instagram, story and passport shapes",
    "Exact pixel entry — type X, Y, width and height and the box moves",
    "Cropping never invents pixels: output resolution equals selected area",
    "Optional resize of the cropped area in the same step",
    "JPG, PNG (with transparency) or WebP output"
  ],
  tips: [
    "For a circular WhatsApp DP, crop 1:1 tight around the head; the app crops the corners itself.",
    "Passport forms measure the head, not the photo: crop so the face fills roughly 70–80% of the frame height.",
    "Keep 20 px of slack on every side — a crop flush against the edge can lose pixels after re-encoding.",
    "Crop first, compress second: compressing a smaller area reaches a KB target at much higher quality.",
    "Rule-of-thirds grid lines are drawn on the preview; place eyes on the upper line for portraits."
  ],
  faqs: [
    H.faqFree("Crop Image", "There is no pro version hiding the aspect locks."),
    H.faqPrivacy("Crop Image", "photo"),
    { q: "Does cropping reduce my image quality?", a: "No. Cropping discards the area outside the box and keeps the rest at exactly the same pixels per inch. Only the optional output-width setting resamples." },
    { q: "Can I crop to an exact size like 413×531 px?", a: "Type 413 in Width and 531 in Height (or pick the passport lock and set the width) — the preview box snaps to those source pixels and the export matches." },
    { q: "Why can I not drag the box on my phone?", a: "You can — the preview uses touch directly. If a page zoom gesture interferes, pinch less and drag with one finger inside the box." },
    H.faqMobile("Crop Image", " Dragging with a finger works on the preview canvas.")
  ],
  related: [["image-resizer", "Resize after cropping"], ["passport-size-photo-maker", "Print-ready sheet"], ["add-watermark", "Mark the cropped photo"], ["compress-image", "Hit the form's KB limit"], ["heic-to-jpg", "HEIC before cropping"]],
  ui: K.DZ("Add a photo to crop", "image/*,.heic,.heif", false) +
    `<section class="t-card">
  <div class="imgwrap"><canvas id="cv" width="600" height="400" aria-label="Crop preview: drag to draw the crop box"></canvas></div>
  <p class="hint" id="tip">Drag on the picture to draw a crop box. Drag inside it to move, drag an edge to resize.</p>
</section>` +
    K.FORM(`<div class="segs" role="group" aria-label="Aspect ratio lock">
    <button type="button" class="seg" data-ar="0" aria-pressed="true">Free</button>
    <button type="button" class="seg" data-ar="1" aria-pressed="false">1:1</button>
    <button type="button" class="seg" data-ar="1.333333" aria-pressed="false">4:3</button>
    <button type="button" class="seg" data-ar="0.75" aria-pressed="false">3:4</button>
    <button type="button" class="seg" data-ar="0.5625" aria-pressed="false">9:16 story</button>
    <button type="button" class="seg" data-ar="1.777778" aria-pressed="false">16:9</button>
    <button type="button" class="seg" data-ar="0.777778" aria-pressed="false">Passport 35:45</button>
    <button type="button" class="seg" data-ar="1.574468" aria-pressed="false">CNIC 740:470</button>
  </div>
  <div class="fld"><label for="cx">Left X (px)</label><input type="number" id="cx" min="0" step="1" inputmode="numeric"></div>
  <div class="fld"><label for="cy">Top Y (px)</label><input type="number" id="cy" min="0" step="1" inputmode="numeric"></div>
  <div class="fld"><label for="cw">Width (px)</label><input type="number" id="cw" min="1" step="1" inputmode="numeric"></div>
  <div class="fld"><label for="ch">Height (px)</label><input type="number" id="ch" min="1" step="1" inputmode="numeric"></div>
  <div class="fld"><label for="ow">Output width (optional px)</label><input type="number" id="ow" min="0" max="8000" value="0" inputmode="numeric"></div>
  <div class="fld"><label for="fmt">Output format</label><select id="fmt"><option value="image/jpeg">JPG</option><option value="image/png">PNG</option><option value="image/webp">WebP</option></select></div>
  <div class="fld"><label for="q">Quality <output id="qv" for="q">90%</output></label><input type="range" id="q" min="40" max="100" value="90"></div>`, "Crop", "crop.zip")
};
