var  url =  window.location.href;
var num = url.indexOf('classes/'); //get index of before classes
var courseClass = url.slice(num + 8);
console.log(courseClass);
//console.log(data.length);

var storedData = [];

queue()
  .defer(d3.json, "../classesdata/" + courseClass)
  .await(graphData);


var margin = {top: 30, right: 20, bottom: 30, left: 50},
width = 600 - margin.left - margin.right,
height = 270 - margin.top - margin.bottom;
// 2017-10-09T19:01:00.000Z

var parseDate = d3.utcParse("%Y-%m-%dT%H:%M:%S.%LZ");
var bisectDate = d3.bisector(function (d) { return parseDate(d.timestamp); }).left;

var svg = d3.select("#chart");

// getData();
//
// function getData() {
//   Data
//   .find()
//   .sort()
//   .exec(function (err, docs) {
//     if(err) return console.error(err);
//     else {
//         data = docs; //data = docs in database
//         graphData();
//
//     }
//   });
//
// }
// console.log("Hello");

// Set the ranges
function graphData(err, data){
  liveFeedLight(data[0].lightstatus)
  liveFeedHumidity(data[0].humidity)
  liveFeedTemp(data[0].temperature)
  liveFeedOccupancy(data[0].occupancystatus)
  dailyTemp(data)
  dailyHumid(data)
  percentageLights(data)

  console.log(data.length);
  storedData = data;

  // var d = new Date(parseDate(data[0].timestamp));
  // console.log(parseDate(data[0].timestamp).getMonth());


  // graphLight(data);
  // graphHumidity(data);


  var x = d3.time.scale().range([0, width]);
  var y = d3.scale.linear().range([height, 0]);

  // Define the axes
  var xAxis = d3.svg.axis().scale(x)
  .orient("bottom").ticks(5);

  var yAxis = d3.svg.axis().scale(y)
  .orient("left").ticks(5);

  // Define the line
  // var valueline = d3.svg.line()
  // .x(function(d, i) {
  //   // var date = new Date();
  //   // console.log(date.getDate()  );
  //   return x(parseDate(d.timestamp));
  // })
  // .y(function(d) { return y(d.temperature); });

  // Adds the svg canvas
  var svg = d3.select("#chart")
  .append("svg")
  .attr("id", "bigGraph")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform",
  "translate(" + margin.left + "," + margin.top + ")");

  // d3.csv("/javascripts/energy.csv", function(error, data) { //indentation?
  //     data.forEach(function(d) {
  //         d.date  = parseDate(d.date);
  //         d.close = +d.close;
  //     });
  //
  // Scale the range of the data
  x.domain(d3.extent(data, function(d) {
    return parseDate(d.timestamp); }));
  y.domain([0, d3.max(data, function(d) { return d.temperature; })]);

  // Add the valueline path.
  var xValue = function (d) { return (parseDate(d.timestamp))};
  var yValue = function (d) { return (d.temperature)};

  var tooltip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

  svg.selectAll(".dot")
      .data(data)
    .enter().append("circle")
      .attr("class", "dot")
      .attr("r", 5.5)
      .attr("cx", function(d) { return x(parseDate(d.timestamp))})
      .attr("cy", function(d) { return y(d.temperature)})
      .style("fill", "blue")
      .style("stroke", "black")
      .on("mouseover", function(d) {
        console.log(d.timestamp);
          tooltip.transition()
               .duration(200)
               .style("opacity", .9);
          tooltip.html(xValue(d)
	        + ", " + yValue(d) + ")")
               .style("left", (d3.event.pageX + 5) + "px")
               .style("top", (d3.event.pageY - 28) + "px");
      })
      .on("mouseout", function(d) {
          tooltip.transition()
               .duration(500)
               .style("opacity", 0);
      });

  // svg.append("path")
  // .attr("class", "line")
  // .attr("d", valueline(data))
  // .attr("stroke", "#000000")
  // .attr("fill", "none");

  // Add the X Axis
  svg.append("g")
  .attr("class", "xaxis")
  .attr("transform", "translate(0," + height + ")")
  .call(xAxis);

  // Add the Y Axis
  svg.append("g")
  .attr("class", "yaxis")
  .call(yAxis);

  svg.append("text")
  .attr("transform", "rotate(-90)")
  .attr("y", 0 - margin.left)
  .attr("x",0 - (height / 2))
  .attr("dy", "1em")
  .style("text-anchor", "middle")
  .attr("class", "yAxisLabel")
  .text("Temperature(F°)");

  svg.append("text")
  .attr("transform",
        "translate(" + (width/2) + " ," +
                       (height + margin.top + 20) + ")")
  .style("text-anchor", "middle")
  .text("Date");

  var focus = svg.append("g")
      .attr("class", "focus")
      .style("display", "none");

  focus.append("circle")
      .attr("r", 4.5);

  focus.append("text")
      .attr("x", 9)
      .attr("dy", ".35em");

  // svg.append("rect")
  //     .attr("class", "overlay")
  //     .attr("width", width)
  //     .attr("height", height)
  //     .on("mouseover", function () { focus.style("display", null); })
  //     .on("mouseout", function () { focus.style("display", "none"); })
  //     .on("mousemove", mousemove);

  // function mousemove() {
  //     var x0 = x.invert(d3.mouse(this)[0]),
  //         i = bisectDate(data, x0, 1),
  //         d0 = data[i - 1],
  //         d1 = data[i],
  //         d = x0 - d0.timestamp > d1.timestamp - x0 ? d1 : d0;
  //     focus.attr("transform", "translate(" + x(parseDate(d.timestamp)) + "," + y(d.temperature) + ")");
  //     focus.select("text").text((d.temperature));
  // }

  // });
}

function graphTemp() {
  // console.log(data);

  data = storedData;

  var x = d3.time.scale().range([0, width]);
  var y = d3.scale.linear().range([height, 0]);

  // Define the axes
  var xAxis = d3.svg.axis().scale(x)
  .orient("bottom").ticks(5);

  var yAxis = d3.svg.axis().scale(y)
  .orient("left").ticks(5);

  // Define the line
  // var valueline = d3.svg.line()
  // .x(function(d, i) {
  //   var date = new Date();
  //   console.log(date.getDate()  );
  //   return x(parseDate(d.timestamp));
  // })
  // .y(function(d) { return y(d.temperature); });

  var xValue = function (d) { return (parseDate(d.timestamp))};
  var yValue = function (d) { return (d.temperature)};

  var tooltip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

  svg.selectAll(".dot")
      .data(data)
    .enter().append("circle")
      .attr("class", "dot")
      .attr("r", 5.5)
      .attr("cx", function(d) { return x(parseDate(d.timestamp))})
      .attr("cy", function(d) { return y(d.temperature)})
      .style("fill", "blue")
      .style("stroke", "black")
      .on("mouseover", function(d) {
        console.log(d.timestamp);
          tooltip.transition()
               .duration(200)
               .style("opacity", .9);
          tooltip.html(xValue(d)
	        + ", " + yValue(d) + ")")
               .style("left", (d3.event.pageX + 5) + "px")
               .style("top", (d3.event.pageY - 28) + "px");
      })
      .on("mouseout", function(d) {
          tooltip.transition()
               .duration(500)
               .style("opacity", 0);
      });




  // Adds the svg canvas

  // d3.csv("/javascripts/energy.csv", function(error, data) { //indentation?
  //     data.forEach(function(d) {
  //         d.date  = parseDate(d.date);
  //         d.close = +d.close;
  //     });
  //
  // Scale the range of the data
  x.domain(d3.extent(data, function(d) {
    return parseDate(d.timestamp); }));
  y.domain([0, d3.max(data, function(d) { return d.temperature; })]);

  // Add the valueline path.
  svg.select("path.line")
  .attr("d", valueline(data))

  // Add the X Axis
  svg.select(".xaxis")
  .call(xAxis);

  // Add the Y Axis
  svg.select(".yaxis")
  .call(yAxis);

  svg.select(".yAxisLabel")
  .text("Temperature(°F)");

  // svg.append("text")
  // .attr("transform",
  //       "translate(" + (width/2) + " ," +
  //                      (height + margin.top + 20) + ")")
  // .style("text-anchor", "middle")
  // .text("Date");

}

function graphHumidity() {

  data = storedData;

  var x = d3.time.scale().range([0, width]);
  var y = d3.scale.linear().range([height, 0]);

  // Define the axes
  var xAxis = d3.svg.axis().scale(x)
  .orient("bottom").ticks(5);

  var yAxis = d3.svg.axis().scale(y)
  .orient("left").ticks(5);

  //Define the line
  var valueline = d3.svg.line()
  .x(function(d, i) {
    // var date = new Date();
    // console.log(date.getDate()  );
    return x(parseDate(d.timestamp));
  })
  .y(function(d) { return y(d.humidity); });


    var xValue = function (d) { return (parseDate(d.timestamp))};
    var yValue = function (d) { return (d.humidity)};

    var tooltip = d3.select("body").append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);

    svg.selectAll(".dot")
        .data(data)
      .enter().append("circle")
        .attr("class", "dot")
        .attr("r", 5.5)
        .attr("cx", function(d) { return x(parseDate(d.timestamp))})
        .attr("cy", function(d) { return y(d.humidity)})
        .style("fill", "blue")
        .style("stroke", "black")
        .on("mouseover", function(d) {
          console.log(d.timestamp);
            tooltip.transition()
                 .duration(200)
                 .style("opacity", .9);
            tooltip.html(xValue(d)
  	        + ", " + yValue(d) + ")")
                 .style("left", (d3.event.pageX + 5) + "px")
                 .style("top", (d3.event.pageY - 28) + "px");
        })
        .on("mouseout", function(d) {
            tooltip.transition()
                 .duration(500)
                 .style("opacity", 0);
        });

  // Adds the svg canvas

  // d3.csv("/javascripts/energy.csv", function(error, data) { //indentation?
  //     data.forEach(function(d) {
  //         d.date  = parseDate(d.date);
  //         d.close = +d.close;
  //     });
  //
  // Scale the range of the data
  x.domain(d3.extent(data, function(d) {
    return parseDate(d.timestamp); }));
  y.domain([0, d3.max(data, function(d) { return d.humidity; })]);

  // Add the valueline path.
  svg.select("path.line")
  .attr("d", valueline(data))

  // Add the X Axis
  svg.select(".xaxis")
  .call(xAxis);

  // Add the Y Axis
  svg.select(".yaxis")
  .call(yAxis);

  svg.select(".yAxisLabel")
  .text("Humidity(%)");

  // svg.append("text")
  // .attr("transform",
  //       "translate(" + (width/2) + " ," +
  //                      (height + margin.top + 20) + ")")
  // .style("text-anchor", "middle")
  // .text("Date");

}

function dailyTemp(data) {

  var today = new Date();
  console.log(today)
  var docDate = parseDate(data[0].timestamp);

  var sumTemp = 0;
  var numDocs = 0;


  while (docDate.getMonth() == today.getMonth() && docDate.getDate() == today.getDate() && docDate.getFullYear() == today.getFullYear()) {
      sumTemp += data[numDocs].temperature;
      numDocs ++;

      docDate = parseDate(data[numDocs].timestamp)

  }
  var AverageTemp = (sumTemp/numDocs)
   console.log(sumTemp/numDocs);


   d3.select("#AverageTemp")
   .html(Math.round(AverageTemp*100) / 100)



 }

 function occupiedPressed() {
    d3.select("#occupancylf")
    .html("Occupied")
 }


function dailyHumid(data) {

  var today = new Date();
  console.log(today)
  var docDate = parseDate(data[0].timestamp);

  var sumHumidity = 0;
  var numDocs = 0;

  while (docDate.getMonth() == today.getMonth() && docDate.getDate() == today.getDate() && docDate.getFullYear() == today.getFullYear()) {
      sumHumidity += data[numDocs].humidity;
      numDocs ++;

      docDate = parseDate(data[numDocs].timestamp);

  }
  var AverageHumidity = (sumHumidity/numDocs)
   console.log(sumHumidity/numDocs);

   d3.select("#averageHumid")
   .html(Math.round(AverageHumidity*100) / 100)

}

function percentageLights(data) {

  var timeOn = 0;
  var numDocs = 0;

  var today = new Date();
  console.log(today)
  var docDate = parseDate(data[0].timestamp);

  while (docDate.getMonth() == today.getMonth() && docDate.getDate() == today.getDate() && docDate.getFullYear() == today.getFullYear()) {


    if (data[numDocs].lightstatus == "on") {
      timeOn ++;
    }

    numDocs ++;

    docDate = parseDate(data[numDocs].timestamp);

  }

  console.log(timeOn/numDocs);

  percentOn = (timeOn/numDocs);

  timePassed = parseDate(data[0].timestamp);

  // console.log(timePassed);
  timePassedHours = timePassed.getHours() * 60 //converts to minutes
  timePassedMinutes = timePassed.getMinutes();
  totalTimePassed = timePassedHours + timePassedMinutes //sum of minutes

  totalTimeLightsOn = (percentOn * totalTimePassed) / 60//in terms of hours

  //milliseconds since 12am 2/6


  console.log(totalTimePassed); //sum of total minutes data has been collected
  console.log(totalTimeLightsOn); //takes percentage of time to give amount of time on in hours

  var wattsPerBulb = 60;
  kWHUsed = ((wattsPerBulb*totalTimeLightsOn) / 1000);  //kwh in 1 day for 1 bulb
  kWHUsedSum = kWHUsed * 36;
  var costPerKWH = 0.12;
  costPerDay = (kWHUsed * costPerKWH) * 36; //36 lightbulb

  console.log(kWHUsed);
  console.log(kWHUsedSum);
  console.log(costPerDay);


  // hoursOn = timePassedToday * percentOn

  // console.log(hoursOn);


}

function liveFeedLight(lightLvL) {
  d3.select("#lightlf")
  .html(lightLvL)
}

function liveFeedHumidity(HumidityLvL) {
  d3.select("#humiditylf")
  .html(HumidityLvL)
}

function liveFeedTemp(TempLvL) {
  d3.select("#templf")
  .html(TempLvL)
}

function liveFeedOccupancy(OccupancyLvL) {
  d3.select("#occupancylf")
  .html(OccupancyLvL)
}
