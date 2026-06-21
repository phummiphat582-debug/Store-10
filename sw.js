/* Service Worker — สโตร์ 10
   ทำหน้าที่ cache ไฟล์หลักของแอป เพื่อให้เปิดได้แม้เน็ตหลุดบางส่วน
   และทำให้เบราว์เซอร์อนุญาตให้ "ติดตั้งแอป" (PWA installable)
*/

const CACHE_NAME = 'store10-app-cache-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(ASSETS_TO_CACHE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((key) => key !== CACHE_NAME)
            .map((key) => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

// กลยุทธ์: ลองใช้เน็ตก่อน ถ้าใช้ไม่ได้ค่อย fallback ไปใช้ cache
// (เหมาะกับแอปที่ sync ข้อมูล real-time ผ่าน Firebase)
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        const responseClone = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseClone);
        });
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
