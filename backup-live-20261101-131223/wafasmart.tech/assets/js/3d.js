/* ============================================================
   WAFA SMART TECH — 3D Layer v1.0 (vanilla JS, no deps)
   Cube · swipe · dots · tilt · counters · reveal · FAQ · WA links
   ============================================================ */
(function () {
  "use strict";

  var D = document;
  var W = window;
  /* Performance mode: disable auto cube rotation, tilt and count-up. */
  var reduced = W.matchMedia ? W.matchMedia("(prefers-reduced-motion: reduce)") : { matches: false };
  var finePointer = W.matchMedia && W.matchMedia("(hover:hover) and (pointer:fine)").matches;
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || D).querySelectorAll(sel)); };
  var $ = function (sel, root) { return (root || D).querySelector(sel); };

  /* ---------- WhatsApp deep links ---------- */
  $$("[data-wa-msg]").forEach(function (a) {
    var msg = a.getAttribute("data-wa-msg");
    if (!msg) return;
    var num = a.getAttribute("data-wa") || "923246627054";
    a.href = "https://wa.me/" + num + "?text=" + encodeURIComponent(msg);
    a.target = "_blank";
    a.rel = "noopener";
  });

  /* ---------- landing header ---------- */
  var hdr = $(".w3d-header");
  if (hdr) {
    var onScroll = function () { requestAnimationFrame(function(){ hdr.classList.toggle("is-stuck", W.scrollY > 12); }); };
    onScroll();
    W.addEventListener("scroll", onScroll, { passive: true });
  }
  var burger = $(".w3d-burger");
  var links = $("#w3dLinks");
  if (burger && links) {
    burger.addEventListener("click", function () {
      var open = burger.getAttribute("aria-expanded") === "true";
      burger.setAttribute("aria-expanded", open ? "false" : "true");
      links.classList.toggle("open", !open);
    });
    links.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        burger.setAttribute("aria-expanded", "false");
        links.classList.remove("open");
      }
    });
  }

  /* ---------- 3D cube ---------- */
  function initCube(stage) {
    var group = stage.closest("[data-cube-group]") || stage.parentElement;
    var cube = $(".w3d-cube", stage);
    if (!cube) return;
    var faces = $$(".w3d-face", cube);
    if (!faces.length) return;
    var dots = $$("[data-cube-dot]", group || stage);
    var live = $("[data-cube-live]", group || stage);
    var hint = $("[data-cube-hint]", group || stage);

    var items = faces.map(function (face) {
      var t = $(".w3d-title", face);
      var p = $(".w3d-price", face);
      return {
        title: t ? t.textContent.trim() : "Product",
        price: p ? p.textContent.trim() : ""
      };
    });

    var index = 0;
    var timer = null;
    var paused = false;
    var hovered = false;

    function paint() {
      var active = ((index % faces.length) + faces.length) % faces.length;
      cube.style.transform = "translateZ(calc(var(--w)/-2)) rotateX(-6deg) rotateY(" + (-90 * index) + "deg)";
      faces.forEach(function (face, i) {
        var on = i === active;
        face.classList.toggle("is-active", on);
        if (on) face.removeAttribute("inert"); else face.setAttribute("inert", "");
        face.setAttribute("aria-hidden", on ? "false" : "true");
      });
      dots.forEach(function (dot, i) {
        dot.setAttribute("aria-pressed", i === active ? "true" : "false");
      });
      if (live) live.textContent = items[active].title + (items[active].price ? " — " + items[active].price : "");
      if (hint) hint.setAttribute("data-face", String(active + 1));
    }

    function canAuto() {
      return !paused && !hovered && !D.hidden;
    }

    function schedule() {
      if (timer) { clearInterval(timer); timer = null; }
      if (!canAuto()) return;
      timer = setInterval(function () { index += 1; paint(); }, 1200);
    }

    function goTo(n) {
      index = n;
      paint();
      schedule();
    }

    dots.forEach(function (dot, i) {
      dot.addEventListener("click", function () { goTo(index + (i - (((index % faces.length) + faces.length) % faces.length))); });
    });

    /* swipe */
    var sx = 0, sy = 0, down = false;
    stage.addEventListener("pointerdown", function (e) {
      down = true; sx = e.clientX; sy = e.clientY;
    });
    stage.addEventListener("pointerup", function (e) {
      if (!down) return;
      down = false;
      var dx = e.clientX - sx, dy = e.clientY - sy;
      if (Math.abs(dx) > 38 && Math.abs(dx) > Math.abs(dy) * 1.2) {
        if (dx < 0) index += 1; else index -= 1;
        paint(); schedule();
      }
    });
    stage.addEventListener("pointercancel", function () { down = false; });

    /* keyboard */
    stage.setAttribute("tabindex", stage.getAttribute("tabindex") || "0");
    stage.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight") { e.preventDefault(); index += 1; paint(); schedule(); }
      if (e.key === "ArrowLeft") { e.preventDefault(); index -= 1; paint(); schedule(); }
    });

    /* pause */
    stage.addEventListener("pointerenter", function () { hovered = true; schedule(); });
    stage.addEventListener("pointerleave", function () { hovered = false; schedule(); });
    stage.addEventListener("focusin", function () { paused = true; schedule(); });
    stage.addEventListener("focusout", function () { paused = false; schedule(); });
    D.addEventListener("visibilitychange", schedule);

    paint();
    schedule();
  }
  $$("[data-cube]").forEach(initCube);

  /* ---------- 3D tilt ---------- */
  var tiltEls = $$("[data-tilt],.svc3d,.card3d,.price3d,.stat3d,.cert3d,.step3d,.rev3d,.f-card,.price-card");
  tiltEls.forEach(function (el) {
    if (el.hasAttribute("data-no-tilt")) return;
    var strength = parseFloat(el.getAttribute("data-tilt") || "7");
    var touching = false;
    var raf = 0;

    function apply(x, y) {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(function () {
        var r = el.getBoundingClientRect();
        if (!r.width || !r.height) return;
        var px = (x - r.left) / r.width - .5;
        var py = (y - r.top) / r.height - .5;
        el.style.setProperty("--ry", (px * strength).toFixed(2) + "deg");
        el.style.setProperty("--rx", (-py * strength).toFixed(2) + "deg");
      });
    }
    function reset() {
      cancelAnimationFrame(raf);
      el.style.setProperty("--rx", "0deg");
      el.style.setProperty("--ry", "0deg");
    }

    if (finePointer && !(reduced && reduced.matches)) {
      el.addEventListener("pointermove", function (e) { if (e.pointerType === "mouse") apply(e.clientX, e.clientY); });
      el.addEventListener("pointerleave", reset);
    }
    el.addEventListener("pointerdown", function (e) {
      if (e.pointerType === "touch") { touching = true; apply(e.clientX, e.clientY); }
    });
    el.addEventListener("pointermove", function (e) {
      if (touching && e.pointerType === "touch" && !(reduced && reduced.matches)) apply(e.clientX, e.clientY);
    });
    ["pointerup", "pointercancel", "pointerleave"].forEach(function (ev) {
      el.addEventListener(ev, function () { touching = false; reset(); });
    });
  });

  /* ---------- reveal on scroll ---------- */
  var rv = $$(".rv3d");
  if (rv.length) {
    if (!("IntersectionObserver" in W) || (reduced && reduced.matches)) {
      rv.forEach(function (el) { el.classList.add("in"); });
    } else {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        });
      }, { threshold: .12, rootMargin: "0px 0px -40px 0px" });
      rv.forEach(function (el) { io.observe(el); });
    }
  }

  /* ---------- counters ---------- */
  var counters = $$("[data-count]");
  if (counters.length) {
    var run = function (el) {
      var to = parseFloat(el.getAttribute("data-count")) || 0;
      var sfx = el.getAttribute("data-suffix") || "";
      var prefix = el.getAttribute("data-prefix") || "";
      if (reduced && reduced.matches) { el.textContent = prefix + to + sfx; return; }
      var t0 = performance.now();
      var dur = 1500;
      (function tick(t) {
        var p = Math.min((t - t0) / dur, 1);
        var e = 1 - Math.pow(1 - p, 3);
        el.textContent = prefix + Math.round(to * e) + sfx;
        if (p < 1) requestAnimationFrame(tick);
      })(t0);
    };
    if (!("IntersectionObserver" in W)) {
      counters.forEach(run);
    } else {
      var cio = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          run(entry.target);
          cio.unobserve(entry.target);
        });
      }, { threshold: .55 });
      counters.forEach(function (el) { cio.observe(el); });
    }
  }

  /* ---------- FAQ: only one open ---------- */
  var faq = $$(".faq3d");
  faq.forEach(function (wrap) {
    var items = $$("details", wrap);
    items.forEach(function (d) {
      d.addEventListener("toggle", function () {
        if (!d.open) return;
        items.forEach(function (other) { if (other !== d) other.open = false; });
      });
    });
  });

  /* ---------- current year ---------- */
  $$("[data-year]").forEach(function (el) { el.textContent = String(new Date().getFullYear()); });
})();
