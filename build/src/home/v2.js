(function () {
  "use strict";
  var doc = document, win = window;
  /* containers whose children must never become a 3D box (nav, menus, cards, chips, footer) */
  var SKIP = ".wst-cube-root, nav, header, footer, .marquee, .btn, button, .cube-hint, .mnav, .announce, .mega,"
    + ".breadcrumb, .p-card, .sb-card, .ugc-card, .rv-card, .bq-card, .launch-card, .edit-card, .bundle-card,"
    + ".house-tile, .portal, .qc, .j-card, .gift-tile, .bb-card, .cg, .e55-door, .pantry-tile, .sc-card,"
    + ".grow-card, .chips-row, .trust-row, .sd53-cities, .pay-chips, .socials, .sb-facts, .eo-steps, .sig-list,"
    + ".xb-points, .lh-doors, .lh-pay, .tile, .fi, .list-plain";
  var TEXT = "body p, body blockquote";

  /* 1. sharp images: tell the browser the real rendered width so it picks the right srcset file */
  function fitImages() {
    var imgs = doc.querySelectorAll("img[srcset][sizes]");
    for (var i = 0; i < imgs.length; i++) {
      var img = imgs[i], w = Math.ceil(img.getBoundingClientRect().width);
      if (!w) continue;
      var want = w + "px";
      if (img.getAttribute("sizes") !== want) {
        img.setAttribute("sizes", want);
        img.srcset = img.getAttribute("srcset"); /* re-assign so the browser re-selects the candidate */
      }
    }
  }

  /* 2. 3D box for text that wraps to more than 2 lines */
  function lineCount(el) {
    var cs = win.getComputedStyle(el);
    var lh = parseFloat(cs.lineHeight) || parseFloat(cs.fontSize) * 1.4;
    var h = el.getBoundingClientRect().height - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom);
    return Math.round(h / lh);
  }
  function boxText() {
    var els = doc.querySelectorAll(TEXT);
    for (var i = 0; i < els.length; i++) {
      var el = els[i];
      el.classList.remove("tb3d");
      if (el.closest(SKIP + ", .box3d, .tb3d")) continue;
      if (el.querySelector("p, div, ul, ol, section")) continue;
      if (!el.textContent.trim() || !el.getBoundingClientRect().width) continue;
      if (lineCount(el) > 2) el.classList.add("tb3d");
    }
  }

  /* 3. mobile only: lift the rotating cube to the very top of the page (right under the
     fixed header); the hero and everything else slide below it. Desktop keeps the original
     order and the signature copy never moves. */
  var cubeEl = doc.querySelector(".wst-cube-root");
  var cubeHome = cubeEl ? cubeEl.parentNode : null;
  var cubeNext = cubeEl ? cubeEl.nextSibling : null;
  var cubeSlot = doc.querySelector(".cube-top-slot");
  var mqTop = win.matchMedia("(max-width:760px)");

  function placeCube() {
    if (!cubeEl || !cubeHome) return;
    if (mqTop.matches && cubeSlot) {
      if (cubeEl.parentNode !== cubeSlot) cubeSlot.appendChild(cubeEl);
      cubeEl.classList.add("cube-top");
      doc.documentElement.classList.add("cube-top-on");
    } else {
      if (cubeEl.parentNode !== cubeHome) cubeHome.insertBefore(cubeEl, cubeNext);
      cubeEl.classList.remove("cube-top");
      doc.documentElement.classList.remove("cube-top-on");
    }
  }
  placeCube(); /* run as early as possible (before first paint) so nothing shifts */
  (mqTop.addEventListener ? mqTop.addEventListener.bind(mqTop, "change") : mqTop.addListener.bind(mqTop))(placeCube);

  /* 4. keep the cube "sliding" through its product/service cards: while it spins,
     sync the active face, dot and live label to the face currently in front so a
     different service keeps showing as the box turns. (CSS animates the spin; this
     only follows it and stays home-only.) */
  function cubeFollow() {
    var cube = doc.getElementById("cube");
    if (!cube || cube.__follow) return;
    var faces = cube.querySelectorAll(".face"), dots = doc.querySelectorAll(".cube-dot");
    var live = doc.getElementById("cube-live");
    var n = faces.length;
    if (!n) return;
    cube.__follow = true;
    function sync() {
      if (!cube.classList.contains("is-spinning") || cube.classList.contains("is-offscreen")) return;
      var st = win.getComputedStyle(cube).transform;
      var angle = 0;
      if (st && st !== "none") {
        try {
          var m = new DOMMatrixReadOnly(st);
          angle = Math.atan2(m.m13, m.m11) * 180 / Math.PI; /* rotateY */
        } catch (e) { angle = 0; }
      }
      var idx = ((Math.round(-angle / 90) % n) + n) % n;
      for (var i = 0; i < n; i++) {
        var on = i === idx;
        if (faces[i]) { faces[i].classList.toggle("is-active", on); if (on) faces[i].removeAttribute("inert"); else faces[i].setAttribute("inert", ""); }
        if (dots[i]) dots[i].setAttribute("aria-pressed", on ? "true" : "false");
      }
      if (live && faces[idx]) {
        var t = faces[idx].querySelector(".f-title"), p = faces[idx].querySelector(".f-price");
        live.textContent = ((t ? t.textContent : "") + " — " + (p ? p.textContent : "")).trim();
      }
    }
    var raf = 0, last = 0;
    function loop(ts) {
      if (ts - last > 180) { sync(); last = ts; }
      raf = win.requestAnimationFrame(loop);
    }
    if (!win.matchMedia("(prefers-reduced-motion: reduce)").matches) raf = win.requestAnimationFrame(loop);
    doc.addEventListener("visibilitychange", function () {
      if (doc.hidden) { if (raf) win.cancelAnimationFrame(raf); raf = 0; }
      else if (!raf) raf = win.requestAnimationFrame(loop);
    });
  }

  var timer = null;
  function run() { placeCube(); fitImages(); boxText(); cubeFollow(); }
  function schedule() { clearTimeout(timer); timer = setTimeout(run, 180); }

  function start() {
    run();
    win.addEventListener("resize", schedule, { passive: true });
    if (doc.fonts && doc.fonts.ready) doc.fonts.ready.then(run);
    win.addEventListener("load", run, { once: true });
    setTimeout(cubeFollow, 400);
    setTimeout(cubeFollow, 1500);
  }
  if (doc.readyState === "loading") doc.addEventListener("DOMContentLoaded", start);
  else start();
})();
