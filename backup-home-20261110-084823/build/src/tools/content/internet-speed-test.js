"use strict";
const H = require("./_helpers.js");
module.exports = {
  name: "Internet Speed Test",
  short: "Measure real ping, jitter, download and upload speed with a live gauge — auto-starts, no app install, no account.",
  title: "Internet Speed Test — Ping, Download, Upload | Wafa Smart",
  desc: "Free internet speed test: live download and upload Mbps, ping and jitter on a colour meter, plus your IP, provider and city. Auto-starts, works on mobile.",
  h1: "Internet Speed Test — ping, download and upload, measured live",
  libs: [],
  kw: ["internet speed test", "speed test online", "wifi speed test", "broadband speed test", "ping jitter test", "mbps test"],
  intro: [
    "This page measures the connection your browser is using right now. It opens several parallel streams against Cloudflare's public test servers, counts the bytes that actually land, and divides by real elapsed milliseconds. Nothing on the dial is estimated or pre-written.",
    "Four stages run in order: ping and jitter from ten tiny round trips, then download across three to six streams sampled four times a second, then upload read from the browser's own upload-progress events, then a plain-English verdict on what the number is good enough for.",
    "The test starts on its own a third of a second after the page opens. If your browser has data-saver switched on it waits for your press instead, because a full run moves real megabytes. Pick Quick, Standard or Precise to set that budget.",
    "Below the meter you get the IP address the test server answered, plus the city, area, country and provider resolved from it — the same way every online speed test labels your line.",
    "Every figure is computed on your device. Nothing is stored, no result is posted anywhere, and the browser's own location permission is never touched."
  ],
  steps: [
    "Open the page — the test starts on its own after a moment.",
    "Watch the coloured meter during the download stage; the needle is showing live throughput, not a final guess.",
    "Read the five result boxes: download, upload, ping, best ms and jitter.",
    "Check the connection panel below for your IP, provider, city and area, and where the marker sits on the grid.",
    "Press Test again for a second sample, or Stop to end a run early — Wi-Fi swings, so keep the better number."
  ],
  ur: "Page kholte hi test khud shuru hota hai — rangeen meter par live download speed nazar aati hai. Khatam hone par download, upload, ping, best ms aur jitter box me aa jate hain; neeche IP, provider, city aur area bhi show hota hai. “Test again” se dobara check karein. Data-saver mode me auto-start ruk jata hai, khud button dabayein. Numbers sirf aapke device par bante hain — kuch save ya kahin bheja nahi jata.",
  features: [
    "Auto-starts on load and re-runs from one button",
    "Colour-ramped log meter that re-ranges itself up to 500 Mbps",
    "Ping, minimum, average and jitter — not just a single latency number",
    "Upload measured from real upload-progress events, not a round trip",
    "IP, provider, city, area, country and ASN panel with a location grid",
    "Three data budgets, from a few MB to a full-length precise run"
  ],
  tips: [
    "Close streaming, downloads and cloud sync first — they are the usual reason a result looks half what you pay for.",
    "Test on the same band you use: 2.4 GHz Wi-Fi through a wall is not your fibre line's real speed.",
    "A VPN reroutes you through another server and inflates ping; turn it off to measure the bare connection.",
    "Mobile data results swing by 50% between one minute and the next — take three samples.",
    "If the dial sits at zero with a red error, your network is blocking the test endpoints (common on school and office proxies) — the page then falls back to jsDelivr test files for download and says so under the results.",
    "If the city looks wrong, your ISP routes traffic through another hub — IP geolocation names the exit city, not your room."
  ],
  faqs: [
    H.faqFree("speed test", "There is no “premium” dial — the same measurement runs for everybody."),
    { q: "Why does the page show my IP address and city?", a: "The IP is taken from the reply header of the test server, which already sees it for every request you make to any website; the city, area and provider come from one public IP-geolocation lookup of that address, the same labelling every online speed test uses. Nothing is written down, sent to this site, or cross-matched with anything else — turn the panel off in your browser by blocking that one lookup request if you would rather it stayed blank." },
    { q: "Does the speed test upload any of my files?", a: "No. Upload testing sends a block of random bytes generated in memory, never a file from your device, and the receiving endpoint is Cloudflare's public test collector." },
    { q: "Why is my download number lower than my advertised plan?", a: "Wi-Fi contention, one busy background app, a VPN, or a single-stream server can each cost you 20–60%. This test uses several parallel streams, which is closer to your line's real ceiling than a single-stream test." },
    { q: "What is jitter and why should I care?", a: "Jitter is the variation between successive pings. A 30 ms ping with 2 ms jitter feels smoother on a call than a 15 ms ping with 40 ms jitter — games and video calls care about jitter more than raw latency." },
    { q: "Why did the test not start by itself?", a: "Either your browser's data-saver mode is on (the page deliberately waits for a click then), or the network blocked the first request. Press the button to retry." },
    { q: "Can I trust these numbers over speedtest.net?", a: "They are measured the same way — parallel streams, byte counting, wall-clock timing — against a different server set, so small differences are normal. Two consecutive runs from one tool tell you more than one run from any tool." },
    H.faqMobile("Internet Speed Test", " The meter is drawn in SVG, so it fills a phone screen cleanly and works on mobile data.")
  ],
  related: [["unit-converter", "Convert Mbps to MB/s"], ["compress-image", "Share photos faster"], ["image-resizer", "Smaller uploads"], ["qr-code-generator", "Test another tool"]],
  ui: `<div class="t3d-persp">
<section class="t-card st-panel st-meter" data-tone="0" aria-label="Speed test">
  <h2 class="st-h"><span class="st-ic" aria-hidden="true"></span>Live meter</h2>
  <div class="st-gauge">
    <svg id="gauge" viewBox="0 0 280 152" role="img" aria-label="Live speed meter">
      <defs>
        <linearGradient id="g-ramp" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stop-color="#ff4d5e"/><stop offset=".28" stop-color="#ff8a3d"/>
          <stop offset=".55" stop-color="#ffd23d"/><stop offset=".8" stop-color="#7ce66b"/>
          <stop offset="1" stop-color="#22d3ee"/>
        </linearGradient>
      </defs>
      <path class="g-track" d="M40 140 A 100 100 0 0 1 240 140"/>
      <path id="g-arc" class="g-arc" stroke="url(#g-ramp)" d="M40 140 A 100 100 0 0 1 240 140"/>
      <g id="g-ticks" class="g-ticks" aria-hidden="true"></g>
      <g id="needle" class="g-needle"><line x1="140" y1="140" x2="140" y2="62"/><circle cx="140" cy="140" r="6"/></g>
    </svg>
    <div class="gauge-val"><b id="mbps">—</b><small id="unit">Mbps</small></div>
  </div>
  <p id="phase" class="hint" role="status" aria-live="polite">Preparing test…</p>
  <div class="prog" hidden><div id="bar" class="prog-i"></div></div>
  <div class="acts">
    <button id="go" class="btn" type="button">Start speed test</button>
    <button id="stop" class="btn btn-ghost" type="button" hidden>Stop</button>
  </div>
  <div class="fld"><label for="profile">How much data the test may use</label><select id="profile">
    <option value="quick" selected>Quick — up to about 12 MB</option>
    <option value="standard">Standard — up to about 35 MB</option>
    <option value="precise">Precise — up to about 80 MB, steadiest on fast lines</option>
  </select></div>
  <p id="err" class="err" role="alert" hidden></p>
</section>
<section class="t-card st-panel" aria-label="Results">
  <h2 class="st-h"><span class="st-ic ic-b" aria-hidden="true"></span>Results</h2>
  <div class="stat-row">
    <div class="stat st-down"><b id="down">—</b><small>download Mbps</small></div>
    <div class="stat st-up"><b id="up">—</b><small>upload Mbps</small></div>
    <div class="stat st-ping"><b id="ping">—</b><small>ping ms (avg)</small></div>
    <div class="stat st-min"><b id="min">—</b><small>best ms</small></div>
    <div class="stat st-jit"><b id="jitter">—</b><small>jitter ms</small></div>
  </div>
  <p id="rating" class="res" hidden></p>
  <p id="engine" class="hint"></p>
  <p class="disc">Figures measure the connection your browser is using right now. They are not a substitute for an official line test from your ISP.</p>
</section>
<section class="t-card st-panel" aria-label="Connection details">
  <h2 class="st-h"><span class="st-ic ic-c" aria-hidden="true"></span>Connection details</h2>
  <div class="st-grid">
    <div class="st-cell"><small>IP address</small><b id="ip">—</b></div>
    <div class="st-cell"><small>Provider / ISP</small><b id="isp">—</b></div>
    <div class="st-cell"><small>City</small><b id="city">—</b></div>
    <div class="st-cell"><small>Area / region</small><b id="region">—</b></div>
    <div class="st-cell"><small>Country</small><b id="country">—</b></div>
    <div class="st-cell"><small>Network (ASN)</small><b id="asn">—</b></div>
  </div>
  <div class="st-map">
    <svg id="gmap" viewBox="0 0 360 180" role="img" aria-label="Approximate position on a world grid">
      <g id="g-grat" class="g-grat" aria-hidden="true"></g>
      <g id="g-mark" class="g-mark" hidden><line x1="0" y1="-14" x2="0" y2="0"/><circle cx="0" cy="0" r="5.5"/><circle class="g-halo" cx="0" cy="0" r="12"/></g>
    </svg>
    <p id="coords" class="hint">Locating from your IP address…</p>
  </div>
  <p class="disc st-fine">The IP line is the address the test server answered, read straight from its reply. City, area, country and provider come from one public IP-geolocation lookup, which is city-accurate at best — it never sees your street, and the browser's own location permission is never used. No map tile service is loaded, nothing is stored and no result is sent anywhere.</p>
</section>
</div>`
};
