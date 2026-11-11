"use strict";
const H = require("./_helpers.js");
const K = require("./_kit.js");
module.exports = {
  name: "Image Size Adjuster (KB + Pixels)",
  short: "Resize to exact pixels (e.g. 800x800) or compress to target KB like 100KB, 200KB, 500KB, 1MB. All in browser.",
  title: "Image Resizer & Compressor to KB or Pixels | Wafa Smart",
  desc: "Resize image to exact width/height or percentage, or compress to target size in KB/MB. Supports JPG, PNG, WebP, HEIC. Free, private, no upload.",
  h1: "Image Size Adjuster - Set Exact KB or Pixel Size",
  libs: ["heic2any", "jszip"],
  kw: ["resize image to kb", "compress image to 100kb", "resize image to 800x800", "custom image resizer online", "image size in kb"],
  guide: "/blog/compress-image-to-50kb-pakistan.html",
  guideTitle: "Image compression guide for online forms",
  intro: [
    "Set exact pixel dimensions like 800 × 800, 1024 × 768, or custom width/height with aspect ratio lock. Or choose a target file size like 100 KB, 250 KB, 500 KB, 1 MB and the tool will compress to fit.",
    "Everything runs locally in your browser. Images never leave your device. Works on JPG, PNG, WebP, HEIC.",
    "Perfect for forms, portals, websites and social media that require exact image dimensions or file size limits."
  ],
  steps: [
    "Upload your image (JPG, PNG, WebP, HEIC).",
    "Choose 'By Pixels' to set exact width/height or 'By File Size (KB/MB)' to set target size.",
    "For pixels: enter dimensions and lock/unlock aspect ratio.",
    "For size: select target like 100KB or enter custom KB/MB value.",
    "Click Adjust & Download - save single image or all as ZIP."
  ],
  ur: "Image upload karein, ya to exact pixels set karein (800x800) ya target size set karein (100KB, 500KB). Tool khud adjust karke download dega. Sab aapke device par hota hai.",
  features: [
    "Resize by exact pixels or percentage",
    "Compress to target KB/MB with smart search",
    "Lock aspect ratio option",
    "Supports JPG, PNG, WebP, HEIC",
    "Batch processing with ZIP download",
    "100% private - no upload"
  ],
  tips: [
    "For passport photos use exact dimensions like 600x600 or 800x800.",
    "For web use 800-1200px width for good balance of quality/size.",
    "Use JPG output for photos, WebP for smaller size."
  ],
  faqs: [
    H.faqFree("Image Size Adjuster"),
    H.faqPrivacy("Image Size Adjuster", "image"),
    H.faqMobile("Image Size Adjuster"),
    { q: "Can I make image exactly 800x800?", a: "Yes, select 'By Pixels', enter 800 and 800, lock aspect ratio as desired and process." },
    { q: "Can I compress to exactly 100KB?", a: "The tool finds the best quality/settings to get as close to or under your target size as possible." }
  ],
  related: [["image-resizer", "Image Resizer"], ["compress-image", "Compress Image"], ["crop-image", "Crop Image"], ["jpg-to-png", "JPG to PNG"], ["png-to-jpg", "PNG to JPG"], ["passport-size-photo-maker", "Passport Size Photo Maker"]],
  ui: K.DZ("Add images to adjust", "image/*,.heic,.heif") + K.FORM(`<div class="fld wide"><label>Mode</label><select id="mode"><option value="px">By Pixels (Width x Height)</option><option value="kb">By File Size (KB / MB)</option></select></div>
<div class="fld"><label for="w">Width (px)</label><input type="number" id="w" min="1" value="800"></div>
<div class="fld"><label for="h">Height (px)</label><input type="number" id="h" min="1" value="800"></div>
<div class="fld"><label><input type="checkbox" id="lock" checked style="width:auto"> Lock aspect ratio</label></div>
<div class="fld"><label for="targetKb">Target Size</label><select id="targetKb"><option value="100">100 KB</option><option value="200">200 KB</option><option value="250">250 KB</option><option value="500">500 KB</option><option value="1000">1000 KB (1 MB)</option><option value="custom">Custom</option></select></div>
<div class="fld"><label for="customKb">Custom KB</label><input type="number" id="customKb" min="10" value="100"></div>
<div class="fld"><label for="fmt">Output</label><select id="fmt"><option value="image/jpeg">JPG</option><option value="image/webp">WebP</option><option value="image/png">PNG</option></select></div>
<div class="fld"><label for="q">Quality <output id="qv" for="q">85%</output></label><input type="range" id="q" min="40" max="95" value="85"></div>`, "Adjust & Download", "adjusted-images.zip")
};
