<template>
    <div class="modal fade" id="staticBackdrop1" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="staticBackdrop1Label" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content">
                <div class="modal-header d-flex justify-content-center align-items-center">
                    <div class="">
                        <h2 class="text-dark">Edit Session</h2>
                    </div>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="">
                        <div class="mb-4">
                            <label class="form-label ms-1">Form*</label>
                            <select v-model="selectedAgentId" class="form-select form-select-lg mb-3 custom-select"
                                aria-label=".form-select-lg example">
                                <option class="text-secondary" selected disabled>please select sender sentinel</option>
                                <option v-for="agent in agents" :key="agent.id" :value="agent.id">{{ agent.name }}</option>
                            </select>
                        </div>
                        <div class="mb-4">
                            <label class="form-label ms-1">To*</label>
                            <select v-model="selectedClientId" class="form-select form-select-lg mb-3"
                                aria-label=".form-select-lg example">
                                <option class="text-secondary" disabled>please select receiver sentinel</option>
                                <option v-for="client in clients" :key="client.id" :value="client.id">{{ client.name }}</option>
                            </select>
                        </div>
                        <RouterLink to="#" @click="showAdvancedFields = !showAdvancedFields" class="ms-2 mt-2">
                            {{ showAdvancedFields ? "Hide Advanced -" : "Show Advanced +" }}
                        </RouterLink>
                        <div v-if="showAdvancedFields">
                            <div class="mb-4">
                                <label class="form-label ms-1">Monitoring Profile*</label>
                                <select v-model="selectedProfileId" class="form-select form-select-lg mb-3 custom-select"
                                    aria-label=".form-select-lg example">
                                    <option class="text-secondary" disabled>select here</option>
                                    <option v-for="profile in profiles" :key="profile.id" :value="profile.id">
                                        {{ profile.name }}
                                    </option>
                                </select>
                            </div>
                            <div class="mb-3">
                                <div class="row g-2">
                                    <div class="col-md-12">
                                        <label class="form-label ms-1">Schedule*</label>
                                        <input type="number" class="form-control form-control-lg"
                                            placeholder="Enter Schedule" v-model="form.schedule" name="schedule">
                                    </div>
                                    <div class="col-md-6">
                                        <label class="form-label ms-1">Count*</label>
                                        <input type="number" class="form-control form-control-lg"
                                            placeholder="Enter Count" v-model="form.count" name="count">
                                    </div>
                                    <div class="col-md-6">
                                        <label class="form-label ms-1">Number Of Packets*</label>
                                        <input type="number" class="form-control form-control-lg"
                                            placeholder="Enter No-packets" v-model="form.n_packets" name="n_packets">
                                    </div>
                                    <div class="col-md-6">
                                        <label class="form-label ms-1">Packet Interval*</label>
                                        <input type="number" class="form-control form-control-lg"
                                            placeholder="Enter P-Interval" v-model="form.p_interval" name="p_interval">
                                    </div>
                                    <div class="col-md-6">
                                        <label class="form-label ms-1">Wait Time*</label>
                                        <input type="number" class="form-control form-control-lg"
                                            placeholder="Enter W Time" v-model="form.w_time" name="w_time">
                                    </div>
                                    <div class="col-md-6">
                                        <label class="form-label ms-1">DSCP*</label>
                                        <input type="number" class="form-control form-control-lg"
                                            placeholder="Enter Dscp" v-model="form.dscp" name="dscp">
                                    </div>
                                    <div class="col-md-6">
                                        <label class="form-label ms-1">Packet Size*</label>
                                        <input type="number" class="form-control form-control-lg"
                                            placeholder="Enter P_Size" v-model="form.p_size" name="p_size">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <div class="d-flex justify-content-end">
                        <button type="button" class="modelCancelBtn" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" data-bs-dismiss="modal" @click="handleEditSessions"
                            class="modelSaveBtn ms-2">Save</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { updateSessions } from '../../services/sessions_services';
import { ProfileListForm } from '../../services/monitor_profile_Services';
import { agentListForm } from '../../services/agent_services';
import { RouterLink } from 'vue-router';
import Toast from '../Toast';

export default {
    name: 'EditSessions',
    props: {
        sessionData: {
            type: Object,
            default: null
        },
        getSessions: {
            type: Function,
            required: true
        }
    },
    data() {
        return {
            form: {
                id: null,
                n_packets: null,
                p_interval: null,
                w_time: null,
                dscp: null,
                count: null,
                schedule: null,
                p_size: null,
            },
            selectedProfileId: '',
            profiles: [],
            agents: [],
            selectedAgentId: '',
            clients: [],
            selectedClientId: '',
            showAdvancedFields: false,
        }
    },
    watch: {
        async sessionData(data) {
            if (!data) return
            this.form.id = data.id
            this.form.n_packets = data.n_packets
            this.form.p_interval = data.p_interval
            this.form.w_time = data.w_time
            this.form.dscp = data.dscp
            this.form.count = data.count
            this.form.schedule = data.schedule
            this.form.p_size = data.p_size

            if (!this.agents.length) await this.loadAgentsAndClients()
            if (!this.profiles.length) await this.loadProfiles()

            this.selectedClientId = this.clients.find(c => c.name === data.c_name)?.id || ''
            this.selectedAgentId = this.agents.find(a => a.name === data.s_name)?.id || ''
            this.selectedProfileId = this.profiles.find(p => p.name === data.p_name)?.id || ''
        }
    },
    methods: {
        async loadProfiles(size = 1000) {
            try {
                let res = await ProfileListForm(size)
                this.profiles = res.profiles
            } catch (error) {
                console.log(error)
            }
        },
        async loadAgentsAndClients(size = 1000) {
            try {
                let res = await agentListForm(size)
                this.agents = res.data.agents
                this.clients = res.data.agents
            } catch (error) {
                console.log(error)
            }
        },
        async handleEditSessions() {
            const payload = {
                serve: this.selectedAgentId,
                client: this.selectedClientId,
                profile: this.selectedProfileId,
                schedule: this.form.schedule,
                count: this.form.count,
                n_packets: this.form.n_packets,
                p_interval: this.form.p_interval,
                w_time: this.form.w_time,
                dscp: this.form.dscp,
                p_size: this.form.p_size,
                edit: true,
                aid: this.form.id
            }
            try {
                await updateSessions(payload)
                this.getSessions()
                Toast.fire({ icon: "success", title: 'session update successfully' })
            } catch (error) {
                if (error.response.status === 400) {
                    Toast.fire({ icon: "error", title: error.response.data.error })
                } else if (error.response.status === 401) {
                    Toast.fire({ icon: "error", title: 'Unauthorized' })
                } else {
                    console.log('edit-error', error)
                }
            }
        }
    }
}
</script>
