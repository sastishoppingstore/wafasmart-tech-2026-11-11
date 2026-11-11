/* unit-converter — factor-based categories plus special temperature & fuel handling; live + full table. */
(function () {
  "use strict";
  const T = window.WST_T; if (!T) return;
  const $ = T.$, $$ = T.$$;
  const val = $("#val"), fromSel = $("#from"), toSel = $("#to"), out = $("#out");
  let cat = "length";

  const CAT = {
    length: { f: { "Meters": 1, "Kilometers": 1000, "Centimeters": 0.01, "Millimeters": 0.001, "Miles": 1609.344, "Yards": 0.9144, "Feet": 0.3048, "Inches": 0.0254, "Nautical miles": 1852 }, d: ["Feet", "Meters"] },
    area: { f: { "Square meters": 1, "Square kilometers": 1e6, "Square feet": 0.09290304, "Square yards": 0.83612736, "Square inches": 0.00064516, "Square miles": 2589988.110336, "Hectares": 10000, "Acres": 4046.8564224, "Marla": 25.29285, "Kanal": 505.857, "Bigha (Pakistan)": 2023.43 }, d: ["Square feet", "Marla"] },
    volume: { f: { "Cubic meters": 1, "Liters": 0.001, "Milliliters": 1e-6, "Cubic centimeters": 1e-6, "Cubic feet": 0.0283168456, "Cubic inches": 1.6387064e-5, "Gallons (US)": 0.0037854118, "Gallons (UK)": 0.00454609, "Tablespoons (US)": 1.4787e-5, "Teaspoons (US)": 4.9289e-6 }, d: ["Liters", "Gallons (US)"] },
    weight: { f: { "Kilograms (kilo)": 1, "Grams": 0.001, "Milligrams": 1e-6, "Tonnes": 1000, "Pounds": 0.45359237, "Ounces": 0.028349523125, "Stone": 6.35029318, "Tola": 0.011663810, "Carats": 0.0002 }, d: ["Kilograms (kilo)", "Tola"] },
    time: { f: { "Seconds": 1, "Milliseconds": 0.001, "Minutes": 60, "Hours": 3600, "Days": 86400, "Weeks": 604800, "Months (30d)": 2592000, "Years (365.25d)": 31557600 }, d: ["Hours", "Minutes"] },
    speed: { f: { "Meters/second": 1, "Kilometers/hour": 0.2777777778, "Miles/hour": 0.44704, "Knots": 0.5144444444, "Feet/second": 0.3048 }, d: ["Kilometers/hour", "Miles/hour"] },
    data: { f: { "Bytes": 1, "Bits": 0.125, "Kilobytes": 1024, "Kilobits": 128, "Megabytes": 1048576, "Megabits": 131072, "Gigabytes": 1073741824, "Terabytes": 1.099511627776e12 }, d: ["Megabytes", "Gigabytes"] },
    pressure: { f: { "Pascals": 1, "Kilopascals": 1000, "Bar": 100000, "PSI": 6894.757293, "Atmospheres": 101325, "mmHg / Torr": 133.322387415 }, d: ["PSI", "Bar"] },
    temperature: { names: ["Celsius", "Fahrenheit", "Kelvin"], d: ["Celsius", "Fahrenheit"] },
    fuel: { names: ["L/100km", "km/liter", "MPG (US)", "MPG (UK)"], d: ["L/100km", "km/liter"] }
  };
  const names = c => CAT[c].f ? Object.keys(CAT[c].f) : CAT[c].names;

  const tempToC = (n, v) => n === "Celsius" ? v : n === "Fahrenheit" ? (v - 32) * 5 / 9 : v - 273.15;
  const tempFromC = (n, c) => n === "Celsius" ? c : n === "Fahrenheit" ? c * 9 / 5 + 32 : c + 273.15;
  const FUEL_KM_US = 235.21458, FUEL_KM_UK = 282.480936;
  const fuelToBase = (n, v) => n === "L/100km" ? v : n === "km/liter" ? 100 / v : n === "MPG (US)" ? FUEL_KM_US / v : FUEL_KM_UK / v;
  const fuelFromBase = (n, b) => n === "L/100km" ? b : n === "km/liter" ? 100 / b : n === "MPG (US)" ? FUEL_KM_US / b : FUEL_KM_UK / b;

  function toBase(name, v) {
    if (cat === "temperature") return tempToC(name, v);
    if (cat === "fuel") return fuelToBase(name, v);
    return v * CAT[cat].f[name];
  }
  function fromBase(name, b) {
    if (cat === "temperature") return tempFromC(name, b);
    if (cat === "fuel") return fuelFromBase(name, b);
    return b / CAT[cat].f[name];
  }

  function fmt(x) {
    if (x === null || !isFinite(x)) return "—";
    if (x === 0) return "0";
    const a = Math.abs(x);
    if (a >= 1e15 || a < 1e-4) return x.toExponential(3);
    return String(Number(x.toPrecision(4)));
  }
  function el(tag, cls, text) { const e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; }

  function buildSelects() {
    const ns = names(cat), [df, dt] = CAT[cat].d;
    fromSel.replaceChildren(...ns.map(n => el("option", null, n)));
    toSel.replaceChildren(...ns.map(n => el("option", null, n)));
    fromSel.value = ns.includes(df) ? df : ns[0];
    toSel.value = ns.includes(dt) ? dt : ns[1] || ns[0];
  }

  function run() {
    out.replaceChildren();
    const v = val.value === "" ? NaN : Number(val.value);
    if (!isFinite(v)) { T.setErr("Enter a number in the value box to convert."); T.status(""); return; }
    T.setErr("");
    const f = fromSel.value, t = toSel.value;
    const base = toBase(f, v);
    const result = fromBase(t, base);

    const res = el("div", "res");
    res.append(el("b", null, fmt(result) + " " + t));
    res.appendChild(el("p", null, fmt(v) + " " + f + " = " + fmt(result) + " " + t));
    out.appendChild(res);

    const table = el("table", "tbl");
    const head = el("tr"); head.append(el("th", null, "Unit"), el("th", "num", "Value"));
    table.appendChild(head);
    names(cat).forEach(n => {
      const tr = el("tr");
      tr.append(el("td", null, n), el("td", "num", fmt(fromBase(n, base))));
      if (n === t) tr.style.fontWeight = "700";
      table.appendChild(tr);
    });
    out.appendChild(el("h3", "cnt", "All " + cat + " units"));
    out.appendChild(table);
    T.status(fmt(v) + " " + f + " equals " + fmt(result) + " " + t + ".");
  }

  $$(".seg").forEach(btn => T.on(btn, "click", () => {
    cat = btn.dataset.cat;
    $$(".seg").forEach(b => b.setAttribute("aria-pressed", b === btn ? "true" : "false"));
    buildSelects(); run();
  }));

  T.on(val, "input", run);
  T.on(fromSel, "change", run);
  T.on(toSel, "change", run);
  T.on($("#go"), "click", run);
  T.on($("#swap"), "click", () => { const a = fromSel.value; fromSel.value = toSel.value; toSel.value = a; run(); });
  T.on($("#rst"), "click", () => {
    cat = "length";
    $$(".seg").forEach(b => b.setAttribute("aria-pressed", b.dataset.cat === "length" ? "true" : "false"));
    val.value = 1; buildSelects(); out.replaceChildren(); T.setErr(""); T.status("Reset.");
  });

  buildSelects(); run();
})();
