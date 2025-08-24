const CACHE_NAME = 'mi-app-cache-v6';
const ARCHIVOS_CACHE = [
  '/mat/',
  '/mat/index.html',
  '/mat/inicio.html',
  '/mat/style.css',
  '/mat/script.js',
  '/mat/manifest.json',
  '/mat/Materia.html',
  '/mat/Matematica.html',
  '/mat/AngulosIns.html',
  '/mat/Conjuntos.html',
  '/mat/EcSG.html',
  '/mat/Ecuaciones.html',
  '/mat/fisica.html',
  '/mat/fisicaMRUV.html',
  '/mat/fisicaTP.html',
  '/mat/FuncionesSG.html',
  '/mat/Intervalos.html',
  '/mat/MDivision.html',
  '/mat/MFT.html',
  '/mat/MT.html',
  '/mat/MTeorema.html',
  '/mat/MTeoremaFactor.html',
  '/mat/MTrinomioF.html',
  '/mat/MulBT.html',
  '/mat/MultiplicacionB.html',
  '/mat/MValoresFT.html',
  '/mat/QuimicaEB.html',
  '/mat/quimica.html',
  '/mat/QuimicaEB.html',
  '/mat/quimicaRQ.html',
  '/mat/Radianes.html',
  '/mat/Tangente.html',
  '/mat/TeoremaBM.html',
  '/mat/TeoremaFactor.html',
  '/mat/ejerciciosfisica.html',
  '/mat/biologia.html',
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
    caches.match(event.request).then(respCache => {
      return respCache || fetch(event.request);
    })
  );
});


