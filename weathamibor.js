var myMap = L.map('amibormap'); //.setView([55.6, 37.723371], 10);

// Тайловая растровая подложка
var osmTiles = L.tileLayer('http://a.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'/*'https://tile.openstreetmap.org/{z}/{x}/{y}.png'*/);

osmTiles.addTo(myMap);

var icon = L.divIcon({
	 className: 'map-marker',
	 iconSize:null,
	 html:'<div class="icon">'+'</div><div class="arrow" />'
});

function onLocationFound(e) {
	var radius = e.accuracy / 2, coordinates;
	coordinates = e.latlng.lat + ',' + e.latlng.lng
	gettingJSON(coordinates);
	var inner = '<b><i>Here will be weather info.</i></b>'
	L.marker(e.latlng, {icon: icon}).addTo(myMap)
		.bindPopup(inner);
}


function onLocationError(e) {
	alert(e.message);
}

myMap.on('locationfound', onLocationFound);
myMap.on('locationerror', onLocationError);

myMap.locate({setView: true, maxZoom: 16});


function workWithJson(weaJson) {
	console;
	var tempC = parseFloat(weaJson['current']['temp_c']), 
		windDir = parseFloat(weaJson['current']['wind_degree']), 
		windDirText = 'rotate(' + (windDir + 180) + 'deg)', 
		colorFrame = temperatureToColor(tempC),
		windSpeed = parseFloat(weaJson['current']['wind_kph']),
		arrowColor = windColor(windSpeed);
	less.modifyVars({
        '@tempColor': colorFrame,
		'@windAngle': windDirText,
		'@windColor': arrowColor
    })
	
}

function temperatureToColor(temperature) {
    tempColors = [
        {temp: [30, 40],   color: '#FF6600'},
        {temp: [20, 30],   color: '#FF9955'},
        {temp: [10, 20],   color: '#FFCC00'},
        {temp: [0, 10],    color: '#DDFF55'},
        {temp: [-10, 0],   color: '#00FF00'},
        {temp: [-20, -10], color: '#80FFE6'},
        {temp: [-30, -20], color: '#00FFCC'},
        {temp: [-40, -30], color: '#5555FF'},
    ];
    var oneTempColor, colorr;
    if (temperature >= 40) {
        colorr = "#FF0000";  // Самый красный
    } else {
        if (temperature < -40) {
            colorr = "#0000FF";  // Самый синий
        } else {
            for (var i = 0; i < tempColors.length; i++) {
                oneTempColor = tempColors[i];
                if (temperature >= oneTempColor.temp[0] && temperature < oneTempColor.temp[1]) {
                    colorr = oneTempColor.color;
                    break;
                }
            }
        }
    }
    return colorr;
}
	
function windColor(windSpeed) {
	var colorWind,
		winds = [
		{speed: [1, 5], color: '#E7E5FF'},
		{speed: [6, 11], color: '#C0BBFF'},
		{speed: [12, 19], color: '#9C93FF'},
		{speed: [20, 28], color: '#7569FF'},
		{speed: [29, 38], color: '#4E3FFF'},
		{speed: [39, 48], color: '#2A17FF'},
		{speed: [49, 61], color: '#1300EC'},
		{speed: [62, 74], color: '#1000C4'},
		{speed: [75, 88], color: '#0C009A'},
		{speed: [89, 102], color: '#090070'},
		{speed: [103, 118], color: '#060048'},
	];
	
	if (windSpeed < 2) {colorWind = '#F6F5FF'}
	else if (windSpeed > 118) {colorWind = '#03001E'}
	else {
		winds.forEach(function(oneWind) {
			if (windSpeed >= oneWind.speed[0] && windSpeed <= oneWind.speed[1]) {
				colorWind = oneWind.color;
			}
		})
	}
	return colorWind;
}

function gettingJSON(coordinates) {
    var weaJson;
    // $.getJSON("http://api.openweathermap.org/data/2.5/weather?lat=55&lon=37&APPID=ab930bccc92605497e8a43b03e01545",
    /* $.getJSON("https://api.apixu.com/v1/current.json?key=6d8d2baf10af41f7b3033141180208&q=" + coordinates, function myJson(json) {
		console.log(json);
		workWithJson(json);
	});*/
	weaJson = {
        "location":{
            "name":"Izmaylovo",
            "region":"Moskva",
            "country":"Russia",
            "lat":55.81,
            "lon":37.72,
            "tz_id":"Europe/Moscow",
            "localtime_epoch":1534060864,
            "localtime":"2018-08-12 11:01"
        },
        "current":{
            "last_updated_epoch":1534059911,
            "last_updated":"2018-08-12 10:45",
            "temp_c":25,
            "temp_f":77,
            "is_day":1,
            "condition":{
                "text":"Sunny",
                "icon":"//cdn.apixu.com/weather/64x64/day/113.png",
                "code":1000
            },
            "wind_mph":13.6,
            "wind_kph":22,
            "wind_degree":190,
            "wind_dir":"S",
            "pressure_mb":1014,
            "pressure_in":30.4,
            "precip_mm":0,
            "precip_in":0,
            "humidity":44,
            "cloud":0,
            "feelslike_c":25.6,
            "feelslike_f":78,
            "vis_km":10,
            "vis_miles":6
        }
    };
    workWithJson(weaJson);
}
