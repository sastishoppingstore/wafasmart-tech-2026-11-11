/* rotate-flip-image — bake rotation/mirroring into the pixels, with a live preview. */
(function () {
  "use strict";
  const T = window.WST_T, D = document; if (!T) return;
  const $ = T.$;
  T.rangeOut("q", "qv");

  const pv = $("#pv"), state = $("#tstate");
  let rot = 0, fh = false, fv = false, pvBmp = null;

  function dims(bmp) {
    const swap = rot === 90 || rot === 270;
    return { w: swap ? bmp.height : bmp.width, h: swap ? bmp.width : bmp.height };
  }
  function bake(bmp, scale, alpha) {
    const d = dims(bmp);
    const c = D.createElement("canvas");
    c.width = Math.max(1, Math.round(d.w * scale));
    c.height = Math.max(1, Math.round(d.h * scale));
    const x = c.getContext("2d");
    if (!alpha) { x.fillStyle = "#fff"; x.fillRect(0, 0, c.width, c.height); }
    x.save();
    x.translate(c.width / 2, c.height / 2);
    x.rotate(rot * Math.PI / 180);
    x.scale(fh ? -1 : 1, fv ? -1 : 1);
    x.drawImage(bmp, -bmp.width * scale / 2, -bmp.height * scale / 2, bmp.width * scale, bmp.height * scale);
    x.restore();
    return c;
  }
  function label() {
    const parts = [];
    parts.push(rot ? (rot === 180 ? "180°" : rot === 90 ? "90° right" : "90° left") : "no rotation");
    if (fh && fv) parts.push("flipped both ways");
    else if (fh) parts.push("mirrored horizontally");
    else if (fv) parts.push("mirrored vertically");
    return parts.join(" · ");
  }
  function show() {
    if (state) state.textContent = (pvBmp ? "Preview: " : "Will apply: ") + label() + (pvBmp ? " → " + dims(pvBmp).w + "×" + dims(pvBmp).h + " px." : "");
    if (!pvBmp) return;
    const d = dims(pvBmp), s = Math.min(1, 600 / Math.max(d.w, d.h));
    const c = bake(pvBmp, s);
    pv.width = c.width; pv.height = c.height;
    pv.getContext("2d").drawImage(c, 0, 0);
  }
  function press(id, on) { const b = $(id); if (b) b.setAttribute("aria-pressed", String(!!on)); }

  T.on($("#l"), "click", () => { rot = (rot + 270) % 360; show(); });
  T.on($("#r"), "click", () => { rot = (rot + 90) % 360; show(); });
  T.on($("#u"), "click", () => { rot = (rot + 180) % 360; show(); });
  T.on($("#fh"), "click", () => { fh = !fh; press("#fh", fh); show(); });
  T.on($("#fv"), "click", () => { fv = !fv; press("#fv", fv); show(); });
  T.on($("#rz"), "click", () => { rot = 0; fh = fv = false; press("#fh", false); press("#fv", false); show(); });

  T.imageTool({
    acceptRe: /\.(jpe?g|png|webp|gif|bmp|jfif|heic|heif)$/i,
    typeRe: /^image\//,
    label: "an image (JPG, PNG, WebP, GIF, BMP or HEIC)",
    multiple: true,
    zipName: "rotated.zip",
    onFiles(files) {
      if (!files.length) { pvBmp = null; return; }
      T.decode(files[0]).then(b => { pvBmp = b; show(); }, e => { pvBmp = null; T.setErr(e.message || "Preview failed for that file."); });
    },
    readOpts() {
      return { type: $("#fmt").value, q: (+$("#q").value) / 100 };
    },
    async process(ctx) {
      const o = ctx.opts;
      if (!rot && !fh && !fv) T.status("Re-encoding " + ctx.base + " without a rotation note, so it looks upright everywhere…");
      const alpha = o.type === "image/png" || o.type === "image/webp";
      const c = bake(ctx.bmp, 1, alpha);
      const blob = await T.encode(c, o.type, alpha ? undefined : o.q);
      ctx.out([{
        name: ctx.base + "-rotated." + T.ext(o.type),
        blob: blob, type: o.type,
        note: c.width + "×" + c.height + " · " + label().replace("no rotation", "straight") + " · " + T.bytes(blob.size)
      }]);
      T.status(ctx.base + " → " + c.width + "×" + c.height + " (" + T.bytes(blob.size) + ").");
    }
  });
  show();
})();
