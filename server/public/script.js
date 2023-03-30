"use strict"




google.load('visualization', '1.0', {
    'packages': ['corechart']
});
// var visualization = new google.visualization.Histogram(container);
google.charts.load("current", {
    packages: ["corechart"]
});
google.charts.load("current", {
    packages: ["bar"]
});
document.addEventListener('DOMContentLoaded', () => {

    const btnOne = document.getElementById("one");
    const btnTwo = document.getElementById("two");
    const btnThree = document.getElementById("three");
    const btnFour = document.getElementById("four");
    const btnFive = document.getElementById("five");

    const indexOne = document.getElementById("indexOne");
    const indexTwo = document.getElementById("indexTwo");

    btnOne.addEventListener("click", startDrawOne);
    btnTwo.addEventListener("click", SetRun);
    btnThree.addEventListener("click", startDrawThree);
    btnFour.addEventListener("click", startDrawFour);
    btnFive.addEventListener("click", startDrawFive);

    indexOne.addEventListener("click", startDrawFirstIndex);
    indexTwo.addEventListener("click", startDrawSecondIndex);

});
var run = 0;
var interval;


function SetRun() {
    if (run == 0) {
        interval = setInterval(() => {
            startDrawTwo();
        }, 3000);
        run = 1;
    } else {
        clearInterval(interval);
        run = 0;
    }
}

function startDrawOne(event) {
    if (run == 1) {
        SetRun();
    }

    getDataOne(event, res => {

        google.charts.setOnLoadCallback(drawChartOne(res));
    })
}

function startDrawTwo(event) {

    getDataTwo(event, res => {

        google.charts.setOnLoadCallback(drawChartTwo(res));
    })
}

function startDrawThree(event) {
    if (run == 1) {
        SetRun();
    }
    getDataThree(event, res => {

        google.charts.setOnLoadCallback(drawChartThree(res));
    })
}

function startDrawFour(event) {
    if (run == 1) {
        SetRun();
    }
    getDataFour(event, res => {

        google.charts.setOnLoadCallback(drawChartFour(res));
    })
}

function startDrawFive(event) {
    if (run == 1) {
        SetRun();
    }
    getDataFive(event, res => {

        google.charts.setOnLoadCallback(drawChartFive(res));
    })
}

function startDrawFirstIndex(event) {
    if (run == 1) {
        SetRun();
    }
    getDataFirstIndex(event, res => {

        google.charts.setOnLoadCallback(drawFirstIndex(res));
    })
}

function startDrawSecondIndex(event) {
    if (run == 1) {
        SetRun();
    }
    getDataSecondIndex(event, res => {

        google.charts.setOnLoadCallback(drawSecondIndex(res));
    })
}

async function getDataOne(event, handle) {
    let req = new XMLHttpRequest();
    req.open('POST', '/faction', true);
    req.setRequestHeader("Content-Type", "application/json");
    req.send();
    req.addEventListener('load', async () => {
        var temp = document.getElementById('chart_div');
        temp.innerHTML = '';
        document.getElementById('main').innerText = '';
        const d = await JSON.parse(req.response);
        handle(d);

    });
}
async function getDataTwo(event, handle) {
    let req = new XMLHttpRequest();
    req.open('POST', '/years', true);
    req.setRequestHeader("Content-Type", "application/json");
    req.send();
    req.addEventListener('load', async () => {
        var temp = document.getElementById('chart_div');
        temp.innerHTML = '';
        document.getElementById('main').innerText = '';
        const d = await JSON.parse(req.response);
        handle(d);

    });
}
async function getDataThree(event, handle) {
    let req = new XMLHttpRequest();
    req.open('POST', '/years2', true);
    req.setRequestHeader("Content-Type", "application/json");
    req.send();
    req.addEventListener('load', async () => {
        var temp = document.getElementById('chart_div');
        temp.innerHTML = '';
        document.getElementById('main').innerText = '';
        const d = await JSON.parse(req.response);
        handle(d);

    });
}
async function getDataFour(event, handle) {
    let req = new XMLHttpRequest();
    req.open('POST', '/price', true);
    req.setRequestHeader("Content-Type", "application/json");
    req.send();
    req.addEventListener('load', async () => {
        var temp = document.getElementById('chart_div');
        temp.innerHTML = '';
        document.getElementById('main').innerText = '';
        const d = await JSON.parse(req.response);
        handle(d);

    });
}

async function getDataFive(event, handle) {
    let req = new XMLHttpRequest();
    req.open('POST', '/price2', true);
    req.setRequestHeader("Content-Type", "application/json");
    req.send();
    req.addEventListener('load', async () => {
        var temp = document.getElementById('chart_div');
        temp.innerHTML = '';
        document.getElementById('main').innerText = '';
        const d = await JSON.parse(req.response);
        handle(d);

    });
}

async function getDataFirstIndex(event, handle) {
    let req = new XMLHttpRequest();
    req.open('POST', '/index', true);
    req.setRequestHeader("Content-Type", "application/json");
    req.send();
    req.addEventListener('load', async () => {
        var temp = document.getElementById('chart_div');
        temp.innerHTML = '';
        document.getElementById('main').innerText = '';
        const d = await JSON.parse(req.response);
        handle(d);

    });
}

async function getDataSecondIndex(event, handle) {
    let req = new XMLHttpRequest();
    req.open('POST', '/index2', true);
    req.setRequestHeader("Content-Type", "application/json");
    req.send();
    req.addEventListener('load', async () => {
        var temp = document.getElementById('chart_div');
        temp.innerHTML = '';
        document.getElementById('main').innerText = '';
        const d = await JSON.parse(req.response);
        handle(d);

    });
}


function drawChartOne(d) {
    var array = [
        ['Alliance', Number(d[0].alliance)],
        ['Horde', Number(d[0].horde)]
    ];
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Topping');
    data.addColumn('number', 'Slices');
    data.addRows(array);

    // Set chart options
    var options = {
        'title': 'Popularity of the factions',
        'width': 800,
        'height': 600
    };

    var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
    chart.draw(data, options);
}

function drawChartTwo(d) {

    var data = google.visualization.arrayToDataTable([
        ['Year', 'Users'],
        ['2015', Number(d[0].y2015)],
        ['2016', Number(d[0].y2016) + Number(d[0].y2015)],
        ['2017', Number(d[0].y2017) + Number(d[0].y2016) + Number(d[0].y2015)],
        ['2018', Number(d[0].y2018) + Number(d[0].y2017) + Number(d[0].y2016) + Number(d[0].y2015)],
        ['2019', Number(d[0].y2019) + Number(d[0].y2018) + Number(d[0].y2017) + Number(d[0].y2016) + Number(d[0].y2015)],
        ['2020', Number(d[0].y2020) + Number(d[0].y2019) + Number(d[0].y2018) + Number(d[0].y2017) + Number(d[0].y2016) + Number(d[0].y2015)],
        ['2021', Number(d[0].y2021) + Number(d[0].y2020) + Number(d[0].y2019) + Number(d[0].y2018) + Number(d[0].y2017) + Number(d[0].y2016) + Number(d[0].y2015)]
    ]);

    var options = {
        title: 'Users analysis',
        hAxis: {
            title: 'Year',
            titleTextStyle: {
                color: '#333'
            }
        },
        vAxis: {
            title: 'Number of users',
            minValue: 0
        }
    };

    var chart = new google.visualization.AreaChart(document.getElementById('chart_div'));
    chart.draw(data, options);
}

function drawChartThree(d) {
    var data = google.visualization.arrayToDataTable([
        ['Year', 'Users'],
        ['2015', Number(d[0].y2015)],
        ['2016', Number(d[0].y2016)],
        ['2017', Number(d[0].y2017)],
        ['2018', Number(d[0].y2018)],
        ['2019', Number(d[0].y2019)],
        ['2020', Number(d[0].y2020)],
        ['2021', Number(d[0].y2021)]
    ]);

    var options = {
        width: 900,
        legend: {
            position: 'none'
        },
        bars: 'horizontal', // Required for Material Bar Charts.
        axes: {
            x: {
                0: {
                    side: 'top',
                    label: 'Users'
                } // Top x-axis.
            }
        },
        bar: {
            groupWidth: "90%"
        }
    };

    var chart = new google.charts.Bar(document.getElementById('chart_div'));
    chart.draw(data, options);
}

function drawChartFour(d) {

    var data = new google.visualization.arrayToDataTable([
        ['Difficulties', 'Amount', 'Avarge price'],
        [d[0].name, Number(d[0].count), Number(d[0].avg)],
        [d[1].name, Number(d[1].count), Number(d[1].avg)],
        [d[2].name, Number(d[2].count), Number(d[2].avg)],
        [d[3].name, Number(d[3].count), Number(d[3].avg)]
    ]);

    var options = {
        width: 800,
        bars: 'horizontal', // Required for Material Bar Charts.
        series: {
            0: {
                axis: 'distance'
            }, // Bind series 0 to an axis named 'distance'.
            1: {
                axis: 'brightness'
            } // Bind series 1 to an axis named 'brightness'.
        },
        axes: {
            x: {
                distance: {
                    label: 'Prices'
                }, // Bottom x-axis.
                brightness: {
                    side: 'top',
                    label: 'Products'
                } // Top x-axis.
            }
        }
    };

    var chart = new google.charts.Bar(document.getElementById('chart_div'));
    chart.draw(data, options);
}

function drawChartFive(d) {
    // Some raw data (not necessarily accurate)
    var data = google.visualization.arrayToDataTable([
        ['Difficulties', 'Alliance', 'Horde', 'Any'],
        ['Heroic', Number(d[0].avg), Number(d[2].avg), Number(d[1].avg)],
        ['Mythic', Number(d[3].avg), Number(d[5].avg), Number(d[4].avg)],
        ['Mythic+', Number(d[6].avg), Number(d[8].avg), Number(d[7].avg)],
        ['Normal', Number(d[9].avg), Number(d[11].avg), Number(d[10].avg)]
    ]);

    var options = {
        title: 'Average prices of different difficulties for different factions',
        vAxis: {
            title: 'Prices'
        },
        hAxis: {
            title: 'Difficulies'
        },
        seriesType: 'bars',
        series: {
            5: {
                type: 'line'
            }
        }
    };

    var chart = new google.visualization.ComboChart(document.getElementById('chart_div'));
    chart.draw(data, options);
}

function drawFirstIndex(d) {

    var data = google.visualization.arrayToDataTable([
        ['', 'Execution Time', ],
        ['With index', Number(d['true']['QUERY PLAN'].split(' ')[d['true']['QUERY PLAN'].split(' ').length - 2])],
        ['Without index', Number(d['false']['QUERY PLAN'].split(' ')[d['false']['QUERY PLAN'].split(' ').length - 2])]
    ]);

    var options = {
        title: 'Index',
        chartArea: {
            width: '50%'
        },
        hAxis: {
            minValue: 0
        }
    };

    var chart = new google.visualization.BarChart(document.getElementById('chart_div'));
    document.getElementById('main').innerText = `
   SELECT * , reviews.comment FROM sellers
   INNER JOIN reviews ON reviews.seller_id = sellers.id
   WHERE name LIKE 'koltowa'
   OR sellers.id = 2000000 `;
    chart.draw(data, options);
}

function drawSecondIndex(d) {
    var data = google.visualization.arrayToDataTable([
        ['', 'Execution Time', ],
        ['With index', Number(d['true']['QUERY PLAN'].split(' ')[d['true']['QUERY PLAN'].split(' ').length - 2])],
        ['Without index', Number(d['false']['QUERY PLAN'].split(' ')[d['false']['QUERY PLAN'].split(' ').length - 2])]
    ]);

    var options = {
        title: 'Index',
        chartArea: {
            width: '50%'
        },
        hAxis: {
            minValue: 0
        }
    };

    var chart = new google.visualization.BarChart(document.getElementById('chart_div'));
    document.getElementById('main').innerText = `
    SELECT COUNT( * ) FROM products
        WHERE products.id BETWEEN 6377838 AND 6386774
        AND products.cost BETWEEN 1000 AND 3000`;
    chart.draw(data, options);
}