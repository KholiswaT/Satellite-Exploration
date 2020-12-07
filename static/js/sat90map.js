// Adding a base layer for map
var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
})

var layers = {
    Under_10K : new L.LayerGroup(),
    From_10Kto50K : new L.LayerGroup(),
    From_50Kto100K : new L.LayerGroup(),
    Above_100K: new L.LayerGroup()
    
};
// // Create map & boundaries
var myMap = L.map("map", {
    center: [40.54055668158878, -104.35709913347607],
    zoom: 2,
    layers: [
        layers.Under_10K,
        layers.From_10Kto50K,
        layers.From_50Kto100K,
        layers.Above_100K,
    ]
});

lightmap.addTo(myMap);

var overlays = {
    "Altitude under 10,000": layers.Under_10K,
    "Altitude between 10,000 and 50,0000": layers.From_10Kto50K,
    "Altitude bewtween 50,000 to 100,000":layers.From_50Kto100K,
    "Altitude above 100,000": layers.Above_100K
};

L.control.layers(null, overlays).addTo(myMap)

var info = L.control({
    position: "bottomright"
});

info.onAdd = function(){
    var div= L.DomUtil.create("div", "legend");
    return div;
}

info.addTo(myMap);
// // var green_circle =  L.icon({
// //     iconUrl: '/images/green_circle.png',
// //     iconSize:     [38, 95], // size of the icon
// //     iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
// //     popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
// // });

// // var yellow_circle =L.icon({
// //     iconUrl: '/images/yellow_circle.png',
// //     iconSize:     [38, 95], // size of the icon
// //     iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
// //     popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
// // });

// // var orange_circle =L.icon({
// //     iconUrl: '/images/orange_circle.png',
// //     iconSize:     [38, 95], // size of the icon
// //     iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
// //     popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
// // });

// // var red_circle = L.icon({
// //     iconUrl: '/images/red_circle.png',
// //     iconSize:     [38, 95], // size of the icon
// //     iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
// //     popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
// // });



// // var icons = {
// //     Under_500K: L.ExtraMarkers.icon({
// //         icon: "circle-green",
// //         iconColor: "green",
// //     }),
// //     From_500Kto1mil: L.ExtraMarkers.icon({
// //         icon: "circle-yellow",
// //         iconColor: "yellow",
// //         markerColor:"yellow",
// //         shape:"circle"
// //     }),
// //     From_1milto500mil: L.ExtraMarkers.icon({
// //         icon: "circle-orange",
// //         iconColor: "orange",
// //         markerColor:"orange",
// //         shape:"circle"
// //     }),
// //     Above_500mil: L.ExtraMarkers.icon({
// //         icon: "circle-red",
// //         iconColor: "red",
// //         markerColor:"red",
// //         shape:"circle"
// //     })
// // };



d3.json("/satlaunch90.json", function(data){
    var updates;
    var updatesCount = {
        Under_10K: [],
        From_10Kto50K: [],
        From_50Kto100k: [],
        Above_100k: [],
      };
    

    for (var i = 0; i < data[0].above.length; i++){
       // console.log(data[0].above[i]);
       
        var earth_coor = [data[0].above[i].satlat, data[0].above[i].satlng]
        var sat_alt = [data[0].above[i].satalt]/1000
        console.log(sat_alt)
        var color= "";
        if (sat_alt <= 10){
            updates= "Under_10K"
            color = "green"
            opac=0.5;
        }
        else if(sat_alt <= 50){
            updates= "From_10Kto50K"
            color ="yellow"
            opac=0.5;
        }
        else if(sat_alt <= 100){
            updates = "From_50Kto100K"
            color="orange"
            opac=0.5;
        }
        else {
            updates = "Above_100K"
            color="red"
            opac=0.5;
        }
       
    updatesCount[updates]++;
    console.log(updates)
  
    // var newMarker =L.circle(earth_coor, {
    //     fillOpacity: opac,
    //     color: "white",
    //     fillColor: color,
    //     radius: (sat_alt)/10000000
    // }).bindPopup("Satellite Name:" + data[0].above[i].satname + "<br>Altitude:</br>" + data[0].above[i].satalt)


    var newMarker= L.circle(earth_coor, {radius: (sat_alt), fillColor: color, fillOpacity: opac });
    newMarker.addTo(layers[updates])
    newMarker.bindPopup("Satellite Name:" + data[0].above[i].satname + "<br>Altitude:</br>" + data[0].above[i].satalt)
    
    
    }
})

// d3.json("/satlaunch90.geojson", function(data){
//     createFeatures(data[0].above);
//     //console.log(data[0].above)
//     for (var i = 0; i < data[0].above.length; i++){
//         var earth_coor = [data[0].above[i].satlat, data[0].above[i].satlng] 
//         var altitude = data[0].above[i].satalt
//         var satname =data[0].above[i].satname
//     //console.log(altitude)
// }
// })

// function createFeatures(satelliteData){
//     function onEachFeature(above, layer){
//         layer.bindPopup("Satellite Name:" + satname + "<br>Altitude:</br>" + altitude)
//     }
// function radiusSize(altitude){
//     return altitude /100000000
// }

// function circleColor(altitude){
//     if (altitude < 500000){
//         return "green"
//     }
//     else if (altitude < 1000000){
//         return "yellow"
//     }
//     else if (altitude < 500000000){
//         return "orange"
//     }
//     else {
//         return "red"
//     }
// }

// var satellites = L.geoJSON(satelliteData, {
//     pointToLayer: function (satelliteData, earth_coor){
//         return L.circle (earth_coor, {
//             radius: radiusSize(altitude),
//             color: circleColor(altitude),
//             fillOpacity: .5
//         })
//     },
//     onEachFeature: onEachFeature
// })

// createMap(satellites);

// function createMap (satellites) {
//     var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
//         attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
//         tileSize: 512,
//         maxZoom: 18,
//         zoomOffset: -1,
//         id: "mapbox/streets-v11",
//         accessToken: API_KEY
//     })

//     var baseMap = {
//         "Light Map": lightmap
//     }

//     var overlayMaps = {
//         Satellites: satellites
//     }

//     var myMap = L.map("map", {
//         center: [40.54055668158878, -104.35709913347607],
//         zoom: 2,
//         layers: [lightmap, satellites]

//     });
// }
// }   