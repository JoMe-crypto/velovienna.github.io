//Variablen

let startLayer = L.tileLayer.provider("BasemapAT.grau");

let map = L.map("map", {
    center: [48.208333, 16.373056],
    zoom: 12,
    layers: [
        startLayer
    ]
});

let themenradwege = " https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:THEMENRADWEGOGD&srsName=EPSG:4326&outputFormat=json"

//Funktionen

L.geoJson.ajax(themenradwege, {
    style: function (feature) {
        if (feature.properties.BEZEICHNUNG === "Wiental-Radweg") {
            return {
                color: "red"
            };
        }if (feature.properties.BEZEICHNUNG === "Ring-Rund-Radweg") {
            return {
                color: "green"
            };
        }if (feature.properties.BEZEICHNUNG === "Gürtel-Radweg") {
            return {
                color: "yellow"
            };

        }if (feature.properties.BEZEICHNUNG === "Donau-Radweg") {
            return {
                color: "purple"
            };

        }if (feature.properties.BEZEICHNUNG === "City-Radweg") {
            return {
                color: "black"
            };
        }if (feature.properties.BEZEICHNUNG === "Bernstein-Radweg") {
            return {
                color: "pink"
            }
        }
    },
    onEachFeature: function (feature) {
        console.log(feature);
    }
}).addTo(map);

let test = themenradwege.feature.properties.BEZEICHNUNG === "Wiental-Radweg";

let controlElevation = L.control.elevation({
    theme: "adler-theme",
    detached: true,
    elevationDiv: "#profile",
    followMarker: false
}).addTo(map);

controlElevation.load(test)
