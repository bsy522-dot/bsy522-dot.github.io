/* 헬스장파인더 서비스워커
   - 앱 셸: 캐시 우선(설치 후 오프라인에서도 껍데기는 뜬다)
   - 데이터(JSON): 네트워크 우선 + 캐시 폴백(갱신된 데이터를 먼저 쓰되 끊기면 마지막 것)
   - 지도 타일: 캐시하지 않는다(OSM 이용정책상 대량 저장 금지) */
var VERSION = "gymfinder-v1";
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

  var isData = url.pathname.indexOf("/data/") >= 0;

  if(isData){
    e.respondWith(
      fetch(req).then(function(res){
        if(res && res.ok){
          var copy = res.clone();
          caches.open(VERSION).then(function(c){ c.put(req, copy); });
        }
        return res;
      }).catch(function(){
        return caches.match(req);
      })
    );
    return;
  }

  e.respondWith(
    caches.match(req).then(function(hit){
      return hit || fetch(req).then(function(res){
        if(res && res.ok && res.type === "basic"){
          var copy = res.clone();
          caches.open(VERSION).then(function(c){ c.put(req, copy); });
        }
        return res;
      });
    })
  );
});
