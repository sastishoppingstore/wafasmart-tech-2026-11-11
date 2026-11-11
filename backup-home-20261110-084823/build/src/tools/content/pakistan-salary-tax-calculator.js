"use strict";
const H = require("./_helpers.js");
module.exports = {
  name: "Pakistan Salary Tax Calculator",
  short: "Compute FY 2025-26 income tax on a salaried individual using Finance Act 2024 slabs, with monthly and annual figures and a slab table highlighting your bracket.",
  title: "Pakistan Salary Tax Calculator — FY 2025-26 | Wafa Smart",
  desc: "Free Pakistan salary tax calculator for FY 2025-26 (Finance Act 2024 slabs). Monthly and annual tax, take-home and a highlighted slab table. PKR.",
  h1: "Pakistan Salary Tax Calculator — FY 2025-26 salaried",
  kw: ["pakistan salary tax calculator", "income tax pakistan 2025-2026", "fbr slabs salaried individual", "monthly tax on salary pk", "finance act 2024 tax", "take home salary pakistan"],
  guide: "/blog/pakistan-salary-tax-calculator-guide.html",
  guideTitle: "Pakistan salary tax calculator guide",
  intro: [
    "Salaried employees in Pakistan have tax withheld every month, but the slab structure in the Finance Act is written on annual income — so a quick mental estimate rarely matches the payslip. This calculator closes that gap: you enter a salary (either as the monthly figure you are paid or the annual total), and it applies the piecewise slab table for the 2025-26 tax year, then reports both the annual tax and the monthly deduction, plus your effective rate and take-home pay.",
    "The slabs are not a single flat percentage. Income up to the first threshold is untaxed, and each band above it takes a rising slice — 5%, then 15%, 25% and so on — only on the amount that exceeds that band's lower limit, added to the fixed tax accumulated from the bands below. Reading a marginal rate wrongly is the usual mistake, which is why the page prints the whole slab table and highlights the exact bracket your income lands in, so you can see the maths rather than just a headline figure.",
    "Because tax law and thresholds are revised with each budget, the slab table is not hard-coded into the page — it is loaded from a configuration file with the effective financial year and a last-updated date shown on screen, and it falls back to safe defaults if the file cannot be fetched. That makes it quick to keep current, but it is still an estimate: verify the numbers with the FBR or a tax adviser before relying on them for planning."
  ],
  steps: [
    "Enter your salary and choose whether the figure is monthly or annual.",
    "Leave it as gross taxable income — personal reliefs and deductions are applied separately by your employer.",
    "Press Calculate to run the FY 2025-26 slab maths.",
    "Read annual tax, monthly tax, effective rate and take-home, and see your bracket highlighted in the table.",
    "Use 'Download CSV' to keep the slab table for reference."
  ],
  ur: "Apni tankhwah likhein (monthly ya annual batayein) aur 'Calculate' dabayein. FY 2025-26 ki Finance Act 2024 slabs lagu ho jayengi: saalana tax, mahwarana tax, effective rate aur take-home nazar aayega, aur table me aapka bracket highlight hoga. Slab config file se aati hain — FBR se tasdeeq karein.",
  features: [
    "Finance Act 2024 salaried slab maths applied piecewise, band by band",
    "Enter income as monthly or annual — it annualises automatically",
    "Annual tax, monthly deduction, effective rate and take-home shown",
    "Full slab table with your marginal bracket highlighted",
    "Slabs and effective year loaded from a config file with last-updated date",
    "CSV export of the slab table and PKR currency formatting"
  ],
  tips: [
    "Tax is on taxable income, not gross — reliefs and deductions can move your bracket down.",
    "The highlighted row is your marginal rate; lower portions are still taxed at the earlier rates.",
    "The monthly figure is annual tax ÷ 12, which is what your employer withholds per month.",
    "Re-run after a mid-year increment since a higher slab can jump the monthly deduction.",
    "For income sources beyond salary (rent, capital gains) use the separate slab tables the FBR publishes."
  ],
  faqs: [
    { q: "Which tax year is used?", a: "The 2025-26 financial year, based on the Finance Act 2024 slabs for a salaried individual. The effective year and last-updated date are printed on the result so you can confirm which budget it reflects." },
    { q: "Do you enter monthly or yearly salary?", a: "Either — there is a toggle. If you pick monthly it multiplies by twelve to reach the annual figure the slabs are written against, then divides the tax back for the monthly deduction." },
    { q: "Why is my payslip tax slightly different?", a: "Employers apply available personal credits, allowances and sometimes the reduced-rate slab, none of which this generic calculator models. Treat it as a close estimate and verify with FBR." },
    { q: "Is a minimum tax applied?", a: "Yes — where the computed slab tax for an income above the nil band falls below the FBR minimum, the tool raises it to the stated minimum. The threshold used is shown in the loaded config." },
    H.faqFree("Pakistan Salary Tax Calculator"),
    H.faqPrivacy("Pakistan Salary Tax Calculator", "salary figures")
  ],
  related: [["zakat-calculator", "Zakat on wealth"], ["uae-vat-calculator", "VAT calculator"], ["discount-calculator", "Percentages & money"], ["emi-loan-calculator", "Loan EMI"]],
  ui: `<section class="t-card opts" aria-label="Pakistan salary tax calculator inputs">
  <div class="fld"><label for="income">Salary amount (PKR)</label><input type="number" id="income" inputmode="decimal" min="0" step="any" placeholder="e.g. 150000"></div>
  <div class="fld"><label for="basis">Enter as</label><select id="basis"><option value="m" selected>Monthly</option><option value="a">Annual</option></select></div>
  <div class="acts"><button id="go" class="btn" type="button">Calculate</button><button id="rst" class="btn btn-ghost" type="button">Reset</button></div>
  <p id="status" role="status" aria-live="polite" class="hint"></p>
  <p id="err" class="err" role="alert" hidden></p>
  <div id="out"></div>
  <a id="dl" class="btn btn-wa" href="#" hidden download="pakistan-tax-slabs.csv">Download CSV</a>
  <span class="disc">Estimate only. Slabs loaded from config (see last-updated date) — always verify current FBR rates before relying on this.</span>
</section>`
};
