// Create map & boundaries
var myMap = L.map("map", {
    center: [20, 0],
    zoom: 0,
    minZoom: 0
  });
  
  // Adding a base layer for map
  L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 10,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(myMap);

  // Store API in newly created variable
var satellite = "/app.geojson";

//  Call variable and retrieve satellite data
d3.json(satellite, function(data) {

   
    for (var i = 0; i < data.length; i++){

        var coordinates = [data[i].positions[0].satlatitude, data[i].positions[0].satlongitude]
        
        if (coordinates){
            L.marker(coordinates).addTo(myMap)
            console.log(coordinates)
        }}
    
});


