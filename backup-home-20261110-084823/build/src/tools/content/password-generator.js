"use strict";
const H = require("./_helpers.js");
module.exports = {
  name: "Password Generator",
  short: "Create strong random passwords with crypto-grade randomness, tunable length, character sets, batch count and a live entropy meter.",
  title: "Password Generator — Strong Random + Entropy | Wafa Smart",
  desc: "Generate strong passwords with crypto.getRandomValues: pick length, letters, digits, symbols and batch size, with a live entropy strength meter.",
  h1: "Password Generator — random, strong and never sent anywhere",
  kw: ["password generator", "strong random password", "secure password maker", "random password online", "password entropy meter", "bulk password generator"],
  intro: [
    "A good password is not clever, it is random: long enough, drawn from a wide character set, and impossible to guess or reuse. This generator builds passwords using the browser's cryptographic random source (crypto.getRandomValues), which is the same strength of randomness an operating system uses for keys — never the predictable pseudo-random Math.random that a lot of online 'generators' quietly rely on.",
    "You decide the recipe. Set a length anywhere from 6 to 64, tick which character groups to include — lowercase, uppercase, digits and symbols — exclude the look-alike characters (l, 1, I, O, 0) that make passwords painful to type, and switch on 'no two identical characters in a row' so the result is easier to read aloud or hand to someone. A live entropy meter converts those choices into bits and a plain-language label so you know whether a password is weak, fair or strong.",
    "Need a batch? Generate up to fifty at once for a family, a team or a set of test accounts. And because the page is a static file with no backend, there is nowhere for your passwords to go: they are created in memory inside your browser tab, never stored, never logged and never sent over a network. Close the tab and they are gone."
  ],
  steps: [
    "Set the password length — 16 characters is a good default for modern accounts.",
    "Tick the character groups you want: lowercase, uppercase, digits and/or symbols.",
    "Optionally exclude look-alike characters and forbid two identical characters in a row.",
    "Set how many passwords to make (up to 50) and press 'Generate'.",
    "Copy the one you like — the entropy meter tells you how strong each result is."
  ],
  ur: "Password ki lambai set karein (16 behtareen), jis character group me chaho wo tick karein — chhote, baray, numbers, symbols. Chahein to milte-julte alfaz (l,1,I,O,0) nikal dein aur 'no repeat' on karein. Ginti set karke 'Generate' dabayein — crypto source se strong password bante hain aur entropy meter unki taqat batata hai. Kahin bheje nahi jaate.",
  features: [
    "True randomness from crypto.getRandomValues, never Math.random",
    "Length 6–64 with toggles for lowercase, uppercase, digits and symbols",
    "Exclude-ambiguous option to drop confusing l/1/I/O/0 characters",
    "'No two identical characters in a row' for readable, shareable passwords",
    "Batch mode — generate up to 50 passwords in one click",
    "Live entropy meter (length × log2 pool) with a plain-language strength label"
  ],
  tips: [
    "Length beats complexity: a 20-character password is far stronger than an 8-character one with more symbols.",
    "Use a password manager to store results — the strength of a generator is wasted if you reuse the password.",
    "Turn on 'no two identical in a row' when a password must be typed on a phone or read to someone over the phone.",
    "Keep ambiguous-character exclusion on for accounts you log into manually; turn it off for machine-only secrets.",
    "Generate a fresh batch rather than tweaking an old one — never reuse a password you displayed here."
  ],
  faqs: [
    { q: "Are my generated passwords stored or sent anywhere?", a: "No. The page is a static file with no server, no database and no analytics call for results — passwords are assembled in your browser's memory and vanish when you close the tab. Nothing is transmitted." },
    { q: "Why crypto.getRandomValues instead of Math.random?", a: "Math.random is not designed to be unpredictable and can be reproduced from earlier output, so a password built from it can be guessed. crypto.getRandomValues draws from your device's cryptographic entropy source, which is what you want for a secret." },
    { q: "What do the entropy bits mean?", a: "Entropy is length × log2(pool size): the practical work a guesser needs. Under 60 bits is crackable by offline attacks, 60–80 bits is solid for everyday accounts, and above 80 bits is very strong." },
    { q: "Can I make passphrases instead?", a: "This tool makes character-random passwords. For a memorable passphrase use a long length (24+) with lowercase and spaces only — the entropy meter still reflects the real strength." },
    { q: "Does excluding repeated characters weaken it?", a: "Slightly, by trimming a few candidates, but it makes the password far easier to type and read. For a 16-character secret the strength loss is negligible." },
    H.faqPrivacy("Password Generator", "password")
  ],
  related: [["qr-code-generator", "Encode a link to share"], ["json-formatter", "Toolbox"], ["lorem-ipsum-generator", "Sample strings"], ["unit-converter", "More utilities"]],
  ui: `<section class="t-card opts" aria-label="Password options">
  <div class="fld"><label for="len">Length (6–64)</label><input type="number" id="len" min="6" max="64" value="16"></div>
  <div class="fld"><label for="cnt">How many (1–50)</label><input type="number" id="cnt" min="1" max="50" value="5"></div>
  <div class="fld"><label for="lower">Lowercase a–z</label><select id="lower"><option value="y" selected>Include</option><option value="n">Off</option></select></div>
  <div class="fld"><label for="upper">Uppercase A–Z</label><select id="upper"><option value="y" selected>Include</option><option value="n">Off</option></select></div>
  <div class="fld"><label for="digit">Digits 0–9</label><select id="digit"><option value="y" selected>Include</option><option value="n">Off</option></select></div>
  <div class="fld"><label for="sym">Symbols !@#$…</label><select id="sym"><option value="y" selected>Include</option><option value="n">Off</option></select></div>
  <div class="fld"><label for="ambig">Exclude look-alikes (l 1 I O 0)</label><select id="ambig"><option value="n" selected>Keep all</option><option value="y">Exclude</option></select></div>
  <div class="fld"><label for="norep">No two identical in a row</label><select id="norep"><option value="n" selected>Allow repeats</option><option value="y">Forbid repeats</option></select></div>
  <div class="acts">
    <button id="go" class="btn" type="button">Generate</button>
    <button id="copy" class="btn btn-ghost" type="button" disabled>Copy all</button>
    <button id="rst" class="btn btn-ghost" type="button">Reset</button>
  </div>
  <p id="status" role="status" aria-live="polite" class="hint"></p>
  <p id="err" class="err" role="alert" hidden></p>
  <div id="out"></div>
</section>`
};
