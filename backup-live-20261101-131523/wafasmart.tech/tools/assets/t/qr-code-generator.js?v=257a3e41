/* qr-code-generator — builds QR from URL/Text/WhatsApp/WiFi via lazy-loaded qrcode-generator, SVG + PNG out. */
(function () {
  "use strict";
  const T = window.WST_T; if (!T) return;
  const $ = T.$, $$ = T.$$;
  const out = $("#out"), preview = $("#preview");
  let activeTab = "url", svgBlob = null, pngBlob = null;

  $$(".seg").forEach(btn => T.on(btn, "click", () => {
    activeTab = btn.dataset.tab;
    $$(".seg").forEach(b => b.setAttribute("aria-pressed", b === btn ? "true" : "false"));
    $$("[data-panel]").forEach(p => { p.hidden = p.dataset.panel !== activeTab; });
  }));

  const byteString = s => { const b = new TextEncoder().encode(s); let o = ""; for (const x of b) o += String.fromCharCode(x); return o; };
  const escWifi = s => String(s).replace(/([\\;,:"])/g, "\\$1");

  function payload() {
    if (activeTab === "url") {
      const v = $("#f_url").value.trim();
      if (!v) return { err: "Enter a website URL (for example wafasmart.tech) to encode." };
      return { text: v };
    }
    if (activeTab === "text") {
      const v = $("#f_text").value;
      if (!v.trim()) return { err: "Type some text to turn into a QR code." };
      return { text: v };
    }
    if (activeTab === "wa") {
      const num = $("#f_wanum").value.replace(/[^\d]/g, "");
      if (num.length < 6) return { err: "Enter a WhatsApp number with country code, digits only (e.g. 923001234567)." };
      const msg = $("#f_wamsg").value;
      return { text: "https://wa.me/" + num + (msg ? "?text=" + encodeURIComponent(msg) : "") };
    }
    // wifi
    const ssid = $("#f_ssid").value;
    if (!ssid.trim()) return { err: "Enter the network name (SSID) for the Wi-Fi QR code." };
    const enc = $("#f_enc").value, pass = $("#f_wifipass").value, hidden = $("#f_hidden").value;
    if (enc !== "nopen" && !pass) return { err: "This network uses " + enc + " — please enter its password." };
    let s = "WIFI:T:" + enc + ";S:" + escWifi(ssid) + ";";
    if (enc !== "nopen") s += "P:" + escWifi(pass) + ";";
    if (hidden === "true") s += "H:true;";
    s += ";";
    return { text: s };
  }

  function svgOf(q, margin) {
    const mc = q.getModuleCount(), dim = mc + 2 * margin;
    let d = "";
    for (let r = 0; r < mc; r++) for (let c = 0; c < mc; c++)
      if (q.isDark(r, c)) d += "M" + (c + margin) + " " + (r + margin) + "h1v1h-1z";
    return '<svg xmlns="http://www.w3.org/2000/svg" width="' + dim + '" height="' + dim +
      '" viewBox="0 0 ' + dim + ' ' + dim + '" shape-rendering="crispEdges">' +
      '<rect width="' + dim + '" height="' + dim + '" fill="#ffffff"/>' +
      '<path fill="#000000" d="' + d + '"/></svg>';
  }

  async function draw(q, margin, px) {
    const mc = q.getModuleCount(), total = mc + 2 * margin, cell = px / total;
    const c = document.createElement("canvas"); c.width = c.height = px;
    const ctx = c.getContext("2d");
    ctx.fillStyle = "#fff"; ctx.fillRect(0, 0, px, px);
    ctx.fillStyle = "#000";
    for (let r = 0; r < mc; r++) for (let col = 0; col < mc; col++)
      if (q.isDark(r, col)) ctx.fillRect(Math.round((col + margin) * cell), Math.round((r + margin) * cell), Math.ceil(cell), Math.ceil(cell));
    preview.replaceChildren();
    c.style.width = "min(240px, 60vw)"; c.style.height = "auto"; c.alt = "QR code preview";
    preview.appendChild(c);
    return c;
  }

  function el(tag, cls, text) { const e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; }

  T.on($("#go"), "click", async () => {
    T.setErr(""); out.replaceChildren(); svgBlob = null; pngBlob = null;
    const p = payload();
    if (p.err) { T.status(""); T.setErr(p.err); return; }

    const ec = $("#f_ec").value, px = Number($("#f_size").value);
    const margin = Math.max(0, Math.min(10, parseInt($("#f_margin").value, 10) || 0));
    const len = p.text.length;

    let q;
    try {
      T.status("Loading the QR engine (first time only)…"); T.progress(10);
      const qrcode = await T.cdn("qr");
      q = qrcode(0, ec);
      q.addData(byteString(p.text));
      q.make();
    } catch (e) {
      const m = String(e && e.message || e);
      T.progress(0); T.status("");
      T.setErr(/overflow|length/i.test(m)
        ? "That text is too long to fit in one QR code at this error level. Shorten it or lower the error correction to L."
        : "Could not create the QR code (" + m + "). Try different settings.");
      return;
    }

    const canvas = await draw(q, margin, px);
    svgBlob = new Blob([svgOf(q, margin)], { type: "image/svg+xml;charset=utf-8" });
    pngBlob = await T.toBlob(canvas, "image/png");
    T.progress(100);

    out.replaceChildren();
    const info = el("div", "res");
    const line = el("div", "res-line"); line.append(el("span", null, "Encoded payload"), el("b", null, len + " chars"));
    info.appendChild(line);
    const cap = el("div", "res-line"); cap.append(el("span", null, "Module count / level"), el("b", null, q.getModuleCount() + "×" + q.getModuleCount() + " · " + ec));
    info.appendChild(cap);
    out.appendChild(info);
    if (len > 1200) {
      const warn = el("div", "res warn");
      warn.append(el("b", null, "Very dense"), el("p", null, "Over about 1,200 characters a QR becomes hard to scan. Print it large and test with a phone camera before use."));
      out.appendChild(warn);
    }
    out.appendChild(el("h3", "cnt", "Payload"));
    out.appendChild(el("div", "codebox", p.text));

    const acts = el("div", "acts");
    const svgBtn = el("button", "btn", "Download SVG"); svgBtn.type = "button";
    const pngBtn = el("button", "btn btn-ghost", "Download PNG"); pngBtn.type = "button";
    T.on(svgBtn, "click", () => svgBlob && T.download(svgBlob, "qrcode-" + activeTab + ".svg"));
    T.on(pngBtn, "click", () => pngBlob && T.download(pngBlob, "qrcode-" + activeTab + ".png"));
    acts.append(svgBtn, pngBtn);
    out.appendChild(acts);

    T.status("QR ready — scan to check, then download SVG (print) or PNG (screen).");
  });

  T.on($("#rst"), "click", () => {
    ["#f_url", "#f_text", "#f_wanum", "#f_wamsg", "#f_ssid", "#f_wifipass"].forEach(s => { const e = $(s); if (e) e.value = ""; });
    $("#f_url").value = "https://";
    preview.replaceChildren(); preview.appendChild(el("p", "hint", "Your QR code preview will appear here."));
    out.replaceChildren(); svgBlob = pngBlob = null; T.setErr(""); T.status("Reset.");
  });
})();
