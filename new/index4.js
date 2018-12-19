var data = [
  {
    name: "GREECE",
    values: [
      {date: "2006", price: "31"},
      {date: "2007", price: "36"},
      {date: "2008", price: "41"},
      {date: "2009", price: "45"},
      {date: "2010", price: "46"},
      {date: "2011", price: "53"},
      {date: "2012", price: "56"},
      {date: "2013", price: "61"},
      {date: "2014", price: "65"},
      {date: "2015", price: "68"},
      {date: "2016", price: "70"},
      {date: "2017", price: "70"},
    ]
  },
  {
    name: "CYPRUS",
    values: [
      {date: "2006", price: "36"},
      {date: "2007", price: "41"},
      {date: "2008", price: "42"},
      {date: "2009", price: "50"},
      {date: "2010", price: "53"},
      {date: "2011", price: "58"},
      {date: "2012", price: "61"},
      {date: "2013", price: "66"},
      {date: "2014", price: "70"},
      {date: "2015", price: "72"},
      {date: "2016", price: "76"},
      {date: "2017", price: "81"},
    ]
  },
  {
    name: "SPAIN",
    values: [
      {date: "2006", price: "50"},
      {date: "2007", price: "55"},
      {date: "2008", price: "59"},
      {date: "2009", price: "62"},
      {date: "2010", price: "66"},
      {date: "2011", price: "69"},
      {date: "2012", price: "72"},
      {date: "2013", price: "74"},
      {date: "2014", price: "77"},
      {date: "2015", price: "80"},
      {date: "2016", price: "81"},
      {date: "2017", price: "85"},
    ]
  },
{
    name: "NORWAY",
    values: [
      {date: "2006", price: "83"},
      {date: "2007", price: "87"},
      {date: "2008", price: "91"},
      {date: "2009", price: "92"},
      {date: "2010", price: "93"},
      {date: "2011", price: "94"},
      {date: "2012", price: "95"},
      {date: "2013", price: "96"},
      {date: "2014", price: "97"},
      {date: "2015", price: "97"},
      {date: "2016", price: "98"},
      {date: "2017", price: "98"},
    ]
  },
{
    name: "BELGIUM",
    values: [
      {date: "2006", price: "64"},
      {date: "2007", price: "69"},
      {date: "2008", price: "71"},
      {date: "2009", price: "76"},
      {date: "2010", price: "79"},
      {date: "2011", price: "83"},
      {date: "2012", price: "82"},
      {date: "2013", price: "83"},
      {date: "2014", price: "86"},
      {date: "2015", price: "86"},
      {date: "2016", price: "87"},
      {date: "2017", price: "89"},
    ]
  },
{
    name: "BULGARIA",
    values: [
      {date: "2006", price: "27"},
      {date: "2007", price: "34"},
      {date: "2008", price: "40"},
      {date: "2009", price: "45"},
      {date: "2010", price: "46"},
      {date: "2011", price: "51"},
      {date: "2012", price: "55"},
      {date: "2013", price: "56"},
      {date: "2014", price: "59"},
      {date: "2015", price: "60"},
      {date: "2016", price: "62"},
      {date: "2017", price: "66"},
    ]
  },
{
    name: "EU (27 COUNTRIES)",
    values: [
      {date: "2006", price: "54"},
      {date: "2007", price: "60"},
      {date: "2008", price: "64"},
      {date: "2009", price: "68"},
      {date: "2010", price: "71"},
      {date: "2011", price: "73"},
      {date: "2012", price: "75"},
      {date: "2013", price: "77"},
      {date: "2014", price: "80"},
      {date: "2015", price: "81"},
      {date: "2016", price: "84"},
      {date: "2017", price: "85"},
    ]
  }
];



var width2= 700 - 2 * margin;
var height2 = 500 - 2 * margin;
var margin2 = 80;
var duration = 250;

var lineOpacity = "0.25";
var lineOpacityHover = "0.85";
var otherLinesOpacityHover = "0.1";
var lineStroke = "1.5px";
var lineStrokeHover = "2.5px";

var circleOpacity = '0.50';
var circleOpacityOnLineHover = "0.25"
var circleRadius = 3;
var circleRadiusHover = 6;


/* Format Data */
var parseDate = d3.timeParse("%Y");
data.forEach(function(d) { 
  d.values.forEach(function(d) {
    d.date = parseDate(d.date);
    d.price = +d.price;    
  });
});


/* Scale */
var xScale2 = d3.scaleTime()
  .domain(d3.extent(data[0].values, d => d.date))
  .range([0, width-margin2]);

var yScale2 = d3.scaleLinear()
  .domain([0, d3.max(data[0].values, d => 100)])
  .range([height2-margin2, 0]);

var color = d3.scaleOrdinal(d3.schemeCategory10);

/* Add SVG */
var svg4 = d3.select("#chart4").append("svg")
  .attr("width", (width+margin2)+"px")
  .attr("height2", (height2+margin2)+"px")
  .append('g')
  .attr("transform", `translate(${margin2}, ${margin2})`);


/* Add line into SVG */
var line = d3.line()
  .x(d => xScale2(d.date))
  .y(d => yScale2(d.price));

let lines = svg4.append('g')
  .attr('class', 'lines');

lines.selectAll('.line-group')
  .data(data).enter()
  .append('g')
  .attr('class', 'line-group')  
  .on("mouseover", function(d, i) {
      svg4.append("text")
        .attr("class", "title-text")
        .style("fill", color(i))        
        .text(d.name)
        .attr("text-anchor", "middle")
        .attr("x", (width-margin2)/2)
        .attr("y", 5);
    })
  .on("mouseout", function(d) {
      svg4.select(".title-text").remove();
    })
  .append('path')
  .attr('class', 'line')  
  .attr('d', d => line(d.values))
  .style('stroke', (d, i) => color(i))
  .style('opacity', lineOpacity)
  .on("mouseover", function(d) {
      d3.selectAll('.line')
					.style('opacity', otherLinesOpacityHover);
      d3.selectAll('.circle')
					.style('opacity', circleOpacityOnLineHover);
      d3.select(this)
        .style('opacity', lineOpacityHover)
        .style("stroke-width", lineStrokeHover)
        .style("cursor", "pointer");
    })
  .on("mouseout", function(d) {
      d3.selectAll(".line")
					.style('opacity', lineOpacity);
      d3.selectAll('.circle')
					.style('opacity', circleOpacity);
      d3.select(this)
        .style("stroke-width", lineStroke)
        .style("cursor", "none");
    });


/* Add circles in the line */
lines.selectAll("circle-group")
  .data(data).enter()
  .append("g")
  .style("fill", (d, i) => color(i))
  .selectAll("circle")
  .data(d => d.values).enter()
  .append("g")
  .attr("class", "circle")  
  .on("mouseover", function(d) {
      d3.select(this)     
        .style("cursor", "pointer")
        .append("text")
        .attr("class", "text")
        .text(`${d.price}`)
        .attr("x", d => xScale2(d.date) + 5)
        .attr("y", d => yScale2(d.price) - 10);
    })
  .on("mouseout", function(d) {
      d3.select(this)
        .style("cursor", "none")  
        .transition()
        .duration(duration)
        .selectAll(".text").remove();
    })
  .append("circle")
  .attr("cx", d => xScale2(d.date))
  .attr("cy", d => yScale2(d.price))
  .attr("r", circleRadius)
  .style('opacity', circleOpacity)
  .on("mouseover", function(d) {
        d3.select(this)
          .transition()
          .duration(duration)
          .attr("r", circleRadiusHover);
      })
    .on("mouseout", function(d) {
        d3.select(this) 
          .transition()
          .duration(duration)
          .attr("r", circleRadius);  
      });


/* Add Axis into SVG */
var xAxis = d3.axisBottom(xScale2).ticks(10);
var yAxis = d3.axisLeft(yScale2).ticks(5);

svg4.append("g")
  .attr("class", "x axis")
  .attr("transform", `translate(0, ${height2-margin2})`)
  .call(xAxis);

svg4.append("g")
  .attr("class", "y axis")
  .call(yAxis)
  .append('text')
  .attr("y", 15)
  .attr("transform", "rotate(-90)")
  .attr("fill", "#000")
  .text("% of individuals aged 16 to 74");