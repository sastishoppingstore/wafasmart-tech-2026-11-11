"use strict";
module.exports = {
  name: "Image to PDF",
  short: "Convert JPG, PNG, WebP or HEIC photos into one PDF — reorder pages, pick A4 or Letter, set margins and quality. 100% in-browser.",
  title: "Image to PDF Maker — JPG/PNG/HEIC to A4 | Wafa Smart",
  desc: "Convert JPG, PNG or HEIC photos into one organised A4 or Letter PDF. Reorder pages, set margins and quality. Free, private, no upload.",
  h1: "Image to PDF — turn photos into one tidy PDF",
  libs: ["pdf-lib"],
  intro: [
    "Image to PDF means putting one or more pictures inside a proper document so it can be emailed, printed or uploaded without every recipient needing a photo viewer. This tool does the whole job in your browser: pick your images, arrange them in the order you want, choose a page size and download a single PDF. Nothing is uploaded anywhere — the conversion runs on your own device, which is why it works even on a slow connection and why your photos stay private.",
    "People usually need this for paperwork: photographs of a CNIC or passport, a receipt for expenses, a signed contract, homework pages, or a set of product photos that must travel as one attachment. Instead of pasting images into Word and exporting (which bloats the file), the pages here are built directly with pdf-lib at the exact size you choose, so a 12-photo bundle typically lands under 2 MB.",
    "You can place each photo on an A4 or US Letter sheet with real margins, or let the page shrink-wrap the image ('fit to image') when you want a PDF that is basically the picture itself — handy for messaging a single scanned page. Pages can be kept automatic, forced portrait or forced landscape per run, and the JPEG re-encode quality slider controls the final file size."
  ],
  steps: [
    "Drop one or more JPG, PNG, WebP, GIF or HEIC images into the box (or tap the box and pick them on mobile).",
    "Drag the thumbnails to reorder — the first thumbnail becomes page 1. Use ✕ to remove an image, or 'Clear all' to start over.",
    "Choose page size (A4, Letter or fit-to-image), orientation (auto/portrait/landscape) and margin (none/standard/wide).",
    "Set the quality slider — 80% is a good balance for printing and email — then press 'Create PDF'. The pdf-lib engine loads on this click only.",
    "When the progress bar finishes, 'Download PDF' saves the file to your device with a sensible name like photos.pdf."
  ],
  ur: "Bas apni photos is box me dal dein, tarteeb drag karke set karein, page size (A4 ya Letter) chunein aur 'Create PDF' dabayein. File aapke device par banti hai — kahin upload nahi hoti. Phir Download par click karke PDF mehfooz kar lein.",
  features: [
    "Multiple images merged into one PDF, in the order you choose",
    "A4 (210×297 mm), US Letter and fit-to-image page modes",
    "Drag-and-drop reordering with instant thumbnails",
    "Real margins: none (full-bleed), standard (about 12 mm) or wide (about 25 mm)",
    "Quality slider re-encodes to JPEG so you control the output size",
    "HEIC iPhone photos, PNG transparency (white background) and rotated phone photos handled automatically via EXIF"
  ],
  tips: [
    "Scan pages against a dark surface and crop tight before converting — less background noise means a smaller PDF.",
    "For printable paperwork keep quality at 80% and A4; for WhatsApp or email, 65–70% is still crisp on phone screens.",
    "If a page looks blurry, your phone photo was probably zoom-cropped; re-take it flat rather than raising the quality slider.",
    "Photograph a CNIC/SLC in portrait orientation and choose 'Auto' so the sheet never rotates it sideways.",
    "Keep the total under about 25 images per run on older phones — memory in the browser, not a server, does the work."
  ],
  faqs: [
    { q: "Is this image to PDF converter really free?", a: "Yes. It is a static page on wafasmart.tech with no account, no watermark and no limit on the number of images; there is no server that could bill you." },
    { q: "Do my photos get uploaded to a server?", a: "No. The browser reads the files, redraws them on a canvas and pdf-lib writes the PDF locally. Your files never leave your device; switching Wi-Fi off after the engine has loaded still works." },
    { q: "Can I convert iPhone HEIC photos directly?", a: "Yes — HEIC files are decoded in your browser before page layout, so you can drop mixed JPG and HEIC sets together." },
    { q: "What page sizes can I get?", a: "A4 and US Letter sheets with optional margins, or fit-to-image, where the PDF page is exactly the size of the picture at roughly 150 dpi." },
    { q: "Why is my PDF bigger than the original photos?", a: "Re-laying on A4 re-encodes pixels at your chosen quality. Lower the slider to 65–70%, or choose fit-to-image to skip adding white margins." },
    { q: "Can it make a PDF from screenshots, logos or scanned receipts?", a: "Any image the browser can display works: PNG screenshots, WebP, GIF frames, BMP. Text stays as pixels, so this is a photo-PDF, not an OCR document." }
  ],
  related: [["pdf-to-images", "PDF to Images"], ["merge-pdf", "Merge PDF files"], ["compress-image", "Compress an image first"], ["crop-image", "Crop before converting"], ["jpg-to-png", "JPG to PNG"]],
  ui: `<section class="t-card" id="dz-card">
  <div id="dz" class="dz" tabindex="0" role="button" aria-describedby="dz-hint" aria-label="Add images. Drop files here or press Enter to choose.">
    <svg class="dz-ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 15v4a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-4M12 3v12m0-12 4 4m-4-4L8 7"/></svg>
    <b>Add your images</b>
    <span id="dz-hint">Drag &amp; drop, or click / Enter to pick. JPG, PNG, WebP, GIF, HEIC, BMP — as many as you like.</span>
    <input type="file" id="file" accept="image/*,.heic,.heif" multiple hidden>
  </div>
  <ul id="list" class="tiles" aria-label="Selected images, drag to reorder"></ul>
  <p id="empty" class="hint">No images yet. Page 1 will be the first thumbnail.</p>
</section>
<section class="t-card opts" aria-label="Options">
  <div class="fld"><label for="size">Page size</label><select id="size"><option value="a4">A4 (210×297 mm)</option><option value="letter">US Letter</option><option value="fit">Fit to image</option></select></div>
  <div class="fld"><label for="orient">Orientation</label><select id="orient"><option value="auto">Auto</option><option value="p">Portrait</option><option value="l">Landscape</option></select></div>
  <div class="fld"><label for="margin">Margin</label><select id="margin"><option value="0">None (full page)</option><option value="34" selected>Standard (12 mm)</option><option value="72">Wide (25 mm)</option></select></div>
  <div class="fld"><label for="q">JPEG quality <output id="qv" for="q">80%</output></label><input type="range" id="q" min="40" max="95" value="80"></div>
  <div class="fld"><label for="name">File name</label><input type="text" id="name" value="photos" maxlength="40" autocomplete="off" spellcheck="false"></div>
  <div class="acts"><button id="go" class="btn" type="button">Create PDF</button><button id="clear" class="btn btn-ghost" type="button" disabled>Clear all</button></div>
  <div class="prog" hidden><div id="bar" class="prog-i"></div></div>
  <p id="status" role="status" aria-live="polite" class="hint"></p>
  <a id="dl" class="btn btn-wa" href="#" hidden download="photos.pdf">Download PDF</a>
  <p id="err" class="err" role="alert" hidden></p>
</section>`
};
