/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var margin = {top: 5, right: 60, bottom: 15, left: 100},
    width = 450 - margin.left - margin.right,
    height = 35 - margin.top - margin.bottom;
    
// text of measurement is 40 right to the bar
var textposition = width + 40;

// indicator is 15 right to the text
var indicatorposition = textposition + 15;

var chart = d3.bullet()
    .width(width)
    .height(height);

d3.json("data/bulletsdata.json", function(error, data) {
  var svg = d3.select("#bloodchartposition").selectAll("svg")
      .data(data)
    .enter().append("svg")
      .attr("class", "bullet")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
      .call(chart);
      
//add title
  var title = svg.append("g")
      .style("text-anchor", "end")
      .attr("transform", "translate(-6," + height / 2 + ")");

  title.append("text")
      .attr("class", "title")
      .text(function(d) { return d.title; });

 //add subtitle
  title.append("text")
      .attr("class", "subtitle")
      .attr("dy", "1em")
      .text(function(d) { return d.subtitle; });
      
//present number at the end of each bullet      
  title.append("text")
        .attr("class","measurevalue")
//        .attr("transform", "translate(340," + height / 2 + ")")
        .attr("transform", "translate(" + textposition+ "," + height / 2 + ")")
        .text(function(d) { return d.measures; });

//if measure is above the normal range, add a red indicator
//TODO: if indicator then red dot
  title.append("circle")
        .attr("r",8)
        .style("fill","red")
//      .attr("transform", "translate(345," + height / 2 + ")");     
        .attr("transform", "translate(" + indicatorposition + "," + 0 + ")");



  d3.selectAll("button").on("click", function() {
    svg.datum(randomize).call(chart.duration(1000)); // TODO automatic transition
  });
});

/*
* random data source
 */
 
function randomize(d) {
  if (!d.randomizer) d.randomizer = randomizer(d);
  d.ranges = d.ranges.map(d.randomizer);
  d.markers = d.markers.map(d.randomizer);
  d.measures = d.measures.map(d.randomizer);
  return d;
}

function randomizer(d) {
  var k = d3.max(d.ranges) * .2;
  return function(d) {
    return Math.max(0, d + k * (Math.random() - .5));
  };
}