// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate you.

//Testing locations
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
  var locations2 = [];

  //With an array of reports, get lat and lng of eachone and add to another array
  const mostrarMarkers = reportes => {
    reportes.forEach(reporte => {
      var cosito = {
        date: reporte.date,
        hora: reporte.hora,
        titulo: reporte.titulo,
        reporte: reporte.reporte,
        lat: parseFloat(reporte.latitud),
        lng: parseFloat(reporte.longitud)
      };
      locations2.push(cosito);
    });
  };

  //create the markers for each location
  const mostrarLocations = () => {
    locations2.forEach(location => {
      var mark = { lat: location.lat, lng: location.lng };
      var marker = new google.maps.Marker({ position: mark, map: map });
    });
  };

  // Add a marker clusterer to manage the markers.
  const hacerMarkerClusterer = () => {
    var markers = locations2.map(function(location, i) {
      var contentString =
        '<div id="content">' +
        '<div id="siteNotice">' +
        "</div>" +
        `<h3>${location.titulo}</h3>` +
        '<div id="bodyContent">' +
        `<h5>${location.date}:${location.hora}</h5>. <p>${location.reporte}</p> ` +
        "</div>" +
        "</div>";
      var infowindow = new google.maps.InfoWindow({
        content: contentString
      });

      var mark = { lat: location.lat, lng: location.lng };
      var marker = new google.maps.Marker({
        position: mark,
        label: labels[i % labels.length]
      });

      marker.addListener("click", function() {
        infowindow.open(map, marker);
      });

      return marker;
    });

    var markerCluster = new MarkerClusterer(map, markers, {
      imagePath:
        "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m"
    });
  };

  //fetch the reports data and create locations and markers
  const getLocations = () => {
    fetch("/reportes")
      .then(res => res.json())
      .then(mostrarMarkers)
      .then(hacerMarkerClusterer);
  };

  getLocations();

  // Code retreived from Google API
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

        var inLa = document.getElementById("inLatitud");
        inLa.value = position.coords.latitude;
        var inLn = document.getElementById("inLongitud");
        inLn.value = position.coords.longitude;

        infoWindow.setPosition(pos);
        infoWindow.setContent("Tu ubicación");
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

  //Geocoder to translate addresses to lat-lng
  var geocoder = new google.maps.Geocoder();

  document.getElementById("submitGeo").addEventListener("click", function() {
    geocodeAddress(geocoder, map, 2);
  });

  document.getElementById("submitNavbar").addEventListener("click", function() {
    geocodeAddress(geocoder, map, 1);
  });
}

function geocodeAddress(geocoder, resultsMap, numero) {
  if (numero == 2) {
    var address = document.getElementById("address").value;
  } else {
    var address = document.getElementById("addressNavbar").value;
  }
  geocoder.geocode({ address: address }, function(results, status) {
    if (status === "OK") {
      resultsMap.setCenter(results[0].geometry.location);
      //Change the input's values in form
      var inLa = document.getElementById("inLatitud");
      inLa.value = results[0].geometry.location.lat();
      var inLn = document.getElementById("inLongitud");
      inLn.value = results[0].geometry.location.lng();
      var marker = new google.maps.Marker({
        map: resultsMap,
        position: results[0].geometry.location
      });
    } else {
      alert("No se pudo realizar la Geocodificación: " + status);
    }
  });
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
