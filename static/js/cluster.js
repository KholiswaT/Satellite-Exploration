
// Creating map object
var myMap = L.map("map", {
  center: [40.54055668158878, -104.35709913347607],
  zoom: 2
});

// Adding tile layer to the map
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",{
  attribution:"<a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(myMap);

var data ="/static/data/Satellite-Exploration-CSV.csv"
d3.csv(data, function(response) {
  var markers = L.markerClusterGroup();
   //console.log(response);
   response.forEach(function(response){
    markers.addLayer(L.marker([+response.LSlat, +response.LSlong])
    .bindPopup("Satellite Name:" + response.name + "<br></br> Country:"+ response.source))
    })
    myMap.addLayer(markers)
    })
