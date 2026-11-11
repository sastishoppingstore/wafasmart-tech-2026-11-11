module.exports = {
  "CATS": {
    "image": "Image tools",
    "pdf": "PDF tools",
    "calc": "Calculators",
    "text": "Text & utilities"
  },
  "LIBS": {
    "pdf-lib": {
      "url": "https://cdn.jsdelivr.net/npm/pdf-lib@1.17.1/dist/pdf-lib.min.js",
      "sri": "sha384-weMABwrltA6jWR8DDe9Jp5blk+tZQh7ugpCsF3JwSA53WZM9/14PjS5LAJNHNjAI",
      "global": "PDFLib",
      "size": 525099,
      "note": "1.17.1 (2021), verified 2026-10-28"
    },
    "jszip": {
      "url": "https://cdn.jsdelivr.net/npm/jszip@3.10.1/dist/jszip.min.js",
      "sri": "sha384-+mbV2IY1Zk/X1p/nWllGySJSUN8uMs+gUAN10Or95UBH0fpj6GfKgPmgC5EXieXG",
      "global": "JSZip",
      "size": 97630,
      "note": "3.10.1, verified 2026-10-28"
    },
    "pdfjs": {
      "url": "https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/build/pdf.min.js",
      "sri": "sha384-/1qUCSGwTur9vjf/z9lmu/eCUYbpOTgSjmpbMQZ1/CtX2v/WcAIKqRv+U1DUCG6e",
      "global": "pdfjsLib",
      "size": 320004,
      "note": "3.11.174 (Dec 2023, last non-ESM build), worker SRI below"
    },
    "pdfjs-worker": {
      "url": "https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/build/pdf.worker.min.js",
      "sri": "sha384-SnzOobpRMLXZ52iJvZm/C0fYw0OQemTXzTjIsdsfMcrCtCEe9qgzxTd3RSklO5x2",
      "size": 1087212
    },
    "heic2any": {
      "url": "https://cdn.jsdelivr.net/npm/heic2any@0.0.4/dist/heic2any.min.js",
      "sri": "sha384-OTofQ0MEeiSgh62havBcemCIK0gqj809wX6UA0uPISNMRnR6NZyCdGzX3SbLrgwL",
      "global": "heic2any",
      "size": 1351840,
      "note": "0.0.4 (self-contained worker-in-blob), SRI verified 2026-10-28"
    },
    "qr": {
      "url": "https://cdnjs.cloudflare.com/ajax/libs/qrcode-generator/1.4.4/qrcode.min.js",
      "sri": "sha384-mZT2gIty7ZDdOGkxfP6joZcYdMW1Jvj9dRlfpTmaJAKKXTqzygtB22k7FLe+KZC1",
      "global": "qrcode",
      "size": 20387,
      "note": "1.4.4, verified 2026-10-28; exposes window.qrcode (Kazuhiko Arase MIT)"
    }
  },
  "TOOLS": [
    {
      "slug": "image-to-pdf",
      "cat": "pdf",
      "name": "Image to PDF",
      "libs": [
        "pdf-lib"
      ],
      "kw": [
        "image to pdf",
        "jpg to pdf converter",
        "png to pdf",
        "photo to pdf a4",
        "convert picture to pdf online free",
        "cnic photo to pdf"
      ],
      "built": false
    },
    {
      "slug": "pdf-to-images",
      "cat": "pdf",
      "name": "PDF to Images",
      "libs": [
        "pdfjs",
        "pdfjs-worker",
        "jszip"
      ],
      "kw": [
        "pdf to jpg",
        "pdf to png",
        "convert pdf to images",
        "pdf page to image",
        "extract images from pdf"
      ],
      "built": false
    },
    {
      "slug": "merge-pdf",
      "cat": "pdf",
      "name": "Merge PDF",
      "built": false
    },
    {
      "slug": "split-pdf",
      "cat": "pdf",
      "name": "Split PDF",
      "built": false
    },
    {
      "slug": "delete-pdf-pages",
      "cat": "pdf",
      "name": "Delete PDF Pages",
      "built": false
    },
    {
      "slug": "extract-pdf-pages",
      "cat": "pdf",
      "name": "Extract PDF Pages",
      "built": false
    },
    {
      "slug": "image-resizer",
      "cat": "image",
      "name": "Image Resizer",
      "built": false
    },
    {
      "slug": "compress-image",
      "cat": "image",
      "name": "Compress Image to 50KB",
      "built": false
    },
    {
      "slug": "jpg-to-png",
      "cat": "image",
      "name": "JPG to PNG",
      "built": false
    },
    {
      "slug": "png-to-jpg",
      "cat": "image",
      "name": "PNG to JPG",
      "built": false
    },
    {
      "slug": "webp-to-jpg",
      "cat": "image",
      "name": "WebP to JPG",
      "built": false
    },
    {
      "slug": "heic-to-jpg",
      "cat": "image",
      "name": "HEIC to JPG",
      "built": false
    },
    {
      "slug": "crop-image",
      "cat": "image",
      "name": "Crop Image",
      "built": false
    },
    {
      "slug": "rotate-flip-image",
      "cat": "image",
      "name": "Rotate & Flip Image",
      "built": false
    },
    {
      "slug": "add-watermark",
      "cat": "image",
      "name": "Add Watermark",
      "built": false
    },
    {
      "slug": "image-to-base64",
      "cat": "image",
      "name": "Image to Base64",
      "built": false
    },
    {
      "slug": "passport-size-photo-maker",
      "cat": "image",
      "name": "Passport Size Photo Maker",
      "built": false
    },
    {
      "slug": "bmi-calculator",
      "cat": "calc",
      "name": "BMI Calculator",
      "built": false
    },
    {
      "slug": "calorie-calculator",
      "cat": "calc",
      "name": "Calorie (TDEE) Calculator",
      "built": false
    },
    {
      "slug": "water-intake-calculator",
      "cat": "calc",
      "name": "Water Intake Calculator",
      "built": false
    },
    {
      "slug": "ideal-weight-calculator",
      "cat": "calc",
      "name": "Ideal Weight Calculator",
      "built": false
    },
    {
      "slug": "age-calculator",
      "cat": "calc",
      "name": "Age Calculator - Gregorian, Hijri, Desi",
      "kw": ["age calculator by date of birth", "hijri age calculator", "desi age calculator"],
      "built": false
    },
    {
      "slug": "percentage-calculator",
      "cat": "calc",
      "name": "Percentage Calculator",
      "built": false
    },
    {
      "slug": "discount-calculator",
      "cat": "calc",
      "name": "Discount Calculator",
      "built": false
    },
    {
      "slug": "emi-loan-calculator",
      "cat": "calc",
      "name": "EMI Loan Calculator",
      "built": false
    },
    {
      "slug": "gpa-cgpa-calculator",
      "cat": "calc",
      "name": "GPA / CGPA Calculator",
      "built": false
    },
    {
      "slug": "zakat-calculator",
      "cat": "calc",
      "name": "Zakat Calculator - Gold/Silver Nisab",
      "kw": ["zakat calculator", "zakat calculator pakistan", "nisab calculator"],
      "built": false
    },
    {
      "slug": "uae-vat-calculator",
      "cat": "calc",
      "name": "UAE VAT Calculator",
      "built": false
    },
    {
      "slug": "pakistan-salary-tax-calculator",
      "cat": "calc",
      "name": "Pakistan Salary Tax Calculator",
      "built": false
    },
    {
      "slug": "word-counter",
      "cat": "text",
      "name": "Word Counter (Urdu ready)",
      "built": false
    },
    {
      "slug": "case-converter",
      "cat": "text",
      "name": "Case Converter",
      "built": false
    },
    {
      "slug": "remove-duplicate-lines",
      "cat": "text",
      "name": "Remove Duplicate Lines",
      "built": false
    },
    {
      "slug": "lorem-ipsum-generator",
      "cat": "text",
      "name": "Lorem Ipsum Generator",
      "built": false
    },
    {
      "slug": "qr-code-generator",
      "cat": "text",
      "name": "QR Code Generator",
      "built": false
    },
    {
      "slug": "password-generator",
      "cat": "text",
      "name": "Password Generator",
      "built": false
    },
    {
      "slug": "json-formatter",
      "cat": "text",
      "name": "JSON Formatter",
      "built": false
    },
    {
      "slug": "unit-converter",
      "cat": "text",
      "name": "Unit Converter",
      "built": false
    },
    {
      "slug": "image-size-adjuster",
      "cat": "image",
      "name": "Image Size Adjuster (KB + Pixels)",
      "libs": [
        "heic2any",
        "jszip"
      ],
      "kw": [
        "resize image to kb",
        "compress image to 100kb",
        "resize image to 800x800",
        "image size reducer",
        "custom image resizer"
      ],
      "built": false
    },
    {
      "slug": "resize-compress-image",
      "cat": "image",
      "name": "Resize & Compress Image",
      "libs": ["heic2any", "jszip"],
      "kw": ["resize and compress image", "resize image to kb", "compress image to 100kb", "resize image to 800x800"],
      "built": false
    },
    {
      "slug": "gym-calculator",
      "cat": "calc",
      "name": "Gym Calculator - BMI, BMR, TDEE, Macros, 1RM",
      "kw": ["gym calculator", "bmi calculator", "tdee calculator", "bmr calculator", "1 rep max calculator"],
      "built": false
    },
    {
      "slug": "khums-calculator",
      "cat": "calc",
      "name": "Khums Calculator - Shia",
      "kw": ["khums calculator", "khums calculator shia", "sahm e imam"],
      "built": false
    },
    {
      "slug": "building-material-calculator",
      "cat": "calc",
      "name": "Building Material Calculator - Bricks, Cement, Steel, Sand",
      "kw": [
        "building material calculator",
        "construction material calculator",
        "bricks calculator",
        "cement calculator",
        "steel calculator",
        "sand calculator",
        "building material calculator pakistan",
        "building material calculator lahore",
        "building material calculator karachi",
        "building material calculator dubai",
        "building material calculator sharjah"
      ],
      "built": false
    },
    {
      "slug": "internet-speed-test",
      "cat": "text",
      "name": "Internet Speed Test - Ping, Download & Upload",
      "kw": ["internet speed test", "speed test online", "wifi speed test", "broadband speed test"],
      "built": false
    }
  ],
"HUB": {
    "title": "Free Online Tools — Image, PDF, Calculators | Wafa Smart",
    "desc": "43 free browser tools: building material calculator, compress image to 50KB, image to PDF, QR codes, BMI, zakat, age and more. No uploads — files never leave your device.",
    "kw": "free online tools, image tools, pdf tools, online calculators, building material calculator, construction material calculator, compress image, image to pdf, qr code generator, bmi calculator, zakat calculator, age calculator, word counter, json formatter",
    "h1": "Free Online Tools — no uploads, no sign-up",
    "intro": "Every tool on this page runs entirely inside your browser. Your photos, PDFs and text never leave your device: there is no upload, no account, no watermark and nothing to install. The heavy lifting (PDF writing, HEIC decoding, ZIP packing) is pulled from a pinned CDN only at the moment you press a button, which keeps this site fast and keeps your files on your machine. Start with the search box, or browse Image tools, PDF tools, Calculators and Text & utilities below.",
    "ur": "Yahan har tool aapke browser me chalta hai — koi upload nahi, koi account nahi. Photo compress, PDF banana, QR code, BMI aur zakat jaise kaam seconds mein, bilkul free."
  },
  "BRAND": {
    "name": "WAFA Smart Tech",
    "url": "https://wafasmart.tech",
    "wa": "923246627054",
    "email": "info@wafasmart.tech",
    "og": "https://wafasmart.tech/assets/img/og-cover.jpg",
    "privacy": "Your files never leave your device — everything runs locally in your browser."
  }
};