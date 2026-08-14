const CACHE = 'khero-v1';
const PRECACHE = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(PRECACHE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);
  if (url.origin !== self.location.origin) return;

  if (url.pathname.endsWith('.html') || url.pathname.endsWith('/')) {
    // 네트워크 우선 (최신 게임 로직 반영), 실패 시 캐시
    e.respondWith(
      fetch(e.request)
        .then(r => { const rc = r.clone(); caches.open(CACHE).then(c => c.put(e.request, rc)); return r; })
        .catch(() => caches.match(e.request))
    );
  } else {
    // 캐시 우선 (JS 모듈·에셋·three.js 벤더)
    e.respondWith(
      caches.match(e.request).then(r => r || fetch(e.request).then(nr => {
        const rc = nr.clone();
        caches.open(CACHE).then(c => c.put(e.request, rc));
        return nr;
      }))
    );
  }
});
