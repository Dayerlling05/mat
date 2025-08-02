const CACHE_NAME = 'mi-app-cache-v6';
const ARCHIVOS_CACHE = [
  '/formuclass/',
  '/formuclass/index.html',
  '/formuclass/saludo.html',
  '/formuclass/style.css',
  '/formuclass/script.js',
  '/formuclass/manifest.json',
  '/formuclass/imagenes/imagen1.png',
  '/formuclass/imagenes/imagen2.png'
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
    caches.match(event.request).then(respCache => {
      return respCache || fetch(event.request);
    })
  );
});
