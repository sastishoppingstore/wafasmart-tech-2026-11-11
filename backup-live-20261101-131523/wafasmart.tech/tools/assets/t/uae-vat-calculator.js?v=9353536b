/* uae-vat-calculator — add/remove VAT, 0/5/custom, AED receipt. Rate/currency from config. Local. */
(function () {
  "use strict";
  const T = window.WST_T; if (!T) return;
  const $ = T.$;
  const card = $(".t-card.opts"), out = $("#out");
  const DEF = { rate: 5, currency: "AED", effectiveFrom: "2018-01-01", lastUpdated: "2026-10-28", note: "UAE standard VAT rate." };
  let meta = Object.assign({}, DEF);

  function money(n) {
    n = Math.round(n * 100) / 100;
    const c = $("#cur").value.trim().toUpperCase();
    const safe = /^[A-Z]{3}$/.test(c) ? c : "";
    try { return new Intl.NumberFormat(undefined, { style: "currency", currency: safe || "XXX", minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n); }
    catch (e) { return n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + (safe ? " " + safe : ""); }
  }

  function syncSegs() {
    const r = parseFloat($("#rate").value);
    const key = r === 0 ? "0" : r === 5 ? "5" : "custom";
    T.$$(".seg[data-rate]").forEach(s => s.setAttribute("aria-pressed", String(s.dataset.rate === key)));
  }

  function calc() {
    T.setErr("");
    const a = parseFloat($("#amount").value), r = parseFloat($("#rate").value);
    if (!isFinite(a)) { out.replaceChildren(); T.status("Enter an amount."); return; }
    if (a < 0) { T.setErr("Amount cannot be negative."); out.replaceChildren(); return; }
    if (!isFinite(r) || r < 0 || r > 100) { T.setErr("Rate must be between 0 and 100%."); out.replaceChildren(); return; }
    syncSegs();

    const dir = $("#dir").value;
    let net, vat, gross;
    if (dir === "add") { net = a; vat = a * r / 100; gross = net + vat; }
    else { gross = a; vat = gross * r / (100 + r); net = gross - vat; }

    const res = document.createElement("div");
    res.className = "res" + (r > 0 ? "" : " warn");
    res.innerHTML =
      '<div class="stat-row">' +
        '<div class="stat"><b>' + money(gross) + '</b><small>total (gross)</small></div>' +
        '<div class="stat"><b>' + money(net) + '</b><small>net (excl. VAT)</small></div>' +
        '<div class="stat"><b>' + money(vat) + '</b><small>VAT @ ' + r + '%</small></div>' +
      '</div>' +
      '<div class="res-line"><span>Net amount</span><span>' + money(net) + '</span></div>' +
      '<div class="res-line"><span>VAT (' + r + '%)</span><span>' + money(vat) + '</span></div>' +
      '<div class="res-line"><span>Total payable</span><span>' + money(gross) + '</span></div>';
    const note = document.createElement("span");
    note.className = "hint";
    note.textContent = "Standard rate effective " + meta.effectiveFrom + " · config last updated " + meta.lastUpdated + ". " + meta.note + (meta.fallback ? " (rate file could not load — using defaults.)" : "");
    out.replaceChildren(res, note);
    T.status("Total " + money(gross) + " (VAT " + money(vat) + ").");
  }

  function reset() { $("#amount").value = ""; $("#rate").value = String(meta.rate); $("#dir").value = "add"; $("#cur").value = meta.currency; syncSegs(); out.replaceChildren(); T.setErr(""); T.status(""); }

  fetch("/tools/assets/config/uae-vat.json", { cache: "force-cache" })
    .then(rr => { if (!rr.ok) throw new Error("bad"); return rr.json(); })
    .then(cfg => {
      meta = Object.assign({}, DEF, cfg);
      $("#rate").value = String(cfg.rate != null ? cfg.rate : DEF.rate);
      $("#cur").value = cfg.currency || DEF.currency;
      syncSegs();
      T.status("VAT rate loaded (" + meta.rate + "%). Enter an amount to calculate.");
    })
    .catch(() => { meta.fallback = true; T.status("Could not load the rate file — using 5% default."); });

  card.addEventListener("input", calc);
  T.$$(".seg[data-rate]").forEach(s => T.on(s, "click", () => {
    if (s.dataset.rate !== "custom") $("#rate").value = s.dataset.rate;
    syncSegs(); calc();
    if (s.dataset.rate === "custom") $("#rate").focus();
  }));
  T.on($("#go"), "click", calc);
  T.on($("#rst"), "click", reset);
})();
