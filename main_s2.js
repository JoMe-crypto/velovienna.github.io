//Variablen

let startLayer = L.tileLayer.provider("BasemapAT.grau");

let map = L.map("map", {
    center: [48.208333, 16.373056],
    zoom: 12,
    layers: [
        startLayer
    ]
});

// Layer Auswahl

let themenradweg_1 = L.featureGroup();
let themenradweg_2 = L.featureGroup();
let themenradweg_3 = L.featureGroup();
let themenradweg_4 = L.featureGroup();
let themenradweg_5 = L.featureGroup();
let themenradweg_6 = L.featureGroup();


L.control.layers({
    "BasemapAT": startLayer,
    "CycleOSM": L.tileLayer.provider("CyclOSM"),
    // "BasemapAT.terrain": L.tileLayer.provider("BasemapAT.terrain"),
    // "BasemapAT.surface": L.tileLayer.provider("BasemapAT.surface"),
    "BasemapAT.orthofoto": L.tileLayer.provider("BasemapAT.orthofoto"),
    "Stamen.Terrain": L.tileLayer.provider("Stamen.Terrain"),
    "OpenTopoMap": L.tileLayer.provider("OpenTopoMap")
}, {
    "Wiental-Radweg": themenradweg_1,
    "Ring-Rund-Radweg": themenradweg_2,
    "Gürtel-Radweg": themenradweg_3,
    "Donau-Radweg": themenradweg_4,
    "City-Radweg": themenradweg_5,
    "Bernstein-Radweg": themenradweg_6,
    

}).addTo(map);

//Einlesen (zu FeatureGroups hinzufügen) und Stylen der Radwege mit Ajax

let themenradwege = " https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:THEMENRADWEGOGD&srsName=EPSG:4326&outputFormat=json"

let themenradweg1 = L.geoJson.ajax(themenradwege,{
    filter: function (feature) {
        if (feature.properties.BEZEICHNUNG === "Wiental-Radweg"){
            return true;
        }
    },
    style: function (feature) {
        return {
            color: "red"
        } 
    }

}).addTo(themenradweg_1)

let themenradweg2 = L.geoJson.ajax(themenradwege,{
    filter: function (feature) {
        if (feature.properties.BEZEICHNUNG === "Ring-Rund-Radweg"){
            return true;
        }
    },
    style: function (feature) {
        return {
            color: "blue"
        } 
    }

}).addTo(themenradweg_2)

let themenradweg3 = L.geoJson.ajax(themenradwege,{
    filter: function (feature) {
        if (feature.properties.BEZEICHNUNG === "Gürtel-Radweg"){
            return true;
        }
    },
    style: function (feature) {
        return {
            color: "yellow"
        } 
    }

}).addTo(themenradweg_3)

let themenradweg4 = L.geoJson.ajax(themenradwege,{
    filter: function (feature) {
        if (feature.properties.BEZEICHNUNG === "Donau-Radweg"){
            return true;
        }
    },
    style: function (feature) {
        return {
            color: "green"
        } 
    }

}).addTo(themenradweg_4)

let themenradweg5 = L.geoJson.ajax(themenradwege,{
    filter: function (feature) {
        if (feature.properties.BEZEICHNUNG === "City-Radweg"){
            return true;
        }
    },
    style: function (feature) {
        return {
            color: "magenta"
        } 
    }
    
}).addTo(themenradweg_5)

let themenradweg6 = L.geoJson.ajax(themenradwege,{
    filter: function (feature) {
        if (feature.properties.BEZEICHNUNG === "Bernstein-Radweg"){
            return true;     
        }
    },
    style: function (feature) {
        return {
            color: "black"
        } 
    }
    

}).addTo(themenradweg_6)

//Radwege onclick auf das entsprechende Bild aktivieren

function radwegHinzufuegen(clicked_id){
    if (clicked_id == "themenradweg_1"){
        themenradweg_1.addTo(map)
    }if (clicked_id =="themenradweg_2"){
        themenradweg_2.addTo(map)
    }if(clicked_id =="themenradweg_3"){
        themenradweg_3.addTo(map)
    }if(clicked_id =="themenradweg_4"){
        themenradweg_4.addTo(map)
    }if(clicked_id =="themenradweg_5"){
        themenradweg_5.addTo(map)
    }if(clicked_id =="themenradweg_6"){
        themenradweg_6.addTo(map)}

};