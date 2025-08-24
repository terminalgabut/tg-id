const CACHE_NAME = "terminalgabut-cache-v2"; // Naikkan versi agar update
const urlsToCache = [
  "/tg-id/",
  "/tg-id/index.html",
  "/tg-id/manifest.json",
  "/tg-id/icons/icon-192.png",
  "/tg-id/icons/icon-512.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.filter((name) => name !== CACHE_NAME).map((name) => caches.delete(name))
      );
    })
  );
});