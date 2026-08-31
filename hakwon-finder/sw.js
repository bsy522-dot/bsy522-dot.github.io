/* 학원파인더 전국판 — 서비스워커 v4 (2026-08-31)
   v4: 읍면동 파서 교체(괄호 안 건물명 뒤 동 이름을 못 읽던 결함)·전국대표번호 정규화.
   v3: 전화번호 수록·나이/과목 분류 교체·읍면동 필터·URL 라우팅 배포에 맞춰 캐시 이름 올림.
   v1은 껍데기(HTML)를 캐시 우선으로 줘서 새 화면(나이·과목 필터)이 배포돼도
   폰에 영원히 옛 화면이 남았다. → HTML·셸은 네트워크 우선(끊겼을 때만 캐시),
   지역 데이터는 종전대로 네트워크 우선 + 캐시 폴백. */
var SHELL = "hakwon-shell-v4";
var DATA  = "hakwon-data-v4";
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
      .then(function () { return self.clients.matchAll({ type: "window" }); })
      .then(function (cs) {
        /* 새 워커가 접수하는 순간 열려 있는 화면을 스스로 새로고침 — 옛 화면이 남지 않게 (2026-08-23) */
        cs.forEach(function (c) {
          if (c.url.indexOf(self.location.origin) === 0 && "navigate" in c) { c.navigate(c.url).catch(function () {}); }
        });
      })
  );
});

self.addEventListener("fetch", function (e) {
  var req = e.request;
  if (req.method !== "GET") return;
  var url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  // 전부 네트워크 우선 — 최신을 먼저 보고, 끊겼을 때만 캐시로 버틴다
  var bucket = url.pathname.indexOf("/data/") >= 0 ? DATA : SHELL;
  e.respondWith(
    fetch(req).then(function (res) {
      if (res && res.ok && res.type === "basic") {
        var copy = res.clone();
        caches.open(bucket).then(function (c) { c.put(req, copy); });
      }
      return res;
    }).catch(function () {
      return caches.match(req).then(function (hit) {
        return hit || caches.match("./index.html");
      });
    })
  );
});
