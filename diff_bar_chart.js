function drawDiffBarChart(svg, data, margin, colX, colY, title, formatY, makeAnnotations) {

    function getDiffRange() {
        var y_data_min = d3.min(data, d => { return parseInt(d[colY]); });
        var y_data_max = d3.max(data, d => { return parseInt(d[colY]); });

        var y_max = d3.max([Math.abs(y_data_min), Math.abs(y_data_max)])
        var y_min = -y_max;

        return [y_min, y_max];
    }

    function mapY(v, ys, height) {
        var y = ys(v);

        if (y < 0)
            return height + y;
        
        return height;
    }

    function mapHeight(v, ys, height) {
        return  Math.abs(ys(v));       
    }

    function draw() {
        const width =  (400 - 2*margin); // svg.attr("width") - 2 * margin;
        const height = (200 - margin) / 2; //  Math.floor((svg.attr("height") - margin) / 2);

        // Title
        svg.append("g")
            .attr("transform", `translate(${margin}, ${margin/2})`)
            .append("text")
            .text(title)
            .attr("text-anchor", "left")
            .attr("x", 0)
            .attr("y", 0)
            .attr("class", "title-text")
            .attr("fill", "black");

        // X-Axis
        var labels = d3.nest()
            .key(function (d) { return d[colX]; })
            .entries(data)
            .map(function (d) { return d.key; });
        
        var xs = d3.scaleOrdinal()
            .domain(labels)
            .range(d3.schemePaired)
            //.range(d3.schemeCategory10);
       
        svg.append("g")
            .attr("transform", `translate(${margin},${margin + height})`)
            .append("line")
            .style("stroke-width", 1) 
            .style("stroke", "black")
            .attr("x1", 0)
            .attr("y1", 0)
            .attr("x2", width)
            .attr("y2", 0)
            .attr("width", width)
        
        // Y-axis
        const y_range = getDiffRange();
        var ys = d3.scaleLinear()
            .domain(y_range)
            .range([height, -height])
       
        // Y-axis
        var y_axis = d3.axisLeft()
            .scale(ys)
            .tickFormat(formatY)
             
        
        svg.append("g")
            .attr("class", "axis")
            .attr("transform", `translate(${margin},${margin + height})`)
            .attr("text-anchor", "end")
            .call(y_axis);
        
        // Bar-g
        var bar = svg
            .selectAll(".bar")
            .data(data)
            .enter().append("g")
            .attr("class", "bar")
            .attr("transform", function(d, i) { return `translate(${margin + 5 + i*55}, ${margin + mapY(d[colY], ys, height)})`; })   

        bar.append("rect")
            .attr("x", 0)
            .attr("y", 0)
            .attr("width", 15)
            .attr("fill", function (d, i) { return xs(d[colX]); })
            .attr("height", function (d) { return Math.abs(ys(d[colY])); })         
        
        bar.append("text")
            .text(function (d, i) { return d.label;  })
            .attr("x", 0)
            .attr("y", -5)
            .attr("class", "legend-text")
            .attr("fill", "black");
             
    }

    draw(); 
    
}