// Use D3 fetch to read the JSON file
// The data from the JSON file is arbitrarily named importedData as the argument  
d3.json("/satlaunch90.json").then((data) => {
  console.log(data)
  
  var yearsCount = {
    Before_1970: 0,
    From_1970to1980: 0,
    From_1980to1990: 0,
    From_1990to2000: 0,
    From_2000to2010: 0,
    From_2010toNow: 0,
  };
  var years;
  var year_list = []
  for (var i = 0; i < data[0].above.length; i++){
    //console.log(data[0].above[i]);
      years = [data[0].above[i].launchDate]
      console.log(years)
  var dates = years.split('-')
    //console.log(sat_year)
    console.log(dates)
    
//     if (sat_year < 1970-01-01){
//       years= "Before_1970";
//     }
//     else if(sat_year < 1980-01-01){
//         years= "From_1970to1980";
//     }
//     else if(sat_year < 1990-01-01){
//         years = "From_1980to1990";
//     }
//     else if(sat_year < 2000-01-01){
//         years = "From_1990to2000";
//     }
//     else if(sat_year < 2010-01-01){
//         years = "From_2000to2010";
//     }
//     else {
//         years = "From_2010toNow"
//     }
 
// yearsCount[years];
// console.log(years)
}})

    //   var trace1 = {
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
    // }})
