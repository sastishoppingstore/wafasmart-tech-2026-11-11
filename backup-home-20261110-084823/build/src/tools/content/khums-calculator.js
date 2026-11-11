"use strict";
const H = require("./_helpers.js");
const K = require("./_kit.js");
module.exports = {
  name: "Khums Calculator",
  short: "Shia Khums calculator - 20% on surplus with Sahm-e-Imam/Sahm-e-Sadat split.",
  title: "Khums Calculator - 20% Shia Khums Split | Wafa Smart",
  desc: "Khums calculator for Shia users. Calculate 20% on surplus after necessary expenses. Sahm-e-Imam and Sahm-e-Sadat split. Respectful, estimate only.",
  h1: "Khums Calculator (Shia) - 20% with Split",
  libs: [],
  kw: ["khums calculator","khums calculator shia","sahm e imam sahm e sadat","khums 20 percent"],
  intro: ["Compute Khums as 20% of surplus (income + eligible - necessary expenses). Split into Sahm-e-Imam (50%) and Sahm-e-Sadat (50%).","Rulings differ between Maraji' - follow your own Marja. This is an estimate, not a fatwa."],
  steps: ["Set khums year (ras-ul-sal) if desired", "Enter income/profit", "Enter necessary expenses & debts", "Calculate"],
  ur: "Khums ka hisab - mawaid se zaroori kharchat kam karke 20% nikalain, aadha Imam (as) ke liye aadha Sadat ke liye.",
  features: ["20% on surplus","Sahm-e-Imam / Sahm-e-Sadat split","Expenses & debts","Currency selector","Marja note"],
  tips: ["Consult your Marja's office for details","Keep records of khums year"],
  faqs: [
    H.faqFree("Khums Calculator"), H.faqPrivacy("Khums Calculator","calculator"),
    {q:"Is this a fatwa?",a:"No, estimate only. Follow your own Marja's rulings."},
    {q:"What is the split?",a:"Customarily 50% Sahm-e-Imam, 50% Sahm-e-Sadat."}
  ],
  related: [["zakat-calculator","Zakat Calculator"],["gym-calculator","Gym Calculator"],["age-calculator","Age Calculator"],["emi-loan-calculator","EMI Calculator"],["percentage-calculator","Percentage Calculator"],["discount-calculator","Discount Calculator"]],
  ui: `<section class="t-card t3d-panel"><div class="t3d-persp" style="padding:clamp(16px,3vw,26px)">
<div class="gym-grid">
<div class="fld"><label>Currency</label><select id="kc"><option>PKR</option><option>AED</option><option>SAR</option><option>USD</option></select></div>
<div class="fld"><label>Khums year start (ras-ul-sal)</label><input id="kys" type="date"></div>
</div>
<h3>Income/Eligible</h3>
<div class="gym-grid">
<div class="fld"><label>Income/Profit this khums year</label><input id="ki1" type="number" value="0"></div>
<div class="fld"><label>Savings carried at start (if applicable)</label><input id="ki2" type="number" value="0"></div>
<div class="fld"><label>Other khums-eligible</label><input id="ki3" type="number" value="0"></div>
</div>
<h3>Expenses/Deductions</h3>
<div class="gym-grid">
<div class="fld"><label>Necessary annual living expenses</label><input id="ke1" type="number" value="0"></div>
<div class="fld"><label>Debts</label><input id="ke2" type="number" value="0"></div>
</div>
<div class="acts"><button id="gok" class="t3d-btn">Calculate Khums</button></div>
<div id="rk" class="t3d-res" style="display:none"><div class="res-line"><span>Surplus</span><b id="ksur">0</b></div><div class="res-line"><span>Khums (20%)</span><b id="kk">0</b></div><div class="res-line"><span>Sahm-e-Imam (50%)</span><b id="ksi">0</b></div><div class="res-line"><span>Sahm-e-Sadat (50%)</span><b id="kss">0</b></div><p id="kperiod" class="disc"></p><p class="disc">Rulings differ between Maraji'. Follow your own Marja's rulings - this is an estimate, not a fatwa.</p></div>
</div></section>`
};
