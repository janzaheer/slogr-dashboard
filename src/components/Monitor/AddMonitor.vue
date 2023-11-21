<template>
    <div>
        <button class="addBtn" data-bs-toggle="modal" data-bs-target="#staticBackdrop"> <i
                class="fa-solid fa-plus fa-lg"></i> Create New Monitor Profile</button>
        <!-- Modal  add-->
        <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
            aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header d-flex justify-content-center align-items-center">
                        <div class="">
                            <h2 class="text-dark">New Monitoring Profile</h2>
                        </div>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="">
                            <div class="mb-3">
                                <label for="exampleFormControlInput1" class="form-label ms-1">Profile Name</label>
                                <input type="text" class="form-control form-control-lg" placeholder="Type Name" name="name"
                                    v-model="this.form.name" required>
                            </div>
                            <div class="mb-3">
                                <label for="exampleFormControlInput1" class="form-label ms-1">Max Jitter</label>
                                <input type="text" class="form-control form-control-lg" placeholder="Max Jitter"
                                    name="max_jitter" v-model="this.form.max_jitter" required>
                            </div>
                            <div class="mb-3">
                                <label for="exampleFormControlInput1" class="form-label ms-1">Max Downlink</label>
                                <input type="text" class="form-control form-control-lg" placeholder="Max Downlink"
                                    name="max_downlink" v-model="this.form.max_downlink">
                            </div>
                            <div class="mb-3">
                                <div class="row g-2">
                                    <div class="col-md-4">
                                        <label for="exampleFormControlInput1" class="form-label ms-1">W Time</label>
                                        <input type="text" class="form-control form-control-lg" placeholder="W Time"
                                            name="w_time" v-model="this.form.w_time">
                                    </div>
                                    <div class="col-md-4">
                                        <label for="exampleFormControlInput1" class="form-label ms-1">Dscp</label>
                                        <input type="text" class="form-control form-control-lg" placeholder="Dscp"
                                            name="dscp" v-model="this.form.dscp">
                                    </div>
                                    <div class="col-md-4">
                                        <label for="exampleFormControlInput1" class="form-label ms-1">Count</label>
                                        <input type="text" class="form-control form-control-lg" placeholder="Count"
                                            name="count" v-model="this.form.count">
                                    </div>
                                </div>
                            </div>
                            <div class="mb-3">
                                <div class="row g-2">
                                    <div class="col-md-4">
                                        <label for="exampleFormControlInput1" class="form-label ms-1">Number Packets</label>
                                        <input type="text" class="form-control form-control-lg" placeholder="No Packets"
                                            name="n_packets" v-model="this.form.n_packets">
                                    </div>
                                    <div class="col-md-4">
                                        <label for="exampleFormControlInput1" class="form-label ms-1">Packets
                                            Interval</label>
                                        <input type="text" class="form-control form-control-lg" placeholder="P Interval"
                                            name="p_interval" v-model="this.form.p_interval">
                                    </div>
                                    <div class="col-md-4">
                                        <label for="exampleFormControlInput1" class="form-label ms-1">Packets Size</label>
                                        <input type="text" class="form-control form-control-lg" placeholder="Packets Size"
                                            name="p_size" v-model="this.form.p_size">
                                    </div>
                                </div>
                            </div>
                            <div class="mb-3">
                                <div class="row g-2">
                                    <div class="col-md-4">
                                        <label for="exampleFormControlInput1" class="form-label ms-1">Max RTT</label>
                                        <input type="text" class="form-control form-control-lg" placeholder="Max RTT"
                                            name="max_rtt" v-model="this.form.max_rtt">
                                    </div>
                                    <div class="col-md-4">
                                        <label for="exampleFormControlInput1" class="form-label ms-1">Max Up</label>
                                        <input type="text" class="form-control form-control-lg" placeholder="Max Up"
                                            name="max_uplink" v-model="this.form.max_uplink">
                                    </div>
                                    <div class="col-md-4">
                                        <label for="exampleFormControlInput1" class="form-label ms-1">Max Loss</label>
                                        <input type="text" class="form-control form-control-lg" placeholder="Max Loss"
                                            name="max_loss" v-model="this.form.max_loss">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <div class="d-flex justify-content-end">
                            <button type="button" class="modelCancelBtn" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" data-bs-dismiss="modal" @click="handleAddMonitor"
                                class="modelSaveBtn ms-2">Create</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { createMonitor } from '../../services/monitor_profile_Services';
import { createToast } from 'mosha-vue-toastify';
import 'mosha-vue-toastify/dist/style.css';

export default {
    name: 'AddMonitor',
    props:{
        handleMonitorList:Function
    },
    data() {
        return {
            form: {
                name: '',
                max_jitter: '',
                max_downlink: '',
                w_time: '',
                dscp: '',
                count: '',
                n_packets: '',
                p_interval: '',
                p_size: '',
                max_rtt: '',
                max_uplink: '',
                max_loss: ''
            }
        }
    },
    mounted() {

    },
    methods: {
        async handleAddMonitor() {
            const payload = {
                    name: this.form.name,
                    count: this.form.count,
                    n_packets: this.form.n_packets,
                    p_interval: this.form.p_interval,
                    w_time: this.form.w_time,
                    dscp: this.form.dscp,
                    max_loss: this.form.max_loss,
                    max_up: this.form.max_uplink,
                    p_size: this.form.p_size,
                    max_down: this.form.max_downlink,
                    max_rtt: this.form.max_rtt,
                    max_jitter: this.form.max_jitter,
            }
            try {
                await createMonitor(payload)
                this.handleMonitorList()
                // Reset the form
                createToast(`add Profile successfully`, {
                    type: 'success',
                    position: 'top-right',
                    transition: 'zoom',
                });
                this.form = {
                    name: '',
                    max_jitter: '',
                    max_downlink: '',
                    w_time: '',
                    dscp: '',
                    count: '',
                    n_packets: '',
                    p_interval: '',
                    p_size: '',
                    max_rtt: '',
                    max_uplink: '',
                    max_loss: '',
                };
            } catch (error) {
                console.log(error)
                createToast(`Profile something is wrong`, {
                    type: 'danger',
                    position: 'top-right',
                    transition: 'zoom',
                });
                this.form = {
                    name: '',
                    max_jitter: '',
                    max_downlink: '',
                    w_time: '',
                    dscp: '',
                    count: '',
                    n_packets: '',
                    p_interval: '',
                    p_size: '',
                    max_rtt: '',
                    max_uplink: '',
                    max_loss: '',
                };
            }

        },

    }
}
</script>

<style></style>