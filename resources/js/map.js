(function(){

window.addEventListener( 'load', function() {

  var mapElement = document.getElementById('map');
  var venue = new google.maps.LatLng({lat: 47.6023262, lng: -122.1374963}); // TODO don't hard-code
  var center = { lng: venue.lng(), lat: venue.lat() + LATITUDE_ADJUSTMENT };

  // Create the map
  var map = new google.maps.Map( mapElement, {
    center: center,
    zoom: 15,
    styles: mapStyles,
    scrollwheel: false,
  });

  var marker = new google.maps.Marker({
    position: venue,
    map: map,
    title: 'Ground Zero Music Program',
    icon: '/img/marker.png'
  });

  var infoWrapper = document.getElementById('marker-info-wrapper');
  infoWrapper.parentNode.removeChild(infoWrapper);
  var infoWindow = new google.maps.InfoWindow({
    content: infoWrapper.innerHTML,
    maxWidth: 400,
  });
  infoWindow.open( map, marker );

  map.addListener('idle', function() {
    console.log('done loading');
    mapElement.parentNode.classList.remove('loading');
  });

  marker.addListener('click', function() {
    infoWindow.open(map, marker);
  });

  window.addEventListener('resize', function() {
    map.setCenter(center);
  });

});

var LATITUDE_ADJUSTMENT = 0.004;

var mapStyles = [
    {
        "featureType": "all",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 13
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#000000"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#144b53"
            },
            {
                "lightness": 14
            },
            {
                "weight": 1.4
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#d7ffff"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {
                "color": "#08304b"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#0c4152"
            },
            {
                "lightness": 5
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "saturation": "10"
            },
            {
                "lightness": "8"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#e0fbfc"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#022e33"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#78cfd7"
            },
            {
                "lightness": 25
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "labels",
        "stylers": [
            {
                "hue": "#008aff"
            },
            {
                "saturation": "-20"
            },
            {
                "lightness": "-6"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#022e33"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#4f898f"
            },
            {
                "lightness": 16
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#1b043c"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {
                "color": "#146474"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "color": "#021019"
            }
        ]
    }
];

})();
