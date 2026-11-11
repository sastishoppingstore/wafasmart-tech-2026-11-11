"use strict";
const H = require("./_helpers.js");
const K = require("./_kit.js");
module.exports = {
  name: "Age Calculator",
  short: "Exact age in Gregorian, Islamic (Hijri) with adjustment, and Desi (Bikrami) dates.",
  title: "Age Calculator - Gregorian, Hijri, Desi (Bikrami) | Wafa Smart",
  desc: "Calculate age in years/months/days for Gregorian, Islamic Hijri (Um Al Qura) with ±2 day adjustment, and Desi Bikrami. Free, private.",
  h1: "Age Calculator - Gregorian, Hijri & Desi",
  libs: [],
  kw: ["age calculator by date of birth","hijri age calculator","desi age calculator","bikrami age calculator","age in months days"],
  intro: [
    "Get exact age in three calendars: English (Gregorian), Islamic (Hijri) using Intl islamic-umalqura with ±2 day adjustment (moon sighting differences), and Desi/Bikrami.",
    "Handles leap years, 29 Feb births correctly. Shows days until next birthday and more."
  ],
  steps: ["Select DOB (day/month/year)", "Optionally set 'age as of' date", "Adjust Hijri days if needed", "View all three results"],
  ur: "Apni tarikh paidaish dalein aur Gregorian, Hijri aur Desi mein umar dekhein.",
  features: ["Gregorian exact age","Hijri with ±2 day adjustment","Desi/Bikrami approximate","Days until birthday","Leap year handling"],
  tips: ["Use correct DOB", "Hijri dates may differ by 1-2 days by region"],
  faqs: [
    H.faqFree("Age Calculator"), H.faqPrivacy("Age Calculator","calculator"),
    {q:"Why Hijri adjustment?",a:"Different countries use different moon sighting; Um Al Qura is used as base with adjustment control."},
    {q:"Is Desi date exact?",a:"Desi/Bikrami month start dates are approximate and may differ by 1 day."}
  ],
  related: [["gym-calculator","Gym Calculator"],["bmi-calculator","BMI Calculator"],["calorie-calculator","Calorie Calculator"],["zakat-calculator","Zakat Calculator"],["percentage-calculator","Percentage Calculator"],["discount-calculator","Discount Calculator"]],
  ui: `<section class="t-card t3d-panel"><div class="t3d-persp" style="padding:clamp(16px,3vw,26px)">
<div class="gym-grid">
<div class="fld"><label>DOB Day</label><input id="ad" type="number" min="1" max="31"></div>
<div class="fld"><label>DOB Month</label><input id="am" type="number" min="1" max="12"></div>
<div class="fld"><label>DOB Year</label><input id="ay" type="number"></div>
<div class="fld"><label>Age as of (optional)</label><input id="aof" type="date"></div>
<div class="fld"><label>Hijri adjustment (days)</label><input id="hadj" type="range" min="-2" max="2" value="0"><output id="hadjv">0</output></div>
<div class="acts"><button id="goage" class="t3d-btn">Calculate Age</button></div>
</div>
<h3>1) Gregorian (English)</h3>
<div class="t3d-res" id="rage1" style="display:none"><div class="res-line"><span>Age</span><b id="ageg">0</b></div><div class="res-line"><span>Months/Weeks/Days/Hours</span><span id="ageg2"></span></div><div class="res-line"><span>Born on</span><span id="ageg3"></span></div><div class="res-line"><span>Days until next birthday</span><b id="agenb">0</b></div></div>
<h3>2) Islamic (Hijri) - islamic-umalqura</h3>
<div class="t3d-res" id="rage2" style="display:none"><div class="res-line"><span>Hijri DOB</span><span id="hijriDob"></span></div><div class="res-line"><span>Age in Hijri</span><b id="hijriAge">0</b></div><p class="disc">Moon sighting may differ in Pakistan; adjustment ±2 days applied.</p></div>
<h3>3) Desi (Bikrami) - approximate</h3>
<div class="t3d-res" id="rage3" style="display:none"><div class="res-line"><span>Desi DOB</span><span id="desiDob"></span></div><div class="res-line"><span>Age in Desi</span><b id="desiAge">0</b></div><p class="disc">Approximate, may differ by 1 day. Based on editable config.</p></div>
</div></section>`
};
