//function to load google maps
export function load_google_maps() {
  return new Promise(function(resolve, reject) {
    // define the global callback that will run when google maps is loaded
    window.resolveGoogleMapsPromise = function() {
      // resolve the google object
      resolve(window.google);
      // delete the global callback to tidy up since it is no longer needed
      delete window.resolveGoogleMapsPromise;
    }
    // Now, Load the Google Maps API
    const script = document.createElement("script");
    const API_KEY = 'AIzaSyB6N63ZIGH4b8Hgm9KhodA87Guuiem3C8Y';
    script.src = `https://maps.googleapis.com/maps/api/js?libraries=places&key=${API_KEY}&callback=resolveGoogleMapsPromise`;
    script.async = true;
    document.body.appendChild(script);
  });
}

//get the images of the respective locations
export function getImage(venue) {
  return 'https://maps.googleapis.com/maps/api/streetview?size=150x150&location=' + venue.location.lat + ',' + venue.location.lng + '&heading=151.78&pitch=-0.76&key=AIzaSyB6N63ZIGH4b8Hgm9KhodA87Guuiem3C8Y'
}

//load the neighbourhood locations
export function load_locations() {
  let place = 'bangalore';
  let object = 'mall';
  var apiURL = 'https://api.foursquare.com/v2/venues/search?client_id=STSMXDHOMKY1U1Y1HWPPWWGL0LEYVAETCGXRU4R0NYHDE4NY&client_secret=DI1M2QS5X0QSKGTUPNFRJNIV3Y4KDUHWBJTO20HFGPWGGWCK&v=20130815%20&limit=15&near=' + place + '&query=' + object + '';
  return fetch(apiURL).then(resp => resp.json())
}

//concatenate the address to view in the info_bar
export function concatenate(l) {
  let t = "";
  let i = 0;
  let e = l.length - 1;
  for(i = 0; i < e; i++) {
    t += (l[i] + "<br/>")
  }
  t += l[i];
  return t;
}
