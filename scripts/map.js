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
var dispInfo

function map_initMapMain () {
  dispInfo = {}
  firebase.database().ref('/posts').on('value', function(snapshot){
    data = snapshot.val()
    for(key in data){
      let short = data[key].desc
      if(short.length > 60){
        short = short.slice(0, 57)
        short += "..."
      }
      dispInfo[key] = {
        lat: data[key].lat,
        lng: data[key].long,
        title: data[key].title,
        desc: short,
        url: `project.html?id=${key}`
      }
    }
    playMap(dispInfo)
  })
}

function playMap (map_markers){
  var pins = []
  for (key in map_markers) {
    console.log("key", key)
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
        infoWindow.setContent ('<div style="padding-bottom: 10px ; font-size:140%">'
                               + '<b>' + data.title + '</b>' + '</div>'  + '<div>' + data.desc + '</div>')
        infoWindow.open (map_main, pin)
        map_windows [0] = infoWindow
      }})(pin, markerData, infoWindow))
  }
  map_main = new google.maps.Map (document.getElementById('main-map-container'), {
    center: {
      lat: map_centerLat,
      lng: map_centerLng
    },
    zoom: map_initZoom
  });
  /* show markers */
  var markerCluster = new MarkerClusterer (map_main, pins)
}

function map_closeWindows () {
  if (map_windows.length > 0) {
    map_windows [0].set ('marker', null)
    map_windows [0].close ()
    map_windows.length = 0
  }
}

/**************************** Form Page Second Map ****************************/

var map_loc;
var map_markerpos;
var map_marker;

function map_initMapLoc () {
  map_loc = new google.maps.Map(document.getElementById('loc-map-container'), {
    center: {
      lat: map_centerLat,
      lng: map_centerLng
    },
    zoom: map_initZoom
  });

  var drawingManager = new google.maps.drawing.DrawingManager({
    drawingMode: google.maps.drawing.OverlayType.MARKER,
    drawingControl: true,
    drawingControlOptions: {
      position: google.maps.ControlPosition.TOP_CENTER,
      drawingModes: ['marker']
    },
    markerOptions: {draggable:true}
  });

  google.maps.event.addListener(drawingManager, 'markercomplete', function(marker) {
    map_marker = marker;
    map_markerpos = marker.getPosition();
    marker.setDraggable(true);
    drawingManager.setMap(null);
  });

  google.maps.event.addListener(drawingManager, 'dragend', function(event) {

      map_markerpos = map_marker.getPosition();
  })

  drawingManager.setMap(map_loc);
}

/* Map Interface - get current set new pin position */
function map_getNewPin () {
  return {
    lat: map_markerpos.lat (),
    lng: map_markerpos.lng ()
  }
}

/* Map Interface - reset current new pin info */
function map_resetNewPin () {
  map_markerpos = google.maps.LatLng ({ lat: 0, lng: 0 })
}

