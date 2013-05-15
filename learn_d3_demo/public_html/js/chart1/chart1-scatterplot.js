/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
var dataset = [
    [5, 20],
    [480, 90],
    [250, 50],
    [100, 33],
    [330, 95],
    [410, 12],
    [475, 44],
    [25, 67],
    [85, 21],
    [220, 88],
    [600, 150]
];

//Width and height
var w = 600;
var h = 300;
//This should provide us with 20 pixels of extra room on the left, right, top, and bottom edges of the SVG.
var padding = 40;

//Create scale functions
var xScale = d3.scale.linear()
        .domain([0, d3.max(dataset, function(d) {return d[0];})])
        .range([padding, w - padding]);

var yScale = d3.scale.linear()
        .domain([0, d3.max(dataset, function(d) {return d[1];})])
        .range([h - padding, padding]);

//The very largest data value will get a circle of radius 5
//data values of 0 (the minimum input) will get circles of radius 2

var rScale = d3.scale.linear()
                     .domain([0, d3.max(dataset, function(d) { return d[1]; })])
                     .range([2, 5]);
             
//Create SVG element
var svg = d3.select("#scatterplotposition")
        .append("svg")
        .attr("width", w)
        .attr("height", h);

svg.selectAll("circle")
        .data(dataset)
        .enter()
        .append("circle")
        .attr("cx", function(d) {
    return xScale(d[0]);
})
        .attr("cy", function(d) {
    return yScale(d[1]);
})
        .attr("r", function(d) {
    return rScale(d[1]);
});

svg.selectAll("text")
        .data(dataset)
        .enter()
        .append("text")
        .text(function(d) {
    return d[0] + "," + d[1];
})
        .attr("x", function(d) {
    return xScale(d[0]);
})
        .attr("y", function(d) {
    return yScale(d[1]);
})
        .attr("font-family", "sans-serif")
        .attr("font-size", "11px")
        .attr("fill", "red");

//define functions first, then call them later.
var xAxis = d3.svg.axis()
                  .scale(xScale)
                  .orient("bottom")
                  .ticks(5);  //Set rough # of ticks;       
          
svg.append("g")
    .attr("class", "axis")  //Assign "axis" class
    .attr("transform", "translate(0," + (h - padding) + ")") //want it down at the base the chart anyway
    .call(xAxis);
 
        
var yAxis = d3.svg.axis()
                  .scale(yScale)
                  .orient("left")
                   .ticks(5);  //Set rough # of ticks;       
          
svg.append("g")
    .attr("class", "axis")  //Assign "axis" class
    .attr("transform", "translate(" + padding + ",0)") //want it down at the base the chart anyway
    .call(yAxis);        