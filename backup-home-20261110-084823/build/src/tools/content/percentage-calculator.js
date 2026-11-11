"use strict";
const H = require("./_helpers.js");
module.exports = {
  name: "Percentage Calculator",
  short: "Three percentage modes on one page — what X% of Y is, X as a percentage of Y, and the percent increase or decrease between two numbers, each with worked steps.",
  title: "Percentage Calculator — Three Modes with Steps | Wafa Smart",
  desc: "Free percentage calculator: what is X% of Y, X is what percent of Y, and percent increase/decrease between two values — every answer shown with steps.",
  h1: "Percentage Calculator — three modes, worked steps",
  kw: ["percentage calculator", "what is x percent of y", "percentage increase calculator", "percent difference", "x is what percent of y", "percentage change formula"],
  intro: [
    "Percentages wear out a pencil fast, and the three questions people actually ask are subtly different: finding a share of a number, expressing one number as a slice of another, and measuring how much something moved up or down. This page puts all three behind one tab switch, so you pick the question in a tap instead of hunting for a different calculator each time.",
    "Each mode shows the arithmetic as worked steps, not just the final figure. That matters for students checking homework, for someone auditing a shop discount, or for an analyst verifying a growth rate. You see the percentage converted to a decimal, the multiplication or division written out, and the rounded answer — the same layout a tutor would draw on a board.",
    "The maths itself is elementary but easy to flip the wrong way round: increase uses (new − old) ÷ old, whereas 'what percent of' uses part ÷ whole. Confusing those two is the single most common percentage error, which is why the fields relabel themselves for each mode. Only the two numbers and the chosen mode are needed; nothing is stored or uploaded, and results refresh as you type."
  ],
  steps: [
    "Tap one of the three mode buttons at the top: X% of Y, X is what % of Y, or increase/decrease.",
    "Watch the two field labels change to match that mode's meaning.",
    "Type the first number into the top box and the second into the bottom box.",
    "Press Calculate to see the answer with the worked steps written out.",
    "Switch mode and reuse the same numbers to answer a different question."
  ],
  ur: "Oopar teen modes me se ek chunein — 'X% of Y', 'X is what % of Y' ya 'increase/decrease' — phir do numbers likh kar 'Calculate' dabayein. Jawab ke saath poora kaam (worked steps) bhi nazar aayega. Sab kuch aapke browser me, koi upload nahi.",
  features: [
    "Three modes: X% of a number, part-as-a-percent-of-whole, and percent change",
    "Full worked steps under every answer for easy checking",
    "Field labels reword automatically when you switch mode",
    "Increase versus decrease clearly signed in the result",
    "Live recalculation on every keystroke",
    "No history kept — numbers exist only while the tab is open"
  ],
  tips: [
    "For percent change, the second number is the 'to' value and the first is the 'from' baseline — swapping them flips the sign.",
    "A 20% increase then a 20% decrease is not back to start; run the change mode to see the net loss.",
    "Round only at the end — the steps show exact intermediate values so you can match a marking scheme.",
    "To find reverse percentages (original before a markup), use the 'X is what % of Y' mode and rearrange.",
    "Negative answers simply mean a decrease; the steps make that explicit rather than hiding it."
  ],
  faqs: [
    { q: "What is the percent increase formula?", a: "Divide the change by the original and multiply by 100: (new − old) ÷ old × 100. A positive result is an increase, a negative one is a decrease." },
    { q: "Why do the labels change when I switch mode?", a: "Because the same two boxes mean different things per question — one mode's first number is a percentage, another's is a raw value. Relabelling prevents the classic mix-up." },
    { q: "Can it handle percentages over 100?", a: "Yes. 'X is what % of Y' happily returns more than 100 when the part exceeds the whole, and the change mode returns large values for big jumps." },
    H.faqFree("Percentage Calculator"),
    { q: "Does it round the answer?", a: "Displayed values are rounded to two decimals for readability, but the worked steps show the arithmetic so you can keep more precision if needed." },
    H.faqMobile("Percentage Calculator")
  ],
  related: [["discount-calculator", "Discount calculator"], ["emi-loan-calculator", "Loan EMI"], ["pakistan-salary-tax-calculator", "Salary tax"], ["gpa-cgpa-calculator", "GPA / CGPA"]],
  ui: `<section class="t-card opts" aria-label="Percentage calculator inputs">
  <div class="segs" role="group" aria-label="Calculation mode">
    <button type="button" class="seg" data-mode="of" aria-pressed="true">What is X% of Y</button>
    <button type="button" class="seg" data-mode="what" aria-pressed="false">X is what % of Y</button>
    <button type="button" class="seg" data-mode="change" aria-pressed="false">% increase / decrease</button>
  </div>
  <div class="fld"><label for="n1" id="l1">X (percentage)</label><input type="number" id="n1" inputmode="decimal" step="any" placeholder="e.g. 15"></div>
  <div class="fld"><label for="n2" id="l2">Y (value)</label><input type="number" id="n2" inputmode="decimal" step="any" placeholder="e.g. 200"></div>
  <div class="acts"><button id="go" class="btn" type="button">Calculate</button><button id="rst" class="btn btn-ghost" type="button">Reset</button></div>
  <p id="status" role="status" aria-live="polite" class="hint"></p>
  <p id="err" class="err" role="alert" hidden></p>
  <div id="out"></div>
</section>`
};
