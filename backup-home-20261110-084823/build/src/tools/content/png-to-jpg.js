"use strict";
const H = require("./_helpers.js");
const K = require("./_kit.js");
module.exports = {
  name: "PNG to JPG",
  module: "convert-image",
  short: "Turn PNGs into small JPG files, choosing the background that replaces transparency and the quality you need.",
  title: "PNG to JPG Converter — Quality & Background | Wafa Smart",
  desc: "Convert PNG to JPG online: pick quality, flatten transparency on white, black or any colour. Batch conversion, no upload, free. Works on phone.",
  h1: "PNG to JPG Converter — control quality and the background",
  libs: ["heic2any", "jszip"],
  kw: ["png to jpg", "convert png to jpg", "png to jpg online", "remove png transparency", "make png smaller jpg", "png to jpg batch"],
  intro: [
    "The moment a PNG meets a JPG encoder, its transparency has to become something, because the JPG format has no alpha channel. Most converters silently paint black, which is why logos converted elsewhere often arrive with a dark box around them. Here the background is a choice you make before conversion: white for documents and forms, black for dark interfaces, or any colour that matches the design the image will sit on.",
    "Quality is the other dial. Because JPG is lossy, the slider trades size against detail — 80% is usually indistinguishable from the original for photographs, while 60% can halve the file again for web pages. The status line reports the actual encoded size after every run, so you can see what a change bought you rather than guessing.",
    "Everything happens locally on your device, which matters when the PNGs are screenshots of a payslip, a scanned CNIC or a client mockup under NDA. Files are read into page memory, flattened, encoded and handed back as downloads; no upload request leaves the tab, so there is nothing to intercept or store. Multiple PNGs convert in one batch and can be collected as a single ZIP."
  ],
  steps: [
    "Drop the PNG files into the box — one logo or twenty screenshots.",
    "Set the background colour used behind transparent pixels (white is the safe default).",
    "Drag Quality to suit the destination: 80–90% for print-ish use, 60–75% for web.",
    "Press Convert to JPG and watch each file's resulting size in the status line.",
    "Save the images individually, or Download all as ZIP for a batch upload."
  ],
  ur: "PNG file dalain, background color chunein (transparency ki jagah kya nazar aaye — aam tor par white) aur quality set karein. Convert dabate hi JPG aapke device me ban jati hai. Chhoti file chahiye to quality 70 rakhein. Koi upload nahi.",
  features: [
    "Choose the colour that replaces transparency instead of inheriting black",
    "Quality slider with the real encoded size reported for every file",
    "Batch conversion plus one ZIP for the whole set",
    "Original pixel dimensions preserved — only the format changes",
    "Also accepts WebP, GIF, BMP and HEIC inputs",
    "No upload, no account, no watermark and no file limit"
  ],
  tips: [
    "For a form that asks for a photograph on white, set background to white and quality 85 — it reads as a photo, not a compressed one.",
    "Text-heavy PNGs soften below roughly 75%; screenshots of documents are better kept PNG or converted at 90%.",
    "If the converted JPG has a halo around a logo, the PNG itself had semi-transparent edge pixels — a different background colour will hide them better than quality will.",
    "Need a specific KB value rather than a quality guess? Use Compress Image and pick the target.",
    "Convert once and reuse: each further JPG save costs detail."
  ],
  faqs: [
    H.faqFree("PNG to JPG", "Including the background-colour and quality controls."),
    H.faqPrivacy("PNG to JPG", "PNG"),
    { q: "What happens to the transparent part of my PNG?", a: "JPG cannot store transparency, so it is flattened onto the colour you choose. White suits documents; black suits dark layouts; anything else matches a brand background." },
    { q: "Which quality should I pick?", a: "Start at 80. Photographs look near-identical there. Drop to 65–70 for web images where load weight matters, and stay above 85 for anything that will be printed." },
    { q: "Does the file get smaller?", a: "Almost always. A flat-colour logo PNG can be larger than a 90% JPG of the same picture, and a photographic PNG typically shrinks five to ten times over." },
    H.faqMobile("PNG to JPG", " The colour picker works with the native palette on mobile.")
  ],
  related: [["jpg-to-png", "JPG back to PNG"], ["compress-image", "Hit an exact KB target"], ["add-watermark", "Mark it before converting"], ["crop-image", "Trim the canvas first"], ["image-to-pdf", "Put photos in a PDF"]],
  ui: K.DZ("Add PNG files to convert", ".png,.webp,.gif,.bmp,.heic,.heif,image/*") +
    K.FORM(`<div class="fld"><label for="fmt">Output format</label><select id="fmt"><option value="image/jpeg" selected>JPG</option><option value="image/webp">WebP</option></select></div>
  <div class="fld"><label for="bg">Background behind transparency</label><div class="row-item"><input type="color" id="bg" value="#ffffff" aria-label="Background colour"><span class="tiny muted">White suits forms and documents</span></div></div>
  <div class="fld"><label for="q">Quality <output id="qv" for="q">85%</output></label><input type="range" id="q" min="30" max="98" value="85"></div>`, "Convert to JPG", "png-to-jpg.zip", "Output")
};
