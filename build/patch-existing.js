#!/usr/bin/env node
"use strict";
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const APPLY = process.argv.includes("--apply");
const DATE = new Date().toISOString().slice(0,10);
const BACKUP = path.join(__dirname, "backups", `tools-patch-${DATE}`);

function ensure(d){ fs.mkdirSync(d,{recursive:true}); }
function read(f){ return fs.readFileSync(f,"utf8"); }
function write(f,c){ ensure(path.dirname(f)); fs.writeFileSync(f,c); }
function backup(f){ 
  const rel = path.relative(ROOT,f);
  const dest = path.join(BACKUP, rel);
  ensure(path.dirname(dest));
  if(!fs.existsSync(dest)) fs.copyFileSync(f,dest);
}
function diffLine(a,b){ console.log("--- DIFF ---"); console.log("BEFORE:", a.slice(0,80)); console.log("AFTER: ", b.slice(0,80)); console.log("------------"); }

const NAV_ANCHOR = '<li><a href="/contact.html"  data-i18n="nav.contact">Contact</a></li>';
const NAV_INSERT = '<li><a href="/tools/index.html" data-i18n="nav.tools">Free Tools</a></li>';
const FOOTER_ANCHOR = '<li><a href="/contact.html" data-i18n="nav.contact">Contact</a></li>';
const FOOTER_INSERT = '<li><a href="/tools/index.html">Free Tools</a></li>';

function addNav(h){
  if(h.includes('href="/tools')) return {h, changed:false};
  if(h.includes(NAV_ANCHOR)){
    const nh = h.replace(NAV_ANCHOR, NAV_INSERT + NAV_ANCHOR);
    return {h:nh, changed:h!==nh};
  }
  // try single space variant
  const alt = '<li><a href="/contact.html" data-i18n="nav.contact">Contact</a></li>';
  if(h.includes(alt)){
    const nh = h.replace(alt, '<li><a href="/tools/index.html" data-i18n="nav.tools">Free Tools</a></li>' + alt);
    return {h:nh, changed:h!==nh};
  }
  return {h, changed:false, err:'nav anchor missing'};
}

function addFooter(h){
  /* idempotent: never insert a second Free Tools entry into the Company list */
  if(/Company<\/h4>[\s\S]{0,900}?href="\/tools(\/index\.html)?"/.test(h)) return {h, changed:false};
  // look for footer company section
  const companyRe = /(<div><h4>Company<\/h4><ul>[\s\S]*?)(<li><a href="\/contact.html" data-i18n="nav.contact">Contact<\/a><\/li>)/;
  if(companyRe.test(h)){
    const nh = h.replace(companyRe, (m,p1,p2)=> p1 + FOOTER_INSERT + p2);
    return {h:nh, changed:h!==nh};
  }
  // try with more spaces
  const companyRe2 = /(<div><h4>Company<\/h4><ul>[\s\S]*?)(<li><a href="\/contact.html"[^>]*>Contact<\/a><\/li>)/;
  if(companyRe2.test(h) && !/Company[\s\S]*?\/tools\/index\.html/.test(h)){
    const nh = h.replace(companyRe2, (m,p1,p2)=> p1 + '<li><a href="/tools/index.html">Free Tools</a></li>' + p2);
    return {h:nh, changed:h!==nh};
  }
  return {h, changed:false};
}

function patchHtmlFiles(){
  const dirs = [path.join(ROOT,'dist'), path.join(ROOT,'dist','blog')];
  const files = [];
  for(const d of dirs){
    if(fs.existsSync(d)){
      for(const f of fs.readdirSync(d)){
        if(f.endsWith('.html')) files.push(path.join(d,f));
      }
    }
  }
  let changed=0, errors=[];
  for(const f of files){
    let h = read(f);
    const orig = h;
    if(h.includes('class="nav-links"') || h.includes('<nav')){
      const r1 = addNav(h);
      if(r1.err) errors.push(f+': '+r1.err);
      else h = r1.h;
    }
    const r2 = addFooter(h);
    h = r2.h;
    if(h !== orig){
      changed++;
      console.log('\n=== FILE:', path.relative(ROOT,f), '===');
      // simple diff summary
      if(APPLY){
        backup(f);
        write(f,h);
        console.log('APPLIED');
      }else{
        console.log('DRY-RUN: would modify');
      }
    }
  }
  console.log(`\nHTML files changed: ${changed}, errors: ${errors.length}`);
  if(errors.length) { errors.forEach(e=>console.log('ERR:',e)); }
}

function patchBuildJs(){
  const f = path.join(ROOT,'build','build.js');
  if(!fs.existsSync(f)) return;
  let h = read(f);
  const orig = h;
  // add to nav L array before contact
  const navOld = `  const L = [["home", "Home", "\u06c1\u0648\u0645", "/index.html"], ["services", "Services", "\u0633\u0631\u0648\u0633\u0632", "/services.html"], ["pricing", "Pricing", "\u0642\u06cc\u0645\u062a\u06cc\u06ba", "/pricing.html"], ["portfolio", "Portfolio", "\u0646\u0645\u0648\u0646\u06d2", "/portfolio.html"], ["about", "About", "\u06c1\u0645\u0627\u0631\u06d2 \u0628\u0627\u0631\u06d2 \u0645\u06cc\u06ba", "/about.html"], ["blog", "Blog", "\u0628\u0644\u0627\u06af", "/blog.html"], ["contact", "Contact", "\u0631\u0627\u0628\u0637\u06c1", "/contact.html"]];`;
  if(h.includes(navOld) && !h.includes('["tools"')){
    h = h.replace(navOld, navOld.replace('["contact", "Contact", "\u0631\u0627\u0628\u0637\u06c1", "/contact.html"]', '["tools", "Free Tools", "\u0641\u0631\u06cc \u0679\u0648\u0644\u0632", "/tools/index.html"], ["contact", "Contact", "\u0631\u0627\u0628\u0637\u06c1", "/contact.html"]'));
  }
  // footer
  const footOld = `    <li><a href="/about.html" data-i18n="nav.about">About</a></li><li><a href="/pricing.html" data-i18n="nav.pricing">Pricing</a></li><li><a href="/portfolio.html" data-i18n="nav.portfolio">Portfolio</a></li><li><a href="/blog.html" data-i18n="nav.blog">Blog</a></li><li><a href="/contact.html" data-i18n="nav.contact">Contact</a></li><li><a href="/admin.html">Admin panel</a></li></ul></div>`;
  if(h.includes(footOld) && !h.includes('>Free Tools</a>')){
    h = h.replace(footOld, `    <li><a href="/about.html" data-i18n="nav.about">About</a></li><li><a href="/pricing.html" data-i18n="nav.pricing">Pricing</a></li><li><a href="/portfolio.html" data-i18n="nav.portfolio">Portfolio</a></li><li><a href="/blog.html" data-i18n="nav.blog">Blog</a></li><li><a href="/tools/index.html">Free Tools</a></li><li><a href="/contact.html" data-i18n="nav.contact">Contact</a></li><li><a href="/admin.html">Admin panel</a></li></ul></div>`);
  }
  if(h!==orig){
    console.log('\n=== FILE: build/build.js ===');
    if(APPLY){ backup(f); write(f,h); console.log('APPLIED'); }
    else console.log('DRY-RUN: would modify');
  }
}

function patchI18n(){
  const files = [path.join(ROOT,'build/src/js/i18n.js'), path.join(ROOT,'dist/assets/js/i18n.js')];
  for(const f of files){
    if(!fs.existsSync(f)) continue;
    let h = read(f);
    const orig = h;
    if(!h.includes('"nav.tools"')){
      h = h.replace('"nav.contact": "\u0631\u0627\u0628\u0637\u06c1"', '"nav.tools": "\u0641\u0631\u06cc \u0679\u0648\u0644\u0632", "nav.contact": "\u0631\u0627\u0628\u0637\u06c1"');
    }
    if(h!==orig){
      console.log('\n=== FILE:', path.relative(ROOT,f), '===');
      if(APPLY){ backup(f); write(f,h); console.log('APPLIED'); }
      else console.log('DRY-RUN: would modify');
    }
  }
}

function patchSitemap(){
  const f = path.join(ROOT,'dist','sitemap.xml');
  if(!fs.existsSync(f)) return;
  let h = read(f);
  const orig = h;
  const toolsDir = path.join(ROOT,'dist','tools');
  const slugs = fs.readdirSync(toolsDir).filter(x=>x.endsWith('.html')).map(x=>x.replace('.html','')).sort();
  const block = loc => `  <url><loc>${loc}</loc><lastmod>2026-10-28</lastmod><xhtml:link rel="alternate" hreflang="en" href="${loc}"/><xhtml:link rel="alternate" hreflang="ur" href="${loc}"/><changefreq>monthly</changefreq><priority>0.8</priority></url>\n`;
  let entries = '';
  const hub = 'https://wafasmart.tech/tools';
  if(!h.includes('<loc>'+hub+'</loc>')) entries += `  <url><loc>${hub}</loc><lastmod>2026-10-28</lastmod><xhtml:link rel="alternate" hreflang="en" href="${hub}"/><xhtml:link rel="alternate" hreflang="ur" href="${hub}"/><changefreq>monthly</changefreq><priority>0.9</priority></url>\n`;
  let added = 0;
  for(const s of slugs){
    if(s==='index') continue;
    const loc = `https://wafasmart.tech/tools/${s}`;
    if(h.includes('<loc>'+loc+'</loc>')) continue;
    entries += block(loc); added++;
  }
  if(entries){
    h = h.replace('</urlset>', entries + '</urlset>');
    console.log('\n=== FILE: dist/sitemap.xml === (adding '+added+' tool urls + hub)');
    if(APPLY){ backup(f); write(f,h); console.log('APPLIED'); }
    else console.log('DRY-RUN: would modify');
  } else console.log('\nSitemap already complete for /tools');
}

function patchRobots(){
  const f = path.join(ROOT,'dist/robots.txt');
  if(!fs.existsSync(f)) return;
  let h = read(f);
  const orig = h;
  if(!h.includes('Allow: /tools/')){
    h = h.replace('Allow: /\n', 'Allow: /\nAllow: /tools/\n');
  }
  if(h!==orig){
    console.log('\n=== FILE: dist/robots.txt ===');
    if(APPLY){ backup(f); write(f,h); console.log('APPLIED'); }
    else console.log('DRY-RUN: would modify');
  }
}

function patchFirebase(){
  const f = path.join(ROOT,'firebase.json');
  if(!fs.existsSync(f)) return;
  let h = read(f);
  const orig = h;
  try {
    const j = JSON.parse(h);
    if(!j.hosting.rewrites) j.hosting.rewrites = [];
    if(!j.hosting.rewrites.find(r=>r.source==='/tools')){
      j.hosting.rewrites.push({"source":"/tools","destination":"/tools/index.html"});
      j.hosting.rewrites.push({"source":"/tools/:slug","destination":"/tools/:slug.html"});
    }
    // update html cache
    if(j.hosting.headers){
      for(const rule of j.hosting.headers){
        if(rule.source === '**/*.html'){
          rule.headers = rule.headers.map(x=> x.key==='Cache-Control' ? {key:'Cache-Control', value:'public, max-age=3600, must-revalidate'} : x);
        }
      }
      if(!j.hosting.headers.find(x=>x.source==='/tools/assets/**')){
        j.hosting.headers.push({"source":"/tools/assets/**","headers":[{"key":"Cache-Control","value":"public, max-age=31536000, immutable"}]});
      }
    }
    h = JSON.stringify(j, null, 2) + '\n';
  } catch(e){ console.error('firebase parse err',e.message); }
  if(h!==orig){
    console.log('\n=== FILE: firebase.json ===');
    if(APPLY){ backup(f); write(f,h); console.log('APPLIED'); }
    else console.log('DRY-RUN: would modify');
  }
}

console.log(APPLY ? '=== APPLYING PATCHES ===' : '=== DRY RUN (use --apply to write) ===');
console.log('BACKUP DIR:', BACKUP);
patchHtmlFiles();
patchBuildJs();
patchI18n();
patchSitemap();
patchRobots();
patchFirebase();
console.log('\n=== DONE ===');
