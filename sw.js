// Service Worker for offline caching
const CACHE = 'xizang-job-v1';
const FILES = ['/', '/index.html','/search.html','/score.html','/material.html','/schedule.html',
  '/compare.html','/favorites.html','/track.html','/major.html',
  '/css/style.css','/js/data.js','/js/search.js','/js/chart.js','/js/api.js',
  '/js/qa.js','/js/favorites.js','/js/track.js','/js/daily.js','/js/daily-updates.json',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css',
  'https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)));
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request).then(res => {
      if(e.request.url.startsWith(location.origin)) {
        const clone = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, clone));
      }
      return res;
    }))
  );
});
