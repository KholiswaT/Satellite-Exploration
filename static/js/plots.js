
// Use D3 fetch to read the JSON file
// The data from the JSON file is arbitrarily named importedData as the argument  
d3.json("/satlaunch90.json").then((data) => {
  //console.log(data)
  
  var yearsCount = {
    Before_1970: 0,
    From_1970to1980: 0,
    From_1980to1990: 0,
    From_1990to2000: 0,
    From_2000to2010: 0,
    From_2010toNow: 0,
  };
  var years = []
  var year_list = []
  for (var i = 0; i < data[0].above.length; i++){
      //console.log(data[0].above[i]);
    years = [data[0].above[i].launchDate]
      console.log(years)
      
  var years2 = years[0].slice(0,4)
    console.log(years2)
   
 
//    if (years2 <= "1970"){
//           yearsCount.append.Before_1970;
//       }
//     else if(years <= "1980"){
//           yearsCount= "From_1970to1980";
//     }
//     else if(years <= "1990"){
//           yearsCount = "From_1980to1990";
//     }
//     else if(years < "2000"){
//           yearsCount = "From_1990to2000";
//     }
//     else if(years < "2010"){
//         yearsCount = "From_2000to2010";
//     }
//     else {
//         yearsCount = "From_2010toNow"
//     }
 
// console.log(yearsCount)
// }})

//     //   var trace1 = {
    //     type: "scatter",
    //     mode: "lines",
    //     name: name,
    //     x: launchDate,
    //     y: satname,
    //     line: {
    //       color: "#17BECF"
    //     }
    //   };
  
    //   var data = [trace1];
  
    //   var layout = {
    //     title: `${satellites} date launched`,
    //     xaxis: {
    //       range: [],
    //       type: "date"
    //     },
    //     yaxis: {
    //       autorange: true,
    //       type: "linear"
    //     }
    //   };
  
    //   Plotly.newPlot("plot", data, layout);
    // }}
  }});
