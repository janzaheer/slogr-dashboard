<template>
    <div>
        <div class="container-fluid">
                <div class="card mx-md-2">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-center ">
                            <div>
                                <h3 class="text-muted ms-3 mt-2">{{ serverData.name }} <i
                                        class="fa-solid fa-arrow-right mx-2"></i> {{ clientData.name }} </h3>
                            </div>
                            <div class="">
                                <div class="mx-3"><i class="fa-solid fa-rotate-right fa-rotate-270 fa-2xl"
                                        v-on:click="handleReload"></i></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container-fluid">
                <div class="row g-2 mx-md-2 mt-4 mb-4">
                    <div class="col-lg-3">
                        <div class="card h-100">
                            <div class="text-center m-5" v-if="loading">
                                <VueSpinner size="100" color="#8cb63d" />
                            </div>
                            <div class="card-body" v-else>
                                <p class="card-text ms-3">Server</p>
                                <span class="card-text text-secondary ms-3">{{ serverData.name }}</span> <br>
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
                    <div class="col-lg-3">
                        <div class="card pb-3 h-100">
                            <div class="text-center m-5" v-if="loading">
                                <VueSpinner size="100" color="#8cb63d" />
                            </div>
                            <div class="card-body" v-else>
                                <p class="card-text ms-3">Client</p>
                                <span class="card-text text-secondary ms-3">{{ clientData.name }} </span> <br>
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
                    <div class="col-lg-6">
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
                                                    <th><a href="#" class="tableHead text-muted">UP <br> Min /Max
                                                            /Sdev</a></th>
                                                    <th><a href="#" class="tableHead text-muted"> DOWN <br> Min /Max
                                                            /Sdev</a></th>
                                                    <th><a href="#" class="tableHead text-muted">RTT <br> Min /Max
                                                            /Sdev</a></th>
                                                    <!-- <th><a href="#" class="tableHead"> Packet <br> Loss</a></th> -->
                                                    <th><a href="#" class="tableHead text-muted"> JITTER <br> Min /Max
                                                            /Sdev</a></th>
                                                    <th style="font-size: 18px; color: darkgray;"></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="data in analyticsData" :key="data.id">
                                                    <td>
                                                        <p class="tableP css">{{ data?.avg_up }}</p>
                                                        <p class="css fw-lighter"> {{ data.min_up }}/ {{ data.max_up }}
                                                            /{{
                                                                data.st_up }}</p>
                                                    </td>
                                                    <td>
                                                        <p class="tableP css">{{ data.avg_down }}</p>
                                                        <p class="css fw-lighter">{{ data.min_down }}/ {{ data.max_down
                                                            }}
                                                            /{{
                                                                data.st_down }}</p>
                                                    </td>
                                                    <td>
                                                        <p class="tableP css">{{ data.avg_rtt }}</p>
                                                        <p class="css fw-lighter">{{ data.min_rtt }}/ {{ data.max_rtt }}
                                                            /{{
                                                                data.st_rtt }}</p>
                                                    </td>
                                                    <!-- <td>
                                                    <p class="tableP">{{ data?.t_packets }}</p>
                                                </td> -->
                                                    <td>
                                                        <p class="tableP css">{{ data.avg_jitter }}</p>
                                                        <p class="css fw-lighter">{{ data.min_jitter }} / {{
                                                            data.max_jitter
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
                                <div class="d-flex justify-content-end mt-3">
                                    <!-- <div>
                                            <button class="addBtn2"><i class="fa-solid fa-chevron-down fa-lg"></i> Go to
                                                Page</button>
                                        </div> -->
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
                <div class="row g-2 mx-md-2 mb-5">
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
</template>

<script>
import {
    getSessionsResults
} from '../../../src/services/sessions_services';
import { getSessionsDetails } from '../../services/agents_reports_services'
import { PerfectScrollbar } from 'vue3-perfect-scrollbar'
import 'vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css'
import { VueSpinner } from 'vue3-spinners';
import moment from 'moment'
import Toast from '../Toast';
import Highcharts from 'highcharts'

export default {
    name: 'ReportsChild',
    components: {
        PerfectScrollbar,
        VueSpinner
    },
    created: function () {
        this.moment = moment;
    },
    props:{
        id:String
    },
    data() {
        return {
            analyticsData: [],
            clientData: [],
            serverData: [],
            loading: false,
            loading2: false,
            pages: {
                currentPage: 1,
                previousPage: 1,
                nextPage: 1
            },
            Up: [],
            DownLink: [],
            Rtt: []
        }
    },
    mounted() {
        this.handleSessionResults()
        this.SessionsDetails()
    },
    methods: {

        async handleSessionResults(page = 1) {
            try {
                this.loading2 = true;
                let res = await getSessionsResults(this.id, page)
                this.analyticsData = res.data.analytics
                this.pages.previousPage = res?.data?.prev || 0
                this.pages.currentPage = this.pages.previousPage + 1
                this.pages.nextPage = res?.data?.next || 0
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
                let res = await getSessionsDetails(this.id)
                this.clientData = res.data.client
                this.serverData = res.data.server
                this.Up = res.data.uplink
                this.DownLink = res.data.downlink
                this.Rtt = res.data.rtt
                await this.loadCharts();
            } catch (error) {
                console.log(error)
            } finally {
                this.loading = false;
            }
        },

        async loadCharts() {

            // ===== UPLINK =====
            const categories1 = this.Up.map(d =>
                moment(d.date).format('HH:mm:ss')
            );

            const values1 = this.Up.map(d =>
                parseFloat(d.value)
            );

            Highcharts.chart('container', {
                chart: {
                    type: 'column'
                },
                title: {
                    text: 'UPLINK'
                },
                xAxis: {
                    categories: categories1,
                    scrollbar: {
                        enabled: true
                    }
                },
                yAxis: {
                    title: {
                        text: 'Value'
                    }
                },
                series: [{
                    name: 'Uplink',
                    data: values1
                }],
                credits: {
                    enabled: false
                }
            });


            // ===== DOWNLINK =====
            const categories2 = this.DownLink.map(d =>
                moment(d.date).format('HH:mm:ss')
            );

            const values2 = this.DownLink.map(d =>
                parseFloat(d.value)
            );

            Highcharts.chart('container2', {
                chart: {
                    type: 'column'
                },
                title: {
                    text: 'DOWNLINK'
                },
                xAxis: {
                    categories: categories2,
                    scrollbar: {
                        enabled: true
                    }
                },
                yAxis: {
                    title: {
                        text: 'Value'
                    }
                },
                series: [{
                    name: 'Downlink',
                    data: values2
                }],
                credits: {
                    enabled: false
                }
            });


            // ===== RTT =====
            const categories3 = this.Rtt.map(d =>
                moment(d.date).format('HH:mm:ss')
            );

            const values3 = this.Rtt.map(d =>
                parseFloat(d.value)
            );

            Highcharts.chart('container3', {
                chart: {
                    type: 'column'
                },
                title: {
                    text: 'RTT'
                },
                xAxis: {
                    categories: categories3,
                    scrollbar: {
                        enabled: true
                    }
                },
                yAxis: {
                    title: {
                        text: 'Value'
                    }
                },
                series: [{
                    name: 'RTT',
                    data: values3
                }],
                credits: {
                    enabled: false
                }
            });

        },
        async handleReload() {
            Toast.fire({ icon: "success", title: "Restart" })
            await this.handleSessionResults()
            await this.SessionsDetails()
            await this.loadCharts()
        }
    },
}
</script>