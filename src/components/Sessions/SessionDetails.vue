<template>
    <div class="session-wrapper">
        <Header />
        
        <!-- Session Details Header -->
        <div class="session-header">
            <h2>Session Details</h2>
            <div class="session-meta">
                <span><strong>Source:</strong> Sentinel A</span>
                <span><strong>Target:</strong> Sentinel B</span>
                <span><strong>Status:</strong> OK</span>
            </div>
        </div>

        <!-- Time Range Buttons -->
        <div class="range-buttons">
            <button v-for="range in ranges" :key="range.value"
                :class="['range-btn', selectedRange === range.value ? 'active' : '']" 
                @click="changeRange(range.value)">
                {{ range.label }}
            </button>
        </div>

        <!-- Chart Card -->
        <div class="card chart-card">
            <div class="chart-header">
                <h5>Latency (ms)</h5>
                <div class="legend">
                    <span class="legend-dot"></span>
                    <span>95th percentile</span>
                </div>
            </div>
            <canvas ref="chartCanvas" class="chart-canvas"></canvas>
        </div>

        <!-- Path Ribbon Card -->
        <div v-if="selectedPath" class="card path-card">
            <div class="path-header">
                <div class="path-title-section">
                    <h5>Path at {{ formattedSelectedTime }}</h5>
                    <div class="badge-group">
                        <span v-if="selectedSegment?.is_baseline" class="badge baseline">Baseline</span>
                        <span v-else class="badge alternate">Alternate</span>
                        <span v-if="selectedSegment?.is_current" class="badge current">Current</span>
                    </div>
                </div>
            </div>

            <div class="path-ribbon">
                <div class="node source-node">Source</div>
                <template v-for="(asn, index) in selectedPath.asn_chain" :key="index">
                    <div class="arrow">→</div>
                    <div class="node asn-node">
                        <div class="asn-number">AS{{ asn.asn }}</div>
                        <div class="asn-name">{{ asn.name }}</div>
                    </div>
                </template>
                <div class="arrow">→</div>
                <div class="node target-node">Target</div>
            </div>
        </div>
    </div>
</template>

<script>
import { Chart, LineController, LineElement, PointElement, LinearScale, TimeScale, Tooltip } from 'chart.js'
import 'chartjs-adapter-date-fns'
import Header from '../common/Header.vue';
Chart.register(LineController, LineElement, PointElement, LinearScale, TimeScale, Tooltip)

export default {
    name: "SessionDetails",

    data() {
        return {
            ranges: [
                { label: "1h", value: "1h" },
                { label: "6h", value: "6h" },
                { label: "24h", value: "24h" }
            ],
            selectedRange: "1h",
            series: [],
            segments: [],
            paths: {},
            selectedTime: null,
            chart: null
        }
    },
    components: {
        Header
    },

    computed: {
        selectedSegment() {
            if (!this.selectedTime) return null
            return this.segments.find(seg => {
                const start = new Date(seg.start_time)
                const end = seg.end_time ? new Date(seg.end_time) : new Date()
                const selected = new Date(this.selectedTime)
                return selected >= start && selected <= end
            })
        },

        selectedPath() {
            if (!this.selectedSegment) return null
            return this.paths[this.selectedSegment.path_id]
        },

        formattedSelectedTime() {
            return this.selectedTime
                ? new Date(this.selectedTime).toLocaleString('en-US', {
                    month: '2-digit',
                    day: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    hour12: false
                }).replace(',', '')
                : ''
        }
    },

    mounted() {
        this.fetchData()
    },

    methods: {
        fetchData() {
            const data = {
                series: [
                    { timestamp: "2024-04-24T10:00:00Z", latency: 55, path_id: 1 },
                    { timestamp: "2024-04-24T10:05:00Z", latency: 60, path_id: 1 },
                    { timestamp: "2024-04-24T10:10:00Z", latency: 110, path_id: 2 },
                    { timestamp: "2024-04-24T10:15:00Z", latency: 80, path_id: 2 },
                    { timestamp: "2024-04-24T10:20:00Z", latency: 50, path_id: 1 },
                    { timestamp: "2024-04-24T10:25:00Z", latency: 65, path_id: 1 }
                ],
                segments: [
                    {
                        path_id: 1,
                        start_time: "2024-04-24T10:00:00Z",
                        end_time: "2024-04-24T10:09:59Z",
                        is_baseline: true,
                        is_current: false
                    },
                    {
                        path_id: 2,
                        start_time: "2024-04-24T10:10:00Z",
                        end_time: "2024-04-24T10:19:59Z",
                        is_baseline: false,
                        is_current: false
                    },
                    {
                        path_id: 1,
                        start_time: "2024-04-24T10:20:00Z",
                        end_time: null,
                        is_baseline: true,
                        is_current: true
                    }
                ],
                paths: {
                    1: {
                        asn_chain: [
                            { asn: 701, name: "Verizon" },
                            { asn: 174, name: "Cogent" },
                            { asn: 16509, name: "Amazon" }
                        ]
                    },
                    2: {
                        asn_chain: [
                            { asn: 3356, name: "Lumen" },
                            { asn: 1299, name: "Telia" },
                            { asn: 16509, name: "Amazon" }
                        ]
                    }
                }
            }

            this.series = data.series
            this.segments = data.segments
            this.paths = data.paths

            this.$nextTick(() => {
                this.renderChart()
                this.setDefaultSelection()
            })
        },

        changeRange(range) {
            this.selectedRange = range
        },

        renderChart() {
            if (this.chart) this.chart.destroy()
            const ctx = this.$refs.chartCanvas.getContext('2d')

            this.chart = new Chart(ctx, {
                type: 'line',
                data: {
                    datasets: [{
                        label: 'Latency',
                        data: this.series.map(p => ({ x: new Date(p.timestamp), y: p.latency })),
                        borderColor: '#3b82f6',
                        backgroundColor: 'rgba(59,130,246,0.1)',
                        fill: true,
                        tension: 0.4,
                        pointRadius: 4,
                        pointBackgroundColor: '#3b82f6',
                        pointBorderColor: 'white',
                        pointBorderWidth: 2
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            enabled: true
                        }
                    },
                    scales: {
                        x: { 
                            type: 'time',
                            grid: {
                                display: true,
                                color: '#e5e7eb',
                                drawBorder: false
                            },
                            ticks: {
                                color: '#6b7280',
                                font: {
                                    size: 11
                                }
                            }
                        },
                        y: { 
                            beginAtZero: false,
                            min: 20,
                            max: 140,
                            grid: {
                                display: true,
                                color: '#e5e7eb',
                                drawBorder: false
                            },
                            ticks: {
                                stepSize: 20,
                                color: '#6b7280',
                                font: {
                                    size: 11
                                },
                                callback: function(value) {
                                    return value + ' ms';
                                }
                            }
                        }
                    },
                    elements: {
                        line: {
                            borderWidth: 2
                        }
                    }
                }
            })
        },

        setDefaultSelection() {
            const currentSeg = this.segments.find(s => s.is_current)
            if (currentSeg) {
                const point = this.series.filter(p => p.path_id === currentSeg.path_id).pop()
                if (point) this.selectedTime = point.timestamp
            }
        }
    }
}
</script>

<style scoped>
.session-wrapper {
    background: #f5f7fb;
    padding: 30px;
    min-height: 100vh;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
    max-width: 100wh;
    margin: 0 auto;
}

/* Session Header */
.session-header {
    margin-bottom: 24px;
}

.session-header h2 {
    font-size: 24px;
    font-weight: 600;
    color: #111827;
    margin: 0 0 12px 0;
}

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
    border: 1px solid #d1d5db;
    background: white;
    border-radius: 6px;
    margin-right: 8px;
    cursor: pointer;
    font-size: 13px;
    color: #374151;
    transition: all 0.2s;
}

.range-btn:hover {
    background: #f9fafb;
}

.range-btn.active {
    background: #2563eb;
    color: white;
    border-color: #2563eb;
}

/* Cards */
.card {
    background: white;
    border-radius: 12px;
    padding: 20px;
    margin-bottom: 25px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.chart-card {
    padding: 20px;
}

.chart-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
}

.chart-header h5 {
    font-size: 16px;
    font-weight: 600;
    color: #111827;
    margin: 0;
}

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
    background-color: #3b82f6;
    border-radius: 50%;
    display: inline-block;
}

.chart-canvas {
    width: 100%;
    height: 300px;
    max-height: 300px;
}

/* Path Card */
.path-card {
    padding: 20px;
}

.path-header {
    margin-bottom: 20px;
}

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
}

.badge.alternate {
    background: #fef3c7;
    color: #92400e;
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

.source-node, .target-node {
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
    .session-wrapper {
        padding: 16px;
    }
    
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