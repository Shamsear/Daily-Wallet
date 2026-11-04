const CACHE_NAME = 'daily-wallet-v19';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './style.css',
  './app.js',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/favicon.png'
];

/**
 * Strips redirect flags from a Response object.
 * Safari / WebKit strictly throws:
 * "The response served by the ServiceWorker has redirections"
 * if a Response with redirected: true is returned to event.respondWith().
 * Recreating a Response from its body/blob strips the redirect metadata.
 */
function stripRedirect(response) {
  if (!response || !response.redirected) return response;
  const hasBody = response.body && response.status !== 204 && response.status !== 304;
  return new Response(hasBody ? response.body : null, {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers
  });
}

/**
 * Safely prepares a response for both serving and storing in cache,
 * ensuring no response with redirected: true enters the cache or response stream.
 */
async function cleanAndCloneResponse(response) {
  if (!response) return { toReturn: response, toCache: null };

  if (!response.redirected) {
    let toCache = null;
    try {
      toCache = response.clone();
    } catch (_) {}
    return { toReturn: response, toCache };
  }

  // If redirected, read as Blob to instantiate two independent clean responses
  const blob = await response.blob();
  const cleanForReturn = new Response(blob, {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers
  });
  const cleanForCache = new Response(blob, {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers
  });

  return {
    toReturn: cleanForReturn,
    toCache: cleanForCache
  };
}

// Install: Cache core application shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      for (const url of ASSETS_TO_CACHE) {
        try {
          const res = await fetch(url, { cache: 'reload' });
          if (res && res.status === 200) {
            const { toReturn } = await cleanAndCloneResponse(res);
            await cache.put(url, toReturn);
          }
        } catch (err) {
          console.warn('Pre-cache skipped for', url, err);
        }
      }
    }).then(() => self.skipWaiting())
  );
});

// Activate: Clean old caches and claim clients immediately
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) {
            return caches.delete(name);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch: Stale-While-Revalidate / Cache-First with Network Fallback
self.addEventListener('fetch', (event) => {
  // Only handle GET requests
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then(async (cachedResponse) => {
      // If found in cache, return cached response and fetch updated version in background
      if (cachedResponse) {
        // Background network fetch to keep cache fresh when online
        fetch(event.request).then(async (networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const { toCache } = await cleanAndCloneResponse(networkResponse);
            if (toCache) {
              const cache = await caches.open(CACHE_NAME);
              await cache.put(event.request, toCache);
            }
          }
        }).catch(() => {
          // Offline, network fails silently; cached response already served
        });

        return stripRedirect(cachedResponse);
      }

      // If not in cache, fetch from network
      try {
        const networkResponse = await fetch(event.request);
        if (!networkResponse || networkResponse.status !== 200) {
          return stripRedirect(networkResponse);
        }

        const { toReturn, toCache } = await cleanAndCloneResponse(networkResponse);
        if (toCache) {
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, toCache);
          });
        }

        return toReturn;
      } catch (err) {
        // Fallback for navigation requests if offline
        if (event.request.mode === 'navigate') {
          const fallback = await caches.match('./') || await caches.match('./index.html');
          if (fallback) {
            return stripRedirect(fallback);
          }
        }
        throw err;
      }
    })
  );
});

// Allow immediate activation when requested from UI
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
