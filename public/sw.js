const staticCacheName = 'usd_2019_06_23_08_12'

this.addEventListener('install', event => {
    this.skipWaiting();

    event.waitUntil(
        caches.open(staticCacheName)
        .then(cache => {
            return cache.addAll([
                '/',
                '/manifest.json',
                '/images/logo.png',
                '/js/functions.js',
                '/js/vendor/jquery.mask.min.js',
                '/js/vendor/fontawesome.min.js',
                'https://code.jquery.com/jquery-3.3.1.slim.min.js',
                'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js',
                'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css',
                'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js',
                'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/moment.min.js',
            ])
        })
    )
})

this.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.filter(cacheName => cacheName.startsWith('usd'))
                .filter(cacheName => cacheName !== staticCacheName)
                .map(cacheName => caches.delete(cacheName))
            )
        })
    )
})

this.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
        .then(response => {
            return response || fetch(event.request)
        })
        .catch(() => {
            return caches.match('/')
        })
    )
})