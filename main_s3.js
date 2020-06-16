let startLayer = L.tileLayer.provider("BasemapAT");
let map = L.map("map", {
    center: [48.20833, 16.373056],
    zoom: 12,
    layers: [
        startLayer
    ]
});

L.control.layers({
    "BasemapAT": startLayer,
    "BasemapAT.orthofoto": L.tileLayer.provider("BasemapAT.orthofoto"),
    "OpenTopoMap": L.tileLayer.provider("OpenTopoMap")
}).addTo(map);

L.control.scale(
    metric= true, 
    imperial= false, 
    position="bottomleft"
).addTo(map);

let rainviewer = L.control.rainviewer({
    position: 'bottomleft',
    nextButtonText: '>',
    playStopButtonText: 'Start/Stop',
    prevButtonText: '<',
    positionSliderLabelText: "Time:",
    opacitySliderLabelText: "Opacity:",
    animationInterval: 500,
    opacity: 0.5
});
rainviewer.addTo(map);

function weatherInfo(id = 2761369) {
    var key = '{e105b8b9538822cec7ff5f7d006f2e9a}';
    fetch('https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/forecast?q=Vienna,AT&units=metric&APPID=e105b8b9538822cec7ff5f7d006f2e9a')
        .then(function (resp) {
            return resp.json()
        })
        .then(function (data) {
            showJetzt(data);
            showJetztdrei(data);
            showJetztsechs(data);
        })
        .catch(function () {

        });
}

window.onload = function () {
    weatherInfo(2761369);
}

/*if (location.protocol === 'http:'){
      url = 'http://api.openweathermap.org/data/2.5/forecast?q=Vienna,AT&units=metric&APPID=e105b8b9538822cec7ff5f7d006f2e9a'
} else { 
    url = 'https:api.openweathermap.org/data/2.5/forecast?q=Vienna,AT&units=metric&APPID=e105b8b9538822cec7ff5f7d006f2e9'
}

function normalTimeUnix(normal){
    return (new dt (normal)).getTime() / 1000;
}*/
function Unix_timestamp(t) {
    var dt = new Date(t * 1000);
    var hr = dt.getHours();
    var m = "0" + dt.getMinutes();
    var s = "0" + dt.getSeconds();
    return hr + ':' + m.substr(-2) + ':' + s.substr(-2);
};

function showJetzt(d) {
    //var celcius = Math.round(parseFloat(d.main.temp)-273.15);
    //document.getElementById('date').innerHTML = d.list[0].sys.dt_txt; 
    document.getElementById('description').innerHTML = d.list[0].weather[0].description;
    document.getElementById('temp').innerHTML = d.list[0].main.temp + '&degC';
    //document.getElementById('name').innerHTML = d.city.name;
    document.getElementById('wind').innerHTML = d.list[0].wind.speed + 'm/s';
    document.getElementById('humidity').innerHTML = d.list[0].main.humidity + '%';
    document.getElementById('dt').innerHTML = d.list[0].dt;
    var Zeit = Unix_timestamp(d.list[0].dt);
    document.getElementById('dt').innerHTML = Zeit;

}

function showJetztdrei(d) {
    //var celcius = Math.round(parseFloat(d.main.temp)-273.15);
    //document.getElementById('date').innerHTML = d.list[1].sys.dt_txt; 
    document.getElementById('description_1').innerHTML = d.list[1].weather[0].description;
    document.getElementById('temp_1').innerHTML = d.list[1].main.temp + '&degC';
    // document.getElementById('name').innerHTML = d.city.name;
    document.getElementById('wind_1').innerHTML = d.list[1].wind.speed + 'm/s';
    document.getElementById('humidity_1').innerHTML = d.list[1].main.humidity + '%';
    var Zeit = Unix_timestamp(d.list[1].dt);
    document.getElementById('dt_1').innerHTML = Zeit;

}

function showJetztsechs(d) {
    //var celcius = Math.round(parseFloat(d.main.temp)-273.15);
    //document.getElementById('date').innerHTML = d.list[1].sys.dt_txt; 
    document.getElementById('description_2').innerHTML = d.list[2].weather[0].description;
    document.getElementById('temp_2').innerHTML = d.list[2].main.temp + '&degC';
    // document.getElementById('name').innerHTML = d.city.name;
    document.getElementById('wind_2').innerHTML = d.list[2].wind.speed + 'm/s';
    document.getElementById('humidity_2').innerHTML = d.list[2].main.humidity + '%'
    var Zeit = Unix_timestamp(d.list[2].dt);
    document.getElementById('dt_2').innerHTML = Zeit;

}