var minimap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 10,
  id: "dark-v10",
  accessToken: API_KEY
})
// .addTo(myMap);

var base = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 10,
  id: "dark-v10",
  accessToken: API_KEY
})
// .addTo(myMap);

var basemap = base;


// Create map & boundaries
var myMap = L.map("map", {
  center: [20, 0],
  zoom: 2
  // minZoom: 2
})
    .addLayer(basemap);

  // Store API in newly created variable
var earth_sat = "/static/data/earthlaunch.geojson";

var myIcon = L.icon({
  iconUrl: '/static/rocket.png',
  iconSize: [9.5,23.75],
  iconAnchor: [5.59,22.75],
  popupAnchor: [-100, -10]});
  


//  Call variable and retrieve magnitude data
var geosat = d3.json(earth_sat, function(data) {

      // console.log(data[0].above);
   
    for (var i = 0; i < data[0].above.length; i++){

        // console.log(data[0].above[i]);

        var sat_list = data[0].above[i]
        var sat_name = data[0].above[i].satname
        var ldate = data[0].above[i].launchDate
                  
        if (sat_list){

          // console.log(sat_list);
          // console.log(sat_name);
          // console.log(ldate)
            
            var marker = L.marker([sat_list.satlat, sat_list.satlng],{icon: myIcon}).addTo(myMap)
            // console.log(marker)

            marker.bindPopup('<strong> Satellite Name: '+ sat_name + '</strong><hr> Launch Date: ' + ldate)

            marker.openPopup()}
     
        }});

      
        var newmap = minimap

        var preview = new L.Control.MiniMap(newmap).addTo(myMap);

