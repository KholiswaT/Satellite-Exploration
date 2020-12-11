
// Use D3 fetch to read the JSON file
// The data from the JSON file is arbitrarily named importedData as the argument  
d3.json("/static/data/satlaunch90.json").then((data) => {
  //console.log(data)
  
  let Before_1970 = 0;
  let From_1970to1980 =0;
  let From_1980to1990=0;
  let From_1990to2000 =0;
  let From_2000to2010 =0;
  let From_2010toNow=0;

  for (let i = 0; i < data[0].above.length; i++) {
   

    years = [data[0].above[i].launchDate]
      //console.log(years)
      
  var years2 = years[0].slice(0,4)
    //console.log(years2)
    if (years2 <= "1970"){

      Before_1970++;
      }
    else if(years2 <= "1980"){
      From_1970to1980++;
    }
    else if(years2 <= "1990"){
      From_1980to1990++;
      
    }
    else if(years2 <= "2000"){
      From_1990to2000++;
    }
    else if(years2 <= "2010"){
      From_2000to2010++;
    }
    else {
      From_2010toNow++;
    }
  }
  console.log('Launches before 1970:' + Before_1970)
  console.log('Sat launches 1970 - 1980:' + From_1970to1980)
  console.log('Sat launches 1980 - 1990:' + From_1980to1990)
  console.log('Sat launches 1990 - 2000:' + From_1990to2000)
  console.log('Sat launches 2000 - 2010:' + From_2000to2010)
  console.log('Sat Launches after 2010:' + From_2010toNow)

})

   var trace1 = {
     x: ["before 1970", "1970 - 1980", "1980 - 1990","1990 - 2000",
     "2000 - 2010", "after 2010"],
     y: [228, 314, 476, 744, 458, 671],
     type: "bar"
   };
   
   var data = [trace1];

   var layout = {
     title: "Number of Satellite Launches by Decade",
     xaxis: { title: "Date Range"},
     
     yaxis: {range: [2, 800],
   
      title: "Number of Launches"}
   };

   Plotly.newPlot("plot", data, layout);
