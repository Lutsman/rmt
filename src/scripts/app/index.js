// imports that could not be allocated to vendors
import Chart from 'chart.js';
import 'slick-carousel';

$(document).ready(function () {
    // slider
    (() => {
        const $container = $('.single-item');

        if (!$container.length) return;

        const options = {
            dots: true,
            draggable: false,
        };

        $container.slick(options);
    })();

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
        const $table404 = $('.table-datatable-404');
        const htmlRegex = new RegExp(/<[^>]*>/, 'g');
        const formatingData = (data, type) => {
            if (type === 'sort' || type === 'type') {
                const parsedData = typeof data === 'string' ? data.replace(htmlRegex, '') : data;
                return  parseFloat(parsedData);
            }

            return  data;
        };
        const options = {
            "columnDefs": [
                {
                    targets: [2],
                    render: formatingData,
                },
                {
                    targets: [3],
                    render: formatingData,
                },
                {
                    targets: [4],
                    render: formatingData,
                },
                {
                    targets: [5],
                    render: formatingData,
                },
            ],
        };
        const options404 = {
            "columnDefs": [
                {
                    targets: [2],
                    render: formatingData,
                },
                {
                    targets: [3],
                    render: formatingData,
                },
                {
                    targets: [4],
                    render: formatingData,
                },
            ],
        };

        const tableInst = $table.length > 0 ? $table.DataTable && $table.DataTable(options) : $table404.DataTable && $table404.DataTable(options404);

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
            const $resetFiltersBtn = $filterPane.find('.reset-filters');
            const $filterRewardFrom = $filterPane.find('.filter-reward-from');
            const $filterPriceFrom = $filterPane.find('.filter-price-from');
            const $filterPercentFrom = $filterPane.find('.filter-percent-from');
            const $currencyList = $('.currency-list');
            const $filtersFromInputs = $filterPane.find('.filter-from input');
            const $currentListFilter = $filterPane.find('.checkbox__input[name="currentList"]');
            const $notNecessaryFilter = $filterPane.find('.checkbox__input[name="notNecessary"]');

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

            $filterPane.on('input', '.filter-from input', () => {
                tableInst.draw();
            });

            $resetFiltersBtn.on('click', () => {
                const $checked = $filterPane.find('input[type="checkbox"]:checked');
                $filtersFromInputs.val(0);
                $checked.attr('checked', false);
                tableInst.draw();
            });

            const getActiveCurrencySelector = () => {
                const currentCurrency = $currencyList.find('.active').text().toUpperCase();

                return `.currency-${currentCurrency}`;
            };

            $.fn.dataTable.ext.search.push((settings, data, i, origData) => {
                const $checkboxesCheckedCategory = $filterPane.find('.filter-category input[type="checkbox"]:checked');
                const $checkboxesCheckedPlatform = $filterPane.find('.filter-platform input[type="checkbox"]:checked');
                const categoryValue = $(`<div>${origData[1]}</div>`).find('.category').text().toLowerCase();
                const platformValue = $(`<div>${origData[1]}</div>`).find('.platform').text().toLowerCase();
                const filterCell = ($filterInput, cellNumber) => {
                    if ($filterInput.val() <= 0) {
                        return false;
                    }

                    const $cell = $(`<div>${origData[cellNumber]}</div>`);
                    const $curentCurrency = $cell.find(getActiveCurrencySelector());
                    const currencyAmmount = $curentCurrency.length ?
                      parseFloat($cell.find(getActiveCurrencySelector()).text()) :
                      parseFloat($cell.text());

                    return $filterInput.val() > currencyAmmount;
                };
                const filterNotActual = () => {
                    const $cell = $(`<div>${origData[1]}</div>`);
                    const isChecked = $notNecessaryFilter.prop('checked');

                    return !isChecked && $cell.find('.table__title_pause').length > 0;
                };
                const filterActual = () => {
                    const $cell = $(`<div>${origData[1]}</div>`);
                    const isChecked = $currentListFilter.prop('checked');

                    return !isChecked && $cell.find('.table__title_pause').length === 0;
                };

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

                if (filterCell($filterRewardFrom, 3)) {
                    return false;
                }

                if (filterCell($filterPriceFrom, 5)) {
                    return false;
                }

                if (filterCell($filterPercentFrom, 4)) {
                    return false;
                }

                if (filterActual()) {
                    return false;
                }

                if (filterNotActual()) {
                    return false;
                }

                return true;
            });
        })();
    })();
});
