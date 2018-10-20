/**
 * map.js
 * BigRed-18-Hack-for-Future
 *
 * 1. Home page main map to show all projects
 * 2. Form page map for picking location
 */

var map_main;
var map_infoWindow;

var map_centerLat = 42.4499
var map_centerLng = -76.4818
var map_initZoom = 16

var map_windows = []

var map_markers = {
  "marker-1": {
    lat: 42.4478,
    lng: -76.4810,
    title: "marker 1",
  },
  "marker-2": {
    lat: 42.4493,
    lng: -76.4821,
    title: "marker 2",
  },
  "marker-3": {
    lat: 42.4512,
    lng: -76.4814,
    title: "marker 3",
  },
}

function map_initMapMain () {
  map_main = new google.maps.Map (document.getElementById('main-map-container'), {
    center: {
      lat: map_centerLat,
      lng: map_centerLng
    },
    zoom: map_initZoom
  });
  console.log (map_main)
  /* show markers */
  var pins = []
  for (key in map_markers) {
    if (!map_markers.hasOwnProperty (key)) continue
    markerData = map_markers [key]
    var pin = new google.maps.Marker ({
      position: {
        lat: markerData.lat,
        lng: markerData.lng
      },
      visible: true
    })
    pin.setMap (map_main)
    pins.push (pin)
    /* listen to marker click */
    var infoWindow = new google.maps.InfoWindow ()
    google.maps.event.addListener (pin, 'click', (function (pin, data, infoWindow) {
      return function () {
        map_closeWindows ()
        infoWindow.setContent ()
        infoWindow.open (map_main, pin)
        map_windows [0] = infoWindow
      }})(pin, markerData, infoWindow))
  }
  var markerCluster = new MarkerClusterer (map_main, pins)
  console.log (pins)
}

function map_closeWindows () {
  if (map_windows.length > 0) {
    map_windows [0].set ('marker', null)
    map_windows [0].close ()
    map_windows.length = 0
  }
}

