<template>
    <div class="pageHeight">
        <div class="bg">
            <Header />
            <div class="container-fluid sentinel mt-2">
                <div class="d-flex justify-content-end align-items-center">
                    
                    <h1 class="me-2">
                        <RouterLink to="/sentinel">
                            <i class="fa-solid fa-xmark fa-xs" style="color: #d8dce2;"></i>
                        </RouterLink>
                    </h1>
                </div>
            </div>

            <!-- Header Card -->
            <div class="container-fluid">
                <div class="card mx-md-2">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-center">
                            <div>
                                <h3 class="text-secondary ms-3 mt-2">
                                    <i class="fa-solid fa-heart-pulse me-2" style="color: #8cb63d;"></i>
                                    Agent Heartbeat
                                </h3>
                            </div>
                            <div class="d-flex align-items-center">
                                <h6 class="mx-1 mt-2 text-muted">Home</h6>
                                <h6 class="mx-1 mt-2 text-muted"> - Sentinel</h6>
                                <h6 class="me-4 mt-2"> - Agent Heartbeat</h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Loading -->
            <div class="container-fluid mt-3" v-if="loading">
                <div class="text-center m-5">
                    <VueSpinner size="80" color="#8cb63d" />
                </div>
            </div>

            <div v-else>
                <!-- Agent Info Card -->
                <div class="container-fluid mt-3">
                    <div class="card mx-md-2 mb-4">
                        <div class="card-body">
                            <div class="d-flex align-items-center gap-3 mb-4">
                                <h4 class="fw-bold mb-0">{{ agentData?.name }}</h4>
                                <span :style="{
                                    backgroundColor: agentData?.status === 'active' ? '#22c55e' : '#ef4444',
                                    color: 'white',
                                    padding: '3px 14px',
                                    borderRadius: '20px',
                                    fontSize: '12px',
                                    fontWeight: '600',
                                    textTransform: 'capitalize'
                                }">{{ agentData?.status }}</span>
                            </div>
                            <div class="row g-3">
                                <div class="col-md-4">
                                    <p class="text-muted mb-1" style="font-size:12px;">IP Address</p>
                                    <p class="fw-semibold mb-0">{{ agentData?.ipaddress || '-' }}</p>
                                </div>
                                <div class="col-md-4">
                                    <p class="text-muted mb-1" style="font-size:12px;">Private IP</p>
                                    <p class="fw-semibold mb-0">{{ agentData?.private_ip || '-' }}</p>
                                </div>
                                <div class="col-md-4">
                                    <p class="text-muted mb-1" style="font-size:12px;">Location</p>
                                    <p class="fw-semibold mb-0">{{ agentData?.location || '-' }}</p>
                                </div>
                                <div class="col-md-4">
                                    <p class="text-muted mb-1" style="font-size:12px;">Country</p>
                                    <p class="fw-semibold mb-0">{{ agentData?.Country || '-' }}</p>
                                </div>
                                <div class="col-md-4">
                                    <p class="text-muted mb-1" style="font-size:12px;">Organization</p>
                                    <p class="fw-semibold mb-0">{{ agentData?.Organization || '-' }}</p>
                                </div>
                                <div class="col-md-4">
                                    <p class="text-muted mb-1" style="font-size:12px;">Platform</p>
                                    <p class="fw-semibold mb-0" style="font-size:13px;">{{ agentData?.platform || '-' }}</p>
                                </div>
                                <div class="col-md-4">
                                    <p class="text-muted mb-1" style="font-size:12px;">Last Heartbeat</p>
                                    <p class="fw-semibold mb-0">{{ agentData?.last_heartbeat ? moment(agentData.last_heartbeat).fromNow() : '-' }}</p>
                                </div>
                                <div class="col-md-4">
                                    <p class="text-muted mb-1" style="font-size:12px;">Total Heartbeats</p>
                                    <p class="fw-semibold mb-0">{{ count }}</p>
                                </div>
                                <div class="col-md-4">
                                    <p class="text-muted mb-1" style="font-size:12px;">Created At</p>
                                    <p class="fw-semibold mb-0">{{ agentData?.created_at ? moment(agentData.created_at).format('DD MMM YYYY') : '-' }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Uptime Bar -->
                <div class="container-fluid mt-3">
                    <div class="card mx-md-2">
                        <div class="card-body">
                            <h6 class="fw-bold mb-3">Uptime (last 24 hours)</h6>
                            <div style="line-height:1; margin: 12px 0;">
                                <span
                                    v-for="(slot, i) in uptimeSlots"
                                    :key="i"
                                    :style="{
                                        display: 'inline-block',
                                        width: '6px',
                                        height: '28px',
                                        marginRight: '1px',
                                        borderRadius: '2px',
                                        backgroundColor: slot === 'green' ? '#22c55e' : '#ef4444'
                                    }">
                                </span>
                            </div>
                            <p style="font-size:12px; color:#9ca3af; margin-top:8px;">
                                Each bar = 10 minutes · Green = heartbeat received · Red = no heartbeat · Grey = no data
                            </p>
                        </div>
                    </div>
                </div>

                <!-- Heartbeats Table -->
                <div class="container-fluid tableDiv">
                    <div class="card mx-md-2 mt-3 mb-5">
                        <div class="card-body">
                            <h6 class="text-muted fw-semibold mb-3 ms-2 mt-2">
                                <i class="fa-solid fa-list me-2"></i>Heartbeat Records
                            </h6>

                            <div class="m-5" v-if="!heartbeats || heartbeats.length === 0">
                                <div class="empty-state-container">
                                    <div class="empty-state-card text-center p-5 rounded-4 shadow-sm">
                                        <div class="empty-state-icon mb-4">
                                            <div class="icon-circle mx-auto">
                                                <i class="fa-solid fa-heart-pulse"></i>
                                            </div>
                                        </div>
                                        <div class="empty-state-message">
                                            <h3 class="fw-semibold mb-2" style="color: #1f2937; font-size: 1.5rem;">
                                                No Heartbeats Found
                                            </h3>
                                            <p class="text-muted mb-0" style="font-size: 1rem; max-width: 500px; margin: 0 auto;">
                                                No heartbeat records are available for this agent.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div v-else>
                                <table class="table table-striped table-hover text-center">
                                    <thead>
                                        <tr>
                                            <th scope="col"><a href="#" class="tableHead">#</a></th>
                                            <th scope="col"><a href="#" class="tableHead">Timestamp</a></th>
                                            <th scope="col"><a href="#" class="tableHead">Time Ago</a></th>
                                            <th scope="col"><a href="#" class="tableHead">IP Address</a></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(hb, index) in heartbeats" :key="hb.id || index">
                                            <td><p class="tableP">{{ index + 1 }}</p></td>
                                            <td><p class="tableP">{{ formatDate(hb.created_at) }}</p></td>
                                            <td><p class="tableP">{{ timeAgo(hb.created_at) }}</p></td>
                                            <td><p class="tableP">{{ hb.ip_address || '-' }}</p></td>
                                        </tr>
                                    </tbody>
                                </table>

                                <div class="d-flex align-items-center text-muted mt-2" style="font-size: 0.9rem;">
                                    Total Records: {{ count }}
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
import { getAgentHeartbeats } from '../../services/agent_services';
import { VueSpinner } from 'vue3-spinners';
import Toast from '../Toast';
import moment from 'moment';

export default {
    name: 'AgentHeartbeat',
    components: {
        Header,
        VueSpinner
    },
    data() {
        return {
            agentData: null,
            heartbeats: [],
            count: 0,
            loading: false,
            uptimeSlots: [],
            moment
        }
    },
    computed: {
        lastHeartbeat() {
            if (!this.heartbeats || this.heartbeats.length === 0) return '-'
            const latest = this.heartbeats[0]
            return latest.created_at ? moment(latest.created_at).fromNow() : '-'
        }
    },
    mounted() {
        this.fetchHeartbeats()
    },
    methods: {
        async fetchHeartbeats() {
            try {
                this.loading = true
                const res = await getAgentHeartbeats(this.$route.params.id)
                this.agentData = res.data?.agent || null
                this.heartbeats = res.data?.heartbeats || []
                this.count = res.data?.count || this.heartbeats.length
                this.buildUptimeSlots()
            } catch (error) {
                console.log(error)
                Toast.fire({ icon: 'error', title: 'Failed to load heartbeats' })
            } finally {
                this.loading = false
            }
        },
        buildUptimeSlots() {
            const slots = []
            for (let i = 143; i >= 0; i--) {
                const slotEnd = moment().subtract(i * 10, 'minutes')
                const slotStart = moment().subtract((i + 1) * 10, 'minutes')
                const hasHeartbeat = this.heartbeats.some(h => {
                    const t = moment(h.created_at)
                    return t.isAfter(slotStart) && t.isSameOrBefore(slotEnd)
                })
                slots.push(hasHeartbeat ? 'green' : 'red')
            }
            this.uptimeSlots = slots
        },
        formatDate(ts) {
            if (!ts) return '-'
            return moment(ts).format('YYYY-MM-DD')
        },
        timeAgo(ts) {
            if (!ts) return '-'
            return moment(ts).fromNow()
        }
    }
}
</script>

<style scoped>
.info-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 0;
    border-bottom: 1px solid #f0f0f0;
}

.info-row:last-child {
    border-bottom: none;
}

.info-label {
    font-size: 0.85rem;
    color: #6c757d;
    font-weight: 500;
}

.info-value {
    font-size: 0.875rem;
    color: #1f2937;
}
</style>
