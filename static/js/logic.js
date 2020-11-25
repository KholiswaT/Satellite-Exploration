// Store endpoint inside queryUrl

queryUrl = "https://api.n2yo.com/rest/v1/satellite/positions/43719/40.0583/74.4057/0/1/&apiKey=87BK3U-D8QTDU-BVBZ4W-4LL1";
console.log(queryUrl)
// fetch(queryUrl)
//   .then(data => console.log(info));
// Fetch the JSON data and console log it
// d3.json(url).then(function(data) {
//   console.log(data);
// });
// // // Promise Pending
// const dataPromise = d3.json(url);
// console.log("Data Promise: ", dataPromise);


// // Perform a GET request to the query URL
d3.json(queryUrl,{mode:'cors', credentials:'include'}).then(function(data) {
  // send the data.features object to the createFeatures function
  createFeatures(data.positions);
  console.log(data.positions)
});
// d3.json(queryUrl, function(error, json) {
//   if (error) return console.warn(error);
//   data = json;
//   visualizeit();
// });
//}

// https://api.n2yo.com/rest/v1/satellite/positions/25544/41.702/-76.014/0/100/&apiKey=87BK3U-D8QTDU-BVBZ4W-4LL1

