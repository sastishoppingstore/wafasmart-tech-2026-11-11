const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const BASE = 'http://127.0.0.1:4173';
const data = [...require('./blog/data-uae.js'), ...require('./blog/data-pakistan.js'), ...require('./blog/data-hosting.js')];
const routes = ['/blog.html', ...data.map(a => '/blog/' + a.slug + '.html')];
(async()=>{
 const b = await chromium.launch({headless:true});
 let problems = [];
 for (const w of [320,360,390,768]) {
  for (const route of routes) {
   const p = await b.newPage({viewport:{width:w,height:844}});
   const errs=[]; p.on('pageerror',e=>errs.push('PAGE '+e.message)); p.on('console',m=>{if(m.type()==='error')errs.push('CONSOLE '+m.text())});
   const res = await p.goto(BASE+route,{waitUntil:'load'}); await p.waitForTimeout(100);
   const r = await p.evaluate(()=>({
     ov: document.documentElement.scrollWidth - innerWidth,
     h1: document.querySelectorAll('h1').length,
     title: document.title,
     canonical: document.querySelector('link[rel=canonical]')?.href,
     kw: document.querySelector('meta[name=keywords]')?.content || '',
     desc: document.querySelector('meta[name=description]')?.content || '',
     bodyLen: document.querySelector('.article-body')?.innerText.length || document.querySelector('main')?.innerText.length || 0,
     clipped: [...document.querySelectorAll('button,a.btn,input,select,textarea')].filter(e=>{const x=e.getBoundingClientRect();return x.width>0&&(x.right>innerWidth+2||x.left<-2)&&!e.closest('.tbl-wrap,.out-grid,.rev-track,.related-grid')}).slice(0,3).map(e=>e.id||e.textContent.trim().slice(0,20))
   }));
   if (!res || res.status()!==200 || r.ov>1 || r.h1!==1 || !r.canonical || !r.kw || !r.desc || r.clipped.length || errs.length) problems.push({w,route,status:res&&res.status(),...r,errs:errs.slice(0,2)});
   await p.close();
  }
 }
 console.log('pages',routes.length,'problems',problems.length); console.log(JSON.stringify(problems.slice(0,6),null,2));
 // link check on all new pages
 const hrefs = new Set();
 for (const a of data) {
  const s = fs.readFileSync(path.join('dist/blog',a.slug+'.html'),'utf8');
  for (const m of s.matchAll(/href="(\/[^"#?]+)(?:[?#][^"]*)?"/g)) hrefs.add(m[1]);
 }
 const bad=[];
 for (const href of [...hrefs].sort()) {
  const p = await b.newPage(); const r = await p.goto(BASE+href,{waitUntil:'domcontentloaded'}).catch(()=>null);
  if (!r || r.status()!==200) bad.push([href,r&&r.status()]);
  await p.close();
 }
 console.log('internal hrefs',hrefs.size,'bad',bad.length,JSON.stringify(bad.slice(0,10)));
 // blog index cards and schema
 const p = await b.newPage({viewport:{width:390,height:844}}); await p.goto(BASE+'/blog.html',{waitUntil:'load'});
 console.log('index',await p.evaluate(()=>({cards:document.querySelectorAll('.svc-card').length,links:[...document.querySelectorAll('.svc-card')].filter(a=>a.getAttribute('href')?.startsWith('/blog/')).length,h1:document.querySelector('h1')?.innerText,overflow:document.documentElement.scrollWidth-innerWidth})));
 await p.close(); await b.close();
})();
