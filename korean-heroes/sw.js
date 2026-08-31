// ★ 2026-08-31: 캐시 이름을 올려야 기존 설치본이 옛 js-v8 모듈을 계속 쓰지 않는다.
// (HTML은 네트워크 우선이라 새 index.html이 옛 모듈을 불러 어긋나는 사고를 막는다)
const CACHE = 'khero-v3';
const PRECACHE = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './icon-512-maskable.png'
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
