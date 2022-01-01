// Cache the entire app response, which will include the files
const cacheName = 'v2';


// call Install event
self.addEventListener('install', e => {
    console.log('Service Worker: Installed');
});


self.addEventListener('activate', e => {
    console.log('Service Worker: Activated');

    // remove unwanted caches
    e.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== cacheName) {
                        console.log('Service Worker: Clearing Old Cache');
                        return caches.delete(cache);
                    }
                })
            );
        }));
});


// This event is fired when the service worker starts serving the assets
self.addEventListener('fetch', e => {
    console.log('Service Worker: Fetching');

    e.respondWith(fetch(res => {
        const resClone = res.clone();
        caches.open(cacheName).then(cache => {
            // Add response to cache
            cache.put(e.request, resClone);
        });
        return res;
    }).catch(err => caches.match(e.request).then(res => res)));


});