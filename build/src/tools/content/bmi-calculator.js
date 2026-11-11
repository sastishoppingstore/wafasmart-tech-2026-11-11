"use strict";
const H = require("./_helpers.js");
module.exports = {
  name: "BMI Calculator",
  short: "Work out your Body Mass Index in metric (kg/cm) or imperial (lb/in), see your WHO category on a colour scale, and get a healthy weight range.",
  title: "BMI Calculator — KG/CM & LB/IN BMI Check | Wafa Smart",
  desc: "Free BMI calculator in kg/cm or lb/in. See your WHO weight category on a colour scale and your healthy weight range. Runs in your browser, no upload.",
  h1: "BMI Calculator — check your body mass index free",
  kw: ["bmi calculator", "bmi calculator metric", "bmi kg cm", "bmi calculator imperial lb in", "body mass index formula", "healthy weight range"],
  guide: "/blog/pakistan-bmi-calculator-guide.html",
  guideTitle: "BMI calculator guide for Pakistan",
  intro: [
    "Body Mass Index is a single number that relates your weight to your height, giving a quick screen for whether you sit in a underweight, normal, overweight or obese band. It is not a diagnosis and it does not know about muscle, pregnancy or body shape, but it is the number clinics, insurance forms and health apps ask for, so this calculator produces it instantly from the two measurements you already have. Everything runs in the page — nothing you type is sent to a server.",
    "The obvious first hurdle is units. Most of the world measures weight in kilograms and height in centimetres, while the United States and a few other places use pounds and inches. The formula is different for each (kg/m² versus 703×lb/in²), which is why people misread tables found online. Here you just tap Metric or Imperial and the two matching fields appear, so you never convert anything by hand.",
    "Once you press Calculate you get three things: your BMI to one decimal, your WHO category with a colour scale bar showing exactly where you sit between thin and heavy, and the weight range that would put you inside the healthy band for your height. That last figure is often the most useful — it turns an abstract index into a concrete target you can watch on the scales."
  ],
  steps: [
    "Tap Metric or Imperial so the correct weight and height fields appear.",
    "Enter your weight (kilograms or pounds) in the first box.",
    "Enter your height (centimetres or inches) in the second box.",
    "Press Calculate to see your BMI, category on the colour scale, and healthy weight range.",
    "Use Reset to clear everything before someone else checks theirs."
  ],
  ur: "Metric ya Imperial dabayein, phir apna wazan aur qad likhein. 'Calculate' dabate hi BMI, WHO category aur aapke qad ke liye sehat-mand wazan ka range nazar aa jayega. Sab kuch aapke browser me — koi data upload nahi hota.",
  features: [
    "Metric (kg/cm) and imperial (lb/in) modes with the right formula for each",
    "BMI value rounded to one decimal, updated as you type",
    "WHO category label from underweight to obese class III",
    "Colour scale bar marking exactly where your number falls",
    "Healthy weight range calculated for your specific height",
    "No page reload and no storage — results appear and vanish with the tab"
  ],
  tips: [
    "Measure height without shoes and first thing in the morning for the most repeatable BMI.",
    "BMI over-reads in muscular people and athletes — treat the scale bar as a screen, not a verdict.",
    "Compare trends over weeks, not a single day; water weight moves BMI more than fat does.",
    "If you are between the normal and overweight bands, the healthy-range line shows how many kilos to aim for.",
    "For children and teens BMI is age-adjusted differently — use a paediatric chart instead of this tool."
  ],
  faqs: [
    { q: "How is BMI actually calculated?", a: "Metric divides weight in kilograms by height in metres squared. Imperial multiplies pounds by 703 and divides by inches squared — the 703 is the unit-convert factor that makes both formulas land on the same categories." },
    { q: "What are the WHO BMI categories?", a: "Under 18.5 is underweight, 18.5–24.9 normal weight, 25.0–29.9 overweight, 30.0–34.9 obese class I, 35.0–39.9 class II, and 40 or above class III. The coloured bar here maps your number onto those bands." },
    H.faqFree("BMI Calculator"),
    { q: "Why does my BMI differ between two websites?", a: "Rounding, height in metres versus centimetres, or a stray imperial/metric mix-up. Type the same figures into both modes here and you will see they converge on the identical BMI." },
    { q: "Does it save my weight history?", a: "No. There is no account and nothing is stored; close the tab and your numbers are gone. Keep your own notes if you want to track changes." },
    H.faqMobile("BMI Calculator")
  ],
  related: [["ideal-weight-calculator", "Ideal weight formulas"], ["calorie-calculator", "Daily calorie needs"], ["water-intake-calculator", "Water intake"], ["age-calculator", "Age calculator"]],
  ui: `<section class="t-card opts" aria-label="BMI calculator inputs">
  <div class="segs" role="group" aria-label="Unit system">
    <button type="button" class="seg" data-unit="metric" aria-pressed="true">Metric (kg/cm)</button>
    <button type="button" class="seg" data-unit="imperial" aria-pressed="false">Imperial (lb/in)</button>
  </div>
  <div class="fld"><label for="wt">Weight (kg)</label><input type="number" id="wt" inputmode="decimal" min="1" max="500" step="0.1" placeholder="e.g. 70"></div>
  <div class="fld" id="hcm-f"><label for="ht">Height (cm)</label><input type="number" id="ht" inputmode="decimal" min="50" max="260" step="0.1" placeholder="e.g. 172"></div>
  <div class="fld" id="hin-f" hidden><label for="ht2">Height (in)</label><input type="number" id="ht2" inputmode="decimal" min="20" max="102" step="0.1" placeholder="e.g. 67.7"></div>
  <div class="acts"><button id="go" class="btn" type="button">Calculate</button><button id="rst" class="btn btn-ghost" type="button">Reset</button></div>
  <p id="status" role="status" aria-live="polite" class="hint"></p>
  <p id="err" class="err" role="alert" hidden></p>
  <div id="out"></div>
  <span class="disc">For information only, not medical advice.</span>
</section>`
};
