function pieChart(config) {
    function setReSizeEvent(data) {
        var resizeTimer;
        window.removeEventListener('resize', function() {});
        window.addEventListener('resize', function(event) {

            if (resizeTimer !== false) {
                clearTimeout(resizeTimer);
            }
            resizeTimer = setTimeout(function() {
                $(data.mainDiv).empty();
                drawPieChart(data);
                clearTimeout(resizeTimer);
            }, 500);
        });
    }
    drawPieChart(config);
    setReSizeEvent(config);
}

function drawPieChart(config) {
    var data = config.data;
    var colorRange = config.colorRange;
    var mainDiv = config.mainDiv;
    var mainDivName = mainDiv.substr(1, mainDiv.length);
    var caption = config.caption;
    var tooltipLable = config.tooltipLable;
var category = config.category;
var age = config.age;
var count = config.count;
    var Caption2 = config.Caption2;
    var value = config.value;
    d3.select(mainDiv).append("svg").attr("width", $(mainDiv).width()).attr("height", 724);
    var svg = d3.select(mainDiv + " svg"),
        margin = {
            top: 20,
            right: 20,
            bottom: 30,
            left: 40
        },
        width = +svg.attr("width") - margin.left - margin.right,
        height1 = +svg.attr("height") - margin.top - margin.bottom;
    var g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height1 / 2 + ")");
    var color = d3.scaleOrdinal(colorRange);
    var radius = Math.min(width, height1) * 0.5;
    var pie = d3.pie()
        .sort(null)

        .value(function(d) {
            return d[value];
        });

    var path = d3.arc()
        .outerRadius(radius - 20)
        .innerRadius(0)
        .cornerRadius(5);

    var label = d3.arc()
        .outerRadius(radius - 40)
        .innerRadius(radius - 40);
    var arc = g.selectAll(".arc")
        .data(pie(data))
        .enter().append("g")
        .classed("arc", true);

    var pathArea = arc.append("path")
        .attr("d", path)
        .attr("id", function(d, i) {
            return "arc-" + i
        })
        .attr("style", "fill-opacity: 0.85;")
        .attr("fill", function(d) {
            return color(d.data[caption]);
        })
        .attr("data", function(d) {
            d.data["percentage"] = (d.endAngle - d.startAngle) / (2 * Math.PI) * 100;
            return JSON.stringify(d.data);
        });

    //CBT:give blinking effect on mouse over
    pathArea.on("mouseover", function(d) {
        var currentEl = d3.select(this);
        currentEl.attr("style", "fill-opacity:1;");

        var fadeInSpeed = 120;
        d3.select("#tooltip_" + mainDivName)
            .transition()
            .duration(fadeInSpeed)
            .style("opacity", function() {
                return 1;
            });
        d3.select("#tooltip_" + mainDivName)
            .attr("transform", function(d) {
                var mouseCoords = d3.mouse(this.parentNode);
                var xCo = mouseCoords[0] + 10;;
                var yCo = mouseCoords[0] + 10;
                return "translate(" + xCo + "," + yCo + ")";
            });
        //CBT:calculate tooltips text
        var tooltipData = JSON.parse(currentEl.attr("data"));
        var tooltipsText = "";
        d3.selectAll("#tooltipText_" + mainDivName).text("");
        var yPos = 0;
        d3.selectAll("#tooltipText_" + mainDivName).append("tspan").attr("x", 0).attr("y", yPos * 10).attr("dy", "3em").text('Education Level:' + d.data[category]);
        d3.selectAll("#tooltipText_" + mainDivName).append("tspan").attr("x", 0).attr("y", yPos * 10).attr("dy", "1.9em").text(tooltipLable  + ":  " + d3.format("0.2f")(tooltipData["percentage"]));
        d3.selectAll("#tooltipText_" + mainDivName).append("tspan").attr("x", 0).attr("y", yPos * 10).attr("dy", "4.1em").text('Count:' + d.data[count]);
        d3.selectAll("#tooltipText_" + mainDivName).append("tspan").attr("x", 0).attr("y", yPos * 10).attr("dy", "5.2em").text('Age Range:'  + d.data[age]);
        var dims = helpers.getDimensions("tooltipText_" + mainDivName);
        d3.selectAll("#tooltipText_" + mainDivName + " tspan")
            .attr("x", dims.w + 2);
        d3.selectAll("#tooltipRect_" + mainDivName)
            .attr("width", dims.w + 10)
            .attr("height1", dims.h + 20);
    });
    pathArea.on("mousemove", function(d) {
        var currentEl = d3.select(this);
        d3.selectAll("#tooltip_" + mainDivName)
            .attr("transform", function(d) {
                var mouseCoords = d3.mouse(this.parentNode);
                var xCo = mouseCoords[0] + 10;
                var yCo = mouseCoords[1] + 10;
                return "translate(" + xCo + "," + yCo + ")";
            });
    });
    pathArea.on("mouseout", function(d) {
        var currentEl = d3.select(this);
        currentEl.attr("style", "fill-opacity:0.85;");

        d3.select("#tooltip_" + mainDivName)
            .style("opacity", function() {
                return 0;
            });
        d3.select("#tooltip_" + mainDivName).attr("transform", function(d, i) {
            var x = -500;
            var y = -500;
            return "translate(" + x + "," + y + ")";
        });
    });

    //CBT:tooltips start
    var tooltipg = g.append("g")
        .attr("font-family", "sans-serif")
        .attr("font-size", 10)
        .attr("text-anchor", "end")
        .attr("id", "tooltip_" + mainDivName)
        .attr("style", "opacity:0")
        .attr("transform", "translate(-500,-500)");

    tooltipg.append("rect")
        .attr("id", "tooltipRect_" + mainDivName)
        .attr("x", 0)
        .attr("width", 120)
        .attr("height1", 80)
        .attr("opacity", 0.8)
        .style("fill", "#000000");

    tooltipg
        .append("text")
        .attr("id", "tooltipText_" + mainDivName)
        .attr("x", 30)
        .attr("y", 15)
        .attr("fill", "#000000")
        .style("font-size", 10)
        .style("font-family", "arial")
        .text(function(d, i) {
            return "";
        });
    //CBT:tooltips end

    arc.append("text")
        .attr("dx", 30)
        .attr("dy", -5)
        .append("textPath")
        .attr("xlink:href", function(d, i) {
            return "#arc-" + i;
        })
        .text(function(d) {
            return d.data[caption].toString();
        })

}

var helpers = {
    getDimensions: function(id) {
        var el = document.getElementById(id);
        var w = 0,
            h = 0;
        if (el) {
            var dimensions = el.getBBox();
            w = dimensions.width;
            h = dimensions.height1;
        } else {
            console.log("error: getDimensions() " + id + " not found.");
        }
        return {
            w: w,
            h: h
        };
    }
}	



var data=[{ city:"Graduate: 5.0%", beautifulRatio:4.165602, caption2:"Graduate", caption3:"22+", caption4:"4,165,602"},{ city:"Nursery: 6.0%", beautifulRatio:5.013351, caption2:"Nursery", caption3:"4 years old", caption4:"5,013,351"},{ city:"Kindergarten: 5.0%", beautifulRatio:4.221320, caption2:"Kindergarten", caption3:"5 years old", caption4:"4,221,320"},{ city:"Elementary: 1-4 : 20.0%", beautifulRatio:16.511632, caption2:"Elementary: 1-4", caption3:"6-9 years old", caption4:"16,511,632"},{ city:"Elementary: 5-8: 20.0%", beautifulRatio:16.675078, caption2:"Elementary: 5-8", caption3:"10-13 years old", caption4:"16,675,078"},{ city:"High School: 9-12: 21%", beautifulRatio:17.176546, caption2:"High School: 9-12", caption3:"14-18 years old", caption4:"17,176,546"},{ city:"Undergraduate: 23.0%", beautifulRatio:19.291233, caption2:"Undergraduate", caption3:"18-22 years old", caption4:"19,291,233"}];
    $("#chart").empty();
    var pieChartConfig = {
    mainDiv: "#chart",
    colorRange: ["#f44842", "#f4b841", "#f4f141", "#46f441", "#41f4d9", "#4941f4", "#f441d6"],
    data: data,
category:'caption2',
age:'caption3',
count:'caption4',
    caption:"city",
    tooltipLable:"Percent",
    value:"beautifulRatio"
  };
  var pieChart = new pieChart(pieChartConfig);
