/* Bump this version when changing the offline bundle. Documents and API data are never cached. */
const CACHE='sevin-static-pages-94cf5bb4444a';
const OFFLINE='/sevin-photo-studio/offline.html';
const ASSETS=[OFFLINE,'/sevin-photo-studio/offline.css','/sevin-photo-studio/offline.js','/sevin-photo-studio/fonts/vazirmatn.woff2','/sevin-photo-studio/images/sevin-logo-small.webp','/sevin-photo-studio/images/garden-editorial.webp','/sevin-photo-studio/images/wedding-rings.webp','/sevin-photo-studio/images/family-hands.webp','/sevin-photo-studio/icons/icon-192.png','/sevin-photo-studio/icons/icon-512.png','/sevin-photo-studio/icons/maskable-512.png','/sevin-photo-studio/icons/apple-touch-icon.png'];
const ALLOWED=new Set(ASSETS);
self.addEventListener('install',event=>{
 event.waitUntil((async()=>{
  const cache=await caches.open(CACHE);
  await Promise.all(ASSETS.map(async path=>{
   const response=await fetch(new Request(path,{cache:'reload',credentials:'same-origin',redirect:'error'}));
   if(!response.ok||response.redirected)throw Error('Offline asset unavailable');
   await cache.put(path,response);
  }));
 })());
});
self.addEventListener('activate',event=>{
 event.waitUntil((async()=>{for(const name of await caches.keys())if(name.startsWith('sevin-static-')&&name!==CACHE)await caches.delete(name);await self.clients.claim();})());
});
self.addEventListener('message',event=>{if(event.data?.type==='SKIP_WAITING')self.skipWaiting();});
self.addEventListener('fetch',event=>{
 const request=event.request,url=new URL(request.url);
 if(request.method!=='GET'||url.origin!==self.location.origin||!url.pathname.startsWith('/sevin-photo-studio/')||url.pathname.startsWith('/sevin-photo-studio/api/'))return;
 if(request.mode==='navigate'){
  event.respondWith((async()=>{
   const controller=new AbortController(),timeout=setTimeout(()=>controller.abort(),6000);
   try{
    const response=await fetch(request,{signal:controller.signal});
    if(response.status>=500){const fallback=await caches.match(OFFLINE);if(fallback)return fallback;}
    return response;
   }catch{return await caches.match(OFFLINE)||new Response('اتصال برقرار نیست. تماس با سوین: 09173110494',{status:503,headers:{'Content-Type':'text/plain; charset=utf-8'}});}
   finally{clearTimeout(timeout);}
  })());return;
 }
 if(ALLOWED.has(url.pathname)&&!url.search){
  event.respondWith((async()=>{const saved=await caches.match(url.pathname);return saved||fetch(request);})());
 }
});
