(function(){
  "use strict";
  const $ = s => document.querySelector(s);
  const money = (n, cur) => cur + " " + Math.round(n).toLocaleString("en-US");

  $('#gok').onclick = () => {
    const cur = ($('#kc') && $('#kc').value) || "PKR";
    const inc = (+$('#ki1').value || 0) + (+$('#ki2').value || 0) + (+$('#ki3').value || 0);
    const exp = (+$('#ke1').value || 0) + (+$('#ke2').value || 0);
    const sur = Math.max(0, inc - exp);
    const kh = sur * 0.2;

    $('#rk').style.display = 'block';
    const start = $('#kys') && $('#kys').value;
    const period = $('#kperiod');
    if (period) period.textContent = start
      ? 'Khums year start: ' + new Date(start + 'T00:00:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) + '.'
      : 'Tip: add your Khums year start (ras-ul-sal) date for your records.';
    $('#ksur').textContent = money(sur, cur);
    $('#kk').textContent = money(kh, cur);
    $('#ksi').textContent = money(kh / 2, cur);
    $('#kss').textContent = money(kh / 2, cur);
    if (inc <= exp) {
      $('#rk').insertAdjacentHTML('beforeend', '<p class="disc" id="knote">No surplus after expenses — Khums is not due on this calculation.</p>');
    } else {
      const old = $('#knote'); if (old) old.remove();
    }
  };
})();
