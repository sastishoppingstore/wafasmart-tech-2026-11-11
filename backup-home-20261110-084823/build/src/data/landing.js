// ============================================================
// WAFA SMART TECH — 15 location / keyword landing pages
// Consumed by build/build.js → writes top-level .html pages
// ============================================================

const PRODUCTS = {
  website: { img: "service-website", icon: "code", title: "Business Website", price: 14000, desc: "Corporate sites, landing pages & portfolios.", red: false },
  ecommerce: { img: "service-ecommerce", icon: "cart", title: "E-commerce Store", price: 20000, desc: "Online store with payments & delivery.", red: false },
  management: { img: "service-management", icon: "layers", title: "Management System", price: 20000, desc: "ERP, CRM, portals & booking systems.", red: false },
  ai: { img: "service-ai-agents", icon: "brain", title: "AI Agent", price: 23500, desc: "WhatsApp, email & CRM on autopilot.", red: false },
  voice: { img: "service-voice", icon: "phone", title: "Voice AI Agent", price: 23500, desc: "Urdu & English calls, 24/7.", red: false },
  app: { img: "service-android", icon: "phone", title: "Mobile App", price: 30000, desc: "Android, iOS & Windows builds.", red: false },
  recovery: { img: "service-management", icon: "shield", title: "Hacked? Recovery", price: 5000, desc: "Website, PHP & WhatsApp rescue.", red: true },
  lms: { img: "service-lms", icon: "brief", title: "LMS Platform", price: 20000, desc: "Courses, quizzes & student portals.", red: false },
  booking: { img: "service-travel", icon: "globe", title: "Booking Website", price: 20000, desc: "Travel, hotel & appointment bookings.", red: false },
  school: { img: "service-school", icon: "award", title: "School Portal", price: 20000, desc: "Admissions, fees & result portals.", red: false },
  hospital: { img: "service-hospital", icon: "shield", title: "Hospital Website", price: 20000, desc: "OPD, doctors & appointment booking.", red: false },
  waBot: { img: "service-wa-bot", icon: "wa", title: "WhatsApp Chatbot", price: 23500, desc: "Auto-reply, catalog & order flow.", red: false },
  seo: { img: "service-design", icon: "chart", title: "SEO-Ready Website", price: 14000, desc: "Local SEO, speed & schema built in.", red: false },
  design: { img: "service-design", icon: "pen", title: "Brand & UI Design", price: 14000, desc: "Logo, identity & 3D landing pages.", red: false }
};

const LANDING = [
  {
    slug: "web-development-lahore",
    city: "Lahore",
    region: "Punjab, Pakistan",
    service: "web development",
    h1: "Web Development in Lahore — Fixed Rates, 3 Free Demos",
    kicker: "Lahore · Web Development",
    sub: "Custom, SEO-ready websites built in Lahore from PKR 14,000. AWS & Google certified team, 3 demo designs before you pay the second half, free domain and full source code.",
    metaTitle: "Web Development in Lahore — Fixed PKR 14,000 | Wafa Smart Tech",
    metaDesc: "Web development in Lahore at fixed rates from PKR 14,000. 3 free demos, free domain, source code. Lahore-Sharqpur Road office · WhatsApp 0324 6627054.",
    introTitle: "A Lahore web team that quotes once — and sticks to it",
    intro1: "Lahore businesses are tired of 300K quotes for a five-page website. We publish the rate card instead: PKR 14,000 for a business website, PKR 20,000 with a management portal, and everything written before we start.",
    intro2: "From our Lahore-Sharqpur Road office we build fast, mobile-first sites for shops in Liberty, clinics in DHA and startups in Johar Town — with local SEO, WhatsApp ordering and a free domain in your own name.",
    features: [
      { icon: "bolt", t: "Built for Lahore buyers", d: "Local SEO, Google Business Profile and city landing pages so customers in your area actually find you." },
      { icon: "phone", t: "Mobile-first, 3G-fast", d: "Most Lahore traffic is mobile. Every page is tested at 320–430px and loads under three seconds on 3G." },
      { icon: "shield", t: "You own everything", d: "Domain, hosting account, admin access and source code are handed over. No lock-in, no monthly ransom." }
    ],
    packages: [
      { n: "Business Website", p: 14000, sub: "4–10 days · domain free", feats: ["5–8 responsive pages", "3 demo designs", "Local SEO + schema", "WhatsApp order flow"], pop: false },
      { n: "Website + Management", p: 20000, sub: "8–14 days · CMS included", feats: ["Admin dashboard", "Blog / catalog manager", "Lead inbox + exports", "Free domain 1 year"], pop: true },
      { n: "E-commerce Store", p: 20000, sub: "8–14 days · payments", feats: ["Product + order manager", "JazzCash / bank transfer", "Delivery & courier flow", "Source code handover"], pop: false }
    ],
    areas: ["Gulberg", "DHA Lahore", "Johar Town", "Model Town", "Bahria Town", "Iqbal Town", "Cantt", "Wapda Town"],
    faqs: [
      { q: "How much does web development cost in Lahore?", a: "Business websites start at PKR 14,000 fixed. A website with a management portal is PKR 20,000, AI or voice agents are PKR 23,500, and mobile apps start at PKR 30,000. The quote is written before work starts — no hidden charges." },
      { q: "Can we meet at your Lahore office?", a: "Yes. We are at Lahore-Sharqpur Road, near 20 km, Lahore. WhatsApp 0324 6627054 first so we keep the meeting focused on your scope." },
      { q: "How long does a Lahore website take?", a: "Most business sites go live in 4–10 days after the 50% advance and content. Management systems take 8–14 days, apps 10–21 days. The delivery date is written in the quote." },
      { q: "Do you provide SEO and Google Business setup?", a: "Every site includes on-page SEO, schema, sitemap, SSL and speed work. Google Business Profile setup and local citations are included on the growth package." }
    ],
    cube: ["website", "ecommerce", "ai", "recovery"],
    related: ["website-design-lahore", "ecommerce-website-lahore", "mobile-app-development-lahore"]
  },
  {
    slug: "website-design-lahore",
    city: "Lahore",
    region: "Punjab, Pakistan",
    service: "website design",
    h1: "Website Design in Lahore — 3D, Mobile-First, 3 Free Demos",
    kicker: "Lahore · Website Design",
    sub: "Premium 3D website design in Lahore with gold, red and green accents on deep navy. Three complete demo designs, fixed PKR 14,000, free domain and source code.",
    metaTitle: "Website Design in Lahore — 3D Designs, PKR 14,000 | Wafa Smart Tech",
    metaDesc: "Website design in Lahore from PKR 14,000. 3D animated, mobile-first, Sora + Manrope typography, 3 free demos, free domain, source code. WhatsApp 0324 6627054.",
    introTitle: "Design that looks expensive — on a fixed rate",
    intro1: "We design in the browser, not in a template. Every Lahore project starts with three complete demo designs: Classic Blue, Golden Luxe and Modern Minimal — you pick the one that fits your brand.",
    intro2: "The current WAFA house style is a dark navy canvas with gold, red and green accents, Sora headings and Manrope body text. That same 3D polish is applied to clinics, boutiques, builders and academies across Lahore.",
    features: [
      { icon: "spark", t: "3 real demos, not mockups", d: "You see your own content in three finished styles before committing to the final build." },
      { icon: "phone", t: "Mobile-first by default", d: "Designed at 320px first, then scaled up — 70% of your visitors will never see the desktop layout." },
      { icon: "bolt", t: "Motion with taste", d: "Subtle 3D tilt, scroll reveals and a rotating product cube — all disabled automatically for reduced-motion users." }
    ],
    packages: [
      { n: "Landing Page Design", p: 14000, sub: "4–7 days · one page", feats: ["3D hero + product cube", "Copy polish included", "WhatsApp CTA flow", "Free domain 1 year"], pop: false },
      { n: "Full Website Design", p: 14000, sub: "5–10 days · 5–8 pages", feats: ["3 demo directions", "3D cards + animations", "On-page SEO + schema", "Source code handover"], pop: true },
      { n: "Brand + Website", p: 20000, sub: "8–14 days · identity", feats: ["Logo + colour system", "3D design system", "Social kit included", "Admin editable pages"], pop: false }
    ],
    areas: ["Gulberg", "DHA Lahore", "Johar Town", "Model Town", "Bahria Town", "Iqbal Town", "Cantt", "Wapda Town"],
    faqs: [
      { q: "What does website design cost in Lahore?", a: "Design-led landing pages and full business sites start at PKR 14,000 fixed. Brand identity plus website is PKR 20,000. All packages include three demo directions and a free domain." },
      { q: "Do I get to choose the design before paying?", a: "You pay 50% to start, then receive three complete demo designs of your project. Pick one and we finish it in that style; if none fit, we rework the direction before the final build." },
      { q: "Will the 3D effects slow my site down?", a: "No. The effects are CSS transforms and a small vanilla-JS file — no heavy libraries. They are tuned for mobile and automatically disabled under prefers-reduced-motion." },
      { q: "Can you redesign my existing Lahore website?", a: "Yes. We audit the current site, keep what ranks, and rebuild the design on a faster, mobile-first foundation. Existing URLs can be preserved with redirects." }
    ],
    cube: ["design", "website", "ecommerce", "ai"],
    related: ["web-development-lahore", "ecommerce-website-lahore", "seo-services-lahore"]
  },
  {
    slug: "ecommerce-website-lahore",
    city: "Lahore",
    region: "Punjab, Pakistan",
    service: "e-commerce website",
    h1: "E-commerce Website in Lahore — Sell on WhatsApp & Web",
    kicker: "Lahore · E-commerce",
    sub: "Online store development in Lahore from PKR 20,000: product catalog, cart, COD, bank transfer, courier flow and a WhatsApp order button on every product.",
    metaTitle: "E-commerce Website in Lahore — PKR 20,000 Fixed | Wafa Smart Tech",
    metaDesc: "E-commerce website development in Lahore from PKR 20,000. Product catalog, COD, delivery, WhatsApp orders, admin dashboard. 3 demos, free domain, source code.",
    introTitle: "An online store your Lahore customers can actually use",
    intro1: "Most local stores lose orders at checkout. We build a fast catalog, a two-step cart and a WhatsApp fallback so a customer in Johar Town can order without creating an account.",
    intro2: "The admin panel lets you add products, change prices, mark orders delivered and export a CSV — no developer needed for daily work. Payments can be COD, bank transfer or a gateway.",
    features: [
      { icon: "cart", t: "Checkout that converts", d: "Guest checkout, COD, bank transfer and a WhatsApp order path for customers who prefer chat." },
      { icon: "layers", t: "Admin you can run", d: "Add products, manage stock, print order slips and export sales — from your phone." },
      { icon: "chart", t: "SEO for product search", d: "Product schema, clean URLs, category pages and city landing pages built in." }
    ],
    packages: [
      { n: "Starter Store", p: 20000, sub: "8–12 days · up to 100 products", feats: ["Catalog + cart", "COD / bank transfer", "WhatsApp order button", "Admin + exports"], pop: false },
      { n: "Growth Store", p: 20000, sub: "10–14 days · full flow", feats: ["Courier + tracking notes", "Discount codes", "Product SEO + schema", "Free domain 1 year"], pop: true },
      { n: "Store + AI Agent", p: 23500, sub: "12–18 days · automation", feats: ["Abandoned cart follow-up", "WhatsApp auto-replies", "Order status bot", "Review requests"], pop: false }
    ],
    areas: ["Gulberg", "DHA Lahore", "Johar Town", "Model Town", "Bahria Town", "Iqbal Town", "Cantt", "Wapda Town"],
    faqs: [
      { q: "How much does an e-commerce website cost in Lahore?", a: "A complete store starts at PKR 20,000 fixed, including catalog, cart, COD/bank transfer, WhatsApp ordering and an admin panel. Adding an AI follow-up agent is PKR 23,500." },
      { q: "Can I take payments online?", a: "Yes. We integrate bank transfer, JazzCash/EasyPaisa manual verification or a card gateway if your business has a merchant account. COD remains the most-used option in Lahore." },
      { q: "Who adds the products?", a: "We load the first batch for you and record a short Urdu/English handover video. After that you add products from the admin panel in under a minute each." },
      { q: "Do you connect couriers?", a: "We build the order status and tracking flow and can wire a courier API if you already have an account. Otherwise the admin prints slips and you paste tracking numbers." }
    ],
    cube: ["ecommerce", "website", "waBot", "ai"],
    related: ["web-development-lahore", "website-design-lahore", "whatsapp-chatbot-pakistan"]
  },
  {
    slug: "mobile-app-development-lahore",
    city: "Lahore",
    region: "Punjab, Pakistan",
    service: "mobile app development",
    h1: "Mobile App Development in Lahore — Android & iOS from PKR 30,000",
    kicker: "Lahore · Mobile Apps",
    sub: "Custom Android, iOS and Windows apps built in Lahore. Fixed PKR 30,000 for Android/Windows, PKR 35,000 for iOS. Store submission, source code and 30-day support included.",
    metaTitle: "Mobile App Development Lahore — PKR 30,000 Fixed | Wafa Smart Tech",
    metaDesc: "Mobile app development in Lahore from PKR 30,000. Android, iOS & Windows, store submission, secure backend, source code. 3 demos, fixed rate.",
    introTitle: "Apps for Lahore businesses that live on a phone",
    intro1: "If your staff already runs the business from WhatsApp, an app is the next step: bookings, orders, attendance, delivery tracking or a customer-facing catalog that works offline.",
    intro2: "We build with a shared codebase where possible, keep the backend simple, and submit to Google Play or the App Store for you. The source code and store accounts stay in your name.",
    features: [
      { icon: "phone", t: "Android, iOS, Windows", d: "One team for all three. Android/Windows from PKR 30,000, iOS from PKR 35,000." },
      { icon: "shield", t: "Secure by default", d: "Role-based logins, encrypted traffic, OTP flows and no secrets shipped inside the app." },
      { icon: "bolt", t: "Store submission done", d: "Screenshots, privacy policy, data-safety forms and review replies handled until the app is live." }
    ],
    packages: [
      { n: "Android App", p: 30000, sub: "10–21 days · Play Store", feats: ["Up to 8 screens", "Login + push", "Secure API backend", "Store submission"], pop: false },
      { n: "iOS App", p: 35000, sub: "12–21 days · App Store", feats: ["Native iOS build", "Apple review handling", "Push + analytics", "Source code handover"], pop: true },
      { n: "App + Admin Panel", p: 30000, sub: "14–21 days · web admin", feats: ["Customer app", "Web admin dashboard", "Reports + exports", "30-day support"], pop: false }
    ],
    areas: ["Gulberg", "DHA Lahore", "Johar Town", "Model Town", "Bahria Town", "Iqbal Town", "Cantt", "Wapda Town"],
    faqs: [
      { q: "How much does mobile app development cost in Lahore?", a: "Android or Windows apps start at PKR 30,000 fixed; iOS starts at PKR 35,000. A combined app plus web admin is also PKR 30,000 for the base scope. Exact screens are quoted upfront." },
      { q: "Do you publish the app to the Play Store?", a: "Yes. We prepare the listing, screenshots, privacy policy and data-safety forms, submit the app and handle review feedback. The developer account stays in your name." },
      { q: "Can the app work offline?", a: "Yes, for catalogs, attendance and field data we can cache locally and sync when the phone is back online." },
      { q: "How long does an app take?", a: "A focused business app takes 10–21 days after content and API access are ready. Complex dashboards and payment flows get a written milestone plan." }
    ],
    cube: ["app", "management", "ai", "recovery"],
    related: ["web-development-lahore", "ai-automation-lahore", "ecommerce-website-lahore"]
  },
  {
    slug: "ai-automation-lahore",
    city: "Lahore",
    region: "Punjab, Pakistan",
    service: "AI automation",
    h1: "AI Automation in Lahore — Agents, Chatbots & Voice from PKR 23,500",
    kicker: "Lahore · AI Automation",
    sub: "AI agents that answer WhatsApp, qualify leads, book appointments and follow up — built in Lahore from PKR 23,500 fixed. Human handover and full transcripts included.",
    metaTitle: "AI Automation in Lahore — AI Agents PKR 23,500 | Wafa Smart Tech",
    metaDesc: "AI automation in Lahore from PKR 23,500. WhatsApp agents, voice AI, AI receptionist, CRM follow-ups. Fixed rate, 3 demos, human handover. WhatsApp 0324 6627054.",
    introTitle: "Stop losing leads at 2 AM",
    intro1: "A Lahore clinic, gym or property office gets messages after hours. An AI agent replies in Urdu or English, asks the qualifying questions, books the slot and hands over to a human when the conversation needs one.",
    intro2: "We wire the agent into WhatsApp Business, your inbox or CRM, and keep a full transcript. You see exactly what it said, and you can pause it any time from the admin panel.",
    features: [
      { icon: "brain", t: "Trained on your business", d: "Your prices, timings, services and objection handling — not a generic chatbot." },
      { icon: "wa", t: "WhatsApp-first", d: "Official WhatsApp Business flow, quick replies and a human handover trigger." },
      { icon: "chart", t: "Reports that matter", d: "Leads captured, bookings made, response time and handover reasons in one dashboard." }
    ],
    packages: [
      { n: "AI Receptionist", p: 23500, sub: "5–8 days · WhatsApp + calls", feats: ["Urdu & English replies", "Lead qualification", "Booking handover", "Transcript dashboard"], pop: false },
      { n: "Voice AI Agent", p: 23500, sub: "7–10 days · inbound calls", feats: ["Natural voice", "Call recording + summary", "Outbound reminders", "CRM sync"], pop: true },
      { n: "Agent + CRM Setup", p: 23500, sub: "8–12 days · full pipeline", feats: ["Lead pipeline", "Auto follow-ups", "Team notifications", "Monthly care optional"], pop: false }
    ],
    areas: ["Gulberg", "DHA Lahore", "Johar Town", "Model Town", "Bahria Town", "Iqbal Town", "Cantt", "Wapda Town"],
    faqs: [
      { q: "How much does AI automation cost in Lahore?", a: "AI agents, voice agents and AI receptionists are PKR 23,500 fixed. That includes setup, training on your content, WhatsApp/call integration, transcripts and 30-day support." },
      { q: "Will the AI sound robotic?", a: "The voice agent uses natural Urdu and English voices with short, human-style sentences. You can listen to a test call before the full build." },
      { q: "What happens when the AI cannot answer?", a: "It triggers a human handover, tags the conversation and sends your team a notification with the full transcript. Nothing is lost." },
      { q: "Does it work with my existing WhatsApp number?", a: "Yes, through the official WhatsApp Business API. We set up the number, templates and verification; the number stays in your business name." }
    ],
    cube: ["ai", "voice", "waBot", "website"],
    related: ["web-development-lahore", "ai-agents-pakistan", "whatsapp-chatbot-pakistan"]
  },
  {
    slug: "seo-services-lahore",
    city: "Lahore",
    region: "Punjab, Pakistan",
    service: "SEO services",
    h1: "SEO Services in Lahore — Local SEO Built Into Every Site",
    kicker: "Lahore · SEO",
    sub: "Technical SEO, local citations and content for Lahore businesses. SEO-ready websites from PKR 14,000, monthly care from PKR 5,000, and no fake ranking promises.",
    metaTitle: "SEO Services in Lahore — Local SEO from PKR 14,000 | Wafa Smart Tech",
    metaDesc: "SEO services in Lahore: technical SEO, local citations, schema, speed and content. SEO-ready websites from PKR 14,000. Google Business setup. WhatsApp 0324 6627054.",
    introTitle: "Rank for the searches your customers actually type",
    intro1: "“Web development in Lahore”, “best dentist in DHA”, “school admission Johar Town” — local search is specific. We build pages around those intents instead of stuffing one homepage with keywords.",
    intro2: "Every site we ship includes clean URLs, schema, sitemap, image compression, mobile speed work and a Google Business Profile setup. Monthly care adds content, backlinks and rank reports.",
    features: [
      { icon: "chart", t: "Technical first", d: "Core Web Vitals, crawlability, schema, canonical tags and internal links fixed before content." },
      { icon: "pin", t: "Local signals", d: "Google Business Profile, NAP consistency, city pages and review flow for Lahore neighbourhoods." },
      { icon: "pen", t: "Content that answers", d: "Service pages, FAQs and blog articles written around real buying questions — not keyword soup." }
    ],
    packages: [
      { n: "SEO-Ready Website", p: 14000, sub: "4–10 days · build + SEO", feats: ["Schema + sitemap", "Speed optimisation", "Local on-page SEO", "Google Business setup"], pop: true },
      { n: "SEO + Management", p: 20000, sub: "8–14 days · CMS", feats: ["Editable pages", "Blog system", "Internal linking", "Lead tracking"], pop: false },
      { n: "Monthly Care", p: 5000, sub: "per month · optional", feats: ["Content updates", "Backups + security", "Rank report", "Priority support"], pop: false }
    ],
    areas: ["Gulberg", "DHA Lahore", "Johar Town", "Model Town", "Bahria Town", "Iqbal Town", "Cantt", "Wapda Town"],
    faqs: [
      { q: "How much do SEO services cost in Lahore?", a: "A technically SEO-ready website starts at PKR 14,000 fixed. Monthly care — updates, backups, content and reports — is PKR 5,000/month. There is no lock-in; cancel any month." },
      { q: "How long until I rank on Google?", a: "Local long-tail keywords often move in 4–8 weeks after indexing; competitive terms take 3–6 months. We report positions and traffic, and we never promise a #1 spot." },
      { q: "Do you guarantee first-page rankings?", a: "No honest agency can. We guarantee the technical work, the content plan and transparent reporting. Rankings depend on competition, reviews and how consistently you publish." },
      { q: "Is Google Business Profile included?", a: "Yes on the SEO-ready package: profile setup, categories, service areas, photos and a review request flow." }
    ],
    cube: ["seo", "website", "management", "ai"],
    related: ["web-development-lahore", "website-design-lahore", "ecommerce-website-lahore"]
  },
  {
    slug: "web-development-karachi",
    city: "Karachi",
    region: "Sindh, Pakistan",
    service: "web development",
    h1: "Web Development in Karachi — Fixed Rates, Remote-Friendly",
    kicker: "Karachi · Web Development",
    sub: "Karachi businesses get the same fixed Lahore rate card: websites from PKR 14,000, e-commerce from PKR 20,000, AI agents 23,500. Daily WhatsApp updates, no travel needed.",
    metaTitle: "Web Development in Karachi — Fixed PKR 14,000 | Wafa Smart Tech",
    metaDesc: "Web development in Karachi at fixed rates from PKR 14,000. E-commerce, portals, AI agents, apps. Remote delivery, daily updates, 3 free demos.",
    introTitle: "Lahore-built websites, Karachi-level hustle",
    intro1: "Distance is not a problem. Our Karachi clients get the same written quote, three demo designs and delivery dates as our Lahore walk-ins — with daily WhatsApp updates and screen recordings.",
    intro2: "We build for Clifton boutiques, DHA clinics, Gulshan restaurants and Saddar wholesalers: mobile-first, fast on 3G, with WhatsApp ordering and Urdu/English content.",
    features: [
      { icon: "wa", t: "Remote but personal", d: "Daily WhatsApp updates, Loom-style walkthroughs and a named project lead — no ticket queue." },
      { icon: "bolt", t: "Fast on Karachi mobile", d: "Optimised images, light CSS and no bloated libraries so your site opens on a crowded 3G network." },
      { icon: "shield", t: "You own the accounts", d: "Domain, hosting and source code are registered in your name from day one." }
    ],
    packages: [
      { n: "Business Website", p: 14000, sub: "4–10 days · domain free", feats: ["5–8 responsive pages", "3 demo designs", "Local SEO setup", "WhatsApp ordering"], pop: false },
      { n: "E-commerce Store", p: 20000, sub: "8–14 days · COD ready", feats: ["Catalog + cart", "COD / bank transfer", "Courier workflow", "Admin dashboard"], pop: true },
      { n: "Website + AI Agent", p: 23500, sub: "10–16 days · automation", feats: ["Lead capture bot", "Auto follow-ups", "CRM pipeline", "Human handover"], pop: false }
    ],
    areas: ["Clifton", "DHA Karachi", "Gulshan-e-Iqbal", "PECHS", "North Nazimabad", "Korangi", "Federal B Area", "Saddar"],
    faqs: [
      { q: "How much does a website cost in Karachi?", a: "Business websites start at PKR 14,000 fixed; e-commerce and management portals are PKR 20,000; AI agents are PKR 23,500. The rate is the same for Karachi and Lahore." },
      { q: "Can you work fully remotely?", a: "Yes. Most Karachi projects are delivered remotely with daily WhatsApp updates, a shared folder and a final screen-share handover." },
      { q: "Do you understand Karachi courier and COD workflows?", a: "Yes. We build order status, COD reconciliation notes and tracking flows used by local couriers, and can integrate an API if you have an account." },
      { q: "What about Urdu content?", a: "We build Urdu, Roman Urdu and English content with proper RTL styling and Nastaliq font support." }
    ],
    cube: ["website", "ecommerce", "ai", "app"],
    related: ["web-development-lahore", "ecommerce-website-lahore", "whatsapp-chatbot-pakistan"]
  },
  {
    slug: "web-development-islamabad",
    city: "Islamabad",
    region: "Federal Capital, Pakistan",
    service: "web development",
    h1: "Web Development in Islamabad — Corporate Sites from PKR 14,000",
    kicker: "Islamabad · Web Development",
    sub: "Corporate websites, portals and AI tools for Islamabad businesses from PKR 14,000. Fixed rates, 3 demos, source code handover, and meetings in Blue Area on request.",
    metaTitle: "Web Development in Islamabad — PKR 14,000 Fixed | Wafa Smart Tech",
    metaDesc: "Web development in Islamabad from PKR 14,000. Corporate sites, portals, AI agents and apps at fixed rates. 3 free demos, free domain, source code.",
    introTitle: "Corporate polish for the capital",
    intro1: "Islamabad buyers check credentials before they check prices. We lead with AWS and Google certification, a written rate card and a real delivery schedule — then build a site that looks the part.",
    intro2: "We work with consultancies in Blue Area, clinics in F-8, schools in F-11 and tech teams in DHA Islamabad. Every build is mobile-first, accessible and handover-ready.",
    features: [
      { icon: "award", t: "Credential-first", d: "AWS & Google certified team, IT Ministry experience, ZATCA-registered KSA work — verifiable, not borrowed badges." },
      { icon: "brief", t: "Procurement-friendly", d: "Written scope, fixed quote, invoice and handover documents your admin team can file." },
      { icon: "shield", t: "Security reviewed", d: "Hardened forms, role-based admin, HTTPS, backups and a clean handover checklist." }
    ],
    packages: [
      { n: "Corporate Website", p: 14000, sub: "5–10 days · 8 pages", feats: ["3 demo designs", "Team + services pages", "SEO + schema", "Free domain 1 year"], pop: true },
      { n: "Portal / Management", p: 20000, sub: "8–14 days · admin", feats: ["Role-based admin", "Lead / case tracking", "Reports + exports", "Source code handover"], pop: false },
      { n: "AI + Website", p: 23500, sub: "10–16 days · automation", feats: ["AI receptionist", "Lead qualification", "CRM integration", "Monthly care optional"], pop: false }
    ],
    areas: ["Blue Area", "F-6", "F-7", "F-8", "F-10", "F-11", "DHA Islamabad", "Bahria Islamabad"],
    faqs: [
      { q: "How much does web development cost in Islamabad?", a: "Corporate websites start at PKR 14,000 fixed. Management portals are PKR 20,000, AI agents PKR 23,500, and apps from PKR 30,000. Quotes are written before work begins." },
      { q: "Can we get a formal invoice and contract?", a: "Yes. Every project gets a written scope, fixed quote, payment schedule and handover document suitable for company records." },
      { q: "Do you meet in Islamabad?", a: "We are based in Lahore but can schedule meetings in Blue Area or online. Most clients prefer WhatsApp plus a screen-share." },
      { q: "Do you work with government or NGO vendors?", a: "Yes, with clear procurement paperwork. We keep the source code and documentation ready for audit." }
    ],
    cube: ["website", "management", "ai", "recovery"],
    related: ["web-development-lahore", "web-development-rawalpindi", "ai-agents-pakistan"]
  },
  {
    slug: "web-development-faisalabad",
    city: "Faisalabad",
    region: "Punjab, Pakistan",
    service: "web development",
    h1: "Web Development in Faisalabad — Textile & B2B Websites",
    kicker: "Faisalabad · Web Development",
    sub: "Websites for Faisalabad textile exporters, wholesalers and local brands from PKR 14,000. Product catalogs, inquiry forms, Urdu content and fixed rates.",
    metaTitle: "Web Development in Faisalabad — PKR 14,000 Fixed | Wafa Smart Tech",
    metaDesc: "Web development in Faisalabad from PKR 14,000. Textile catalogs, B2B inquiry sites, e-commerce and portals. 3 free demos, free domain, source code.",
    introTitle: "B2B websites that survive an export inquiry",
    intro1: "Faisalabad buyers ask for a catalog, a specification sheet and a quick reply. We build clean product catalogs with inquiry forms, WhatsApp handoff and English/Urdu content that loads fast in the factory office.",
    intro2: "From D Ground to Susan Road, we work with textile houses, dyeing units, wholesalers and new D2C brands. Fixed prices, three demos and a handover video for your team.",
    features: [
      { icon: "layers", t: "Catalog-first structure", d: "Categories, specs, MOQ notes and inquiry forms built for B2B buyers." },
      { icon: "globe", t: "Export-ready", d: "English copy, WhatsApp Business, email routing and optional Arabic version for Gulf buyers." },
      { icon: "bolt", t: "Fast on factory internet", d: "Compressed images and light pages that open even on a weak connection." }
    ],
    packages: [
      { n: "B2B Website", p: 14000, sub: "5–10 days · catalog", feats: ["Product categories", "Inquiry + WhatsApp", "Company profile pages", "Free domain 1 year"], pop: true },
      { n: "Catalog + Admin", p: 20000, sub: "8–14 days · editable", feats: ["Add products yourself", "PDF spec uploads", "Lead inbox", "Source code handover"], pop: false },
      { n: "E-commerce Store", p: 20000, sub: "10–14 days · COD", feats: ["Cart + checkout", "COD / bank transfer", "Order dashboard", "Courier workflow"], pop: false }
    ],
    areas: ["D Ground", "People's Colony", "Gulberg Faisalabad", "Canal Road", "Susan Road", "Madina Town", "Jaranwala Road", "Sargodha Road"],
    faqs: [
      { q: "How much does a website cost in Faisalabad?", a: "A catalog-style B2B website starts at PKR 14,000 fixed. An editable catalog with admin is PKR 20,000, and a full e-commerce store is also PKR 20,000." },
      { q: "Can you handle large product catalogs?", a: "Yes. We structure categories, compress images and can import a CSV of products. Admin lets your team add or hide items without a developer." },
      { q: "Do you provide English and Urdu?", a: "Yes. Product copy can be English, Urdu or both, with correct RTL layout for Urdu." },
      { q: "Can buyers send inquiries on WhatsApp?", a: "Every product page can open WhatsApp with the product name and SKU pre-filled, so your sales team sees context immediately." }
    ],
    cube: ["website", "ecommerce", "management", "design"],
    related: ["web-development-lahore", "ecommerce-website-lahore", "web-development-multan"]
  },
  {
    slug: "web-development-rawalpindi",
    city: "Rawalpindi",
    region: "Punjab, Pakistan",
    service: "web development",
    h1: "Web Development in Rawalpindi — Fixed Rates from PKR 14,000",
    kicker: "Rawalpindi · Web Development",
    sub: "Websites, booking systems and apps for Rawalpindi businesses from PKR 14,000. Same fixed rate card as Islamabad, with local area pages and WhatsApp ordering.",
    metaTitle: "Web Development in Rawalpindi — PKR 14,000 Fixed | Wafa Smart Tech",
    metaDesc: "Web development in Rawalpindi from PKR 14,000. Business sites, booking systems, e-commerce and apps. 3 free demos, free domain, source code. WhatsApp 0324 6627054.",
    introTitle: "Practical websites for Rawalpindi trade",
    intro1: "Rawalpindi runs on relationships and speed. A website should answer the basics — what you sell, where you are, how to order — in under three seconds, then hand the conversation to WhatsApp.",
    intro2: "We build for Saddar traders, Bahria clinics, Satellite Town academies and DHA service businesses, with local area pages and a fixed rate card you can forward on WhatsApp.",
    features: [
      { icon: "pin", t: "Area pages that rank", d: "Separate pages for Saddar, Bahria, Satellite Town and more — so nearby customers find you." },
      { icon: "wa", t: "Order on WhatsApp", d: "Every service and product can open a pre-filled WhatsApp message with the item details." },
      { icon: "shield", t: "No monthly lock-in", d: "One-time build, your domain and code. Optional care is PKR 5,000/month." }
    ],
    packages: [
      { n: "Business Website", p: 14000, sub: "5–10 days · 5–8 pages", feats: ["Area landing pages", "3 demo designs", "Local SEO + schema", "WhatsApp CTA"], pop: true },
      { n: "Booking Website", p: 20000, sub: "8–14 days · appointments", feats: ["Slots + booking form", "WhatsApp reminders", "Admin calendar", "Source code"], pop: false },
      { n: "Website + AI", p: 23500, sub: "10–16 days · automation", feats: ["AI receptionist", "Lead qualification", "Booking handover", "Transcripts"], pop: false }
    ],
    areas: ["Saddar", "Bahria Town", "DHA Rawalpindi", "Satellite Town", "Chaklala", "Westridge", "Adiala Road", "Gulraiz"],
    faqs: [
      { q: "How much does a website cost in Rawalpindi?", a: "Business websites start at PKR 14,000 fixed. Booking systems and management portals are PKR 20,000; AI agents are PKR 23,500." },
      { q: "Do you cover Bahria Town and DHA?", a: "Yes. We build area-specific landing pages and local SEO for Bahria Town, DHA Rawalpindi, Saddar and nearby neighbourhoods." },
      { q: "Can I book a meeting?", a: "Yes, in Islamabad or Rawalpindi by appointment, or on WhatsApp plus a screen-share. No travel is required to start." },
      { q: "Do you support Urdu content?", a: "Yes, including Nastaliq typography and RTL layouts." }
    ],
    cube: ["website", "booking", "ai", "ecommerce"],
    related: ["web-development-islamabad", "web-development-lahore", "ai-automation-lahore"]
  },
  {
    slug: "web-development-multan",
    city: "Multan",
    region: "Punjab, Pakistan",
    service: "web development",
    h1: "Web Development in Multan — Websites from PKR 14,000",
    kicker: "Multan · Web Development",
    sub: "Web design and development for Multan businesses from PKR 14,000. Local SEO, Urdu content, WhatsApp ordering, and three demo designs before the final build.",
    metaTitle: "Web Development in Multan — PKR 14,000 Fixed | Wafa Smart Tech",
    metaDesc: "Web development in Multan from PKR 14,000. Business websites, e-commerce, school and clinic portals. 3 free demos, free domain, source code. WhatsApp 0324 6627054.",
    introTitle: "Multan businesses deserve better than a template",
    intro1: "A blue-and-white template does not sell a Multan brand. We design around your actual products, your Urdu-speaking customers and the searches they use — then keep the price fixed.",
    intro2: "Clinics on Bosan Road, schools in Gulgasht, wholesalers in Shah Rukn-e-Alam and new brands in DHA Multan get the same 3D design system and handover process.",
    features: [
      { icon: "pin", t: "Local search built in", d: "City and neighbourhood pages, Google Business setup and Urdu keywords." },
      { icon: "phone", t: "Mobile is the storefront", d: "Most Multan buyers arrive on a phone — we design the mobile view first." },
      { icon: "wa", t: "Direct WhatsApp orders", d: "No forced accounts, no confusing checkout — chat and order in two taps." }
    ],
    packages: [
      { n: "Business Website", p: 14000, sub: "5–10 days · 5–8 pages", feats: ["Urdu + English", "3 demo designs", "Local SEO", "Free domain 1 year"], pop: true },
      { n: "School / Clinic Portal", p: 20000, sub: "8–14 days · admin", feats: ["Admissions or OPD flow", "Staff logins", "Reports + exports", "Source code"], pop: false },
      { n: "E-commerce Store", p: 20000, sub: "10–14 days · COD", feats: ["Product catalog", "COD / bank transfer", "Order dashboard", "Courier notes"], pop: false }
    ],
    areas: ["Cantt", "Gulgasht", "Shah Rukn-e-Alam", "Bosan Road", "DHA Multan", "Wapda Town", "Model Town", "Mumtazabad"],
    faqs: [
      { q: "How much does a website cost in Multan?", a: "Business websites start at PKR 14,000 fixed. School, clinic or management portals are PKR 20,000, and e-commerce stores also start at PKR 20,000." },
      { q: "Can you write the content in Urdu?", a: "Yes. We can write or polish Urdu and English copy and style it with Nastaliq for readability." },
      { q: "Do you visit Multan?", a: "We can arrange a visit for larger projects, but most work is delivered remotely with daily WhatsApp updates and a final handover call." },
      { q: "How do payments work?", a: "50% advance to start, 50% on handover. JazzCash, EasyPaisa or bank transfer — with a written receipt." }
    ],
    cube: ["website", "school", "ecommerce", "recovery"],
    related: ["web-development-lahore", "web-development-faisalabad", "website-design-lahore"]
  },
  {
    slug: "website-design-saudi-arabia",
    city: "Riyadh",
    region: "Saudi Arabia",
    service: "ZATCA-ready website design",
    h1: "Website Design in Saudi Arabia — ZATCA-Ready, Arabic RTL",
    kicker: "Saudi Arabia · ZATCA-Ready",
    sub: "Arabic-first websites, e-invoicing portals and dashboards for Saudi businesses. ZATCA-registered, KSA govt-affiliated, fixed rates from PKR 14,000 (SAR equivalent on invoice).",
    metaTitle: "Website Design Saudi Arabia — ZATCA-Ready | Wafa Smart Tech",
    metaDesc: "Website design in Saudi Arabia with Arabic RTL, ZATCA-compliant e-invoicing and fixed rates. KSA-registered, AWS & Google certified. WhatsApp +92 324 6627054.",
    introTitle: "Arabic-first, ZATCA-aware, built for KSA",
    intro1: "Saudi customers expect Arabic on the first screen, not a machine translation hidden in a menu. We design RTL-first layouts, Arabic typography and bilingual content that reads naturally in both languages.",
    intro2: "For invoicing and finance flows we build ZATCA-compliant structures with VAT fields, QR-ready invoice layouts and audit-friendly records — with our KSA registration behind it.",
    features: [
      { icon: "globe", t: "Arabic RTL first", d: "Proper RTL layout, Arabic fonts and bilingual content — not a flipped afterthought." },
      { icon: "shield", t: "ZATCA-aware", d: "VAT fields, invoice QR layout, e-invoicing flow and audit-ready records." },
      { icon: "award", t: "KSA registered", d: "Saudi Arabia registered and KSA govt-affiliated ZATCA-compliant software delivery." }
    ],
    packages: [
      { n: "Arabic Business Site", p: 14000, sub: "5–10 days · AR + EN", feats: ["RTL-first design", "Bilingual content", "WhatsApp + call CTAs", "SEO + schema"], pop: true },
      { n: "E-commerce (KSA)", p: 20000, sub: "10–16 days · VAT", feats: ["Arabic catalog", "VAT-ready invoices", "COD / transfer", "Admin dashboard"], pop: false },
      { n: "ZATCA Invoicing", p: 23500, sub: "12–20 days · compliance", feats: ["Invoice QR layout", "VAT + audit fields", "Role-based access", "Handover + docs"], pop: false }
    ],
    areas: ["Riyadh", "Jeddah", "Dammam", "Khobar", "Makkah", "Madinah", "Abha", "Tabuk"],
    faqs: [
      { q: "Do you build ZATCA-compliant invoicing?", a: "We build ZATCA-aware invoice layouts with VAT fields, QR placement and audit-ready records. Final compliance sign-off should be confirmed with your ZATCA account or tax advisor." },
      { q: "Is the website fully Arabic?", a: "Yes. We build Arabic-first with an English toggle, correct RTL layout and Arabic typography." },
      { q: "How do payments work from Saudi Arabia?", a: "We invoice in PKR or SAR equivalent with a written scope. International transfer or Wise; 50% advance and 50% on handover." },
      { q: "Can you work with our Riyadh team?", a: "Yes. We work remotely with Riyadh hours overlap and can join calls in English or Urdu; Arabic content is reviewed by a native writer." }
    ],
    cube: ["website", "ecommerce", "management", "ai"],
    related: ["web-development-dubai", "ecommerce-website-lahore", "web-development-lahore"]
  },
  {
    slug: "web-development-dubai",
    city: "Dubai",
    region: "United Arab Emirates",
    service: "web development",
    h1: "Web Development in Dubai — Premium Sites from PKR 14,000",
    kicker: "Dubai · Web Development",
    sub: "Premium, bilingual websites and AI agents for Dubai businesses. Fixed rates, Dubai-hours calls, 3 demo designs and source-code handover. Arabic and English ready.",
    metaTitle: "Web Development in Dubai — Fixed Rates | Wafa Smart Tech",
    metaDesc: "Web development in Dubai from PKR 14,000. Premium bilingual websites, e-commerce and AI agents. Fixed rates, 3 free demos, Arabic/English. WhatsApp +92 324 6627054.",
    introTitle: "Dubai polish, honest pricing",
    intro1: "Dubai is a design-conscious market: sharp typography, fast pages, Arabic and English side by side. We build that standard without the agency retainers — a fixed quote and a written delivery date.",
    intro2: "We work with restaurants, real-estate agents, clinics and e-commerce brands across Deira, Business Bay and JLT, with calls scheduled in Dubai time and updates on WhatsApp.",
    features: [
      { icon: "spark", t: "Premium visual standard", d: "3D hero, restrained motion, Sora + Manrope typography and a real design system — not a template." },
      { icon: "globe", t: "Arabic + English", d: "Bilingual layouts with RTL support, Arabic typography and content review." },
      { icon: "bolt", t: "Fast everywhere", d: "Optimised images and light code so the site loads on Dubai mobile networks and older phones." }
    ],
    packages: [
      { n: "Premium Website", p: 14000, sub: "5–10 days · bilingual", feats: ["3D hero design", "AR / EN content", "SEO + schema", "Free domain 1 year"], pop: true },
      { n: "E-commerce Store", p: 20000, sub: "10–16 days · payments", feats: ["Product catalog", "Card / COD flow", "Order dashboard", "Courier notes"], pop: false },
      { n: "Website + AI Agent", p: 23500, sub: "10–16 days · automation", feats: ["WhatsApp agent", "Lead qualification", "Booking handover", "Transcripts"], pop: false }
    ],
    areas: ["Deira", "Bur Dubai", "Business Bay", "DIFC", "JLT", "Al Barsha", "Downtown Dubai", "Silicon Oasis"],
    faqs: [
      { q: "How much does a website cost in Dubai?", a: "Premium bilingual websites start at PKR 14,000 (roughly AED 180–200 depending on exchange). E-commerce is PKR 20,000, AI agents PKR 23,500." },
      { q: "Do you invoice in AED?", a: "We can quote in AED equivalent and invoice in PKR or AED by arrangement. The scope and price are fixed before work starts." },
      { q: "Can you handle Arabic content?", a: "Yes. We build RTL-first layouts and work with a native Arabic reviewer for customer-facing copy." },
      { q: "What time zone do you work in?", a: "We overlap with Dubai hours (GST) and schedule calls in your time zone. Updates continue on WhatsApp." }
    ],
    cube: ["website", "ecommerce", "ai", "design"],
    related: ["website-design-saudi-arabia", "web-development-lahore", "ai-agents-pakistan"]
  },
  {
    slug: "ai-agents-pakistan",
    city: "Pakistan",
    region: "Pakistan",
    service: "AI agents",
    h1: "AI Agents in Pakistan — WhatsApp, Voice & CRM from PKR 23,500",
    kicker: "Pakistan · AI Agents",
    sub: "AI agents built for Pakistani businesses: WhatsApp auto-replies, voice receptionists, lead qualification and CRM follow-ups. Fixed PKR 23,500, Urdu + English, 30-day support.",
    metaTitle: "AI Agents in Pakistan — WhatsApp & Voice from PKR 23,500",
    metaDesc: "AI agents in Pakistan from PKR 23,500. WhatsApp bots, voice AI, AI receptionist and CRM follow-ups in Urdu & English. Fixed rate, 30-day support.",
    introTitle: "AI that speaks Urdu — and knows your business",
    intro1: "Generic chatbots fall apart on Roman Urdu. We train the agent on your prices, timings, services and common objections, then test it against real conversations before launch.",
    intro2: "It can answer WhatsApp, pick up calls, qualify a lead, book a slot and hand over to a human with a full transcript. You can pause or edit the script from the dashboard.",
    features: [
      { icon: "wa", t: "WhatsApp Business API", d: "Official flow, template messages, quick replies and a human handover trigger." },
      { icon: "phone", t: "Voice in Urdu & English", d: "Natural voices, call recording and an AI summary for every conversation." },
      { icon: "chart", t: "Pipeline visibility", d: "Leads, bookings and handover reasons in one dashboard — exportable to CSV." }
    ],
    packages: [
      { n: "WhatsApp AI Agent", p: 23500, sub: "5–8 days · 24/7 replies", feats: ["Urdu + English", "Lead qualification", "Booking handover", "Transcript dashboard"], pop: true },
      { n: "Voice AI Agent", p: 23500, sub: "7–10 days · inbound calls", feats: ["Natural voice", "Outbound reminders", "Call summaries", "CRM sync"], pop: false },
      { n: "AI + CRM Pipeline", p: 23500, sub: "8–12 days · full setup", feats: ["Lead stages", "Auto follow-ups", "Team notifications", "Monthly care optional"], pop: false }
    ],
    areas: ["Lahore", "Karachi", "Islamabad", "Faisalabad", "Rawalpindi", "Multan", "Peshawar", "Quetta"],
    faqs: [
      { q: "How much do AI agents cost in Pakistan?", a: "AI agents, voice agents and AI receptionists are PKR 23,500 fixed, including setup, training, integration, transcripts and 30-day support." },
      { q: "Does it understand Roman Urdu?", a: "Yes. We train on Roman Urdu, Urdu script and English, and test with real examples from your inbox before launch." },
      { q: "Can it book appointments?", a: "Yes. It checks available slots, confirms the booking and sends the details to your team or calendar." },
      { q: "What if the AI makes a mistake?", a: "You can pause it instantly, set topics it must hand over, and review every transcript. We tune the script during the 30-day support window." }
    ],
    cube: ["ai", "voice", "waBot", "website"],
    related: ["ai-automation-lahore", "whatsapp-chatbot-pakistan", "web-development-lahore"]
  },
  {
    slug: "whatsapp-chatbot-pakistan",
    city: "Pakistan",
    region: "Pakistan",
    service: "WhatsApp chatbot",
    h1: "WhatsApp Chatbot in Pakistan — Orders, Bookings & Support",
    kicker: "Pakistan · WhatsApp Chatbots",
    sub: "Custom WhatsApp chatbots for Pakistani businesses from PKR 23,500: catalogs, order taking, booking, FAQs and human handover — on the official WhatsApp Business API.",
    metaTitle: "WhatsApp Chatbot Pakistan — Orders & Bookings | Wafa Smart Tech",
    metaDesc: "WhatsApp chatbot development in Pakistan from PKR 23,500. Auto-reply, catalog, order taking, booking and human handover on the official WhatsApp Business API.",
    introTitle: "Your busiest salesperson is already on WhatsApp",
    intro1: "Pakistani customers do not fill forms — they send a message. A chatbot answers instantly, shows the catalog, takes the order or books the slot, then hands over when a human is needed.",
    intro2: "We use the official WhatsApp Business API, so the number stays yours, templates stay compliant and conversations are logged. No grey-market tools, no ban risk.",
    features: [
      { icon: "wa", t: "Official API", d: "Verified business number, approved templates and a compliant opt-in flow." },
      { icon: "cart", t: "Order + catalog flow", d: "Browse products, choose variants, confirm COD or transfer — all inside WhatsApp." },
      { icon: "brain", t: "Smart handover", d: "The bot knows when to stop and hands over with a transcript and customer context." }
    ],
    packages: [
      { n: "Starter Chatbot", p: 23500, sub: "5–8 days · FAQs + leads", feats: ["Auto-reply flows", "Lead capture", "Human handover", "Transcript dashboard"], pop: false },
      { n: "Order Chatbot", p: 23500, sub: "8–12 days · catalog", feats: ["Product catalog", "COD / transfer flow", "Order notifications", "Admin panel"], pop: true },
      { n: "Booking + AI Agent", p: 23500, sub: "8–14 days · automation", feats: ["Slot booking", "Reminders", "AI qualification", "CRM sync"], pop: false }
    ],
    areas: ["Lahore", "Karachi", "Islamabad", "Faisalabad", "Rawalpindi", "Multan", "Peshawar", "Quetta"],
    faqs: [
      { q: "How much does a WhatsApp chatbot cost in Pakistan?", a: "Custom WhatsApp chatbots start at PKR 23,500 fixed, including flow design, WhatsApp Business API setup, testing and 30-day support." },
      { q: "Will my number get banned?", a: "We use the official WhatsApp Business API with approved templates and opt-in flows, which is the compliant route. Bulk unsolicited messaging is not part of the service." },
      { q: "Can it take orders and payments?", a: "Yes — catalog, variants, COD confirmation and bank-transfer instructions. Card payments depend on your gateway/merchant account." },
      { q: "Can a human take over?", a: "Yes. The bot hands over on request or when confidence is low, and your team sees the full conversation history." }
    ],
    cube: ["waBot", "ai", "ecommerce", "management"],
    related: ["ai-agents-pakistan", "ai-automation-lahore", "ecommerce-website-lahore"]
  }
];

module.exports = { LANDING, PRODUCTS };
