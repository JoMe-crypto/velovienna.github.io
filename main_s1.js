let startLayer = L.tileLayer.provider("BasemapAT");

let map = L.map("map", {
    center: [48.208333, 16.373056],
    zoom: 12,
    layers: [
        startLayer
    ]
});

// let abstellGroup = L.featureGroup().addTo(map);
let abstellGroup = L.markerClusterGroup();
let verleihGroup = L.featureGroup();
// let brunnenGroup = L.featureGroup().addTo(map);
// let trinkbrunnenGroup = L.featureGroup().addTo(map);
let trinkbrunnenGroup = L.markerClusterGroup();
let radwegeGroup = L.featureGroup();
let radwegenebenGroup = L.featureGroup();

// var mymap = L.map(map).setView([48.208354, 16.372504], 13)

// L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
//     maxZoom: 17,
//     attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>tributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https:/ntopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
// }).addTo(mymap);

L.control.layers({
    "BasemapAT": startLayer,
    "BasemapAT.orthofoto": L.tileLayer.provider("BasemapAT.orthofoto"),
    "OpenTopoMap": L.tileLayer.provider("OpenTopoMap")
}, {
    "Abstellanlagen": abstellGroup,
    "Citybike-Stationen": verleihGroup,
    "Trinkbrunnen": trinkbrunnenGroup,
    "Radwege - Haupt": radwegeGroup,
    "Radwege - Neben": radwegenebenGroup

}).addTo(map);

L.control.scale(
    metric=false,
    imperial=true,
    position='bottom left',
).addTo(map);


//Leaflet Reachability

let bikeicon = L.divIcon({
    html: '<i class="fas fa-bicycle"></i>',
    iconSize: [20, 20],
    className: 'myDivIcon'
});

L.control.reachability({
    // add settings/options here
    apiKey: '5b3ce3597851110001cf624830698b53da4140619578c92c3cea3ca5',

    //Styling travel Mode Buttons

    travelModeButton1Content: '',
    travelModeButton1StyleClass: 'fa fa-bicycle',
    travelModeButton1Tooltip: 'Fortbewegungsart: Fahrrad',
    travelModeProfile1: 'cycling-regular',

    //Ab hier geht's nicht mehr...

    travelModeButton2Content: '',
    travelModeButton2StyleClass: bikeicon,
    travelModeButton2Tooltip: 'Fortbewegungsart: e-bike',
    travelModeProfile2: 'cycling-electric',

    travelModeButton3Content: '',
    travelModeButton3StyleClass: 'fas fa-walking',
    travelModeButton3Tooltip: 'Fortbewegungsart: zu Fuß',
    travelModeProfile3: 'foot-walking',

    travelModeButton4Content: '',
    travelModeButton4StyleClass: 'fas fa-car',
    travelModeButton4Tooltip: 'Fortbewegungsart: Auto',
    travelModeProfile4: 'car',

    //Styling edit-Buttons

    drawButtonContent:'',
    drawButtonStyleClass:'fas fa-pencil-alt',
    drawButtonTooltip:'Ausgangspunkt setzen',

    deleteButtonContent:'',
    deleteButtonStyleClass:'fas fa-trash-alt',
    deleteButtonTooltip:'Reichweite löschen',

    distanceButtonContent:'',
    distanceButtonStyleClass: "  fas fa-road  ",
    distanceButtonTooltip: "Reichweite nach Distanz",

    timeButtonContent:"",
    timeButtonStyleClass: "far fa-clock",
    timeButtonTooltip: "Reichweite nach Zeit",

    rangeControlDistanceTitle: "Distanz",
    rangeControlDistanceMax: 10,
    rangeControlDistanceInterval: 1,
    rangeControlTimeTitle: "Zeit",
    rangeControlTimeMax: 60,
    rangeControlTimeInterval: 10
      
}).addTo(map);





let abstellUrl = "https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:FAHRRADABSTELLANLAGEOGD&srsName=EPSG:4326&outputFormat=json";

let abstell = L.geoJson.ajax(abstellUrl, {
    pointToLayer: function (point, latlng) {
        let icon = L.icon({
            iconUrl: `icons/parking_bicycle.png`,
            iconSize: [32, 32]
        });
        let marker = L.marker(latlng, {
            icon: icon
        });
        marker.bindPopup(`<p><b>Adresse: </b>${point.properties.ADRESSE}</p>
        <p><i>Anzahl an verfügbaren Stellplätzen: </i>${point.properties.ANZAHL}</p>
        `);
        return marker;
    }
}).addTo(abstellGroup);

abstell.on("data:loaded", function () { //nach Laden des Events abstell...
    abstellGroup.addLayer(abstell); //...gruppierte Abstellanlagen hinzufügen
    // console.log("data loaded");
    // map.fitBounds(abstellGroup.getBounds()); //Kartengrenzen an abstellGroup ausrichten
})


let verleihUrl = "https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:CITYBIKEOGD&srsName=EPSG:4326&outputFormat=json";

let verleih = L.geoJson.ajax(verleihUrl, {
    pointToLayer: function (point, latlng) {
        let icon = L.icon({
            iconUrl: `icons/citybike.png`,
            iconSize: [32, 32]
        });
        let marker = L.marker(latlng, {
            icon: icon
        });
        marker.bindPopup(`<p><b>Standort: </b>${point.properties.STATION}</p>
        <p>Position (Lat, Lng): ${point.geometry.coordinates[0].toFixed(5)}, ${point.geometry.coordinates[1].toFixed(5)}</p>
        `);
        return marker;
    }
}).addTo(verleihGroup);


let brunnenUrl = "https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:TRINKBRUNNENOGD&srsName=EPSG:4326&outputFormat=json";

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

trinkbrunnen.on("data:loaded", function () {
    trinkbrunnenGroup.addLayer(trinkbrunnen);
    // console.log("data loaded");
})

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

trinkbrunnentränke.on("data:loaded", function () {
    trinkbrunnenGroup.addLayer(trinkbrunnentränke);
    // console.log("data loaded");
})



let radwegeUrl = "https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:RADNETZOGD &srsName=EPSG:4326&outputFormat=json";

L.geoJson.ajax(radwegeUrl, {
    filter: function (feature) {
        if (feature.properties.M18_RANG_SUB === "B") {
            return true;
        }
    },
    style: function (feature) {
        return {
            color: "red",
            weight: 3
        };
    },
    onEachFeature: function (feature, layer) {
        let textbasis = "a";
        if (feature.properties.M18_RANG_SUB === "B") {
            textbasis = "Basisroute"
        }
        layer.bindPopup(`<p>${feature.properties.STRNAM}</p>
        <p><b>Rang: </b>${textbasis}</p>
        <p>Basisrouten sind die wichtigsten Verbindungen im Wiener Radwegenetz. Sie sind gut ausgebaut und bieten dadurch eine hohe Fahrqualität.</p>`)
    }

}).addTo(radwegeGroup)

L.geoJson.ajax(radwegeUrl, {
    filter: function (feature) {
        if (feature.properties.M18_RANG_SUB === "G") {
            return true;
        }
    },
    style: function (feature) {
        return {
            color: "orange",
            weight: 3
        };
    },
    onEachFeature: function (feature, layer) {
        let textgrund = "a";
        if (feature.properties.M18_RANG_SUB === "G") {
            textgrund = "Grundnetz"
        }
        layer.bindPopup(`<p>${feature.properties.STRNAM}</p>
        <p><b>Rang: </b>${textgrund}</p>
        <p>Radwege des Grundnetz-Bestands erstrecken sich zwischen den Basisrouten und verbinden einzelne Bezirke und Stadtteile miteinander.</p>`)
    }

}).addTo(radwegeGroup)

L.geoJson.ajax(radwegeUrl, {
    filter: function (feature) {
        if (feature.properties.M18_RANG_SUB === "N") {
            return true;
        }
    },
    style: function (feature) {
        return {
            color: "yellow",
            weight: 2
        };
    },
    onEachFeature: function (feature, layer) {
        let textneben = "a";
        if (feature.properties.M18_RANG_SUB === "N") {
            textneben = "Sonstige Radroute"
        }
        layer.bindPopup(`<p>${feature.properties.STRNAM}</p>
        <p><b>Rang: </b>${textneben}</p>`)
    }

}).addTo(radwegenebenGroup)

L.geoJson.ajax(radwegeUrl, {
    filter: function (feature) {
        if (feature.properties.M18_RANG_SUB === "E") {
            return true;
        }
    },
    style: function (feature) {
        return {
            color: "yellow",
            weight: 2
        };
    },
    onEachFeature: function (feature, layer) {
        let texterweitert = "a";
        if (feature.properties.M18_RANG_SUB === "E") {
            texterweitert = "Sonstige Radroute"
        }
        layer.bindPopup(`<p>${feature.properties.STRNAM}</p>
        <p><b>Rang: </b>${texterweitert}</p>`)
    }

}).addTo(radwegenebenGroup)



// Cheat-Sheet – Leaflet-Plugin
// API-key: 5b3ce3597851110001cf624830698b53da4140619578c92c3cea3ca5
// <script>
//     // Create the Leaflet map object
//     var map = L.map('map', { center: [53.4189, -2.33] });

//     // Create a Leaflet tile layer object
//     L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//         attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
//     }).addTo(map);

//     // Initialise the reachability plugin
//     L.control.reachability({
//         // add settings/options here
//         apiKey: '5b3ce3597851110001cf624830698b53da4140619578c92c3cea3ca5'
//     }).addTo(map);
// </script>