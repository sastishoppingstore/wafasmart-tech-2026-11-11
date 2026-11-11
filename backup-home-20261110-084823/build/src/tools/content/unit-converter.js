"use strict";
const H = require("./_helpers.js");
module.exports = {
  name: "Unit Converter",
  short: "Convert length, area, volume, weight, temperature, time, speed, data and pressure — with Pakistan land units like marla, kanal and bigha.",
  title: "Unit Converter — Length, Area, Marla, Kanal | Wafa Smart",
  desc: "Convert units of length, area, weight, temperature, time, speed, data and pressure. Includes marla, kanal, bigha, tola. Two-way, 4 significant digits.",
  h1: "Unit Converter — everyday, metric and Pakistan land units",
  kw: ["unit converter", "marla to kanal", "square feet to marla", "celsius to fahrenheit", "tola to gram", "acre to kanal converter"],
  intro: [
    "This converter changes a number from one measurement to another across ten categories: length, area, volume, weight, temperature, time, speed, data (bytes), pressure and fuel. You type a value, pick the unit you are coming from and the unit you want, and the answer appears instantly — plus a full table showing that same value expressed in every other unit in the category, so you never have to run the conversion twice.",
    "It is built with the Pakistani reader in mind. Land area carries marla, kanal, bigha and acre alongside square feet and square metres, because a property ad in Lahore quotes kanal while a drawing is in feet. Weight includes tola and kilo next to grams and pounds for jewellery and market shopping. The bidirectional swap button flips any pair in one click, and results are rounded to a sensible four significant digits so you get readable figures rather than a wall of decimals.",
    "Temperature is handled with the proper Celsius-to-Fahrenheit-to-Kelvin formulas, not a naive factor, so cooking, weather and science all convert correctly; fuel covers the awkward inverse units of litres-per-100-km, km-per-litre and miles-per-gallon. Everything runs locally in your browser — no lookup table is fetched and nothing you convert is stored or uploaded."
  ],
  steps: [
    "Pick a category from the tabs (Length, Area, Weight, Temperature and so on).",
    "Type the number you want to convert into the value box.",
    "Choose the unit you are starting from and the unit you want the answer in.",
    "Read the highlighted result, and use the Swap button to convert back the other way.",
    "Scan the table below for the same value in every other unit of that category."
  ],
  ur: "Category chunein (Length, Area, Weight, Temperature waghera), value likhein, 'from' aur 'to' unit chunein — natija foran nazar aata hai aur Swap se ulta convert ho jata hai. Area me marla, kanal, bigha, acre aur Weight me tola, kilo shamil hain, taake Pakistan ki zameen aur bikri ke hisaab asani se ban jayein. Neeche table me us value ke saare units dikhate hain.",
  features: [
    "Ten categories: length, area, volume, weight, temperature, time, speed, data, pressure, fuel",
    "Pakistan land units — marla, kanal, bigha and acre — in the area category",
    "Tola and kilo alongside grams, pounds and ounces in weight",
    "Correct C/F/K temperature formulas and inverse fuel-economy units",
    "Bidirectional swap with results rounded to four significant digits",
    "A full conversion table of the entered value across every unit in the category"
  ],
  tips: [
    "1 kanal = 20 marla and 1 acre = 8 kanal is the Punjab standard this tool uses for land conversions.",
    "Use the table when you are unsure which unit you actually want — the figure you need is usually already there.",
    "For jewellery, tola here is the traditional 11.664 g; if your shop uses the 10 g metric tola, note the difference.",
    "Temperature needs the exact formula, so never try to eyeball Celsius to Fahrenheit in your head.",
    "Data sizes use binary (1 KB = 1024 bytes); some drive makers use decimal, which reads slightly smaller."
  ],
  faqs: [
    { q: "How many square feet is a marla?", a: "This converter uses the Punjab standard of 1 marla = 272.25 square feet (25.29 m²) and 1 kanal = 20 marla, so 1 kanal = 5,445 sq ft and 1 acre = 8 kanal. Other regions use a smaller 'legal' marla, so always check the local convention before buying land." },
    { q: "Why are temperature results not a simple multiply?", a: "Celsius, Fahrenheit and Kelvin have different zero points, so they need offset formulas (°F = °C × 9/5 + 32), not a fixed factor. The tool applies the real formulas for accurate results." },
    { q: "Which tola weight do you use?", a: "The traditional South-Asian tola of 11.664 grams. Some traders quote a rounded 'metric tola' of 10 grams; pick the convention your market uses and adjust the value yourself." },
    { q: "Can I convert both directions?", a: "Yes — press the Swap button to flip the 'from' and 'to' units, and the full table already shows the value in every unit of the category at once." },
    { q: "Do conversions need the internet after the page loads?", a: "No. All factors and formulas live inside the page script, so once the tab is open you can convert freely offline — nothing is looked up or uploaded." },
    H.faqFree("Unit Converter")
  ],
  related: [["percentage-calculator", "Percentage work"], ["word-counter", "Text toolbox"], ["json-formatter", "More utilities"], ["case-converter", "Format text"]],
  ui: `<section class="t-card opts" aria-label="Unit converter">
  <div class="segs" role="group" aria-label="Category">
    <button class="seg" type="button" data-cat="length" aria-pressed="true">Length</button>
    <button class="seg" type="button" data-cat="area" aria-pressed="false">Area</button>
    <button class="seg" type="button" data-cat="volume" aria-pressed="false">Volume</button>
    <button class="seg" type="button" data-cat="weight" aria-pressed="false">Weight</button>
    <button class="seg" type="button" data-cat="temperature" aria-pressed="false">Temperature</button>
    <button class="seg" type="button" data-cat="time" aria-pressed="false">Time</button>
    <button class="seg" type="button" data-cat="speed" aria-pressed="false">Speed</button>
    <button class="seg" type="button" data-cat="data" aria-pressed="false">Data</button>
    <button class="seg" type="button" data-cat="pressure" aria-pressed="false">Pressure</button>
    <button class="seg" type="button" data-cat="fuel" aria-pressed="false">Fuel</button>
  </div>
  <div class="fld"><label for="val">Value to convert</label><input type="number" id="val" value="1" step="any" inputmode="decimal"></div>
  <div class="fld"><label for="from">From unit</label><select id="from"></select></div>
  <div class="fld"><label for="to">To unit</label><select id="to"></select></div>
  <div class="acts">
    <button id="go" class="btn" type="button">Convert</button>
    <button id="swap" class="btn btn-ghost" type="button">Swap units</button>
    <button id="rst" class="btn btn-ghost" type="button">Reset</button>
  </div>
  <p id="status" role="status" aria-live="polite" class="hint"></p>
  <p id="err" class="err" role="alert" hidden></p>
  <div id="out"></div>
</section>`
};
