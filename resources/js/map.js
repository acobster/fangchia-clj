(function($){
$(document).ready(function(){

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

  var venue = new google.maps.LatLng({lat: 47.6023262, lng: -122.1374963}); // TODO don't hard-code


  var LATITUDE_ADJUSTMENT = 0.004;


  var center = { lng: venue.lng(), lat: venue.lat() + LATITUDE_ADJUSTMENT };

  // Create the map
  var map = new google.maps.Map( $('#map').get(0), {
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

  var infoWindow = new google.maps.InfoWindow({
    content: $('#marker-info-wrapper').detach().html(),
    maxWidth: 400,
  });
  infoWindow.open( map, marker );

  $(window).resize(function() {
    map.setCenter(center);
  });

  /**
   * The CenterControl adds a control to the map that recenters the map on Chicago.
   * This constructor takes the control DIV as an argument.
   * @constructor
   */
  // function FullScreenControl(controlDiv, map) {

  //   // Set CSS for the control border.
  //   var controlUI = document.createElement('div');
  //   controlUI.style.backgroundColor = '#fff';
  //   controlUI.style.border = '2px solid #fff';
  //   controlUI.style.borderRadius = '3px';
  //   controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
  //   controlUI.style.cursor = 'pointer';
  //   controlUI.style.marginBottom = '22px';
  //   controlUI.style.textAlign = 'center';
  //   controlUI.title = 'Click to recenter the map';
  //   controlDiv.appendChild(controlUI);

  //   // Set CSS for the control interior.
  //   var controlText = document.createElement('div');
  //   controlText.style.color = 'rgb(25,25,25)';
  //   controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
  //   controlText.style.fontSize = '16px';
  //   controlText.style.lineHeight = '38px';
  //   controlText.style.paddingLeft = '5px';
  //   controlText.style.paddingRight = '5px';
  //   controlText.innerHTML = 'Center Map';
  //   controlUI.appendChild(controlText);

  //   // Setup the click event listeners: simply set the map to Chicago.
  //   controlUI.addEventListener('click', function() {
  //     map.setCenter(chicago);
  //   });

  // }

  // new FullScreenControl( ..., map)


});
})(jQuery);
