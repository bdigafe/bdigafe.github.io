function drawBarChart(svg, data, margin, colX, colY1, colY2, title, formatY, makeAnnotations) {

    function getRange() {
        var y_data_max = d3.max(data, d => { return parseInt(d[colY2]); });
        return [0, y_data_max];
    }

    function draw() {
        const width =  (400 - margin*2); 
        const height = (200 - margin*2);
        const bar_width = 25;
        const first_bar_offset = 15;
        const second_bar_offset = 200;
        
        // Title
        svg.append("g")
            .attr("transform", `translate(${margin/2}, ${margin/2})`)
            .append("text")
            .text(title)
            .attr("text-anchor", "left")
            .attr("x", 0)
            .attr("y", 0)
            .attr("class", "title-text")
            .attr("fill", "black");
        
        var chartArea = svg.append("g")
            .attr("transform", `translate(${margin},${margin})`)

        // X-Axis
        var legends = d3.nest()
            .key(function (d) { return d[colX]; })
            .entries(data)
            .map(function (d) { return d.key; });
        
        var labels = ["Normalized Enrollment", "Actual Enrollemnt"];
        
        var xs = d3.scaleOrdinal()
            .domain(legends)
            .range(d3.schemePaired)
       
        chartArea.append("g")
            .attr("transform", `translate(0,0)`)
            .append("line")
            .style("stroke-width", 1) 
            .style("stroke", "black")
            .attr("x1", 0)
            .attr("y1",height)
            .attr("x2", width)
            .attr("y2",height)
        
        // Y-axis
        const y_range = getRange();
        var ys = d3.scaleLinear()
            .domain(y_range)
            .range([height, 0])
       
        // Y-axis
        var y_axis = d3.axisLeft()
            .scale(ys)
            .tickFormat(formatY)
                    
        chartArea.append("g")
            .attr("class", "axis")
            .attr("transform", `translate(0,0)`)
            .attr("text-anchor", "end")
            .call(y_axis);
        
        // Bar-g
        // var bar = svg
        //     .selectAll(".bar")
        //     .data(data)
        //     .enter().append("g")
        //     .attr("class", "bar")
        //     .attr("transform", function(d, i) { return `translate(${margin + first_bar_offset + i*bar_width}, ${margin}  + margin)`; })   

        chartArea.selectAll(".bar1")
            .data(data)
            .enter().append("rect")
            .attr("class","bar1")
            .attr("x", function (d, i) { return first_bar_offset + bar_width*i; })
            .attr("y", function (d) { return ys(d[colY1]); })
            .attr("width", 15)
            .attr("fill", function (d, i) { return xs(d[colX]); })
            .attr("height", function (d) { return height - ys(d[colY1]); })

        chartArea.selectAll(".bar2")
            .data(data)
            .enter().append("rect")
            .attr("class","bar2")
            .attr("x", function (d, i) { return second_bar_offset + bar_width*i; })
            .attr("y", height)
            .attr("width", 15)
            .attr("fill", function (d, i) { return xs(d[colX]); })
            .attr("height", 0)
            .transition()
            .delay(500)
            .duration(3000)
            .on("end", function () {
                svg.append("g")
                .attr("class", "annotation-group")          
                .call(makeAnnotations());
            })
            .attr("height", function (d) { return height - ys(d[colY2]); })
            .attr("y", function (d) { return ys(d[colY2]); })
             
        chartArea.selectAll(".legend-text")
            .data(labels)
            .enter().append("text")
            .text(function (d, i) { return d;  })
            .attr("x", function (d, i) { return i * 200;  })
            .attr("y", height + 10)
            .attr("class", "legend-text")
            .attr("fill", "black");
        
         // Legend
        var legend = svg.selectAll(".legend")
            .data(data)
            .enter().append("g")
            .attr("class", "legend")
            .attr("transform", function(d, i) { return `translate(275, ${i*15 + 80})`; })   
    
        legend.append("rect")
            .attr("x", 10)
            .attr("y", 0)
            .attr("width", 20)
            .attr("height", 8)
            .attr("fill", function(d, i) { return xs(legends[i]);} );
                    
        legend.append("text")
            .text(function (d, i) { return `${legends[i]} (${(d["adm_percent"] * 100).toFixed(0)}%)`; })
            .attr("x", 40)
            .attr("y", 8)
            .attr("class", "legend-text")
    }

    draw(); 
}