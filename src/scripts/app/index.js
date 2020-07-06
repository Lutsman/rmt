import Chart from 'chart.js';

$(document).ready(function() {
    //datatable
    // (() => {
    //     const $table = $('.table');
    //
    //     $table.DataTable();
    // })();

    //chart
    (() => {
        const $chartEl = $('.chart');
        const randomScalingFactor = function() {
            return Math.round(Math.random() * 100);
        };
        const colors = {
            blue: 'rgb(54, 162, 235)',
            green: 'rgb(75, 192, 192)',
            grey: 'rgb(201, 203, 207)',
            orange: 'rgb(255, 159, 64)',
            purple: 'rgb(153, 102, 255)',
            red: 'rgb(255, 99, 132)',
            yellow: 'rgb(255, 205, 86)',
        };
        const config = {
            type: 'pie',
            data: {
                datasets: [{
                    data: [
                        randomScalingFactor(),
                        randomScalingFactor(),
                        randomScalingFactor(),
                        randomScalingFactor(),
                        randomScalingFactor(),
                    ],
                    backgroundColor: [
                        colors.red,
                        colors.orange,
                        colors.yellow,
                        colors.green,
                        colors.blue,
                    ],
                    label: 'Dataset 1'
                }],
                labels: [
                    'Red',
                    'Orange',
                    'Yellow',
                    'Green',
                    'Blue'
                ]
            },
            options: {
                responsive: true
            }
        };
        const chart = new Chart($chartEl, config);
    })();
});