(function(){
  "use strict";
  const $ = s => document.querySelector(s);
  const money = (n, cur) => cur + " " + Math.round(n).toLocaleString("en-US");

  $('#goz').onclick = () => {
    const cur = ($('#zc') && $('#zc').value) || "PKR";
    const goldP = +$('#zg').value, silverP = +$('#zs').value;
    if (!(goldP > 0) || !(silverP > 0)) {
      $('#zmsg').textContent = "Enter today's gold and silver price per tola (greater than 0).";
      $('#rz').style.display = 'block';
      return;
    }
    const includeJewellery = !$('#zj') || $('#zj').checked;
    const goldN = goldP * 7.5, silverN = silverP * 52.5;
    const nisab = $('#znis').value === 'gold' ? goldN : silverN;

    const goldValue = includeJewellery ? (+$('#za2').value || 0) * (goldP / 11.664) : 0;
    const silverValue = includeJewellery ? (+$('#za3').value || 0) * (silverP / 11.664) : 0;
    const assets = (+$('#za1').value || 0) + goldValue + silverValue +
      (+$('#za4').value || 0) + (+$('#za5').value || 0) + (+$('#za6').value || 0) + (+$('#za7').value || 0);
    const net = Math.max(0, assets - (+$('#zd1').value || 0));
    const zakat = net >= nisab ? net * 0.025 : 0;

    $('#rz').style.display = 'block';
    $('#znisv').textContent = money(nisab, cur);
    $('#znet').textContent = money(net, cur);
    $('#zz').textContent = money(zakat, cur);
    $('#zmsg').textContent = net >= nisab
      ? (includeJewellery
          ? "Wealth is above nisab — Zakat due (2.5%). Gold and silver values are included."
          : "Wealth is above nisab — Zakat due (2.5%). Personal-use jewellery was excluded; include it if your school requires it.")
      : "Below nisab — no Zakat due by this calculation. Nisab is " + money(nisab, cur) + ".";
  };
})();
