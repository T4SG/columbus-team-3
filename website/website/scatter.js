var margin = {top: 100, right: 50, bottom: 200, left: 50};
var width = 500 - margin.left - margin.right;
var height = 700 - margin.top - margin.bottom;

// pre-cursors
var sizeForCircle = function(d) {
  return 5;
}

// setup x
var xValue = function(d) { return d["Date"];}, // data -> value
    xScale = d3.scale.linear().range([0, width]), // value -> display
    xMap = function(d) { return xScale(xValue(d));}, // data -> display
    xAxis = d3.svg.axis().scale(xScale).orient("bottom");

// setup y
var yValue = function(d) { return d["Attendance"];}, // data -> value
    yScale = d3.scale.linear().range([height, 0]), // value -> display
    yMap = function(d) { return yScale(yValue(d));}, // data -> display
    yAxis = d3.svg.axis().scale(yScale).orient("left");

// setup fill color
var cValue = function(d) { return d.School;},
    color = d3.scale.category20();


/* Setting the range for X */
    var x = d3.scale.ordinal()
        .rangeRoundBands([0, width], .1);
    /* Setting the range for Y */
    var y = d3.scale.linear()
        .range([height, 0]);
    /* Creating the X Axis */
    var xAxisBar = d3.svg.axis()
      .scale(x)
      .orient("bottom");
    /* Creating the Y Axis */
    var yAxisBar = d3.svg.axis()
        .scale(y)
        .orient("left");

// add the graph canvas to the body of the webpage
var svgScatter = d3.select(".scatterplot").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var svgBar = d3.select(".barchart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// add the tooltip area to the webpage
var tooltip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

// load data
d3.csv("StudentInfo.csv", function(error, data) {

  // change string (from CSV) into number format
  data.forEach(function(d) {
    d["Date"] = +d["Date"];
    d["Attendance"] = +d["Attendance"];
//    console.log(d);
  });


  // console.log(data);

  /* Setting the domain for X and Y */
      x.domain(data.map(function(d) { return d["Grade Level"]; }));
      y.domain([0, d3.max(data, function(d) { return d.Attendance; })]);
      /* Drawing the X and Y axes */
      drawXAxis();
      drawYAxis();
      /* Drawing the Bars */
      drawBars(data);

  // don't want dots overlapping axis, so add in buffer to data domain
  xScale.domain([d3.min(data, xValue)-1, d3.max(data, xValue)+1]);
  yScale.domain([d3.min(data, yValue)-1, d3.max(data, yValue)+1]);

  // x-axis
  svgScatter.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .attr("fill", "white")
      .call(xAxis)
    .append("text")
      .attr("class", "label")
      .attr("x", width)
      .attr("y", -6)
      .attr("fill", "white")
      .style("text-anchor", "end")
      .text("Date");

  // y-axis
  svgScatter.append("g")
      .attr("class", "y axis")
      .attr("fill", "white")
      .call(yAxis)
    .append("text")
      .attr("class", "label")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .attr("fill", "white")
      .style("text-anchor", "end")
      .text("Attendance");

  // draw dots
  svgScatter.selectAll(".dot")
      .data(data)
      .enter().append("circle")
      .attr("class", "dot")
      .attr("r", sizeForCircle)
      .attr("cx", xMap)
      .attr("cy", yMap)
      .style("fill", function(d) { return color(cValue(d));})
      .on("click", function (d) {
        // console.log(d);
          filterBars(d.Attendance);
      })
      .on("mouseover", function(d) {

          // show the tool tip
          tooltip.transition()
               .duration(200)
               .style("opacity", .75);

          // fill to the tool tip with the appropriate data
          tooltip.html("<strong>" + d["UID"] + "</strong><br/>Date: " + xValue(d)
          + "<br/>Attendance: " + yValue(d) + "")
               .style("left", (d3.event.pageX + 5) + "px")
               .style("top", (d3.event.pageY - 28) + "px");


      })
      .on("mouseout", function(d) {
          // hide the tooltip
          tooltip.transition()
               .duration(500)
               .style("opacity", 0);
      });

  // draw legend
  var legend = svgScatter.selectAll(".legend")
      .data(color.domain())
    .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function(d, i) { return "translate(0," + ((i * 20) + 280)  + ")"; });

  // draw legend colored rectangles
  legend.append("rect")
      .attr("x", width - 18)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", color);

  // draw legend text
  legend.append("text")
      .attr("x", width - 24)
      .attr("y", 9)
      .attr("dy", ".35em")
      .attr("fill", "white")
      .style("text-anchor", "end")
      .text(function(d) { return d;});
});


function filterNegativeValues(datum) {
    return datum["Attendance"] >= 0 && datum["Date"] >= 0;
}

function drawXAxis(){
  svgBar.append("g")
      .attr("class", "x axis")
      .attr("fill", "white")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxisBar)
       .selectAll("text")
    .attr("y", 0)
    .attr("x", -35)
    .attr("transform", "rotate(-70)");
}

function drawYAxis() {
  svgBar.append("g")
      .attr("class", "y axis")
      .attr("fill", "white")
      .call(yAxisBar)
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", 9)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Attendance");
}

function drawBars(data) {

  // console.log(data);

  var averages = d3.nest()
      .key(function(d) { return d["Grade Level"]; })
      .rollup(function(test) {
        return d3.mean(test, function(d) {
          return d.Attendance;
        });
      })
      .entries(data);
  // console.log(averages);


  svgBar.selectAll(".bar")
      .data(averages)
      .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.key); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.values); })
      .attr("height", function(d) { return height - y(d.values); })
      .on("click", function(d) {
          filterDots(d.key);
      });


}

function filterBars(cals) {
      // console.log(cals);
      svgBar.selectAll(".bar")
         .transition()
         .duration( 1000 )
         .delay(function(d) { return Math.random() * 500;} )
         .style("fill", "#FFFF66");
      svgBar.selectAll(".bar")
         .filter(function(d) { return d.values > cals; })
         .transition()
         .duration( 1000 )
         .delay(function(d) { return Math.random() * 500;} )
         .style("fill", "#FF6699");
}

function filterDots(School) {
      svgScatter.selectAll(".dot")
         .transition()
         .duration( 1000 )
         .delay(function(d) { return Math.random() * 500;} )
         .style("opacity", 1);
      svgScatter.selectAll(".dot")
         .filter(function(d) { return d.School != School; })
         .transition()
         .duration( 1000 )
         .delay(function(d) { return Math.random() * 500;} )
         .style("opacity", 0.15);
    }