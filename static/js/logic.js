// Store endpoint inside queryUrl
var queryUrl = "https://api.n2yo.com/rest/v1/satellite/above/41.702/-76.014/0/90/6/&apiKey=87BK3U-D8QTDU-BVBZ4W-4LL1";

// Perform a GET request to the query URL
d3.json(queryUrl, function(data) {
  // send the data.features object to the createFeatures function
  createFeatures(data.features);
  console.log(data.features)
});

// function createFeatures(earthquakeData) {

//   // Define function to run once for each feature in the features array
//   // Give each feature a popup describing the place, time and magnitude of the earthquake
//   function onEachFeature(feature, layer) {
//     layer.bindPopup("<h3>" + feature.properties.place +
//     "</h3><hr><p>" + new Date(feature.properties.time) + "</p>" +
//     "</h3><hr><p>Magnitude:" +(feature.properties.mag) +"</p>" );
//   }
//}