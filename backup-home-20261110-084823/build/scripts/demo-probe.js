const {chromium}=require('playwright');
const http=require('http'), fs=require('fs'), path=require('path');
const ROOT=path.join(process.cwd(),'dist');
const MIME={'.html':'text/html','.js':'text/javascript','.css':'text/css','.webp':'image/webp','.jpg':'image/jpeg','.png':'image/png','.json':'application/json','.svg':'image/svg+xml','.woff2':'font/woff2'};
(async()=>{
const srv=http.createServer((q,r)=>{const p=path.join(ROOT,decodeURIComponent(q.url.split('?')[0]));
  const f=fs.existsSync(p)&&fs.statSync(p).isDirectory()?path.join(p,'index.html'):p;
  if(!fs.existsSync(f)){r.writeHead(404);return r.end('x');}
  r.writeHead(200,{'content-type':MIME[path.extname(f)]||'application/octet-stream'});fs.createReadStream(f).pipe(r);});
await new Promise(s=>srv.listen(8207,'127.0.0.1',s));
const b=await chromium.launch();
for(const pg of ['demo1','demo3']){
  const c=await b.newContext({viewport:{width:1440,height:900}});
  const x=await c.newPage(); const errs=[],fails=[];
  x.on('console',m=>m.type()==='error'&&errs.push(m.text().slice(0,120)));
  x.on('requestfailed',r=>fails.push(r.url().slice(0,90)));
  x.on('response',r=>{if(r.status()>=400)fails.push(r.status()+' '+r.url().slice(0,90));});
  await x.goto('http://127.0.0.1:8207/'+pg+'/',{waitUntil:'load',timeout:45000}).catch(e=>fails.push('NAV '+e.message));
  await x.waitForTimeout(3500);
  const info=await x.evaluate(()=>({h1:document.querySelectorAll('h1').length,imgs:[...document.images].length,broken:[...document.images].filter(i=>i.complete&&i.naturalWidth===0).map(i=>i.src.slice(0,80)),scroll:document.documentElement.scrollWidth>document.documentElement.clientWidth}));
  console.log('###',pg,JSON.stringify(info));
  if(errs.length)console.log('  console:',errs.slice(0,6));
  if(fails.length)console.log('  net:',fails.slice(0,8));
  await c.close();
}
await b.close();srv.close();})();
