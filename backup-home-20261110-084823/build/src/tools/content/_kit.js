"use strict";
/* Reusable UI fragments for image tool pages. Kept in one place so every page
   ships the same accessible control shell (labels, live status, error, results). */
const DZ = (label, accept, multi = true) => `<section class="t-card">
  <div id="dz" class="dz" tabindex="0" role="button" data-accept-hint="${accept}" aria-label="${label} Drop files here or press Enter to choose.">
    <svg class="dz-ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 15v4a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-4M12 3v12m0-12 4 4m-4-4L8 7"/></svg>
    <b>${label}</b><span>Or click / Enter to pick${multi ? ". Multiple files welcome — each is processed in turn." : ". One file at a time."}</span>
    <input type="file" id="file" accept="${accept}"${multi ? " multiple" : ""} hidden>
  </div>
  <ul id="list" class="tiles" aria-label="Selected files"></ul>
  <p id="empty" class="hint">No file added yet.</p>
</section>`;

/* everything below the option fields: run button, progress, live status, download, results, error */
const RUN = (btn, zipName) => `<div class="acts"><button id="go" class="btn" type="button" disabled>${btn}</button><button id="clear" class="btn btn-ghost" type="button" disabled>Clear</button></div>
  <div class="prog" hidden><div id="bar" class="prog-i"></div></div>
  <p id="status" role="status" aria-live="polite" class="hint"></p>
  <a id="dl" class="btn btn-wa" href="#" hidden download="${zipName}">Download result</a>
  <button id="zip" class="btn btn-ghost" type="button" disabled hidden>Download all as ZIP</button>
  <div id="out" class="stack"></div>
  <p id="err" class="err" role="alert" hidden></p>`;

const FORM = (fields, btn, zipName, label = "Options") => `<section class="t-card opts" aria-label="${label}">
${fields}
${RUN(btn, zipName)}
</section>`;

module.exports = { DZ, RUN, FORM };
