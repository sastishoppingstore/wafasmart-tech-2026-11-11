"use strict";
const H = require("./_helpers.js");
const K = require("./_kit.js");
module.exports = {
  name: "Rotate & Flip Image",
  short: "Fix sideways phone photos, spin an image 90° or mirror it — with a live preview before you save.",
  title: "Rotate & Flip Image Online — 90/180, Mirror | Wafa Smart",
  desc: "Rotate an image 90, 180 or 270 degrees, flip horizontally or vertically and preview the result. JPG, PNG, WebP, HEIC. Free, no upload, batch.",
  h1: "Rotate & Flip Image — straighten it, then save",
  libs: ["heic2any", "jszip"],
  kw: ["rotate image online", "flip image horizontally", "rotate jpg 90 degrees", "mirror photo", "fix rotated photo", "image rotator"],
  intro: [
    "Camera sensors are landscape, so a portrait shot is really a sideways picture plus a note that says “display me rotated”. Most viewers obey that note, and then a website form, an older print shop or a WhatsApp document preview does not, and the CNIC scan arrives on its side. Rotating the pixels themselves — baking the angle in instead of relying on metadata — is the only fix that survives every destination, and that is what this page does.",
    "Press Rotate left or Rotate right to turn the picture by a quarter turn at a time, 180° for an upside-down scan, or Flip horizontal / vertical to mirror it. The preview updates instantly, so what you see is exactly what will be saved. Because the transform is applied to decoded pixels, the EXIF flag is resolved at the same time: the output is upright on any software, with no rotation note left behind.",
    "Batch mode handles the common case of twenty photos from one event, all shot the same way wrong. Add them together, set the transform once, press Rotate & Flip and every file comes out turned the same amount — individually downloadable from the grid, or as one ZIP. Original resolution is preserved exactly; only the canvas is resized to fit the new angle, so a 3000×4000 portrait becomes a genuine 3000×4000 upright JPG instead of a sideways 4000×3000 with a hint."
  ],
  steps: [
    "Drop one or more photos into the box (JPG, PNG, WebP, GIF, BMP or HEIC).",
    "Use the buttons to rotate 90° left/right, 180°, or mirror horizontally/vertically.",
    "Check the preview — that is the file you are about to save.",
    "Pick output format and quality, then press Rotate & Flip.",
    "Save each result, or Download all as ZIP for a whole batch."
  ],
  ur: "Photo box me dalain aur Rotate / Flip ke buttons dabayein — preview me waisa hi nazar aayega jaisi file banegi. Sidha karne ke baad Save kar lein, ya poori batch ZIP me. Agar photo mobile par sidhi aur computer par ulti lagti hai, to pixels rotate karna hi asli ilaaj hai.",
  features: [
    "Quarter-turn rotation applied to actual pixels, not just metadata",
    "Horizontal and vertical mirroring, combinable with any rotation",
    "Live preview so the saved file matches the screen",
    "Batch transform: one action, twenty photos",
    "PNG output keeps transparency; JPG and WebP flatten on white",
    "Exact original dimensions kept, swapped for 90°/270° turns"
  ],
  tips: [
    "If a photo looks right on your phone but wrong when emailed, rotating here fixes it permanently.",
    "Mirroring is a separate action from rotation — flip first if you need text legible again.",
    "Rotate then compress: a turned image sometimes encodes slightly differently, so check the size after.",
    "Screenshots of vertical text usually need 180°, not 90°, if they came from a rotated tablet.",
    "Keep the original file: rotation bakes in, and un-rotating loses quality on JPG."
  ],
  faqs: [
    H.faqFree("Rotate & Flip", "Batch runs included, with no watermark added."),
    H.faqPrivacy("Rotate & Flip", "photo"),
    { q: "Why does my photo look rotated correctly here but sideways elsewhere?", a: "That is EXIF orientation: the pixels are sideways and a tag tells good viewers to turn them. This tool rotates the pixels themselves, which is why the result looks right everywhere." },
    { q: "Do I lose quality when rotating a JPG?", a: "One decode-and-re-encode cycle costs a little at the quality you pick — negligible at 90%. Rotate once rather than repeatedly." },
    { q: "Can I mirror a selfie so text reads normally?", a: "Yes — Flip horizontal mirrors it left-to-right, which is the usual fix for a selfie where a sign or shirt print reads backwards." },
    { q: "Does it work with PNGs that have transparency?", a: "Choose PNG output and the alpha channel survives the rotation. JPG output fills the transparent area with white." },
    H.faqMobile("Rotate & Flip", " The buttons are large enough for thumbs, and the preview scales down.")
  ],
  related: [["crop-image", "Crop after straightening"], ["image-resizer", "Resize the turned photo"], ["compress-image", "Shrink before upload"], ["heic-to-jpg", "HEIC first"], ["add-watermark", "Mark it"]],
  ui: K.DZ("Add photos to rotate or flip", "image/*,.heic,.heif") +
    `<section class="t-card">
  <div class="imgwrap"><canvas id="pv" width="600" height="400" aria-label="Preview of the rotated image"></canvas></div>
  <div class="segs" role="group" aria-label="Transform">
    <button type="button" class="btn btn-ghost" id="l" disabled title="Rotate 90° left">⟲ 90° left</button>
    <button type="button" class="btn btn-ghost" id="r" disabled title="Rotate 90° right">90° right ⟳</button>
    <button type="button" class="btn btn-ghost" id="u" disabled>180°</button>
    <button type="button" class="btn btn-ghost" id="fh" aria-pressed="false">Flip horizontal</button>
    <button type="button" class="btn btn-ghost" id="fv" aria-pressed="false">Flip vertical</button>
    <button type="button" class="btn btn-ghost" id="rz" disabled>Reset</button>
  </div>
  <p class="hint" id="tstate">No transform yet.</p>
</section>` +
    K.FORM(`<div class="fld"><label for="fmt">Output format</label><select id="fmt"><option value="image/jpeg">JPG</option><option value="image/png">PNG (keeps transparency)</option><option value="image/webp">WebP</option></select></div>
  <div class="fld"><label for="q">Quality <output id="qv" for="q">90%</output></label><input type="range" id="q" min="40" max="100" value="90"></div>`, "Rotate & Flip", "rotated.zip", "Output")
};
