function drawScatterPlot(svg, data, margin,
    colX, colY, colZ,
    scaleX, scaleY, zSize, zColor,
    formatX, formatY,
    tooltipParent, tipContent, tipScript) {
    
    var width = 400 - 2 * margin;
    var height = 200 - 2 * margin;

    xd = [0, width];
    yd = [0, height];

    // X-Axis
    var x_data_min = d3.min(data, d => { return parseInt(d[colX]); });
    var x_data_max = d3.max(data, d => { return parseInt(d[colX]); });
    xs = getScale(scaleX, [x_data_min, x_data_max], xd);

    // Y-axis
    var y_data_min = d3.min(data, d => { return parseFloat(d[colY]); });
    var y_data_max = d3.max(data, d => { return parseFloat(d[colY]); });
    ys = getScale(scaleY, [y_data_max, y_data_min], yd)
                    
    // Add scatterplot components
    var chart = svg.append("g")
        .attr("transform", `translate(${margin},${margin})`)
        .selectAll("circle")
        .data(data)
        .enter().append("circle")
        .attr("class", "data-point")
        .attr("cx", function (d, i) { return xs(parseInt(d[colX])); })
        .attr("cy", function (d, i) { return ys(parseInt(d[colY])); })
        .attr("r", function (d, i) { return zSize(d[colZ]); })
        .style("fill", function (d, i) { return zColor(d); })
        .on("mouseover", mouseover)
        .on("mouseout", mouseleave);

     // X-axis
    var x_axis = d3.axisBottom()
     .scale(xs)
     .tickFormat(d3.format(formatX))
 
    svg.append("g")
        .attr("class", "axis")
        .attr("transform", `translate(${margin},${height + margin})`)
        .call(x_axis)
     
    // Y-axis
    var y_axis = d3.axisLeft()
        .scale(ys)
        .tickFormat(d3.format(formatY))
    
    svg.append("g")
        .attr("class", "axis")
        .attr("transform", `translate(${margin},${margin})`)
        .attr("text-anchor", "end")
        .call(y_axis);
   
    svg.append("g")
        .attr("class", "axis-title")
        .attr("transform", `translate(${margin + width},${height + margin + 30})`)
        .append("text")
        .text("Avg SAT score")
        .attr("y", 0)
        .style("text-anchor", "end")
    
    svg.append("g")
        .attr("class", "axis-title")
        .attr("transform", `translate(150,150)`)
        .append("text")
        .attr("transform", "rotate(90)")
        .text("College cost (USD)")
        .attr("y", -5)
        .attr("x", 50);
    
   function mouseover(d) {
       var x = d3.event.pageX;
       var y = d3.event.pageY;
       createTooltip(x, y, d);
       return;
    }
        
    function mouseleave(d) {
        d3.select("#" + tooltipParent).selectAll(".tooltip").remove();
    }
        
    function createTooltip(x, y, d) {
        d3.select("#" + tooltipParent).selectAll(".tooltip").remove()
    
        d3.select("#" + tooltipParent)
            .append("div")
            .attr("class", "tooltip")
            .html(tipContent(d))
            .style("visibility", "visible")
            .style("left", x)
            .style("top", y);
    
        tipScript(d);
    }
}

function getScale(scaleType, domain, range) {
    if (scaleType =="linear"){
        return d3.scaleLinear()
            .domain(domain)
            .range(range);
    }

    if (scaleType =="log") {
        return d3.scaleLog()
            .base(10)
            .domain(domain)
            .range(range);
    }

    throw "Invalid scale";
}

function createTooltip(parent, tipContent, tipScript) {
    d3.select("#" + parent).selectAll(".tooltip").remove()

    var tooltip = d3.select("#" + parent)
        .append("div")
        .attr("class", "tooltip")
        .style("visibility", "hidden");

    tooltip.tipContent = tipContent;
    tooltip.tipScript = tipScript;
    return tooltip;
}


