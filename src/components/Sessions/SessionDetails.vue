<template>
    <div class="pageHeight">
        <div class="bg">
            <Header />
            <div class="container-fluid sentinel mt-2">
                <div class="d-flex justify-content-end">
                    <RouterLink :to="`/sessionReports/` + $route.params.id">
                        <h1 class="me-2"><i class="fa-solid fa-xmark fa-xs" style="color: #d8dce2;"></i></h1>
                    </RouterLink>

                </div>
            </div>
            <div class="container-fluid">
                <div class="card mx-md-2">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-center ">
                            <div>
                                <h3 class="text-secondary ms-3 mt-2">Traceroutes</h3>
                            </div>
                            <div class="d-flex align-items-center">
                                <h6 class="mx-1 mt-2 text-muted">Sessions Reports </h6>
                                <h6 class="me-4 mt-2"> - Trace Routes</h6>

                                <div class="mx-3"><i class="fa-solid fa-ellipsis fa-2xl"></i></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container-fluid tableDiv">
                <div class="card mx-md-2 mt-4 mb-5">
                    <div class="card-body">
                        <!-- Session Details Header -->
                        <div class="session-header my-3">

                            <div class="session-meta">
                                <span><strong>Source:</strong> <span style="color: var(--primary_color);">{{
                                    sessionData?.s_name }}</span></span>
                                <span><strong>Target:</strong> <span style="color: var(--primary_color);">{{
                                    sessionData?.c_name }}</span></span>
                                <span><strong>Status:</strong> <span
                                        style="color: var(--primary_color);">OK</span></span>
                            </div>
                        </div>

                        <!-- Date Filter -->
                        <div class="card filter-card mb-3">
                            <div class="card-body py-2">
                                <div class="d-flex align-items-center gap-3 flex-wrap">
                                    <div class="d-flex align-items-center gap-2">
                                        <label class="fw-semibold" style="font-size:13px; white-space:nowrap;">From:</label>
                                        <input type="date" class="form-control form-control-sm" style="width:160px;" v-model="dateFrom" />
                                    </div>
                                    <div class="d-flex align-items-center gap-2">
                                        <label class="fw-semibold" style="font-size:13px; white-space:nowrap;">To:</label>
                                        <input type="date" class="form-control form-control-sm" style="width:160px;" v-model="dateTo" />
                                    </div>
                                    <button class="btn btn-sm"
                                        style="background-color: var(--primary_color); color:white; padding: 4px 20px;"
                                        @click="applyFilter">Apply</button>
                                    <button class="btn btn-sm"
                                        style="background-color: white; color: var(--primary_color); border: 1px solid var(--primary_color); padding: 4px 20px;"
                                        @click="clearFilter">Clear</button>
                                </div>
                            </div>
                        </div>

                        <!-- Latency Chart Card -->
                        <div class="card mx-md-2 mt-4 mb-5">
                            <div class="card-body chart-header">
                                <h5>Latency (ms)</h5>
                                <div class="legend">
                                    <span class="legend-dot" style="background:#4A90D9;"></span>
                                    <span>95th percentile</span>
                                </div>
                            </div>
                            <div class="text-center my-4" v-if="traceLoading">
                                <VueSpinner size="80" color="#8cb63d" />
                            </div>
                            <div id="traceContainer" style="height: 300px;" v-else></div>
                        </div>

                        <!-- Path Card -->
                        <div class="card mx-md-2 mt-4 mb-5" v-if="!traceLoading && traceroutes.length">
                            <div class="card-body">
                                <div class="path-title-section">
                                    <h5>Path at {{ traceroutes[0]?.created_at ?
                                        moment(traceroutes[0].created_at).format('MM/DD/YYYY HH:mm:ss') : '' }}</h5>
                                    <div class="badge-group">
                                        <span class="badge baseline">Baseline</span>
                                        <span class="badge current">Current</span>
                                    </div>
                                </div>
                            </div>
                            <div class="path-ribbon">
                                <div class="node source-node">
                                    <div style="font-size:11px; color:#6b7280;">Source</div>
                                    <div style="font-weight:600;">{{ sessionData?.s_name }}</div>
                                </div>

                                <template v-if="traceroutes.filter(t => t.asn !== null).length > 0">
                                    <template v-for="hop in traceroutes.filter(t => t.asn !== null).slice(0, 3)"
                                        :key="hop.id">
                                        <div class="arrow"><i class="fa-solid fa-arrow-right text-muted mx-2"></i></div>
                                        <div class="node asn-node">
                                            <div class="asn-number">{{ hop.asn }}</div>
                                            <div class="asn-name">{{ hop.hostname || hop.address }}</div>
                                        </div>
                                    </template>
                                </template>
                                <template v-else>
                                    <span class="text-muted ms-3 me-3" style="font-size: 13px;">No ASN hops
                                        available</span>
                                </template>

                                <div class="arrow"><i class="fa-solid fa-arrow-right text-muted mx-2"></i></div>
                                <div class="node target-node">
                                    <div style="font-size:11px; color:#6b7280;">Target</div>
                                    <div style="font-weight:600;">{{ sessionData?.c_name }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Header from '../common/Header.vue';
import { VueSpinner } from 'vue3-spinners';
import { getTracerouteBySession } from '../../services/sessions_services';
import Toast from '../Toast';
import Highcharts from 'highcharts';
import moment from 'moment';

export default {
    name: 'SessionDetails',
    components: {
        Header,
        VueSpinner
    },
    created() {
        this.moment = moment;
    },
    data() {
        return {
            sessionData: null,
            traceroutes: [],
            traceLoading: false,
            chartInstance: null,
            
            dateFrom: '',
            dateTo: ''
        }
    },
    mounted() {
        this.fetchTraceroutes()
    },
    methods: {
        async fetchTraceroutes() {
            try {
                this.traceLoading = true
                const res = await getTracerouteBySession(this.$route.params.id, this.dateFrom, this.dateTo)
                this.sessionData = res.data.session
                this.traceroutes = res.data.traceroutes
                this.traceLoading = false
                await this.$nextTick()
                this.loadTraceChart()
            } catch (error) {
                console.log(error)
                Toast.fire({ icon: 'error', title: 'Failed to load trace' })
                this.traceLoading = false
            }
        },
        applyFilter() {
            if (!this.dateFrom) {
                Toast.fire({ icon: 'warning', title: 'Please select at least a From date' })
                return
            }
            if (this.dateTo && this.dateFrom > this.dateTo) {
                Toast.fire({ icon: 'warning', title: 'To date cannot be before From date' })
                return
            }
            this.fetchTraceroutes()
        },
        clearFilter() {
            this.dateFrom = ''
            this.dateTo = ''
            this.fetchTraceroutes()
        },
        loadTraceChart() {
            const categories = this.traceroutes.map((t, i) => String(i + 1))
            const rttValues = this.traceroutes.map(t => parseFloat(t.rtt))
            const ttlValues = this.traceroutes.map(t => parseFloat(t.ttl))

            this.chartInstance = Highcharts.chart('traceContainer', {
                chart: {
                    type: 'spline',
                    backgroundColor: 'white'
                },
                title: { text: '' },
                xAxis: {
                    categories: categories,
                    title: { text: 'Hop' },
                    gridLineWidth: 1,
                    gridLineColor: '#f0f0f0'
                },
                yAxis: [
                    {
                        title: {
                            text: 'RTT (ms)',
                            style: { color: '#4A90D9' }
                        },
                        gridLineWidth: 1,
                        gridLineColor: '#f0f0f0',
                        min: 0
                    },
                    {
                        title: {
                            text: 'TTL',
                            style: { color: '#f59e0b' }
                        },
                        opposite: true,
                        gridLineWidth: 0,
                        min: 0
                    }
                ],
                plotOptions: {
                    spline: {
                        marker: {
                            enabled: true,
                            radius: 4
                        },
                        lineWidth: 2
                    }
                },
                tooltip: {
                    shared: true,
                    formatter: function () {
                        return this.points.reduce((s, point) => {
                            return s + '<br/><span style="color:' + point.color + '">●</span> ' +
                                point.series.name + ': <b>' + point.y + '</b>'
                        }, '<b>Hop ' + this.x + '</b>')
                    }
                },
                legend: { enabled: true },
                series: [
                    {
                        name: 'RTT (ms)',
                        data: rttValues,
                        color: '#4A90D9',
                        yAxis: 0
                    },
                    {
                        name: 'TTL',
                        data: ttlValues,
                        color: '#f59e0b',
                        yAxis: 1
                    }
                ],
                credits: { enabled: false }
            })
        }
    }
}
</script>

<style scoped>
/* Session Header */


.session-meta {
    display: flex;
    gap: 32px;
    color: #4b5563;
    font-size: 14px;
}

.session-meta strong {
    color: #1f2937;
    font-weight: 600;
}

/* Range Buttons */
.range-buttons {
    margin: 20px 0;
}

.range-btn {
    padding: 6px 16px;
    border: 1px solid var(--primary_color);
    background: white;
    color: var(--primary_color);
    cursor: pointer;
    font-size: 13px;
    transition: all 0.2s;
}

.range-btn:hover {
    background: var(--primary_color_Hover);
    color: white;
}

.range-btn.active {
    background: var(--primary_color);
    color: white;
    border-color: var(--primary_color);
}

/* Cards */

.legend {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 13px;
    color: #6b7280;
}

.legend-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    display: inline-block;
}

/* Path Card */


.path-title-section {
    display: flex;
    align-items: center;
    gap: 16px;
    flex-wrap: wrap;
}

.path-title-section h5 {
    font-size: 16px;
    font-weight: 600;
    color: #111827;
    margin: 0;
}

.badge-group {
    display: flex;
    gap: 8px;
}

.badge {
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 500;
    display: inline-block;
}

.badge.baseline {
    background: #f3f4f6;
    color: #1f2937;
    border: 1px solid #d1d5db;
}

.badge.current {
    background: #10b981;
    color: white;
}

/* Path Ribbon */
.path-ribbon {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
    background: #f9fafb;
    padding: 16px;
    border-radius: 10px;
    border: 1px solid #e5e7eb;
}

.node {
    padding: 8px 16px;
    border-radius: 24px;
    background: white;
    border: 1px solid #e5e7eb;
    font-size: 13px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    min-width: 100px;
    text-align: center;
}

.source-node,
.target-node {
    background: #f3f4f6;
    font-weight: 500;
    color: #1f2937;
}

.asn-node {
    padding: 8px 16px;
}

.asn-number {
    font-weight: 600;
    color: #111827;
    font-size: 13px;
    margin-bottom: 2px;
}

.asn-name {
    font-size: 11px;
    color: #6b7280;
    line-height: 1.2;
}

.arrow {
    color: #9ca3af;
    font-size: 18px;
    font-weight: 300;
}

/* Responsive */
@media (max-width: 768px) {

    .session-meta {
        flex-direction: column;
        gap: 8px;
    }

    .path-ribbon {
        justify-content: center;
    }

    .path-title-section {
        flex-direction: column;
        align-items: flex-start;
        gap: 8px;
    }
}
</style>
