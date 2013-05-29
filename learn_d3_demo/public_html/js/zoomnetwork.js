/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
var padding=150;

var w = GetWidth()-padding,
    h = GetHeight()-padding,
    fill = d3.scale.category10();
    
//var w=document.getElementById('#interchart').clientHeight,
//    h=document.getElementById('#interchart').clientWidth,
//    fill = d3.scale.category10();

var vis = d3.select("#interchart")
  .append("svg:svg")
    .attr("width", w)
    .attr("height", h)
    .attr("pointer-events", "all")
  .append('svg:g')
    .call(d3.behavior.zoom().on("zoom", redraw))
  .append('svg:g');

vis.append('svg:rect')
    .attr('width', w)
    .attr('height', h)
    .attr('fill', 'white');

function redraw() {
  console.log("here", d3.event.translate, d3.event.scale);
  vis.attr("transform",
      "translate(" + d3.event.translate + ")"
      + " scale(" + d3.event.scale + ")");
}

var draw = function(json) {
  var force = d3.layout.force()
      .charge(-100)
      .linkDistance(50)
      .nodes(json.nodes)
      .links(json.links)
      .size([w, h])
      .start();

  var link = vis.selectAll("line.link")
      .data(json.links)
    .enter().append("svg:line")
      .attr("class", "link")
      .style("stroke-width", function(d) { return Math.sqrt(d.value); })
      .attr("x1", function(d) { return d.source.x; })
      .attr("y1", function(d) { return d.source.y; })
      .attr("x2", function(d) { return d.target.x; })
      .attr("y2", function(d) { return d.target.y; });

  var node = vis.selectAll("circle.node")
      .data(json.nodes)
    .enter().append("svg:circle")     
      .attr("class", "node")
      .attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return d.y; })
      .attr("r", 5)
      .style("fill", function(d) { return fill(d.group); })
      .call(force.drag);

vis.append("svg:text")
      .attr("text-anchor", "middle")
      .attr("class","nodenametext")
      .text(function(d) { return "node text"; });
      
  node.append("svg:title")
      .text(function(d) { return d.name; });
      
  vis.style("opacity", 1e-6)
    .transition()
      .duration(1)
      .style("opacity", 1);

  force.on("tick", function() {
    link.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    node.attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });
  });
};

var data =d3.json("data/authors.json", function(error, json) {
  if (error) return console.warn(error);
  data = json;
  draw(data);
});



function GetWidth()
{
    var x = 0;
    if (self.innerHeight)
    {
        x = self.innerWidth;
    }
    else if (document.documentElement && document.documentElement.clientHeight)
    {
        x = document.documentElement.clientWidth;
    }
    else if (document.body)
    {
        x = document.body.clientWidth;
    }
    return x;
}

function GetHeight()
{
    var y = 0;
    if (self.innerHeight)
    {
        y = self.innerHeight;
    }
    else if (document.documentElement && document.documentElement.clientHeight)
    {
        y = document.documentElement.clientHeight;
    }
    else if (document.body)
    {
        y = document.body.clientHeight;
    }
    return y;
}