"use strict";
const H = require("./_helpers.js");
const K = require("./_kit.js");
module.exports = {
  name: "Passport Size Photo Maker",
  short: "Crop a selfie to exact passport dimensions and lay six or eight copies on a 4×6 or A4 sheet for the printer.",
  title: "Passport Size Photo Maker — 35×45 mm, 4×6 Sheet",
  desc: "Make passport photos online: exact 35×45 mm, 2×2 inch or 45×35 mm crops at 300 dpi, then tiled on a 4×6 or A4 print sheet. Free, no upload.",
  h1: "Passport Size Photo Maker — exact mm, print-ready sheet",
  libs: ["heic2any"],
  kw: ["passport size photo", "passport photo maker", "35x45 mm photo", "2x2 inch passport photo", "passport photo size pakistan", "print passport photo 4x6"],
  intro: [
    "Every passport, visa, CNIC and gun-licence form in the world asks for the same photograph in a different millimetre box: Pakistan and most Schengen states want 35×45 mm, the US and India want 2×2 inches (51×51 mm), Saudi Arabia wants 45×35 mm landscape, Canada wants 50×70 mm. This tool crops your photo to the exact dimensions at 300 dots per inch — the resolution photo labs and consular scanners expect — and then arranges copies of it on a print sheet so one 4×6 photograph prints eight IDs. The mm presets are the specification, not a rough guess: 35×45 mm at 300 dpi is 413×531 pixels.",
    "Two sliders do the work the algorithms cannot. Horizontal and vertical position slide the crop window across your face, because a photo taken by someone else rarely puts your head where the box needs it. Watch the guide lines on the preview: the head must fill roughly 70–80% of the frame height with a little space above the hair, which is what gets a photo accepted or rejected. Turn the guide off for the final file — it is drawn on the preview only, never in the export.",
    "The single-photo output is what online forms want: one file at the exact pixel size, flat white background of your choosing, JPEG quality you control. The sheet output is what the photolab wants: the same photo repeated in a grid with a small gap and thin cut lines, on 4×6 inch, 5×7 inch or A4 paper. Both are produced on your device from the file you picked — no upload, no studio visit, and no third party keeping a portrait of your family."
  ],
  steps: [
    "Add a clear, front-facing photo taken against a plain light wall.",
    "Pick the size preset (Pakistan 35×45 mm, US 2×2 in, Saudi 45×35 mm, Canada 50×70 mm…).",
    "Drag the horizontal and vertical position sliders until the head fills 70–80% of the frame.",
    "Choose the output: single photo for online forms, or a 4×6 / 5×7 / A4 sheet for printing.",
    "Set the gap, cut lines and quality, press Make Photo Sheet, then download."
  ],
  ur: "Apni saaf, samne se li gayi photo dalain, size chunein (Pakistan 35×45 mm, US 2×2 inch) aur sliders se chehra frame ke andar set karein. Phir ya to single photo download karein (online forms ke liye) ya 4×6 / A4 sheet chunein jis par 6–8 copies cut lines ke sath aa jayengi. Photo aapke device me hi banti hai — kahin upload nahi hoti.",
  features: [
    "Eight country presets plus custom millimetres, all converted at 300 dpi",
    "Manual crop positioning, because auto face detection is not available in-browser here",
    "Single-file export for online forms, or a tiled print sheet with cut lines",
    "4×6, 5×7 and A4 sheet sizes with an adjustable gap between photos",
    "Background tint control for the padding area around a tight crop",
    "Guide overlay on the preview only — never printed in the export"
  ],
  tips: [
    "Stand about a metre from a plain wall with daylight on your face; shadows are the most common rejection reason.",
    "Have someone else take the photo — a selfie distorts proportions and can fail a biometric check.",
    "Keep a neutral expression, mouth closed, eyes open and no spectacle glare.",
    "Print the sheet at 100% scale with “fit to page” off, and measure a photo with a ruler before submitting.",
    "For online forms, upload the single photo, not the sheet — most portals reject a multi-photo scan."
  ],
  faqs: [
    H.faqFree("Passport Size Photo Maker", "including the print-sheet layout."),
    H.faqPrivacy("Passport Size Photo Maker", "portrait"),
    { q: "Will an embassy accept a photo made at home?", a: "A correctly sized, sharp, evenly lit photo with the head at the right proportion generally passes automated checks — but this tool cannot guarantee acceptance. Official specs change; verify the current requirement for your document before you submit." },
    { q: "What does 300 dpi actually mean here?", a: "It fixes the pixel size: 35×45 mm becomes 413×531 px. Printing at 300 dpi on a lab sheet keeps the physical size exact; printing at another scale changes the millimetres." },
    { q: "How many photos fit on a 4×6 inch sheet?", a: "Six 35×45 mm photos with a 3 mm gap, or eight tightly packed. A4 takes far more — the preview shows the count before you export." },
    { q: "Can I make a CNIC or visa photo too?", a: "Yes — pick the matching preset, or set custom millimetres; the same crop-and-tile pipeline is used." },
    H.faqMobile("Passport Size Photo Maker", " Sliders are thumb-friendly, and the sheet opens in your photos app.")
  ],
  related: [["crop-image", "Plain crop tool"], ["image-resizer", "Custom pixel sizes"], ["compress-image", "Shrink for a form"], ["png-to-jpg", "Flatten the background"], ["image-to-pdf", "Photo into a PDF"]],
  ui: K.DZ("Add a front-facing photo", "image/*,.heic,.heif", false) +
    K.FORM(`<div class="fld"><label for="preset">Photo size</label><select id="preset">
    <option value="35x45" selected>Pakistan passport / CNIC — 35×45 mm</option>
    <option value="51x51">USA / India visa — 2×2 in (51×51 mm)</option>
    <option value="45x35">Saudi Arabia — 45×35 mm</option>
    <option value="50x70">Canada — 50×70 mm</option>
    <option value="33x48">China visa — 33×48 mm</option>
    <option value="40x50">Schengen visa — 40×50 mm</option>
    <option value="43x55">UAE visa — 43×55 mm (white background)</option>
    <option value="50x60">Turkey — 50×60 mm</option>
    <option value="custom">Custom millimetres</option>
  </div>
  <div class="fld" id="custommm" hidden><label for="mmw">Width (mm)</label><input type="number" id="mmw" min="20" max="80" value="35" inputmode="numeric"></div>
  <div class="fld" id="custommmh" hidden><label for="mmh">Height (mm)</label><input type="number" id="mmh" min="20" max="100" value="45" inputmode="numeric"></div>
  <div class="fld"><label for="ox">Face position across <output id="oxv" for="ox">50%</output></label><input type="range" id="ox" min="0" max="100" value="50"></div>
  <div class="fld"><label for="oy">Face position down <output id="oyv" for="oy">35%</output></label><input type="range" id="oy" min="0" max="100" value="35"></div>
  <div class="fld"><label for="sheet">Output</label><select id="sheet"><option value="0">Single photo only (for online forms)</option><option value="46" selected>4×6 inch print sheet</option><option value="57">5×7 inch print sheet</option><option value="a4">A4 sheet</option></select></div>
  <div class="fld"><label for="gap">Gap between photos (mm)</label><input type="number" id="gap" min="0" max="15" value="3" inputmode="numeric"></div>
  <div class="fld"><label for="col">Background behind padding</label><div class="row-item"><input type="color" id="bg" value="#ffffff" aria-label="Background colour"><span class="tiny muted">White for almost every form</span></div></div>
  <div class="fld"><label class="rng"><input type="checkbox" id="cut" checked style="width:auto"> Thin cut lines on the sheet</label></div>
  <div class="fld"><label class="rng"><input type="checkbox" id="guide" checked style="width:auto"> Show head-guide lines on the preview</label></div>
  <div class="fld"><label for="q">Print quality <output id="qv" for="q">92%</output></label><input type="range" id="q" min="60" max="100" value="92"></div>`, "Make Photo Sheet", "passport-photo.zip", "Passport settings")
};
