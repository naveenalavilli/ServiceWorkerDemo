//Set a version name for the cache
const cacheName = 'v1';

//List of app assets to be cached
const cacheAssets = ['index.html', 'site.js'];


//This event is fired when the service worker is installed
// call Install event
self.addEventListener('install', e => {
    console.log('Service Worker: Installed');

    // Cache the assets
    e.waitUntil(caches.open(cacheName)
        .then(cache => {
            console.log('Service Worker: Caching Files');
            cache.addAll(cacheAssets);
        })
        .then(
            self.skipWaiting())
    );

});


//This event is fired when the service worker is activated
self.addEventListener('activate', e => {
    console.log('Service Worker: Activated');

    // remove unwanted caches.
    // There may be cached assets that are no longer needed
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

//This event is fired when the service worker starts serving the assets
//call fetch event
self.addEventListener('fetch', e => {
    console.log('Service Worker: Fetching');
    e.respondWith(
        //Return cached version of file if available
        fetch(e.request).catch(() => caches.match(e.request))
    );
});