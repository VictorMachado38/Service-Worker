const APP = {
    SW: null,
    cacheName: 'assetCache1',
    init() {
        //called after DOMContentLoaded
        // if ('serviceWorker' in navigator) {
        //   // Register a service worker hosted at the root of the
        //   // site using the default scope.
        //   navigator.serviceWorker.register('/sw.js').then(
        //     (registration) => {
        //       APP.SW =
        //         registration.installing ||
        //         registration.waiting ||
        //         registration.active;
        //     },
        //     (error) => {
        //       console.log('Service worker registration failed:', error);
        //     }
        //   );
        // } else {
        //   console.log('Service workers are not supported.');
        // }

        APP.startCaching();

        document
            .querySelector('header>h2')
            .addEventListener('click', APP.deleteCache);
    },
    startCaching() {
        return caches.open(APP.cacheName).then((cache) => {

            // console.log(`Caching assets for ${APP.cacheName}`);

            let url = 'img/place.jpg?id=one';
            cache.add(url); //add = fetch + put

            let url2 = new URL('http://127.0.0.1:5500/Service%20Workers%20-%20The%20Cache%20API/img/place.jpg?id=two');
            cache.add(url2);

            let resquest = new Request('img/place.jpg?id=three');
            cache.add(resquest)

            cache.keys().then((keys) => {
                keys.forEach((key, index) => {
                    console.log(index, key)
                })
            })
            return cache;
        }).then((cache) => {
            caches.has(APP.cacheName).then((hasFile) => {
                console.log(`Caching assets for ${APP.cacheName} - ${hasFile}`);
            })


            let url = 'img/place.jpg?id=one';
            return caches.match(url).then((cacheResponse) => {
                if (cacheResponse && cacheResponse.status < 400 && cacheResponse.headers.has('content-type') && cacheResponse.headers.get('content-type') === 'image/jpeg') {
                    //not an error if not found
                    console.log("Found !")
                    console.log(cacheResponse)
                    return cacheResponse;
                }else {

                }
            });
        });
    },
    deleteCache() {
        //click the h2 to delete our cache OR something in a cache
        //delete a response from the cache
        // caches.open(APP.cacheName).then((cache) => {
        //   let url = '/img/1011-800x600.jpg?id=two';
        //   cache.delete(url).then((isGone) => {
        //     console.log(isGone);
        //   });
        // });
        //delete an entire cache
        // caches.delete(APP.cacheName).then((isGone) => {
        //     console.log(isGone);
        // });
    },
};

document.addEventListener('DOMContentLoaded', APP.init);