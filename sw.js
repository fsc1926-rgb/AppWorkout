const CACHE_NAME = 'workout-pwa-v1';

// I file base necessari per far avviare l'app offline
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon-192.png'
];

// 1. Fase di Installazione: il SW si installa e salva i file in cache
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Cache aperta');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// 2. Fase di Fetch (Intercettazione): quando l'app richiede una risorsa
self.addEventListener('fetch', (event) => {
  event.respondWith(
    // Controlla se il file richiesto è già nella cache
    caches.match(event.request).then((cachedResponse) => {
      // Se c'è, restituisci quello istantaneamente (Offline)
      // Altrimenti fai la normale chiamata di rete
      return cachedResponse || fetch(event.request);
    })
  );
});
