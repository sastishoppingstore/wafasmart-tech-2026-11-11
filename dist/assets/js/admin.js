/* ============================================================
   WAFA SMART TECH — Admin CMS (client-side, no server needed)
   Login · Dashboard · Leads inbox · Content & pricing editor
   Export / Import / Backup.  Data lives in localStorage and is
   applied to the public site via [data-wk] runtime overrides.
   ============================================================ */
(function () {
  "use strict";
  const D = document, W = window;
  const $ = (s, c) => (c || D).querySelector(s);
  const $$ = (s, c) => Array.from((c || D).querySelectorAll(s));
  const K = { ov: "wst.overrides", leads: "wst.leads", auth: "wst.admin.session", pw: "wst.admin.pw" };
  const DEFAULT_PW = "wafa@2026";
  const esc = s => String(s == null ? "" : s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  /* Storage can be blocked (private mode, embedded browser, quota). Never let a
     storage exception stop the login screen or the dashboard from opening. */
  let storageWarned = false;
  const mem = Object.create(null);
  function safeGet(area, k) {
    try { return W[area].getItem(k); } catch (e) { mem[area + ":" + k] ??= null; return mem[area + ":" + k]; }
  }
  function safeSet(area, k, v) {
    try { W[area].setItem(k, v); return true; }
    catch (e) { mem[area + ":" + k] = v; if (!storageWarned) { storageWarned = true; setTimeout(() => toast("Browser storage blocked — data sirf is tab tak rahega. Private mode off karein.", true), 60); } return false; }
  }
  function safeDel(area, k) {
    try { W[area].removeItem(k); } catch (e) { }
    delete mem[area + ":" + k];
  }
  const store = (k, v) => safeSet("localStorage", k, JSON.stringify(v));
  const load = (k, d) => {
    const raw = safeGet("localStorage", k);
    if (raw == null) return d;
    try { return JSON.parse(raw) ?? d; } catch (e) { return d; }
  };
  function setPath(root, path, val) {
    const parts = String(path).split(".");
    let o = root;
    for (let i = 0; i < parts.length - 1; i++) {
      const key = parts[i];
      if (!o[key] || typeof o[key] !== "object") o[key] = {};
      o = o[key];
    }
    o[parts[parts.length - 1]] = val;
    return root;
  }
  const fmt = n => "PKR " + Number(n).toLocaleString("en-US");
  const now = () => new Date().toLocaleString("en-PK", { dateStyle: "medium", timeStyle: "short" });

  const app = $("#adm-app");
  const SVCS = JSON.parse(document.body.dataset.svcs || "[]");
  const PKGS = JSON.parse(document.body.dataset.pkgs || "[]");

  /* ---------- auth ---------- */
  function hash(s) { // simple non-crypto gate (client-only admin)
    let h = 0x811c9dc5; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 0x01000193) >>> 0; }
    return h.toString(36);
  }
  function authToken() {
    return safeGet("localStorage", K.auth) || safeGet("sessionStorage", K.auth) || W.__wstAuth || "";
  }
  function setAuth(token) {
    W.__wstAuth = token;
    const a = safeSet("localStorage", K.auth, token);
    const b = safeSet("sessionStorage", K.auth, token);
    if (!a && !b) toast("Storage blocked — login is tab tak chalega, reload par dobara password lagayega.", true);
  }
  function clearAuth() {
    W.__wstAuth = "";
    safeDel("localStorage", K.auth);
    safeDel("sessionStorage", K.auth);
  }
  function gate() {
    const cur = load(K.pw, null) || hash(DEFAULT_PW);
    if (authToken() === cur) return dash();
    app.innerHTML = `<div class="login-card glass">
      <img src="/assets/img/logo.webp" width="72" height="72" alt="Wafa Smart Tech" style="margin:0 auto 14px;border-radius:18px">
      <h2>Admin — ${esc((W.WST_CFG || {}).brand || "Wafa Smart Tech")}</h2>
      <p class="tiny muted" style="margin:8px 0 18px">Password default: <span class="kb">${DEFAULT_PW}</span> (badal lein pehle login ke baad)</p>
      <form id="lf"><div class="field"><label for="lp">Password</label><input class="input" id="lp" type="password" autocomplete="current-password" required></div>
      <button class="btn btn-block" type="submit">Unlock dashboard</button>
      <p class="hint" style="margin-top:12px">Is panel ka data sirf is browser me rehta hai — koi server nahi. Live deploy se pehle content JSON export kar ke source me daalein.</p>
      <button class="btn btn-sm btn-ghost" id="reset-admin" type="button" style="margin-top:10px">Password bhool gaye? Local admin reset</button></form></div>`;
    $("#lf").addEventListener("submit", e => {
      e.preventDefault();
      const v = hash($("#lp").value + "");
      const want = load(K.pw, null) || hash(DEFAULT_PW);
      if (v === want) { setAuth(want); dash(); }
      else toast("Ghalat password 🚫", true);
    });
    $("#reset-admin").onclick = () => {
      if (!confirm("Local admin password reset kar dein? Overrides aur leads safe rahenge.")) return;
      safeDel("localStorage", K.pw);
      clearAuth();
      toast("Password reset — default password ab wafa@2026 hai");
      gate();
    };
  }
  function toast(m, bad) {
    let t = $(".toast"); if (!t) { t = D.createElement("div"); t.className = "toast"; D.body.appendChild(t); }
    t.textContent = m; t.style.borderColor = bad ? "#ff4f74" : ""; t.classList.add("on");
    setTimeout(() => t.classList.remove("on"), 2600);
  }

  /* ---------- shell ---------- */
  let tab = "dash";
  function dash() {
    app.innerHTML = `
    <div class="adm-top"><a class="logo" href="/index.html"><img src="/assets/img/logo.webp" width="36" height="36" alt="" style="border-radius:10px"><span>WAFA<span class="grad-txt">SMART</span>ADMIN</span></a>
      <span class="tiny muted">v1.0 · ${now()}</span>
      <div class="row" style="margin-inline-start:auto;gap:8px">
        <a class="btn btn-sm btn-ghost" href="/index.html">👁 View site</a>
        <button class="btn btn-sm btn-ghost" id="logout" type="button">Logout</button></div></div>
    <div class="adm-body">
      <aside class="adm-side" role="group" aria-label="Admin sections">
        ${[["dash", "📊 Dashboard"], ["leads", "📥 Leads"], ["content", "✏️ Content"], ["pricing", "💰 Pricing"], ["io", "💾 Export/Import"], ["help", "❓ Guide"]].map(([k, l]) => `<button type="button" data-tab="${k}" class="${tab === k ? "on" : ""}">${l}</button>`).join("")}
      </aside>
      <main id="adm-main"></main>
    </div>`;
    $("#logout").onclick = () => { clearAuth(); gate(); };
    $$(".adm-side button").forEach(b => b.onclick = () => { tab = b.dataset.tab; dash(); });
    ({ dash: viewDash, leads: viewLeads, content: viewContent, pricing: viewPricing, io: viewIO, help: viewHelp })[tab]();
  }

  /* ---------- views ---------- */
  function viewDash() {
    const leads = load(K.leads, []), ov = load(K.ov, {});
    const today = leads.filter(l => Date.now() - (l.ts || 0) < 864e5).length;
    const newish = leads.filter(l => l.status === "new").length;
    const qCount = leads.filter(l => l.source === "quote-wizard").length;
    $("#adm-main").innerHTML = `
      <div class="adm-kpi">
        ${[["Total leads", leads.length], ["New", newish], ["Today", today], ["Via quote wizard", qCount]].map(([a, b]) => `<div class="stat-card"><b>${b}</b><span>${a}</span></div>`).join("")}
      </div>
      <div class="adm-card"><h2>Latest inquiries</h2><p class="tiny muted" style="margin-bottom:12px">Site ke forms yahan aate hain — har row par direct WhatsApp reply.</p>
      ${leadsTable(leads.slice(0, 6))}
      ${leads.length ? "" : `<p class="muted tiny">Abhi koi lead nahi — test karne ke liye site par <span class="kb">Get Quote</span> wizard use karein.</p>`}</div>
      <div class="adm-card"><h2>Content state</h2>
      <p class="tiny muted">Overrides saved: <b>${Object.keys(ov).length ? countKeys(ov) : 0}</b> · last backup: <b>${esc(ov._savedAt || "never")}</b></p>
      <div class="adm-grid2" style="margin-top:14px">
        <a class="btn btn-sm" href="/pricing.html">Open pricing page →</a>
        <button class="btn btn-sm btn-ghost" type="button" id="quick-export">⬇ Export everything now</button>
      </div></div>`;
    $("#quick-export").onclick = () => exportAll();
    wireLeads();
  }
  function countKeys(o) { let n = 0; const rec = x => Object.values(x || {}).forEach(v => typeof v === "object" ? rec(v) : n++); rec(o); return n; }

  function leadsTable(rows) {
    return `<div class="tbl-wrap"><table class="tbl"><thead><tr><th>When</th><th>Name</th><th>WhatsApp</th><th>Service</th><th>Budget</th><th>Detail</th><th>Status</th><th>Act</th></tr></thead><tbody>
      ${rows.map(l => `<tr>
        <td class="tiny">${new Date(l.ts || 0).toLocaleString("en-PK", { dateStyle: "short", timeStyle: "short" })}</td>
        <td><b>${esc(l.name || "-")}</b><br><span class="tiny muted">${esc(l.source || "")}</span></td>
        <td>${esc(l.phone || "-")}</td><td>${esc(l.service || "-")}</td><td class="tiny">${esc(l.budget || "-")}</td>
        <td class="tiny" style="max-width:220px">${esc((l.detail || "").slice(0, 90))}${(l.detail || "").length > 90 ? "…" : ""}</td>
        <td><span class="badge ${l.status === "done" ? "ok" : "new"}">${esc(l.status || "new")}</span></td>
        <td style="white-space:nowrap">
          <button class="btn btn-sm btn-ghost" data-reply="${esc(l.phone || "")}" type="button" title="Reply on WhatsApp">💬</button>
          <button class="btn btn-sm btn-ghost" data-done="${l.ts}" type="button" title="Mark done">✓</button>
          <button class="btn btn-sm btn-ghost" data-del="${l.ts}" type="button" title="Delete">✕</button></td>
      </tr>`).join("")}</tbody></table></div>`;
  }
  function viewLeads() {
    const leads = load(K.leads, []);
    $("#adm-main").innerHTML = `<div class="adm-card row between"><div><h2>Leads inbox (${leads.length})</h2><p class="tiny muted">Filter + manage every quote/contact submission.</p></div>
      <div class="row"><input class="input" id="lf-search" placeholder="Search name / service…" style="width:220px">
      <button class="btn btn-sm" id="csv" type="button">⬇ CSV</button></div></div>
      <div class="adm-card" id="lt">${leadsTable(leads) || "<p>No leads</p>"}</div>`;
    const render = f => {
      const rows = leads.filter(l => !f || JSON.stringify(l).toLowerCase().includes(f.toLowerCase()));
      $("#lt").innerHTML = leadsTable(rows); wireLeads();
    };
    $("#lf-search").oninput = e => render(e.target.value);
    $("#csv").onclick = () => download("wafa-leads.csv", leads.map(l => [new Date(l.ts).toISOString(), l.source, l.name, l.phone, l.service, l.budget, (l.detail || "").replace(/\n/g, " "), l.status].map(x => '"' + String(x == null ? "" : x).replace(/"/g, '""') + '"').join(",")).join("\n"), "text/csv");
    wireLeads();
  }
  function wireLeads() {
    $$("[data-reply]").forEach(b => b.onclick = () => { let p = (b.dataset.reply || "").replace(/\D/g, ""); if (p.startsWith("0")) p = "92" + p.slice(1); W.open("https://wa.me/" + p + "?text=" + encodeURIComponent("Assalam o Alaikum! Aapki inquiry ke baray me Wafa Smart Tech se baat kar rahe hain —"), "_blank"); });
    $$("[data-done]").forEach(b => b.onclick = () => { const ls = load(K.leads, []); const l = ls.find(x => x.ts == b.dataset.done); if (l) l.status = l.status === "done" ? "new" : "done"; store(K.leads, ls); toast("Updated ✅"); viewLeads(); });
    $$("[data-del]").forEach(b => b.onclick = () => { store(K.leads, load(K.leads, []).filter(x => x.ts != b.dataset.del)); toast("Deleted"); dash(); });
  }

  /* ---------- content editor ---------- */
  function viewContent() {
    const ov = load(K.ov, {});
    const F = (label, path, val, ph, area) => `<div class="field"><label>${label}</label>${area ? `<textarea class="input" data-path="${path}" rows="3" placeholder="${esc(ph || "")}">${esc(val || "")}</textarea>` : `<input class="input" data-path="${path}" value="${esc(val || "")}" placeholder="${esc(ph || "")}">`}</div>`;
    $("#adm-main").innerHTML = `
    <div class="adm-card"><h2>Hero &amp; contact</h2>
      <p class="tiny muted">Ye values site par foran lagoo hoti hain (is browser me) aur <b>Export</b> se permanent build me jati hain.</p>
      <div class="adm-grid2" style="margin-top:14px">
        ${F("Hero title", "hero.title", ov.hero && ov.hero.title, "We build AI agents…")}
        ${F("Hero subtitle", "hero.sub", ov.hero && ov.hero.sub, "short pitch")}
        ${F("WhatsApp (digits, e.g. 923246627054)", "contact.whatsapp", ov.contact && ov.contact.whatsapp, "923246627054")}
        ${F("WhatsApp display", "contact.whatsappDisplay", ov.contact && ov.contact.whatsappDisplay, "0324 6627054")}
        ${F("Email", "contact.email", ov.contact && ov.contact.email, "info@wafasmart.tech")}
        ${F("Hours", "contact.hours", ov.contact && ov.contact.hours, "Mon-Sat 10-8 PKT")}
      </div>
      ${F("Address", "contact.address", ov.contact && ov.contact.address, "Lahore-Sharqpur Road, near 20 km…", true)}
      <button class="btn" id="save-content" type="button">💾 Save &amp; preview on site</button></div>
    <div class="adm-card"><h2>Change admin password</h2><div class="adm-grid2">
      <div class="field"><label>New password</label><input class="input" id="npw" type="password" placeholder="min 6 chars"></div>
      <div class="field"><label>Confirm</label><input class="input" id="npw2" type="password"></div></div>
      <button class="btn btn-sm btn-ghost" id="setpw" type="button">Update password</button></div>`;
    $("#save-content").onclick = () => {
      const next = load(K.ov, {});
      $$("main [data-path]").forEach(i => {
        if (!i.value.trim()) return;
        setPath(next, i.dataset.path, i.value.trim());
      });
      next._savedAt = now(); store(K.ov, next); toast("Saved — site refresh karein 👍");
    };
    $("#setpw").onclick = () => {
      const a = $("#npw").value, b = $("#npw2").value;
      if (a.length < 6 || a !== b) return toast("Password 6+ chars ho aur match kare", true);
      const h = hash(a);
      store(K.pw, h); setAuth(h); toast("Password updated ✅");
    };
  }

  /* ---------- pricing editor ---------- */
  function viewPricing() {
    const ov = load(K.ov, {});
    $("#adm-main").innerHTML = `<div class="adm-card"><h2>Package prices (PKR)</h2><p class="tiny muted">Fixed band: 10,000 → 40,000. Changes apply as overrides + export.</p>
      <div class="adm-grid2" style="margin-top:14px">
      ${PKGS.map(p => `<div class="field"><label>${esc(p.n)}</label><input class="input" data-pk="packages.${esc(p.n)}.price" type="number" min="1000" max="40000" step="500" value="${(ov.packages && ov.packages[p.n] && ov.packages[p.n].price) || p.price}"></div>`).join("")}
      </div></div>
      <div class="adm-card"><h2>Service price ranges</h2><div class="adm-grid2" style="margin-top:14px">
      ${SVCS.map(s => `<div class="row" style="gap:10px"><span style="flex:1">${esc(s.name)}</span>
        <input class="input" data-pk="services.${s.slug}.from" type="number" min="10000" max="40000" step="1000" value="${(ov.services && ov.services[s.slug] && ov.services[s.slug].from) || s.from}" title="from">
        <span class="muted">→</span>
        <input class="input" data-pk="services.${s.slug}.to" type="number" min="10000" max="40000" step="1000" value="${(ov.services && ov.services[s.slug] && ov.services[s.slug].to) || s.to}" title="to"></div>`).join("")}
      </div>
      <button class="btn" style="margin-top:18px" id="save-p" type="button">💾 Save pricing</button>
      <p class="tiny muted" style="margin-top:10px">Band se bahar value = auto-clamp 10K–40K (client trust rule).</p></div>`;
    $("#save-p").onclick = () => {
      const next = load(K.ov, {});
      $$("main [data-pk]").forEach(i => {
        let v = Math.max(1000, Math.min(40000, +i.value || 0));
        if (!v) return;
        setPath(next, i.dataset.pk, v);
      });
      next._savedAt = now(); store(K.ov, next); toast("Pricing saved ✅ refresh site");
    };
  }

  /* ---------- import / export ---------- */
  function viewIO() {
    $("#adm-main").innerHTML = `<div class="adm-card"><h2>Backup &amp; move to production</h2>
      <p class="tiny muted">Export → <b>content.json</b> (overrides + lead log). Build me daalne ke liye README ka “Going live” section.</p>
      <div class="row" style="margin-top:16px;flex-wrap:wrap">
        <button class="btn" id="exp-json" type="button">⬇ Export JSON</button>
        <button class="btn btn-ghost" id="exp-csv" type="button">⬇ Leads CSV</button>
        <button class="btn btn-ghost" id="imp-btn" type="button">⬆ Import JSON</button>
        <button class="btn btn-ghost" id="wipe" type="button">🗑 Reset all local data</button>
      </div><input type="file" id="imp-file" accept="application/json" hidden></div>
      <div class="adm-card"><h2>Preview overrides JSON</h2><pre class="tiny glass" style="padding:16px;overflow:auto;max-height:300px">${esc(JSON.stringify(load(K.ov, {}), null, 2))}</pre></div>`;
    $("#exp-json").onclick = exportAll;
    $("#exp-csv").onclick = () => { const leads = load(K.leads, []); download("wafa-leads.csv", leads.map(l => [l.ts, l.source, l.name, l.phone, l.service, l.budget, (l.detail || "").replace(/\n/g, " "), l.status].map(x => '"' + String(x == null ? "" : x).replace(/"/g, '""') + '"').join(",")).join("\n"), "text/csv"); };
    $("#imp-btn").onclick = () => $("#imp-file").click();
    $("#imp-file").onchange = e => {
      const f = e.target.files[0]; if (!f) return;
      f.text().then(t => {
        try {
          const o = JSON.parse(t);
          if (o.overrides) store(K.ov, o.overrides);
          if (o.leads) store(K.leads, o.leads);
          toast("Imported ✅"); dash();
        } catch (err) { toast("Ghalat file — JSON parse nahi hua", true); }
      });
    };
    $("#wipe").onclick = () => { if (confirm("Sab local data (overrides + leads) delete ho jayega. Sure?")) { localStorage.removeItem(K.ov); localStorage.removeItem(K.leads); toast("Reset done"); dash(); } };
  }
  function exportAll() {
    download("wafa-admin-export.json", JSON.stringify({ exportedAt: new Date().toISOString(), overrides: load(K.ov, {}), leads: load(K.leads, []) }, null, 2), "application/json");
  }
  function download(name, text, type) {
    const b = new Blob([text], { type }); const u = URL.createObjectURL(b);
    const a = D.createElement("a"); a.href = u; a.download = name; a.click();
    setTimeout(() => URL.revokeObjectURL(u), 4000);
  }

  function viewHelp() {
    $("#adm-main").innerHTML = `<div class="adm-card"><h2>How this admin works (1 minute)</h2>
      <ul class="checklist" style="margin-top:10px">
      <li><b>Leads</b> — contact form + quote wizard ke submissions isi browser ke localStorage me aate hain (demo/private mode me). Real deployment par aap WhatsApp par directly message receive karte hain — lead yahan backup ke liye store hoti hai.</li>
      <li><b>Content / Pricing</b> — edits foran live site par dikhte hain (overrides). Permanent banane ke liye Export JSON lein aur <span class="kb">build/src/data/site.js</span> me values update kar ke <span class="kb">node build/build.js</span> chalayein.</li>
      <li><b>Mobile</b> — admin.html Android/iOS/Windows ke browsers par chalta hai (PWA install bhi ho sakta hai).</li>
      <li><b>Password</b> default <span class="kb">${DEFAULT_PW}</span> — pehla kaam: usse badlein.</li>
      <li><b>Privacy</b> — koi server nahi, koi tracking nahi. Data sirf aapke device par.</li></ul></div>`;
  }

  gate();
})();
