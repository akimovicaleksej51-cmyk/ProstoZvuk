// версия: 04b70ab578
const PREFIX='svet-', V=PREFIX+'04b70ab578', FILES=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png'];
self.addEventListener('install',e=>{ e.waitUntil(caches.open(V).then(c=>c.addAll(FILES.map(u=>new Request(u,{cache:'reload'}))))) });
self.addEventListener('activate',e=>{ e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k.startsWith(PREFIX)&&k!==V).map(k=>caches.delete(k)))).then(()=>self.clients.claim())) });
self.addEventListener('message',e=>{ if(e.data==='skip') self.skipWaiting() });
self.addEventListener('fetch',e=>{ const r=e.request; if(r.method!=='GET') return; const u=new URL(r.url); if(u.origin!==location.origin) return;
  const scope=new URL('./',self.registration.scope).pathname; if(!u.pathname.startsWith(scope)) return;
  e.respondWith(caches.open(V).then(c=>c.match(r,{ignoreSearch:true}).then(m=>m||(r.mode==='navigate'?c.match('./'):null)).then(m=>m||fetch(r))));
});
