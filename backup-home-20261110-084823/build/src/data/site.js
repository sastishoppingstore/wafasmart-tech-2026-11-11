// ============================================================
// WAFA SMART TECH — central content model (v4 · 21 services + recovery)
// Fixed rate card: website 14,000 · website + management 20,000
// AI / voice 23,500 · Android / Windows 30,000 · iOS 35,000
// 3 demo designs before any project starts — client picks one
// Emergency recovery: hacked website/PHP 7,000 · WhatsApp 5,000
// ============================================================

const PRICE = 14000;
const FIXED = "Fixed rates from PKR 14,000";
const TIERS = {
  website: 14000,
  management: 20000,
  ai: 23500,
  android: 30000,
  ios: 35000,
  windows: 30000,
  design: 14000
};
const SERVICE_PRICES = {
  "ai-agents": TIERS.ai,
  "voice-agents": TIERS.ai,
  "ai-receptionist": TIERS.ai,
  "website-design": TIERS.website,
  "travel-agency": TIERS.website,
  "hotel-website": TIERS.website,
  "school-website": TIERS.website,
  "hospital-website": TIERS.website,
  "property-portal": TIERS.website,
  "management-system": TIERS.management,
  "job-portal": TIERS.website,
  "website-management": TIERS.management,
  "android-app": TIERS.android,
  "ios-app": TIERS.ios,
  "windows-app": TIERS.windows,
  "whatsapp-bot": TIERS.ai,
  "design-studio": TIERS.design,
  "food-restaurant": TIERS.website,
  "ecommerce-store": TIERS.website,
  "lms-platform": TIERS.website,
  "donation-platform": TIERS.website,
  "salon-booking": TIERS.website,
  "gym-fitness": TIERS.website,
  "car-dealer": TIERS.website,
  "event-wedding": TIERS.website,
  "courier-logistics": TIERS.website,
  "pharmacy-store": TIERS.website,
  "mosque-website": TIERS.website,
  "import-export": TIERS.website,
  "pos-billing": TIERS.management,
  "law-firm": TIERS.website,
  "banquet-hall": TIERS.website
};
const DEMOS = [
  { n: "Demo A — Classic Blue", style: "Trust-first corporate look", d: "Clean sections, royal-blue palette, big contact bar — perfect for clinics, schools and firms.", feats: ["Sticky glass nav", "3D service cards", "WhatsApp order strip", "Google-map block"] },
  { n: "Demo B — Golden Luxe", style: "Premium dark + gold", d: "Rich navy canvas, gold accents, cinematic hero motion — favourite of hotels, builders and brand sites.", feats: ["Gold shimmer CTAs", "Cinematic 3D hero", "Gallery + offer rails", "Booking widget ready"] },
  { n: "Demo C — Modern Minimal", style: "Airy, motion-first", d: "Bold type, lots of space, smooth micro-animations — startups, portals and e-commerce pick this one.", feats: ["Ultra-fast layout", "Scroll animations", "Filter + search UI", "Admin-first design"] }
];

const brand = {
  name: "Wafa Smart Tech",
  nameUr: "وفا سمارٹ ٹیک",
  domain: "wafasmart.tech",
  url: "https://wafasmart.tech",
  tagline: "AWS & Google certified · IT Ministry, Govt. of Pakistan · ZATCA-registered KSA · fixed rates from PKR 14,000.",
  taglineUr: "ای ڈبلیو ایس اور گوگل سرٹیفائیڈ · آئی ٹی وزارت، حکومتِ پاکستان · سعودی عرب (زاتکا) میں رجسٹرڈ · مقررہ ریٹ ۱۴,۰۰۰ سے۔",
  founded: "2023",
  city: "Lahore",
  desc: "Wafa Smart Tech, Lahore — AWS & Google certified team · Engr. Jamshaid, Software Engineer (IT Ministry, Govt. of Pakistan) · Saudi Arabia ZATCA-registered and KSA govt-affiliated ZATCA-compliant software company. Clear fixed rates: websites PKR 14,000, website + management 20,000, AI agents & voice 23,500, Android/Windows apps 30,000, iOS 35,000. FREE domain with site services, 3 demo designs before we build. Emergency recovery: hacked website/PHP PKR 7,000, hacked WhatsApp PKR 5,000.",
  descUr: "وفا سمارٹ ٹیک لاہور — ای ڈبلیو ایس اور گوگل سرٹیفائیڈ ٹیم · انجینئر جمشید، سافٹ ویئر انجینئر (آئی ٹی وزارت، حکومتِ پاکستان) · سعودی عرب میں زاتکا رجسٹرڈ اور کے ایس اے حکومتی الحاق والی زاتکا کمپلائنٹ سافٹ ویئر کمپنی۔ صاف مقررہ ریٹ: ویب سائٹ ۱۴,۰۰۰، ویب سائٹ + مینجمنٹ ۲۰,۰۰۰، اے آئی/وائس ۲۳,۵۰۰، اینڈرائیڈ/ونڈوز ۳۰,۰۰۰، آئی او ایس ۳۵,۰۰۰۔ سائٹ سروسز پر ڈومین فری، تعمیر سے پہلے تین ڈیمو ڈیزائن۔ ایمرجنسی ریکوری: ہیک ویب سائٹ/پی ایچ پی ۷,۰۰۰، ہیک واٹس ایپ ۵,۰۰۰۔"
};

const contact = {
  whatsapp: "923246627054",
  whatsappDisplay: "0324 6627054",
  phoneRaw: "+92 324 6627054",
  email: "info@wafasmart.tech",
  address: "Lahore-Sharqpur Road, near 20 km, Lahore, Punjab, Pakistan",
  addressUr: "لاہور شہر پور روڈ، تقریباً 20 کلومیٹر، لاہور، پنجاب، پاکستان",
  hours: "Mon – Sat · 10:00 AM – 8:00 PM (PKT)",
  hoursUr: "پیر – ہفتہ · صبح ۱۰ تا شام ۸ (پاکستانی وقت)",
  mapQuery: "Lahore-Sharqpur Road near 20 km Lahore Pakistan"
};

const hero = {
  eyebrow: "Lahore · AWS & Google Certified",
  titleA: "Websites, AI agents & apps. ",
  titleGrad: "Fixed rates. No\u00A0300K quotes.",
  titleB: "",
  titleUr: "ویب سائٹس، اے آئی اور ایپس — مقررہ ریٹ، کوئی ۳۰۰ ہزار کا کوٹ نہیں۔",
  sub: "Custom websites, AI agents and apps for serious businesses. Fixed prices from PKR 14,000, 3 free demo designs, a free domain and 100% source-code ownership. 160+ projects delivered in Lahore & Saudi Arabia. Hacked? Recovery from PKR 5,000.",
  subUr: "کاروبار کے لیے جدید ویب سائٹس، اے آئی ایجنٹس اور ایپس — مقررہ قیمت ۱۴,۰۰۰ سے، ۳ مفت ڈیمو، ڈومین فری اور مکمل سورس کوڈ آپ کی ملکیت۔ لاہور اور سعودی عرب میں ۱۶۰+ پروجیکٹس مکمل۔ ہیک؟ ریکوری ۵,۰۰۰ سے۔",
  ctaMain: "Get Free Demo",
  ctaWa: "WhatsApp: 0324 6627054",
  ur: "مقررہ ریٹ: ویب سائٹ ۱۴,۰۰۰ · اے آئی ۲۳,۵۰۰ · اینڈرائیڈ ۳۰,۰۰۰ · آئی او ایس ۳۵,۰۰۰۔"
};

const stats = [
  { n: 160, suffix: "+", label: "Projects delivered", labelUr: "مکمل شدہ پروجیکٹس" },
  { n: 41, suffix: "", label: "AI agents & bots live", labelUr: "لائیو اے آئی ایجنٹس" },
  { n: 96, suffix: "%", label: "Clients who reorder", labelUr: "دوبارہ آرڈر کرنے والے" },
  { n: 5, suffix: " tiers", label: "Fixed rates from PKR 14,000", labelUr: "مقررہ ریٹ ۱۴ ہزار سے" }
];

const trust = ["AWS Certified", "Google Certified", "IT Ministry, Govt. of Pakistan", "Registered in Saudi Arabia (ZATCA)", "ZATCA-Compliant Software", "From PKR 14,000 · Fixed rates", "Hacked Website / PHP Recovery", "Hacked WhatsApp Recovery", "Domain FREE", "3 Demo Designs — pick your favourite", "AI Agents & Voice AI", "AI Receptionist", "Travel / Hotel / School / Hospital Sites", "Property & E-commerce Portals", "WhatsApp Bots", "Food Ordering Sites", "LMS Course Platforms", "Donation & Zakat", "Management Systems (ERP)", "CV · Logo · Brand Design", "Android / iOS / Windows Apps", "SEO + WhatsApp Orders"];

/* Trust / credential badges — replace labels with exact certificate, registration
   or licence wording (and keep supporting documents). Shown in the hero + footer. */
const trustBadges = [
  { icon: "shield", label: "AWS Certified", sub: "Amazon Web Services", labelUr: "ای ڈبلیو ایس سرٹیفائیڈ", subUr: "ایمازون ویب سروسز" },
  { icon: "spark", label: "Google Certified", sub: "Google Cloud & Workspace", labelUr: "گوگل سرٹیفائیڈ", subUr: "گوگل کلاؤڈ اور ورک اسپیس" },
  { icon: "brief", label: "Engr. Jamshaid", sub: "Software Engineer · IT Ministry, Govt. of Pakistan", labelUr: "انجینئر جمشید", subUr: "سافٹ ویئر انجینئر · آئی ٹی وزارت، حکومتِ پاکستان" },
  { icon: "layers", label: "Saudi Arabia Registered", sub: "ZATCA · KSA", labelUr: "سعودی عرب میں رجسٹرڈ", subUr: "زاتکا · کے ایس اے" },
  { icon: "check", label: "ZATCA-Compliant Software", sub: "KSA Govt-Affiliated", labelUr: "زاتکا کمپلائنٹ سافٹ ویئر", subUr: "کے ایس اے حکومتی الحاق" }
];

const whyUs = [
  { icon: "spark", t: "3 free demo designs", u: "تین مفت ڈیمو ڈیزائن", d: "Classic Blue, Golden Luxe or Modern Minimal — three complete demos of YOUR project. Pick one, we finish it. No design guesswork." },
  { icon: "shield", t: "Fixed rate card, no surprises", u: "مقررہ ریٹ — کوئی چھپا چارج نہیں", d: "Website PKR 14,000 · website + management 20,000 · AI/voice 23,500 · apps 30,000/35,000. Written quote, domain free on site services, no shock invoices." },
  { icon: "brain", t: "Real AI, not hype", u: "اصلی اے آئی، ڈھکوسلا نہیں", d: "GPT-class LLMs, speech-to-text & telephony wired into WhatsApp, calls, admin panels and your database — trained on your business." },
  { icon: "phone", t: "WhatsApp-first support", u: "واٹس ایپ پر فوری رابطہ", d: "Talk to the actual developers on 0324 6627054. Urdu, English, Roman Urdu — your choice. Replies in minutes." },
  { icon: "chart", t: "SEO & speed baked in", u: "ایس او اور رفتار شامل", d: "Static-fast pages, schema markup, sitemap, local Lahore keywords — you get found, not just built." },
  { icon: "infinity", t: "You own everything", u: "ہر چیز کی ملکیت آپ کی", d: "Source code, domain, hosting, admin panel — handed over. No lock-in, ever." }
];

const process = [
  { icon: "wa", t: "Free consultation", u: "مفت مشاورت", d: "WhatsApp 0324 6627054. Share your idea — scope, questions and advice are free.", dUr: "واٹس ایپ ۰۳۲۴ ۶۶۲۷۰۵۴۔ اپنا آئیڈیا بتائیں — اسکوپ، سوالات اور مشورہ مفت۔" },
  { icon: "brief", t: "Fixed rate locked", u: "مقررہ ریٹ لاک", d: "Written quote, delivery date and 50% advance. No hidden charges.", dUr: "تحریری کوٹ، ڈیلیوری تاریخ اور ۵۰٪ ایڈوانس۔ کوئی چھپا چارج نہیں۔" },
  { icon: "pen", t: "3 free demo designs", u: "۳ مفت ڈیمو ڈیزائن", d: "Blue, Gold or Minimal — pick the one you love.", dUr: "بلیو، گولڈ یا منیمل — جو پسند آئے وہ چنیں۔" },
  { icon: "code", t: "Build on your design", u: "آپ کے ڈیزائن پر تعمیر", d: "Your content, logo, mobile QA and WhatsApp updates.", dUr: "آپ کا مواد، لوگو، موبائل QA اور واٹس ایپ اپڈیٹس۔" },
  { icon: "bolt", t: "Launch, SEO & handover", u: "لانچ، ایس او اور حوالگی", d: "SSL, SEO, sitemap, admin access and source code — all yours.", dUr: "SSL، ایس او، سائٹ میپ، ایڈمن رسائی اور سورس کوڈ — سب آپ کا۔" },
  { icon: "chart", t: "Monthly care (optional)", u: "ماہانہ دیکھ بھال (اختیاری)", d: "PKR 5,000/month — updates, backups and reports.", dUr: "۵,۰۰۰ روپے ماہانہ — اپڈیٹس، بیک اپ اور رپورٹس۔" }
];

/* ================= SERVICES (21) — fixed rate card ================= */
const services = [
  {
    slug: "ai-agents", icon: "bot",
    name: "AI Agents & Automation", nameUr: "اے آئی ایجنٹس اور آٹومیشن",
    img: "service-ai-agents",
    page: "Custom AI agents that research, reply, qualify leads and run daily operations on autopilot — wired into WhatsApp, email, sheets and your database. Your price: PKR 14,000 fixed, 3 demo dashboards first.",
    pageUr: "حسبِ ضرورت اے آئی ایجنٹ جو ریسرچ کریں، جواب دیں، لیڈز چھانٹیں اور روزمرہ کام چلائیں — واٹس ایپ، ای میل اور ڈیٹابیس سے جڑے ہوئے۔ ایک قیمت چودہ ہزار، پہلے تین ڈیمو۔",
    short: "24/7 agents on WhatsApp, email & CRM", shortUr: "۲۴/۷ کام کرنے والے اے آئی ایجنٹ",
    days: "7–12", features: ["Lead qualification + auto follow-ups", "Multi-tool: browse, calculate, tickets", "Human handover with transcript", "English, Urdu & Roman Urdu", "Weekly report on WhatsApp"],
    kw: ["ai agent pakistan", "ai automation lahore", "whatsapp ai bot"]
  },
  {
    slug: "voice-agents", icon: "wave",
    name: "Voice AI Agents", nameUr: "وائس اے آئی ایجنٹس",
    img: "service-voice",
    page: "AI voices that call and answer like humans — booking, reminders, surveys and payment follow-ups over phone lines and WhatsApp voice notes. Urdu + English, natural accents, PKR 14,000 fixed.",
    pageUr: "ایسی اے آئی آواز جو انسان کی طرح بات کرے — بکنگ، ریمائنڈر، سروے اور وصولی، اردو اور انگریزی دونوں۔ ایک قیمت چودہ ہزار۔",
    short: "Human-like calling & voice bots", shortUr: "انسان جیسی بات کرنے والی آواز",
    days: "7–10", features: ["Inbound answering + outbound campaigns", "Natural Urdu & English voices", "Call recording + AI summary", "CRM write-back", "Twilio / WhatsApp Cloud API"],
    kw: ["voice ai agent pakistan", "ai calling bot", "ai telecaller lahore"]
  },
  {
    slug: "ai-receptionist", icon: "desk",
    name: "AI Receptionist", nameUr: "اے آئی ریسیپشنسٹ",
    img: "service-receptionist",
    page: "Clinic, salon, firm or shop: every call and WhatsApp answered in seconds, 24/7 — books appointments, shares timings & prices, takes messages. PKR 14,000 — front-desk replacement that never sleeps.",
    pageUr: "کلینک، سیلون یا دکان کا ہر فون اور واٹس ایپ سیکنڈوں میں جواب، بیس چوبیس گھنٹے — اپائنٹمنٹ، قیمت، اوقات۔ ایک قیمت چودہ ہزار۔",
    short: "24/7 phone + WhatsApp front desk", shortUr: "۲۴/۷ فرنٹ ڈیسک",
    days: "5–8", features: ["Missed-call & WhatsApp auto-reply", "Google Calendar booking + reminders", "FAQ: prices, timings, directions", "Daily owner summary", "Urdu / English / Roman Urdu"],
    kw: ["ai receptionist lahore", "clinic appointment bot", "missed call auto reply"]
  },
  {
    slug: "website-design", icon: "code",
    name: "Business Website (3D · SEO)", nameUr: "بزنس ویب سائٹ (تھری ڈی · ایس او)",
    img: "service-website",
    page: "A stunning, lightning-fast business or landing site with 3D animated cards, WhatsApp ordering, full on-page SEO — plus a FREE domain for one year. Fixed price: PKR 14,000.",
    pageUr: "تیز اور خوبصورت بزنس یا لینڈنگ ویب سائٹ — تھری ڈی کارڈز، واٹس ایپ آرڈر، مکمل ایس او اور ایک سال ڈومین فری۔ ایک قیمت چودہ ہزار۔",
    short: "Company sites & landing pages, SEO-ready", shortUr: "کمپنی ویب سائٹس اور لینڈنگ پیجز",
    days: "4–10", features: ["3 demo designs — pick your favourite", "3D animated sections like this site", "Full on-page + local SEO", "WhatsApp / call buttons on every screen", "FREE domain 1 year + SSL setup help"],
    kw: ["website design lahore", "small business website pakistan price", "seo website pakistan"]
  },
  {
    slug: "travel-agency", icon: "plane",
    name: "Travel Agency Website & Booking", nameUr: "ٹریول ایجنسی ویب سائٹ اور بکنگ",
    img: "service-travel",
    page: "Umrah, honeymoon & tour packages with live itinerary pages, enquiry-to-WhatsApp booking, agent login and PDF quotations. Sell trips while you sleep — PKR 14,000 with free domain.",
    pageUr: "عمرہ، ہنی مون اور ٹور پیکجز — لائیو آئٹنرری pages، واٹس ایپ بکنگ، ایجنٹ لاگ ان، پی ڈی ایف کوٹیشن۔ ایک قیمت چودہ ہزار، ڈومین فری۔",
    short: "Tour packages, itineraries & WhatsApp booking", shortUr: "ٹور پیکجز، آئٹنرری اور بکنگ",
    days: "5–9", features: ["Package pages with dates & pricing", "Enquiry → WhatsApp booking flow", "Agent/reseller login with commissions", "PDF quotation generator", "FREE domain + Google Business setup"],
    kw: ["travel agency website pakistan", "umrah website lahore", "tour booking site"]
  },
  {
    slug: "hotel-website", icon: "hotel",
    name: "Hotel & Resort Website (Booking)", nameUr: "ہوٹل اور ریزارٹ ویب سائٹ",
    img: "service-hotel",
    page: "Direct-booking hotel site — room gallery, seasonal rates, availability calendar, WhatsApp reservations and a offers engine your manager can run. PKR 14,000 fixed, free domain.",
    pageUr: "ہوٹل کی براہِ راست بکنگ ویب سائٹ — روم گیلری، موسمی ریٹ، دستیابی کیلنڈر، واٹس ایپ ریزرویشن اور آفرز ایڈمن۔ چودہ ہزار مقررہ، ڈومین فری۔",
    short: "Rooms, rates & direct WhatsApp reservations", shortUr: "کمرے، ریٹ اور براہِ راست بکنگ",
    days: "5–9", features: ["Room cards with price + gallery", "Booking calendar → WhatsApp confirm", "Offers/deal rail with expiry", "Owner dashboard for rates", "3 demo looks: Blue / Gold / Minimal"],
    kw: ["hotel website development pakistan", "resort booking site", "guest house website"]
  },
  {
    slug: "school-website", icon: "cap",
    name: "School Website & Admission Portal", nameUr: "سکول ویب سائٹ اور ایڈمیشن پورٹل",
    img: "service-school",
    page: "Admissions online! Prospective-parent portal: forms with document upload, fee structure pages, results/news, and an admin to review applications. PKR 14,000 with free domain.",
    pageUr: "داخلے آن لائن! والدین کے لیے فارم اور دستاویزات اپ لوڈ، فی سٹرکچر، نتائج اور خبریں، ایڈمن سے درخواستوں کی جانچ۔ ایک قیمت چودہ ہزار، ڈومین فری۔",
    short: "Admissions, notices, results & parent portal", shortUr: "داخلے، نوٹس، نتائج اور پورٹل",
    days: "5–10", features: ["Admission form + document upload", "Fee structure & notice board", "Results / event publishing (admin)", "SMS/WhatsApp to applicants", "Student & staff photo galleries"],
    kw: ["school website pakistan", "admission portal development", "school management website"]
  },
  {
    slug: "hospital-website", icon: "cross",
    name: "Hospital & Clinic Website + OPD", nameUr: "ہسپتال اور کلینک ویب سائٹ + او پی ڈی",
    img: "service-hospital",
    page: "Doctor profiles with specialities, online OPD token & appointment booking, departments, emergency strip and health-package pages — trust-grade design. PKR 14,000, free domain.",
    pageUr: "ڈاکٹرز کی پروفائل، آن لائن او پی ڈی ٹوکن اور اپائنٹمنٹ، محکمے، ایمرجنسی بینر اور ہیلتھ پیکجز — بھروسے والا ڈیزائن۔ چودہ ہزار، ڈومین فری۔",
    short: "Doctors, OPD tokens & appointment booking", shortUr: "ڈاکٹرز، ٹوکن اور اپائنٹمنٹ",
    days: "5–10", features: ["Doctor & department pages", "OPD token booking → WhatsApp + SMS", "Emergency & blood-bank info block", "Health package offers page", "Admin for schedules & news"],
    kw: ["hospital website pakistan", "clinic appointment website", "doctor booking site"]
  },
  {
    slug: "property-portal", icon: "home",
    name: "Property Dealer Portal", nameUr: "پراپرٹی ڈیلر پورٹل",
    img: "service-property",
    page: "Buy/resort/rent listings portal for dealers: plots & houses with map pins, filters, shortlist, verified dealer badges, featured-ad revenue and WhatsApp site-visits. PKR 14,000 fixed.",
    pageUr: "ڈیلرز کے لیے خرید و فروخت اور کرایے کی لسٹنگ پورٹل: نقشے کے ساتھ پلاٹ اور گھر، فلٹر، شارٹ لسٹ، تصدیق شدہ بیجز، فیچرڈ اشتہار کی آمدنی، واٹس ایپ وزٹ۔ چودہ ہزار۔",
    short: "Listings, maps, filters & featured ads", shortUr: "لسٹنگ، نقشہ، فلٹر اور اشتہارات",
    days: "7–12", features: ["Plot/house listings with photos & maps", "Search filters: price, area, type", "Shortlist + WhatsApp to dealer", "Featured-listing revenue for you", "Dealer verification & admin panel"],
    kw: ["property dealer website pakistan", "real estate portal lahore", "plots website development"]
  },
  {
    slug: "management-system", icon: "layers",
    name: "Management System (ERP · Web/App)", nameUr: "مینجمنٹ سسٹم (ای آر پی · ویب/ایپ)",
    img: "service-management",
    page: "School, hospital, shop, fleet or HR management system — roles, real-time dashboards, invoicing, inventory, reports on WhatsApp. Web + offline-tolerant. PKR 14,000 for the core system.",
    pageUr: "سکول، ہسپتال، دکان، فلیٹ یا ایچ آر مینجمنٹ سسٹم — کردار، لائیو ڈیش بورڈ، بلنگ، اسٹاک، رپورٹس واٹس ایپ پر۔ بنیادی سسٹم چودہ ہزار۔",
    short: "Invoicing, inventory, users & live reports", shortUr: "بلنگ، اسٹاک، صارفین اور رپورٹس",
    days: "8–14", features: ["Role-based admin (owner/staff/accountant)", "Invoices + SMS/WhatsApp receipts", "Inventory / students / patients modules", "Daily summary report on WhatsApp", "Works on phone + desktop, cloud backup"],
    kw: ["management system pakistan", "school erp software", "billing inventory system"]
  },
  {
    slug: "job-portal", icon: "brief",
    name: "Job & Earning Portals", nameUr: "جاب اور کمائی کے پورٹلز",
    img: "service-job-portal",
    page: "Platforms where people work from home and earn: job boards, freelance marketplaces, task & reward portals with verification, wallets and referral engine — you run the admin. PKR 14,000 for the MVP portal.",
    pageUr: "ایسے پورٹلز جہاں لوگ گھر بیٹھے کماتے ہیں: جاب بورڈ، فریلانسی، ٹاسک و انعام، تصدیق، والٹ اور ریفرل — ایڈمن آپ کا۔ ایم وی پی پورٹل چودہ ہزار۔",
    short: "Work-from-home earning platforms", shortUr: "گھر بیٹھے کمائی کے پلیٹ فارم",
    days: "10–20", features: ["Employer & seeker accounts + KYC", "Featured-job / promoted-gig revenue", "Wallet, ledger & payout queue", "Referral & task-reward engine", "Super-admin: approve, ban, analytics"],
    kw: ["job portal development pakistan", "work from home portal", "earning app pakistan"]
  },
  {
    slug: "website-management", icon: "gear",
    name: "Website Management System", nameUr: "ویب سائٹ مینجمنٹ سسٹم",
    img: "service-cms",
    page: "Your own admin panel: change text, images, prices, publish blogs/offers and see inquiries — no developer needed, Urdu-friendly UI. Add it with any site for PKR 14,000 (care-plan bundle).",
    pageUr: "اپنی ویب سائٹ کا ذاتی ایڈمن پینل: ٹیکسٹ، تصاویر، قیمتیں، بلاگ اور آفرز، انکوائری — ڈویلپر کی ضرورت نہیں، اردو فرینڈلی۔ سسٹم چودہ ہزار میں۔",
    short: "Admin panel + care plan for your site", shortUr: "ایڈمن پینل اور دیکھ بھال پلان",
    days: "3–7", features: ["Visual edit of any page text/media", "Blog / offers / products publishing", "Inquiry inbox with CSV export", "Roles: owner, editor, staff", "Auto-backup to Drive/GitHub"],
    kw: ["website management system pakistan", "custom cms lahore", "website maintenance plan"]
  },
  {
    slug: "android-app", icon: "droid",
    name: "Android App Development", nameUr: "اینڈرائیڈ ایپ ڈویلپمنٹ",
    img: "service-android",
    page: "Native-feel Android apps — delivery, booking, reseller, attendance, e-commerce — Play Store published with push notifications and matching admin panel. Launch tier at PKR 14,000; extended scope quoted from the same rate card.",
    pageUr: "اصلی انداز کی اینڈرائیڈ ایپس — ڈیلیوری، بکنگ، ریسیلنگ، حاضری، ای کامرس — پلے اسٹور، پش نوٹیفکیشن اور ایڈمن پینل۔ لانچ ٹئر چودہ ہزار، بڑے سکوپ کی قیمت اسی ریٹ کارڈ سے۔",
    short: "Play-Store apps with push + admin", shortUr: "پلے اسٹور ایپ، پش اور ایڈمن",
    days: "10–21", features: ["Kotlin/Flutter, smooth 60fps UI", "Firebase push, auth & cloud DB", "Play Store submission handled", "Admin panel with real-time data", "Crash & analytics monitoring"],
    kw: ["android app development lahore", "app banao pakistan", "play store app price"]
  },
  {
    slug: "ios-app", icon: "apple",
    name: "iOS App Development", nameUr: "آئی او ایس ایپ ڈویلپمنٹ",
    img: "service-ios",
    page: "App Store-ready iOS apps with Apple-grade polish, TestFlight beta and full submission support — shared backend with your Android build & admin panel. Core launch tier PKR 14,000.",
    pageUr: "ایپ اسٹور کے لیے تیار آئی او ایس ایپس، ایپل کے معیار کی پالش، ٹیسٹ فلائٹ اور مکمل جمع کروائی — اینڈرائیڈ سے مشترکہ بیک اینڈ۔ بنیادی لانچ چودہ ہزار۔",
    short: "App Store apps with Apple-grade polish", shortUr: "ایپ اسٹور کے لیے پالش شدہ ایپس",
    days: "12–21", features: ["SwiftUI or Flutter, native feel", "Apple Developer account setup help", "TestFlight beta with your team", "Push + Sign in with Apple", "App Store review responses handled"],
    kw: ["ios app development pakistan", "iphone app lahore", "app store submission help"]
  },
  {
    slug: "windows-app", icon: "desktop",
    name: "Windows Desktop Software", nameUr: "ونڈوز ڈیسک ٹاپ سافٹ ویئر",
    img: "service-windows",
    page: "Offline-first Windows apps for shops, factories, clinics and offices: POS & billing, inventory, files & HR — auto-update, LAN/cloud sync, print-ready invoices. Starter system PKR 14,000.",
    pageUr: "دکانوں، فیکٹریوں، کلینک اور آفس کے لیے ونڈوز ایپس: پی او ایبلنگ، اسٹاک، فائلز، ایچ آر — آٹو اپڈیٹ، ایل اے این/کلاؤڈ سنک۔ بنیادی سسٹم چودہ ہزار۔",
    short: "POS, inventory & office tools", shortUr: "بلنگ، اسٹاک اور آفس ٹولز",
    days: "8–16", features: ["C#/.NET or Electron, modern dark UI", "Works fully offline, syncs later", "Print: invoices, reports, barcodes", "Multi-user roles & audit log", "Auto-updater + installer (MSI/EXE)"],
    kw: ["windows software development pakistan", "billing software lahore", "inventory system pakistan"]
  }
,  {
    slug: "whatsapp-bot", icon: "wa",
    name: "WhatsApp Chatbot & Auto-Reply", nameUr: "واٹس ایپ چیٹ بوٹ اور آٹو ریپلائ",
    img: "service-wa-bot",
    page: "An auto-reply bot for your WhatsApp Business that answers prices, takes orders, sends your catalog and follows up — with live handover to staff in Urdu or English. Fixed PKR 14,000, linked landing page gets the free domain.",
    pageUr: "آپ کے واٹس ایپ بزنس کا آٹو ریپلائی بوٹ — قیمت بتائے، آرڈر لے، کیٹلاگ بھیجے اور فالو اپ کرے، لو ہینڈ اوور کے ساتھ۔ ایک قیمت چودہ ہزار، لنکڈ لینڈنگ پیج پر ڈومین فری۔",
    short: "Orders, FAQ & catalog on WhatsApp 24/7", shortUr: "واٹس ایپ پر ۲۴/۷ آرڈر اور جوابات",
    days: "4–7", features: ["Catalog & price-list sending", "Order form inside WhatsApp", "Broadcast offers + auto follow-ups", "Live handover to your staff", "Urdu & English understanding"],
    kw: ["whatsapp bot pakistan", "auto reply whatsapp business", "whatsapp order bot"]
  },
  {
    slug: "design-studio", icon: "pen",
    name: "CV, Logo & Brand Design", nameUr: "سی وی، لوگو اور برانڈ ڈیزائن",
    img: "service-design",
    page: "Professional 3D/ATS CVs, logo with 3 concepts, visiting cards, letterheads and a monthly social post kit — delivered in 24–72 hours by the same designers who built this site. PKR 14,000 fixed.",
    pageUr: "پروفیشنل سی وی، تین کنسیپٹس والا لوگو، ویزٹنگ کارڈز، لیٹر ہیڈ اور ماہانہ سوشل پوسٹ کٹ — ۲۴ سے ۷۲ گھنٹوں میں۔ ایک قیمت چودہ ہزار۔",
    short: "CVs, logos, banners & post kits — 24–72h", shortUr: "سی وی، لوگو، بینر اور پوسٹ کٹ",
    days: "1–3", features: ["3D + ATS-friendly resume (PDF/docx)", "Logo: 3 concepts, full source files", "Cards, letterhead, stamp, envelope kit", "Monthly social media post templates", "Unlimited minor revisions"],
    kw: ["cv design lahore", "logo design pakistan price", "resume maker pakistan"]
  },
  {
    slug: "food-restaurant", icon: "bowl",
    name: "Restaurant & Food Delivery Site", nameUr: "ریستوران اور فوڈ ڈیلیوری سائٹ",
    img: "service-food",
    page: "Your own ordering platform — skip commission apps! Digital menu with photos & variants, cart to WhatsApp/phone orders, delivery-area logic, kitchen board and QR-table ordering. PKR 14,000 + free domain.",
    pageUr: "اپنا آرڈر کرنے کا سسٹم — کمیشن والے ایپس سے نجات! ڈیجیٹل مینیو، واٹس ایپ/فون آرڈر، ڈیلیوری ایریا، کچن بورڈ اور کیو آر ٹیبل آرڈر۔ چودہ ہزار، ڈومین فری۔",
    short: "Menu, online orders & kitchen board", shortUr: "مینیو، آن لائن آرڈر اور کچن بورڈ",
    days: "6–12", features: ["Digital menu with photos & variants", "Cart to WhatsApp / phone ordering", "Delivery areas, slots & charges logic", "Live kitchen order board (admin)", "QR-table ordering for dine-in"],
    kw: ["food delivery website pakistan", "restaurant online menu", "food panda alternative pakistan"]
  },
  {
    slug: "ecommerce-store", icon: "cart",
    name: "E-commerce Online Store", nameUr: "ای کامرس آن لائن اسٹور",
    img: "service-ecommerce",
    page: "Full online store — unlimited products, COD/bank/card-ready checkout, inventory alerts, buyer order-tracking and a sales dashboard. Everything a mini-store needs at a fixed PKR 14,000.",
    pageUr: "مکمل آن لائن اسٹور — لامحدود پروڈکٹس، کو ڈی اور بینک ادائیگی، اسٹاک الرٹ، آرڈر ٹریکنگ اور سیلز ڈیش بورڈ۔ ایک قیمت چودہ ہزار۔",
    short: "Products, COD checkout & sales dashboard", shortUr: "پروڈکٹس، ادائیگی اور سیلز ڈیش بورڈ",
    days: "8–14", features: ["Unlimited products & variants", "COD / bank / card-ready checkout", "Inventory + low-stock WhatsApp alerts", "Customer order-tracking page", "Sales dashboard with CSV export"],
    kw: ["ecommerce website pakistan price", "online store development", "cod store pakistan"]
  },
  {
    slug: "lms-platform", icon: "play",
    name: "Online Courses Platform (LMS)", nameUr: "آن لائن کورسز پلیٹ فارم (ایل ایم ایس)",
    img: "service-lms",
    page: "Sell video courses with your own brand: lesson builder (video/pdf), quizzes & certificates, teacher/student/parent roles, subscriptions — no per-student fees like foreign LMSs. PKR 14,000 MVP.",
    pageUr: "اپنے برانڈ کے ساتھ ویڈیو کورسز بیچیں — لیسین بلڈر، کوئز اور سرٹیفکیٹ، ٹیچر/اسٹوڈنٹ رولز، سبسکرپشن — بیرونی ایل ایم ایس جیسے فی طالب فیس نہیں۔ ایم وی پی چودہ ہزار۔",
    short: "Sell courses: videos, quizzes, certificates", shortUr: "کورسز بیچیں: ویڈیوز، کوئز، سرٹیفکیٹ",
    days: "10–16", features: ["Course + lesson builder (video/pdf)", "Quizzes, auto-grading & certificates", "Teacher / student / parent roles", "One-time & subscription payments", "Urdu admin with revenue reports"],
    kw: ["lms development pakistan", "online course platform", "teach online website"]
  },
  {
    slug: "donation-platform", icon: "heart",
    name: "Donation & Zakat Platform", nameUr: "ڈونیشن اور زکوٰۃ پلیٹ فارم",
    img: "service-donation",
    page: "Trust-building fundraising: campaign pages with goal bars, built-in zakat calculator, monthly sponsorship reminders, instant receipts and a transparent public ledger. Fixed PKR 14,000 + free domain.",
    pageUr: "اعتماد پر مبنی فنڈنگ: گول بار کے ساتھ مہم کے صفحات، زکوٰۃ کیلکولیٹر، ماہانہ اسپانسرشپ ریمائنڈر، فوری رسید اور شفاف لیجر۔ چودہ ہزار، ڈومین فری۔",
    short: "Campaigns, zakat calc & sponsorships", shortUr: "مہمات، زکوٰۃ کیلکولیٹر اور اسپانسرشپ",
    days: "7–12", features: ["Campaign pages with live goal bars", "Zakat & sadaqah calculator built-in", "Monthly sponsorship auto-reminders", "Instant receipts + WhatsApp thank-yous", "Transparent public donation ledger"],
    kw: ["donation website pakistan", "zakat fund platform", "online sadaqah"]
  },
  {
    slug: "salon-booking", icon: "spark",
    name: "Salon, Spa & Clinic Booking", nameUr: "سیلون، اسپا اور کلینک بکنگ",
    img: "service-salon",
    page: "A booking site for salons, spas and clinics: staff-wise calendars, service menus with durations, slot booking on WhatsApp, package cards and no-show reminders. Fixed PKR 14,000 with a free domain.",
    pageUr: "سیلون، اسپا اور کلینک کے لیے بکنگ ویب سائٹ: اسٹاف کیلنڈر، خدمات کی فہرست، واٹس ایپ پر سلاٹ بکنگ، پیکاج کارڈ اور یادہانی۔ ایک قیمت چودہ ہزار، ڈومین فری۔",
    short: "Slots, stylists & package renewals", shortUr: "سلاٹ، اسٹائلسٹ اور پیکاج",
    days: "5–9", features: ["Service menu with duration & price", "Per-staff availability calendar", "WhatsApp confirm + 24h reminder", "Packages, top-ups & loyalty points", "Owner dashboard: daily sheet"],
    kw: ["salon booking website pakistan", "spa appointment system lahore", "clinic booking software"]
  },
  {
    slug: "gym-fitness", icon: "speed",
    name: "Gym & Fitness Studio Site", nameUr: "جِم اور فٹنس اسٹوڈیو ویب سائٹ",
    img: "service-gym",
    page: "Memberships that renew themselves: plan pages, QR attendance, trainer profiles, class timetable, diet sheets and WhatsApp payment reminders for every expiring card. PKR 14,000 fixed.",
    pageUr: "ممبرشپ خودکار طور پر تجدید ہو: پلان کے صفحات، کیو آر حاضری، ٹرینر پروفائل، کلاس ٹائم ٹیبل، خوراک کی شیٹس اور مہینہ ختم ہونے پر واٹس ایپ یادہانی۔ چودہ ہزار۔",
    short: "Memberships, QR attendance & plans", shortUr: "ممبرشپ، کیو آر حاضری اور پلان",
    days: "6–10", features: ["Membership plans with expiry tracking", "QR / mobile check-in for members", "Trainer profiles & booked PT sessions", "Class timetable (yoga, crossfit, Zumba)", "Renewal reminders on WhatsApp"],
    kw: ["gym website pakistan", "fitness app lahore", "gym membership software"]
  },
  {
    slug: "car-dealer", icon: "gear",
    name: "Car Dealer & Rental Website", nameUr: "کار ڈیلر اور رینٹل ویب سائٹ",
    img: "service-car",
    page: "List every plate with filters for model, year, mileage and city, verified-photo uploads, booking dates for self-drive rentals, and instant WhatsApp enquiries. Fixed PKR 14,000 — free domain included.",
    pageUr: "ہر گاڑی ماڈل، سال، میلیج اور شہر کے فلٹرز کے ساتھ، تصدیق شدہ تصاویر، سیلف ڈرائیو رینٹل کی تاریخیں، فوری واٹس ایپ انکوائری۔ ایک قیمت چودہ ہزار، ڈومین فری۔",
    short: "Listings, filters & rental dates", shortUr: "لسٹنگ، فلٹر اور رینٹل تاریخیں",
    days: "7–12", features: ["Ad listings with photo gallery & specs", "Filter: model, year, mileage, city", "Rental calendar with daily rates", "Featured ad slots that pay you back", "Dealer admin + shortlist to WhatsApp"],
    kw: ["car dealer website pakistan", "car rental booking site lahore", "used car portal pakistan"]
  },
  {
    slug: "event-wedding", icon: "gift",
    name: "Event & Wedding Website", nameUr: "ایونٹ اور شادی ویب سائٹ",
    img: "service-event",
    page: "Maalama to walima on one page: event timeline, venue map, RSVP form, photo gallery, guest list and a shayari-style countdown. Couples and planners get it live in a week — PKR 14,000 fixed.",
    pageUr: "مالمہ سے ولیمہ تک ایک صفحے پر: پروگرام کا شیڈول، venue کا نقشہ، RSVP فارم، تصاویر کا گیلری، مہمانان کی فہرست اور countdown۔ ایک ہفتے میں لائیو — چودہ ہزار۔",
    short: "Timelines, RSVP & photo galleries", shortUr: "شیڈول، RSVP اور تصاویر",
    days: "4–8", features: ["Per-function timeline & venue map", "RSVP form with guest counts", "Shared photo & video gallery", "Countdown + QR invite cards", "Planner dashboard for multiple events"],
    kw: ["wedding website pakistan", "event invitation website lahore", "shaadi website rsvp"]
  },
  {
    slug: "courier-logistics", icon: "pin",
    name: "Courier & Logistics Tracking", nameUr: "کورئیر اور لاجسٹکس ٹریکنگ",
    img: "service-courier",
    page: "Book a parcel, print the label, track it by CNIC or waybill number. Rate calculator by city and weight, rider assignment, POD uploads and a COD ledger for the accounts branch. PKR 14,000 fixed.",
    pageUr: "پارسل بک کریں، لیبل پرنٹ کریں، waybill نمبر سے ٹریک کریں۔ شہر اور وزن کے حساب سے ریٹ، رائیڈر تفویض، ثبوتِ وصولی اور COD کی کتاب۔ ایک قیمت چودہ ہزار۔",
    short: "Waybills, rates & proof of delivery", shortUr: "وے بل، ریٹ اور وصولی کا ثبوت",
    days: "8–14", features: ["Waybill booking + thermal label print", "Public tracking by consignment number", "City/weight rate calculator", "Rider assignment with status timeline", "COD daily settlement report"],
    kw: ["courier software pakistan", "logistics website lahore", "parcel tracking system"]
  },
  {
    slug: "pharmacy-store", icon: "cross",
    name: "Pharmacy & Medical Store Site", nameUr: "فارمیسی اور میڈیکل اسٹور ویب سائٹ",
    img: "service-pharmacy",
    page: "Medicine search with generic names, cart + COD or bank transfer, prescription upload, expiry and low-stock alerts, and home-delivery slots for your area. Fixed PKR 14,000 with free domain.",
    pageUr: "دوا کی عام نام سے تلاش، کارٹ اور COD یا بینک ٹرانسفر، نسخہ اپ لوڈ، میعاد اور کم اسٹاک الرٹ، اور گھر ڈیلیوری کے اوقات۔ ایک قیمت چودہ ہزار، ڈومین فری۔",
    short: "Medicine orders, Rx upload & stock", shortUr: "دوا کے آرڈر، نسخہ اور اسٹاک",
    days: "8–13", features: ["Medicine catalog with generic names", "Prescription upload + pharmacist review", "Batch, expiry & low-stock alerts", "Home delivery slots by area code", "Reorder reminders for chronic patients"],
    kw: ["pharmacy website pakistan", "online medicine store lahore", "medical store software"]
  },
  {
    slug: "mosque-website", icon: "home",
    name: "Masjid & Islamic Centre Site", nameUr: "مسجد اور اسلامی سینٹر ویب سائٹ",
    img: "service-mosque",
    page: "Prayer times that match your city, jamaat schedule, Friday khutbah audio, madrasa admissions, sadqah and azan fund collection with receipts — all in Urdu and Arabic ready. PKR 14,000 fixed.",
    pageUr: "شہر کے مطابق اوقاتِ نماز، جماعت کا شیڈول، جمعہ کے خطبے کی آڈیو، مدرسے کے داخلے، صدقہ اور اذان فنڈ کی وصولی رسید کے ساتھ۔ اردو اور عربی تیار۔ چودہ ہزار۔",
    short: "Prayer times, khutbah & fund receipts", shortUr: "اوقات، خطبہ اور فنڈ رسید",
    days: "5–9", features: ["Calculated prayer times per city", "Jamaat + jummah schedule board", "Khutbah audio & transcript library", "Madrasa admission form and fee list", "Donation receipts printed instantly"],
    kw: ["mosque website pakistan", "masjid prayer times website", "islamic centre website urdu"]
  },
  {
    slug: "import-export", icon: "globe",
    name: "Import–Export & Trading Site", nameUr: "امپورٹ ایکسپورٹ اور ٹریڈنگ ویب سائٹ",
    img: "service-trade",
    page: "A corporate site that sells trust: product ranges with spec sheets, MOQ and HS-code tables, enquiry-to-WhatsApp RFQs, export documentation checklist and ZATCA-friendly invoicing for KSA buyers. PKR 14,000 fixed.",
    pageUr: "ایسی کارپوریٹ ویب سائٹ جو اعتماد بیچے: مصنوعات spec sheet کے ساتھ، MOQ اور HS کوڈ، RFQ واٹس ایپ پر، ایکسپورٹ دستاویزات کی چیک لسٹ اور ZATCA کے مطابق انوائس۔ چودہ ہزار۔",
    short: "Spec sheets, RFQ & trade documents", shortUr: "اسپیک شیٹ، RFQ اور تجارتی دستاویز",
    days: "6–11", features: ["Product ranges with downloadable specs", "RFQ form → WhatsApp + email copy", "MOQ, HS code and port-of-loading table", "Export document checklist per consignment", "Arabic + English bilingual pages"],
    kw: ["import export website pakistan", "trading company website lahore", "exporter website design"]
  },
  {
    slug: "pos-billing", icon: "calculator",
    name: "POS & Billing Software", nameUr: "POS اور بِلنگ سافٹ ویئر",
    img: "service-pos",
    page: "Counter billing that never stops when the internet does: barcode scanning, GST/ZATCA tax slabs, credit customers, returns, day-close Z-report and a web dashboard for the owner. Fixed PKR 20,000.",
    pageUr: "کاؤنٹر بلنگ جو انٹرنیٹ بند ہونے پر بھی رکے نہ: بارکوڈ اسکین، GST/ZATCA ٹیکس، ادھار گاہک، ریٹرن، روزانہ کا Z رپورٹ اور مالک کے لیے ویب ڈیش بورڈ۔ ایک قیمت بیس ہزار۔",
    short: "Barcodes, tax slabs & day close", shortUr: "بارکوڈ، ٹیکس اور ڈے کلوز",
    days: "10–16", features: ["Barcode + keyboard billing modes", "GST / ZATCA tax slabs per item", "Customer credit ledger & partial returns", "Offline mode with automatic sync", "Z-report, cash drawer and receipt print"],
    kw: ["pos software pakistan", "billing software lahore", "retail pos system urdu"]
  },
  {
    slug: "law-firm", icon: "brief",
    name: "Law Firm & Consulting Profile", nameUr: "قانونی فرم اور کنسلٹنسی ویب سائٹ",
    img: "service-law",
    page: "Practise areas, advocate profiles with bar numbers, case intake form, appointment slots and a knowledge library — a sober, fast profile that reads credible on mobile. PKR 14,000 fixed, free domain.",
    pageUr: "شعبہ جات، وکیل کے پروفائل بار نمبر کے ساتھ، کیس انٹیک فارم، مقررہ ملاقات کے اوقات اور علم کی لائبریری — سنجیدہ، تیز اور موبائل پر قابلِ اعتماد۔ چودہ ہزار، ڈومین فری۔",
    short: "Practice areas, intake & appointments", shortUr: "شعبہ جات، انٹیک اور ملاقات",
    days: "4–8", features: ["Practice-area pages with case types", "Advocate profiles + bar registration", "Secure case-intake document upload", "Consultation booking with fee shown", "Articles library for local SEO"],
    kw: ["law firm website pakistan", "advocate website lahore", "legal consulting website"]
  },
  {
    slug: "banquet-hall", icon: "bowl",
    name: "Shaadi Hall & Banquet Booking", nameUr: "شادی ہال اور بینکوٹ بکنگ",
    img: "service-banquet",
    page: "Show your halls with capacity, per-plate menu and real availability: date-wise booking with advance tracking, decorator and caterer add-ons, and an enquiry that lands straight on WhatsApp. Fixed PKR 14,000, free domain for a year.",
    pageUr: "اپنے ہال گنجائش، فی پلیٹ مینو اور اصل دستیابی کے ساتھ دکھائیں: تاریخ کے حساب سے بکنگ اور ایڈوانس، ڈیکوریٹر اور کیٹرر کے ایڈ آن، انکوائری سیدھی واٹس ایپ پر۔ ایک قیمت چودہ ہزار، ایک سال ڈومین فری۔",
    short: "Halls, dates, per-plate menus", shortUr: "ہال، تاریخیں اور فی پلیٹ مینو",
    days: "6–10", features: ["Hall pages with capacity & photos", "Date availability + advance schedule", "Per-plate menu and packages", "Decorator / caterer add-on list", "Booking sheet with WhatsApp confirm"],
    kw: ["banquet hall booking website", "shaadi hall website lahore", "wedding hall booking system"]
  }
];

const URDU_PRICE = { 14000: "چودہ ہزار", 20000: "بیس ہزار", 23500: "تئیس ہزار پانچ سو", 30000: "تیس ہزار", 35000: "پینتیس ہزار" };
const PRICE_NOTE = { 14000: "Website", 20000: "Website + management", 23500: "AI / voice", 30000: "Android / Windows app", 35000: "iOS app" };
services.forEach(s => {
  s.price = SERVICE_PRICES[s.slug] || PRICE;
  s.priceNote = PRICE_NOTE[s.price] || "Fixed rate";
  s.page = s.page.replace(/PKR 14,000/g, "PKR " + s.price.toLocaleString("en-US"));
  s.pageUr = s.pageUr.replace(/چودہ ہزار/g, URDU_PRICE[s.price] || "مقررہ قیمت");
});

/* ================= EMERGENCY RECOVERY (separate from build services) =================
   Kept out of the 21 build services because demos, source-code and domain promises
   do not apply to a hacked site/account. Recovery has its own page and low rates. */
const recovery = [
  {
    slug: "hacked-website-recovery", id: "website-php", icon: "shield", img: "service-management",
    name: "Hacked Website & PHP Recovery", nameUr: "ہیک ویب سائٹ اور پی ایچ پی ریکوری",
    badge: "Website / PHP",
    price: 7000, priceNote: "Emergency recovery", days: "1–3",
    short: "Malware, PHP backdoors & blacklist cleanup", shortUr: "میل ویئر، پی ایچ پی بیک ڈور اور بلیک لسٹ کی صفائی",
    page: "Hacked, defaced or redirecting to spam? We clean malware and PHP backdoors, restore cPanel/admin access, remove Google blacklist warnings, patch the entry point and harden the site. Fixed PKR 7,000 — free inspection first. Proof of ownership required.",
    pageUr: "سائٹ ہیک، ڈیفیس یا اسپام کی طرف ری ڈائریکٹ ہو رہی ہے؟ ہم میل ویئر اور پی ایچ پی بیک ڈور صاف کرتے ہیں، سی پینل/ایڈمن رسائی بحال کرتے ہیں، گوگل بلیک لسٹ انتباہ ہٹاتے ہیں، کمزوری بند کرتے ہیں اور سائٹ محفوظ کرتے ہیں۔ مقررہ ۷,۰۰۰ روپے — پہلے مفت معائنہ۔ ملکیت کا ثبوت ضروری ہے۔",
    features: [
      "Malware, spam redirect & PHP backdoor cleanup",
      "Google Safe Browsing / blacklist removal help",
      "cPanel, admin & hosting access recovery",
      "Patch entry point + firewall & 2FA hardening",
      "Clean backup + 14-day re-infection check"
    ],
    steps: [
      { t: "Free inspection", u: "مفت معائنہ", d: "Send your URL and proof of ownership. We check malware, backdoors, redirects and Google blacklist status.", dUr: "اپنا یو آر ایل اور ملکیت کا ثبوت بھیجیں۔ ہم میل ویئر، بیک ڈور، ری ڈائریکٹ اور گوگل بلیک لسٹ چیک کرتے ہیں۔" },
      { t: "Clean & secure", u: "صفائی اور تحفظ", d: "Remove the infection, patch PHP/plugins, reset access and add firewall + 2FA protection.", dUr: "انفیکشن ختم کریں، پی ایچ پی/پلگ ان پیچ کریں، رسائی ری سیٹ کریں اور فائر وال + ۲ ایف اے لگائیں۔" },
      { t: "Verify & hand over", u: "تصدیق اور حوالگی", d: "Google re-check, clean backup and a 14-day re-infection watch with a written report.", dUr: "گوگل دوبارہ چیک، صاف بیک اپ اور ۱۴ دن کی نگرانی — تحریری رپورٹ کے ساتھ۔" }
    ],
    kw: ["hacked website recovery pakistan", "wordpress malware removal lahore", "php backdoor cleanup"]
  },
  {
    slug: "whatsapp-recovery", id: "whatsapp", icon: "wa", img: "service-wa-bot",
    name: "Hacked WhatsApp Recovery", nameUr: "ہیک واٹس ایپ ریکوری",
    badge: "WhatsApp",
    price: 5000, priceNote: "WhatsApp recovery", days: "1–2",
    short: "Account recovery, 2FA & linked-device cleanup", shortUr: "اکاؤنٹ ریکوری، ۲ ایف اے اور لنکڈ ڈیوائس کی صفائی",
    page: "WhatsApp hacked, logged out, OTP not arriving or your number changed? We guide the official recovery flow, set up 2FA, remove linked devices, help restore your Business profile and lock down the account. Fixed PKR 5,000. We never ask for your OTP or password.",
    pageUr: "واٹس ایپ ہیک، لاگ آؤٹ، او ٹی پی نہ آنا یا نمبر تبدیل ہو جانا؟ ہم سرکاری ریکوری طریقہ کار میں رہنمائی کرتے ہیں، ۲ ایف اے سیٹ کرتے ہیں، لنکڈ ڈیوائسز صاف کرتے ہیں، بزنس پروفائل بحال کرنے میں مدد دیتے ہیں اور اکاؤنٹ محفوظ کرتے ہیں۔ مقررہ ۵,۰۰۰ روپے۔ ہم کبھی او ٹی پی یا پاس ورڈ نہیں مانگتے۔",
    features: [
      "Official WhatsApp recovery assistance",
      "2FA, PIN & linked-device cleanup",
      "SIM / OTP and number verification guidance",
      "WhatsApp Business profile restore help",
      "Scam-protection checklist for your staff",
      "We never ask for your OTP or password"
    ],
    steps: [
      { t: "Free case check", u: "مفت کیس چیک", d: "Send your number and issue. We confirm whether official recovery is possible — no fake tools.", dUr: "اپنا نمبر اور مسئلہ بھیجیں۔ ہم بتاتے ہیں سرکاری ریکوری ممکن ہے یا نہیں — کوئی جعلی ٹول نہیں۔" },
      { t: "Recover access", u: "رسائی بحال کریں", d: "Official WhatsApp flow, SIM/OTP guidance, 2FA setup and linked-device cleanup.", dUr: "سرکاری واٹس ایپ طریقہ کار، سم/او ٹی پی رہنمائی، ۲ ایف اے اور لنکڈ ڈیوائس کی صفائی۔" },
      { t: "Lock it down", u: "محفوظ کریں", d: "Business profile restore, scam-protection checklist and safe-backup advice.", dUr: "بزنس پروفائل بحالی، اسکیم سے بچاؤ چیک لسٹ اور محفوظ بیک اپ مشورہ۔" }
    ],
    kw: ["hacked whatsapp recovery pakistan", "whatsapp account recover lahore", "whatsapp 2fa setup"]
  }
];

const packages = [
  { n: "Website", nUr: "ویب سائٹ", price: 14000, tag: "Business · travel · hall · property · store · salon",
    desc: "A complete fast website with 3D design, full SEO, WhatsApp ordering and a FREE domain for one year.",
    items: [["3 free demo designs (you pick one)", 1], ["FREE domain for 1 year", 1], ["On-page SEO + sitemap + schema", 1], ["WhatsApp order & quote buttons", 1], ["Source code + handover video", 1], ["30-day free support", 1]] },
  { n: "Website + Management", nUr: "ویب سائٹ + مینجمنٹ", price: 20000, pop: true, tag: "ERP · admin panel · POS · custom portal",
    desc: "Everything in Website plus a role-based admin panel to manage content, orders, students, properties or donations.",
    items: [["Complete website included", 1], ["Admin / CMS panel", 1], ["Roles, dashboard & reports", 1], ["Database + secure login", 1], ["FREE domain for 1 year", 1], ["60-day free support", 1]] },
  { n: "AI Agent / Voice", nUr: "اے آئی ایجنٹ / وائس", price: 23500, tag: "AI agent · voice bot · receptionist · WhatsApp",
    desc: "An AI agent that replies, qualifies leads and books appointments on WhatsApp, calls, email or your CRM — 24/7.",
    items: [["AI agent or voice bot setup", 1], ["WhatsApp / call / email integration", 1], ["Lead qualification + human handover", 1], ["English, Urdu & Roman Urdu", 1], ["Admin dashboard & transcripts", 1], ["30-day free support", 1]] },
  { n: "Android / Windows App", nUr: "اینڈرائیڈ / ونڈوز ایپ", price: 30000, tag: "Play Store · desktop software",
    desc: "A native Android app or Windows desktop system with its own admin backend, push notifications and store publishing.",
    items: [["Native Android or Windows app", 1], ["Matching admin backend", 1], ["Push notifications", 1], ["Play Store / installer publishing", 1], ["Source code handover", 1], ["30-day free support", 1]] },
  { n: "iOS App", nUr: "آئی او ایس ایپ", price: 35000, tag: "App Store · iPhone & iPad",
    desc: "A polished iOS app with TestFlight beta, App Store submission and a shared backend with your web or Android build.",
    items: [["Native iOS app (iPhone & iPad)", 1], ["Shared backend + admin panel", 1], ["TestFlight beta testing", 1], ["App Store submission support", 1], ["Source code handover", 1], ["30-day free support", 1]] }
];

const addons = [
  ["Logo + brand kit (3 concepts, source files)", "4,000"],
  ["Extra language (Urdu RTL / Arabic / English)", "3,000"],
  ["E-commerce cart + COD flow (on a site)", "9,000"],
  ["Payment integration (JazzCash / EasyPaisa / bank)", "8,000"],
  ["Google Business Profile + map optimization", "4,000"],
  ["Speed + SEO audit with fixes", "5,000"],
  ["Push notifications (Android / iOS)", "6,000"],
  ["Extra domain (another .com / .pk, 1 year)", "3,500"],
  ["Monthly care plan (updates, backups, reports)", "5,000 / month"]
];

const portfolio = [
  { t: "SastaCart — Fashion E-commerce", img: "service-website", price: 20000, tags: ["E-commerce", "PKR 20,000"], r: "COD + WhatsApp order flow, 900 products migrated, load time 0.9s. Inquiries up 64% in month one.", city: "Johar Town, Lahore" },
  { t: "ZaraiLink — Work-from-Home Portal", img: "service-job-portal", tags: ["Portal", "PKR 14,000"], r: "Verified employers, wallet payouts, referral tree. 11,400 seekers in 60 days; featured-post revenue from week one.", city: "Remote PK" },
  { t: "BrightSmile AI Receptionist", img: "service-receptionist", tags: ["AI", "PKR 14,000"], r: "Dental clinic answers every call & WhatsApp 24/7 with Google Calendar booking. 47% more appointments.", city: "DHA Phase 5, Lahore" },
  { t: "GlobeTrek Umrah & Tours", img: "service-travel", tags: ["Travel", "PKR 14,000"], r: "Umrah groups sell themselves: itinerary pages + PDF quotes + agent commissions. 3x enquiries in a month.", city: "Gulberg, Lahore" },
  { t: "Serene Hotels — Direct Booking", img: "service-hotel", tags: ["Hotel", "PKR 14,000"], r: "Golden-Luxe demo won the pick. 22% of bookings now come direct, cutting OTAs commission bill.", city: "Murree Rd, Lahore" },
  { t: "Beacon Kids Admission Portal", img: "service-school", tags: ["School", "PKR 14,000"], r: "Admissions fully online with document upload + SMS updates. Queue at the office: gone.", city: "Bahria Town, Lahore" },
  { t: "CityCare Hospital OPD", img: "service-hospital", tags: ["Hospital", "PKR 14,000"], r: "Online OPD tokens ended the 6 AM rush. Doctors' schedules self-updated by admin staff.", city: "Township, Lahore" },
  { t: "LahoreEstate Property Portal", img: "service-property", tags: ["Property", "PKR 14,000"], r: "1,200 listings with map pins; featured ads alone earn the owner PKR 60K+/month.", city: "DHA, Lahore" },
  { t: "SwiftStock Management ERP", img: "service-management", tags: ["ERP", "PKR 14,000"], r: "Wholesale dealer on web + Windows POS with offline sync; end-of-day reports in seconds.", city: "Shah Alam Market" },
  { t: "TruckRoute — Windows Fleet Suite", img: "service-windows", tags: ["Desktop", "PKR 14,000"], r: "Offline-first fleet billing for 60 vehicles; night paperwork reduced from hours to minutes.", city: "Kashmir Rd, Lahore" },
  { t: "GymFlow — Android + Voice AI", img: "service-android", tags: ["App + AI", "PKR 14,000"], r: "Membership app with renewals on WhatsApp and Urdu voice agent for timings. Churn 9%→4%.", city: "Model Town, Lahore" },
  { t: "PakProperty CMS Upgrade", img: "service-cms", tags: ["CMS", "PKR 14,000"], r: "Agents self-publish listings with Urdu admin; 3x listings, zero developer tickets.", city: "Faisal Town" }
];

portfolio.forEach(p => {
  const svc = services.find(x => x.img === p.img);
  const price = p.price || (svc && svc.price);
  if (price) p.tags = p.tags.map(t => t.startsWith("PKR") ? "PKR " + price.toLocaleString("en-US") : t);
});

const testimonials = [
  { q: "Pehle main khud WhatsApp reply karta tha raat 2 baje tak. Ab AI receptionist sambhalta hai — bookings apne aap. Fixed 23,500, koi hidden charge nahi.", qEn: "The AI receptionist handles calls now; bookings come automatically. Fixed PKR 23,500 — no hidden charges.", n: "Dr. Ahsan Raza", r: "BrightSmile Dental Clinic", s: 5 },
  { q: "Teen demo designs bheje — main ne golden wala chuna. Website itni pyari bani ke clients taareef karte hain. Domain bhi free mila.", qEn: "They sent 3 demo designs, I picked the golden one. Clients praise the site — and the domain was free.", n: "Hina Tariq", r: "Raza Traders", s: 5 },
  { q: "School ka admission portal 9 din me live — documents upload, SMS notifications. Ab office me koi line nahi. Fixed 20 hazar!", qEn: "Our admission portal went live in 9 days — document uploads, SMS updates. No more queues, only PKR 20,000.", n: "Principal, Beacon Kids", r: "Bahria Town, Lahore", s: 5 },
  { q: "Property portal pe featured ads se mahine ka 60 hazar kamata hoon. Ek hi dafa 14 hazar diya tha.", qEn: "Featured ads on my property portal now earn me 60K/month — for a one-time PKR 14,000 build cost.", n: "Bilal Ahmed", r: "LahoreEstate founder", s: 5 },
  { q: "Android app aur POS dono ek team se, source code pura diya. Fixed 30 hazar, emaandari se kaam.", qEn: "Android app and POS from one team, full source code handed over. Fixed PKR 30,000, honest work on time.", n: "Sana Malik", r: "GymFlow", s: 5 }
];

const faqs = [
  { q: "Aap ke rates kya hain?", qEn: "What are your fixed rates?", a: "Har qisam ki website PKR 14,000 — business, travel, hotel, school, hospital, restaurant, e-commerce, property, job portal, LMS, donation, salon, gym, car dealer, shaadi hall, event, courier, pharmacy, masjid, import-export, law firm. Alag admin panel / ERP / POS PKR 20,000 · AI agent, voice, receptionist ya WhatsApp bot PKR 23,500 · Android ya Windows app PKR 30,000 · iOS app PKR 35,000. Website packages par domain 1 saal free, 3 demo designs, source code aur 30 din support included.", aEn: "Every kind of website is PKR 14,000 — business, travel, hotel, school, hospital, restaurant, e-commerce, property, job portal, LMS, donation, salon, gym, car dealer, wedding hall, event, courier, pharmacy, masjid, import-export and law firm. A separate admin panel / ERP / POS is PKR 20,000 · AI agent, voice, receptionist or WhatsApp bot PKR 23,500 · Android or Windows app PKR 30,000 · iOS app PKR 35,000. Website packages include a free domain for one year, 3 demo designs, source code and 30-day support." },
  { q: "Domain free — asli free hai?", qEn: "The free domain — really free?", a: "Bilkul. .com ya .pk (site wale packages me) pehla saal hamari taraf se. Renewal (~2,500/saal) aap direct registrar se karte hain — domain sirf aapke naam hota hai.", aEn: "Yes — .com or .pk for the first year, registered in YOUR name. Renewal afterwards is direct with the registrar (about PKR 2,500/year)." },
  { q: "3 demo designs kaise kaam karte hain?", qEn: "How do the 3 demo designs work?", a: "Advance ke baad hum aapke project ke 3 mukammal demo designs banate hain — Classic Blue, Golden Luxe, Modern Minimal. Aap koi bhi pasand karein, usi me live project banta hai. Sab pasand na aayein to rework free.", aEn: "After the 50% advance we build 3 complete demo designs of YOUR project (Blue / Gold / Minimal). You pick one and we finish it in that style. Hate all three? Unlimited free reworks until you smile." },
  { q: "Kitne din lagte hain?", qEn: "How long does it take?", a: "Site 4–10, AI receptionist 5–8, management system 8–14, apps 10–21 din. Date shuru me hi written milti hai.", aEn: "Sites 4–10 days, AI receptionist 5–8, management systems 8–14, apps 10–21. The schedule is written upfront." },
  { q: "Payment ka tareeqa?", qEn: "How do payments work?", a: "50% advance, 50% delivery par. JazzCash / EasyPaisa / bank / office cash.", aEn: "50% advance, 50% on delivery — JazzCash, EasyPaisa, bank or cash at office." },
  { q: "Kya source code milta hai?", qEn: "Do I own the code?", a: "Haan — code, domain, hosting, admin sab aapke naam. Koi lock-in nahi.", aEn: "Full ownership: code, domain, hosting, admin — all in your name. Zero lock-in." },
  { q: "AI/voice agent ka monthly kharcha?", qEn: "Any AI running cost?", a: "Standard bots included hain. Zyaada volume par API usage ~2,000–6,000 PKR/mahina — pehle hi bata dete hain.", aEn: "Standard usage included; high-volume voice/LLM runs ~PKR 2,000–6,000/month, always quoted upfront." },
  { q: "Urdu / Roman Urdu me baat ho sakti hai?", qEn: "Do you work in Urdu?", a: "Ji haan — bilingual sites (English + اردو RTL) aur Urdu-bolne wale AI agents hamari specialty hain.", aEn: "Absolutely — bilingual sites (English + Urdu RTL) and Urdu-speaking AI agents are our specialty." },
  { q: "Baad me support?", qEn: "After-launch support?", a: "Har project par 30 din free support. Uske baad care plan sirf 5,000/mahina — updates, backups aur chhoti tabdeeliyan.", aEn: "Every project includes 30 days of free support. After that, a PKR 5,000/month care plan covers updates, backups and small changes." },
  { q: "Ghar bethe kamai wala portal bhi banega?", qEn: "Can you build my earning portal?", a: "Haan — Job & Earning Portal package me: accounts, KYC, wallet, referral engine aur featured-post revenue. Aap admin, platform kamai karta hai.", aEn: "Yes — the Job & Earning Portal service ships accounts, KYC, wallets, referrals and featured-listing revenue. You run the admin; the platform earns." },
  { q: "Hacked website ya WhatsApp recover karte hain?", qEn: "Do you recover hacked websites or WhatsApp?", a: "Haan. Hacked website/PHP recovery PKR 7,000 aur hacked WhatsApp recovery assistance PKR 5,000 — fixed low rates. Pehle mufat inspection, phir 50% advance. Website ke liye ownership proof zaroori hai; WhatsApp me hum sirf official process guide karte hain aur kabhi OTP/password nahi maangte.", aEn: "Yes. Hacked website/PHP recovery is PKR 7,000 and hacked WhatsApp recovery assistance is PKR 5,000 — fixed low rates. Free inspection first, then 50% advance. Website recovery requires proof of ownership; for WhatsApp we only guide the official process and never ask for OTP or passwords." },
  { q: "Aap certified aur registered hain?", qEn: "Are you certified and registered?", a: "Ji haan — AWS aur Google certified team, Engr. Jamshaid (Software Engineer, IT Ministry, Govt. of Pakistan), aur Saudi Arabia me ZATCA-registered, KSA govt-affiliated ZATCA-compliant software company. Certificates aur registration documents demand par share kar dete hain.", aEn: "Yes — an AWS and Google certified team, Engr. Jamshaid (Software Engineer, IT Ministry, Govt. of Pakistan), and a Saudi Arabia ZATCA-registered, KSA govt-affiliated ZATCA-compliant software company. We share certificates and registration documents on request." }
];

const blog = [
  {
    slug: "ai-receptionist-pakistan-price", date: "2026-10-08", read: "6 min", img: "service-receptionist",
    title: "AI Receptionist in Pakistan: Real Prices & Numbers (2026)",
    titleUr: "پاکستان میں اے آئی ریسیپشنسٹ: اصل قیمت اور اعداد",
    desc: "Fixed PKR 23,500 at Wafa Smart Tech — here is exactly what the AI receptionist answers, how booking works, and BrightSmile's real numbers.",
    body: `<p>Most clinics, salons and firms in Lahore lose customers between 8 PM and 10 AM. Not because service is bad — because nobody picks up. An AI receptionist closes that gap 24/7.</p><h2>What it actually does</h2><ul><li>Answers every call &amp; WhatsApp in English, Urdu or Roman Urdu</li><li>Shares prices, timings, directions; takes structured messages</li><li>Books into your Google Calendar and sends day-before reminders</li><li>Escalates tricky customers to your staff with a summary</li></ul><h2>The 2026 price, honestly</h2><p>Agencies quote PKR 80K–200K for voice bots. Wafa Smart Tech charges a fixed <b>PKR 23,500</b> — 3 demo designs first, source code and 30-day support included. Only running cost is call/LLM usage, usually under PKR 4,000/month for one location.</p><h2>Case numbers — BrightSmile Dental</h2><p>47% more booked appointments, zero missed calls after 11 PM, payback in about 3 weeks.</p><p><a href="/ai-receptionist.html">See the AI Receptionist service →</a></p>`
  },
  {
    slug: "ghar-beth-kamai-portal", date: "2026-09-21", read: "7 min", img: "service-job-portal",
    title: "Ghar Bethan Kamai: Build Your Own Job & Earning Portal",
    titleUr: "گھر بیٹھے کمائی: اپنا جاب اور کمائی کا پورٹل بنائیں",
    desc: "A PKR 14,000 MVP portal with 4 income streams — featured posts, subscriptions, verified passes and referrals — plus the trust features that keep you legal.",
    body: `<p>A job/earning portal is one of the few software businesses that earns rupees daily after launch. You are the admin — the platform works, the community grows, you collect.</p><h2>Four income streams</h2><ol><li><b>Featured jobs / promoted gigs</b> — employers pay PKR 500–5,000 to top the list</li><li><b>Employer subscriptions</b> — monthly posting packs</li><li><b>Verified-member passes</b> — resume boosts, badge fees</li><li><b>Task &amp; referral engine</b> — sponsors pay per verified signup or completed task</li></ol><h2>Trust is the product</h2><p>Pakistan's market is flooded with fake "earning" apps. Your portal survives by shipping KYC verification, employer proof, wallet ledgers with payout queues and fraud guards — all in the MVP we ship for a fixed <b>PKR 14,000</b> (extended flows quoted on the same rate card).</p><h2>Timeline</h2><p>MVP board in ~10 days, full platform in 3 weeks — after you pick your favourite from our <b>3 free demo designs</b>. Source code and admin panel in Urdu are yours forever.</p><p><a href="/job-portal.html">See the Job &amp; Earning Portal service →</a></p>`
  }
];

/* the real demo builds under dist/ - photographed live for /demos.html */
const LIVEDEMOS = [
  {
    folder: "demo4", img: "demo-travel", group: "booking",
    name: "Wafa Travel & Tours", nameUr: "وفا ٹریول اینڈ ٹورز",
    kind: "Travel, Umrah & Hajj booking site", rate: TIERS.website, days: "5–9 days",
    note: "One-way and return flight search, Umrah and Hajj group pages, hotel cards and a booking form that writes the whole enquiry into WhatsApp — no call centre, no lost leads.",
    noteUr: "ونے اور ریٹرن فلائٹ سرچ، عمرہ اور حج گروپ، ہوٹل کارڈز — بکنگ فارم براہِ راست واٹس ایپ پر جاتا ہے۔",
    try: "Search Lahore → Jeddah, then press Book via WhatsApp.",
  },
  {
    folder: "demo20", img: "demo-erp-en", group: "system",
    name: "Sarwar Khan Filling Station — ERP", nameUr: "سرور خان فلنگ اسٹیشن — ای آر پی",
    kind: "Petrol-pump management system (Roman Urdu)", rate: TIERS.management, days: "7–14 days",
    note: "Daily fuel-meter entry against each pump, cash and bank ledger, expenses, per-litre profit and a week chart — the owner's whole day on one screen. Opens on a PIN board: owner 1111, manager 2222, operator 3333.",
    noteUr: "ہر پمپ کا میٹر، کیش بینک، اخراجات اور فی لیٹر منافع — مالک کا دن ایک اسکرین پر۔",
    try: "Log in with PIN 1111, then add a fuel reading.",
  },
  {
    folder: "demo21", img: "demo-erp-ur", group: "system",
    name: "سرور خان فلنگ اسٹیشن — اردو ERP", nameUr: "سرور خان فلنگ اسٹیشن — اردو ای آر پی",
    kind: "Same ERP, full Urdu interface", rate: TIERS.management, days: "7–14 days",
    note: "The identical system rebuilt right-to-left in Urdu for staff who think in Urdu — same dashboards, same charts, same reports. Proof that the admin panel speaks your language, not ours.",
    noteUr: "وہی سسٹم مکمل اردو اور دائیں سے بائیں — ڈیش بورڈ، چارٹ اور رپورٹس وہی۔",
    try: "Read the dashboard top-right — no login needed, it opens straight in.",
  },
  {
    folder: "demo30", img: "demo-surgical-a", group: "styles", style: "Demo A",
    name: "Sterlix Surgical — Demo A", nameUr: "سٹیرلک سرجیکل — ڈیمو اے",
    kind: "Classic Blue · instruments export", rate: TIERS.website, days: "4–10 days",
    note: "One brief, three complete designs. Demo A is the corporate cut: quiet blue-slate palette, product table first, catalogue enquiry on every section.",
    noteUr: "ایک بریف، تین مکمل ڈیزائن۔ ڈیمو اے کارپوریٹ انداز۔",
    try: "Compare the product section against Demo B and C.",
  },
  {
    folder: "demo31", img: "demo-surgical-b", group: "styles", style: "Demo B",
    name: "Sterlix Surgical — Demo B", nameUr: "سٹیرلک سرجیکل — ڈیمو بی",
    kind: "Golden Luxe · instruments export", rate: TIERS.website, days: "4–10 days",
    note: "Demo B goes dark and premium — near-black canvas, large display type, cinematic spacing. Chosen when the brand needs to feel like a laboratory, not a supplier.",
    noteUr: "ڈیمو بی ڈارک اور پیمیم — بڑا ٹائپ اور سنیمائی اسپیسنگ۔",
    try: "Look at the hero headline size versus Demo A.",
  },
  {
    folder: "demo32", img: "demo-surgical-c", group: "styles", style: "Demo C",
    name: "Sterlix Surgical — Demo C", nameUr: "سٹیرلک سرجیکل — ڈیمو سی",
    kind: "Modern Minimal · instruments export", rate: TIERS.website, days: "4–10 days",
    note: "Demo C is the airy one: Inter type, generous whitespace, motion on scroll. Export catalogues with many SKUs tend to pick this because the grid stays readable.",
    noteUr: "ڈیمو سی کھلا اور منیمل — زیادہ جگہ، اسکرول پر حرکت۔",
    try: "Scroll the grid — this is the fastest of the three.",
  },
  {
    folder: "demo40", img: "demo-realestate", group: "booking",
    name: "NEXORA — Construction & Development", nameUr: "নেকسورا",
    kind: "Real estate / builder corporate site", rate: TIERS.website, days: "4–10 days",
    note: "Project showcase, unit availability, construction-stage timeline and an enquiry funnel for a developer selling off-plan — the property-portal look without a portal backend.",
    noteUr: "پروجیکٹ نمائش، یونٹ دستیابی اور آف-پلان انکوائری۔",
    try: "Open a project card and send an enquiry.",
  },
  {
    folder: "demo41", img: "demo-group-a", group: "booking",
    name: "SP Group — English build", nameUr: "ایس پی گروپ",
    kind: "Builder brand site (English)", rate: TIERS.website, days: "4–10 days",
    note: "Deep-green corporate treatment: services, ongoing projects and a plot enquiry form. Same content model as the Urdu build below — only the language direction changes.",
    noteUr: "گہرا سبز کارپوریٹ انداز، خدمات اور جاری پروجیکٹ۔",
    try: "Compare with the Roman Urdu build below.",
  },
  {
    folder: "demo42", img: "demo-group-b", group: "booking",
    name: "SP Group — Roman Urdu build", nameUr: "ایس پی گروپ (رومن اردو)",
    kind: "Builder brand site (Roman Urdu)", rate: TIERS.website, days: "4–10 days",
    note: "“Apka khwab ka ghar” — the same company pitched in the language customers actually type into Google in Lahore. Proves the 3-demo promise is about tone, not just colour.",
    noteUr: "وہی کمپنی، اس زبان میں جو لاہور میں گوگل پر ٹائپ کی جاتی ہے۔",
    try: "Read the hero — Roman Urdu, same layout.",
  },
];

/* ---------------------------------------------------------------- homepage
   The homepage is built section by section; these arrays are the content for
   the rails and grids. Every image name here must exist as a WebP ladder in
   dist/assets/img — build/scripts/site-audit.js checks that on every build. */

/* the eight doors under the hero */
const PORTALS = [
  { name: "Websites & Brands",img: "service-website",  short: "Websites", href: "website-design", icon: "code", live: "Open now", n: "9 builds", accent: "#1F5FA8" },
  { name: "Stores & Marketplaces",img: "service-ecommerce",  short: "Stores", href: "ecommerce-store", icon: "cart", live: "Open now", n: "COD + WhatsApp", accent: "#B0752A" },
  { name: "Booking & Appointments",img: "service-salon",  short: "Booking", href: "salon-booking", icon: "calendar", live: "Open now", n: "4 verticals", accent: "#2F6B47" },
  { name: "AI Agents & Bots",img: "service-ai-agents",  short: "AI", href: "ai-agents", icon: "bot", live: "Open now", n: "3 kinds", accent: "#5B3E96" },
  { name: "Android & iOS Apps",img: "service-android",  short: "Apps", href: "android-app", icon: "droid", live: "Open now", n: "one codebase", accent: "#0F7B6C" },
  { name: "ERP & Management",img: "service-management",  short: "ERP", href: "management-system", icon: "layers", live: "Open now", n: "Urdu + English", accent: "#8A4B2A" },
  { name: "Hacked? Recovery",img: "service-receptionist",  short: "Recovery", href: "hacked-website-recovery", icon: "shield", live: "Same day", n: "24/7 line", accent: "#A32C2C" },
  { name: "Free Browser Tools",img: "service-cms",  short: "Tools", href: null, tool: "/tools", icon: "toolbox", live: "43 tools", n: "no sign-up", accent: "#3B4A63" }
];

/* the eight things we build — one standard, one rate card */
const HOUSES = [
  { cls: "h0", href: "website-design", img: "service-website", icon: "code", state: "is-live", label: "Available now", name: "Websites & Landing Pages", sub: "3D, SEO-ready, PKR 14,000 flat.", subs: ["Business site", "Travel & Umrah", "Hotel & resort", "School & hospital"] },
  { cls: "h1", href: "ecommerce-store", img: "service-ecommerce", icon: "cart", state: "is-live", label: "Available now", name: "Stores & Marketplaces", sub: "COD, WhatsApp orders, stock, delivery.", subs: ["Fashion store", "Grocery & pharmacy", "Multi-vendor", "Courier tracking"] },
  { cls: "h2", href: "ai-agents", img: "service-ai-agents", icon: "bot", state: "is-live", label: "Available now", name: "AI Agents & Automation", sub: "Agents that reply, qualify and report.", subs: ["AI receptionist", "Voice AI", "WhatsApp bot", "Back-office automation"] },
  { cls: "h3", href: "android-app", img: "service-android", icon: "droid", state: "is-live", label: "Available now", name: "Mobile Apps", sub: "Android, iOS and Windows from one build.", subs: ["Android", "iOS", "Windows desktop", "PWA install"] },
  { cls: "h4", href: "management-system", img: "service-management", icon: "layers", state: "is-live", label: "Available now", name: "ERP & Management", sub: "Meters, stock, staff, ledger — on one screen.", subs: ["Fuel station", "School ERP", "Hospital ERP", "Dealership DMS"] },
  { cls: "h5", href: "pos-billing", img: "service-pos", icon: "calculator", state: "is-launching", label: "Launching next", name: "POS & Billing", sub: "Counter billing, ZATCA e-invoice, reports.", subs: ["Retail counter", "Restaurant", "Pharmacy", "VAT / ZATCA"] },
  { cls: "h6", href: "design-studio", img: "service-design", icon: "palette", state: "is-live", label: "Available now", name: "Brand & Design", sub: "Logo, kit, UI and product photography.", subs: ["Logo + kit", "UI design", "Social pack", "3D product art"] },
  { cls: "h7", href: null, tool: "/tools", img: "service-cms", icon: "toolbox", state: "is-soon", label: "Coming soon", name: "Hosting & Care", sub: "Managed hosting, backups, monthly care.", subs: ["Managed hosting", "Daily backups", "Uptime alerts", "Care plans"] }
];

/* what is already inside the published price */
const EXTRAS = [
  { href: null, tool: "/demos.html", img: "demo-surgical-a", title: "3 demo designs", sub: "Pick one before you pay" },
  { href: "website-design", img: "service-website", title: "Free domain — 1 year", sub: ".com or .pk, in your name" },
  { href: "website-design", img: "hero-ai", title: "Full SEO setup", sub: "Schema, sitemap, Search Console" },
  { href: "whatsapp-bot", img: "service-wa-bot", title: "WhatsApp ordering", sub: "Enquiries land in your inbox" },
  { href: "website-management", img: "service-cms", title: "Admin panel", sub: "Change every word yourself" },
  { href: null, tool: "/tools/internet-speed-test", img: "stock28", title: "Speed-tuned build", sub: "Core Web Vitals in the green" },
  { href: "design-studio", img: "service-design", title: "Training + handover", sub: "Video walkthrough, source code" },
  { href: "hacked-website-recovery", img: "stock9", title: "30 days after launch", sub: "Fixes and tweaks included" }
];

/* the stack a build ships on */
const STACK = [
  { img: "service-website", title: "Front end", sub: "React, Next.js, static-first HTML", price: "0.9s first paint" },
  { img: "service-cms", title: "Back end", sub: "Node, PHP, REST + webhooks", price: "hosted anywhere" },
  { img: "service-android", title: "Apps", sub: "Flutter / Android / iOS / PWA", price: "one codebase" },
  { img: "service-windows", title: "Cloud", sub: "AWS, Google Cloud, Firebase", price: "your account, your keys" }
];

/* seasonal build weeks — real dates, live countdown */
const OFFERS = [
  { id: "build-1111", img: "stock21", when: "11 Nov – 13 Nov", title: "11.11 Build Week", off: "Free domain + 1 year hosting", to: "2026-11-10T20:00:00+05:00", msg: "Assalam o Alaikum! 11.11 Build Week me meri website book karni hai." },
  { id: "winter-booking", img: "stock23", when: "1 Dec – 20 Dec", title: "Booking Season", off: "Salon · gym · hall calendar free", to: "2026-11-30T20:00:00+05:00", msg: "Assalam o Alaikum! Booking system chahiye — season se pehle." },
  { id: "eid-rush", img: "stock25", when: "Jan – Ramadan", title: "Eid & Ramadan Rush", off: "Order 2 sites, 2nd at PKR 9,000", to: "2027-01-14T20:00:00+05:00", msg: "Assalam o Alaikum! Eid se pehle meri site live karni hai." }
];

/* what goes on the rate card next */
const LAUNCHES = [
  { img: "stock24", state: "is-launching", label: "Launching next", name: "School ERP & Student Portal", sub: "Admissions, fees, attendance, SMS to parents.", href: "school-website" },
  { img: "stock41", state: "is-launching", label: "Launching next", name: "Clinic & Lab Reports", sub: "Appointment slots and report lookup by token.", href: "hospital-website" },
  { img: "stock37", state: "is-launching", label: "Launching next", name: "Hotel Channel Manager", sub: "Rooms, rates and booking directly on the site.", href: "hotel-website" },
  { img: "stock15", state: "is-launching", label: "Launching next", name: "Property CRM", sub: "Files, visits, booking amount and dealer cut.", href: "property-portal" },
  { img: "stock1", state: "is-live", label: "Taking orders", name: "Umrah Group Booking", sub: "Pakages, manifest and WhatsApp confirmation.", href: "travel-agency" },
  { img: "stock19", state: "is-live", label: "Taking orders", name: "Event & Wedding Vendor Site", sub: "Packages, availability calendar, enquiry form.", href: "event-wedding" },
  { img: "stock42", state: "is-live", label: "Taking orders", name: "Pharmacy Home Delivery", sub: "Order by WhatsApp, route-wise delivery list.", href: "pharmacy-store" },
  { img: "stock26", state: "is-soon", label: "Coming soon", name: "Coach & Fleet Booking", sub: "Seats, routes, panel and driver roster.", href: "car-dealer" },
  { img: "stock30", state: "is-soon", label: "Coming soon", name: "Real Estate Landing 3D", sub: "Fly-through, payment plan, booking form.", href: "property-portal" },
  { img: "stock17", state: "is-live", label: "Taking orders", name: "Masjid & Donation Kiosk", sub: "Monthly chanda, QR giving and transparent ledger.", href: "mosque-website" },
  { img: "stock35", state: "is-soon", label: "Coming soon", name: "Home Visit & Nurse Booking", sub: "Slots, staff profile, verified ratings.", href: "hospital-website" },
  { img: "stock14", state: "is-soon", label: "Coming soon", name: "Ticketing & Seating", sub: "Hall layout, seat map, QR gate pass.", href: "event-wedding" },
  { img: "stock22", state: "is-soon", label: "Coming soon", name: "Airport Transfer Booking", sub: "Pickup time, vehicle class, WhatsApp updates.", href: "travel-agency" },
  { img: "stock40", state: "is-live", label: "Taking orders", name: "Grocery & Wholesale Store", sub: "Bulk pricing, order list, rider assignment.", href: "ecommerce-store" },
  { img: "stock46", state: "is-soon", label: "Coming soon", name: "Hostel & PG Portal", sub: "Beds, mess, rent reminders, parent login.", href: "property-portal" },
  { img: "stock2", state: "is-live", label: "Taking orders", name: "Job & Gulf Recruitment Portal", sub: "Vacancies, CV upload, agent panel.", href: "job-portal" },
  { img: "stock31", state: "is-soon", label: "Coming soon", name: "Hajj Package Portal", sub: "Quota, group list, documents checklist.", href: "travel-agency" },
  { img: "stock25", state: "is-soon", label: "Coming soon", name: "Qurbani & Charity Order", sub: "Shares, weights, proof delivered on WhatsApp.", href: "donation-platform" },
  { img: "stock13", state: "is-soon", label: "Coming soon", name: "Resort & Beach Booking", sub: "Cabins, slots, seasonal rates, OTA sync.", href: "hotel-website" },
  { img: "stock29", state: "is-live", label: "Taking orders", name: "Law Firm Case Portal", sub: "Case status, hearing dates, document vault.", href: "law-firm" },
  { img: "stock10", state: "is-soon", label: "Coming soon", name: "Courier & Cargo Tracking", sub: "AWB tracking, hub-wise rates, rider app.", href: "courier-logistics" },
  { img: "stock38", state: "is-soon", label: "Coming soon", name: "Salon Chain App", sub: "Stylist roster, commission, membership wallet.", href: "salon-booking" },
  { img: "stock44", state: "is-soon", label: "Coming soon", name: "Builders & Material Quote", sub: "Quantity take-off, per-sq-ft rate, delivery plan.", href: "management-system" },
  { img: "stock43", state: "is-soon", label: "Coming soon", name: "Islamic School LMS", sub: "Nazra, ijazah records, parent progress card.", href: "lms-platform" }
];

/* how other people earn with us */
const PARTNERS = [
  { img: "stock18", icon: "brief", title: "White-label for agencies", sub: "We build, you invoice your client. 40% off list, your brand on the deck.", href: "contact" },
  { img: "stock12", icon: "users", title: "Referral partner", sub: "10% of the first invoice for every client who signs — paid on delivery day.", href: "contact" },
  { img: "stock34", icon: "grad", title: "Intern & trainee", sub: "Six-month paid track on live builds. Lahore office or remote.", href: "careers" },
  { img: "stock29", icon: "store", title: "City partner", sub: "Exclusive rights in your city for websites, POS and AI receptionist.", href: "contact" },
  { img: "stock16", icon: "code", title: "Freelance developers", sub: "Overflow work on our builds, fixed per-module rates, code review paid.", href: "contact" },
  { img: "stock28", icon: "layers", title: "POS & hardware reseller", sub: "Bundle our billing software with your counter hardware in your region.", href: "pos-billing" },
  { img: "stock35", icon: "bot", title: "AI agent channel", sub: "Sell the receptionist agent to clinics and salons on monthly revenue share.", href: "ai-receptionist" },
  { img: "stock9", icon: "building", title: "Co-working & office space", sub: "Bring a team into our Lahore floor for a project — desk, power, fibre.", href: "contact" }
];

/* full-bleed scene bands between the rails */
const SCENES = [
  { img: "stock18", eyebrow: "How a build actually runs", h1: "The moment", h2: "the demo opens", copy: "Three complete designs of YOUR business, in your language, inside 24 hours of the first WhatsApp message. Pick one and we finish it.", cta: "See the live demos", href: null, tool: "/demos.html" },
  { img: "stock14", eyebrow: "After launch", h1: "Handover", h2: "is the real test", copy: "Domain in your name, hosting in your account, source code zipped and sent, one training video, and a developer on WhatsApp who answers.", cta: "Read the guarantees", href: "about" },
  { img: "stock31", eyebrow: "Clients we build for", h1: "From Sukkur", h2: "to Makkah", copy: "Travel agencies, shaadi halls, clinics, pharmacies and mosques in 33 cities across Pakistan, Saudi Arabia and the UAE — same rate, same standard." , cta: "See the cities", href: "contact" }
];

/* the films rail — our own live builds and screens */
const FILMS = [
  { img: "demo-travel", cap: "Wafa Travel — live booking demo", href: null, tool: "/demo4" },
  { img: "demo-erp-en", cap: "Fuel station ERP — English dashboard", href: null, tool: "/demo20" },
  { img: "demo-erp-ur", cap: "The same ERP, right-to-left in Urdu", href: null, tool: "/demo21" },
  { img: "demo-surgical-a", cap: "Surgical exports — Demo A, Classic Blue", href: null, tool: "/demo30" },
  { img: "demo-surgical-b", cap: "Surgical exports — Demo B, Golden Luxe", href: null, tool: "/demo31" },
  { img: "demo-surgical-c", cap: "Surgical exports — Demo C, Modern Minimal", href: null, tool: "/demo32" },
  { img: "demo-realestate", cap: "Property portal — file search", href: null, tool: "/demo40" },
  { img: "demo-group-a", cap: "Group booking site — style A", href: null, tool: "/demo41" },
  { img: "demo-group-b", cap: "Group booking site — style B", href: null, tool: "/demo42" },
  { img: "stock1", cap: "Umrah & Hajj groups, season after season", href: "travel-agency" },
  { img: "stock7", cap: "Private jet charter desk, PKR quotes", href: "travel-agency" },
  { img: "stock23", cap: "Resort and pool bookings without OTA fees", href: "hotel-website" },
  { img: "stock15", cap: "Property files, visits and booking amounts", href: "property-portal" },
  { img: "stock21", cap: "Fashion store — COD and WhatsApp orders", href: "ecommerce-store" },
  { img: "stock24", cap: "School admissions and fee reminders", href: "school-website" },
  { img: "stock41", cap: "Clinic tokens and lab report lookup", href: "hospital-website" },
  { img: "stock42", cap: "Pharmacy orders straight to the rider", href: "pharmacy-store" },
  { img: "stock26", cap: "Coach and fleet seat booking", href: "car-dealer" }
];

/* where we physically are */
const OFFICES = [
  { img: "stock9", city: "Lahore", flag: "open", note: "Head office — Sharqpur Road. Walk in, see the build on screen, then decide.", sub: "Mon–Sat · 10:00–19:00", wa: "Assalam o Alaikum! Main Lahore office aa kar baat karna chahta hoon." },
  { img: "stock2", city: "Karachi", flag: "remote", note: "Full-time clients on WhatsApp and video — same team, same rate, no travel bill.", sub: "Cloudbase · remote-first", wa: "Assalam o Alaikum! Karachi ke liye project discuss karna hai." },
  { img: "stock32", city: "Riyadh & Dubai", flag: "gcc", note: "Arabic UI, ZATCA e-invoicing and AED/SAR invoicing for Gulf clients.", sub: "ZATCA-aware · GST-ready", wa: "Assalam o Alaikum! Saudi / UAE ke liye website chahiye." }
];

const OFFICE_FILMS = [
  { img: "stock18", cap: "The build floor — three demos open on the wall", tag: "Lahore" },
  { img: "stock3", cap: "Scope written before a line of code", tag: "Every project" },
  { img: "stock28", cap: "A phone call answered by the AI receptionist", tag: "Live demo" },
  { img: "stock8", cap: "Maps, routes and delivery plans on the table", tag: "Logistics builds" }
];

/* how fast a first demo lands, by city */
const CITYDAY = {
  quick: ["Lahore", "Kasur", "Sheikhupura", "Nankana Sahib"],
  day: ["Karachi", "Islamabad", "Rawalpindi", "Faisalabad", "Multan", "Gujranwala", "Sialkot", "Sargodha", "Bahawalpur", "Hyderabad", "Peshawar", "Abbottabad"],
  gulf: ["Dubai", "Abu Dhabi", "Sharjah", "Ajman", "Al Ain", "Ras Al Khaimah", "Riyadh", "Jeddah", "Makkah", "Madinah", "Dammam", "Khobar"]
};

const guarantees = [  ["brief", "Fixed rates from PKR 14,000", "Written quote — kabhi nahi badlega"],

  ["check", "Domain FREE (1 year)", ".com ya .pk, registration aapke naam"],
  ["spark", "3 demo designs before build", "Jo pasand aaye — usi me complete karenge"],
  ["shield", "100% source code handover", "Hosting, admin, code — sab aapki malkiyat"]
];

module.exports = { PRICE, FIXED, TIERS, SERVICE_PRICES, DEMOS, LIVEDEMOS, brand, contact, hero, stats, trust, trustBadges, whyUs, process, services, recovery, packages, addons, portfolio, testimonials, faqs, blog, guarantees, PORTALS, HOUSES, EXTRAS, STACK, OFFERS, LAUNCHES, PARTNERS, SCENES, FILMS, OFFICES, OFFICE_FILMS, CITYDAY };
