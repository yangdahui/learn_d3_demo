/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var dataset = [5, 10, 15, 20, 25];

var ramdataset = [];                        //Initialize empty array

for (var i = 0; i < 25; i++) {           //Loop 25 times
    var newNumber = Math.round(Math.random() * 30);  //New random number (0-30)
    ramdataset.push(newNumber);             //Add new number to array
}

d3.select("#testchart").selectAll("div")
        .data(ramdataset)
        .enter()
        .append("div")
        .attr("class", "bar")
        .style("height", function(d){
                            var barHeight = d * 5;
                            return barHeight + "px";
                        });