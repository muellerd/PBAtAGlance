function getLineChartOptions(title, container) {
    var options = {
        credits: { enabled: false },
        tooltip:{ crosshairs: [true] },
        chart: {
            renderTo: container,
            defaultSeriesType: 'line',
            width: 500,
            height: 400
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
    
}