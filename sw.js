/* Service worker de Kipu: guarda la app en el celular para que abra sin internet.
   Los datos del negocio NO pasan por aquí: viven en el almacenamiento del navegador. */
const VERSION = 'kipu-e007e2d32e';
const ARCHIVOS = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icons/apple-touch-icon.png",
  "./icons/favicon-32.png",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/maskable-512.png",
  "./fonts/atkinson-hyperlegible-latin-400-normal.woff2",
  "./fonts/atkinson-hyperlegible-latin-700-normal.woff2",
  "./fonts/bricolage-grotesque-latin-opsz-normal.woff2"
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(VERSION).then(c => c.addAll(ARCHIVOS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(claves => Promise.all(claves.filter(k => k.startsWith('kipu-') && k !== VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// La página: primero internet (para recibir mejoras) y, si no hay o tarda, la copia guardada
async function paginaPrimeroRed(request){
  const cache = await caches.open(VERSION);
  const red = fetch(request).then(resp => {
    if (resp && resp.ok) cache.put('./index.html', resp.clone());
    return resp;
  });
  const espera = new Promise(resolve => setTimeout(resolve, 4000, null));
  try {
    const resp = await Promise.race([red, espera]);
    if (resp && resp.ok) return resp;
  } catch (e) { /* sin conexión */ }
  const guardada = await cache.match('./index.html');
  if (guardada) { red.catch(() => {}); return guardada; }
  return red;
}

// Íconos, fuentes y manifest: primero la copia guardada
async function primeroCache(request){
  const guardada = await caches.match(request);
  if (guardada) return guardada;
  const resp = await fetch(request);
  if (resp && resp.ok && resp.type === 'basic') {
    const cache = await caches.open(VERSION);
    cache.put(request, resp.clone());
  }
  return resp;
}

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;
  if (req.mode === 'navigate') { event.respondWith(paginaPrimeroRed(req)); return; }
  event.respondWith(primeroCache(req));
});
