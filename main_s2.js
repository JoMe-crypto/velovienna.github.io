

let startLayer = L.tileLayer.provider("BasemapAT.grau");

let map = L.map("map", {
    center: [48.208333, 16.373056],
    zoom: 12,
    layers: [
        startLayer
    ]
});

var north = L.control({position: "bottomright"});
north.onAdd = function(map) {
    var div = L.DomUtil.create("div", "info legend");
    div.innerHTML = '<img src="your-north-arrow.png">';
    return div;
}
north.addTo(map);

// Layer Auswahl

let themenradweg_1 = L.featureGroup();
let themenradweg_2 = L.featureGroup();
let themenradweg_3 = L.featureGroup();
let themenradweg_4 = L.featureGroup();
let themenradweg_5 = L.featureGroup();
let themenradweg_6 = L.featureGroup();
let wikipedia = L.featureGroup();


L.control.layers({
    "BasemapAT": startLayer,
    "BasemapAT.orthofoto": L.tileLayer.provider("BasemapAT.orthofoto"),
    "OpenTopoMap": L.tileLayer.provider("OpenTopoMap")
}, {
    "Wiental-Radweg": themenradweg_1,
    "Ring-Rund-Radweg": themenradweg_2,
    "Gürtel-Radweg": themenradweg_3,
    "Donau-Radweg": themenradweg_4,
    "City-Radweg": themenradweg_5,
    "Bernstein-Radweg": themenradweg_6,
    "Wikipedia Artikel": wikipedia
    

}).addTo(map);

L.control.scale(
    metric= true, 
    imperial= false, 
    position="bottomleft"
).addTo(map);

//Einlesen (zu FeatureGroups hinzufügen) und Stylen der Radwege mit Ajax

let themenradwege = " https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:THEMENRADWEGOGD&srsName=EPSG:4326&outputFormat=json"

// let starticon = L.icon ({
//     iconSize: [32, 37],
//     iconAnchor: [16, 37],
//     iconUrl: `icons/${feature.properties.BEZEICHNUNG}_start`
// })

// let stoppicon = L.icon({
//     iconSize: [32, 37],
//     iconAnchor: [16, 37],
//     iconUrl: `icons/${feature.properties.BEZEICHNUNG}_stopp`


// })

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
    },
    // //let startmarker = L.marker([], {
    //     icon: starticon
    // })

    // //let startmarker = L.marker([], {
    //     icon: stoppticon
    // })

    //Start 48.210312 16.212025
    //Stopp 
    
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

    //Start 48.232643 16.360900
    //Ziel 48.188479 16.338861


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

    //Start 
    //Ziel

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

    //Start 48.213966 16.362555
    //Ziel  48.202888, 16.368029
    
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
        themenradweg_1.addTo(map);
        map.fitBounds(themenradweg_1.getBounds());

        
    }if (clicked_id =="themenradweg_2"){
        themenradweg_2.addTo(map);
        map.fitBounds(themenradweg_2.getBounds());


    }if(clicked_id =="themenradweg_3"){
        themenradweg_3.addTo(map);
        map.fitBounds(themenradweg_3.getBounds());


    }if(clicked_id =="themenradweg_4"){
        themenradweg_4.addTo(map);
        map.fitBounds(themenradweg_4.getBounds());
        

    }if(clicked_id =="themenradweg_5"){
        themenradweg_5.addTo(map);
        map.fitBounds(themenradweg_5.getBounds());

    }if(clicked_id =="themenradweg_6"){
        themenradweg_6.addTo(map);
        map.fitBounds(themenradweg_6.getBounds());

    }

};

//wikipedia

let drawnMarkers = {};

map.on("zoomend moveend", function (evt) {
    let ext = {
        north : map.getBounds().getNorth(),
        south: map.getBounds().getSouth(),
        east: map.getBounds().getEast(),
        west: map.getBounds().getWest()
    };
    let url =`https://secure.geonames.org/wikipediaBoundingBoxJSON?north=${ext.north}&south=${ext.south}&east=${ext.east}&west=${ext.west}&username=csaw4560&lang=de&maxRows=30`;
    console.log(url);

    let wiki = L.Util.jsonp(url).then( function(data) {
        //console.log(data.geonames);
        for (let article of data.geonames) {
            let ll = `${article.lat}${article.lng}`
            if (drawnMarkers[ll]) {
                continue;
            }else {
                drawnMarkers[ll] = true;
            }
        
            let png = "";
            switch(article.feature){
                case "city":
                    png ="smallcity.png";
                    break;
                case "landmark":
                    png = "landmark.png";
                    break;
                case "waterbody":
                    png = "lake.png";
                    break;
                case "river":
                    png = "river.png";
                    break;
                case "mountain":
                    png= "mountains.png";
                    break;
                default:
                    png = "information.png";


            }
            let mrk = L.marker([article.lat,article.lng],{
                icon: L.icon({
                    iconSize: [32, 37],
                    iconAnchor: [16, 37],
                    popupAnchor: [0, -37],
                    iconUrl: `icons/${png}`
                })   
            }).addTo(wikipedia);
            let img = "";
            if (article.thumbnailImg) {
                img = `<img src="${article.thumbnailImg}" alt="thumbnail">`
            }
            mrk.bindPopup(`
                <small>${article.feature}</small>
                <h3>${article.title} (${article.elevation}m)</h3>
                ${img}
                <p>${article.summary}</p>
                <a target="wikipedia" href="https://${article.wikipediaUrl}">Wikipedia Artikel</a>`)
            
        }
    });
});wikipedia.addTo(map);

