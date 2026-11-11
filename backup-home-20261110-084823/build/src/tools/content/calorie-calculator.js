"use strict";
const H = require("./_helpers.js");
module.exports = {
  name: "Calorie Calculator",
  short: "Estimate daily calories with the Mifflin-St Jeor BMR formula, a five-step activity factor and a goal adjustment — plus a simple macro split.",
  title: "Calorie Calculator — BMR & TDEE Daily Needs | Wafa Smart",
  desc: "Free calorie calculator using Mifflin-St Jeor BMR, activity multiplier and goal. Get maintenance, target kcal and a macro split. Private, in your browser.",
  h1: "Calorie Calculator — your BMR, TDEE and daily target",
  kw: ["calorie calculator", "tdee calculator", "bmr mifflin st jeor", "daily calorie needs", "calories to lose weight", "macro split calculator"],
  intro: [
    "Your body burns calories just to stay alive — breathing, circulating blood, keeping your brain running — and that baseline is the Basal Metabolic Rate, or BMR. This calculator derives BMR with the Mifflin-St Jeor equation, the formula most dietitians still prefer because it beats older ones on average adults. It needs four honest inputs: sex, age, height and weight. Change any one and the answer recomputes immediately.",
    "BMR alone is not what you eat, because you also move. Multiplying BMR by an activity factor gives Total Daily Energy Expenditure, or TDEE — the calories that keep your weight exactly where it is. Five tiers are offered, from a desk-bound 1.2 up to an athlete's 1.9. Pick the one that describes a normal week, not your single most active day, or the number runs high.",
    "Finally you choose a goal: lose, maintain or gain. Weight loss and gain use the well-known roughly-7,700-calories-per-kilo logic, applied here as a safe percentage of TDEE rather than an extreme fixed deficit. The result block shows BMR, TDEE, your target calories and a beginner-friendly protein-carb-fat split in grams, so you leave with numbers you can actually plan meals around."
  ],
  steps: [
    "Select sex and enter age, height in centimetres and weight in kilograms.",
    "Choose the activity level that matches a typical week, from sedentary to very active.",
    "Set a goal — lose, maintain or gain weight.",
    "Press Calculate to see BMR, TDEE, target calories and the macro gram split.",
    "Revisit the activity level every few weeks as your routine changes."
  ],
  ur: "Apna sex, umar, qad aur wazan likhein, phir activity level aur goal (lose/maintain/gain) chunein. 'Calculate' dabane par BMR, TDEE, target calories aur protein-carb-fat ka gram split mil jayega. Sab hisaab aapke browser me hota hai.",
  features: [
    "Mifflin-St Jeor BMR, the standard clinical equation",
    "Five-tier activity multiplier to reach realistic TDEE",
    "Goal adjustment for fat loss, maintenance or lean gain",
    "Protein / carbohydrate / fat grams shown for your target",
    "Live recompute — edit an input and results refresh",
    "No login and no stored history; numbers stay on your device"
  ],
  tips: [
    "Weigh yourself weekly and update the weight field — a stale input is the usual reason targets feel wrong.",
    "Choose the honest activity tier: if you train hard but sit all day, 'moderate' is usually right, not 'active'.",
    "Losing more than about 1% of body weight a week is aggressive; the deficit here is deliberately gentle.",
    "Treat the macro split as a starting template, then shift protein up if you are resistance-training.",
    "Very low calorie targets are a signal the inputs are off — recalculate before committing to a plan."
  ],
  faqs: [
    { q: "Which formula does this use?", a: "Mifflin-St Jeor: for men BMR = 10×kg + 6.25×cm − 5×age + 5, and for women the same with −161 instead of +5. It is the current first-line choice over the older Harris-Benedict equation." },
    { q: "What is the difference between BMR and TDEE?", a: "BMR is the energy your body uses at complete rest. TDEE multiplies BMR by your activity level and adds movement, so it is the true maintenance calorie figure." },
    { q: "How accurate is the macro split?", a: "It is a simple default ratio (roughly 30% protein, 40% carbs, 30% fat) meant to give a starting point, not a medically prescribed diet. Adjust ratios to your preferences and goals." },
    H.faqFree("Calorie Calculator"),
    { q: "Does it account for muscle mass?", a: "No formula that uses only height, weight, age and sex can distinguish muscle from fat. Very muscular people should read the BMR as an under-estimate." },
    H.faqPrivacy("Calorie Calculator", "body measurements")
  ],
  related: [["bmi-calculator", "Check your BMI"], ["ideal-weight-calculator", "Ideal weight range"], ["water-intake-calculator", "Daily water target"], ["percentage-calculator", "Work out percentage change"]],
  ui: `<section class="t-card opts" aria-label="Calorie calculator inputs">
  <div class="fld"><label for="sex">Sex</label><select id="sex"><option value="m">Male</option><option value="f">Female</option></select></div>
  <div class="fld"><label for="age">Age (years)</label><input type="number" id="age" inputmode="numeric" min="10" max="120" step="1" placeholder="e.g. 30"></div>
  <div class="fld"><label for="hgt">Height (cm)</label><input type="number" id="hgt" inputmode="decimal" min="90" max="250" step="0.1" placeholder="e.g. 172"></div>
  <div class="fld"><label for="wgt">Weight (kg)</label><input type="number" id="wgt" inputmode="decimal" min="25" max="350" step="0.1" placeholder="e.g. 70"></div>
  <div class="fld"><label for="act">Activity level</label><select id="act"><option value="1.2">Sedentary (little exercise)</option><option value="1.375">Light (1–3 days/week)</option><option value="1.55" selected>Moderate (3–5 days/week)</option><option value="1.725">Active (6–7 days/week)</option><option value="1.9">Very active (athlete / physical job)</option></select></div>
  <div class="fld"><label for="goal">Goal</label><select id="goal"><option value="lose">Lose fat</option><option value="keep" selected>Maintain</option><option value="gain">Gain weight</option></select></div>
  <div class="acts"><button id="go" class="btn" type="button">Calculate</button><button id="rst" class="btn btn-ghost" type="button">Reset</button></div>
  <p id="status" role="status" aria-live="polite" class="hint"></p>
  <p id="err" class="err" role="alert" hidden></p>
  <div id="out"></div>
  <span class="disc">For information only, not medical advice.</span>
</section>`
};
