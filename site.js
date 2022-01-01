console.log('site.js loaded');

if ('serviceWorker' in navigator) {
    console.log('Service Worker is supported');
    window.addEventListener('load', () => {
        // Register Service Worker once the window is loaded
        navigator.serviceWorker.register('../sw_cached_pages.js').
            // navigator.serviceWorker.register('../sw_cached_site.js').
            then(reg => { console.log('Serice worker registered') })
            .catch(err => { console.log('Service worker not registered', err) });
    });
}
else {
    console.log('Service Worker is not supported');
}
