/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

// svg - scale - axis 

var svgContainer = d3.select("#axisposition").append("svg")
                                     .attr("width",400)
                                     .attr("height",100);

var axisScale= d3.scale.linear()
                        .domain([0,100])
                        .range([0,400]);
                
var xAxis = d3.svg.axis()
                   .scale(axisScale);
 
var xAxisGroup = svgContainer.append("g")
                              .call(xAxis);
                      
                      