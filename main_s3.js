let startLayer = L.tileLayer.provider("BasemapAT");
let map = L.map("map", {
    center: [48.20833, 16.373056],
    zoom: 12, 
    layers:[
        startLayer
    ]
});

L.control.layers({
    "BasemapAT": startLayer
}).addTo(map);