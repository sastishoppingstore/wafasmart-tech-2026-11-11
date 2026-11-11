/* WAFA Smart Tech — homepage runtime.
   Everything the retained design needs (reveals, rails, menus, cube, counters) in one
   deferred file. No cart, no checkout, no third-party tracking. */
(function () {
  "use strict";
  var D = document, W = window;
  var reduce = W.matchMedia ? W.matchMedia("(prefers-reduced-motion: reduce)") : { matches: false };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || D).querySelectorAll(s)); };
  /* decorative effects run off the critical path: after the load event and once the
     main thread is idle, so the hero paints and the LCP settles unimpeded */
  var later = function (fn) {
    var go = function () { W.requestIdleCallback ? W.requestIdleCallback(fn, { timeout: 1200 }) : W.setTimeout(fn, 250); };
    if (D.readyState === "complete") go(); else W.addEventListener("load", go, { once: true });
  };

  /* ---------- WhatsApp deep links with a pre-filled message ---------- */
  $$("[data-wa-msg]").forEach(function (a) {
    a.href = a.href.split("?")[0] + "?text=" + encodeURIComponent(a.getAttribute("data-wa-msg"));
  });

  /* ---------- sticky header ---------- */
  var header = D.querySelector(".header");
  if (header) {
    var scrollTimeout;
    var onScroll = function () {
      header.classList.toggle("is-stuck", D.documentElement.scrollTop > 40);
      D.documentElement.classList.add('is-scrolling');
      if (scrollTimeout) clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(function(){ D.documentElement.classList.remove('is-scrolling'); }, 150);
    };
    D.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---------- announcement bar ---------- */
  var ann = D.querySelector("[data-announce-close]");
  if (ann) ann.addEventListener("click", function () {
    var bar = D.querySelector(".announce");
    if (bar) bar.remove();
    document.documentElement.style.setProperty("--announce-h", "0px");
  });

  /* ---------- word split (design's .split-words) ---------- */
  function splitWords(el) {
    var n = 0;
    (function walk(node) {
      Array.prototype.slice.call(node.childNodes).forEach(function (kid) {
        if (kid.nodeType === 3) {
          var words = kid.textContent.split(/(\s+)/);
          var frag = D.createDocumentFragment();
          words.forEach(function (t) {
            if (!t || /^\s+$/.test(t)) { frag.appendChild(D.createTextNode(t)); return; }
            var outer = D.createElement("span"); outer.className = "sw";
            var inner = D.createElement("span"); inner.textContent = t;
            inner.style.setProperty("--i", n++);
            outer.appendChild(inner); frag.appendChild(outer);
          });
          node.replaceChild(frag, kid);
        } else if (kid.nodeType === 1) walk(kid);
      });
    })(el);
  }
  $$("[data-split]").forEach(splitWords);

  /* ---------- reveal on scroll ---------- */
  var revealables = $$("[data-reveal],.split-words,.process-step");
  if (!("IntersectionObserver" in W) || reduce.matches) {
    revealables.forEach(function (el) { el.classList.add("is-visible"); });
  } else {
    var io = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        en.target.classList.add("is-visible");
        obs.unobserve(en.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    revealables.forEach(function (el) { io.observe(el); });
  }

  /* ---------- drag-scrollable rails ---------- */
  $$("[data-drag]").forEach(function (rail) {
    var down = false, x0 = 0, left0 = 0, moved = 0;
    rail.addEventListener("pointerdown", function (e) {
      if (e.pointerType === "touch" || e.button) return;
      down = true; moved = 0; x0 = e.clientX; left0 = rail.scrollLeft;
    });
    rail.addEventListener("pointermove", function (e) {
      if (!down) return;
      var dx = e.clientX - x0;
      if (Math.abs(dx) > 6) { moved = 1; rail.classList.add("is-drag"); rail.scrollLeft = left0 - dx; }
    });
    ["pointerup", "pointerleave", "pointercancel"].forEach(function (ev) {
      rail.addEventListener(ev, function () { down = false; rail.classList.remove("is-drag"); });
    });
    rail.addEventListener("click", function (e) { if (moved) { e.preventDefault(); e.stopPropagation(); moved = 0; } }, true);
  });

  /* ---------- desktop mega menu ---------- */
  var megaBtn = D.querySelector("[data-mega]"), mega = D.querySelector(".mega");
  if (megaBtn && mega) {
    var megaWrap = megaBtn.parentNode;
    var setMega = function (open) {
      mega.hidden = !open;
      megaWrap.classList.toggle("open", open);
      megaBtn.setAttribute("aria-expanded", open ? "true" : "false");
    };
    megaBtn.addEventListener("click", function () { setMega(mega.hidden); });
    D.addEventListener("keydown", function (e) { if (e.key === "Escape") setMega(false); });
    D.addEventListener("click", function (e) {
      if (!mega.hidden && !mega.contains(e.target) && !megaBtn.contains(e.target)) setMega(false);
    });
  }

  /* ---------- mobile drawer ---------- */
  var mnav = D.querySelector("#mnav");
  if (mnav) {
    var last = null;
    var setNav = function (open) {
      mnav.hidden = !open;
      mnav.classList.toggle("is-open", open);
      D.body.classList.toggle("no-scroll", open);
      D.body.style.overflow = open ? "hidden" : "";
      $$("[data-open-mnav]").forEach(function (b) { b.setAttribute("aria-expanded", open ? "true" : "false"); });
      if (open) { last = D.activeElement; var f = mnav.querySelector("a,button"); if (f) f.focus(); }
      else if (last) last.focus();
    };
    $$("[data-open-mnav]").forEach(function (b) { b.addEventListener("click", function () { setNav(true); }); });
    $$("[data-close-mnav]").forEach(function (b) { b.addEventListener("click", function () { setNav(false); }); });
    mnav.addEventListener("click", function (e) { if (e.target === mnav) setNav(false); });
    D.addEventListener("keydown", function (e) { if (e.key === "Escape" && !mnav.hidden) setNav(false); });
  }

  /* ---------- counters ---------- */
  function finalCount(el) {
    var t = Number(el.getAttribute("data-count")) || 0;
    el.textContent = t.toLocaleString("en-US") + (el.getAttribute("data-suffix") || "");
  }
  function run(el) {
    var target = Number(el.getAttribute("data-count")) || 0, suffix = el.getAttribute("data-suffix") || "", t0 = null;
    W.requestAnimationFrame(function tick(now) {
      if (t0 === null) t0 = now;
      var p = Math.min(1, (now - t0) / 1300), e = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * e).toLocaleString("en-US") + suffix;
      if (p < 1) W.requestAnimationFrame(tick); else finalCount(el);
    });
  }
  var counters = $$("[data-count]");
  if (counters.length) {
    counters.forEach(finalCount);
    if (reduce.matches || !("IntersectionObserver" in W)) { /* already at the final value */ }
    else {
      var cio = new IntersectionObserver(function (entries, obs) {
        entries.forEach(function (en) {
          if (!en.isIntersecting) return;
          obs.unobserve(en.target); run(en.target);
        });
      }, { threshold: 0.4 });
      counters.forEach(function (el) { cio.observe(el); });
    }
  }

  later(function () {
  /* ---------- rotating 3D cube (service showcase) ---------- */
  var cube = D.getElementById("cube"), stage = D.getElementById("cubeStage");
  if (cube && stage) {
    var dots = $$(".cube-dot"), faces = $$(".cube .face"), live = D.getElementById("cube-live");
    var items = faces.map(function (f) {
      return { title: (f.querySelector(".f-title") || {}).textContent || "", price: (f.querySelector(".f-price") || {}).textContent || "" };
    });
    var index = 0, duration = 8000, frameDelay = duration / faces.length, offsetMs = 0;

    function updateClasses(active) {
      index = active;
      dots.forEach(function (d, i) { d.setAttribute("aria-pressed", i === active ? "true" : "false"); });
      faces.forEach(function (f, i) { f.classList.toggle("is-active", i === active); f.toggleAttribute("inert", i !== active); });
      if (live && items[active]) live.textContent = items[active].title + " — " + items[active].price;
    }
    function goTo(active) {
      if (!faces.length) return;
      active = ((active % faces.length) + faces.length) % faces.length;
      cube.classList.remove("is-spinning");
      cube.style.animation = "none";
      cube.style.transform = "translateZ(calc(var(--w)/-2)) rotateX(-14deg) rotateY(" + (-active * 90) + "deg)";
      offsetMs = active * frameDelay;
      updateClasses(active);
      W.requestAnimationFrame(function () {
        cube.style.animation = "";
        cube.style.animationDelay = (-(active * frameDelay / 1000)) + "s";
        cube.classList.add("is-spinning");
      });
    }
    dots.forEach(function (d, i) { d.addEventListener("click", function () { goTo(i); }); });

    var start = null, swiped = false;
    stage.addEventListener("pointerdown", function (e) {
      if (e.button && e.button !== 0) return;
      start = { x: e.clientX, y: e.clientY };
    });
    stage.addEventListener("pointerup", function (e) {
      if (!start) return;
      var dx = e.clientX - start.x, dy = e.clientY - start.y;
      start = null;
      if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.15) {
        swiped = true; goTo(index + (dx < 0 ? 1 : -1));
        W.setTimeout(function () { swiped = false; }, 80);
      }
    });
    stage.addEventListener("pointercancel", function () { start = null; });
    stage.addEventListener("click", function (e) { if (swiped) { e.preventDefault(); e.stopPropagation(); } }, true);

    if (reduce.matches) { updateClasses(0); }
    else {
      cube.classList.add("is-spinning");
      if ("IntersectionObserver" in W) {
        new IntersectionObserver(function (en) {
          cube.classList.toggle("is-offscreen", !en[0].isIntersecting);
        }, { threshold: 0.05 }).observe(stage);
      }
      updateClasses(0);
    }
    if (live && items[0]) live.textContent = items[0].title + " — " + items[0].price;
  }

  /* ---------- card tilt: disabled for performance ---------- */

  /* ---------- hero dust: disabled for performance ---------- */
  /* ---------- stage parallax: disabled for performance ---------- */
  });

  /* ---------- offer countdowns: fill [data-cd] every second while visible ---------- */
  (function () {
    var clocks = $$("[data-countdown-to]"); if (!clocks.length) return;
    function pad(n) { return (n < 10 ? "0" : "") + n; }
    function paint() {
      if (D.hidden) return;
      clocks.forEach(function (el) {
        var to = new Date(el.getAttribute("data-countdown-to")).getTime();
        var left = Math.max(0, to - Date.now());
        var d = Math.floor(left / 864e5), h = Math.floor(left % 864e5 / 36e5), m = Math.floor(left % 36e5 / 6e4);
        var map = { d: d, h: pad(h), m: pad(m) };
        $$("[data-cd]", el).forEach(function (b) { var v = map[b.getAttribute("data-cd")]; if (v != null) b.textContent = v; });
      });
    }
    paint(); W.setInterval(paint, 1000);
  })();

  /* ---------- city turnaround check: answer locally, no network ---------- */
  (function () {
    var form = D.querySelector("[data-sd-check]"); if (!form) return;
    var ans = D.querySelector("[data-sd-ans]");
    var blob = D.querySelector("[data-cities]"), days = null;
    try { days = JSON.parse(blob.textContent); } catch (e) { days = null; }
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!ans || !days) return;
      var q = (form.city.value || "").trim().toLowerCase();
      ans.className = "sd53-ans";
      while (ans.firstChild) ans.removeChild(ans.firstChild);
      if (!q) return;
      function has(list) { return (days[list] || []).some(function (c) { return c.toLowerCase() === q; }); }
      var tone = has("quick") ? "is-yes" : has("day") || has("gulf") ? "is-yes" : "is-no";
      ans.classList.add(tone);
      var name = D.createElement("b"); name.textContent = cap(q); ans.appendChild(name);
      ans.appendChild(D.createTextNode(
        has("quick") ? " — three demo designs by tomorrow evening."
        : has("gulf") ? " — demo in Arabic or English within 24 hours."
        : has("day") ? " — a full demo within 24 hours."
        : " — we build here too; message us and we will confirm the day."));
    });
    function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
  })();

  /* ---------- larger-text toggle: remember the choice, no storage of anything else ---------- */
  (function () {
    var btn = D.querySelector("[data-textsize]"); if (!btn) return;
    var KEY = "wst.bigtext", root = D.documentElement;
    function set(on) { root.classList.toggle("big-text", on); btn.setAttribute("aria-pressed", on ? "true" : "false");
      var lab = btn.querySelector("span"); if (lab) lab.textContent = on ? "Normal text" : "Larger text"; }
    var saved = null; try { saved = W.localStorage.getItem(KEY); } catch (e) {}
    set(saved === "1");
    btn.addEventListener("click", function () {
      var on = !root.classList.contains("big-text"); set(on);
      try { W.localStorage.setItem(KEY, on ? "1" : "0"); } catch (e) {}
    });
  })();

  /* ---------- newsletter: hand off to WhatsApp/mail, nothing is stored or sent to a server ---------- */
  $$("[data-form]").forEach(function (form) {
    var msg = D.querySelector('[data-form-msg="' + form.getAttribute("data-form") + '"]');
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (form.website && form.website.value) return;
      var email = (form.email && form.email.value || "").trim();
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) { if (msg) { msg.textContent = "Please enter a valid email address."; msg.classList.add("is-error"); } return; }
      var d = form.dataset;
      var subject = "Website enquiry — " + (d.brand || ""), body = (d.wa || "") + email;
      if (msg) { msg.classList.remove("is-error"); msg.textContent = "Thank you — opening your mail app so nothing is stored on our side."; }
      W.location.href = "mailto:" + (d.mailto || "") + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
    });
  });
})();
