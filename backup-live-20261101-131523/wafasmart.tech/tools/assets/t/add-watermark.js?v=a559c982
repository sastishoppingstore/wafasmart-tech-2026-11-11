/* add-watermark — stamp text into the pixels, corner or tiled. */
(function () {
  "use strict";
  const T = window.WST_T; if (!T) return;
  const $ = T.$;
  T.rangeOut("q", "qv"); T.rangeOut("size", "sv", "%"); T.rangeOut("op", "ov", "%"); T.rangeOut("ang", "av", "°");

  const angEl = $("#ang");
  let pos = "se";
  T.$$(".seg[data-pos]").forEach(s => T.on(s, "click", () => {
    pos = s.dataset.pos;
    T.$$(".seg[data-pos]").forEach(o => o.setAttribute("aria-pressed", String(o === s)));
    if (pos === "tile" && +angEl.value === 0) angEl.value = -30, $("#av").textContent = "-30°";
  }));

  function stamp(x, w, h, o) {
    const px = Math.max(9, Math.round(w * o.size / 100));
    const m = Math.round(Math.min(w, h) * 0.03);
    x.save();
    x.globalAlpha = o.op;
    x.font = "700 " + px + 'px "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';
    x.textBaseline = "alphabetic";
    if (o.shadow) { x.shadowColor = "rgba(0,0,0,.6)"; x.shadowBlur = px * 0.28; x.shadowOffsetY = px * 0.05; }
    x.fillStyle = o.col;
    const tw = x.measureText(o.txt).width;
    const rad = o.ang * Math.PI / 180;

    if (pos === "tile") {
      x.translate(w / 2, h / 2); x.rotate(rad);
      const R = Math.hypot(w, h) / 2 + px, stepY = px * 2.9, stepX = tw + px * 3.2;
      let row = 0;
      for (let y = -R; y <= R; y += stepY) {
        const off = (row % 2) * stepX / 2;
        for (let xi = -R - off; xi <= R; xi += stepX) x.fillText(o.txt, xi, y);
        row++;
      }
    } else {
      const cxp = { nw: m, ne: w - m, c: w / 2, sw: m, se: w - m }[pos];
      const anchor = pos === "ne" || pos === "se" ? "right" : pos === "c" ? "center" : "left";
      const base = pos === "nw" || pos === "ne" ? m + px * 0.82 : pos === "c" ? h / 2 + px * 0.34 : h - m;
      x.textAlign = anchor;
      x.translate(cxp, base); x.rotate(rad);
      x.fillText(o.txt, 0, 0);
    }
    x.restore();
  }

  T.imageTool({
    acceptRe: /\.(jpe?g|png|webp|gif|bmp|jfif|heic|heif)$/i,
    typeRe: /^image\//,
    label: "an image (JPG, PNG, WebP, GIF, BMP or HEIC)",
    multiple: true,
    zipName: "watermarked.zip",
    readOpts() {
      const txt = ($("#txt").value || "").trim();
      if (!txt) throw new Error("Type the watermark text first — an empty mark is invisible.");
      return {
        txt: txt,
        size: +$("#size").value,
        op: (+$("#op").value) / 100,
        col: $("#col").value,
        ang: +angEl.value,
        shadow: $("#sh").checked,
        type: $("#fmt").value,
        q: (+$("#q").value) / 100
      };
    },
    async process(ctx) {
      const o = ctx.opts, alpha = o.type === "image/png" || o.type === "image/webp";
      const c = T.paint(ctx.bmp, ctx.bmp.width, ctx.bmp.height, { alpha: alpha, fill: "#fff", fit: "stretch" });
      stamp(c.getContext("2d"), c.width, c.height, o);
      const blob = await T.encode(c, o.type, alpha ? undefined : o.q);
      ctx.out([{
        name: ctx.base + "-watermarked." + T.ext(o.type),
        blob: blob, type: o.type,
        note: (pos === "tile" ? "tiled" : pos) + " · " + T.bytes(blob.size)
      }]);
      T.status(ctx.base + " marked (" + T.bytes(blob.size) + ").");
    }
  });
})();
