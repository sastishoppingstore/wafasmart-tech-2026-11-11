"use strict";
const H = require("./_helpers.js");
const K = require("./_kit.js");
module.exports = {
  name: "HEIC to JPG",
  module: "convert-image",
  short: "Convert iPhone HEIC photos to ordinary JPG so Windows, Android, upload forms and email can open them.",
  title: "HEIC to JPG Converter — iPhone Photos | Wafa Smart",
  desc: "Convert HEIC to JPG online: iPhone photos become standard JPEG on your own device. Batch, EXIF-aware, free, nothing uploaded to any server.",
  h1: "HEIC to JPG Converter for iPhone photos",
  libs: ["heic2any", "jszip"],
  kw: ["heic to jpg", "heic to jpg online", "convert heic", "iphone photo converter", "heic to jpg windows", "open heic file"],
  intro: [
    "HEIC is the format an iPhone shoots in since iOS 11. It is genuinely better technology — half the size of a JPG with more dynamic range — and it is also the reason a photo you texted to a colleague turns into a blank icon on Windows, is refused by a job portal and will not open in an older version of Office. Converting to JPG is the two-second fix, and it needs to happen on your side before the file leaves your hands.",
    "This page decodes HEIC in the browser with a pinned, integrity-checked decoder that streams down only when you actually pick a HEIC file. The photo is decoded to pixels, re-encoded as standard JPEG with your quality setting, and offered back as a download. Nothing is uploaded: the raw HEIC never leaves the tab, which is worth something when the pictures are family photos, scanned documents or anything you would not post to a free conversion site.",
    "iPhone HEIC files carry rotation metadata and, on newer models, depth and edit stacks. Rotation is applied here so the JPG is upright the way you took it; the extra computational-photography data is not preserved, because JPG cannot carry it. Live Photos convert from their still frame. Batch a whole album if you like — the status line counts through each file, and Download all as ZIP puts the set back into one archive."
  ],
  steps: [
    "Drop .heic or .heif files into the box — from Downloads, or AirDrop them to your Mac first.",
    "Choose JPG (default) or PNG output, then set quality for the size you need.",
    "Press Convert to JPG. The first run downloads the decoder, so it pauses briefly.",
    "Save each photo from the grid, or grab one ZIP for the whole batch.",
    "Share the JPG anywhere: WhatsApp, email, CNIC or visa portals, Word."
  ],
  ur: "iPhone ki HEIC photos box me dalain — yeh tool unhein aam JPG bana deta hai taake Windows, Android, WhatsApp aur online forms me chal sakaen. Pehli bar conversion me thora waqt lagta hai kyunke decoder download hota hai. Photo aapke phone se kahin nahi jati, sab kuch browser me hota hai.",
  features: [
    "Real HEIC decoding inside the browser, no upload and no server queue",
    "EXIF rotation honoured, so portrait shots stay portrait",
    "Quality control for the JPEG, plus an optional PNG output",
    "Batch conversion with progress counting and one ZIP",
    "Accepts JPG, PNG, WebP, GIF and BMP files as well",
    "Decoder is pinned and hash-checked before it runs"
  ],
  tips: [
    "On iPhone, Settings > Camera > Formats > Most Compatible makes future shots JPG if you would rather not convert at all.",
    "Files shared through WhatsApp are already converted by iPhone; email and AirDrop are the ones that keep HEIC.",
    "A HEIC that refuses to decode is usually a raw Pro or a file from a very new iOS build — screenshot it or export it as JPG from the Photos app.",
    "Faces look best around quality 85; below 70 skin tones start to band.",
    "Convert once. Every later JPG save costs detail the HEIC originally had."
  ],
  faqs: [
    H.faqFree("HEIC to JPG", "iPhone owners can convert an entire album without a subscription."),
    H.faqPrivacy("HEIC to JPG", "HEIC photo"),
    { q: "Why does the first conversion take a few seconds?", a: "The HEIC decoder is deliberately not bundled with the page — it streams from a pinned CDN the first time a HEIC file is picked, then your browser caches it for the rest of the session." },
    { q: "Does quality drop when I convert?", a: "HEIC to JPG is a lossy re-encode, so some detail is traded away. At quality 85 the difference is hard to see on a phone screen; keep the original HEIC if you plan to edit." },
    { q: "Can it convert Live Photos?", a: "The still image of a Live Photo converts. The short video half is a separate MOV file and is not part of this tool." },
    { q: "Does it work on Android and Windows?", a: "Yes, in any modern browser — the constraint is the file, not the operating system. Save the HEIC to your device first, then drop it in." },
    H.faqSafe("HEIC to JPG", "family photos and document scans")
  ],
  related: [["image-resizer", "Resize before uploading"], ["compress-image", "Reach a 20 KB form limit"], ["passport-size-photo-maker", "Make a passport photo"], ["image-to-pdf", "Photos into one PDF"], ["jpg-to-png", "JPG to PNG"]],
  ui: K.DZ("Add HEIC / HEIF photos", ".heic,.heif,image/heic,image/heif,image/*") +
    K.FORM(`<div class="fld"><label for="fmt">Output format</label><select id="fmt"><option value="image/jpeg" selected>JPG</option><option value="image/png">PNG</option></select></div>
  <div class="fld"><label for="q">Quality <output id="qv" for="q">88%</output></label><input type="range" id="q" min="40" max="98" value="88"></div>
  <p class="hint">Rotation from the iPhone metadata is applied automatically, so portrait shots come out upright.</p>`, "Convert to JPG", "heic-to-jpg.zip", "Output")
};
