<template>
    <div>
        <button class="addBtn" data-bs-toggle="modal" data-bs-target="#staticBackdrop"> <i
                class="fa-solid fa-plus fa-lg"></i> Add New Sessions</button>

        <!-- Modal  add-->
        <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
            aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Add New Session</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="">
                            <div class="mb-4">
                                <label for="exampleFormControlInput1" class="form-label ms-1">Form*</label>
                                <select v-model="selectedAgentId" class="form-select form-select-lg mb-3 custom-select"
                                    aria-label=".form-select-lg example">
                                    <option class="text-secondary" selected disabled>please select sender sentinel</option>
                                    <option v-for="agent in agents" :key="agent.id" :value="agent.id">{{ agent.name }}
                                    </option>
                                </select>
                            </div>
                            <div class="mb-4">
                                <label for="exampleFormControlInput1" class="form-label ms-1">To*</label>
                                <select v-model="selectedClientId" class="form-select form-select-lg mb-3"
                                    aria-label=".form-select-lg example">
                                    <option class="text-secondary" disabled>please select receiver sentinel
                                    </option>
                                    <option v-for="client in clients" :key="client.id" :value="client.id">{{ client.name }}
                                    </option>
                                </select>
                            </div>
                            <div class="mb-4">
                                <label for="exampleFormControlInput1" class="form-label ms-1">Monitoring Profile*</label>
                                <select v-model="selectedProfile" class="form-select form-select-lg mb-3 custom-select"
                                    aria-label=".form-select-lg example">
                                    <option class="text-secondary" disabled>select here</option>
                                    <option v-for="profile in profiles" :key="profile.id" :value="profile.id">{{
                                        profile.name }}</option>
                                </select>
                            </div>
                            <div class="mb-3">
                                <div class="row g-2">
                                    <div class="col-md-12">
                                        <label for="exampleFormControlInput1" class="form-label ms-1">Schedule*</label>
                                        <input type="number" class="form-control form-control-lg" placeholder="Enter Schedule"
                                            v-model="this.form.schedule" name="schedule">
                                    </div>
                                    <div class="col-md-6">
                                        <label for="exampleFormControlInput1" class="form-label ms-1">Count*</label>
                                        <input type="number" class="form-control form-control-lg" placeholder="Enter Count"
                                            v-model="this.form.count" name="count">
                                    </div>
                                    <div class="col-md-6">
                                        <label for="exampleFormControlInput1" class="form-label ms-1">Number Of
                                            Packets*</label>
                                        <input type="number" class="form-control form-control-lg"
                                            placeholder="Enter No-packets" v-model="this.form.n_packets" name="n_packets">
                                    </div>
                                    <div class="col-md-6">
                                        <label for="exampleFormControlInput1" class="form-label ms-1">Packet
                                            Interval*</label>
                                        <input type="number" class="form-control form-control-lg"
                                            placeholder="Enter P-Interval" v-model="this.form.p_interval" name="p_interval">
                                    </div>
                                    <div class="col-md-6">
                                        <label for="exampleFormControlInput1" class="form-label ms-1">Wait Time*</label>
                                        <input type="number" class="form-control form-control-lg" placeholder="Enter W Time"
                                            v-model="this.form.w_time" name="w_time">
                                    </div>
                                    <div class="col-md-6">
                                        <label for="exampleFormControlInput1" class="form-label ms-1">DSCP*</label>
                                        <input type="number" class="form-control form-control-lg" placeholder="Enter Dscp"
                                            v-model="this.form.dscp" name="dscp">
                                    </div>
                                    <div class="col-md-6">
                                        <label for="exampleFormControlInput1" class="form-label ms-1">Packet Size*</label>
                                        <input type="number" class="form-control form-control-lg" placeholder="Enter P_Size"
                                            name="p_size" v-model="this.form.p_size">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <div class="d-flex justify-content-end">
                            <button type="button" class="modelCancelBtn" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" data-bs-dismiss="modal" class="modelSaveBtn ms-2"
                                @click="handleAddSessions">Create</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { agentListForm } from '../../services/agent_services';
import { ProfileListForm } from '../../services/monitor_profile_Services';
import { addSessions } from '../../services/sessions_services';
import { createToast } from 'mosha-vue-toastify';
import 'mosha-vue-toastify/dist/style.css';

export default {
    name: 'AddSessions',
    components: {

    },
    props: {
        getSessions: Function
    },
    data() {
        return {
            form: {
                schedule: null,
                count: null,
                n_packets: null,
                p_interval: null,
                w_time: null,
                dscp: null,
                p_size: null,
            },
            selectedProfile: 'select here', // Will store the selected profile id
            profiles: [],
            agents: [],
            selectedAgentId: 'please select sender sentinel',
            clients: [],
            selectedClientId: 'please select receiver sentinel'
        }
    },
    async mounted() {
        await this.monitor()
        await this.server()
    },
    methods: {
        async handleAddSessions() {
            const payload = {
                serve: this.selectedAgentId,
                client: this.selectedClientId,
                profile: this.selectedProfile,
                schedule: this.form.schedule,
                count: this.form.count,
                n_packets: this.form.n_packets,
                p_interval: this.form.p_interval,
                w_time: this.form.w_time,
                dscp: this.form.dscp,
                p_size: this.form.p_size,
                edit: false
            }

            try {
                await addSessions(payload)
                this.getSessions()
                this.form = {
                    schedule: null,
                    count: null,
                    n_packets: null,
                    p_interval: null,
                    w_time: null,
                    dscp: null,
                    p_size: null,
                }
                createToast(`add sessions successfully`, {
                    type: 'success',
                    position: 'top-right',
                    transition: 'zoom',
                });
            } catch (error) {
                createToast(`sessions not save something is wrong`, {
                    type: 'danger',
                    position: 'top-right',
                    transition: 'zoom',
                });
                console.log(error)
            }
        },
        async monitor(size = 1000) {
            try {
                let res = await ProfileListForm(size)
                this.profiles = res.profiles;

            } catch (error) {
                console.log(error)
            }
        },
        async server(size = 1000) {
            try {
                let res = await agentListForm(size)
                this.agents = res.data.agents
                this.clients = res.data.agents
            } catch (error) {
                console.log(error)
            }
        }
    }
}
</script>

<style>
.custom-select {
    max-height: 100px;
    /* Adjust this value as needed */
    overflow: scroll;
}
</style>
