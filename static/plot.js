// Use d3.json() to fetch data from JSON file
// Incoming data is internally referred to as incomingData
//var url = "https://api.n2yo.com/rest/v1/satellite/positions/25544/41.702/-76.014/0/2/&apiKey=J3H9EJ-Z2GE6Y-BC2E6G-4LOF";




// Create the createMap function

// Creating map object

// Adding tile layer

// Load in GeoJson data
//var geoData = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

//var tecPlates = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_plates.json";

//var tecPlates = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json";

var newYorkCoords = [ 32.7488333,-115.814];
var mapZoomLevel = 8;

var myMap = L.map("mapid", {
  center: newYorkCoords,
  zoom: mapZoomLevel
 });

var geojson;
//d3.json(geoData, creaetMarkers);
var satelite =  L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "dark-v10",
  accessToken: "pk.eyJ1IjoicmF2aWNoYW5kcmFuY2hpbm4iLCJhIjoiY2tpYzFhM3g0MDgxZDJ4cnp3aDI5c3lzaiJ9.60Cm0YZ4p4Da0xNUMtxZhA"
  });

var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href=\“https://www.openstreetmap.org/\“>OpenStreetMap</a> contributors, <a href=\“https://creativecommons.org/licenses/by-sa/2.0/\“>CC-BY-SA</a>, Imagery © <a href=\“https://www.mapbox.com/\“>Mapbox</a>",
  maxZoom: 18,
  id: "dark-v10",
  accessToken: API_KEY
});
satelite.addTo(myMap);
