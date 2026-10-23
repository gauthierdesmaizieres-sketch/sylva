// shortcut: cache-first – bei jeder Änderung an der App VERSION erhöhen, sonst sehen Nutzer die alte Version.
const VERSION = 'sylva-1';
const SHELL = ['./', 'index.html', 'app.js', 'logic.js', 'style.css', 'manifest.json', 'icon-192.png', 'icon-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

// App-Dateien und Google Fonts aus dem Cache, alles andere nachladen und merken
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(caches.match(e.request).then(hit => hit || fetch(e.request).then(res => {
    if (res.ok || res.type === 'opaque') {
      const kopie = res.clone();
      caches.open(VERSION).then(c => c.put(e.request, kopie));
    }
    return res;
  })));
});
