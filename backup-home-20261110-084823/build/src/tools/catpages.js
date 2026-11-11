"use strict";
/* Category landing pages for /tools — one page per catalog category.
   Additive content only: these four pages list tools that already exist, they do not replace the hub.
   Every paragraph below is written for its own category so the duplicate-paragraph audit stays clean. */
module.exports = {
  pdf: {
    file: "pdf-tools",
    title: "PDF Tools Free Online — Merge, Split, Download | Wafa",
    desc: "Six free PDF tools that run in your browser: merge files, split or extract pages, delete pages, photos to PDF and PDF to images. No uploads.",
    h1: "PDF Tools — merge, split and rebuild documents in your browser",
    eyebrow: "PDF tools · free · no upload",
    sub: "Six document jobs people normally pay for or email to a converter: combine files, cut out the pages you need, drop the pages you should not send, turn phone photos into one A4 document and export a page as a picture. All six run on the page you are reading, on the phone in your pocket.",
    intro: [
      "A PDF is a container, and almost every everyday job on it is arithmetic on pages: which pages come first, which are thrown away, how many bytes the result should be. That arithmetic does not need a server, so none of the six tools below ever send your file anywhere. The page you are on loads a small, version-pinned PDF library from a content delivery network the first time you press a button, keeps it in memory, and closes the tab with nothing of yours left behind.",
      "Merge PDF is the one people reach for first: drop several files, drag the thumbnails to set the order, and the tool appends the pages of B and C behind A so the recipient opens a single attachment instead of four. Split PDF does the opposite — type a range like 3-7,12 and it writes a new document containing only those pages, which is how you pull the signed pages out of a fifty-page contract.",
      "Extract PDF pages and Delete PDF pages share the same page-picker: the tool renders one numbered tile per page, you tap the ones you want, and the second tool keeps them while the first throws them away. Image to PDF is the scanner replacement — it takes phone photos, corrects the EXIF rotation, fits them to A4 or Letter with a margin you control, and outputs a document that prints correctly at the shop.",
      "PDF to Images finishes the set: it renders each page to a canvas and hands you PNG or JPEG files, which is what you need when a portal asks for a \"scan of page 4\" but all you have is the PDF your bank emailed you last week."
    ],
    how: [
      "Open the tool you need from the list above — every card links to its own page with its own instructions.",
      "Drop files on the dashed box or tap it and pick from your phone; multiple files are accepted where the tool supports them.",
      "Where a page picker appears, tap the page numbers you want to keep or remove before pressing the action button.",
      "Check the size line under the Download button — most portals want under 1 MB or a 200 KB file, and every tool shows the result weight before you save it.",
      "Rename the output in the file-name box if the receiving site rejects spaces and long names."
    ],
    features: [
      "Merge unlimited PDFs into one file with drag-to-reorder page tiles",
      "Split, extract and delete by page ranges such as 1-3,7,10-12",
      "Photos from the phone camera become a correctly rotated A4 or Letter PDF",
      "Every page renders to PNG or JPEG at a resolution you choose",
      "Output size is measured and shown before you download, so rejected uploads are visible in advance",
      "Works on a phone with one hand; nothing to install and no account"
    ],
    tips: [
      "If a merged file is bigger than the portal allows, run it through image-to-pdf with a lower quality setting rather than trying to shrink it afterwards.",
      "Bank and CNIC statements usually need one page only — extract that page instead of screenshotting it, because screenshots lose the selectable text.",
      "Keep the file name short and without spaces (statement-1.pdf) when uploading to government portals; many of them reject names with brackets or Urdu characters.",
      "Page numbers on the picker are the PDF's own page order, not the printed page number in the footer — they differ in booklets.",
      "All six tools keep working when the network drops after the page has loaded, because the library is already in memory."
    ],
    faqs: [
      { q: "Do my PDFs get uploaded to a server?", a: "No. The file is read by your browser into memory, the pages are rewritten there, and the result is handed back as a download. There is no upload request of any kind on these pages." },
      { q: "Why does the first button press take a moment?", a: "The PDF engine is a few hundred kilobytes and is deliberately not loaded with the page, so it only downloads when you actually use a tool. After that first press the work is instant." },
      { q: "Can I edit the text inside a PDF?", a: "Not with these tools. They move, keep, remove and render whole pages; changing words inside a page needs a document editor, and the result of a re-save may look different from the original." },
      { q: "Will a password-protected PDF work?", a: "It will be rejected with a plain message. Remove the password in the program that created it, or print that PDF to a new PDF first." },
      { q: "Is there a file size or page limit?", a: "The practical limit is your phone's memory. Files that load in the browser merge fine; a several-hundred-page scanned book is better split in halves and merged afterwards." },
      { q: "Do the downloaded files carry a watermark?", a: "Never. There is no branding, no trial banner and no page-count cap on any of the six." }
    ],
    ur: "Yeh chattah PDF tools aapke browser me chalte hain — file kahin upload nahi hoti. Merge, split, pages nikalna ya hatana, photos se PDF banana aur PDF se image nikalna, sab muft aur bina watermark. Pehli baar button dabane par engine download hota hai, uske baad kaam foran hota hai.",
    kw: ["pdf", "merge", "split", "extract", "delete pages", "image to pdf", "pdf to image"]
  },
  image: {
    file: "image-tools",
    title: "Image Tools Free Online — Compress, Convert, Crop",
    desc: "Thirteen free browser image tools: compress to a target KB, convert formats, crop, resize, rotate, watermark, base64 and passport-size photos.",
    h1: "Image Tools — hit the size limit, keep the detail",
    eyebrow: "Image tools · free · no upload",
    sub: "Compression to an exact 20, 50, 100 or 200 KB target, format conversion between JPG, PNG, WebP and HEIC, cropping to passport or story ratios, watermarking, rotating, base64 export and a passport photo sheet — thirteen pages, all of them working on the pixels already sitting on your device.",
    intro: [
      "Almost every online form in Pakistan asks for a photo \"under 200 KB\", and the photo from a phone camera is five or six times that. Compress Image exists for exactly this: you type the number of kilobytes the portal asked for, and the tool walks the JPEG quality down until the encoded file lands at or just under that weight, then shows you the real byte count before you press download. Nothing is guessed, so the upload is not rejected.",
      "Format tools do the other half of the job. JPG to PNG and PNG to JPG switch between lossy and lossless depending on what the receiving site accepts — a logo with flat colour belongs in PNG, a photograph belongs in JPG. WebP to JPG covers the formats WhatsApp and Chrome save but government portals refuse, and HEIC to JPG handles the files an iPhone produces, which almost nothing else will accept.",
      "Crop Image, Image Resizer and Image Size Adjuster change the geometry: drag a box, or lock it to 1:1, 9:16, or a passport frame, and set the output in pixels or millimetres. Rotate & Flip fixes the photo that came out of the scanner sideways without resampling it twice. Add Watermark stamps your name or shop logo once in the corner or tiled diagonally across the whole picture before you send it to a buyer.",
      "Passport Size Photo Maker prints the boring requirement properly — 35×45 mm or 51×51 mm at 300 DPI, four or eight copies arranged on a 4R sheet so one print at the studio gives you a wallet full of photos. Image to Base64 finishes the set for developers who need the string that goes straight into HTML or a CSS file."
    ],
    how: [
      "Pick the job from the cards above; each card opens its own tool page.",
      "Tap the drop area and select from your gallery — every image tool here accepts several files at once and processes them one by one.",
      "Set the target (KB for compression, pixels or millimetres for resizing, a ratio for cropping) before pressing Download result.",
      "Read the result line: it states the new weight and dimensions, so you can see at once whether the file will pass the form.",
      "For a batch, keep the files in one folder and use the tiles to drop what you do not want before converting."
    ],
    features: [
      "Target-size compression that lands on 20, 50, 100 or 200 KB and proves the byte count",
      "JPG, PNG, WebP and HEIC in and out, including iPhone photos",
      "Crop with locked ratios: square, story 9:16, 4×6 print, passport frame",
      "Resize in pixels, percentages or real-world millimetres at a chosen DPI",
      "Watermark as a corner stamp or a repeating diagonal tile with opacity control",
      "Passport photo sheets laid out for 4R printing, and Base64 export for developers",
      "EXIF rotation is applied once, so a portrait photo stays portrait"
    ],
    tips: [
      "A document scan compressed to JPG at 100 KB looks terrible; use PNG or keep the JPG above 150 KB and reduce the pixel dimensions instead of the quality.",
      "For CNIC and form uploads, resize to about 800 pixels wide first and then compress — that combination usually clears 100 KB with the text still readable.",
      "PNG is the right answer for logos, screenshots and flat colour; it is the wrong answer for photographs, where it can be ten times larger for no gain.",
      "Do the crop and the resize before the watermark, so the text sits where you can see it in the final frame.",
      "If the portal gives a \"file type not supported\" error, the extension often lies — convert to JPG, which everything accepts.",
      "iPhone photos arrive as HEIC; convert them on this page rather than emailing them to yourself first, which re-compresses twice."
    ],
    faqs: [
      { q: "Is the compression lossy and will it ruin my photo?", a: "JPEG is always lossy, but the tool only reduces quality as far as needed to reach your target size. At 100 KB or above for an 800-pixel-wide photo the loss is invisible on a phone screen." },
      { q: "Can I get an exact file size, not just under it?", a: "The tool aims for at-or-under the target, which is what forms require. Getting a byte-exact size is not possible with a lossy encoder, and any site claiming it is rounding." },
      { q: "Do these tools strip EXIF data?", a: "Rotation is applied to the pixels and the remaining camera metadata is not copied into the output, so location and device details do not travel with the file." },
      { q: "Why is my PNG bigger than the JPG I started with?", a: "PNG stores pixels losslessly. A photograph gains nothing from it and roughly doubles in weight; convert photographs to JPG and keep PNG for graphics." },
      { q: "Can I process fifty photos at once?", a: "Select them all; the queue runs one at a time and each result downloads separately. Very large batches are faster if you close other tabs, because canvas memory is the limit." },
      { q: "Will these work on a 3G connection?", a: "Yes after the page has loaded. The only network request is the optional converter library, and once it is cached the tab works with the connection switched off." }
    ],
    ur: "Barah image tools jo aapke phone me maujood tasveer par kaam karte hain, upload kuch bhi nahi hota. Size 20 se 200 KB tak set karein, format badlein, crop aur resize karein, watermark lagayein ya passport ki photo sheet banayein. Natija download se pehle uska asli wazan aur nap dikhai deta hai.",
    kw: ["compress", "resize", "crop", "jpg", "png", "webp", "heic", "watermark", "base64", "passport"]
  },
  calc: {
    file: "calculator-tools",
    title: "Free Online Calculators — BMI, Zakat, EMI, Age | Wafa",
    desc: "Fifteen free browser calculators: building material, BMI, calories, water, ideal weight, age, percentage, discount, EMI, GPA, zakat, khums, VAT and salary tax.",
    h1: "Calculators — the numbers behind the answer shown",
    eyebrow: "Calculators · free · works offline",
    sub: "Fifteen pages that each show the formula they used, the ranges it is valid for, and the intermediate figures, so you can argue with the result instead of trusting it. Body and fitness maths, money maths for Pakistan, construction materials for Pakistan and the UAE, and the study numbers students need.",
    intro: [
      "A BMI box that prints one number and nothing else is not a calculator, it is a guess. Each of the body-composition pages here states the formula in use — Mifflin-St Jeor for calories, the standard 30 to 35 ml per kilogram rule for water, and Devine, Hamwi, Miller and Robinson side by side for ideal body weight — and prints the intermediate values so you can see why the answer moved. Where the medical range disagrees with the local one, the page says so instead of quietly picking the flattering number.",
      "The money pages are written for Pakistani rupees and Pakistani rules. Percentage Calculator handles the three questions people actually search for: what is x percent of y, x is what percent of y, and the change from x to y. Discount Calculator works out the price after a shop's \"40 percent off plus 10 percent on cards\" and, more usefully, tells you that two successive discounts are not the same as fifty percent off. EMI Loan Calculator applies the reducing-balance formula and prints the monthly instalment, total interest and the total you actually pay the bank.",
      "Religious obligations get their own pages because the conditions differ. Zakat Calculator asks for gold, silver, cash, receivables and liabilities, applies the nisab from the current gold price you enter, and reports the 2.5 percent on whatever survives the year. Khums Calculator separates annual savings from windfall income, which is the distinction most online forms get wrong. UAE VAT and Pakistan Salary Tax show the slab tables they applied, so a payslip can be checked line by line.",
      "GPA / CGPA Calculator takes credit hours per subject and prints both the semester and the cumulative figure on the 4.0 scale, and Age Calculator gives the exact years, months and days in Gregorian, Hijri Umm al-Qura and the Desi Bikrami calendar, including the day count until the next birthday."
    ],
    how: [
      "Open the calculator you need from the grid above — each one is a separate page with its own worked example.",
      "Fill every field with the number you actually have; the action button stays inert until the inputs are complete, and the page tells you which one is missing.",
      "Where a formula choice exists, read the small note under the result before reporting the figure anywhere.",
      "For money tools, enter amounts in rupees without commas — 125000, not 1,25,000.",
      "Use the reverse direction when you know the answer: the percentage and discount pages both solve for the missing side."
    ],
    features: [
      "Formula name, the substitution and the result, printed together on one screen",
      "Four clinical ideal-weight formulas compared instead of one arbitrary answer",
      "Zakat and Khums with nisab, gold value, liabilities and the one-year condition",
      "Reducing-balance EMI with total interest and total cost of the loan",
      "Age in Gregorian, Hijri (Umm al-Qura) and Desi Bikrami with a ±2 day moon adjustment",
      "Pakistan income-tax slabs and UAE VAT worked line by line",
      "Every page keeps the keyboard on your side of the screen — they are built phone-first"
    ],
    tips: [
      "Zakat is computed on assets you have held for a lunar year; if your gold is new, enter only the portion past the year and the tool will not over-charge you.",
      "BMI classifies muscle as mass, so an athlete with a low body fat percentage reads higher than is fair — pair it with the waist measurement, not instead of it.",
      "Successive discounts: 40 percent then 10 percent is 46 percent off, not 50. The discount page shows the effective percentage so you can compare two offers honestly.",
      "For EMI, compare the total-interest figure rather than the monthly instalment; a longer tenure always lowers the monthly number and raises the total.",
      "Enter your real GPA scale on the CGPA page. Pakistani universities convert on a 4.0 scale differently, and the transcript conversion table beats a generic formula.",
      "The Hijri age can differ by a day or two from a printed calendar; that is the Umm al-Qura convention, not an error."
    ],
    faqs: [
      { q: "Are these calculators medically or financially authoritative?", a: "No, and each page says so. They are arithmetic on the numbers you type using published formulas. A diagnosis, a fatwa or a tax filing needs the qualified person, not the tool." },
      { q: "Which BMI formula does the BMI page use?", a: "The ordinary weight-in-kilograms over height-in-metres-squared, with the WHO range table and a note on the lower Asian cut-off points for risk." },
      { q: "How is the zakat nisab decided?", a: "You enter the current gold price per tola; the tool converts 7.5 tola of gold or 52.5 tola of silver into a cash threshold and applies it to your net assets." },
      { q: "Does the salary tax tool include deductions?", a: "It applies the published slab to the annual gross you enter and shows the monthly withholding. Professional deductions and the employer's declarations change the real figure." },
      { q: "Can I use these without an internet connection?", a: "Yes, once the page is open. None of the calculators fetch anything to produce a result — the tables are already in the page." },
      { q: "Why do the results not appear until I press the button?", a: "So that a half-typed number never becomes a wrong answer on your screen. Press the button once the fields are filled, and the page will name any field still empty." }
    ],
    ur: "Chaudah calculator jo har jagah formula, uska hal aur darmiyani numbers sath dikhate hain taake aap natijay se itraad kar sakein. BMI, calories, pani, ideal weight, umar, percentage, discount, EMI, GPA, zakat, khums, UAE VAT aur Pakistan salary tax — sab rupee aur Pakistani rules ke sath, aur sab offline chalte hain.",
    kw: ["bmi", "calorie", "water", "ideal weight", "age", "percentage", "discount", "emi", "gpa", "cgpa", "zakat", "khums", "vat", "salary tax", "gym"]
  },
  text: {
    file: "text-tools",
    title: "Free Text & Utility Tools Online | Wafa Smart",
    desc: "Word counter, case converter, duplicate-line remover, lorem ipsum, QR codes, passwords, JSON formatter, unit converter and a speed test — in-browser.",
    h1: "Text & Utility Tools — clean the text, build the code",
    eyebrow: "Text & utilities · free · no upload",
    sub: "Nine pages for the small jobs that break a day: counting words against a form's limit, fixing the case of pasted headings, de-duplicating a list, generating placeholder text, making a QR code, drawing a strong password, reading a messy JSON, converting units and measuring the line you are actually on.",
    intro: [
      "Word Counter counts the way the admission form or the newspaper commission counts: words, characters with and without spaces, sentences, paragraphs, unique words and a reading time that assumes about two hundred words a minute. It is Urdu-aware, so a pasted paragraph in Nastaliq is counted on its own whitespace rules instead of coming out short, which is what happens with most counters.",
      "Case Converter fixes the text that arrives from a PDF or a WhatsApp forward in the wrong case — UPPERCASE, lower case, Sentence case, Title Case and camelCase, with a preview before you copy it back. Remove Duplicate Lines does the list job: it trims whitespace, ignores case if you ask, deletes the repeats, and can sort or reverse the survivors, which is how a merged contact list stops being embarrassing.",
      "Lorem Ipsum Generator produces placeholder copy by count — paragraphs, sentences or a single word — so a mockup is not accused of shipping with English text in it. QR Code Generator turns a URL, a plain message, a WhatsApp link or a WiFi network into a code you can download as PNG for print or as SVG for a screen, with the error-correction level shown so you know how much of the code you may cover with a logo.",
      "Password Generator draws from the system random source rather than from a clock-seeded Math.random, shows the entropy of what it produced, and can exclude the characters that people mistype when they read the password aloud. JSON Formatter prettifies, minifies and validates with a line number in the error, and Unit Converter carries the whole set of length, weight, area, volume and temperature relationships in the page itself. Internet Speed Test measures download, upload, ping and jitter on a colour meter and reports the IP, provider and city the connection presents — the diagnostic you reach for before blaming the website."
    ],
    how: [
      "Open the tool from the cards above; each one works on the text you paste or type into its own box.",
      "For counting and cleaning tools, paste the whole block at once — the result updates against the exact characters you submitted.",
      "Use Copy result rather than selecting by hand on a phone; a long base64 or JSON string is easy to cut short by a single character.",
      "For the QR code, keep the payload short: a URL under 40 characters prints at a size a cheap camera can still read.",
      "If a result looks wrong, check whether the tool is counting a trailing space or a blank line — that is the usual cause."
    ],
    features: [
      "Word, character, sentence, paragraph and unique-word counts with reading time",
      "Urdu and Arabic-script counting that does not under-report",
      "Six case modes with a live preview before you copy",
      "Duplicate removal that can trim, ignore case, sort and renumber in one pass",
      "QR output as PNG for print and SVG for screens, including WiFi and WhatsApp payloads",
      "Passwords from the browser cryptographic random source, with entropy stated",
      "JSON validation that points at the offending line, and a minifier for shipping files",
      "A speed test that shows the meter, the ping, the jitter and the connection identity"
    ],
    tips: [
      "Essay limits usually mean words excluding the reference list; the counter separates the two so you can see whether you are genuinely over.",
      "When pasting a converted case back into Word, use Paste as text — the tool's own formatting would otherwise override the document style.",
      "For a printed QR flyer, download the SVG and send that to the printer; a PNG at 300 pixels will pixelate on a large banner.",
      "Keep the generated password in the browser's own password manager instead of copying it into a note app that syncs to a company account.",
      "Run the speed test with the Wi-Fi at arm's length once and next to the router once; the difference tells you whether the problem is the wall or the line."
    ],
    faqs: [
      { q: "Do these tools send my text anywhere?", a: "No. Everything runs in the page, and there is no request made with your text — you can watch the network tab and see nothing leave the device." },
      { q: "Why does the word count differ from Microsoft Word?", a: "Word counts some punctuation and footnote markers as tokens and ignores non-breaking spaces differently. The tool splits on whitespace and reports the rule it used, so the difference is explainable rather than mysterious." },
      { q: "Is the QR code safe to print on a poster?", a: "Yes, download the SVG so it scales without losing sharpness, and check the scan from a second phone before printing a large run." },
      { q: "Can the JSON formatter handle a large file?", a: "It handles anything your browser can hold in memory. For multi-megabyte files, expect a second of lag while it parses; nothing is uploaded either way." },
      { q: "How is the generated password different from other generators?", a: "It uses window.crypto, which is seeded by the operating system, and it states the entropy so you can judge the strength instead of trusting a coloured bar." },
      { q: "Does the speed test measure my Wi-Fi or my internet?", a: "The internet path to the measurement server, including the Wi-Fi hop. Run it near the router to separate the two." }
    ],
    ur: "Nau utilities jo aapke text aur code ka kaam rakhti hain: word aur character count Urdu samajhte hue, case theek karna, double lines hatana, lorem ipsum, QR code PNG aur SVG me, crypto-grade password, JSON check karna, units convert karna aur internet speed test. Aapka likha hua kuch bhi device se bahar nahi jata.",
    kw: ["word counter", "case", "duplicate", "lorem", "qr", "password", "json", "unit", "speed test"]
  }
};
