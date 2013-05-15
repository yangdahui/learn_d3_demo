/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
var circleData = [
    {"cx":20,"cy":20,"radius":20,"color":"green"},
    {"cx":40,"cy":40,"radius":20,"color":"purple"}];

var rectangleData = [
    {"rx":60,"ry":60,"height":20,"width":15, "color":"blue"},
    {"rx":100,"ry":100,"height":20,"width":15, "color":"red"}];

var svgContainer =d3.select("#position4").append("svg")
                                         .attr("width", 200)
                                         .attr("height",200);
                                 
var circleGroup= svgContainer.append("g")
                               .attr("transform","translate(80,0)");
//construt circles
var circles = svgContainer.selectAll("circle")
                            .data(circleData)
                            .enter()
                            .append("circle");
                    
var circlesAttr=circles
                        .attr("cx",function(d){return d.cx;})
                        .attr("cy",function(d){return d.cy;})
                        .attr("r",function(d){return d.radius;})
                        .style("fill",function(d){return d.color;});
//rectangle constuct
var rectangles =svgContainer.selectAll("rect")
                            .data(rectangleData)
                            .enter()
                            .append("rect");  
                    
var rectanglesAttr = rectangles
                        .attr("x",function(d){return d.rx;})
                        .attr("y",function(d){return d.ry;})
                        .attr("height",function(d){return d.height;})
                        .attr("width",function(d){return d.width;}) 
                        .style("fill",function(d){return d.color;});
                
//create text element to the svgContainer

var text = svgContainer.selectAll("text")
                        .data(circleData)
                        .enter()
                        .append("text");

//add text label attr

var textLabers = text 
                    .attr("x",function(d){return d.cx;})
                    .attr("y",function(d){return d.cy;})
                    .text(function(d){return "("+d.cx+","+d.cy+")";})
                    .attr("font-family","sans-serif")
                    .attr("font-size","20px")
                    .attr("fill","black");          