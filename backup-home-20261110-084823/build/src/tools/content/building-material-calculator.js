"use strict";
const H = require("./_helpers.js");
module.exports = {
  name: "Building Material Calculator",
  short: "Estimate bricks or blocks, cement bags, steel, sand, crush and construction cost by covered area, stories, finishing level and city in Pakistan or UAE.",
  title: "Building Material Calculator — Bricks, Cement, Steel & Sand",
  desc: "Free building material calculator for Pakistan and UAE. Estimate bricks or blocks, cement bags, steel, sand and crush by covered area, stories and finishing.",
  h1: "Building Material Calculator — bricks, cement, steel, sand and cost",
  kw: [
    "building material calculator", "construction material calculator", "house construction material calculator",
    "building material calculator pakistan", "building material calculator punjab", "building material calculator lahore",
    "building material calculator karachi", "building material calculator dubai", "building material calculator sharjah",
    "building material in punjab", "building material in lahore", "building material in karachi",
    "building material in dubai", "building material in sharjah", "construction material uae", "building materials uae",
    "bricks calculator", "brick calculator pakistan", "block calculator", "cement calculator",
    "cement bags per sq ft", "steel calculator", "saria calculator", "sand calculator", "crush calculator",
    "grey structure calculator", "house construction cost calculator pakistan", "house construction cost lahore",
    "house construction cost karachi", "villa construction cost dubai", "construction cost sharjah", "material estimate for house"
  ],
  appCategory: "BusinessApplication",
  priceCurrency: "PKR",
  uiFirst: true,
  guide: "/blog/building-material-calculator-guide.html",
  guideTitle: "Building material calculator guide",
  intro: [
    "This calculator turns a covered area into a practical shopping list for a house: bricks or concrete blocks, cement bags, steel bars, sand, crush, and the tiles and paint that appear once you move from grey structure to finishing. Enter the covered area of one floor, choose how many stories, pick brick or block masonry, set the finish level and the city, and the page estimates quantities and a planning cost range in PKR or AED.",
    "The numbers are built from published construction planning ratios, not from a single magic formula. A 9-inch brick wall uses about 9 bricks per square foot of wall, a 4.5-inch wall about 4.5, and an 8-inch block wall about 1.05 to 1.125 blocks per square foot. For a whole house, the tool starts from grey-structure ratios per covered square foot and then adjusts for masonry type, number of stories, finishing and wastage. The result is deliberately labelled as an estimate: soil, spans, seismic detailing and the actual drawings can move steel and concrete significantly.",
    "Location changes the money, not the physics. Labour, transport, cement and steel prices differ between Lahore, Karachi, Punjab cities, Dubai, Sharjah and Abu Dhabi. The calculator uses a dated planning rate for each city and shows a range around it. Replace it with a current contractor or supplier quotation before you commit a budget. The tool runs entirely in your browser, needs no upload and works on a phone."
  ],
  steps: [
    "Enter the covered area of one floor — not the plot size — and choose square feet, square metres, marla or kanal.",
    "Select the number of stories. The tool multiplies the floor area by the story count and adds a steel/concrete factor for upper floors.",
    "Choose brick or concrete block, then the wall type: 4.5-inch, 9-inch, 13.5-inch brick, or 4-inch, 6-inch, 8-inch block.",
    "Pick the finish level: grey structure, semi-finished, or complete finishing. Choose economy, standard or premium quality.",
    "Select your city or region: Lahore, Punjab, Karachi, Islamabad, Dubai, Sharjah, Abu Dhabi or another UAE emirate.",
    "Set a wastage percentage (5% is a sensible default), press Calculate, and read the material list plus the cost range."
  ],
  ur: "Covered area per floor aur stories dalain, phir brick ya block, wall type, grey/semi/complete finishing, quality aur city select karein. Calculate dabate hi eent ya block, cement bags, saria, rait, crush, tiles/paint aur PKR ya AED mein cost ka range nazar aa jayega. Yeh planning estimate hai — final order structural drawings aur local quotation se confirm karein.",
  features: [
    "Brick and block selection with 4.5\", 9\" and 13.5\" brick walls plus 4\", 6\" and 8\" block walls",
    "Covered area in square feet, square metres, marla or kanal, with 1 to 5 stories",
    "Grey structure, semi-finished and complete finishing modes",
    "City-wise cost planning for Lahore, Punjab, Karachi, Islamabad, Dubai, Sharjah, Abu Dhabi and other UAE locations",
    "Cement bags (50 kg), steel in kg and tons, sand and crush in cft and tons, bricks or blocks, tiles and paint",
    "Adjustable wastage and contingency from 0% to 20%",
    "One-tap copy summary for WhatsApp or a site notebook",
    "No upload, no account, no storage — everything is calculated in the page"
  ],
  tips: [
    "Covered area is not plot area. A 5 Marla plot is about 1,125 sq ft; the covered area of one floor is usually smaller after setbacks, stairs and open space.",
    "Order 5–10% extra bricks and blocks for breakage, cutting and corners. The calculator applies your wastage figure to the material totals.",
    "A 9-inch brick wall is about 9 bricks per sq ft of wall; a 4.5-inch wall about 4.5. Do not use the same count for both.",
    "For a normal residential grey structure, plan around 0.4–0.5 cement bags, 4–5 kg steel, 1.5–2 cft sand and 1.3–1.6 cft crush per covered sq ft. Long spans and heavy slabs can exceed this.",
    "Concrete blocks are faster and more uniform, but brick and block walls behave differently under load and heat. Let the structural engineer choose the wall type and thickness.",
    "The cost range excludes land, approvals, boundary wall, basement, furniture and appliances unless your contract says otherwise.",
    "Construction rates move. Replace the city rate with a dated local quotation before comparing contractors."
  ],
  faqs: [
    { q: "How many bricks are in 1 square foot of a 9-inch wall?", a: "About 9 bricks per square foot of wall for a standard 9 × 4.5 × 3 inch Pakistani brick with 10 mm mortar joints, before wastage. A 4.5-inch wall is about 4.5 bricks per square foot, and a 13.5-inch wall about 13.5." },
    { q: "How many cement bags are needed per square foot?", a: "A typical residential grey structure uses roughly 0.4 to 0.5 bags of 50 kg cement per covered square foot. This calculator starts at 0.43 for brick masonry and adds a finishing allowance for semi-finished or complete finishing. Actual use depends on the concrete mix, plaster thickness and drawings." },
    { q: "How much steel or saria is used per square foot?", a: "A common planning range for a house is 4 to 5 kg per covered square foot, with more steel for longer spans, cantilevers and multi-storey frames. The calculator uses 4.2 kg as a single-storey base and applies a storey factor." },
    { q: "How much sand and crush does a house need?", a: "A practical grey-structure planning range is about 1.5 to 2 cft sand and 1.3 to 1.6 cft crush per covered square foot. This tool uses 1.75 cft sand and 1.45 cft crush for brick masonry, then adds sand for finishing." },
    { q: "Should I choose bricks or concrete blocks?", a: "Bricks are traditional, good for load-bearing walls and widely available in Punjab. Concrete blocks are uniform, faster to lay and lighter. The right choice depends on the structural design, heat requirements, local availability and budget. The calculator lets you compare quantities for both." },
    { q: "Does the calculator include finishing?", a: "Yes. Grey structure covers the shell and basic plaster; semi-finished adds a partial finishing allowance; complete finishing adds tiles, paint and extra cement and sand. Furniture, appliances, landscaping and boundary walls are not included." },
    { q: "Is the cost estimate valid for Lahore, Karachi and Dubai?", a: "It gives a planning range for each selected city using dated assumptions. Lahore, Karachi and other Pakistan locations are shown in PKR; Dubai, Sharjah, Abu Dhabi and other UAE locations in AED. Always replace the rate with a current local quotation." },
    { q: "Can I use it for a 5 Marla or 10 Marla house?", a: "Yes. Enter the covered area of one floor, not the plot size. A 5 Marla plot is about 1,125 sq ft and a 10 Marla plot about 2,250 sq ft; the covered area is usually less because of setbacks and open space." },
    { q: "Does the result include wastage?", a: "Yes, the wastage field is applied to the material quantities. The default is 5%, which suits straight walls and normal cutting. Use 7–10% for many corners, arches or a site with more breakage." },
    { q: "Why is this only an estimate?", a: "Material quantities depend on the structural drawings, soil, spans, slab thickness, beam sizes, openings, plaster thickness, block/brick dimensions and site wastage. A calculator cannot replace a bill of quantities or a structural engineer." },
    H.faqFree("Building Material Calculator"),
    H.faqMobile("Building Material Calculator", "The result table scrolls horizontally on a narrow phone if your browser needs it; the summary cards stay on one column.")
  ],
  related: [
    ["unit-converter", "Unit converter"],
    ["percentage-calculator", "Percentage calculator"],
    ["emi-loan-calculator", "EMI / construction loan"],
    ["pakistan-salary-tax-calculator", "Salary tax calculator"],
    ["uae-vat-calculator", "UAE VAT calculator"],
    ["image-to-pdf", "Image to PDF"]
  ],
  sections: [
    {
      id: "material-rates",
      h2: "Material planning rates used by this calculator",
      paras: [
        "The base column below is for a single-storey residential grey structure with brick masonry. The tool adjusts these figures for block walls, upper floors, finishing and the wastage you enter. They are planning ratios, not a substitute for a measured bill of quantities.",
        "Cement is shown in 50 kg bags. Steel is shown in kilograms and converted to metric tons. Sand and crush are shown in cubic feet and approximate tons using bulk densities of about 45 kg/cft and 47 kg/cft."
      ],
      table: {
        head: ["Material", "Planning rate", "Unit", "What it covers"],
        rows: [
          ["Cement", "0.43", "bag per covered sq ft", "Concrete, mortar and plaster in a grey structure"],
          ["Steel / saria", "4.2", "kg per covered sq ft", "RCC frame, slabs, beams and columns; 1-storey base"],
          ["Bricks", "19.5", "bricks per covered sq ft", "70% 9-inch external walls and 30% 4.5-inch internal walls"],
          ["Concrete blocks", "2.7", "blocks per covered sq ft", "8-inch external and 4-inch internal block walls"],
          ["Sand", "1.75", "cft per covered sq ft", "Concrete, mortar and plaster"],
          ["Crush / aggregate", "1.45", "cft per covered sq ft", "Concrete and foundation work"],
          ["Tiles", "1.10", "sq ft per covered sq ft", "Complete finishing allowance, including cutting"],
          ["Paint", "0.12", "litre per covered sq ft", "Complete finishing allowance, primer plus two coats"]
        ]
      }
    },
    {
      id: "brick-vs-block",
      h2: "Bricks vs blocks: quantities per square foot of wall",
      paras: [
        "Brick counts depend on the face that shows on the wall. A standard Pakistani brick is about 9 × 4.5 × 3 inches. With a 10 mm mortar joint, a 9-inch wall shows a 9 × 3 inch face and needs about 9 bricks per square foot; a 4.5-inch wall needs about half that. A 13.5-inch wall needs about 13.5 bricks per square foot.",
        "Concrete blocks are larger, so the count is much lower. An 8 × 8 × 16 inch block covers about 0.89 sq ft without the joint, or roughly 1.05 to 1.125 blocks per square foot with mortar. The same face count applies to 4-inch, 6-inch and 8-inch blocks; the thickness changes the mortar volume and wall strength, not the face count."
      ],
      table: {
        head: ["Wall type", "Bricks per sq ft", "Blocks per sq ft", "Typical use"],
        rows: [
          ["4.5-inch brick", "4.5", "—", "Internal partition walls"],
          ["9-inch brick", "9.0", "—", "External and load-bearing walls"],
          ["13.5-inch brick", "13.5", "—", "Boundary walls and extra stability"],
          ["4-inch block", "—", "1.05–1.125", "Internal partition walls"],
          ["6-inch block", "—", "1.05–1.125", "Internal or external walls"],
          ["8-inch block", "—", "1.05–1.125", "External walls"]
        ]
      }
    },
    {
      id: "city-rates",
      h2: "Construction cost by city: Pakistan and UAE planning ranges",
      paras: [
        "The cost ranges below are planning assumptions reviewed for Q4 2026. They cover materials and labour for the stated scope, but exclude land, government approvals, utility connections, basement, boundary wall, landscaping, furniture and appliances. A contractor's quotation can be higher or lower depending on specification, access and the date of the quote.",
        "Pakistan rates are in PKR per covered square foot; UAE rates are in AED per covered square foot. The calculator applies a storey factor for upper floors and then shows a range around the selected rate. Use the material quantities as the shopping list and the cost range as an early budget, not a final offer."
      ],
      table: {
        head: ["City / region", "Grey structure", "Complete finishing", "Currency"],
        rows: [
          ["Lahore", "2,800–3,950", "4,500–7,500", "PKR / sq ft"],
          ["Punjab — other cities", "2,650–3,700", "4,300–7,100", "PKR / sq ft"],
          ["Karachi", "2,750–3,850", "4,600–7,800", "PKR / sq ft"],
          ["Islamabad / Rawalpindi", "3,000–4,200", "4,800–8,000", "PKR / sq ft"],
          ["Dubai", "190–300", "320–650", "AED / sq ft"],
          ["Sharjah", "170–270", "290–600", "AED / sq ft"],
          ["Abu Dhabi", "180–290", "310–620", "AED / sq ft"]
        ]
      }
    },
    {
      id: "grey-vs-finish",
      h2: "Grey structure vs complete finishing: what is included",
      paras: [
        "Grey structure is the unfinished shell: excavation and foundations, RCC columns, beams, slabs and staircase, brick or block masonry, internal and external plaster, and roof waterproofing. It usually excludes floor tiles, paint, doors, windows, electrical fittings, sanitary fixtures, kitchen cabinets and furniture.",
        "Semi-finished adds a partial finishing allowance — typically basic flooring, plaster touch-ups and some paint — but not a full turnkey house. Complete finishing adds tiles, paint, doors and windows, basic electrical and sanitary fittings and a kitchen allowance. The exact scope must be written into the contract; two quotations with the same per-square-foot rate can include very different work."
      ]
    },
    {
      id: "check-estimate",
      h2: "How to check the estimate before you order",
      paras: [
        "Ask for the covered-area schedule by floor, the structural drawings and the masonry specification. Check whether the contract uses 4.5-inch, 9-inch or 13.5-inch walls, and whether the block size is 4, 6 or 8 inches. Confirm the cement bag weight (50 kg in Pakistan), steel grade and the wastage responsibility.",
        "For a serious order, give the material list to two or three suppliers and compare delivered rates, not just the headline price. Cement, steel and bricks are bulky; transport can change the effective rate more than a small difference in the quoted unit price. Keep a contingency of 5–10% for changes and site waste."
      ]
    }
  ],
  sources: [
    ["https://avenirdevelopments.com/calculators/brick-quantity-calculator", "Avenir Developments — brick quantity calculator for Pakistan (brick size, 9 bricks/sq ft, mortar)"],
    ["https://greystructurecalc.com", "Grey Structure Calculator Pakistan — material ratios per covered sq ft and city/storey factors"],
    ["https://www.engelvoelkers.com/ae/en/resources/construction-cost-dubai", "Engel & Völkers — Dubai construction cost per sq ft, 2025–26"],
    ["https://www.pbs.gov.pk/price-statistics/", "Pakistan Bureau of Statistics — construction-item price statistics"],
    ["https://www.inchcalculator.com/block-mortar-calculator", "Inch Calculator — concrete block and mortar coverage"]
  ],
  ui: `<section class="t-card opts" aria-label="Building material calculator inputs">
  <div class="fld"><label for="area">Covered area per floor</label><input type="number" id="area" inputmode="decimal" min="1" max="200000" step="1" placeholder="e.g. 1000"></div>
  <div class="fld"><label for="area-unit">Area unit</label><select id="area-unit"><option value="sqft">Square feet</option><option value="sqm">Square metres</option><option value="marla">Marla (225 sq ft)</option><option value="kanal">Kanal (4,500 sq ft)</option></select></div>
  <div class="fld"><label for="stories">Number of stories</label><select id="stories"><option value="1">1 story</option><option value="2">2 stories</option><option value="3">3 stories</option><option value="4">4 stories</option><option value="5">5 stories</option></select></div>
  <div class="fld"><label for="masonry">Brick or block</label><select id="masonry"><option value="brick-mixed">Brick — 9" external + 4.5" internal</option><option value="brick-9">Brick — 9" all walls</option><option value="brick-45">Brick — 4.5" all walls</option><option value="brick-135">Brick — 13.5" all walls</option><option value="block-mixed">Block — 8" external + 4" internal</option><option value="block-8">Block — 8" all walls</option><option value="block-6">Block — 6" all walls</option><option value="block-4">Block — 4" all walls</option></select></div>
  <div class="fld"><label for="finish">Finish level</label><select id="finish"><option value="grey">Grey structure</option><option value="semi">Semi-finished</option><option value="complete">Complete finishing</option></select></div>
  <div class="fld"><label for="quality">Quality</label><select id="quality"><option value="economy">Economy</option><option value="standard" selected>Standard</option><option value="premium">Premium</option></select></div>
  <div class="fld"><label for="city">City / region</label><select id="city"><option value="lahore">Lahore, Punjab</option><option value="punjab">Punjab — other city</option><option value="karachi">Karachi, Sindh</option><option value="islamabad">Islamabad / Rawalpindi</option><option value="dubai">Dubai, UAE</option><option value="sharjah">Sharjah, UAE</option><option value="abudhabi">Abu Dhabi, UAE</option><option value="uae-other">UAE — other emirate</option></select></div>
  <div class="fld"><label for="waste">Wastage / contingency (%)</label><input type="number" id="waste" inputmode="decimal" min="0" max="20" step="1" value="5"></div>
  <p class="hint" style="grid-column:1/-1;margin:0">Enter covered area per floor, not plot size. A 5 Marla plot is about 1,125 sq ft; covered area is usually less.</p>
  <div class="acts"><button id="go" class="btn" type="button">Calculate materials</button><button id="rst" class="btn btn-ghost" type="button">Reset</button><button id="copy" class="btn btn-ghost" type="button" disabled>Copy summary</button></div>
  <p id="status" role="status" aria-live="polite" class="hint"></p>
  <p id="err" class="err" role="alert" hidden></p>
  <div id="out"></div>
  <span class="disc">Planning estimate only — not a bill of quantities or a contractor quotation. Confirm with a structural engineer and local suppliers.</span>
</section>`
};
