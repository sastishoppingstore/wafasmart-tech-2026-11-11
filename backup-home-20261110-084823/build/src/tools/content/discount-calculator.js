"use strict";
const H = require("./_helpers.js");
module.exports = {
  name: "Discount Calculator",
  short: "Enter a price and one or two stacked discount percentages to get the final sale price, total saved and the same deal applied across a range of prices.",
  title: "Discount Calculator — Sale Price & You Save | Wafa Smart",
  desc: "Free discount calculator in PKR, AED, SAR, USD, GBP, EUR or INR. Handles a second stacked discount, shows amount saved and a price table. No upload.",
  h1: "Discount Calculator — sale price, stacked offers and savings",
  kw: ["discount calculator", "sale price calculator", "percent off calculator", "stacked discount calculator", "how much is 20 percent off", "amount saved calculator"],
  intro: [
    "A sticker that says '30% off' is easy; a sale that stacks a further 'extra 10% at checkout' quietly is not, because the second discount applies to the reduced price, not the original. This calculator handles both plain and stacked offers, showing the true final price, the amount you save, and the combined effective percentage so you can compare a 30+10 deal honestly against a straight 40% off.",
    "Choose the currency you actually pay in — rupees, dirhams, riyals, dollars, pounds, euro or Indian rupees — and every figure is formatted with the right symbol and decimal rules using the browser's built-in locale, so a PKR amount drops the decimals and a USD amount keeps two. There is no guesswork about whether 2,500 means two thousand five hundred or two million.",
    "Because shoppers rarely buy just one item, the page also prints a small table applying the same discount to several higher prices, so you can see at a glance what the deal does to a bigger basket. When the maths matters, download that table as a CSV and keep it. All of it happens in your browser: no price you type is recorded anywhere."
  ],
  steps: [
    "Type the original price and pick your currency from the list.",
    "Enter the first discount percentage, such as 30.",
    "Optionally add a second stacked discount, such as the extra 10 at checkout.",
    "Press Calculate to see the final price, amount saved and combined discount percentage.",
    "Read the reference table, or press 'Download CSV' to keep the numbers."
  ],
  ur: "Asli qeemat likhein, currency chunein, pehla discount % (aur chahein to doosra stacked discount) daal kar 'Calculate' dabayein. Aapko final price, kitni bachat aur mulazon ka chhoti table milegi — CSV me download bhi kar sakte hain. Sab browser me, koi upload nahi.",
  features: [
    "Plain and stacked (two-stage) discounts with correct compounding",
    "Seven currencies formatted with proper locale rules",
    "Shows final price, total saved and effective discount %",
    "Reference table applying the deal to larger basket prices",
    "One-click CSV export of the comparison table",
    "Recomputes as you edit, so trial offers are instant"
  ],
  tips: [
    "A 30% then 10% stack is a 37% total cut, not 40% — the table makes that visible.",
    "Round-check fast offers: enter the price and a 10% discount to sanity-estimate a tenth.",
    "For a bundle, put the total basket price in the top field rather than per-item.",
    "Use the CSV when comparing two retailers' stackable deals side by side.",
    "Tax and shipping are not included — this works on the discounted merchandise price."
  ],
  faqs: [
    { q: "How does a stacked discount work?", a: "The second percentage is applied to the already-reduced price: final = price × (1 − first%) × (1 − second%). Two 10% stacks give 19% off in total, not 20%, because the second 10% is smaller in rupee terms." },
    { q: "Which currencies are supported?", a: "PKR, AED, SAR, USD, GBP, EUR and INR. Each is formatted through the browser's Intl.NumberFormat so symbols and decimal places match local convention." },
    { q: "Does it include sales tax?", a: "No — it calculates the discounted merchandise price only. Add your local VAT or GST separately if you need the checkout total." },
    H.faqFree("Discount Calculator"),
    { q: "Can I compare two discounts?", a: "Enter the first offer, read the effective percentage, then change the fields for the second — the effective % line tells you which deal cuts more." },
    H.faqMobile("Discount Calculator")
  ],
  related: [["percentage-calculator", "More percentage maths"], ["pakistan-salary-tax-calculator", "Salary tax"], ["uae-vat-calculator", "Add VAT"], ["emi-loan-calculator", "Loan EMI"]],
  ui: `<section class="t-card opts" aria-label="Discount calculator inputs">
  <div class="fld"><label for="price">Original price</label><input type="number" id="price" inputmode="decimal" min="0" step="any" placeholder="e.g. 2500"></div>
  <div class="fld"><label for="cur">Currency</label><select id="cur"><option value="PKR" selected>PKR — Pakistani Rupee</option><option value="AED">AED — UAE Dirham</option><option value="SAR">SAR — Saudi Riyal</option><option value="USD">USD — US Dollar</option><option value="GBP">GBP — Pound</option><option value="EUR">EUR — Euro</option><option value="INR">INR — Indian Rupee</option></select></div>
  <div class="fld"><label for="d1">Discount 1 (%)</label><input type="number" id="d1" inputmode="decimal" min="0" max="100" step="any" placeholder="e.g. 30"></div>
  <div class="fld"><label for="d2">Extra discount 2 (%) — optional</label><input type="number" id="d2" inputmode="decimal" min="0" max="100" step="any" placeholder="e.g. 10"></div>
  <div class="acts"><button id="go" class="btn" type="button">Calculate</button><button id="rst" class="btn btn-ghost" type="button">Reset</button></div>
  <p id="status" role="status" aria-live="polite" class="hint"></p>
  <p id="err" class="err" role="alert" hidden></p>
  <div id="out"></div>
  <a id="dl" class="btn btn-wa" href="#" hidden download="discount-table.csv">Download CSV</a>
</section>`
};
