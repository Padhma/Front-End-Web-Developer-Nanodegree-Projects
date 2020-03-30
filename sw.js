//install event to add all files to be cached
self.addEventListener('install', function (event) {
	event.waitUntil(
		caches.open('cacheName').then(function(cache){
			return cache.addAll([
				'./',
				'./index.html',
				'./restaurant.html',
				'./css/styles.css',
				'./data/restaurants.json',
				'./js/dbhelper.js',
				'./js/main.js',
				'./js/restaurant_info.js',
				'./img/1.jpg',
				'./img/2.jpg',
				'./img/3.jpg',
				'./img/4.jpg',
				'./img/5.jpg',
				'./img/6.jpg',
				'./img/7.jpg',
				'./img/8.jpg',
				'./img/9.jpg',
				'./img/10.jpg'
			]);
		})
    );
});

// fetch event
self.addEventListener('fetch', function(event){
  event.respondWith(
    caches.match(event.request).then(function(response){
      if(response){
        console.log('Request' +event.request +'already exists in the cache.');
        return response;
      }
      else {
        console.log(`Request ${event.request} could not be found in the cache.`);
        return fetch(event.request)
        .then(function(response){
          let cloneOfResponse = response.clone();
          caches.open('cacheName').then(function(cache){
            cache.put(event.request, cloneOfResponse);
          })
          return response;
        })
        .catch(function(err){
          console.log(`Error ${err} was encountered while caching.`);
        });

      }
    })
  )
});
