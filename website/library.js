function drawBars(data) {

  /**
   * Play with the D3 filter method and understand how it works.
   *
   **/

   var tooltip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

  svg.selectAll(".bar")
      .data(data)
      .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d["Department"] + d["Course Number"]); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.GPA); })
      .attr("height", function(d) { return height - y(d.GPA); })
      .on("mouseover", function(d) {
          tooltip.transition()
               .duration(200)
               .style("opacity", .75);

          tooltip.html("<strong>" + d["Department"] + " " + d["Course Number"] + "</strong><br/>GPA: " + d["GPA"])
               .style("left", (d3.event.pageX + 5) + "px")
               .style("top", (d3.event.pageY - 28) + "px");
      })
      .on("mouseout", function(d) {
          // hide the tooltip
          tooltip.transition()
               .duration(500)
               .style("opacity", 0);
      });

}

function drawXAxis(){
  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
       .selectAll("text")
    .attr("y", 0)
    .attr("x", -35)
    .attr("transform", "rotate(-70)");
}

function drawYAxis() {
  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", 9)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("GPA");
}

/**
 * Create a preprocessing filter method to remove data for
 * the Department B from the data set
 *
 **/


/**
 * Supporting the onclick event, write a function that can filter data
 * using the already bound DOM elements, and change the bar's height back
 * to zero.
 *
 **/
function filterGPA(gpa) {
  svg.selectAll(".bar")
      .filter(function(d) { return d.GPA >= gpa; })
      .transition()
      .duration( 1000 )
      .style("fill","red");
}
