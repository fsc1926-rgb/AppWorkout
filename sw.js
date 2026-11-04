const CACHE_NAME = 'workout-pwa-v1';

// I file che devono essere salvati nella memoria del telefono
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

// 1. Installazione: Scarica i file e li salva
self.addEventListener('install', (event) => {
  self.skipWaiting(); // Forza l'aggiornamento immediato del SW
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// 2. Attivazione: Elimina le vecchie versioni della cache
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
});

// 3. Fetch: Quando l'app richiede un file, cerca prima in cache (Offline-first)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Se il file è in cache, restituiscilo. Altrimenti scaricalo da internet.
      return cachedResponse || fetch(event.request);
    }).catch(() => {
      // Qui potresti restituire una pagina HTML di "Sei offline" se la rete fallisce
    })
  );
});
