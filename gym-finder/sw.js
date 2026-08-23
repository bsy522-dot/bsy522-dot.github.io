/* 헬스장파인더 서비스워커 v2 (2026-08-23)
   v1은 앱 셸(HTML)을 캐시 우선으로 줘서 화면을 고쳐도 폰에 옛 화면이 남는 구조였다.
   → 전부 네트워크 우선(끊겼을 때만 캐시 폴백). 지도 타일은 종전대로 캐시하지 않는다(OSM 정책). */
var VERSION = "gymfinder-v2";
var SHELL = [
  "./",
  "./index.html",
  "./manifest.json",
  "./vendor/leaflet.js",
  "./vendor/leaflet.css",
  "./icon-192.png",
  "./icon-512.png"
];

self.addEventListener("install", function(e){
  e.waitUntil(
    caches.open(VERSION).then(function(c){
      return Promise.all(SHELL.map(function(u){
        return c.add(u).catch(function(){ /* 개별 실패는 설치를 막지 않는다 */ });
      }));
    }).then(function(){ return self.skipWaiting(); })
  );
});

self.addEventListener("activate", function(e){
  e.waitUntil(
    caches.keys().then(function(keys){
      return Promise.all(keys.map(function(k){
        return k === VERSION ? null : caches.delete(k);
      }));
    }).then(function(){ return self.clients.claim(); })
  );
});

self.addEventListener("fetch", function(e){
  var req = e.request;
  if(req.method !== "GET") return;

  var url = new URL(req.url);
  if(url.origin !== self.location.origin) return;   // OSM 타일 등 외부는 통과

  e.respondWith(
    fetch(req).then(function(res){
      if(res && res.ok && res.type === "basic"){
        var copy = res.clone();
        caches.open(VERSION).then(function(c){ c.put(req, copy); });
      }
      return res;
    }).catch(function(){
      return caches.match(req).then(function(hit){
        return hit || caches.match("./index.html");
      });
    })
  );
});
