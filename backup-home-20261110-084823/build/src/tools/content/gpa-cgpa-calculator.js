"use strict";
const H = require("./_helpers.js");
module.exports = {
  name: "GPA / CGPA Calculator",
  short: "Compute CGPA from credit-weighted grades on a 4.0 letter scale (A to F with +/-), or convert an average percentage to CGPA using Pakistan-university mapping tables.",
  title: "GPA CGPA Calculator — 4.0 Scale & Percent | Wafa Smart",
  desc: "Free GPA/CGPA calculator: add course rows on the 4.0 letter scale, get a credit-weighted CGPA, or convert percentage to CGPA with a Pakistan mapping table.",
  h1: "GPA / CGPA Calculator — credit-weighted and percentage modes",
  kw: ["cgpa calculator", "gpa calculator 4.0 scale", "percentage to cgpa", "credit weighted gpa", "pakistani university cgpa", "grade point average calculator"],
  intro: [
    "A CGPA is not the plain average of your grades — it is weighted by how many credit hours each course carries, so a four-credit core subject moves the number far more than a one-credit lab. This calculator does the weighting correctly: add one row per course, type its credit hours and pick the letter grade, and it multiplies credits by grade points, sums them and divides by total credits to give the true term or cumulative GPA on a 4.0 scale.",
    "The 4.0 letter scale here supports the full A-to-F range with the usual plus and minus variants (A = 4.0, A− = 3.7, B+ = 3.3 and so on down to F = 0), because many Pakistani and international transcript systems use those intermediate points. Rows are added and removed freely, so you can paste an entire semester's worth of subjects and edit any one of them, and the CGPA recomputes on every change.",
    "If instead you only have an average percentage and your university quotes results as CGPA, the second mode converts using a band mapping table. Pakistani institutions do not share one universal conversion, so a scheme can be selected and the exact percentage-to-grade-point table is always shown, letting you confirm — or contest — the number rather than blindly trusting it."
  ],
  steps: [
    "Choose the 'Grades' mode to build a transcript, or the 'Percentage' mode to convert marks.",
    "In Grades mode, enter each course name and its credit hours, then select the letter grade.",
    "Press 'Add course' for every further subject; remove mistakes with the ✕ button.",
    "In Percentage mode, type the average percent and pick a mapping scheme to see the conversion table.",
    "Read the credit-weighted CGPA (or converted CGPA) in the result, then Reset to start fresh."
  ],
  ur: "Grades mode me har course ka naam, credit hours aur letter grade likhein — credit-weighted CGPA fauran ban jayega. Percentage mode me apna average % likh kar scheme chunein, aur Pakistan-style mapping table dekh kar CGPA convert karein. 'Add course' se rows badhayein, ✕ se hatayein.",
  features: [
    "Credit-weighted CGPA (not a naive average) on the 4.0 scale",
    "Add / remove unlimited course rows, recomputed live",
    "Full A / A− / B+ / … / F letter grades with minus and plus points",
    "Percentage → CGPA conversion for Pakistani university bands",
    "The chosen grade-point mapping table is always visible",
    "Empty rows are ignored so a half-filled transcript still totals"
  ],
  tips: [
    "Match the grade list to your transcript exactly — some universities collapse A− into A, which shifts CGPA.",
    "Re-check credit hours first; a wrong credit count is the most common cause of an off CGPA.",
    "For percentage conversion, use the table your own institution publishes, not a generic one.",
    "Compute each semester separately then weight by credits if you need an all-time CGPA.",
    "A single F drags CGPA hard because it adds credits with zero points — worth noting before electives."
  ],
  faqs: [
    { q: "How is CGPA different from a percentage?", a: "CGPA averages grade points weighted by credit hours, then sits on a 4-point scale. Percentage is the raw marks average. The conversion between them is set by each university, which is why this tool shows the mapping it used." },
    { q: "What grade points are used?", a: "A = 4.0, A− = 3.7, B+ = 3.3, B = 3.0, B− = 2.7, C+ = 2.3, C = 2.0, C− = 1.7, D+ = 1.3, D = 1.0 and F = 0.0 — the common 4.0-scale ladder with plus and minus steps." },
    { q: "Why do percentage-to-CGPA numbers vary between universities?", a: "There is no single national conversion in Pakistan; each institution publishes its own bands. Pick the scheme that matches your transcript and always read the displayed table before relying on the figure." },
    H.faqFree("GPA / CGPA Calculator"),
    { q: "Can I leave a course row blank?", a: "Yes — rows without a credit value or grade are skipped in the total, so an unfinished transcript still shows a running CGPA." },
    H.faqMobile("GPA / CGPA Calculator")
  ],
  related: [["percentage-calculator", "Percentage maths"], ["pakistan-salary-tax-calculator", "Salary tax"], ["emi-loan-calculator", "Loan EMI"], ["age-calculator", "Age calculator"]],
  ui: `<section class="t-card opts" aria-label="GPA and CGPA calculator">
  <div class="segs" role="group" aria-label="Mode">
    <button type="button" class="seg" data-mode="grades" aria-pressed="true">Grades (4.0 scale)</button>
    <button type="button" class="seg" data-mode="percent" aria-pressed="false">Percentage → CGPA</button>
  </div>
  <div id="gradesWrap" class="stack">
    <div class="row-item" aria-hidden="true"><b>Course</b><b>Credits</b><b>Grade</b><span></span></div>
    <div id="rows" class="rows"></div>
  </div>
  <div id="percentWrap" class="stack" hidden>
    <div class="fld"><label for="pct">Average percentage (%)</label><input type="number" id="pct" inputmode="decimal" min="0" max="100" step="any" placeholder="e.g. 78.5"></div>
    <div class="fld"><label for="scheme">Mapping scheme</label><select id="scheme"><option value="pk" selected>Pakistan university bands</option><option value="lin">Linear (100% = 4.0)</option></select></div>
    <div id="maptbl"></div>
  </div>
  <div class="acts"><button id="go" class="btn" type="button">Calculate</button><button id="add" class="btn btn-ghost" type="button">+ Add course</button><button id="rst" class="btn btn-ghost" type="button">Reset</button></div>
  <p id="status" role="status" aria-live="polite" class="hint"></p>
  <p id="err" class="err" role="alert" hidden></p>
  <div id="out"></div>
</section>`
};
