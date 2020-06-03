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
// let brunnenGroup = L.featureGroup().addTo(map);
let trinkbrunnenGroup = L.featureGroup().addTo(map);

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
    "Trinkbrunnen": trinkbrunnenGroup

}).addTo(map);


// let abstellUrl = "https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:FAHRRADABSTELLANLAGEOGD&srsName=EPSG:4326&outputFormat=json";

// let abstell = L.geoJson.ajax(abstellUrl, {
//     pointToLayer: function (point, latlng){
//         let marker = L.marker(latlng);
//         console.log("Point", point);
//         marker.bindPopup(`<p><b>Adresse: </b>${point.properties.ADRESSE}</p>
//         <p><i>Anzahl an verfügbaren Stellplätzen: </i>${point.properties.ANZAHL}</p>
//         `);
//         return marker;
//     }
// }).addTo(abstellGroup);


// let verleihUrl = "https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:CITYBIKEOGD&srsName=EPSG:4326&outputFormat=json";

// let verleih = L.geoJson.ajax(verleihUrl, {
//     pointToLayer: function (point, latlng){
//         let marker = L.marker(latlng);
//         console.log("Point", point);
//         marker.bindPopup(`<h3>${point.properties.STATION}</h3>
//         <h3>${point.properties.ANZAHL}</h3>
//         `);
//         return marker;
//     }
// }).addTo(verleihGroup);



let brunnenUrl = "https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:TRINKBRUNNENOGD&srsName=EPSG:4326&outputFormat=json";

//Alle Brunnen anzeigen lassen:
// let brunnen = L.geoJson.ajax(brunnenUrl, {
//     pointToLayer: function (point, latlng){
//         let marker = L.marker(latlng);
//         return marker;
//     }
// }).addTo(brunnenGroup);

//Nur "NAME": "Trinkbrunnen mit Tränke" anzeigen lassen
let trinkbrunnen = L.geoJson.ajax(brunnenUrl, {
    filter: function (feature) {
        if (feature.properties.NAME === "Trinkbrunnen mit Tränke") {
            return true;
        }
    },
    pointToLayer: function (point, latlng) {
        let icon = L.icon({
            iconUrl: 'icons/trinkbrunnen.png',
            iconSize: [32, 32]
        });
        let marker = L.marker(latlng, {
            icon: icon
        })
        return marker
    }
}).addTo(trinkbrunnenGroup);

// Nur "NAME": "Trinkbrunnen" anzeigen lassen
let trinkbrunnentränke = L.geoJson.ajax(brunnenUrl, {
    filter: function (feature) {
        if (feature.properties.NAME === "Trinkbrunnen") {
            return true;
        }
    },
    pointToLayer: function (point, latlng) {
        let icon = L.icon({
            iconUrl: 'icons/trinkbrunnen.png',
            iconSize: [32, 32]
        });
        let marker = L.marker(latlng, {
            icon: icon
        })
        return marker
    }
}).addTo(trinkbrunnenGroup);



let radwegeUrl = "https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:RADWEGEOGD&srsName=EPSG:4326&outputFormat=json";

// L.geoJson.ajax(radwegeUrl, {
//     style: function(){
//         return {
//             color:"red",
//             weight: 3
//         };
//     }
// }).addTo(map);


//Basisrouten (B) und Grundnetz (G) anzeigen lassen >> Pop-up funktioniert nicht... (Filter offenbar auch nicht, weil alles blau angezeigt wird, selbst wenn man "blue" und "green" tauscht...)
L.geoJson.ajax(radwegeUrl, {
    style: function(feature){
        if (feature.properties.M18_RANG_SUB === "G")
        return {
            color:"blue",
            weight: 3
        };
        else if (feature.properties.M18_RANG_SUB==="B")
        return {
            color:"green",
            weight: 3
        };
    },
    onEachFeature: function (feature, layer){
        layer.bindPopup(`${feature.properties.STRNAM}`)
    }
}).addTo(map);