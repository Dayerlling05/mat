const CACHE_NAME = 'mi-app-cache-v6';
const ARCHIVOS_CACHE = [
  '/mat/',
  '/mat/index.html',
  '/mat/style.css',
  '/mat/script.js',
  '/mat/manifest.json',
  '/mat/imagenes/imagen1.png',
  '/mat/imagenes/imagen2.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ARCHIVOS_CACHE);
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(key => {
        if (key !== CACHE_NAME) return caches.delete(key);
      }))
    )
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(resp => {
      return resp || fetch(event.request).then(response => {
       
        if (event.request.destination === 'image') {
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, response.clone());
          });
        }
        return response;
      }).catch(() => {
        if (event.request.destination === 'image') {
          return caches.match('/mat/imagenes/imagen1.png'); 
        }
      });
    })
  );
});