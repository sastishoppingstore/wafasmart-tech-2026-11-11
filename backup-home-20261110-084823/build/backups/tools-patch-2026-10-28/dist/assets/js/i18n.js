/* ============================================================
   WAFA SMART TECH — bilingual EN ⇄ اردو + RTL engine
   Two mechanisms:
   1) [data-i18n="key"]  → dictionary below (chrome/UI text)
   2) [data-ur="..."]    → content-level Urdu rendered by build.js
   ============================================================ */
(function () {
  "use strict";
  const UR = {
    "nav.home": "ہوم", "nav.services": "سروسز", "nav.pricing": "قیمتیں", "nav.portfolio": "نمونے",
    "nav.about": "ہمارے بارے میں", "nav.blog": "بلاگ", "nav.contact": "رابطہ",
    "cta.quote": "مفت کوٹ", "cta.demo": "مفت ڈیمو", "cta.order": "ابھی آرڈر کریں", "cta.wa": "واٹس ایپ", "cta.free": "فری مشاورت", "cta.recover": "ابھی ریکوری",
    "cta.viewsvc": "سروس دیکھیں", "cta.viewall": "سب سروسز دیکھیں", "cta.details": "تفصیل",
    "sec.services": "ہماری سروسز", "sec.services.sub": "اکیس سروسز — صاف مقررہ ریٹ، مکمل تفصیل، آرڈر اور کوٹ بٹن کے ساتھ",
    "sec.why": "ہم ہی کیوں؟", "sec.process": "کام کا طریقہ", "sec.pricing": "مقررہ پیکجز",
    "sec.portfolio": "ہمارے بنائے ہوئے کام", "sec.testi": "کلائنٹس کیا کہتے ہیں", "sec.faq": "عام سوالات",
    "sec.cta": "آئیے مل کر بناتے ہیں", "sec.stats": "اعداد میں", "sec.blog": "بلاگ و رہنمائی",
    "price.from": "شروع", "price.pk": "روپے", "days": "دن", "included": "شامل ہے", "notincluded": "شامل نہیں",
    "f.name": "آپ کا نام", "f.phone": "واٹس ایپ نمبر", "f.service": "کون سی سروس چاہیے",
    "f.budget": "بجٹ", "f.msg": "تفصیل بتائیں", "f.send": "واٹس ایپ پر بھیجیں",
    "quote.t": "کوٹ ویزارڈ", "quote.s1": "سروس منتخب کریں", "quote.s2": "پسندیدہ ڈیمو اسٹائل", "quote.s3": "رابطہ", "quote.s4": "تصدیق اور ارسال",
    "quote.next": "آگے", "quote.back": "واپس", "quote.send": "واٹس ایپ پر کوٹ مانگیں",
    "wa.float": "واٹس ایپ پر بات کریں — فوری جواب", "foot.rights": "جملہ حقوق محفوظ ہیں",
    "foot.made": "لاہور میں تیار کردہ — تیز، قابلِ اعتماد، آپ کی ملکیت",
    "hero.badge": "لاہور · پاکستان کی اے آئی اینڈ ویب اسٹوڈیو",
    "trust.t1": "تصدیق شدہ کلائنٹس", "trust.t2": "مفت مشاورت", "trust.t3": "سورس کوڈ ہینڈ اوور",
    "price.fixed": "مقررہ قیمت", "price.all": "سب کچھ شامل —", "cta.pickdemo": "یہی ڈیزائن چاہیے",
    "badge.domain": "ویب سائٹس پر ڈومین فری", "badge.demos": "۳ مفت ڈیمو ڈیزائن", "f.demo": "پسندیدہ ڈیمو اسٹائل"
  };
  const D = document, W = window;
  let lang = W.localStorage.getItem("wst.lang") || "en";

  function swap() {
    const ur = lang === "ur";
    D.documentElement.lang = ur ? "ur" : "en";
    D.body.setAttribute("dir", ur ? "rtl" : "ltr");
    D.body.classList.toggle("ur", ur);
    // dictionary nodes
    D.querySelectorAll("[data-i18n]").forEach(el => {
      if (!el.dataset.en) el.dataset.en = el.textContent;
      const t = ur ? (UR[el.dataset.i18n] || el.dataset.en) : el.dataset.en;
      el.textContent = t;
    });
    D.querySelectorAll("[data-i18n-ph]").forEach(el => {
      if (!el.dataset.phEn) el.dataset.phEn = el.getAttribute("placeholder") || "";
      el.setAttribute("placeholder", ur ? (UR[el.dataset.i18nPh] || el.dataset.phEn) : el.dataset.phEn);
    });
    // content nodes carrying data-ur from the data model
    D.querySelectorAll("[data-ur]").forEach(el => {
      if (!el.hasAttribute("data-en-cached")) { el.dataset.enCached = "1"; el.dataset.en2 = el.innerHTML; }
      const t = ur ? el.getAttribute("data-ur") : el.dataset.en2;
      if (t) el.innerHTML = t;
    });
    D.querySelectorAll("[data-ur-attr]").forEach(el => {
      const attr = el.getAttribute("data-ur-attr");
      if (!el.dataset.origAttr) el.dataset.origAttr = el.getAttribute(attr) || "";
      const t = ur ? el.getAttribute("data-ur-" + attr) : el.dataset.origAttr;
      if (t) el.setAttribute(attr, t);
    });
    const btn = W.document.querySelector("#lang-toggle");
    if (btn) btn.textContent = ur ? "English" : "اردو";
    D.dispatchEvent(new CustomEvent("wst:lang", { detail: lang }));
  }

  function toggle() { lang = lang === "en" ? "ur" : "en"; W.localStorage.setItem("wst.lang", lang); swap(); }

  D.addEventListener("DOMContentLoaded", () => {
    const btn = D.querySelector("#lang-toggle");
    if (btn) { btn.addEventListener("click", toggle); btn.setAttribute("aria-label", "Switch language / زبان بدلیں"); }
    if (lang === "ur") swap();
    else { D.documentElement.lang = "en"; D.body.setAttribute("dir", "ltr"); const b = D.querySelector("#lang-toggle"); if (b) b.textContent = "اردو"; }
  });
  W.WST_LANG = { toggle, swap, UR };
})();
