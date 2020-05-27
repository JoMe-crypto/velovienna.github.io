let startLayer = L.tileLayer.provider("BasemapAT");

let map = L.map("map", {
    center: [48.208333, 16.373056],
    zoom: 12,
    layers: [
        startLayer
    ]
});

let abstellGroup = L.featureGroup().addTo(map);
let verleihGroup = L.featureGroup().addTo(map);
let brunnenGroup = L.featureGroup().addTo(map);

// var mymap = L.map(map).setView([48.208354, 16.372504], 13)

// L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
//     maxZoom: 17,
//     attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>tributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https:/ntopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
// }).addTo(mymap);

L.control.layers({
    "BasemapAT": startLayer,
    "CycleOSM": L.tileLayer.provider("CyclOSM"),
    // "BasemapAT.terrain": L.tileLayer.provider("BasemapAT.terrain"),
    // "BasemapAT.surface": L.tileLayer.provider("BasemapAT.surface"),
    "BasemapAT.orthofoto": L.tileLayer.provider("BasemapAT.orthofoto"),
    "Stamen.Terrain": L.tileLayer.provider("Stamen.Terrain"),
    "OpenTopoMap": L.tileLayer.provider("OpenTopoMap")
}, {
    "Abstellanlagen": abstellGroup,
    "Citybike-Stationen": verleihGroup,
    "Trinkbrunnen": brunnenGroup

}).addTo(map);


let abstellUrl = "https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:FAHRRADABSTELLANLAGEOGD&srsName=EPSG:4326&outputFormat=json";

let abstell = L.geoJson.ajax(abstellUrl, {
    pointToLayer: function (point, latlng){
        let marker = L.marker(latlng);
        console.log("Point", point);
        marker.bindPopup(`<p><b>Adresse: </b>${point.properties.ADRESSE}</p>
        <p><i>Anzahl an verfügbaren Stellplätzen: </i>${point.properties.ANZAHL}</p>
        `);
        return marker;
    }
}).addTo(abstellGroup);


let verleihUrl = "https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:CITYBIKEOGD&srsName=EPSG:4326&outputFormat=json";

let verleih = L.geoJson.ajax(verleihUrl, {
    pointToLayer: function (point, latlng){
        let marker = L.marker(latlng);
        console.log("Point", point);
        marker.bindPopup(`<h3>${point.properties.STATION}</h3>
        <h3>${point.properties.ANZAHL}</h3>
        `);
        return marker;
    }
}).addTo(verleihGroup);



let brunnenUrl = "https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:TRINKBRUNNENOGD&srsName=EPSG:4326&outputFormat=json";

let brunnen = L.geoJson.ajax(brunnenUrl, {
    pointToLayer: function (point, latlng){
        let marker = L.marker(latlng);
        return marker;
    }
}).addTo(brunnenGroup);

// let radwegeUrl = "https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:RADWEGEOGD&srsName=EPSG:4326&outputFormat=json";