function getLineChartOptions(title, container) {
    var options = {
        credits: { enabled: false },
        tooltip:{ crosshairs: [true] },
        chart: {
            renderTo: container,
            defaultSeriesType: 'line',
            width: 500,
            height: 400,
            backgroundColor: "#f8f8f8"
        },
        title: { text: title },
        xAxis: { categories: [] },
        yAxis: {
            title: { text: '' }
        },
        series: [],
        plotOptions: {
            line: {
                marker: { enabled: false }
            }
        },
        colors: ['#7cb5ec', '#f45b5b', '#90ed7d', '#f7a35c', '#f15c80', '#91e8e1']
    };
    return options;
}

function getColumnChartOptions(title, container) {
    var options = {
        credits: { enabled: false },
        tooltip:{ crosshairs: [true] },
        chart: {
            renderTo: container,
            defaultSeriesType: 'column',
            width: 500,
            height: 400
        },
        title: { text: title },
        xAxis: { categories: [] },
        yAxis: {
            title: { text: '' }
        },
        series: [],
        colors: ['#7cb5ec', '#f45b5b', '#90ed7d', '#f7a35c', '#f15c80', '#91e8e1']
    };
    return options;
}

function getEinwohnerGesamtData(container) {
    var options = getLineChartOptions("Einwohner in Paderborn", container);
    $.get('data/einwohner.csv', function(data) {
        // Split the lines
        var lines = data.split('\n');
        var seriesGesamt = {data: []};

        seriesGesamt.name = "Gesamt";

        // Iterate over the lines and add categories or series
        for(var i = 0; i < lines.length; i++){
            if(i == 0){
                continue;
            }
            var items = lines[i].split(';');
            var dateSplit = items[0].split(".");
            options.xAxis.categories.push(dateSplit[2]);
            seriesGesamt.data.push(parseFloat(items[1]));
        }
        options.series.push(seriesGesamt);
        // Create the chart
        var chart = new Highcharts.Chart(options);
    });
}

function getGeschlechterVerteilung(container){
    var options = getColumnChartOptions("Geschlechterverteilung in Paderborn", container);
    $.get('data/einwohner.csv', function(data) {
        // Split the lines
        var lines = data.split('\n');
        var seriesM = {data: []};
        var seriesW = {data: []};

        seriesM.name = "männlich";
        seriesW.name = "weiblich";

        // Iterate over the lines and add categories or series
        for(var i = 0; i < lines.length; i++){
            if(i == 0){
                continue;
            }
            var items = lines[i].split(';');
            var dateSplit = items[0].split(".");
            options.xAxis.categories.push(dateSplit[2]);
            seriesM.data.push(parseFloat(items[2]));
            seriesW.data.push(parseFloat(items[3]));
        }
        options.series.push(seriesM);
        options.series.push(seriesW);
        // Create the chart
        var chart = new Highcharts.Chart(options);
    });
}

function getAlterVerteilung2013(container){
    var categories = [];
    var options = {
        credits: { enabled: false },
        tooltip:{ crosshairs: [true] },
        chart: {
            renderTo: container,
            defaultSeriesType: 'bar',
            width: 500,
            height: 400
        },
        title: { text: "Geschlechterverteilung für 2013" },
        xAxis: [{
            categories: categories,
            reversed: false,
            labels: {
                step: 1
            }
        },
        {
            opposite: true,
            reversed: false,
            categories: categories,
            linkedTo: 0,
            labels: {
                step: 1
            }
        }],
        yAxis: {
            title: { text: '' }
        },
        plotOptions: {
            series: {
                stacking: 'normal'
            }
        },
        series: [],
        colors: ['#7cb5ec', '#f45b5b', '#90ed7d', '#f7a35c', '#f15c80', '#91e8e1']
    };
    $.get('data/einwohner_alter.csv', function(data) {
        // Split the lines
        var lines = data.split('\n');
        var seriesM = {data: []};
        var seriesW = {data: []};

        seriesM.name = "männlich";
        seriesW.name = "weiblich";


        // Iterate over the lines and add categories or series
        for(var i = 0; i < lines.length; i++){
            if(i == 0){
                //first line; get categories
                var lSplit = lines[i].split(";");
                for(var k = 3; k < lSplit.length; k++){
                    categories.push(lSplit[k]);
                }
            }
            else{
                var lSplit = lines[i].split(";");
                //console.log(lSplit);
                if (lSplit[0].indexOf("2013") > -1){
                    if(lSplit[1] == "t"){
                        continue;
                    }
                    else{
                        var seriesData = [];
                        for(var k = 3; k < lSplit.length; k++){
                            seriesData.push(parseFloat(lSplit[k]));
                        }
                        if(lSplit[1] == "m"){
                            for(var l= 0; l < seriesData.length; l++){
                                seriesData[l] = -1 * seriesData[l]
                            }
                            seriesM.data = seriesData;
                        }
                        else{
                            seriesW.data = seriesData;
                        }
                    }
                }
            }
        }
        console.log(seriesM);
        console.log(seriesW);
        options.series.push(seriesM);
        options.series.push(seriesW);
        var chart = new Highcharts.Chart(options);
    });
}