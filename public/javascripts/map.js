// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate you.
var locations = [
  { lat: 4.702216, lng: -74.042732 },
  { lat: 4.696698, lng: -74.033527 },
  { lat: 4.697553, lng: -74.035297 },
  { lat: 4.693517, lng: -74.037897 },
  { lat: 4.695271, lng: -74.038895 },
  { lat: 4.697028, lng: -74.039123 },
  { lat: 4.696312, lng: -74.043248 },
  { lat: 4.694104, lng: -74.033139 },
  { lat: 4.691506, lng: -74.03404 }
];
var map, infoWindow;
function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 4.686972, lng: -74.057049 },
    zoom: 14
  });

  // Create an array of alphabetical characters used to label the markers.
  var labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  infoWindow = new google.maps.InfoWindow();

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function(position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        infoWindow.setPosition(pos);
        infoWindow.setContent("Location found.");
        infoWindow.open(map);
        map.setCenter(pos);
      },
      function() {
        handleLocationError(true, infoWindow, map.getCenter());
      }
    );
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }

  var markers = locations.map(function(location, i) {
    return new google.maps.Marker({
      position: location,
      label: labels[i % labels.length]
    });
  });

  // Add a marker clusterer to manage the markers.
  var markerCluster = new MarkerClusterer(map, markers, {
    imagePath:
      "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m"
  });

  //Location
  // locations.forEach(location => {
  //   var mark = { lat: location.lat, lng: location.lng };
  //   var marker = new google.maps.Marker({ position: mark, map: map });
  // });
  // var uni = { lat: 4.702216, lng: -74.042732 };
  // //Marker
  // var marker = new google.maps.Marker({ position: uni, map: map });
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation."
  );
  infoWindow.open(map);
}
