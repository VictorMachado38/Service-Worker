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
                    // console.log(index, key)
                })
            })
            return cache;
        }).then((cache) => {
            caches.has(APP.cacheName).then((hasFile) => {
                console.log(`Caching assets for ${APP.cacheName} - ${hasFile}`);
            })


            let url = 'img/img2.jpg';
            return caches.match(url).then((cacheResponse) => {
                if (cacheResponse && cacheResponse.status < 400 && cacheResponse.headers.has('content-type') && cacheResponse.headers.get('content-type') === 'image/jpeg') {
                    //not an error if not found
                    console.log("Found !")
                    // console.log(cacheResponse)
                    return cacheResponse;
                }else {
                    console.log('Not found !')
                    return fetch(url).then(resposta =>{
                        if(!resposta.ok) throw resposta.statusText;

                        cache.put(url, resposta.clone());
                        return resposta;
                    })
                }
            });
        }).then(cacheResponse => {
            console.log('cacheResponse',cacheResponse)
            document.querySelector('output').textContent = cacheResponse.url;
            return cacheResponse.blob()
        }).then(blob => {
            // console.log('blob',blob)
            let url = URL.createObjectURL(blob);
            let img = document.createElement('img') ;
            let img1 = document.createElement('img') ;
            img.src = url;
            img1.src = url;
            // console.log(img)
            document.querySelector('output').append(img);
            document.querySelector('output').append(img1);
        });
    },
    deleteCache() {
        //click the h2 to delete our cache OR something in a cache
        //delete a response from the cache
        // window.alert('Is this working ?');

        // caches.open(APP.cacheName).then(cache => {
        //     let url = 'img/place.jpg?id=one';
        //
        //     cache.delete(url).then(isGone => {
        //         console.log(`O ${url} se foi? ${isGone}`);
        //     })
        //     cache.keys().then((keys) => {
        //         keys.forEach((key, index) => {
        //             console.log(index, key)
        //         })
        //     })
        // })

        //delete an entire cache
        caches.delete(APP.cacheName).then((isGone) => {
            console.log(isGone);
        });
    },
};

document.addEventListener('DOMContentLoaded', APP.init);