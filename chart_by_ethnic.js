 function drawChartByEthnic(svgId, data) {
    const formatFee = d3.format("$,.0r");
    const formatPercent = d3.format(",.2r");

    function getFeeAmt(v) {
        if (v == "NULL")
            return "";
        return formatFee(v);
    }

    function getAdmissionCount(d) {
        if (d["UGDS"] == "NULL" || d[admRateField] == "NULL")
            return "";

        if (admRateField != "UGDS")
            return Math.round(d["UGDS"] * d[admRateField]);
        
        return formatNumber(d["UGDS"])
    }

    function getOptions() {
        var options = {
            ethnicId: parseInt(document.getElementById("ethnicDropdown").value),
            stateId : document.getElementById("stateDropdown").value,
            satMin :  0,
            satMax : 0
       };

       var satRange =  document.getElementById("satDropdown").value;

        if (satRange == "") {
            return options;
        }

        satRange = satRange.replaceAll(" ", "");
        options.satMin = parseInt(satRange.split("-")[0]);
        options.satMax = parseInt(satRange.split("-")[1]);

       return options;
    }

    // Fill-color based on the admission rate
    function zColor(d) {
        var admRate = d[admRateField];

        if (admRate == "NULL") {
            return "gray";
        }

        return d3.interpolateRdYlGn(parseFloat(admRate));
    };

     function zSize(value) {
        var r = parseFloat(value);
         
        if (admRateField != "UGDS")
            return r * 10 + 2;
        
        return r / 5000 + 2;
    };

    function tipContent(d) {
        return `
            <span>College: ${d["INSTNM"]}</span><br/>
            <span>Avg SAT score: ${d["SAT_AVG"]}</span><br/>
            <span>College fee:${getFeeAmt(d["NPT4_PUB"])}</span><br/>
            <span>Total undergraduate admission: ${getAdmissionCount(d)}</span><br/>
            <div style="padding:5x">
                <svg id="tooltipSvg" width="280" height="100">
                </svg>
            </div>
        `;
    };

    function  tipScript(d) {
        var data = [];
        for(var i = 1; i < EthnicNames.length; i++) {
            data.push(d[ADM_RATE_ETHNIC[i]] );
        }

        d3.select("#tooltipSvg").selectAll("*").remove();
        var accent = d3.scaleOrdinal(d3.schemePaired );                       
        var pie = d3.pie();
        var arc = d3.arc().innerRadius(0).outerRadius(50);
        
        d3.select("#tooltipSvg")
            .append("g")
            .attr("transform", "translate(50,50)")
            .selectAll("path")
            .data(pie(data))
            .enter().append("path")
            .attr("d", arc)
            .attr("fill", function(d, i) { return accent(i); }); 
        
        var legend = d3.select("#tooltipSvg")
            .append("g")
            .attr("transform", function(d, i) { return "translate(110, 0)"; })   
            
       var legend = d3.select("#tooltipSvg")
            .selectAll(".legend")
            .data(data)
            .enter().append("g")
            .attr("class", "legend")
            .attr("transform", function(d, i) { return `translate(110, ${i*10})`; })   

        legend.append("rect")
            .attr("x", 10)
            .attr("y", 0)
            .attr("width", 20)
            .attr("height", 8)
            .attr("fill", function(d, i) { return accent(i);} );
                    
        legend.append("text")
            .text(function(d, i) { return `${EthnicNames[i+1]} (${formatPercent(d*100)}%)`; })
            .attr("x", 40)
            .attr("y", 8)
            .attr("class", "legend-text")
            .attr("fill", "white");
    }

    function filter(d, options) {
        var ok = true;

        if(d["SAT_AVG"] == "NULL" || d[admRateField] == "NULL") 
            ok = false;

        if (options.stateId != "" && d["STABBR"] != options.stateId)
            ok = false;

        if (ok && options.satMin > 0 && d["SAT_AVG"] < options.satMin)
            ok = false;

        if (ok && options.satMax > 0 && d["SAT_AVG"] > options.satMax)
            ok = false;

        if (ok)
            return d;
    }

    // Draw a acatter plot of SAT avg. score, admission rate of a give ethnic group, and avg college cost 
    function draw() {
        // Use filtered data based on user controls
        var filteredData = data.filter(function(d) {
            return filter(d, options);
        });

        svg.selectAll("*").remove();

        drawScatterPlot(svg, filteredData, 35, 
                        "SAT_AVG", "NPT4_PUB", admRateField, 
                        "linear", "linear", zSize, zColor, 
                        ",d", "~s",
                        "main", tipContent, tipScript);
    }

    var svg = d3.select("#" + svgId)
    var options = getOptions();
    var admRateField = ADM_RATE_ETHNIC[options.ethnicId];
    draw();
}
 
function drawSummaryChartByEthnic(svgId, data) {

    function filter(d) {
        if (d.label != "All" && d.adm_count_norm > 0)
            return d;
    } 

    function formatY(x, p) {
        return (x).toFixed(0) + "%";
    }
    
    function makeAnnotations() {
        const annotations = [
            {
                note: {
                    title: `Gap: ${formatNumber(data[1].adm_count_diff_abs)}`
                },
                x: 50,
                y: 120,
                dy: 10,
                dx: 30,
                subject: { radius: 5, radiusPadding: 0 }
            },
            {
                note: {
                    title: `Gap: ${formatNumber(data[5].adm_count_diff_abs)}`
                },
                x: 255,
                y: 150,
                dy: -20,
                dx: -65,
                subject: { radius: 5, radiusPadding: 0 }
              },
        ];
        
        return d3.annotation()
            .editMode(false)
            .notePadding(5)
            .type(d3.annotationCallout)
            .annotations(annotations);
    }
    
     var filteredData = data.filter(function(d) {
        return filter(d);
     });
    
    var svg = d3.select("#" + svgId)
    const title = "Enrollent gap by ethnic group";

    drawDiffBarChart(svg, filteredData, 30, "label", "adm_count_diff", title, formatY);

    svg.append("g")
        .attr("class", "annotation-group")
        .call(makeAnnotations());
}

function drawSummaryChartByEthnicPie(svgId, data) {

    var values = [];
    var keys = [];
    for(var i = 1; i < data.length; i++) {
        keys.push(data[i].label);
        values.push(data[i].adm_percent);
    }
    
    var svg = d3.select("#" + svgId)
    var accent = d3.scaleOrdinal(d3.schemePaired ); 
    var pie = d3.pie();
    var arc = d3.arc().innerRadius(0).outerRadius(70);
    
    svg.append("g")
        .attr("transform", "translate(80,100)")
        .selectAll("path")
        .data(pie(values))
        .enter().append("path")
        .attr("d", arc)
        .attr("fill", function (d, i) { return accent(i); }); 
    
     // Title
    const margin = 30
    const title ="Actual enrollment by ethnic"
     svg.append("g")
        .attr("transform", `translate(${margin}, ${margin/2})`)
        .append("text")
        .text(title)
        .attr("text-anchor", "left")
        .attr("x", 0)
        .attr("y", 0)
        .attr("class", "title-text")
        .attr("fill", "black");
    
    var legend = svg.append("g")
        .attr("transform", function(d, i) { return "translate(220, 100)"; })   
        
    legend = svg.selectAll(".legend")
        .data(values)
        .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function(d, i) { return `translate(170, ${i*10 + 50})`; })   

    legend.append("rect")
        .attr("x", 10)
        .attr("y", 0)
        .attr("width", 20)
        .attr("height", 8)
        .attr("fill", function(d, i) { return accent(i);} );
                
    legend.append("text")
        .text(function (d, i) { return `${keys[i]} (${(d * 100).toFixed(0)}%)`; })
        .attr("x", 40)
        .attr("y", 8)
        .attr("class", "legend-text");
}