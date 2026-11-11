"use strict";
const H = require("./_helpers.js");
const K = require("./_kit.js");
module.exports = {
  name: "WebP to JPG",
  module: "convert-image",
  short: "Convert WebP images to JPG for older software, email clients and forms that only accept JPEG.",
  title: "WebP to JPG Converter — Batch, No Upload | Wafa Smart",
  desc: "Convert WebP to JPG online: keep dimensions, set quality and flatten transparency. Works in batches, free, and nothing is ever uploaded.",
  h1: "WebP to JPG Converter for forms, email and old software",
  libs: ["heic2any", "jszip"],
  kw: ["webp to jpg", "convert webp to jpg", "webp to jpg online", "webp converter", "change webp to jpeg", "open webp in photoshop"],
  intro: [
    "WebP is smaller than JPG at the same visual quality, which is why browsers and Google services serve it — but plenty of software still cannot open it. Government and school upload forms reject it, older versions of Office cannot place it, and many desktop photo managers show a grey placeholder instead. Converting the file to JPEG once fixes all of that without re-shooting the image.",
    "This page reads the WebP into your browser, paints it on a canvas at full pixel size and re-encodes it as JPEG with the quality you choose. Transparent WebPs are flattened onto a colour you pick, so logos do not arrive with a black rectangle behind them. The output keeps the source dimensions exactly; only the container and the encoder change.",
    "Because the work happens on your device, this is a safe place to convert screenshots of invoices, medical reports or anything you would rather not post to a conversion service. No file is uploaded, no queue is involved and nothing is watermarked — a batch of thirty WebPs from your Downloads folder converts in one press and can come back as one ZIP."
  ],
  steps: [
    "Drop the .webp files into the box (several at once is fine).",
    "Choose the background colour used behind any transparent areas.",
    "Set quality — 85% is a safe default, 70% for web pages.",
    "Press Convert to JPG and read each output size in the status line.",
    "Save individually from the grid, or Download all as ZIP."
  ],
  ur: "WebP files box me dalain, quality aur transparency ka background chunein, Convert dabayein. JPG file aapke computer me hi banti hai — kahin upload nahi hoti. Purane software aur online forms me JPG hi chalta hai, is liye yeh conversion kaam aati hai.",
  features: [
    "Full-resolution JPEG output — no hidden downscaling",
    "Transparency flattened on a colour you control",
    "Batch conversion with a single ZIP for many files",
    "Also accepts PNG, GIF, BMP, JPG and HEIC sources",
    "Quality slider with measured output size reported per file",
    "Free, private, no upload and no watermark"
  ],
  tips: [
    "Saved a WebP from a website and need it in Word? Convert here — Office still expects JPEG or PNG.",
    "If you wanted WebP to stay lightweight but be smaller still, use Compress Image with a KB target instead of re-encoding blindly.",
    "Screenshots of text keep crispness better as PNG; convert those to PNG with JPG to PNG's sibling tool rather than to JPG.",
    "Some forms check the file signature, not just the extension — this writes a real JPEG header, so the check passes.",
    "Rename before uploading if the form rejects doubled names; the ZIP keeps your originals' order."
  ],
  faqs: [
    H.faqFree("WebP to JPG", "There is no batch ceiling beyond your device's memory."),
    H.faqPrivacy("WebP to JPG", "WebP image"),
    { q: "Can my browser even read WebP?", a: "Every current browser can. If a very old one cannot, the file is rejected with a plain message instead of converting to a blank picture." },
    { q: "Does converting to JPG lose quality?", a: "JPG is lossy, so some detail is traded for size at the quality you pick. At 85% the difference is usually invisible in normal viewing." },
    { q: "Why does my converted logo have coloured edges?", a: "Those are flattened semi-transparent pixels. Try a background colour closer to where the logo will be placed." },
    H.faqOffline("WebP to JPG")
  ],
  related: [["jpg-to-png", "JPG to PNG"], ["png-to-jpg", "PNG to JPG"], ["compress-image", "Compress to a KB target"], ["heic-to-jpg", "HEIC to JPG"], ["image-to-base64", "Embed as base64"]],
  ui: K.DZ("Add WebP files", ".webp,image/webp,.png,.gif,.bmp,.heic,.heif,image/*") +
    K.FORM(`<div class="fld"><label for="fmt">Output format</label><select id="fmt"><option value="image/jpeg" selected>JPG</option><option value="image/png">PNG</option></select></div>
  <div class="fld"><label for="bg">Background behind transparency</label><div class="row-item"><input type="color" id="bg" value="#ffffff" aria-label="Background colour"><span class="tiny muted">White for documents</span></div></div>
  <div class="fld"><label for="q">Quality <output id="qv" for="q">85%</output></label><input type="range" id="q" min="30" max="98" value="85"></div>`, "Convert to JPG", "webp-to-jpg.zip", "Output")
};
