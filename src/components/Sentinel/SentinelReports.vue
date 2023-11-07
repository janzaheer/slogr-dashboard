<template>
    <div class="pageHeight">
        <div class="bg">
            <Header />
            <div class="container-fluid sentinel mt-2">
                <div class="d-flex justify-content-end">
                    <h1 class="me-2">
                        <RouterLink to="/sentinel"> <i class="fa-solid fa-xmark fa-xs" style="color: #d8dce2;"></i>
                        </RouterLink>
                    </h1>
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
                            <div class="text-center m-5" v-if="loading">
                                <VueSpinner size="100" color="#8cb63d" />
                            </div>
                            <div class="card-body" v-else>
                                <p class="card-text ms-3">Minio-SJC1</p>
                                <span class="card-text text-secondary ms-3">{{ clientData.name }}</span> <br>
                                <span class="card-text text-secondary ms-3">Data</span>
                                <hr class="hr">
                                <p class="card-text ms-3">System</p>
                                <span class="card-text text-secondary ms-3">{{ clientData.platform }}</span>
                                <hr class="hr">
                                <p class="card-text ms-3">Organization</p>
                                <span class="card-text text-secondary ms-3">{{ clientData.Organization }}</span>
                                <hr class="hr">
                                <p class="card-text ms-3">Location</p>
                                <span class="card-text text-secondary ms-3">{{ clientData.location }}</span>
                                <hr class="hr">
                                <p class="card-text ms-3">Country</p>
                                <span class="card-text text-secondary ms-3">{{ clientData.Country }}</span>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-2">
                        <div class="card pb-3">
                            <div class="text-center m-5" v-if="loading">
                                <VueSpinner size="100" color="#8cb63d" />
                            </div>
                            <div class="card-body" v-else>
                                <p class="card-text ms-3">Minio-SJC1 T1 Node</p>
                                <span class="card-text text-secondary ms-3">{{ serverData.name }} </span> <br>
                                <span class="card-text text-secondary ms-3">Data</span>
                                <hr class="hr">
                                <p class="card-text ms-3">System</p>
                                <span class="card-text text-secondary ms-3">{{ serverData.platform }}</span>
                                <hr class="hr">
                                <p class="card-text ms-3">Organization</p>
                                <span class="card-text text-secondary ms-3">{{ serverData.Organization }}</span>
                                <hr class="hr">
                                <p class="card-text ms-3">Location</p>
                                <span class="card-text text-secondary ms-3">{{ serverData.location }}</span>
                                <hr class="hr">
                                <p class="card-text ms-3">Country</p>
                                <span class="card-text text-secondary ms-3">{{ serverData.Country }}</span>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-7">
                        <div class="card h-100">
                            <div class="text-center m-5" v-if="loading2">
                                <VueSpinner size="100" color="#8cb63d" />
                            </div>
                            <div class="card-body" v-else>
                                <perfect-scrollbar>
                                    <div class="table-responsive">
                                        <table class="table text-center">
                                            <thead>
                                                <tr>
                                                    <th><a href="#" class="tableHead">UP <br> Min /Max /Sdev</a></th>
                                                    <th><a href="#" class="tableHead"> DOWN <br> Min /Max /Sdev</a></th>
                                                    <th><a href="#" class="tableHead">RTT <br> Min /Max /Sdev</a></th>
                                                    <!-- <th><a href="#" class="tableHead"> Packet <br> Loss</a></th> -->
                                                    <th><a href="#" class="tableHead"> JITTER <br> Min /Max /Sdev</a></th>
                                                    <th style="font-size: 18px; color: darkgray;"></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="data in analyticsData" :key="data.id">
                                                    <td>
                                                        <p class="tableP css">{{ data?.avg_up }}</p>
                                                        <p class="css fw-lighter"> {{ data.min_up }}/ {{ data.max_up }} /{{
                                                            data.st_up }}</p>
                                                    </td>
                                                    <td>
                                                        <p class="tableP css">{{ data.avg_down }}</p>
                                                        <p class="css fw-lighter">{{ data.min_down }}/ {{ data.max_down }}
                                                            /{{
                                                                data.st_down }}</p>
                                                    </td>
                                                    <td>
                                                        <p class="tableP css">{{ data.avg_rtt }}</p>
                                                        <p class="css fw-lighter">{{ data.min_rtt }}/ {{ data.max_rtt }} /{{
                                                            data.st_rtt }}</p>
                                                    </td>
                                                    <!-- <td>
                                                    <p class="tableP">{{ data?.t_packets }}</p>
                                                </td> -->
                                                    <td>
                                                        <p class="tableP css">{{ data.avg_jitter }}</p>
                                                        <p class="css fw-lighter">{{ data.min_jitter }} / {{ data.max_jitter
                                                        }}
                                                        </p>
                                                    </td>
                                                    <td class="fs-5"><a href="#"
                                                            class="text-decoration-none text-dark tableP">
                                                            <i class="fa-solid fa-ellipsis"></i></a></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </perfect-scrollbar>
                                    <div class="d-flex justify-content-between mt-3">
                                        <div>
                                            <button class="addBtn2"><i class="fa-solid fa-chevron-down fa-lg"></i> Go to
                                                Page</button>
                                        </div>
                                        <div>
                                            <div class="pagination">
                                                <button class="prevBtn" :disabled="pages.previousPage === 0"
                                                    v-on:click="handleSessionResults(pages.previousPage)"><i
                                                        class="fa-solid fa-angle-left"></i> Prev</button>
                                                <div class="pageNumber">-</div>
                                                <div class="pageNumber">-</div>
                                                <div class="pageNumber pageBtn">{{ pages.currentPage }}</div>
                                                <div class="pageNumber">-</div>
                                                <div class="pageNumber">-</div>
                                                <button class="nextBtn" :disabled="pages.nextPage === 0"
                                                    v-on:click="handleSessionResults(pages.nextPage)">Next <i
                                                        class="fa-solid fa-angle-right"></i></button>
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
import {
    RouterLink
} from 'vue-router';
import Header from '../common/Header.vue'
import {
    getSessionsResults
} from '../../../src/services/sessions_services';
import { getSessionsDetails } from '../../services/agents_reports_services'
import { PerfectScrollbar } from 'vue3-perfect-scrollbar'
import 'vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css'
import { VueSpinner } from 'vue3-spinners'
import axios from 'axios';
let base_url = import.meta.env.VITE_BASE_URL
export default {
    name: 'SentinelReports',
    components: {
        Header,
        RouterLink,
        PerfectScrollbar,
        VueSpinner
    },
    data() {
        return {
            analyticsData: [],
            clientData: [],
            serverData: [],
            loading: false,
            loading2: false,
            nextUrlPage: null,
            preUrlPage: null,
            pages:{
                currentPage: 1,
                previousPage: 1,
                nextPage: 1
            }
        }
    },
    mounted() {
        this.loadCharts()
        this.handleSessionResults()
        this.SessionsDetails()
        console.log('id', this.$route.params.id)
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
        },
        async handleSessionResults(page=1) {
            let id = this.$route.params.id
            try {
                this.loading2 = true;
                let res = await getSessionsResults(id,page)
                this.analyticsData = res.data.analytics
                this.pages.previousPage = res?.data?.prev || 0
                this.pages.currentPage = this.pages.previousPage + 1
                this.pages.nextPage = res?.data?.next || 0
                console.log('results', res.data)
            } catch (error) {
                console.log(error)
            } finally {
                this.loading2 = false;
            }
        },
        async SessionsDetails() {
            let id = this.$route.params.id
            try {
                this.loading = true;
                let res = await getSessionsDetails(id)
                this.clientData = res.data.client
                this.serverData = res.data.server
                console.log('details', res.data)
            } catch (error) {
                console.log(error)
            } finally {
                this.loading = false;
            }
        }
    },
}
</script>

<style>
.ps {
    height: 300px;
}

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
