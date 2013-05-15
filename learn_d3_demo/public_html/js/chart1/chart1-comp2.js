/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var svgContainer = d3.select("#position2").append("svg")

var circleSelection=svgContainer.append("circle")
                                .attr("cx",25)
                                .attr("cy",25)
                                .attr("r",25)
                                .style("fill","blue");