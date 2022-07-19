function formatNumber(x) {
    return parseInt(x).toLocaleString();
}

function getSummaryByEthnic(data) {
    const ethnicAll = EthnicInfo[0];
    const totalAdm = d3.sum(data, d => d[ethnicAll.adm_rate_field]);
    ethnicAll.adm_count = totalAdm;

    // Calculate the sum of admission count for each ethnic group across the dataset
    EthnicInfo.forEach(e => {
        if (e.label != "All") {
            e.adm_count = Math.floor(d3.sum(data, d => parseFloat(d[e.adm_rate_field]) * d["UGDS"])); 
            e.adm_percent = e.adm_count / totalAdm;

            e.adm_count_norm = totalAdm * e.population;
            e.adm_count_diff_abs = (e.adm_count - e.adm_count_norm)

            if (e.adm_count_norm != 0)
                e.adm_count_diff = e.adm_count_diff_abs * 100 / e.adm_count_norm;
        }
    });

    return EthnicInfo;
}

function getSummaryByGender(data) {
    const genderAll = GenderInfo[0];   
    const totalAdm = d3.sum(data, d => d[genderAll.adm_rate_field]);
    genderAll.adm_count = totalAdm;

    // Calculate the sum of admission count for each gender group across the dataset
    GenderInfo.forEach(e => {
        if (e.label != "All") {
            e.adm_count = Math.floor(d3.sum(data, d => parseFloat(d[e.adm_rate_field]) * d["UGDS"])); 
            e.adm_percent = e.adm_count / totalAdm;

            e.adm_count_norm = totalAdm * e.population;  
            e.adm_count_diff_abs = (e.adm_count - e.adm_count_norm)

            if (e.adm_count_norm != 0)
                e.adm_count_diff = e.adm_count_diff_abs * 100 / e.adm_count_norm;
        }
    });

    return GenderInfo;
}

function setupDropdown(id, data, indexAsValue) {
    var dropDown = d3.select("#" + id);

    var options = dropDown.selectAll("option")
        .data(data)
        .enter()
        .append("option");
    
    options.text(function (d) {
        return d;
    })
        .attr("value", function (d, i) {
            if (indexAsValue) return i;
            return d;
        });
}

function setupDropdownByRange(id, min, max, step) {
    var dropDown = d3.select("#" + id);

    var data = [""];

    for (var val = min; val < max; val += step) {
        data.push(`${val} - ${val + step - 1}`);
    }

    var options = dropDown.selectAll("option")
        .data(data)
        .enter()
        .append("option");
    
    options.text(function(d) {
        return d;
    })
    .attr("value", function(d, i) {
        return d;
    });
}