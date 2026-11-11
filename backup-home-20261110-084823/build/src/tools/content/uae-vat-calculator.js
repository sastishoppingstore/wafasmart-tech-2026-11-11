"use strict";
const H = require("./_helpers.js");
module.exports = {
  name: "UAE VAT Calculator",
  short: "Add or remove the 5% UAE VAT in AED for Dubai, Abu Dhabi and the wider UAE. Switch between net and VAT-inclusive amounts, use 0% or a custom GCC rate, and read a clear receipt-style breakdown.",
  title: "UAE VAT Calculator 2026 — Add or Remove 5% VAT in AED",
  desc: "Free UAE VAT calculator for Dubai and Abu Dhabi. Add or remove 5% VAT in AED, reverse a VAT-inclusive price, and use 0% or custom GCC rates.",
  h1: "UAE VAT Calculator — Add or Remove 5% VAT (AED)",
  kw: [
    "uae vat calculator", "uae vat calculator 2026", "5% vat calculator uae",
    "vat calculator dubai", "vat calculator abu dhabi", "aed vat calculator",
    "vat inclusive to exclusive", "reverse vat calculator", "remove vat from price",
    "add vat to price", "uae vat formula", "gcc vat calculator", "fta vat calculator",
    "5 percent vat uae"
  ],
  guide: "/blog/uae-vat-calculator-guide.html",
  guideTitle: "UAE VAT calculator guide",
  priceCurrency: "AED",
  appCategory: "FinanceApplication",
  uiFirst: true,
  intro: [
    "UAE VAT sits at a flat 5% on most goods and services, so the arithmetic is simple — but people still trip on direction. Given a net price you add 5% to reach what the customer pays; given a shelf price that already includes VAT you have to take it back out, which is not the same as subtracting 5%. This tool does both correctly and labels each line the way a tax invoice would, so you always know whether the number in front of you is net, tax or gross.",
    "Because shoppers quote VAT-inclusive totals and accountants work in exclusive amounts, the page keeps the two straight with a single mode switch. Pick whether your typed figure is a net amount or an already-inclusive one, and the calculator reverse-engineers the underlying value. The receipt-style breakdown shows Net, VAT and Gross as three tidy AED lines, exactly as you would print on a bill.",
    "The standard 5% rate and AED currency load from a small config file, with the effective date and last-updated date shown on the page. Quick buttons cover the common cases — 0% for export and zero-rated supplies, 5% for standard, and a custom box for the varied rates other GCC states use — so the same tool doubles as a light multi-country VAT helper.",
    "This page is written for UAE businesses and shoppers: freelancers in Dubai, small companies in Abu Dhabi and Sharjah, e-commerce sellers, landlords, and anyone checking a quotation or tax invoice. It works for a single line item. For a full VAT return, calculate each rate group separately and add the VAT totals."
  ],
  sections: [
    {
      id: "formula",
      h2: "UAE VAT formula (5% standard rate)",
      paras: [
        "The standard UAE VAT rate is 5%. Use the formulas below to check an invoice by hand, or type the amount into the calculator above and let it do the arithmetic.",
        "Adding VAT: VAT = net amount × 5 ÷ 100. Gross = net + VAT. Removing VAT from a VAT-inclusive total: VAT = gross × 5 ÷ 105. Net = gross − VAT. Dividing by 105, not subtracting 5% from the gross, is the step most people miss."
      ],
      table: {
        head: ["What you have", "Formula at 5%", "Example"],
        rows: [
          ["Net amount", "VAT = net × 0.05", "AED 1,000 → VAT AED 50"],
          ["Gross amount", "Net = gross ÷ 1.05", "AED 1,050 → net AED 1,000"],
          ["VAT portion only", "VAT = gross × 5 ÷ 105", "AED 1,050 → VAT AED 50"]
        ]
      }
    },
    {
      id: "examples",
      h2: "VAT-inclusive vs VAT-exclusive examples",
      paras: [
        "A VAT-exclusive price is the amount before tax. A VAT-inclusive price is what the customer actually pays. The table shows the same 5% rate in both directions so you can compare a quotation with a receipt."
      ],
      table: {
        head: ["Net (excl. VAT)", "VAT at 5%", "Gross (incl. VAT)"],
        rows: [
          ["AED 100.00", "AED 5.00", "AED 105.00"],
          ["AED 500.00", "AED 25.00", "AED 525.00"],
          ["AED 1,000.00", "AED 50.00", "AED 1,050.00"],
          ["AED 5,000.00", "AED 250.00", "AED 5,250.00"]
        ]
      }
    }
  ],
  steps: [
    "Type the amount you have and choose whether it is net (VAT-exclusive) or already VAT-inclusive.",
    "Choose a rate: 0% (zero-rated), 5% (UAE standard) or enter a custom rate for another GCC country.",
    "Check the currency (AED by default) shown in the receipt.",
    "Press Calculate to see the Net, VAT and Gross lines in a receipt layout.",
    "Press Reset to clear the amount before checking the next invoice."
  ],
  ur: "Raqam likhein aur batayein ke woh net hai ya VAT-shamil; phir rate chunein (0%, 5% ya custom). 'Calculate' dabane par Net, VAT aur Gross ki AED lines receipt jaisi ban jayengi. Rate aur currency (AED) config file se aati hai aur aap badal sakte hain. Dubai, Abu Dhabi aur poore UAE ke invoices ke liye istemal karein.",
  features: [
    "Add VAT (net → gross) and remove VAT (gross → net) directions",
    "Correct reverse-VAT maths so subtracting 5% is not mistaken for it",
    "Quick 0% / 5% rates plus a custom rate for Saudi Arabia, Oman and other GCC countries",
    "AED receipt-style Net / VAT / Gross breakdown",
    "Works for Dubai, Abu Dhabi and all seven emirates",
    "Rate, currency and effective date loaded from a config file",
    "Recomputes live as you change the amount or rate",
    "Mobile-first layout with large tap targets"
  ],
  tips: [
    "A 'price including VAT' invoice is the inclusive case — pick Remove VAT, not Add VAT.",
    "0% is for zero-rated or export supplies, not for exempt items which sit outside the VAT system.",
    "Saudi Arabia and other GCC states differ from 5%; switch to the custom rate for those.",
    "Round to fils only on the final line, keeping the calculator unrounded internally.",
    "This handles a single line item — total many lines per rate for a full VAT return.",
    "Keep the original tax invoice; a calculator result is a check, not a replacement document."
  ],
  faqs: [
    { q: "How much is VAT in the UAE in 2026?", a: "The standard UAE VAT rate is 5%. It has been 5% since VAT launched on 1 January 2018. Some supplies are zero-rated (0%) and some are exempt; those are different from the standard rate." },
    { q: "How do I remove VAT from a VAT-inclusive price?", a: "Divide the gross by 1.05, then multiply the result by 0.05 to get the VAT portion. For a 5% rate: VAT = gross × 5 ÷ 105 and net = gross − VAT. Taking a flat 5% off the gross gives a different, wrong answer — this calculator uses the correct reverse formula." },
    { q: "How do I calculate 5% VAT manually?", a: "For a net amount, multiply by 0.05 to get VAT, then add it to the net. For AED 1,000 the VAT is AED 50 and the gross is AED 1,050. For a gross amount, divide by 1.05 to go back to the net." },
    { q: "Is Dubai VAT the same as UAE VAT?", a: "Yes. Dubai, Abu Dhabi, Sharjah, Ajman, Umm Al Quwain, Ras Al Khaimah and Fujairah all use the same federal UAE VAT rules and the 5% standard rate. This calculator works for all seven emirates." },
    { q: "What is the difference between VAT-inclusive and VAT-exclusive?", a: "VAT-exclusive (net) is the price before tax. VAT-inclusive (gross) is the final price the customer pays. The same 5% rate produces AED 1,050 gross from AED 1,000 net, and AED 1,000 net from AED 1,050 gross." },
    { q: "Can I use it for Saudi Arabia or other GCC countries?", a: "Yes — choose Custom and type that country's rate. Saudi Arabia, Oman, Bahrain and other GCC states have used rates other than 5%, so confirm the current rate with the local tax authority before relying on the result." },
    { q: "What is the difference between zero-rated and exempt VAT?", a: "Zero-rated supplies are taxed at 0% and still count as VATable supplies, which usually lets a registered business recover input VAT. Exempt supplies sit outside the VAT system, so input VAT recovery is generally restricted. The calculator's 0% button is for zero-rated maths, not a ruling on your supply." },
    H.faqFree("UAE VAT Calculator"),
    H.faqPrivacy("UAE VAT Calculator", "invoice amounts"),
    H.faqMobile("UAE VAT Calculator", "The three-line receipt fits a phone screen without scrolling.")
  ],
  related: [["pakistan-salary-tax-calculator", "Salary tax calculator"], ["discount-calculator", "Discount & final price"], ["zakat-calculator", "Zakat on wealth"], ["percentage-calculator", "Percentage calculator"]],
  ui: `<section class="t-card opts" aria-label="UAE VAT calculator inputs">
  <div class="segs" role="group" aria-label="VAT rate">
    <button type="button" class="seg" data-rate="0" aria-pressed="false">0% zero-rated</button>
    <button type="button" class="seg" data-rate="5" aria-pressed="true">5% standard</button>
    <button type="button" class="seg" data-rate="custom" aria-pressed="false">Custom</button>
  </div>
  <div class="fld"><label for="amount">Amount</label><input type="number" id="amount" inputmode="decimal" min="0" step="any" placeholder="e.g. 1000"></div>
  <div class="fld"><label for="rate">VAT rate (%)</label><input type="number" id="rate" inputmode="decimal" min="0" max="100" step="any" value="5"></div>
  <div class="fld"><label for="dir">Direction</label><select id="dir"><option value="add" selected>Add VAT (amount is net)</option><option value="remove">Remove VAT (amount is inclusive)</option></select></div>
  <div class="fld"><label for="cur">Currency</label><input type="text" id="cur" value="AED" maxlength="3" autocomplete="off" spellcheck="false"></div>
  <div class="acts"><button id="go" class="btn" type="button">Calculate</button><button id="rst" class="btn btn-ghost" type="button">Reset</button></div>
  <p id="status" role="status" aria-live="polite" class="hint"></p>
  <p id="err" class="err" role="alert" hidden></p>
  <div id="out"></div>
  <span class="disc">Indicative VAT helper only — confirm the current FTA rate and your supplies' treatment before filing.</span>
</section>`
};
