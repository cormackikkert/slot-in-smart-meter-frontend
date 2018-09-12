// Code for bar graph

var bar_dataset = [1, 3, 5, 6, 4, 3.2, 3, 2, 1]

var bar_margin = {top: 40, right: 20, bottom: 40, left: 20};

var bar_svg_width = 600 - bar_margin.left - bar_margin.right;
var bar_svg_height = 400 - bar_margin.top - bar_margin.bottom;

var bar_svg = d3.select('.bar-chart')
    .append('svg')
        .attr('width', bar_svg_width)
        .attr('height', bar_svg_height)
        .style('margin-bottom', 0)
        .style('display', 'block')
        .style('margin', 'auto');

var bar_scale = d3.scaleLinear()
    .domain([0, Math.max(...bar_dataset)])
    .range([0, bar_svg_height]);

var bar_colorscale = d3.scaleLinear()
    .domain([0, bar_dataset.length - 1])
    .range(["purple", "red"]);

var bars = bar_svg.selectAll("rect")
    .data(bar_dataset)
    .enter()
        .append("rect")
        .attr("width", 50)
        .attr("height", function(d) { return bar_scale(d);})
        .attr("x", function(d, i) {return i * 60})
        .attr("y", function(d) {return (bar_svg_height - bar_scale(d)) / 2})
        .style("fill", function(d, i) {return bar_colorscale(i)});


// Code for pie chart
// https://www.youtube.com/watch?v=kMCnzUE07QA

var pie_dataset = [1, 3, 5, 6, 4, 3.2, 3, 2, 1]

for (var i = 0; i < bar_dataset.length; i++) {
    pie_dataset[i] = pie_dataset[i] / pie_dataset.reduce((a, b) => a + b, 0)
}

var pie_margin = {top: 10, right: 10, bottom: 10, left:10};

var pie_svg_width = 260 - pie_margin.right - pie_margin.left;
var pie_svg_height = 180 - pie_margin.top - pie_margin.bottom;
var radius = pie_svg_height / 2;

var pie_svg = d3.select('.pie-chart')
    .append('svg')
        .attr('width', pie_svg_width)
        .attr('height', pie_svg_height)
        .style('display', 'block')
        .style('margin', 'auto');

var pie_colorscale = d3.scaleLinear()
    .domain([0, pie_dataset.length - 1])
    .range(["blue", "green"]);

var group = pie_svg.append("g")
    .attr("transform", "translate(" +  pie_svg_width / 2 +"," + pie_svg_height / 2 + ")");

var arc = d3.arc()
    .innerRadius(0)
    .outerRadius(radius);

var pie = d3.pie()
    .value(function (d) { return d; });

var arcs = group.selectAll(".arc")
    .data(pie(pie_dataset))
    .enter()
    .append('g')
        .attr('class', 'arc');

arcs.append("path")
    .attr('d', arc)
    .attr('fill', function(d, i) {return pie_colorscale(i)});

 