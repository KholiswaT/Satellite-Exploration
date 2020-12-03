//var data

// function addMarkers() {
//   data.forEach(function(d) {
//     var marker = L.circleMarker([+d.lat, +d.long]);
//     marker.addTo(myMap);
//   })
// }
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
// var data ="../../data/Satellite-Exploration-CSV.csv"
// d3.csv(data, function(response) {
//    //console.log(response);
//    response.forEach(function(response){

//     var marker = L.markerClusterGroup([+response.LSlat, +response.LSlong]);
//     marker.addTo(myMap)
//    })
//    }
// );



var data ="../../data/Satellite-Exploration-CSV.csv"
d3.csv(data, function(response) {
  var markers = L.markerClusterGroup();
   //console.log(response);
   response.forEach(function(response){
    markers.addLayer(L.marker([+response.LSlat, +response.LSlong])
    .bindPopup(response.name))
    })
    myMap.addLayer(markers)
    })


//Store endpoint inside queryUrl
//Fetch the JSON data and console log it
//d3.json("../../app.json", function(data) {
  //console.log(data);
//})



  
// function createMap(launchStations) {

//   // Create the tile layer that will be the background of our map
//   var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
//     attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
//     maxZoom: 18,
//     id: "light-v10",
//     accessToken: API_KEY
//   });

//   // Create a baseMaps object to hold the lightmap layer
//   var baseMaps = {
//     "Light Map": lightmap
//   };

//   // Create an overlayMaps object to hold the bikeStations layer
//   var overlayMaps = {
//     "Launch Stations": launchStations
//   };

//   // Create the map object with options
//   var map = L.map("map-id", {
//     center: [40.54055668158878, -104.35709913347607],
//     zoom: 2,
//     layers: [lightmap, launchStations]
//   });

//   // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
//   L.control.layers(baseMaps, overlayMaps, {
//     collapsed: false
//   }).addTo(map);
// }

// function createMarkers(response) {

//   // Pull the "stations" property off of response.data
//   var stations = response.csv.launchsite;

//   // Initialize an array to hold bike markers
//   var launchMarkers = [];

//   // Loop through the stations array
//   for (var index = 0; index < launchsite.length; index++) {
//     var launchsite = launchsite[index];

//     // For each station, create a marker and bind a popup with the station's name
//     var launchMarker = L.marker([data.lat, data.long])
//       .bindPopup("<h3>" + data.name + "<h3><h3>Capacity: " + data.satid + "</h3>");

//     // Add the marker to the bikeMarkers array
//     launchMarkers.push(launchMarker);
//   }

//   // Create a layer group made from the bike markers array, pass it into the createMap function
//   createMap(L.layerGroup(launchMarkers));
// }
// d3.csv("../../data/Satellite-Exploration-CSV.csv", createMarkers);

// d3.csv("../../data/Satellite-Exploration-CSV.csv", function(data){
//   console.log(data)
// })


// // The svg
// var svg = d3.select("svg"),
//     width = +svg.attr("width"),
//     height = +svg.attr("height");

// // Map and projection
// var projection = d3.geoMercator()
//     .scale(85)
//     .translate([width/2, height/2*1.3])

// // A path generator
// var path = d3.geoPath()
//     .projection(projection)

// // Load world shape AND list of connection
// var map = "https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYXNyaXRjYWNlcmVzIiwiYSI6ImNraG1tNGg4MTA3aTAzNW5vZWh6cTF2dGkifQ.tsbu4MHuYjGBwvumnCxJdw"  // World shape
// var data = d3.csv("../../data/Satellite-Exploration-CSV.csv") // Position of circles

// Promise.all([map, data.then(function(values){    
//   // draw map
//       svg.selectAll("path")
//           .data(values[0].features)
//           .enter()
//           .append("path")
//           .attr("class","continent")
//           .attr("d", path),
//   // draw points
//       svg.selectAll("circle")
//           .data(values[1])
//           .enter()
//           .append("circle")
//           .attr("class","circles")
//           .attr("cx", function(d) {return projection([d.LSlat, d.LSlong])[0];})
//           .attr("cy", function(d) {return projection([d.Clat, d.Clong])[1];})
//           .attr("r", "1px") })]);


// function ready(error, dataGeo, data) {

//     // Reformat the list of link. Note that columns in csv file are called long1, long2, lat1, lat2
//     var link = []
//     data.forEach(function(row){
//       source = [+row.LSlat, +row.LSlong]
//       target = [+row.Clat +row.Clong]
//       topush = {type: "LineString", coordinates: [source, target]}
//       link.push(topush)
//     })

//     // Draw the map
//     svg.append("g")
//         .selectAll("path")
//         .data(dataGeo.features)
//         .enter().append("path")
//             .attr("fill", "#b8b8b8")
//             .attr("d", d3.geoPath()
//                 .projection(projection)
//             )
//             .style("stroke", "#fff")
//             .style("stroke-width", 0)

//     // Add the path
//     svg.selectAll("myPath")
//       .data(link)
//       .enter()
//       .append("path")
//         .attr("d", function(d){ return path(d)})
//         .style("fill", "none")
//         .style("stroke", "#69b3a2")
//         .style("stroke-width", 2)

// }