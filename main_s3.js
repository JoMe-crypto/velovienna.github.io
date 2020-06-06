let startLayer = L.tileLayer.provider("BasemapAT");
let map = L.map("map", {
    center: [48.20833, 16.373056],
    zoom: 12, 
    layers:[
        startLayer
    ]
});

let overlay ={
    stations: L.featureGroup(),
    temperature: L.featureGroup()
}

L.control.layers({
    "BasemapAT": startLayer,
    "CycleOSM": L.tileLayer.provider("CyclOSM"),
    "BasemapAT.orthofoto":L.tileLayer.provider("BasemapAT.orthofoto"),
    "Stamen.Terrain": L.tileLayer.provider("Stamen.Terrain"),
    "OpenTopoMap": L.tileLayer.provider("OpenTopoMap")
}, {
    "Wetterstationen Österreich": overlay.stations,
    "Tempertaur °C": overlay.temperature
}).addTo(map);

(function() {
   'use strict';
  
    var map = L.map('mapContainer');
  
    $.get('tawes1h', function(csvContents) {
      var geoLayer = L.geoCsv(csvContents, {firstLineTitles: true, fieldSeparator: ','});
      map.addLayer(geoLayer);
    });
  });

// let wetterUrl  = ""; 

// let wetterUrl = L.geoJson.ajax(wetterUrl).addTo(map);