/* Wafa Smart Tech service worker — fast shell v11 */
const C="wafa-v11";
const K=["/index.html","/recovery.html","/offline.html","/assets/css/styles.css","/assets/css/3d.css","/assets/css/home.css","/assets/js/main.js","/assets/js/3d.js","/assets/js/home.js","/assets/js/i18n.js","/assets/fonts/manrope-latin-var.woff2","/assets/fonts/sora-latin-var.woff2","/assets/img/logo-mark.webp","/manifest.webmanifest"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(K)).catch(()=>{}));self.skipWaiting();});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))));self.clients.claim();});
self.addEventListener("fetch",e=>{
  const u=new URL(e.request.url);
  if(u.origin!==location.origin||e.request.method!=="GET")return;
  if(e.request.mode==="navigate"){
    e.respondWith(fetch(e.request).then(n=>{if(n.ok)caches.open(C).then(c=>c.put(e.request,n.clone()));return n;}).catch(()=>caches.match(e.request).then(r=>r||caches.match("/offline.html"))));
    return;
  }
  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(n=>{
    if(n.ok&&u.pathname.match(/\.(css|js|webp|png|jpg|jpeg|ico|svg|woff2)$/))caches.open(C).then(c=>c.put(e.request,n.clone()));
    return n;
  }).catch(()=>Response.error())));
});
