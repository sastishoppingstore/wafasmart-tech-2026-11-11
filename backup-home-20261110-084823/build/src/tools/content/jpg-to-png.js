"use strict";
const H = require("./_helpers.js");
const K = require("./_kit.js");
module.exports = {
  name: "JPG to PNG",
  module: "convert-image",
  short: "Convert JPG photos to lossless PNG files, one image or a whole batch, without uploading anything anywhere.",
  title: "JPG to PNG Converter — Batch, No Upload | Wafa Smart",
  desc: "Convert JPG to PNG online in one click, single files or batches. Lossless output, optional transparency prep, nothing uploaded. Free, works on mobile.",
  h1: "JPG to PNG Converter — lossless, in your browser",
  libs: ["heic2any", "jszip"],
  kw: ["jpg to png", "convert jpg to png", "jpg to png online", "batch jpg to png", "change jpg to png", "image converter jpg png"],
  intro: [
    "JPG and PNG solve different problems. JPG throws away detail you are unlikely to notice so a photo can be small; PNG keeps every pixel exactly as it is and can carry transparency. Converting JPG to PNG therefore does not improve quality — it freezes the pixels you already have so repeated re-saving stops degrading them. That is the honest reason to do it, and it is the reason designers, teachers and form-fillers convert before editing rather than after.",
    "This page converts in your browser with the canvas encoder, so a 12 MB camera JPG becomes a PNG on your own device in a second or two and no copy of it is sent to any server. There is no queue, no daily quota, no email link and no watermark: the download is the real file, named after the original. Drop in a folder of ten receipts or a single logo and the process is identical.",
    "The output keeps the original pixel dimensions and honours EXIF rotation, so a phone photo comes out the way it was viewed, not sideways. If you are preparing an image for a transparency workflow, convert to PNG here first and then open it with Crop Image or Add Watermark — both of those tools preserve the alpha channel this format makes possible."
  ],
  steps: [
    "Drop one or more JPG files into the box (PNG, WebP, GIF, BMP and iPhone HEIC work too).",
    "Confirm the output format shows PNG; every pixel size is kept exactly.",
    "Press Convert to PNG — the status line counts through the batch as it goes.",
    "Save each result from the grid, or press Download all as ZIP for a folder's worth.",
    "Compare sizes: a photographic PNG is usually larger than the JPG. That is normal for lossless output."
  ],
  ur: "JPG file ko box me dalain, Convert dabayein — file PNG ban kar aapke device me hi download ho jati hai. Ek sath kayi images bhi convert ho sakti hain, ZIP bana kar le lein. Koi upload nahi hota, koi limit nahi.",
  features: [
    "True lossless PNG output with original dimensions untouched",
    "Batch conversion — a whole folder in one go, then one ZIP",
    "EXIF orientation applied, so rotated phone photos land correctly",
    "Accepts JPG, PNG, WebP, GIF, BMP and HEIC sources",
    "No sign-up, no watermark, no file-count or size quota",
    "Runs on mobile as well as desktop over the same page"
  ],
  tips: [
    "Convert to PNG when you plan to edit repeatedly; every extra JPG save throws away more detail.",
    "Logos, line art and screenshots gain the most — flat colour areas stay crisp instead of getting JPG mush at the edges.",
    "If the PNG ends up huge and you only needed no artefacts, try WebP output in the Image Resizer instead.",
    "Keep the JPG original: PNG is a working copy, not a replacement archive.",
    "A file uploaded to a portal that demands PNG usually only needs the extension; this tool makes a genuine PNG."
  ],
  faqs: [
    H.faqFree("JPG to PNG", "Convert as many files as you like in one sitting."),
    H.faqPrivacy("JPG to PNG", "photo"),
    { q: "Will my photo look better after converting to PNG?", a: "No — PNG cannot recover detail JPG already discarded. What it does is stop further loss: the pixels are stored exactly, so re-saving never degrades them again." },
    { q: "Why is the PNG so much bigger than my JPG?", a: "JPG is lossy and PNG is not. A photograph can easily triple in size. If file size matters more than lossless storage, compress the JPG or export WebP instead." },
    { q: "Can I convert many JPGs at once?", a: "Yes. Drop them all in, press Convert once and collect the batch as a single ZIP when it finishes." },
    H.faqMobile("JPG to PNG", " Files app > JPG > share into your browser works well.")
  ],
  related: [["png-to-jpg", "PNG back to JPG"], ["compress-image", "Shrink the result"], ["image-resizer", "Resize while converting"], ["webp-to-jpg", "WebP to JPG"], ["image-to-pdf", "Images into a PDF"]],
  ui: K.DZ("Add JPG files to convert", ".jpg,.jpeg,.png,.webp,.gif,.bmp,.heic,.heif,image/*") +
    K.FORM(`<div class="fld"><label for="fmt">Output format</label><select id="fmt"><option value="image/png" selected>PNG (lossless)</option><option value="image/webp">WebP</option></select></div>`, "Convert to PNG", "jpg-to-png.zip", "Output")
};
