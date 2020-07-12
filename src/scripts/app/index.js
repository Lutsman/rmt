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
        const tableInst = $table.DataTable && $table.DataTable();

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

            $searchInput.on('input', e => {
                const $target = $(e.target);
                const val = $target.val();

                tableInst
                    .search(val)
                    .draw();
            });
        })();

        // filters
        (() => {
            const $tableFilterBtn = $('.table-filter-btn');

            if (!$tableFilterBtn.length) return;

            const $filterPane = $($tableFilterBtn.attr('data-target'));
            const $closeBtn = $filterPane.find('.filter__close');

            $closeBtn.on('click', () => {
                $filterPane.slideUp();
            });

            $tableFilterBtn.on('click', e => {
                e.preventDefault();
                e.stopPropagation();

                $filterPane.slideToggle();
            });

            $filterPane.on('click', 'label.checkbox', () => {
                tableInst.draw();
            });

            $.fn.dataTable.ext.search.push((settings, data, i, origData) => {
                const $checkboxesCheckedCategory = $filterPane.find('.filter-category input[type="checkbox"]:checked');
                const $checkboxesCheckedPlatform = $filterPane.find('.filter-platform input[type="checkbox"]:checked');
                const categoryValue = $(`<div>${origData[1]}</div>`).find('.category').text().toLowerCase();
                const platformValue = $(`<div>${origData[1]}</div>`).find('.platform').text().toLowerCase();

                if ($checkboxesCheckedCategory.length) {
                    let categoryFilter = false;

                    for(let i = 0; i < $checkboxesCheckedCategory.length; i++) {
                        const name = $checkboxesCheckedCategory.eq(i).attr('name').toLowerCase();

                        if (categoryValue.indexOf(name) >= 0) categoryFilter = true;
                    }

                    if (!categoryFilter) return false;
                }

                if ($checkboxesCheckedPlatform.length) {
                    let platformFilter = false;

                    for(let i = 0; i < $checkboxesCheckedPlatform.length; i++) {
                        const name = $checkboxesCheckedPlatform.eq(i).attr('name').toLowerCase();

                        if (platformValue.indexOf(name) >= 0) platformFilter = true;
                    }

                    if (!platformFilter) return false;
                }

                return true;
            });
        })();
    })();
});
