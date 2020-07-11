import Chart from 'chart.js';

$(document).ready(function() {
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
            gridLines: {
                display: false,
            },
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
                tooltips: {
                    enabled: true,
                },
                responsive: true,
                legend: {
                    display: false,
                },
                elements: {
                    arc: {
                        borderWidth: 0,
                    },
                },
            }
        };

        $chartEl.each(function () {
            const chart = new Chart(this, config);
        });
    })();

    //datatable
    (() => {
        const $table = $('.table-datatable');
        const tableInst = $table.DataTable();

        // search input
        (() => {
            const $searchContainer = $('.search--use-table');
            const $searchInput = $searchContainer.find('.search__input');
            const $resetBtn = $searchContainer.find('.search__close');
            const $submitBtn = $searchContainer.find('.search__submit');

            $submitBtn.on('click', () => {
                const val = $searchInput.val();

                tableInst
                    .search(val)
                    .draw();
            });

            $resetBtn.on('click', () => {
                $searchInput.val('');
                tableInst
                    .search('')
                    .draw();
            });

            // $searchInput.on('input', e => {
            //     const $target = $(e.target);
            //     const val = $target.val();
            //     console.log(val);
            //
            //     tableInst
            //         .search(val)
            //         .draw();
            //
            //     // if (!val) {
            //     //     $table.search(val).reset();
            //     // } else {
            //     //     $table.
            //     // }
            // });
        })();

        // filters
        (() => {

        })();
    })();
});
