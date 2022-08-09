const CACHE_NAME = 'frontloggd-cache';
const urlsToCache = ['index.html', 'offline.html'];

const self = this;
// Install Service Worker
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');

        return cache.addAll(urlsToCache);
      })
  );
});

// Listen for requests
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request)
      .then(() => {
        return fetch(e.request)
          .catch(() => caches.match('offline.html'));
      })
  );
});

// Activate Service Worker
self.addEventListener('activate', (e) => {
  const cacheWhitelist = [];
  cacheWhitelist.push(CACHE_NAME);

  // Remove unwanted caches  
  e.waitUntil(
    caches.keys().then((cacheNames) => Promise.all(
      cacheNames.map((cacheName) => {
        if (!cacheWhitelist.includes(cacheName)) {
          return caches.delete(cacheName);
        }
      })
    ))
  );
});