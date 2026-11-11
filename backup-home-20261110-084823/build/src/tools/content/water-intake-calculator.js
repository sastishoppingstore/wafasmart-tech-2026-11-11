"use strict";
const H = require("./_helpers.js");
module.exports = {
  name: "Water Intake Calculator",
  short: "Estimate daily water needs from body weight (35 ml/kg), then add for exercise, hot or humid climate and pregnancy or breastfeeding. See litres and cups.",
  title: "Water Intake Calculator — Litres & Cups | Wafa Smart",
  desc: "Free water intake calculator: 35 ml per kg plus exercise, climate and pregnancy adjustments. Get your daily litres and 250 ml cups. Private, in-browser.",
  h1: "Water Intake Calculator — how many litres a day",
  kw: ["water intake calculator", "daily water requirement", "how much water to drink", "water calculator kg", "water per day litres", "hydration calculator"],
  intro: [
    "The eight-glasses rule is a fine slogan but a poor prescription, because a 50 kg office worker and a 100 kg labourer do not need the same amount of fluid. The clinical starting point is roughly 35 millilitres of water per kilogram of body weight each day, and that is the base this calculator uses. Enter your weight and you immediately get a litres-and-cups target you can measure against a bottle.",
    "The base assumes a temperate day with no workout, so the tool lets you stack the factors that genuinely push demand up. Exercise adds fluid for every minute you sweat; a hot or humid climate raises losses even when you sit still; and pregnancy and breastfeeding each carry their own well-established extra allowance. Tick or type what applies and the total grows accordingly, with each contribution shown separately so you can see where the number comes from.",
    "Output is given two ways because people track water differently: total litres for a measured bottle, and the count of standard 250 ml cups for a quick mental tally through the day. Nothing here replaces a doctor's advice for kidney, heart or diabetes patients on a fluid restriction — for those cases the right target is whatever your clinician set, not a formula."
  ],
  steps: [
    "Enter your body weight in kilograms.",
    "Add the minutes of moderate exercise you do on an average day.",
    "Choose the climate you spend most time in — mild, hot or humid.",
    "Select pregnancy or breastfeeding if either applies to you.",
    "Press Calculate to read your daily total in litres and in 250 ml cups."
  ],
  ur: "Apna wazan (kg) likhein, exercise ke minutes, climate (garm/mamduli) aur pregnancy ya breastfeeding ka option chunein. 'Calculate' dabane par aapka rozana paani ka target litres aur cups (250 ml) me nazar aayega. Sab kuch browser me, koi upload nahi.",
  features: [
    "Weight-based 35 ml/kg baseline, the standard hydration starting point",
    "Extra allowance added per minute of daily exercise",
    "Mild, hot and humid climate adjustments",
    "Separate pregnancy and breastfeeding additions",
    "Result shown in both litres and 250 ml cups",
    "Every factor itemised so you can see how the total builds"
  ],
  tips: [
    "Spread the cups across the day rather than chugging — steady sipping is absorbed better.",
    "Coffee, tea and watery foods count toward fluid, so hitting the litre figure exactly is not vital.",
    "Raise the exercise minutes on training days and drop them back on rest days.",
    "Dark yellow urine is the simplest real-world check that you should drink more than the number says.",
    "If a doctor has put you on a fluid limit, follow that instead of this estimate."
  ],
  faqs: [
    { q: "Why 35 ml per kilogram?", a: "It is a widely used general guideline for healthy adults in a temperate climate, sitting between the more conservative 30 ml/kg and the aggressive 40 ml/kg figures athletes sometimes use." },
    { q: "Does drinking more water help me lose weight?", a: "Staying hydrated supports metabolism and can reduce mistaken hunger, but water alone does not cause fat loss. Use it alongside a realistic calorie target." },
    { q: "Can I drink too much water?", a: "Yes — very high intakes over a short period can dilute blood sodium. The totals here are normal daily amounts, not something to force at once." },
    H.faqFree("Water Intake Calculator"),
    { q: "Why does my target jump between runs?", a: "Only the exercise minutes, climate and life-stage options change the total on top of weight, so re-check those fields if a number surprises you." },
    H.faqMobile("Water Intake Calculator")
  ],
  related: [["bmi-calculator", "Check your BMI"], ["calorie-calculator", "Calorie needs"], ["ideal-weight-calculator", "Ideal weight"], ["age-calculator", "Age calculator"]],
  ui: `<section class="t-card opts" aria-label="Water intake calculator inputs">
  <div class="fld"><label for="wkg">Weight (kg)</label><input type="number" id="wkg" inputmode="decimal" min="25" max="350" step="0.1" placeholder="e.g. 70"></div>
  <div class="fld"><label for="exmin">Exercise minutes / day</label><input type="number" id="exmin" inputmode="numeric" min="0" max="600" step="5" value="0"></div>
  <div class="fld"><label for="climate">Climate</label><select id="climate"><option value="0">Mild / temperate</option><option value="500">Hot / dry</option><option value="400">Humid</option></select></div>
  <div class="fld"><label for="stage">Life stage</label><select id="stage"><option value="0">None</option><option value="300">Pregnant</option><option value="700">Breastfeeding</option></select></div>
  <div class="acts"><button id="go" class="btn" type="button">Calculate</button><button id="rst" class="btn btn-ghost" type="button">Reset</button></div>
  <p id="status" role="status" aria-live="polite" class="hint"></p>
  <p id="err" class="err" role="alert" hidden></p>
  <div id="out"></div>
  <span class="disc">For information only, not medical advice.</span>
</section>`
};
