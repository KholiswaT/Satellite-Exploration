var geoData = "/app.geojson";
var geojson;

// Grab data with d3
d3.json(geoData, function(data) {
    console.log(data)

    // Create a new choropleth layer
    geojson = L.map(data, {
  
      // Define what  property in the features to use
      valueProperty: "info",

        // Set color scale
    scale: ["#ffffb2", "#b10026"],

    // Number of breaks in step range
    steps: 10,

    // q for quartile, e for equidistant, k for k-means
    mode: "q",
    style: {
      // Border color
      color: "#fff",
      weight: 1,
      fillOpacity: 0.8
    },

    // Binding a pop-up to each layer
    onEachFeature: function(info, layer) {
      layer.bindPopup("Zip Code: " + position.satlatitude + "<br>Median Household Income:<br>" +
        "$" + info.position.satlatitude);
    }
  }).addTo(myMap);
})
  

