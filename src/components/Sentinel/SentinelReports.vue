<template>
    <div class="pageHeight">
        <div class="bg">
            <Header />
            <div class="container-fluid sentinel mt-2">
                <div class="d-flex justify-content-end">
                    <h1 class="me-2"><i class="fa-solid fa-xmark fa-xs" style="color: #d8dce2;"></i></h1>
                </div>
            </div>
            <div class="container-fluid">
                <div class="card mx-md-2">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-center ">
                            <div>
                                <h3 class="text-secondary ms-3 mt-2">Minio-SJC1</h3>
                            </div>
                            <div class="">
                                <div class="mx-3"><i class="fa-solid fa-rotate-right fa-rotate-270 fa-2xl"></i></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container-fluid">
                <div class="row g-2 mx-md-2 mt-4 mb-4">
                    <div class="col-lg-3">
                        <div class="card">
                            <div class="card-body">
                                <p class="card-text ms-3">Minio-SJC1</p>
                                <span class="card-text text-secondary ms-3">SJC-1C-node </span> <br>
                                <span class="card-text text-secondary ms-3">Data</span>
                                <hr class="hr">
                                <p class="card-text ms-3">System</p>
                                <span class="card-text text-secondary ms-3">Ubuntu</span>
                                <hr class="hr">
                                <p class="card-text ms-3">Organization</p>
                                <span class="card-text text-secondary ms-3">12345 Packet Host</span>
                                <hr class="hr">
                                <p class="card-text ms-3">City</p>
                                <span class="card-text text-secondary ms-3">Sugut</span>
                                <hr class="hr">
                                <p class="card-text ms-3">Country</p>
                                <span class="card-text text-secondary ms-3">Turkiye</span>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-2">
                        <div class="card pb-3">
                            <div class="card-body">
                                <p class="card-text ms-3">Minio-SJC1 T1 Node</p>
                                <span class="card-text text-secondary ms-3">SJC-1C-node </span> <br>
                                <span class="card-text text-secondary ms-3">Data</span>
                                <hr class="">
                                <p class="card-text ms-3">System</p>
                                <hr class="">
                                <p class="card-text ms-3">Organization</p>
                                <hr class="">
                                <p class="card-text ms-3">City</p>
                                <hr class="">
                                <p class="card-text ms-3">Country</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-7">
                        <div class="card">
                            <div class="card-body">
                                <div class="table-responsive">
                                    <table class="table text-center">
                                        <thead>
                                            <tr>
                                                <th><a href="#" class="tableHead">RT PD <br> Min /Max /Sdev</a></th>
                                                <th><a href="#" class="tableHead"> TX PD <br> Min /Max /Sdev</a></th>
                                                <th><a href="#" class="tableHead">RX PD <br> Min /Max /Sdev</a></th>
                                                <th><a href="#" class="tableHead"> Packet <br> Loss</a></th>
                                                <th><a href="#" class="tableHead"> Reordering <br> TX/RX</a></th>
                                                <th style="font-size: 18px; color: darkgray;"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <p class="tableP css">01.97</p>
                                                    <p class="css fw-lighter">300/ 150 /250</p>
                                                </td>
                                                <td>
                                                    <p class="tableP css">01.97</p>
                                                    <p class="css fw-lighter">300/ 150 /250</p>
                                                </td>
                                                <td>
                                                    <p class="tableP css">01.97</p>
                                                    <p class="css fw-lighter">300/ 150 /250</p>
                                                </td>
                                                <td>
                                                    <p class="tableP">0</p>
                                                </td>
                                                <td>
                                                    <p class="tableP css">0</p>
                                                    <p class="css fw-lighter">0 / 0</p>
                                                </td>
                                                <td class="fs-5"><a href="#" class="text-decoration-none text-dark tableP">
                                                        <i class="fa-solid fa-ellipsis"></i></a></td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <p class="tableP css">01.97</p>
                                                    <p class="css fw-lighter">300/ 150 /250</p>
                                                </td>
                                                <td>
                                                    <p class="tableP css">01.97</p>
                                                    <p class="css fw-lighter">300/ 150 /250</p>
                                                </td>
                                                <td>
                                                    <p class="tableP css">01.97</p>
                                                    <p class="css fw-lighter">300/ 150 /250</p>
                                                </td>
                                                <td>
                                                    <p class="tableP">0</p>
                                                </td>
                                                <td>
                                                    <p class="tableP css">0</p>
                                                    <p class="css fw-lighter">0 / 0</p>
                                                </td>
                                                <td class="fs-5"><a href="#" class="text-decoration-none text-dark tableP">
                                                        <i class="fa-solid fa-ellipsis"></i></a></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div class="d-flex justify-content-between">
                                    <div>
                                        <button class="addBtn2"><i class="fa-solid fa-chevron-down fa-lg"></i> Go to
                                            Page</button>
                                    </div>
                                    <div>
                                        <div class="pagination">
                                            <button class="prevBtn"><i class="fa-solid fa-angle-left"></i> Prev</button>
                                            <div class="pageNumber">1</div>
                                            <div class="pageNumber">2</div>
                                            <div class="pageNumber pageBtn">3</div>
                                            <div class="pageNumber">4</div>
                                            <div class="pageNumber">5</div>
                                            <button class="nextBtn">Next <i class="fa-solid fa-angle-right"></i></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container-fluid tableDiv">
                <div class="row g-2 mx-md-5 mb-5">
                    <div class="col-md-4">
                        <div class="card">
                            <div class="card-body">
                                <figure class="highcharts-figure">
                                    <div id="container"></div>
                                </figure>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="card">
                            <div class="card-body">
                                <figure class="highcharts-figure">
                                    <div id="container2"></div>
                                </figure>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="card">
                            <div class="card-body">
                                <figure class="highcharts-figure">
                                    <div id="container3"></div>
                                </figure>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Header from '../common/Header.vue'
export default {
    name: 'SentinelReports',
    components: {
        Header,
       
    },
    data() {
        return {
           
        }
    },
    methods: {
        loadCharts() {
            const chart = Highcharts.chart('container', {
                title: {
                    text: 'PDV',
                    align: 'left'
                },
                colors: [
                    '#4caefe',
                    '#3fbdf3',
                    '#35c3e8',
                    '#2bc9dc',
                    '#20cfe1',
                    '#16d4e6',
                    '#0dd9db',
                    '#03dfd0',
                    '#00e4c5',
                    '#00e9ba',
                    '#00eeaf',
                    '#23e274'
                ],
                xAxis: {
                    categories: ['2009', '2010', '2011', '2012', '2013', '2014']
                },
                series: [{
                    type: 'column',
                    name: 'Unemployed',
                    borderRadius: 5,
                    colorByPoint: true,
                    data: [75, 25, 130, 40, 60, 30],
                    showInLegend: false
                }]
            });

            const chart2 = Highcharts.chart('container2', {
                title: {
                    text: 'PDV TX',
                    align: 'left'
                },
                colors: [
                    '#4caefe',
                    '#3fbdf3',
                    '#35c3e8',
                    '#2bc9dc',
                    '#20cfe1',
                    '#16d4e6',
                    '#0dd9db',
                    '#03dfd0',
                    '#00e4c5',
                    '#00e9ba',
                    '#00eeaf',
                    '#23e274'
                ],
                xAxis: {
                    categories: ['2009', '2010', '2011', '2012', '2013', '2014']
                },
                series: [{
                    type: 'column',
                    name: 'Unemployed',
                    borderRadius: 5,
                    colorByPoint: true,
                    data: [75, 7, 130, 40, 60, 7],
                    showInLegend: false
                }]
            });

            const chart3 = Highcharts.chart('container3', {
                title: {
                    text: 'PDV RX',
                    align: 'left'
                },
                colors: [
                    '#4caefe',
                    '#3fbdf3',
                    '#35c3e8',
                    '#2bc9dc',
                    '#20cfe1',
                    '#16d4e6',
                    '#0dd9db',
                    '#03dfd0',
                    '#00e4c5',
                    '#00e9ba',
                    '#00eeaf',
                    '#23e274'
                ],
                xAxis: {
                    categories: ['2009', '2010', '2011', '2012', '2013', '2014']
                },
                series: [{
                    type: 'column',
                    name: 'Unemployed',
                    borderRadius: 5,
                    colorByPoint: true,
                    data: [75, 25, 130, 40, 60, 7],
                    showInLegend: false
                }]
            });
        }
    },
    mounted() {
        this.loadCharts()
    }
}
</script>

<style>
.hr {
    margin: 0.4rem 0;
    color: inherit;
    border: 0;
    border-top: var(--bs-border-width) solid;
    opacity: 0.25;
}

#container {
    height: 400px;
}

#container2 {
    height: 400px;
}

#container3 {
    height: 400px;
}

.highcharts-figure,
.highcharts-data-table table {
    min-width: 320px;
    max-width: 800px;
    margin: 1em auto;
}

.highcharts-data-table table {
    font-family: Verdana, sans-serif;
    border-collapse: collapse;
    border: 1px solid #ebebeb;
    margin: 10px auto;
    text-align: center;
    width: 100%;
    max-width: 500px;
}

.highcharts-data-table caption {
    padding: 1em 0;
    font-size: 1.2em;
    color: #555;
}

.highcharts-data-table th {
    font-weight: 600;
    padding: 0.5em;
}

.highcharts-data-table td,
.highcharts-data-table th,
.highcharts-data-table caption {
    padding: 0.5em;
}

.highcharts-data-table thead tr,
.highcharts-data-table tr:nth-child(even) {
    background: #f8f8f8;
}

.highcharts-data-table tr:hover {
    background: #f1f7ff;
}
</style>