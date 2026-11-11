"use strict";
const H = require("./_helpers.js");
module.exports = {
  name: "EMI Loan Calculator",
  short: "Work out monthly, quarterly or yearly loan EMIs from principal, interest rate and tenure, with total interest and a year-by-year amortisation table you can export.",
  title: "Loan EMI Calculator — Amortisation Table | Wafa Smart",
  desc: "Free EMI calculator for monthly, quarterly or annual loans. Shows EMI, total interest, total payment and a year-by-year amortisation table with CSV export.",
  h1: "EMI Loan Calculator — instalments and amortisation",
  kw: ["emi calculator", "loan emi calculator", "amortization table", "monthly payment calculator", "total interest loan", "personal loan emi"],
  intro: [
    "An EMI — equated monthly instalment — is the fixed amount you pay each period so that a loan is exactly repaid at the end of its term. It comes from the standard formula EMI = P·r·(1+r)ⁿ ÷ ((1+r)ⁿ − 1), where P is the principal, r the interest rate per period and n the number of payments. This page runs that calculation for you and, unlike a bare formula widget, also breaks the loan down year by year so you can see how much of each payment is interest versus principal.",
    "The early part of almost any loan is mostly interest. On a five-year personal loan the first year might be three-quarters interest, and only in the final months does principal repayment dominate. The amortisation table here makes that visible: for each year it lists the opening balance, the interest paid, the principal paid and the closing balance, so you can plan an early part-payment around the years that would save you the most.",
    "Because loans are quoted in different rhythms, you can choose monthly, quarterly or annual payments and enter tenure in years or months. Pick a currency and every figure is formatted with the right symbol. When you want the full schedule for a spreadsheet or a bank form, one button exports it as CSV — the numbers are computed locally and nothing you enter is uploaded."
  ],
  steps: [
    "Enter the loan principal and the annual interest rate.",
    "Set the tenure and choose whether it is in years or months.",
    "Select monthly, quarterly or annual payment frequency, and a currency.",
    "Press Calculate to see the EMI, total interest, total payment and the yearly amortisation table.",
    "Press 'Download CSV' to export the full payment schedule."
  ],
  ur: "Loan ka amount, saalana byaaj %, tenure (saal ya mahinay) aur frequency (monthly/quarterly/annual) likhein. 'Calculate' dabane par EMI, kul byaaj, kul qeemat aur saal-ba-saal amortization table milegi — poori schedule CSV me download bhi kar sakte hain.",
  features: [
    "Correct EMI formula with a graceful zero-interest path",
    "Monthly, quarterly and annual payment frequencies",
    "Tenure entered in years or months",
    "Total interest and total repayment shown up front",
    "Year-by-year amortisation table with opening and closing balances",
    "CSV export of the complete schedule and seven currency formats"
  ],
  tips: [
    "Compare the interest column across years before deciding to prepay — early years carry the most interest.",
    "A 1% drop in rate saves more over a long tenure than you expect; re-run to quantify it.",
    "Keep EMIs under roughly 40% of monthly income — raise the tenure if the number is too high.",
    "Use 'annual' frequency only for loans that genuinely bill once a year, not to sanity-check a monthly EMI.",
    "Export the CSV and add it to a spreadsheet before negotiating a balance transfer."
  ],
  faqs: [
    { q: "What EMI formula does this use?", a: "The reducing-balance formula EMI = P·r·(1+r)ⁿ ÷ ((1+r)ⁿ − 1), where r is the periodic rate (annual rate divided by payments per year) and n is the total number of payments." },
    { q: "Why is early EMI mostly interest?", a: "Interest each period is a percentage of the outstanding balance, which is highest at the start. Principal repaid per instalment therefore grows over the loan — the amortisation table shows the crossover." },
    { q: "Does a longer tenure save or cost me money?", a: "It lowers each instalment but raises total interest, because the balance stays high for longer. The total-interest line makes the trade-off explicit." },
    H.faqFree("EMI Loan Calculator"),
    { q: "Are processing fees or insurance included?", a: "No — this is the pure amortised-loan maths. Add bank fees and insurance outside it to get the true cost of borrowing." },
    H.faqPrivacy("EMI Loan Calculator", "loan figures")
  ],
  related: [["pakistan-salary-tax-calculator", "Salary after tax"], ["discount-calculator", "Discount calculator"], ["percentage-calculator", "Percentage maths"], ["zakat-calculator", "Zakat on savings"]],
  ui: `<section class="t-card opts" aria-label="EMI calculator inputs">
  <div class="fld"><label for="p">Loan principal</label><input type="number" id="p" inputmode="decimal" min="0" step="any" placeholder="e.g. 500000"></div>
  <div class="fld"><label for="rate">Annual interest rate (%)</label><input type="number" id="rate" inputmode="decimal" min="0" max="100" step="any" placeholder="e.g. 14"></div>
  <div class="fld"><label for="ten">Tenure</label><input type="number" id="ten" inputmode="decimal" min="0" step="any" placeholder="e.g. 5"></div>
  <div class="fld"><label for="tu">Tenure unit</label><select id="tu"><option value="y" selected>Years</option><option value="m">Months</option></select></div>
  <div class="fld"><label for="freq">Payment frequency</label><select id="freq"><option value="12" selected>Monthly</option><option value="4">Quarterly</option><option value="1">Annual</option></select></div>
  <div class="fld"><label for="cur">Currency</label><select id="cur"><option value="PKR" selected>PKR</option><option value="INR">INR</option><option value="USD">USD</option><option value="AED">AED</option><option value="SAR">SAR</option><option value="GBP">GBP</option><option value="EUR">EUR</option></select></div>
  <div class="acts"><button id="go" class="btn" type="button">Calculate</button><button id="rst" class="btn btn-ghost" type="button">Reset</button></div>
  <p id="status" role="status" aria-live="polite" class="hint"></p>
  <p id="err" class="err" role="alert" hidden></p>
  <div id="out"></div>
  <a id="dl" class="btn btn-wa" href="#" hidden download="emi-schedule.csv">Download CSV</a>
</section>`
};
