"use strict";
const H = require("./_helpers.js");
const K = require("./_kit.js");
module.exports = {
  name: "Zakat Calculator",
  short: "Calculate Zakat on cash, gold, silver, business, investments with nisab (gold/silver).",
  title: "Zakat Calculator - Gold/Silver Nisab, 2.5% | Wafa Smart",
  desc: "Zakat calculator with PKR, AED, SAR, USD, INR, GBP. Gold/silver nisab, hawl, deductions, jewellery toggle. Informational only.",
  h1: "Zakat Calculator - Nisab, Assets & Liabilities",
  libs: [],
  kw: ["zakat calculator","zakat calculator pakistan","nisab calculator","zakat on gold silver cash"],
  guide: "/blog/pakistan-zakat-calculator-guide.html",
  guideTitle: "Zakat calculator Pakistan guide",
  intro: ["Calculate Zakat at 2.5% if net zakatable wealth >= nisab for one lunar year (hawl).","Default to silver nisab with explanation.","Informational estimate - consult qualified scholar."],
  steps: ["Select currency & rates", "Enter assets", "Enter debts/liabilities", "Choose nisab", "Calculate"],
  ur: "Zakat ka hisab lagain - sona, chandi, cash, qarz waghera se. 2.5% hisab se.",
  features: ["Multi-currency","Gold/Silver nisab","Assets & deductions","Jewellery toggle","Breakdown","Hawl note"],
  tips: ["Use current rates","Default silver nisab often lower threshold"],
  faqs: [
    H.faqFree("Zakat Calculator"), H.faqPrivacy("Zakat Calculator","calculator"),
    {q:"Why default to silver nisab?",a:"Silver nisab gives a lower threshold so more eligible pay Zakat; scholars differ - explain and allow choice."},
    {q:"Is this fatwa?",a:"Informational estimate only, consult qualified scholar."}
  ],
  related: [["khums-calculator","Khums Calculator"],["age-calculator","Age Calculator"],["gym-calculator","Gym Calculator"],["percentage-calculator","Percentage Calculator"],["emi-loan-calculator","EMI Calculator"],["discount-calculator","Discount Calculator"]],
  ui: `<section class="t-card t3d-panel"><div class="t3d-persp" style="padding:clamp(16px,3vw,26px)">
<div class="gym-grid">
<div class="fld"><label>Currency</label><select id="zc"><option>PKR</option><option>AED</option><option>SAR</option><option>USD</option><option>INR</option><option>GBP</option></select></div>
<div class="fld"><label>Nisab</label><select id="znis"><option value="silver">Silver (default)</option><option value="gold">Gold</option></select></div>
<div class="fld"><label>Gold price / tola</label><input id="zg" type="number" value="250000"></div>
<div class="fld"><label>Silver price / tola</label><input id="zs" type="number" value="3000"></div>
</div>
<h3>Assets</h3>
<div class="gym-grid">
<div class="fld"><label>Cash in hand/bank</label><input id="za1" type="number" value="0"></div>
<div class="fld"><label>Gold (grams, bars/coins)</label><input id="za2" type="number" value="0"></div>
<div class="fld"><label>Silver (grams, bars/coins)</label><input id="za3" type="number" value="0"></div>
<div class="fld"><label>Business inventory</label><input id="za4" type="number" value="0"></div>
<div class="fld"><label>Receivables (money owed to me)</label><input id="za5" type="number" value="0"></div>
<div class="fld"><label>Investments/Shares</label><input id="za6" type="number" value="0"></div>
<div class="fld"><label>Other</label><input id="za7" type="number" value="0"></div>
<div class="fld"><label><input type="checkbox" id="zj" style="width:auto"> Include personal-use jewellery (scholars differ)</label><small class="tiny muted">Unchecked: gold/silver grams above are treated as personal jewellery and excluded.</small></div>
</div>
<h3>Deductions</h3>
<div class="gym-grid">
<div class="fld"><label>Immediate debts/liabilities</label><input id="zd1" type="number" value="0"></div>
</div>
<div class="acts"><button id="goz" class="t3d-btn">Calculate Zakat</button></div>
<div id="rz" class="t3d-res" style="display:none"><div class="res-line"><span>Nisab value</span><b id="znisv">0</b></div><div class="res-line"><span>Net zakatable</span><b id="znet">0</b></div><div class="res-line"><span>Zakat due (2.5%)</span><b id="zz">0</b></div><p id="zmsg"></p><p class="disc">Informational estimate, consult qualified scholar. Hawl (lunar year) rule applies.</p></div>
<p class="disc">Last updated: 2026-10-28</p>
</div></section>`
};
