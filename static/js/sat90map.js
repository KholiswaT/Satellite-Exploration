// Adding a base layer for map
var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom:3,
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


d3.json("/static/data/satlaunch90.json", function(data){
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
            
        }
        else if(sat_alt <= 50){
            updates= "From_10Kto50K"
          
        }
        else if(sat_alt <= 100){
            updates = "From_50Kto100K"
            
        }
        else {
            updates = "Above_100K"
            
        }
       
    updatesCount[updates]++;
    console.log(updates)
  
    
    var newMarker= L.circle(earth_coor, {radius: (sat_alt)});
    newMarker.addTo(layers[updates])
    newMarker.bindPopup("Satellite Name:" + data[0].above[i].satname + "<br>Altitude:</br>" + data[0].above[i].satalt)    
    }
});
