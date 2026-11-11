"use strict";
const H = require("./_helpers.js");
const K = require("./_kit.js");
module.exports = {
  name: "Image Resizer",
  short: "Resize photos to exact pixels or a percentage, with aspect-ratio lock and one-tap presets for Instagram, WhatsApp DP, YouTube, passport and CNIC.",
  title: "Image Resizer Online — Pixels, %, Presets | Wafa Smart",
  desc: "Resize JPG, PNG, WebP or HEIC to exact pixels or a percentage. Aspect lock, Instagram, WhatsApp, YouTube, passport and CNIC presets. Free, no upload.",
  h1: "Image Resizer — set exact pixel sizes, or use a preset",
  libs: ["heic2any", "jszip"],
  kw: ["image resizer", "resize image online", "resize photo to 1080x1080", "change image size kb", "passport photo size", "reduce image dimensions"],
  intro: [
    "Resizing means changing the pixel dimensions of a picture — 3000×4000 down to 1080×1440, or up to whatever a form demands. This tool does it in your browser with the canvas resampling engine, so a batch of ten phone photos takes seconds and no copy of them ever reaches a server. That matters for CNIC scans, biometric-format photos and client work you are not allowed to upload anywhere.",
    "Two modes cover almost every case. Pixels mode takes a target width and height; percent mode scales both sides relative to the original, which is the fastest way to halve a set of photos before emailing them. The lock chain between the two boxes keeps proportions so nothing looks stretched — turn it off only when you genuinely want to squash an image, for example to fit a banner template.",
    "The preset list handles the sizes people look up constantly: Instagram square 1080×1080, portrait 1080×1350, story 1080×1920, WhatsApp display picture 640×640, YouTube thumbnail 1280×720, passport 35×45 mm at 300 dpi (413×531 px) and a CNIC-shaped 740×470. Choose one, press Resize, and every file you dropped in is rebuilt at that size with your chosen output format and quality."
  ],
  steps: [
    "Drop one or more images into the box — JPG, PNG, WebP, GIF, BMP or iPhone HEIC.",
    "Pick Pixels or Percent, or select a preset from the list (the boxes fill in for you).",
    "Leave the aspect-ratio lock on unless you want a deliberately non-proportional result.",
    "Choose the output format (JPG smallest, PNG keeps transparency, WebP modern) and quality.",
    "Press Resize, then save each result from the grid — or Download all as ZIP for a batch."
  ],
  ur: "Photo is box me dalain, phir ya to exact pixels likhein (maslan 1080×1080) ya preset chunein — Instagram, WhatsApp DP, YouTube thumbnail, passport 35×45 mm. Lock chain dabayein rahe taake shape na bigre. Resize dabakar file download kar lein; aapka image kabhi upload nahi hota.",
  features: [
    "Exact pixel sizing or proportional percentage scaling",
    "Aspect-ratio lock fits each photo inside your box instead of stretching it",
    "Seven real-world presets including passport and CNIC dimensions",
    "JPG, PNG or WebP output with a quality slider",
    "Batch mode: every dropped file rebuilt at the same size",
    "EXIF rotation respected, so phone photos resize the way they are viewed"
  ],
  tips: [
    "Downscaling far (say 6000 px to 400 px) looks better in two steps; this tool uses high-quality smoothing, but if it still softens, resize to half, then to target.",
    "Keep PNG only when you need transparency — a photographic PNG is often five times the size of the JPG.",
    "Instagram re-compresses uploads, so exporting at 1080 px wide, quality 85, usually survives that second pass cleaner.",
    "For WhatsApp DP, remember the app crops to a circle in chat: centre the face before resizing with the Crop Image tool.",
    "Up-scaling cannot add real detail — above roughly 130% of the original, expect softness rather than sharpness."
  ],
  faqs: [
    { q: "Does resizing reduce the file size in KB?", a: "Usually yes, because fewer pixels mean fewer bytes. For a specific KB target use the Compress Image tool, which searches quality and size until it lands on your target." },
    H.faqFree("Image Resizer"), H.faqPrivacy("Image Resizer", "image"),
    { q: "Which preset is right for a Pakistani passport photo?", a: "35×45 mm printed at 300 dpi is 413×531 pixels — that is the Passport preset here. The Passport Size Photo Maker page additionally prints multiple copies on a 4×6 sheet." },
    { q: "Can I resize HEIC files from an iPhone?", a: "Yes. HEIC decoding is loaded on demand from a pinned CDN and then everything stays local, so mixed JPG and HEIC batches work in one run." },
    H.faqMobile("Image Resizer")
  ],
  related: [["compress-image", "Hit a KB target"], ["crop-image", "Crop first"], ["passport-size-photo-maker", "Printable passport sheet"], ["jpg-to-png", "Switch format"], ["heic-to-jpg", "HEIC to JPG"]],
  ui: K.DZ("Add images to resize", "image/*,.heic,.heif") + K.FORM(`<div class="fld"><label for="preset">Preset</label><select id="preset"><option value="">Custom size</option><option value="1080x1080">Instagram square 1080×1080</option><option value="1080x1350">Instagram portrait 1080×1350</option><option value="1080x1920">Instagram story 1080×1920</option><option value="640x640">WhatsApp DP 640×640</option><option value="1280x720">YouTube thumbnail 1280×720</option><option value="413x531">Passport 35×45 mm @300dpi</option><option value="740x470">CNIC shape 740×470</option></select></div>
  <div class="fld"><label for="mode">Mode</label><select id="mode"><option value="px">Pixels</option><option value="pct">Percent</option></select></div>
  <div class="fld"><label for="w">Width (px or %)</label><input type="number" id="w" min="1" max="12000" value="1080" inputmode="numeric"></div>
  <div class="fld"><label for="h">Height (px)</label><input type="number" id="h" min="1" max="12000" value="1080" inputmode="numeric"></div>
  <div class="fld"><label for="fmt">Output format</label><select id="fmt"><option value="image/jpeg">JPG</option><option value="image/png">PNG</option><option value="image/webp">WebP</option></select></div>
  <div class="fld"><label for="q">Quality <output id="qv" for="q">85%</output></label><input type="range" id="q" min="40" max="100" value="85"></div>
  <div class="fld"><label class="rng"><input type="checkbox" id="lock" checked style="width:auto"> Lock aspect ratio</label></div>`, "Resize", "resized.zip")
};
