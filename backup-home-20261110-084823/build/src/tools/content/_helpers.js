"use strict";
/* Shared builders for /tools page content. Boilerplate answers are parameterised per tool so no
   two pages share a verbatim paragraph (brief: no copy-pasted paragraphs between pages). */
const B = require("../tools.config.js").BRAND;

function faqFree(name, extra) { return { q: "Is the " + name.toLowerCase() + " free to use?", a: "Yes — " + name + " has no usage cap, no sign-up and no watermark, and it is not a trial: the page is a static file on " + B.url + " with no billing backend behind it. " + (extra || "") }; }
function faqPrivacy(name, kind) { return { q: "Does anything get uploaded when I use " + name.toLowerCase() + "?", a: "No. " + name + " reads your " + kind + " straight into page memory, works on it locally and hands the result back as a download — there is no upload request to intercept, store or leak, and no log of what you processed." }; }
function faqMobile(name, hint) { return { q: "Can I use it on my phone?", a: "Yes. " + name + " is mobile-first: one column, big tap targets, and the system keyboard opens with sensible number/text input. On iPhone, Files and the share sheet feed the picker the same way Downloads does on Android. " + (hint || "") }; }
function faqOffline(name) { return { q: "Why does " + name.toLowerCase() + " pause before the first result?", a: name + " keeps the page HTML tiny on purpose, so the heavy engines — the PDF writer, HEIC decoder or ZIP packer — stream from a pinned CDN with an integrity hash the moment you press its action button. Your browser caches them, so later runs inside the same session start immediately." }; }
function faqSafe(name, kind) { return { q: "Should I process sensitive " + kind + " here?", a: "Because nothing leaves the tab, " + name + " is a reasonable choice for CNICs, payslips and bank statements. Two habits add safety: close the tab afterwards so page memory is released, and keep the original file — editing produces a new document rather than modifying the one you own." }; }

module.exports = { B, faqFree, faqPrivacy, faqMobile, faqOffline, faqSafe };
