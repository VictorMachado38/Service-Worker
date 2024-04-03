console.log("------- New 3 is running  -------");
// new 1 2

// console.log({self})


self.addEventListener('install',(ev) => {
    console.log('install')
})
self.addEventListener('activate',(ev) => {
    console.log('activate')
})
self.addEventListener('fetch',(ev) => {
    // console.log('fetching',ev.request)
    // ev.respondWith(fetch(ev.request
})
self.addEventListener('message',(ev) => {
    console.log('message')
})

console.log({caches})

