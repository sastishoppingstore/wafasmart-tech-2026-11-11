"use strict";
/* UAE VAT article cluster: 7 SEO guides. Body is trusted static HTML. */
module.exports = [
  {
    slug: "uae-vat-calculator-guide",
    title: "UAE VAT Calculator Guide 2026: Add or Remove 5% VAT",
    h1: "UAE VAT Calculator Guide: Add or Remove 5% VAT in 2026",
    desc: "Use a UAE VAT calculator in AED the right way: add 5% VAT, remove VAT from a gross price, and check Dubai or Abu Dhabi invoices without direction mistakes.",
    kw: "uae vat calculator guide, how to calculate vat in uae, 5% vat calculator, uae vat formula, vat calculator dubai, aed vat calculator",
    category: "UAE VAT",
    date: "2026-10-30",
    read: 7,
    image: "service-ecommerce",
    imageAlt: "UAE VAT calculator guide for Dubai and Abu Dhabi invoices",
    intro: "UAE VAT is 5% on most goods and services. Add VAT by multiplying the net amount by 1.05; remove VAT by dividing the gross amount by 1.05. The direction matters because subtracting 5% from a VAT-inclusive total gives the wrong answer.",
    body: `
<h2 id="quick-formula">The 5% VAT formula in one line</h2>
<p>For a net (VAT-exclusive) amount: <b>gross = net x 1.05</b> and <b>VAT = net x 0.05</b>. For a gross (VAT-inclusive) amount: <b>net = gross / 1.05</b> and <b>VAT = gross x 5 / 105</b>. Those two formulas are the whole calculator. Everything else is labelling and rounding.</p>
<p>Example: AED 1,000 net becomes AED 1,050 gross, with AED 50 VAT. Reverse it: AED 1,050 gross becomes AED 1,000 net, again with AED 50 VAT. The VAT amount is the same in both directions; only the starting number changes.</p>

<h2 id="why-direction">Why adding and removing VAT are not the same</h2>
<p>A common mistake is to take a shelf price of AED 1,050 and subtract 5%. That gives AED 997.50, not AED 1,000. The 5% was calculated on the net amount, so the gross contains 105%, not 100%. To go back, divide by 1.05.</p>
<ul>
<li><b>Add VAT:</b> you know the net price and need the customer total.</li>
<li><b>Remove VAT:</b> you know the customer total and need the net revenue and tax portion.</li>
<li><b>VAT portion only:</b> use gross x 5 / 105, which is the same as gross minus net.</li>
</ul>

<h2 id="how-to-use">How to use the Wafa Smart UAE VAT calculator</h2>
<ol>
<li>Type the amount you have. Choose <b>Add VAT</b> if it is net, or <b>Remove VAT</b> if it already includes VAT.</li>
<li>Leave the rate at 5% for the UAE standard rate. Use 0% for zero-rated maths, or Custom for another GCC rate.</li>
<li>Check the currency. The default is AED; you can change the three-letter code.</li>
<li>Press Calculate. The receipt shows Net, VAT and Gross as separate lines.</li>
<li>Use Reset before checking the next invoice so old numbers do not carry over.</li>
</ol>
<p><a href="/tools/uae-vat-calculator.html">Open the free UAE VAT calculator</a> — it works in the browser, needs no upload and runs on mobile.</p>

<h2 id="examples">Worked AED examples</h2>
<ul>
<li><b>AED 100 net:</b> VAT AED 5, gross AED 105.</li>
<li><b>AED 500 net:</b> VAT AED 25, gross AED 525.</li>
<li><b>AED 5,000 net:</b> VAT AED 250, gross AED 5,250.</li>
<li><b>AED 1,050 gross:</b> net AED 1,000, VAT AED 50.</li>
<li><b>AED 525 gross:</b> net AED 500, VAT AED 25.</li>
</ul>

<h2 id="mistakes">Five mistakes to avoid</h2>
<ol>
<li><b>Subtracting 5% from the gross.</b> Use division by 1.05 instead.</li>
<li><b>Mixing net and gross in one total.</b> Label every figure before you add lines together.</li>
<li><b>Rounding too early.</b> Keep full precision while calculating and round the final fils amount only.</li>
<li><b>Using 5% for an exempt supply.</b> Zero-rated and exempt are not the same thing.</li>
<li><b>Treating a calculator as a tax invoice.</b> A tax invoice still needs the supplier and customer details, TRN, date, invoice number and VAT breakdown.</li>
</ol>

<h2 id="who-for">Who this guide is for</h2>
<p>Freelancers in Dubai, small companies in Abu Dhabi and Sharjah, online sellers, landlords and anyone checking a quotation. It handles one line at a time. For a full VAT return, calculate each rate group separately and add the VAT totals.</p>
<p>Rates and rules can change. Confirm the current FTA position before filing a return. The calculator is an arithmetic helper, not tax advice.</p>`,
    faqs: [
      { q: "How do I calculate 5% VAT in the UAE?", a: "Multiply the net amount by 0.05 to get VAT, then add it to the net. For AED 1,000 the VAT is AED 50 and the gross is AED 1,050." },
      { q: "How do I remove 5% VAT from a total?", a: "Divide the gross by 1.05. For AED 1,050 the net is AED 1,000 and the VAT portion is AED 50. Do not subtract 5% from the gross." },
      { q: "Is VAT 5% in Dubai?", a: "Yes. Dubai uses the federal UAE VAT rules, including the 5% standard rate. The same rate applies across the seven emirates." },
      { q: "Can I use the calculator for a custom GCC rate?", a: "Yes. Choose Custom and enter the rate you need. Confirm the current rate with the relevant tax authority before relying on the result." }
    ],
    related: [
      ["/blog/remove-vat-from-price-uae.html", "How to remove VAT from a UAE price"],
      ["/blog/vat-inclusive-vs-vat-exclusive-uae.html", "VAT-inclusive vs VAT-exclusive"],
      ["/blog/uae-vat-rates-2026.html", "UAE VAT rates in 2026"]
    ],
    cta: { h: "Check a UAE invoice in seconds", p: "Add or remove 5% VAT in AED with a receipt-style breakdown.", href: "/tools/uae-vat-calculator.html", label: "Open UAE VAT calculator" }
  },
  {
    slug: "remove-vat-from-price-uae",
    title: "How to Remove VAT from a Price in the UAE (5% Reverse VAT)",
    h1: "How to Remove VAT from a Price in the UAE",
    desc: "Learn the correct reverse VAT formula for the UAE. Remove 5% VAT from a gross price without subtracting 5% by mistake, with clear AED examples.",
    kw: "remove vat from price uae, reverse vat calculator, vat inclusive to exclusive, 5% vat reverse calculation, uae vat formula",
    category: "UAE VAT",
    date: "2026-10-30",
    read: 6,
    image: "service-management",
    imageAlt: "Removing VAT from a UAE price with a reverse VAT calculation",
    intro: "To remove 5% VAT from a UAE gross price, divide by 1.05. The VAT portion is gross x 5 / 105. Subtracting 5% from the gross is wrong because the gross is 105% of the net, not 100%.",
    body: `
<h2 id="formula">The reverse VAT formula</h2>
<p><b>Net = gross / 1.05</b> and <b>VAT = gross - net</b>. The same VAT amount can be written as <b>gross x 5 / 105</b>. For a 5% rate, 105 is the key number: 100 parts net plus 5 parts VAT.</p>
<div class="glass" style="padding:16px;margin:18px 0"><b>Example:</b> gross AED 1,050 / 1.05 = net AED 1,000. VAT = AED 1,050 - AED 1,000 = AED 50.</div>

<h2 id="why-wrong">Why subtracting 5% is wrong</h2>
<p>If you take 5% off AED 1,050, you get AED 997.50. The correct net is AED 1,000. The difference is AED 2.50 on a small invoice, but it grows quickly on rent, equipment or monthly bills. Accountants call this the reverse VAT or VAT-inclusive calculation.</p>
<ul>
<li><b>Wrong:</b> gross x 0.95.</li>
<li><b>Right:</b> gross / 1.05.</li>
<li><b>VAT portion:</b> gross x 5 / 105.</li>
</ul>

<h2 id="when">When you need to remove VAT</h2>
<ul>
<li>A customer quotes a VAT-inclusive shelf price and you need your net revenue.</li>
<li>You are checking whether a supplier invoice added VAT correctly.</li>
<li>You are reimbursing an employee for a purchase that included VAT.</li>
<li>You are preparing bookkeeping entries and need the input VAT figure.</li>
<li>You are comparing a UAE price with a net price from another country.</li>
</ul>

<h2 id="examples">Reverse VAT examples in AED</h2>
<ul>
<li><b>AED 105 gross:</b> net AED 100, VAT AED 5.</li>
<li><b>AED 525 gross:</b> net AED 500, VAT AED 25.</li>
<li><b>AED 1,050 gross:</b> net AED 1,000, VAT AED 50.</li>
<li><b>AED 5,250 gross:</b> net AED 5,000, VAT AED 250.</li>
<li><b>AED 10,500 gross:</b> net AED 10,000, VAT AED 500.</li>
</ul>

<h2 id="calculator">Use the calculator instead of hand maths</h2>
<p>The <a href="/tools/uae-vat-calculator.html">UAE VAT calculator</a> has a Remove VAT mode. Type the gross amount, choose Remove VAT, keep the rate at 5% and press Calculate. The result shows net, VAT and gross separately so you can copy the right line into your books.</p>
<p>For a single invoice line, the calculator is enough. For a full VAT return, total the net and VAT for each rate group separately. Do not add gross totals from different rates and reverse them in one step.</p>

<h2 id="records">Keep the audit trail</h2>
<p>Save the original invoice, not just the calculator result. A VAT calculation is a check; the tax invoice is the supporting document. If the invoice is in a foreign currency, keep the conversion working and follow FTA rules for the VAT amount.</p>`,
    faqs: [
      { q: "What is the reverse VAT formula for 5%?", a: "Net = gross / 1.05 and VAT = gross x 5 / 105. For AED 1,050 gross, net is AED 1,000 and VAT is AED 50." },
      { q: "Why is removing VAT not the same as a 5% discount?", a: "A discount is taken from the gross selling price. VAT was added to the net price, so the gross contains 105%. Dividing by 1.05 reverses the addition correctly." },
      { q: "Can I remove VAT from a total that includes multiple rates?", a: "No. Split the invoice into rate groups first, then reverse each group separately. One blended rate will not be accurate." },
      { q: "Does the calculator work for 0% VAT?", a: "Yes. At 0% the net and gross are the same and the VAT line is zero." }
    ],
    related: [
      ["/blog/uae-vat-calculator-guide.html", "UAE VAT calculator guide"],
      ["/blog/vat-inclusive-vs-vat-exclusive-uae.html", "Inclusive vs exclusive VAT"],
      ["/blog/uae-tax-invoice-requirements.html", "UAE tax invoice checklist"]
    ],
    cta: { h: "Reverse a VAT-inclusive price", p: "Enter the gross amount and get net plus VAT in AED.", href: "/tools/uae-vat-calculator.html", label: "Remove VAT now" }
  },
  {
    slug: "vat-inclusive-vs-vat-exclusive-uae",
    title: "VAT-Inclusive vs VAT-Exclusive in the UAE: What's the Difference?",
    h1: "VAT-Inclusive vs VAT-Exclusive in the UAE",
    desc: "Understand VAT-inclusive and VAT-exclusive prices in the UAE with a 5% formula, AED examples, and a simple way to switch between net and gross.",
    kw: "vat inclusive vs vat exclusive uae, vat exclusive meaning, vat inclusive price, uae vat 5%, net vs gross vat",
    category: "UAE VAT",
    date: "2026-10-30",
    read: 6,
    image: "service-website",
    imageAlt: "VAT-inclusive and VAT-exclusive prices in the UAE",
    intro: "VAT-exclusive means the price before tax. VAT-inclusive means the final price the customer pays. At 5%, AED 1,000 exclusive becomes AED 1,050 inclusive; AED 1,050 inclusive goes back to AED 1,000 exclusive.",
    body: `
<h2 id="definitions">The two definitions</h2>
<p><b>VAT-exclusive (net):</b> the amount the business earns before VAT is added. A quotation usually shows this line first. <b>VAT-inclusive (gross):</b> the amount the customer actually pays, including the VAT. A shelf price or a restaurant menu is usually inclusive.</p>
<p>Both numbers describe the same sale. The difference is whether the 5% has been added yet.</p>

<h2 id="examples">Same sale, two ways</h2>
<ul>
<li>Net AED 100 + VAT AED 5 = gross AED 105.</li>
<li>Net AED 500 + VAT AED 25 = gross AED 525.</li>
<li>Net AED 1,000 + VAT AED 50 = gross AED 1,050.</li>
<li>Net AED 5,000 + VAT AED 250 = gross AED 5,250.</li>
</ul>
<p>Going from net to gross is multiplication by 1.05. Going from gross to net is division by 1.05. The VAT portion is always the difference between the two.</p>

<h2 id="which-one">Which one should an invoice show?</h2>
<p>A full UAE tax invoice normally shows the net amount, the VAT rate, the VAT amount and the gross total. That gives the customer and the tax authority a complete picture. A simplified invoice can show less detail for small sales, but the VAT must still be clear.</p>
<p>If you only show a gross price, the customer cannot see how much tax is inside it. If you only show a net price, the customer may be surprised at checkout. Show both when you can.</p>

<h2 id="business">Why the difference matters for a business</h2>
<ul>
<li><b>Revenue reporting:</b> sales records usually use net revenue, with VAT kept separately.</li>
<li><b>Input VAT:</b> the VAT portion on a purchase may be recoverable if you have a valid tax invoice.</li>
<li><b>Pricing:</b> a 5% VAT-inclusive price does not mean 5% profit; the tax is not your money.</li>
<li><b>VAT return:</b> output VAT and input VAT are reported separately, not as one gross total.</li>
</ul>

<h2 id="switch">How to switch between the two</h2>
<p>Use the <a href="/tools/uae-vat-calculator.html">UAE VAT calculator</a>. Choose Add VAT when your amount is net, or Remove VAT when your amount is inclusive. The receipt shows the three lines, so you can check both sides of the same transaction.</p>
<p>Do not mix inclusive and exclusive amounts in one total. Label each line first, then add like with like. This is the most common source of small VAT errors in spreadsheets.</p>`,
    faqs: [
      { q: "What does VAT-exclusive mean?", a: "It is the price before VAT is added. At 5%, a VAT-exclusive price of AED 1,000 becomes AED 1,050 when VAT is added." },
      { q: "What does VAT-inclusive mean?", a: "It is the final price the customer pays, with VAT already inside. AED 1,050 inclusive contains AED 1,000 net and AED 50 VAT." },
      { q: "Is a UAE shelf price usually VAT-inclusive?", a: "Consumer-facing prices are often displayed inclusive so the customer knows the final amount. Business quotations often show net plus VAT separately." },
      { q: "How do I convert inclusive to exclusive?", a: "Divide by 1.05 at the 5% rate. For AED 1,050, the net is AED 1,000." }
    ],
    related: [
      ["/blog/remove-vat-from-price-uae.html", "Remove VAT from a price"],
      ["/blog/uae-vat-calculator-guide.html", "UAE VAT calculator guide"],
      ["/blog/uae-vat-rates-2026.html", "UAE VAT rates 2026"]
    ],
    cta: { h: "See both sides of the same sale", p: "Switch between net and gross with the free AED calculator.", href: "/tools/uae-vat-calculator.html", label: "Open VAT calculator" }
  },
  {
    slug: "uae-vat-rates-2026",
    title: "UAE VAT Rates 2026: 5%, Zero-Rated and Exempt Supplies",
    h1: "UAE VAT Rates 2026: 5%, Zero-Rated and Exempt",
    desc: "A clear guide to UAE VAT rates in 2026: the 5% standard rate, 0% zero-rated supplies, exempt items, and how to choose the right rate for a calculation.",
    kw: "uae vat rates 2026, uae vat 5 percent, zero rated vat uae, exempt vat uae, standard vat rate uae",
    category: "UAE VAT",
    date: "2026-10-30",
    read: 7,
    image: "service-ecommerce",
    imageAlt: "UAE VAT rates 2026 guide showing 5 percent standard rate",
    intro: "The UAE standard VAT rate is 5%. Some supplies are zero-rated at 0%, and some are exempt. Zero-rated and exempt both produce no VAT on the sale, but they are treated differently for input VAT recovery.",
    body: `
<h2 id="standard">The standard rate: 5%</h2>
<p>UAE VAT launched on 1 January 2018 at a standard rate of 5%. Most goods and services fall here: general trading, professional services, restaurant meals, electronics, furniture and many consumer products. If you are unsure, start with the standard rate and confirm the treatment of your specific supply.</p>

<h2 id="zero">Zero-rated supplies: 0%</h2>
<p>Zero-rated supplies are taxable at 0%. The supplier does not charge VAT to the customer, but the supply is still within the VAT system. A registered business may be able to recover input VAT linked to those supplies, subject to the rules.</p>
<p>Common examples include exports of goods and services, international transport, certain qualifying investment gold, and some healthcare or education supplies in specific circumstances. The details matter: a supply that looks like an export can fail the conditions if the documentation is incomplete.</p>

<h2 id="exempt">Exempt supplies</h2>
<p>Exempt supplies are outside the VAT system. No VAT is charged, but input VAT recovery is generally restricted. Common examples include certain healthcare services, certain education services and residential rent. Do not automatically treat every clinic, school or landlord as exempt; the exact service and the customer can change the answer.</p>
<div class="glass" style="padding:16px;margin:18px 0"><b>Quick rule:</b> 5% is the default. 0% is a specific zero-rated category. Exempt is a separate category. If you are not certain, ask a UAE tax adviser before issuing the invoice.</div>

<h2 id="compare">Zero-rated vs exempt at a glance</h2>
<ul>
<li><b>VAT charged to customer:</b> 0% for zero-rated, no VAT for exempt.</li>
<li><b>VAT return:</b> zero-rated supplies are usually reported as taxable supplies at 0%; exempt supplies are reported separately.</li>
<li><b>Input VAT:</b> recovery is generally more favourable for zero-rated supplies, but restrictions apply; exempt supplies usually restrict recovery.</li>
<li><b>Invoice:</b> show the correct rate and a clear description so the treatment is auditable.</li>
</ul>

<h2 id="calculator">How to use the calculator for each rate</h2>
<p>The <a href="/tools/uae-vat-calculator.html">UAE VAT calculator</a> has quick buttons for 0% and 5%, plus a custom rate box. Use 0% when you are checking the arithmetic of a zero-rated line. Use 5% for standard supplies. Use Custom only when you are deliberately working with another rate, such as a different GCC country.</p>
<p>Do not use the calculator to decide whether a supply is exempt. That is a tax-classification question. The calculator only does the arithmetic once you know the rate.</p>

<h2 id="changes">Do UAE VAT rates change?</h2>
<p>The 5% standard rate has been stable since 2018, but tax rules and thresholds can change. Check the Federal Tax Authority and your tax adviser before filing. This page is a plain-English guide, not a replacement for the law.</p>`,
    faqs: [
      { q: "What is the standard VAT rate in the UAE?", a: "The standard rate is 5%. It has applied since VAT launched on 1 January 2018." },
      { q: "What is the difference between zero-rated and exempt?", a: "Zero-rated supplies are taxable at 0% and may allow input VAT recovery. Exempt supplies are outside the VAT system and generally restrict input VAT recovery." },
      { q: "Are healthcare and education exempt in the UAE?", a: "Certain healthcare and education supplies are exempt, but the exact service and circumstances matter. Confirm the treatment for your supply with a UAE tax adviser." },
      { q: "Is residential rent exempt from UAE VAT?", a: "Residential rent is generally exempt, while commercial rent is normally standard-rated. Check the specific property and lease." }
    ],
    related: [
      ["/blog/uae-vat-calculator-guide.html", "UAE VAT calculator guide"],
      ["/blog/uae-vat-registration-threshold-small-business.html", "VAT registration thresholds"],
      ["/blog/uae-vat-return-filing-common-mistakes.html", "VAT return mistakes"]
    ],
    cta: { h: "Calculate 0% or 5% VAT", p: "Use the rate buttons and see the receipt breakdown instantly.", href: "/tools/uae-vat-calculator.html", label: "Open VAT calculator" }
  },
  {
    slug: "uae-vat-registration-threshold-small-business",
    title: "UAE VAT Registration Threshold 2026: Small Business Guide",
    h1: "UAE VAT Registration Threshold for Small Businesses",
    desc: "UAE VAT registration thresholds explained: AED 375,000 mandatory, AED 187,500 voluntary, and what small Dubai and Abu Dhabi businesses should prepare.",
    kw: "uae vat registration threshold, vat registration uae 2026, mandatory vat registration uae, voluntary vat registration, small business vat uae",
    category: "UAE VAT",
    date: "2026-10-30",
    read: 7,
    image: "service-management",
    imageAlt: "UAE VAT registration threshold guide for small businesses",
    intro: "As of 2026, UAE VAT registration is mandatory when taxable supplies exceed AED 375,000 in a 12-month period. A business can register voluntarily once supplies exceed AED 187,500. Confirm the current rules with the FTA before acting.",
    body: `
<h2 id="thresholds">The two thresholds</h2>
<p><b>Mandatory registration:</b> AED 375,000 of taxable supplies in the previous 12 months, or expected taxable supplies in the next 30 days. <b>Voluntary registration:</b> AED 187,500. These figures are the commonly cited UAE thresholds; always check the FTA for the current position.</p>
<p>Taxable supplies include standard-rated and zero-rated supplies. Exempt supplies are generally not counted in the same way. If your revenue is close to a threshold, get advice before you assume you are outside the system.</p>

<h2 id="when">When the 12-month test applies</h2>
<p>The mandatory test is usually applied by looking back at the previous 12 months or forward at the next 30 days. A seasonal business can cross the threshold in a busy month even if the annual average looks low. Keep monthly sales totals so you can see the trend before the deadline.</p>
<ul>
<li>Review total taxable sales every month.</li>
<li>Separate standard-rated, zero-rated and exempt sales.</li>
<li>Watch for a single large contract that pushes you over the limit.</li>
<li>Register before the legal deadline, not after the first invoice.</li>
</ul>

<h2 id="voluntary">Why register voluntarily?</h2>
<p>Voluntary registration can let a small business recover input VAT on purchases and look more established to corporate customers. It also adds compliance work: VAT invoices, records, returns and payments. Register because the numbers and customers justify it, not only because a competitor is registered.</p>

<h2 id="prepare">What to prepare before registering</h2>
<ol>
<li>Trade licence, owner details and contact information.</li>
<li>Sales records for the relevant 12-month period.</li>
<li>Purchase invoices and expense records.</li>
<li>A simple bookkeeping system that separates net, VAT and gross.</li>
<li>A process for issuing compliant tax invoices and credit notes.</li>
<li>A calendar for return deadlines and payments.</li>
</ol>

<h2 id="after">After registration</h2>
<p>You will receive a Tax Registration Number (TRN). Use it on invoices and returns. Charge VAT on standard-rated supplies, keep records, and file by the due date. A calculator helps check individual lines, but your accounting system should produce the return totals.</p>
<p>Late registration and late filing can attract penalties. If you are unsure whether you have crossed a threshold, speak to a UAE tax adviser early. It is cheaper than fixing a missed registration later.</p>`,
    faqs: [
      { q: "What is the UAE VAT registration threshold?", a: "Mandatory registration generally applies at AED 375,000 of taxable supplies; voluntary registration is available from AED 187,500. Confirm the current rules with the FTA." },
      { q: "Do zero-rated sales count toward the threshold?", a: "Taxable supplies, including zero-rated supplies, generally count. Exempt supplies are treated differently. Check your specific mix with a tax adviser." },
      { q: "Can a small freelancer register voluntarily?", a: "A business below the mandatory threshold may be able to register voluntarily if it meets the conditions. Consider input VAT recovery and compliance costs first." },
      { q: "What happens if I register late?", a: "Late registration can lead to penalties. Register as soon as you know you have crossed the threshold and keep evidence of your sales records." }
    ],
    related: [
      ["/blog/uae-tax-invoice-requirements.html", "UAE tax invoice requirements"],
      ["/blog/uae-vat-return-filing-common-mistakes.html", "VAT return mistakes"],
      ["/blog/uae-vat-rates-2026.html", "UAE VAT rates 2026"]
    ],
    cta: { h: "Check your VAT numbers before registering", p: "Use the free calculator for a quick net, VAT and gross check.", href: "/tools/uae-vat-calculator.html", label: "Open VAT calculator" }
  },
  {
    slug: "uae-tax-invoice-requirements",
    title: "UAE Tax Invoice Requirements: 9 Things Your Invoice Must Show",
    h1: "UAE Tax Invoice Requirements: A Practical Checklist",
    desc: "A practical checklist for UAE VAT invoices: supplier and customer details, TRN, invoice number, date, VAT rate, VAT amount and total in AED.",
    kw: "uae tax invoice requirements, vat invoice uae, fta tax invoice, uae vat invoice format, trn invoice",
    category: "UAE VAT",
    date: "2026-10-30",
    read: 7,
    image: "service-cms",
    imageAlt: "UAE tax invoice requirements checklist",
    intro: "A UAE tax invoice should identify the supplier, the customer, the goods or services, the VAT rate and the VAT amount. It also needs a unique invoice number, date and the supplier's TRN. Missing details can put input VAT recovery at risk.",
    body: `
<h2 id="checklist">The nine-point checklist</h2>
<ol>
<li><b>Supplier name and address.</b> The legal name and business address of the supplier.</li>
<li><b>Supplier TRN.</b> The Tax Registration Number issued by the FTA.</li>
<li><b>Customer name and address.</b> For a registered customer, include their TRN as well.</li>
<li><b>Unique invoice number.</b> A sequential number that can be audited.</li>
<li><b>Invoice date.</b> The date the invoice is issued.</li>
<li><b>Description of goods or services.</b> Clear enough to identify what was supplied.</li>
<li><b>Quantity and unit price.</b> Show the basis of the charge.</li>
<li><b>VAT rate and VAT amount.</b> Show 5%, 0% or the applicable treatment clearly.</li>
<li><b>Total including VAT.</b> The final amount payable, with any discount or credit shown separately.</li>
</ol>

<h2 id="simplified">Full tax invoice vs simplified invoice</h2>
<p>A full tax invoice is normally required for business-to-business supplies and larger amounts. A simplified invoice can be used for certain retail or small-value sales, but it still needs enough information to identify the supplier, the date, the amount and the VAT. If you are unsure which format applies, use the fuller version.</p>

<h2 id="currency">Currency and language</h2>
<p>UAE invoices are commonly issued in AED. If you invoice in another currency, show the amount and the VAT clearly and follow FTA rules for conversion and records. Arabic or English is acceptable for most business records, but the invoice must be understandable to the customer and an auditor.</p>

<h2 id="credit">Credit notes and corrections</h2>
<p>If you need to reduce or cancel a supply, issue a credit note that refers to the original invoice. Do not simply edit the old invoice and hope the record disappears. Your VAT return should reflect the credit note in the correct period.</p>

<h2 id="records">Record keeping</h2>
<p>Keep tax invoices, credit notes, import documents and supporting records for the required period. In the UAE, VAT records generally need to be kept for five years, with longer periods for some records such as real estate. Store digital copies and back them up.</p>

<h2 id="calculator">Check the VAT maths before you send</h2>
<p>Use the <a href="/tools/uae-vat-calculator.html">UAE VAT calculator</a> to verify the net, VAT and gross lines. Then check the invoice against the checklist above. A correct calculation on an incomplete invoice is still a compliance risk.</p>
<p>This is a general guide, not legal or tax advice. Confirm the current FTA requirements for your business and transaction type.</p>`,
    faqs: [
      { q: "What must a UAE tax invoice include?", a: "Supplier name and address, supplier TRN, customer details, unique invoice number, date, description, quantity, unit price, VAT rate, VAT amount and total including VAT." },
      { q: "Do I need the customer's TRN on an invoice?", a: "For a registered customer, include their TRN. For an unregistered consumer, the simplified invoice rules may allow less detail." },
      { q: "How long should I keep UAE VAT records?", a: "Generally five years, with longer periods for certain records such as real estate. Confirm the current FTA retention rules for your business." },
      { q: "Can I issue an invoice in a foreign currency?", a: "Invoices can be issued in foreign currencies in some cases, but the VAT treatment and records must still comply with FTA rules. Check the conversion requirements." }
    ],
    related: [
      ["/blog/uae-vat-calculator-guide.html", "UAE VAT calculator guide"],
      ["/blog/uae-vat-registration-threshold-small-business.html", "VAT registration thresholds"],
      ["/blog/uae-vat-return-filing-common-mistakes.html", "VAT return mistakes"]
    ],
    cta: { h: "Verify the VAT lines first", p: "Get the correct net, VAT and gross before you issue the invoice.", href: "/tools/uae-vat-calculator.html", label: "Open VAT calculator" }
  },
  {
    slug: "uae-vat-return-filing-common-mistakes",
    title: "UAE VAT Return Filing: 10 Common Mistakes to Avoid",
    h1: "UAE VAT Return Filing: 10 Common Mistakes",
    desc: "Avoid common UAE VAT return mistakes: reverse VAT errors, missing tax invoices, wrong rate groups, late filing and poor reconciliation.",
    kw: "uae vat return filing, vat return mistakes, fta vat return, uae vat filing deadline, vat reconciliation",
    category: "UAE VAT",
    date: "2026-10-30",
    read: 8,
    image: "service-management",
    imageAlt: "UAE VAT return filing checklist and common mistakes",
    intro: "Most UAE VAT return errors are not exotic. They come from mixing net and gross, missing invoices, using one blended rate, or filing late. A simple reconciliation before submission catches most of them.",
    body: `
<h2 id="deadline">Start with the deadline</h2>
<p>UAE VAT returns are generally filed within 28 days after the end of the tax period. The period can be monthly or quarterly depending on the business. Put the deadline in your calendar and aim to file several days early so a bank or portal problem does not become a penalty.</p>

<h2 id="mistakes">The 10 mistakes</h2>
<ol>
<li><b>Subtracting 5% from a gross total.</b> Use gross / 1.05 for the net and gross x 5 / 105 for the VAT.</li>
<li><b>Mixing inclusive and exclusive sales.</b> Label every line before adding totals.</li>
<li><b>Claiming input VAT without a valid tax invoice.</b> A bank statement is not a tax invoice.</li>
<li><b>Putting zero-rated and exempt sales in the same box.</b> They are different categories with different input VAT consequences.</li>
<li><b>Using one blended rate for a mixed invoice.</b> Split the invoice into rate groups.</li>
<li><b>Forgetting credit notes.</b> A refund or cancellation should reduce the correct period.</li>
<li><b>Not reconciling the VAT return to the accounts.</b> Sales, purchases and VAT should tie back to your ledger.</li>
<li><b>Rounding every line too early.</b> Keep precision and round the final amount.</li>
<li><b>Missing import VAT or reverse-charge entries.</b> Imports and certain cross-border services need careful treatment.</li>
<li><b>Filing at the last minute.</b> Leave time to fix portal, payment or documentation issues.</li>
</ol>

<h2 id="reconcile">A five-minute reconciliation</h2>
<ul>
<li>Compare total sales in the VAT return with the sales ledger for the period.</li>
<li>Compare output VAT with the VAT column in the sales ledger.</li>
<li>Compare input VAT with valid purchase tax invoices.</li>
<li>Check credit notes and debit notes are in the right period.</li>
<li>Check the payment amount and the bank transfer reference.</li>
</ul>

<h2 id="calculator">Use a calculator for spot checks</h2>
<p>The <a href="/tools/uae-vat-calculator.html">UAE VAT calculator</a> is useful for checking a single invoice line or a sample of transactions. It is not a replacement for your accounting system or a full VAT return. Use it to catch direction errors before they reach the ledger.</p>

<h2 id="help">When to get help</h2>
<p>If you have imports, exports, mixed exempt supplies, real estate or cross-border services, get advice from a UAE tax professional. The cost of a review is usually lower than the cost of a correction, penalty or lost input VAT.</p>
<p>This guide is general information. Confirm the current FTA rules and deadlines for your business.</p>`,
    faqs: [
      { q: "When is the UAE VAT return due?", a: "Generally within 28 days after the end of the tax period. The period may be monthly or quarterly. Confirm your own deadline with the FTA." },
      { q: "Can I claim VAT without a tax invoice?", a: "A valid tax invoice is normally required to support input VAT recovery. A bank statement or receipt may not be enough." },
      { q: "What is the biggest VAT return mistake?", a: "Mixing VAT-inclusive and VAT-exclusive amounts, or subtracting 5% from a gross total instead of dividing by 1.05." },
      { q: "Do I need to file a nil VAT return?", a: "If you are registered, file the return for each period even when there is no VAT due, unless the FTA says otherwise. Check your obligations." }
    ],
    related: [
      ["/blog/uae-tax-invoice-requirements.html", "Tax invoice checklist"],
      ["/blog/uae-vat-rates-2026.html", "UAE VAT rates"],
      ["/blog/remove-vat-from-price-uae.html", "Reverse VAT formula"]
    ],
    cta: { h: "Spot-check a VAT line before filing", p: "Use the free calculator to verify net, VAT and gross.", href: "/tools/uae-vat-calculator.html", label: "Open VAT calculator" }
  }
];
