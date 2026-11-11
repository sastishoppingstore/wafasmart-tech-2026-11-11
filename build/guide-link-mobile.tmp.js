const { chromium } = require('playwright');
(async()=>{
 const b=await chromium.launch({headless:true});
 const routes=['uae-vat-calculator','pakistan-salary-tax-calculator','zakat-calculator','bmi-calculator','compress-image','image-size-adjuster','merge-pdf'];
 for(const w of [320,390]){
  for(const r of routes){
   const p=await b.newPage({viewport:{width:w,height:844}}); const errs=[]; p.on('pageerror',e=>errs.push(e.message)); p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
   await p.goto('http://127.0.0.1:4173/tools/'+r+'.html',{waitUntil:'load'}); await p.waitForTimeout(150);
   const x=await p.evaluate(()=>({ov:document.documentElement.scrollWidth-innerWidth,guide:document.querySelector('a[href^="/blog/"]')?.href||'',clipped:[...document.querySelectorAll('a.btn,button,input,select,textarea')].filter(e=>{const b=e.getBoundingClientRect();return b.width>0&&(b.right>innerWidth+2||b.left<-2)}).length}));
   if(x.ov>1||!x.guide||x.clipped||errs.length) console.log('BAD',w,r,x,errs);
   await p.close();
  }
 }
 console.log('guide-link mobile check done'); await b.close();
})();
