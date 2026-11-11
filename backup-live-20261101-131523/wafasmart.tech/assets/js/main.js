/* ============================================================
   WAFA SMART TECH — main engine (zero dependencies)
   canvas neural FX · 3D tilt · reveals · counters · slider
   filter · accordion · currency toggle · quote wizard ·
   WhatsApp deep links · admin overrides · PWA
   ============================================================ */
(function () {
  "use strict";
  const D = document, W = window;
  const $ = (s, c) => (c || D).querySelector(s);
  const $$ = (s, c) => Array.from((c || D).querySelectorAll(s));
  /* Performance mode: no ambient canvas, tilt or count-up animation. */
  const reduced = true;
  const touch = W.matchMedia("(hover: none)").matches;
  const CFG = W.WST_CFG || {};                 // injected by build.js (whatsapp, currency…)
  window.WST = { CFG, toast, saveLead };

  /* ---------- preloader (never block content) ---------- */
  const pre = $(".pre");
  if (pre) {
    const hidePre = () => pre.classList.add("gone");
    requestAnimationFrame(() => setTimeout(hidePre, 80));
    setTimeout(hidePre, 900); // fail-safe
  }

  /* ---------- header ---------- */
  const hdr = $(".hdr");
  let scrollTick = false;
  const onScroll = () => {
    if (scrollTick) return;
    scrollTick = true;
    requestAnimationFrame(() => {
      if (hdr) hdr.classList.toggle("scrolled", W.scrollY > 24);
      const h = D.documentElement;
      const sp = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
      D.documentElement.style.setProperty("--sp", sp + "%");
      scrollTick = false;
    });
  };
  W.addEventListener("scroll", onScroll, { passive: true }); onScroll();

  const burger = $(".burger"), links = $(".nav-links");
  if (burger && links) {
    burger.addEventListener("click", () => { burger.classList.toggle("on"); links.classList.toggle("open"); });
    links.addEventListener("click", e => { if (e.target.closest("a")) { burger.classList.remove("on"); links.classList.remove("open"); } });
  }

  /* ---------- neural canvas (lightweight: capped FPS, no shadow blur) ---------- */
  const cv = $("#neural");
  if (cv && !reduced) {
    const ctx = cv.getContext("2d", { alpha: true });
    let w = 0, h = 0, dpr = 1, pts = [], raf = 0, alive = true, visible = true, last = 0;
    let mx = -9999, my = -9999;
    const NUM = W.innerWidth < 720 ? 16 : 28;
    function size() {
      dpr = Math.min(W.devicePixelRatio || 1, 1.5);
      w = cv.clientWidth; h = cv.clientHeight;
      cv.width = w * dpr; cv.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    function init() {
      size();
      pts = Array.from({ length: NUM }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - .5) * .35, vy: (Math.random() - .5) * .35,
        r: Math.random() * 1.6 + .7, hue: Math.random() < .5 ? 46 : 221
      }));
    }
    function frame(t) {
      raf = 0;
      if (!alive || !visible) return;
      raf = requestAnimationFrame(frame);
      if (t - last < 32) return; // ~30fps is plenty for ambient dots
      last = t;
      ctx.clearRect(0, 0, w, h);
      for (const p of pts) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        if (!touch) {
          const dx = p.x - mx, dy = p.y - my, dm = Math.sqrt(dx * dx + dy * dy);
          if (dm < 130 && dm > 0) { p.x += dx / dm * .6; p.y += dy / dm * .6; }
        }
      }
      for (let i = 0; i < pts.length; i++) {
        const a = pts[i];
        for (let j = i + 1; j < pts.length; j++) {
          const b = pts[j], dx = a.x - b.x, dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 14400) {
            ctx.strokeStyle = `hsla(${(a.hue + b.hue) / 2},95%,65%,${(1 - Math.sqrt(d2) / 120) * .32})`;
            ctx.lineWidth = .8;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
      }
      for (const p of pts) {
        ctx.fillStyle = `hsla(${p.hue},100%,70%,.85)`;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 7); ctx.fill();
      }
    }
    function start() { if (!alive || !visible || raf) return; last = 0; raf = requestAnimationFrame(frame); }
    function stop() { if (raf) cancelAnimationFrame(raf); raf = 0; }
    init(); start();
    let rz;
    W.addEventListener("resize", () => { clearTimeout(rz); rz = setTimeout(() => { stop(); init(); start(); }, 180); });
    if (!touch) {
      cv.closest("section").addEventListener("pointermove", e => {
        const r = cv.getBoundingClientRect(); mx = e.clientX - r.left; my = e.clientY - r.top;
      }, { passive: true });
      cv.closest("section").addEventListener("pointerleave", () => { mx = my = -9999; }, { passive: true });
    }
    D.addEventListener("visibilitychange", () => {
      alive = !D.hidden; last = 0;
      if (alive && visible) start(); else stop();
    });
    if ("IntersectionObserver" in W) {
      new IntersectionObserver(es => {
        visible = es[0].isIntersecting;
        if (visible && alive) start(); else stop();
      }, { threshold: 0 }).observe(cv);
    }
  }

  /* ---------- 3D tilt ---------- */
  if (!touch && !reduced) {
    $$(".svc-card,.pf-card").forEach(card => {
      const k = parseFloat(card.dataset.tilt || "7");
      let raf = 0;
      card.addEventListener("pointermove", e => {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
          const r = card.getBoundingClientRect();
          const x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
          card.style.setProperty("--ry", (x * k) + "deg");
          card.style.setProperty("--rx", (-y * k) + "deg");
        });
      });
      card.addEventListener("pointerleave", () => { card.style.setProperty("--rx", "0deg"); card.style.setProperty("--ry", "0deg"); });
    });
  }

  /* ---------- reveal ---------- */
  const io = "IntersectionObserver" in W ? new IntersectionObserver(es => {
    es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
  }, { threshold: .12, rootMargin: "0px 0px -40px 0px" }) : null;
  $$(".rv").forEach(el => io ? io.observe(el) : el.classList.add("in"));

  /* ---------- floating WhatsApp: keep the mobile hero cube unobstructed ---------- */
  const waFloat = $(".wa-float"), heroCube = $(".hero-cube");
  if (waFloat && heroCube && W.matchMedia("(max-width:960px)").matches && "IntersectionObserver" in W) {
    let cubeIn = true, footIn = false;
    const syncWa = () => waFloat.classList.toggle("wa-show", !cubeIn && !footIn);
    new IntersectionObserver(es => {
      cubeIn = es[0].isIntersecting; syncWa();
    }, { threshold: .12 }).observe(heroCube);
    const foot = D.querySelector("footer");
    if (foot) new IntersectionObserver(es => {
      footIn = es[0].isIntersecting; syncWa();
    }, { threshold: .01 }).observe(foot);
  }

  /* ---------- counters ---------- */
  const cio = "IntersectionObserver" in W ? new IntersectionObserver(es => {
    es.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target, to = +el.dataset.count, sfx = el.dataset.suffix || "";
      if (reduced) { el.textContent = to + sfx; cio.unobserve(el); return; }
      const t0 = performance.now(), dur = 1500;
      (function tick(t) {
        const p = Math.min((t - t0) / dur, 1), ease = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(to * ease) + sfx;
        if (p < 1) requestAnimationFrame(tick);
      })(t0);
      cio.unobserve(el);
    });
  }, { threshold: .6 }) : null;
  $$("[data-count]").forEach(el => cio ? cio.observe(el) : el.textContent = el.dataset.count + (el.dataset.suffix || ""));

  /* ---------- testimonials slider ---------- */
  const trk = $(".t-track");
  if (trk) {
    const slides = $$(".t-slide", trk), dots = $$(".t-nav button");
    let i = 0, timer = 0; /* auto-play disabled: only manual dots/swipe change slides */
    D.addEventListener("visibilitychange", () => { });
    function go(n) {
      i = (n + slides.length) % slides.length;
      const dir = getComputedStyle(D.body).direction === "rtl" ? 1 : -1;
      trk.style.transform = `translateX(${dir * i * 100}%)`;
      dots.forEach((d, k) => d.classList.toggle("on", k === i));
    }
    function next() { go(i + 1); }
    dots.forEach((d, k) => d.addEventListener("click", () => go(k)));
    let sx = 0;
    trk.addEventListener("touchstart", e => sx = e.touches[0].clientX, { passive: true });
    trk.addEventListener("touchend", e => { const dx = e.changedTouches[0].clientX - sx; if (Math.abs(dx) > 44) go(i + (dx < 0 ? 1 : -1)); }, { passive: true });
    go(0);
  }

  /* ---------- filter chips (portfolio) ---------- */
  $$(".chips").forEach(row => {
    row.addEventListener("click", e => {
      const b = e.target.closest(".chip"); if (!b) return;
      $$(".chip", row).forEach(c => c.classList.remove("on")); b.classList.add("on");
      const f = b.dataset.filter, grid = $("#" + (row.dataset.target || "pf-grid"));
      if (!grid) return;
      $$("[data-tags]", grid).forEach(card => {
        const ok = f === "all" || card.dataset.tags.toLowerCase().includes(f);
        card.style.display = ok ? "" : "none";
      });
    });
  });

  /* ---------- FAQ accordion ---------- */
  $$(".faq-item").forEach(it => {
    const q = $(".faq-q", it), a = $(".faq-a", it);
    q.addEventListener("click", () => {
      const open = it.classList.contains("open");
      $$(".faq-item").forEach(o => { o.classList.remove("open"); $(".faq-a", o).style.maxHeight = "0"; });
      if (!open) { it.classList.add("open"); a.style.maxHeight = a.scrollHeight + "px"; }
    });
  });

  /* ---------- currency toggle ---------- */
  const RATE = 278;
  $$(".cur-toggle").forEach(t => t.addEventListener("click", e => {
    const b = e.target.closest("button"); if (!b) return;
    $$("button", t).forEach(x => x.classList.remove("on")); b.classList.add("on");
    const usd = b.dataset.cur === "usd";
    $$("[data-pkr]").forEach(p => {
      const v = +p.dataset.pkr;
      p.textContent = usd ? ("$" + Math.round(v / RATE).toLocaleString("en-US")) : ("PKR " + v.toLocaleString("en-US"));
    });
  }));

  /* ---------- WhatsApp links ---------- */
  const waNum = CFG.wa || "923246627054";
  function waLink(msg) { return `https://wa.me/${waNum}?text=${encodeURIComponent(msg)}`; }
  window.WST.waLink = waLink;
  function fillWa() {
    $$("[data-wa-msg]").forEach(a => { a.href = waLink(a.getAttribute("data-wa-msg").replace(/\{page\}/g, D.title)); });
  }
  fillWa();

  /* ---------- toast ---------- */
  let tt;
  function toast(msg, ms) {
    let el = $(".toast");
    if (!el) { el = D.createElement("div"); el.className = "toast"; D.body.appendChild(el); }
    el.textContent = msg; el.classList.add("on");
    clearTimeout(tt); tt = setTimeout(() => el.classList.remove("on"), ms || 3600);
  }

  /* ---------- leads (localStorage for admin) ---------- */
  function saveLead(lead) {
    lead.ts = Date.now(); lead.status = lead.status || "new";
    try {
      const k = "wst.leads";
      const arr = JSON.parse(localStorage.getItem(k) || "[]");
      arr.unshift(lead);
      localStorage.setItem(k, JSON.stringify(arr.slice(0, 200)));
      D.dispatchEvent(new CustomEvent("wst:lead", { detail: lead }));
    } catch (e) { console.warn("lead save failed", e); }
  }

  /* ---------- quote wizard ---------- */
  const modal = $("#quote-modal");
  if (modal) {
    const panes = $$(".wiz-pane", modal);
    let step = 0, data = {};
    function show(n) {
      step = n;
      panes.forEach((p, k) => p.classList.toggle("on", k === n));
      $$(".wiz-steps i", modal).forEach((b, k) => b.classList.toggle("on", k <= n));
      $("#q-next", modal).style.visibility = n === panes.length - 1 ? "hidden" : "visible";
      $("#q-back", modal).style.visibility = n === 0 ? "hidden" : "visible";
    }
    window.openQuote = function (svc, tier, price) {
      data = { service: svc || "", tier: tier || "", price: price || "" };
      const match = $$(".wiz-opt[data-svc]", modal).find(o => o.dataset.svc === svc);
      if (match) data.price = match.dataset.price || price || "";
      $$(".wiz-opt[data-svc]", modal).forEach(o => o.classList.toggle("sel", o.dataset.svc === svc));
      const sel = $("#q-service-select", modal);
      if (sel && svc) sel.value = svc;
      $("#q-name", modal).value = ""; $("#q-phone", modal).value = ""; $("#q-msg", modal).value = "";
      if (tier) $("#q-note", modal) && ($("#q-note", modal).value = "Package: " + tier);
      modal.classList.add("open"); D.body.style.overflow = "hidden"; show(0);
    };
    window.WST.openQuote = window.openQuote;
    modal.addEventListener("click", e => {
      if (e.target.closest(".modal-bd") || e.target.closest(".modal-x")) { modal.classList.remove("open"); D.body.style.overflow = ""; }
      const opt = e.target.closest(".wiz-opt");
      if (opt) {
        const grp = opt.closest(".wiz-opts");
        $$(".wiz-opt", grp).forEach(o => o.classList.remove("sel"));
        opt.classList.add("sel");
        (grp.dataset.key || "").split(",").forEach((k, i) => { data[k.trim()] = i === 0 ? opt.dataset.val : (opt.dataset.label || ""); });
        if (grp.dataset.key === "service") { const sel = $("#q-service-select", modal); if (sel) sel.value = opt.dataset.val; data.price = opt.dataset.price || ""; }
      }
      if (e.target.closest("#q-next")) {
        if (step === 0) {
          const s = data.service || $("#q-service-select", modal)?.value;
          if (!s) { toast("Service select karein · Please pick a service"); return; }
          data.service = s;
        }
        if (step === 2) {
          const n = $("#q-name", modal).value.trim(), p = $("#q-phone", modal).value.trim();
          if (n.length < 2) { toast("Naam likhein · Enter your name"); return; }
          if (!/^[0-9+\-\s()]{7,}$/.test(p)) { toast("Sahi WhatsApp number dein · Valid number required"); return; }
          data.name = n; data.phone = p;
          data.msg = $("#q-msg", modal).value.trim();
          data.budget = ($(".wiz-opts [data-key=budget] .wiz-opt.sel", modal)?.textContent || "").trim();
          data.tier = data.tier || "";
          const lines = ["NEW PROJECT QUOTE — " + (CFG.brand || "Wafa Smart Tech") + " website",
            "Service: " + data.service,
            data.tier ? "Package: " + data.tier : "",
            data.budget ? "Budget: " + data.budget : "",
            data.price ? "Fixed price: PKR " + Number(data.price).toLocaleString("en-US") : "",
            "Name: " + data.name,
            "WhatsApp: " + data.phone,
            data.msg ? "Details: " + data.msg : ""];
          const go = $("#q-send", modal);
          go.href = waLink(lines.filter(Boolean).join("\n"));
          $("#q-summary", modal).textContent = lines.filter(Boolean).join(" · ");
          go.setAttribute("data-lead", JSON.stringify({ name: data.name, phone: data.phone, service: data.service, detail: data.msg, budget: data.budget, price: data.price }));
        }
        show(Math.min(step + 1, panes.length - 1));
      }
      if (e.target.closest("#q-back")) show(Math.max(step - 1, 0));
      const send = e.target.closest("#q-send");
      if (send) {
        try { const L = JSON.parse(send.getAttribute("data-lead") || "{}"); saveLead(Object.assign({ source: "quote-wizard" }, L)); } catch (_) { }
        toast("WhatsApp khul raha hai… message pre-filled hai ✅");
      }
    });
    D.addEventListener("keydown", e => { if (e.key === "Escape" && modal.classList.contains("open")) modal.classList.remove("open"), D.body.style.overflow = ""; });
    $$("[data-quote]").forEach(b => b.addEventListener("click", e => {
      e.preventDefault();
      window.openQuote(b.dataset.quote || b.dataset.svc || "", b.dataset.tier || "", b.dataset.price || "");
    }));
    show(0);
  }

  /* ---------- contact form → whatsapp + lead ---------- */
  const cf = $("#contact-form");
  if (cf) cf.addEventListener("submit", e => {
    e.preventDefault();
    const fd = new FormData(cf);
    const o = Object.fromEntries(fd.entries());
    if (!o.name || !o.phone) { toast("Naam aur WhatsApp number zaroori hai"); return; }
    const msg = ["WEBSITE INQUIRY — " + (CFG.brand || "Wafa Smart Tech"),
      "Name: " + o.name, "WhatsApp: " + o.phone,
      "Service: " + (o.service || "General"), "Budget: " + (o.budget || "-"),
      "", o.message || ""].join("\n");
    saveLead({ source: "contact-form", name: o.name, phone: o.phone, service: o.service, detail: o.message, budget: o.budget });
    W.open(waLink(msg), "_blank");
    cf.reset(); toast("Shukriya! WhatsApp par message ready hai ✅");
  });

  /* ---------- admin overrides (runtime patch) ---------- */
  try {
    const ov = JSON.parse(localStorage.getItem("wst.overrides") || "null");
    if (ov) {
      $$("[data-wk]").forEach(el => {
        const path = el.dataset.wk.split("."); let v = ov;
        for (const p of path) v = v == null ? null : v[p];
        if (v == null || v === "") return;
        if (el.hasAttribute("data-pkr")) { el.setAttribute("data-pkr", v); el.textContent = "PKR " + (+v).toLocaleString("en-US"); }
        else el.textContent = String(v);
      });
      $$("[data-wk-href]").forEach(a => {
        const v = ov[a.dataset.wkHref]; if (v) a.href = /wa\.me|phone|tel|mailto/.test(a.getAttribute("href") || "") ? (String(v).startsWith("92") ? waLink(v) : String(v)) : String(v);
      });
    }
  } catch (e) { console.warn("overrides", e); }

  /* ---------- PWA ---------- */
  if ("serviceWorker" in navigator && !W.location.protocol.includes("file")) {
    W.addEventListener("load", () => navigator.serviceWorker.register("/sw.js").catch(() => { }));
  }
})();
