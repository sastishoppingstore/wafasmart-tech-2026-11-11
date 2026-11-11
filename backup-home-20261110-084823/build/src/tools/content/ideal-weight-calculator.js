"use strict";
const H = require("./_helpers.js");
module.exports = {
  name: "Ideal Weight Calculator",
  short: "Compare four clinical ideal-weight formulas — Hamwi, Devine, Robinson and Miller — side by side, plus the healthy BMI range for your height.",
  title: "Ideal Weight Calculator — Compare 4 Formulas | Wafa Smart",
  desc: "Free ideal weight calculator using Hamwi, Devine, Robinson and Miller formulas side by side, plus your healthy BMI range. Sex and height based. Private.",
  h1: "Ideal Weight Calculator — four formulas compared",
  kw: ["ideal weight calculator", "ideal body weight formula", "hamwi formula", "devine formula", "ideal weight for height", "healthy weight range bmi"],
  intro: [
    "There is no single 'correct' ideal weight. Four different equations were built by different researchers for different reasons — dosing drugs, setting ventilator targets, quick bedside estimates — and they disagree with each other by several kilograms for the same person. Instead of forcing one arbitrary answer, this page computes all four and shows them together, so you can see the realistic band rather than a misleading single number.",
    "Each formula keys off your sex and how far your height sits above five feet. Hamwi and Devine add the largest amount per extra inch, Robinson and Miller are more conservative, so a tall man will see a spread from the 70s to the 80s kilograms from identical inputs. That spread is the honest picture: 'ideal weight' is a range decided by which authority you consult, not a fact of nature.",
    "Because formula weights were designed for dosing rather than wellness, the tool also prints the healthy BMI range for your height (18.5 to 24.9 kg/m²). Where the four estimates and the BMI band overlap is the practical target zone. Treat the table as decision support — a body-composition scan or a clinician's view beats any of these equations for a real plan."
  ],
  steps: [
    "Select your sex, since every formula weights height differently for men and women.",
    "Enter your height in centimetres.",
    "Press Calculate to render the Hamwi, Devine, Robinson and Miller weights in a table.",
    "Read the healthy BMI range row for the wellness target band.",
    "Reset and re-run if you want to compare how a different height changes the spread."
  ],
  ur: "Apna sex aur qad (cm) likh kar 'Calculate' dabayein. Chaar mashhoor formulas (Hamwi, Devine, Robinson, Miller) ka ideal weight aik table me saath nazar aayega, plus BMI-based sehat-mand range. Sab hisaab aapke browser me, koi upload nahi.",
  features: [
    "Hamwi, Devine, Robinson and Miller computed together",
    "Sex-specific constants applied correctly for each formula",
    "Results laid out in a clean comparison table",
    "Healthy BMI 18.5–24.9 weight range for your height",
    "Per-inch-over-5-foot logic shown transparently",
    "No sign-up — your height and sex never leave the page"
  ],
  tips: [
    "Focus on the spread between formulas, not a single figure — the range is the real answer.",
    "If you have a broad build or high muscle mass, the upper end of the table is more realistic than the average.",
    "The BMI band is the healthiest long-term target; formula weights were designed for drug dosing.",
    "Shorter and taller people see the formulas diverge most — that is expected, not an error.",
    "Track changes against a range you re-check monthly rather than chasing one exact kilogram."
  ],
  faqs: [
    { q: "Why do the four formulas give different numbers?", a: "They were derived from different populations and for different purposes (medicine dosing, respiratory settings, quick clinical rules). Their per-inch weight slopes differ, so they legitimately disagree by a few kilos." },
    { q: "Which formula should I trust?", a: "For a medical dose use the one that clinician follows; for a lifestyle goal, use the healthy BMI band and pick a figure you can sustain. None is universally 'right'." },
    { q: "Does it work if I am under five feet?", a: "Yes — the formulas extrapolate below five feet, though accuracy drops for very short statures, so lean on the BMI band there." },
    H.faqFree("Ideal Weight Calculator"),
    { q: "Is ideal weight the same as my best weight?", a: "No. These are statistical estimates for a generic adult. Your healthiest weight depends on composition, age and medical history that no height-based formula knows." },
    H.faqPrivacy("Ideal Weight Calculator", "height and sex")
  ],
  related: [["bmi-calculator", "Check your BMI"], ["calorie-calculator", "Calorie needs"], ["water-intake-calculator", "Water target"], ["age-calculator", "Age calculator"]],
  ui: `<section class="t-card opts" aria-label="Ideal weight calculator inputs">
  <div class="fld"><label for="sex">Sex</label><select id="sex"><option value="m">Male</option><option value="f">Female</option></select></div>
  <div class="fld"><label for="hgt">Height (cm)</label><input type="number" id="hgt" inputmode="decimal" min="120" max="250" step="0.1" placeholder="e.g. 172"></div>
  <div class="acts"><button id="go" class="btn" type="button">Calculate</button><button id="rst" class="btn btn-ghost" type="button">Reset</button></div>
  <p id="status" role="status" aria-live="polite" class="hint"></p>
  <p id="err" class="err" role="alert" hidden></p>
  <div id="out"></div>
  <span class="disc">For information only, not medical advice.</span>
</section>`
};
