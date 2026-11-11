/* building-material-calculator — bricks/blocks, cement, steel, sand, crush and city cost.
   Planning ratios from published construction calculators; all maths stays in the page. */
(function () {
  "use strict";
  const T = window.WST_T; if (!T) return;
  const $ = T.$;
  const card = $(".t-card.opts"), out = $("#out"), copyBtn = $("#copy");
  let lastSummary = "";

  const UNIT = { sqft: 1, sqm: 10.7639104, marla: 225, kanal: 4500 };
  const UNIT_LABEL = { sqft: "sq ft", sqm: "sq m", marla: "Marla", kanal: "Kanal" };
  const STOREY_FACTOR = { 1: 1, 2: 1.06, 3: 1.12, 4: 1.18, 5: 1.24 };

  const MASONRY = {
    "brick-mixed": { kind: "brick", label: "Brick — 9\" external + 4.5\" internal", qty: 19.5, cement: 0.43, sand: 1.75, crush: 1.45 },
    "brick-9": { kind: "brick", label: "Brick — 9\" all walls", qty: 22.9, cement: 0.43, sand: 1.75, crush: 1.45 },
    "brick-45": { kind: "brick", label: "Brick — 4.5\" all walls", qty: 11.5, cement: 0.43, sand: 1.75, crush: 1.45 },
    "brick-135": { kind: "brick", label: "Brick — 13.5\" all walls", qty: 34.4, cement: 0.43, sand: 1.75, crush: 1.45 },
    "block-mixed": { kind: "block", label: "Block — 8\" external + 4\" internal", qty: 2.7, cement: 0.40, sand: 1.60, crush: 1.45 },
    "block-8": { kind: "block", label: "Block — 8\" all walls", qty: 2.7, cement: 0.40, sand: 1.60, crush: 1.45 },
    "block-6": { kind: "block", label: "Block — 6\" all walls", qty: 2.7, cement: 0.40, sand: 1.60, crush: 1.45 },
    "block-4": { kind: "block", label: "Block — 4\" all walls", qty: 2.7, cement: 0.40, sand: 1.60, crush: 1.45 }
  };

  const FINISH = {
    grey: { label: "Grey structure", cement: 0, sand: 0, tiles: 0, paint: 0 },
    semi: { label: "Semi-finished", cement: 0.03, sand: 0.12, tiles: 0.55, paint: 0.06 },
    complete: { label: "Complete finishing", cement: 0.06, sand: 0.25, tiles: 1.10, paint: 0.12 }
  };

  const QUALITY = { economy: "Economy", standard: "Standard", premium: "Premium" };

  const CITY = {
    lahore: { label: "Lahore, Punjab", currency: "PKR", rates: {
      grey: { economy: 2800, standard: 3300, premium: 3950 },
      semi: { economy: 3600, standard: 4300, premium: 5200 },
      complete: { economy: 4500, standard: 5800, premium: 7500 }
    } },
    punjab: { label: "Punjab — other city", currency: "PKR", rates: {
      grey: { economy: 2650, standard: 3100, premium: 3700 },
      semi: { economy: 3400, standard: 4050, premium: 4900 },
      complete: { economy: 4300, standard: 5500, premium: 7100 }
    } },
    karachi: { label: "Karachi, Sindh", currency: "PKR", rates: {
      grey: { economy: 2750, standard: 3200, premium: 3850 },
      semi: { economy: 3600, standard: 4400, premium: 5300 },
      complete: { economy: 4600, standard: 6000, premium: 7800 }
    } },
    islamabad: { label: "Islamabad / Rawalpindi", currency: "PKR", rates: {
      grey: { economy: 3000, standard: 3500, premium: 4200 },
      semi: { economy: 3900, standard: 4700, premium: 5700 },
      complete: { economy: 4800, standard: 6200, premium: 8000 }
    } },
    dubai: { label: "Dubai, UAE", currency: "AED", rates: {
      grey: { economy: 190, standard: 230, premium: 300 },
      semi: { economy: 250, standard: 310, premium: 430 },
      complete: { economy: 320, standard: 420, premium: 650 }
    } },
    sharjah: { label: "Sharjah, UAE", currency: "AED", rates: {
      grey: { economy: 170, standard: 210, premium: 270 },
      semi: { economy: 230, standard: 285, premium: 390 },
      complete: { economy: 290, standard: 380, premium: 600 }
    } },
    abudhabi: { label: "Abu Dhabi, UAE", currency: "AED", rates: {
      grey: { economy: 180, standard: 220, premium: 290 },
      semi: { economy: 240, standard: 300, premium: 410 },
      complete: { economy: 310, standard: 410, premium: 620 }
    } },
    "uae-other": { label: "UAE — other emirate", currency: "AED", rates: {
      grey: { economy: 175, standard: 215, premium: 280 },
      semi: { economy: 235, standard: 290, premium: 400 },
      complete: { economy: 300, standard: 390, premium: 610 }
    } }
  };

  function nf(currency) {
    try { return new Intl.NumberFormat(currency === "PKR" ? "en-PK" : "en-AE", { maximumFractionDigits: 0 }); }
    catch (e) { return new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }); }
  }
  function money(n, currency) { return currency + " " + nf(currency).format(Math.round(n)); }
  function shortMoney(n, currency) {
    if (currency === "PKR") {
      if (n >= 1e7) return (n / 1e7).toFixed(2) + " Cr";
      if (n >= 1e5) return (n / 1e5).toFixed(2) + " L";
    } else {
      if (n >= 1e6) return (n / 1e6).toFixed(2) + "M";
      if (n >= 1e3) return Math.round(n / 1e3) + "k";
    }
    return nf(currency).format(Math.round(n));
  }
  function qty(n) { return nf("PKR").format(Math.round(n)); }
  function tonsFromCft(cft, kgPerCft) { return (cft * kgPerCft / 1000).toFixed(2); }
  function tonsFromKg(kg) { return (kg / 1000).toFixed(2); }

  function read() {
    return {
      area: parseFloat($("#area").value),
      unit: $("#area-unit").value,
      stories: parseInt($("#stories").value, 10),
      masonry: $("#masonry").value,
      finish: $("#finish").value,
      quality: $("#quality").value,
      city: $("#city").value,
      waste: parseFloat($("#waste").value)
    };
  }

  function clear() {
    out.replaceChildren();
    lastSummary = "";
    copyBtn.disabled = true;
  }

  function calc(showErrors) {
    T.setErr("");
    const v = read();
    if (!isFinite(v.area) || v.area <= 0) {
      clear();
      if (showErrors) T.setErr("Enter a covered area greater than 0.");
      else T.status("Enter the covered area of one floor to see materials.");
      return;
    }
    if (v.area > 200000) {
      clear();
      T.setErr("Area is too large for this planning calculator. Enter a covered area below 200,000.");
      return;
    }
    if (!isFinite(v.waste) || v.waste < 0 || v.waste > 20) {
      clear();
      T.setErr("Wastage must be between 0% and 20%.");
      return;
    }
    if (!UNIT[v.unit] || !STOREY_FACTOR[v.stories] || !MASONRY[v.masonry] || !FINISH[v.finish] || !QUALITY[v.quality] || !CITY[v.city]) {
      clear();
      T.setErr("Choose a valid area unit, story count, masonry, finish, quality and city.");
      return;
    }

    const areaSqft = v.area * UNIT[v.unit];
    const total = areaSqft * v.stories;
    const sf = STOREY_FACTOR[v.stories];
    const wasteF = 1 + v.waste / 100;
    const m = MASONRY[v.masonry], f = FINISH[v.finish], c = CITY[v.city];
    const rate = c.rates[v.finish][v.quality];
    const estimate = total * rate * sf;
    const low = estimate * 0.90, high = estimate * 1.10;

    const masonryQty = Math.ceil(m.qty * total * wasteF / 10) * 10;
    const cementBags = Math.ceil((m.cement + f.cement) * total * sf * wasteF);
    const steelKg = Math.ceil(4.2 * total * sf * wasteF / 10) * 10;
    const sandCft = Math.ceil((m.sand + f.sand) * total * sf * wasteF / 10) * 10;
    const crushCft = Math.ceil(m.crush * total * sf * wasteF / 10) * 10;
    const tilesSqft = Math.ceil(f.tiles * total * wasteF / 10) * 10;
    const paintL = Math.ceil(f.paint * total * wasteF / 5) * 5;
    const cur = c.currency;

    const res = document.createElement("div");
    res.className = "bm-res";
    res.innerHTML =
      '<div class="bm-res-head"><div><b>Material Estimate</b><span>' + qty(total) + ' sq ft • ' + m.label + ' • ' + f.label + ' • ' + c.label + ' • ' + QUALITY[v.quality] + '</span></div><div class="bm-res-cost">' + cur + ' ' + shortMoney(low, cur) + ' – ' + shortMoney(high, cur) + '</div></div>' +
      '<div class="bm-res-grid">' +
        '<div class="bm-item"><b>' + qty(masonryQty) + '</b><small>' + (m.kind === "brick" ? "Bricks" : "Blocks") + '</small></div>' +
        '<div class="bm-item"><b>' + qty(cementBags) + '</b><small>Cement (50 kg)</small></div>' +
        '<div class="bm-item"><b>' + tonsFromKg(steelKg) + ' t</b><small>Steel / Saria (' + qty(steelKg) + ' kg)</small></div>' +
        '<div class="bm-item"><b>' + qty(sandCft) + ' cft</b><small>Sand (' + tonsFromCft(sandCft, 45) + ' t)</small></div>' +
        '<div class="bm-item"><b>' + qty(crushCft) + ' cft</b><small>Crush (' + tonsFromCft(crushCft, 47) + ' t)</small></div>' +
        (v.finish === "grey" ? '' : '<div class="bm-item"><b>' + qty(tilesSqft) + '</b><small>Tiles (sq ft)</small></div>') +
        (v.finish === "grey" ? '' : '<div class="bm-item"><b>' + qty(paintL) + ' L</b><small>Paint</small></div>') +
        '<div class="bm-item"><b>' + qty(v.area) + ' ' + UNIT_LABEL[v.unit] + ' × ' + v.stories + '</b><small>Area • ' + v.waste + '% wastage</small></div>' +
        '<div class="bm-item bm-item-cost"><b>' + money(low, cur) + ' – ' + money(high, cur) + '</b><small>Est. Cost • ' + money(rate * sf, cur) + '/sq ft</small></div>' +
      '</div>';

    const note = document.createElement("p");
    note.className = "hint";
    note.textContent = "Planning estimate only. Rates and ratios exclude land, approvals, basement, boundary wall, furniture and appliances. Verify with a structural engineer and dated local quotations.";
    out.replaceChildren(res, note);
    copyBtn.disabled = false;
    T.status("Estimate ready for " + qty(total) + " sq ft — " + money(low, cur) + " to " + money(high, cur) + ".");

    lastSummary = [
      "Building material estimate — Wafa Smart Tech",
      "Location: " + c.label,
      "Covered area: " + qty(total) + " sq ft (" + qty(v.area) + " " + UNIT_LABEL[v.unit] + " × " + v.stories + " stories)",
      "Masonry: " + m.label,
      "Finish: " + f.label + " · Quality: " + QUALITY[v.quality],
      "Cement: " + qty(cementBags) + " bags (50 kg)",
      "Steel: " + qty(steelKg) + " kg (" + tonsFromKg(steelKg) + " tons)",
      (m.kind === "brick" ? "Bricks: " : "Blocks: ") + qty(masonryQty) + " pcs",
      "Sand: " + qty(sandCft) + " cft (" + tonsFromCft(sandCft, 45) + " tons)",
      "Crush: " + qty(crushCft) + " cft (" + tonsFromCft(crushCft, 47) + " tons)",
      (v.finish === "grey" ? "" : "Tiles: " + qty(tilesSqft) + " sq ft · Paint: " + qty(paintL) + " L"),
      "Wastage: " + v.waste + "%",
      "Estimated cost: " + money(low, cur) + " – " + money(high, cur),
      "Planning estimate only — confirm with a local contractor."
    ].filter(Boolean).join("\n");
  }

  function reset() {
    $("#area").value = "";
    $("#area-unit").value = "sqft";
    $("#stories").value = "1";
    $("#masonry").value = "brick-mixed";
    $("#finish").value = "grey";
    $("#quality").value = "standard";
    $("#city").value = "lahore";
    $("#waste").value = "5";
    clear();
    T.setErr("");
    T.status("");
    $("#area").focus();
  }

  T.on($("#go"), "click", function () { calc(true); });
  T.on($("#rst"), "click", reset);
  T.on(copyBtn, "click", async function () {
    if (!lastSummary) return;
    try {
      await navigator.clipboard.writeText(lastSummary);
      T.status("Summary copied to clipboard.");
    } catch (e) {
      const ta = document.createElement("textarea");
      ta.value = lastSummary;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand("copy"); T.status("Summary copied to clipboard."); }
      catch (e2) { T.setErr("Could not copy automatically — select the result text and copy it manually."); }
      ta.remove();
    }
  });
  if (card) {
    card.addEventListener("input", function () { calc(false); });
    card.addEventListener("change", function () { calc(false); });
  }
})();
