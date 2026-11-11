"use strict";
const H = require("./_helpers.js");
const K = require("./_kit.js");
module.exports = {
  module: "image-size-adjuster",
  name: "Resize & Compress Image",
  short: "Shrink dimensions and file weight in a single pass, then pull the whole batch down as one ZIP.",
  title: "Resize & Compress Image to KB in One Go | Wafa Smart",
  desc: "Resize and compress in one pass: set pixel dimensions or a KB ceiling, choose JPG, WebP or PNG, batch a folder into a ZIP. No upload, free.",
  h1: "Resize & Compress Image — dimensions and weight in one pass",
  libs: ["heic2any", "jszip"],
  kw: ["resize and compress image", "reduce image size to 100kb", "resize photo to 500kb", "batch image resizer compressor", "change image size and quality together"],
  intro: [
    "Most image jobs need both halves of the answer at once: the picture has to fit a box — 800 × 800, 1024 wide, a square for a form — and it has to fit a weight limit — under 100 KB for a government portal, under 2 MB for an estate-agent listing, under 50 KB for a signature scan. Doing one then the other means two round trips through a desktop program. This page does both in a single pass: you name the frame, you name the ceiling, and the file that comes out satisfies both.",
    "Two modes drive the same engine. In By Pixels the image is redrawn at the width and height you type, with the aspect-ratio lock deciding whether the second number is calculated for you or ignored and the picture stretched. In By File Size the tool works the other way round: it searches JPEG quality, then trims the pixel dimensions if quality alone cannot reach the ceiling, and stops the moment the encoded file is at or below your target. Every attempt is a real encode, so the number you see on the result is the number the file actually has.",
    "Drop twenty photos in and you get twenty files back plus a ZIP — no queue on a server, no per-day quota, no email link that expires. HEIC from an iPhone is decoded in the browser before anything else happens, so a batch can mix iPhone and Android sources. PNG keeps its transparency; JPG and WebP are flattened onto whatever background colour you choose.",
    "Nothing is uploaded. The image bytes go straight from your storage into this tab's memory, the resized copy is created there, and when you close the tab the memory is released. The only network traffic on the page is the one-time fetch of the decoder libraries when you first press the button, pulled from a pinned CDN version."
  ],
  steps: [
    "Drop one or many pictures onto the panel — JPG, PNG, WebP or HEIC.",
    "Pick By Pixels and type the frame you need, or pick By File Size and set the KB or MB ceiling.",
    "Choose the output format; keep the aspect lock on unless the target box is a fixed shape.",
    "Press Adjust & Download and wait while each file is re-encoded against your limits.",
    "Save the single result, or take the ZIP for a whole batch."
  ],
  ur: "Pehle tasveer ka size (jaise 800x800) set karein ya maqsad wazan (jaise 100KB) — phir ek hi button se resize aur compress dono ho jate hain. Agar ek se zyada photo daalein to sab ka ZIP ban jata hai. Poora kaam aapke browser me hota hai, koi upload nahi.",
  features: [
    "One pass for dimensions and weight",
    "Real encodes — the reported size is the file's actual size",
    "Quality search first, downscale second",
    "Batch any number of files into a single ZIP",
    "HEIC, PNG with alpha, JPG and WebP output",
    "No sign-up, no watermark, no upload"
  ],
  tips: [
    "Set the ceiling slightly below the portal's limit — many reject a file that is exactly at it because they count overhead.",
    "For a photo, dropping 20% of the width usually saves more KB than dropping quality to 60%.",
    "WebP at 80 typically beats JPG at 85 on weight; keep JPG when the receiver is an old form.",
    "Run the batch once with a copy of your worst photo before processing forty files.",
    "Keep the original — this page writes a new file and never touches what you opened."
  ],
  faqs: [
    H.faqFree("Resize & Compress Image"),
    H.faqPrivacy("Resize & Compress Image", "picture"),
    H.faqMobile("Resize & Compress Image", " and a ZIP of twenty resized photos builds on a mid-range phone in seconds"),
    { q: "Will the output be exactly the size I asked for?", a: "It will be at or below your ceiling. Encoders work in steps, so landing on 100.0 KB is rare; the tool takes the largest quality that fits under the limit." },
    { q: "What happens if a picture cannot be made small enough?", a: "It says so instead of lying. A 4000 × 3000 photo with dense texture has a floor below which quality cannot go without shrinking the frame, so if your ceiling is unrealistic the tool reports the smallest it honestly reached." },
    { q: "Does resizing change the DPI?", a: "No. Screens and browsers use pixel dimensions; DPI metadata only matters to print software, and changing it does not change the picture." }
  ],
  related: [["image-size-adjuster", "Set an exact KB or pixel size"], ["compress-image", "Hit a KB target only"], ["image-resizer", "Resize with social presets"], ["crop-image", "Cut to a shape first"], ["heic-to-jpg", "iPhone photos to JPG"], ["passport-size-photo-maker", "Print-ready photo sheets"]],
  ui: K.DZ("Add images to adjust", "image/*,.heic,.heif") + K.FORM(`<div class="fld wide"><label>Mode</label><select id="mode"><option value="px">By Pixels (Width x Height)</option><option value="kb">By File Size (KB / MB)</option></select></div>
<div class="fld"><label for="w">Width (px)</label><input type="number" id="w" min="1" value="800"></div>
<div class="fld"><label for="h">Height (px)</label><input type="number" id="h" min="1" value="800"></div>
<div class="fld"><label><input type="checkbox" id="lock" checked style="width:auto"> Lock aspect ratio</label></div>
<div class="fld"><label for="targetKb">Target Size</label><select id="targetKb"><option value="100">100 KB</option><option value="200">200 KB</option><option value="250">250 KB</option><option value="500">500 KB</option><option value="1000">1000 KB (1 MB)</option><option value="custom">Custom</option></select></div>
<div class="fld"><label for="customKb">Custom KB</label><input type="number" id="customKb" min="10" value="100"></div>
<div class="fld"><label for="fmt">Output</label><select id="fmt"><option value="image/jpeg">JPG</option><option value="image/webp">WebP</option><option value="image/png">PNG</option></select></div>
<div class="fld"><label for="q">Quality <output id="qv" for="q">85%</output></label><input type="range" id="q" min="40" max="95" value="85"></div>`, "Adjust & Download", "adjusted-images.zip")
};
