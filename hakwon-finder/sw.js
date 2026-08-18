/* 학원파인더 전국판 — 서비스워커
   껍데기(HTML·아이콘·매니페스트)만 캐시한다.
   지역 데이터는 46MB짜리 묶음이라 미리 캐시하지 않고, 한 번 받은 것만 남긴다. */
var SHELL = "hakwon-shell-v1";
var DATA  = "hakwon-data-v1";
var SHELL_FILES = [
  "./", "./index.html", "./privacy.html", "./manifest.json",
  "./icon-192.png", "./icon-512.png"
];

self.addEventListener("install", function (e) {
  e.waitUntil(
    caches.open(SHELL).then(function (c) {
      return c.addAll(SHELL_FILES);
    }).then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener("activate", function (e) {
  e.waitUntil(
    caches.keys().then(function (ks) {
      return Promise.all(ks.map(function (k) {
        if (k !== SHELL && k !== DATA) return caches.delete(k);
      }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener("fetch", function (e) {
  var req = e.request;
  if (req.method !== "GET") return;
  var url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  // 데이터는 네트워크 우선(월 1회 갱신되므로 최신을 먼저 본다), 실패 시 캐시
  if (url.pathname.indexOf("/data/") >= 0) {
    e.respondWith(
      fetch(req).then(function (res) {
        if (res && res.ok) {
          var copy = res.clone();
          caches.open(DATA).then(function (c) { c.put(req, copy); });
        }
        return res;
      }).catch(function () { return caches.match(req); })
    );
    return;
  }

  // 껍데기는 캐시 우선
  e.respondWith(
    caches.match(req).then(function (hit) {
      return hit || fetch(req).then(function (res) {
        if (res && res.ok && res.type === "basic") {
          var copy = res.clone();
          caches.open(SHELL).then(function (c) { c.put(req, copy); });
        }
        return res;
      });
    })
  );
});
