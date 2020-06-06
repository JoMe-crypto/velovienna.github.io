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

let wetterUrl  = "http://www.zamg.ac.at/ogd/"; 
