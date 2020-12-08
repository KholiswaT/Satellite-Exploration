// Create map & boundaries
var myMap = L.map("map", {
    center: [20, 0],
    zoom: 2,
    minZoom: 2
  });
  
  // Adding a base layer for map
//   L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
//   attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
//   tileSize: 512,
//   maxZoom: 10,
//   zoomOffset: -1,
//   id: "mapbox/streets-v11",
//   accessToken: API_KEY
// })

L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 10,
  id: "dark-v10",
  accessToken: API_KEY
}).addTo(myMap);

  // Store API in newly created variable
var earth_sat = "/earthlaunch.geojson";

var myIcon = L.icon({
  iconUrl: '/rocket.png',
  iconSize: [9.5,23.75],
  // iconSize: [38, 95],
  iconAnchor: [5.59,22.75],
  // iconAnchor: [22, 94],
  popupAnchor: [-3, -76]});
  
//  Call variable and retrieve magnitude data
d3.json(earth_sat, function(data) {

      // console.log(data[0].above);
   
    for (var i = 0; i < data[0].above.length; i++){

        // console.log(data[0].above[i]);
        var sat_list = data[0].above[i]
        // var earth_coors = [data[0].above[i].satlat, data[0].above[i].satlng]
        var sat_name = data[0].above[i].satname
        var ldate = data[0].above[i].launchDate
                  
        if (sat_list){

          // console.log(sat_list);
          // console.log(sat_name);
          // console.log(ldate)

            var marker = L.marker([sat_list.satlat, sat_list.satlng], {icon: myIcon}).addTo(myMap)
            marker.bindPopup('<strong> Satellite Name: '+ sat_name + '</strong><hr> Launch Date: ' + ldate)
            // var marker2 = L.marker([sat_list.satlat, sat_list.satlng]).addTo(myMap)
            // marker2.bindPopup('<strong> Satellite Name: '+ sat_name + '</strong><hr> Launch Date: ' + ldate)
             marker.openPopup();
        }}
    
});


