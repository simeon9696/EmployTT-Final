let employTTcache = 'employTTCache';
let urlsToCache = [
  '/',
];

self.addEventListener('install', event => {
  // Perform install steps
  event.waitUntil(
    caches.open(employTTcache)
      .then(cache=> {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      }).catch(error =>{
          console.log(error);
      })
  );
});
   
   self.addEventListener('activate', event => {
    event.waitUntil(self.clients.claim());
   });
   
   self.addEventListener('fetch', event => {
     event.respondWith(
       caches.match(event.request).then(response => {
           return response || fetch(event.request);
       }).catch(error =>{
        console.log(error);
        })
     );
   });