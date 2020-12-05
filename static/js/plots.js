// Use D3 fetch to read the JSON file
// The data from the JSON file is arbitrarily named importedData as the argument
d3.json("satlaunch90.json").then((importedData) => {
    console.log(importedData);
    var data = importedData[0].above;

 
    for (var i = 0; i < importedData[0].above.length; i++){
        // console.log(data[0].above[i]);
        var sat_list = importedData[0].above[i]
        var sat_name = importedData[0].above[i].satname
        var ldate = importedData[0].above[i].launchDate
      
  
      var trace1 = {
        type: "scatter",
        mode: "lines",
        name: name,
        x: launchDate,
        y: satname,
        line: {
          color: "#17BECF"
        }
      };
  
      var data = [trace1];
  
      var layout = {
        title: `${satellites} date launched`,
        xaxis: {
          range: [],
          type: "date"
        },
        yaxis: {
          autorange: true,
          type: "linear"
        }
      };
  
      Plotly.newPlot("plot", data, layout);
    }})
