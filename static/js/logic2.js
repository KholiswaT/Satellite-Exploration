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
  // Grab the data with d3
  
  var data = 'data/Satellite-Exploration-CSV.csv'
  
    // Create a new marker cluster group
  var markers = L.markerClusterGroup();
  
  
   // Add a new marker to the cluster group and bind a pop-up
    markers.addLayer(L.marker([[+data.lat, +data.long]])
          );
  
    // Add our marker cluster layer to the map
    myMap.addLayer(markers);
  
