var data

function addMarkers() {
  data.forEach(function(d) {
    var marker = L.circleMarker([+d.lat, +d.long]);
    marker.addTo(myMap);
  })
}
// Creating map object
var myMap = L.map("map", {
  center: [40.54055668158878, -104.35709913347607],
  zoom: 2
});

// Adding tile layer to the map
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(myMap);


//Read data from CSV
d3.csv("../../data/Satellite-Exploration-CSV.csv", function(csv) {
  console.log(csv);
  data = csv;
  addMarkers();
})


//Store endpoint inside queryUrl
//Fetch the JSON data and console log it
//d3.json("../../app.json", function(data) {
  //console.log(data);
//})
