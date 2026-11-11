"use strict";
const H = require("./_helpers.js");
const K = require("./_kit.js");
module.exports = {
  name: "Gym Calculator",
  short: "BMI, BMR/TDEE, Macros, Body Fat (Navy), 1RM, Heart Rate Zones, Water Intake.",
  title: "Gym Calculator - BMI, BMR, TDEE, Macros, 1RM | Wafa Smart",
  desc: "Free gym calculator with BMI, BMR (Mifflin-St Jeor), TDEE, macros, US Navy body fat, 1RM (Epley/Brzycki), HR zones. Metric/imperial.",
  h1: "Gym Calculator - BMI, BMR, TDEE, Macros & More",
  libs: [],
  kw: ["gym calculator","bmi calculator","tdee calculator","bmr calculator","1 rep max calculator","body fat navy method"],
  intro: [
    "All-in-one gym calculator with tabs for BMI, BMR + TDEE, Macros, Body Fat %, 1RM, Heart Rate Zones and Water Intake.",
    "Uses Mifflin-St Jeor for BMR, US Navy method for body fat, Epley and Brzycki for 1RM.",
    "For information only, not medical advice. Always consult a qualified professional."
  ],
  steps: ["Select tab", "Choose metric/imperial", "Enter values", "Get results instantly"],
  ur: "Gym calculator se BMI, calories, macros aur 1RM check kar sakte hain. Ye sirf maloomat ke liye hai.",
  features: ["BMI","BMR/TDEE (Mifflin-St Jeor)","Macros by goal","US Navy Body Fat","1RM Epley/Brzycki + % table","HR Zones","Water Intake","Metric/Imperial"],
  tips: ["Use accurate measurements", "Track over time", "Don't go below recommended minimums blindly"],
  faqs: [
    H.faqFree("Gym Calculator"), H.faqPrivacy("Gym Calculator","calculator"),
    {q:"Which BMR formula is used?",a:"Mifflin-St Jeor equation as it is widely recommended."},
    {q:"Is this medical advice?",a:"No. For information only, not medical advice."}
  ],
  related: [["bmi-calculator","BMI Calculator"],["age-calculator","Age Calculator"],["calorie-calculator","Calorie Calculator"],["water-intake-calculator","Water Intake Calculator"],["ideal-weight-calculator","Ideal Weight Calculator"],["percentage-calculator","Percentage Calculator"]],
  ui: `<section class="t-card t3d-panel"><div class="t3d-persp" style="padding:clamp(16px,3vw,26px)"><div class="gym-tabs" role="group" aria-label="Gym calculator modes"><button class="gym-tab active" data-tab="bmi">BMI</button><button class="gym-tab" data-tab="bmr">BMR/TDEE</button><button class="gym-tab" data-tab="macros">Macros</button><button class="gym-tab" data-tab="bf">Body Fat %</button><button class="gym-tab" data-tab="rm">1RM</button><button class="gym-tab" data-tab="hr">HR Zones</button><button class="gym-tab" data-tab="water">Water Intake</button></div>
<div class="gym-row"><label>Units</label><select id="units"><option value="metric">Metric (kg/cm)</option><option value="imp">Imperial (lb/ft-in)</option></select></div>
<div id="tab-bmi" class="gym-grid">
<div class="fld"><label id="lb-bw">Weight (kg)</label><input id="bw" type="number" step="0.1"></div>
<div class="fld"><label id="lb-bh">Height (cm)</label><input id="bh" type="number"></div>
<div class="acts"><button id="gobmi" class="t3d-btn">Calculate BMI</button></div>
<div id="rbmi" class="t3d-res" style="display:none"><small>BMI</small><b>0</b><div id="rbmit"></div></div>
</div>
<div id="tab-bmr" class="gym-grid" style="display:none">
<div class="fld"><label>Age</label><input id="bage" type="number"></div>
<div class="fld"><label>Gender</label><select id="bg"><option value="m">Male</option><option value="f">Female</option></select></div>
<div class="fld"><label id="lb-bw2">Weight (kg)</label><input id="bw2" type="number" step="0.1"></div>
<div class="fld"><label id="lb-bh2">Height (cm)</label><input id="bh2" type="number"></div>
<div class="fld"><label>Activity</label><select id="bact"><option value="1.2">Sedentary</option><option value="1.375">Light</option><option value="1.55">Moderate</option><option value="1.725">Active</option><option value="1.9">Very Active</option></select></div>
<div class="fld"><label>Goal</label><select id="bgoal"><option value="cut">Cut</option><option value="maint">Maintain</option><option value="bulk">Bulk</option></select></div>
<div class="acts"><button id="gobmr" class="t3d-btn">Calculate BMR/TDEE</button></div>
<div id="rbmr" class="t3d-res" style="display:none"><div class="res-line"><span>BMR (Mifflin-St Jeor)</span><b id="rbmr1">0</b></div><div class="res-line"><span>TDEE</span><b id="rtdee">0</b></div><div class="res-line"><span>Target Calories</span><b id="rtgt">0</b></div></div>
<p class="disc">For information only, not medical advice.</p>
</div>
<div id="tab-macros" class="gym-grid" style="display:none">
<div class="fld"><label>Calories</label><input id="mcal" type="number"></div>
<div class="fld"><label>Split</label><select id="msplit"><option value="balanced">Balanced (30P/40C/30F)</option><option value="highp">High Protein (40P/30C/30F)</option><option value="lowc">Lower Carb (40P/25C/35F)</option></select></div>
<div class="acts"><button id="gomac" class="t3d-btn">Calculate Macros</button></div>
<div id="rmac" class="t3d-res" style="display:none"><div class="res-line"><span>Protein (g)</span><b id="mp">0</b></div><div class="res-line"><span>Carbs (g)</span><b id="mc">0</b></div><div class="res-line"><span>Fat (g)</span><b id="mf">0</b></div></div>
</div>
<div id="tab-bf" class="gym-grid" style="display:none">
<div class="fld"><label>Gender</label><select id="bfg"><option value="m">Male</option><option value="f">Female</option></select></div>
<div class="fld"><label id="lb-bfh">Height (cm)</label><input id="bfh" type="number"></div>
<div class="fld"><label id="lb-bfw">Waist (cm)</label><input id="bfw" type="number"></div>
<div class="fld"><label id="lb-bfn">Neck (cm)</label><input id="bfn" type="number"></div>
<div class="fld"><label id="lb-bfhp">Hip (cm, female)</label><input id="bfhp" type="number"></div>
<div class="acts"><button id="gobf" class="t3d-btn">Calculate (US Navy)</button></div>
<div id="rbf" class="t3d-res" style="display:none"><small>Body Fat %</small><b>0</b></div>
</div>
<div id="tab-rm" class="gym-grid" style="display:none">
<div class="fld"><label id="lb-rmw">Weight Lifted (kg)</label><input id="rmw" type="number" step="0.5"></div>
<div class="fld"><label>Reps</label><input id="rmr" type="number" value="5"></div>
<div class="acts"><button id="gorm" class="t3d-btn">Calculate 1RM</button></div>
<div id="rrm" class="t3d-res" style="display:none"><div class="res-line"><span>Epley</span><b id="re1">0</b></div><div class="res-line"><span>Brzycki</span><b id="re2">0</b></div></div>
</div>
<div id="tab-hr" class="gym-grid" style="display:none">
<div class="fld"><label>Age</label><input id="hra" type="number"></div>
<div class="fld"><label>Resting HR (optional)</label><input id="hrr" type="number"></div>
<div class="acts"><button id="gohr" class="t3d-btn">Calculate Zones</button></div>
<div id="rhr" class="t3d-res" style="display:none"><div class="res-line"><span>Max HR (220-age)</span><b id="rhrm">0</b></div><div class="res-line"><span>Zone 1 · 50–60%</span><span id="rz1">—</span></div><div class="res-line"><span>Zone 2 · 60–70%</span><span id="rz2">—</span></div><div class="res-line"><span>Zone 3 · 70–80%</span><span id="rz3">—</span></div><div class="res-line"><span>Zone 4 · 80–90%</span><span id="rz4">—</span></div><div class="res-line"><span>Zone 5 · 90–100%</span><span id="rz5">—</span></div><p class="disc" id="rhrnote" hidden></p></div>
</div>
<div id="tab-water" class="gym-grid" style="display:none">
<div class="fld"><label id="lb-ww">Weight (kg)</label><input id="ww" type="number" step="0.1"></div>
<div class="acts"><button id="gow" class="t3d-btn">Calculate Water Intake</button></div>
<div id="rw" class="t3d-res" style="display:none"><small>Recommended</small><b>0</b><div>liters/day (approx)</div></div>
</div>
<p class="disc">For information only, not medical advice. Formulas: Mifflin-St Jeor, US Navy, Epley, Brzycki.</p>
</div></section>`
};
