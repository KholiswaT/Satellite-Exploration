
// Use D3 fetch to read the JSON file
// The data from the JSON file is arbitrarily named importedData as the argument  
d3.json("/satlaunch90.json").then((data) => {
  //console.log(data)
  
  let Before_1970 = 0;
  let From_1970to1980 =0;
  let From_1980to1990=0;
  let From_1990to2000 =0;
  let From_2000to2010 =0;
  let From_2010toNow=0;
  // var Before_1970 = []
  // var From_1970to1980=[]
  // var From_1980to1990= []
  // var From_1990to2000= []
  // var From_2000to2010= []
  // var From_2010toNow= []
  for (let i = 0; i < data[0].above.length; i++) {
   
  // for (var i = 0; i < data[0].above.length; i++){
  //     console.log(data[0].above[i]);
    years = [data[0].above[i].launchDate]
      //console.log(years)
      
  var years2 = years[0].slice(0,4)
    //console.log(years2)
    if (years2 <= "1970"){
      //Before_1970.push(years2)
      Before_1970++;
      }
    else if(years2 <= "1980"){
      //From_1970to1980.push(years2)
      From_1970to1980++;
    }
    else if(years2 <= "1990"){
      //From_1980to1990.push(years2)
      From_1980to1990++;
      
    }
    else if(years2 <= "2000"){
      //From_1990to2000.push(years2)
      From_1990to2000++;
    }
    else if(years2 <= "2010"){
     // From_2000to2010.push(years2)
      From_2000to2010++;
    }
    else {
      //From_2010toNow.push(years2)
      From_2010toNow++;
    }
  }
  console.log('Satellites before 1970:' + Before_1970)
  console.log('Satellites between 1970 and 1980:' + From_1970to1980)
  console.log('Satellites between 1980 and 1990:' + From_1980to1990)
  console.log('Satellites between 1990 and 2000:' + From_1990to2000)
  console.log('Satellites between 2000 and 2010:' + From_2000to2010)
  console.log('Satellites after 2010:' + From_2010toNow)

// var count = 0;
// for(var i = 0; i < Before_1970.length; ++i){
//     if(Before_1970 <= 1970)
//         count++;
//     console.log(count)
  })

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
  
