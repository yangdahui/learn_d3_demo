/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
var jsonCircles= [
    {"x_axis":30,"y_axis":30, "radius":10,"color":"green"},
    {"x_axis":50,"y_axis":50, "radius":10,"color":"red"},
    {"x_axis":70,"y_axis":70, "radius":10,"color":"yellow"}
];

var svgContainer=d3.select("#position3").append("svg")
                                        .attr("width",100)
                                        .attr("height",100);
                                
var circle=svgContainer.selectAll("circle").data(jsonCircles)
                                           .enter()
                                           .append("circle");
var circleAttributes = circle
                       .attr("cx", function(d){return d.x_axis;})
                       .attr("cy", function(d){return d.y_axis;})
                       .attr("r", function(d){return d.radius;})
                        .attr("fill", function(d){return d.color;});
                