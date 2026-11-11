"use strict";
const H = require("./_helpers.js");
const K = require("./_kit.js");
module.exports = {
  name: "Compress Image",
  short: "Hit an exact file-size target — 20 KB, 50 KB, 100 KB, 200 KB or 500 KB — by searching JPEG quality (and size) until the file fits.",
  title: "Compress Image to 20/50/100/200KB Online | Wafa Smart",
  desc: "Compress JPG, PNG, WebP or HEIC to an exact KB target: 20KB, 50KB, 100KB, 200KB or 500KB, plus a quality slider. Free, private, no upload.",
  h1: "Compress Image to 50KB, 20KB or any target size",
  libs: ["heic2any", "jszip"],
  kw: ["compress image to 50kb", "reduce image size to 20kb", "compress image online", "jpg compressor", "reduce photo size for cnic form", "image compressor to target kb"],
  guide: "/blog/compress-image-to-50kb-pakistan.html",
  guideTitle: "How to compress an image to 50KB",
  intro: [
    "Forms in Pakistan, the UAE and most visa portals ask for a photograph under a stated size — 20 KB for a CNIC upload, 50 KB for a passport application, 100 KB for a job portal, 200 KB for a university admission system. Guessing a quality setting to land inside that limit is tedious, so this tool searches for you: it re-encodes your picture repeatedly, adjusting JPEG quality and, if needed, the pixel dimensions, until the output actually fits the target you picked.",
    "The search is a binary one, not a random one. Between quality 0.05 and 0.98 the browser's canvas encoder is asked for a middle value, the resulting blob is measured, and the range is narrowed — usually four or five attempts, all inside your device, all finished in under a second for a normal phone photo. You see each attempt tick past in the status line, then get the smallest file that is still no bigger than your target.",
    "Prefer manual control? Switch the target to 'Quality slider only' and you get a conventional compressor with a live KB read-out, useful when a form has no size rule but you still want a light file for WhatsApp or email. WebP output is available too, which typically lands 25–35% smaller than JPEG at the same visual quality on modern browsers."
  ],
  steps: [
    "Drop the photo you need to shrink (JPG, PNG, WebP, BMP or HEIC; several at once is fine).",
    "Choose a target: 20 KB, 50 KB, 100 KB, 200 KB, 500 KB — or 'No target' to use only the quality slider.",
    "Leave 'Allow downscale' ticked for tight targets like 20 KB; untick it to keep every original pixel.",
    "Press Compress and watch the status line as quality is searched automatically.",
    "Save the result, compare the before/after sizes shown, or grab the whole batch as a ZIP."
  ],
  ur: "Photo dalain, target chunein — 20KB, 50KB, 100KB, 200KB ya 500KB. Tool khud quality kam zyada karke bilkul target ke barabar file bana deta hai, aur zaroorat parne par size bhi chhota karta hai. Compress dabakar download kar lein. Sab kuch aapke device me hota hai, upload koi nahi.",
  features: [
    "Six real size targets plus a manual quality-slider mode",
    "Binary quality search — finds the largest quality that still fits your limit",
    "Optional controlled downscale when quality alone cannot reach the target",
    "Before/after sizes and percentage saved shown for every file",
    "Batch processing with one ZIP for portal uploads with several attachments",
    "Transparent PNGs flattened on white so nothing turns black"
  ],
  tips: [
    "For a 20 KB CNIC photograph, allow downscaling to around 600 px — forms usually also demand small dimensions anyway.",
    "Text-heavy screenshots compress poorly as JPEG; try PNG with 'No target' or crop out the background first.",
    "If the form says 'maximum 100 KB' but rejects exactly 102,400 bytes, aim for the next target down for headroom.",
    "Photos of documents get noisy: a slight crop of the dark desk area cuts size dramatically before you even compress.",
    "Keep the original — re-saving repeatedly at lower quality accumulates artefacts that never come back."
  ],
  faqs: [
    { q: "Why did it change my image dimensions?", a: "Only when quality alone could not reach the target and 'Allow downscale' was on. A 20 KB limit on a 12-megapixel photo is impossible without fewer pixels; the tool says so in the result note." },
    H.faqFree("Compress Image"), H.faqPrivacy("Compress Image", "photo"),
    { q: "Can it make a PNG smaller without converting to JPG?", a: "PNG is lossless, so the honest options are fewer pixels or a palette reduction. This tool converts to JPG or WebP for real savings; use the Convert PNG to JPG page if you want that explicitly." },
    { q: "Which target do common portals need?", a: "Typical asks: NADRA/CNIC supporting documents 20–100 KB, passport photographs 50–200 KB, job-portal headshots 100 KB, university applications 200 KB. When unsure, pick the next smaller target — a rejected upload costs more time than a slightly softer photo." },
    H.faqMobile("Compress Image")
  ],
  related: [["image-resizer", "Change dimensions"], ["png-to-jpg", "PNG to JPG"], ["webp-to-jpg", "WebP to JPG"], ["heic-to-jpg", "HEIC to JPG"], ["image-to-pdf", "Photo into PDF"], ["crop-image", "Crop before shrinking"]],
  ui: K.DZ("Add photos to compress", "image/*,.heic,.heif") + K.FORM(`<div class="fld"><label for="target">Target size</label><select id="target"><option value="20480">20 KB</option><option value="51200" selected>50 KB</option><option value="102400">100 KB</option><option value="204800">200 KB</option><option value="512000">500 KB</option><option value="0">No target — use quality slider</option></select></div>
  <div class="fld"><label for="q">Quality <output id="qv" for="q">80%</output></label><input type="range" id="q" min="20" max="98" value="80"></div>
  <div class="fld"><label for="fmt">Output format</label><select id="fmt"><option value="image/jpeg">JPG</option><option value="image/webp">WebP</option></select></div>
  <div class="fld"><label for="maxw">Max width if downscaling</label><select id="maxw"><option value="0">No hard cap</option><option value="600">600 px</option><option value="800" selected>800 px</option><option value="1200">1200 px</option><option value="1920">1920 px</option></select></div>
  <div class="fld"><label class="rng"><input type="checkbox" id="down" checked style="width:auto"> Allow downscale to reach target</label></div>`, "Compress", "compressed.zip")
};
