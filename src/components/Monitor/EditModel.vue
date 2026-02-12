<template>
    <div>
        <a href="#" class="text-secondary" data-bs-toggle="modal" :data-bs-target="'#' + modalId">
         ✏ Edit Monitor
        </a>

        <Teleport to="body">
            <div class="modal fade" :id="modalId" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
                aria-labelledby="modalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-xl">
                    <div class="modal-content">
                        <div class="modal-header d-flex justify-content-center align-items-center">
                            <h2 class="text-dark">Edit Profile</h2>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="mb-3">
                                <div class="mb-3">
                                    <label for="exampleFormControlInput1" class="form-label ms-1">Profile
                                        Name</label>
                                    <input type="text" class="form-control form-control-lg" placeholder="Type Name"
                                        name="name" v-model="this.form.name" required>
                                </div>
                                <div class="mb-3">
                                    <div class="row g-2">
                                        <div class="col-md-6">
                                            <label for="exampleFormControlInput1" class="form-label ms-1">RTT
                                                Green</label>
                                            <input type="number" class="form-control form-control-lg"
                                                placeholder="RTT Green" name="rtt_g" v-model="this.form.rtt_g">
                                        </div>
                                        <div class="col-md-6">
                                            <label for="exampleFormControlInput1" class="form-label ms-1">RTT
                                                Red</label>
                                            <input type="number" class="form-control form-control-lg"
                                                placeholder="RTT Red" name="rtt_r" v-model="this.form.rtt_r">
                                        </div>
                                    </div>
                                </div>
                                <div class="mb-3">
                                    <div class="row g-2">
                                        <div class="col-md-6">
                                            <label for="exampleFormControlInput1" class="form-label ms-1">Jitter
                                                Green</label>
                                            <input type="number" class="form-control form-control-lg"
                                                placeholder="Jitter Green" name="jitter_g" v-model="this.form.jitter_g">
                                        </div>
                                        <div class="col-md-6">
                                            <label for="exampleFormControlInput1" class="form-label ms-1">Jitter
                                                Red</label>
                                            <input type="number" class="form-control form-control-lg"
                                                placeholder="Jitter Red" name="jitter_r" v-model="this.form.jitter_r">
                                        </div>
                                    </div>
                                </div>
                                <div class="mb-3">
                                    <div class="row g-2">
                                        <div class="col-md-6">
                                            <label for="exampleFormControlInput1" class="form-label ms-1">Downlink
                                                Green</label>
                                            <input type="number" class="form-control form-control-lg"
                                                placeholder="Downlink Green" name="downlink_g"
                                                v-model="this.form.downlink_g">
                                        </div>
                                        <div class="col-md-6">
                                            <label for="exampleFormControlInput1" class="form-label ms-1">Downlink
                                                Red</label>
                                            <input type="number" class="form-control form-control-lg"
                                                placeholder="Downlink Red" name="downlink_r"
                                                v-model="this.form.downlink_r">
                                        </div>
                                    </div>
                                </div>
                                <div class="mb-3">
                                    <div class="row g-2">
                                        <div class="col-md-6">
                                            <label for="exampleFormControlInput1" class="form-label ms-1">Downlink
                                                BandWidth
                                                Green</label>
                                            <input type="number" class="form-control form-control-lg"
                                                placeholder="Downlink BandWidth Green" name="downlink_bw_g"
                                                v-model="this.form.downlink_bw_g">
                                        </div>
                                        <div class="col-md-6">
                                            <label for="exampleFormControlInput1" class="form-label ms-1">Downlink
                                                BandWidth
                                                Red</label>
                                            <input type="number" class="form-control form-control-lg"
                                                placeholder="Downlink BandWidth Red" name="downlink_bw_r"
                                                v-model="this.form.downlink_bw_r">
                                        </div>
                                    </div>
                                </div>
                                <div class="mb-3">
                                    <div class="row g-2">
                                        <div class="col-md-6">
                                            <label for="exampleFormControlInput1" class="form-label ms-1">Uplink
                                                Green</label>
                                            <input type="number" class="form-control form-control-lg"
                                                placeholder="Uplink Green" name="uplink_g" v-model="this.form.uplink_g">
                                        </div>
                                        <div class="col-md-6">
                                            <label for="exampleFormControlInput1" class="form-label ms-1">Uplink
                                                Red</label>
                                            <input type="number" class="form-control form-control-lg"
                                                placeholder="Uplink Red" name="uplink_r" v-model="this.form.uplink_r">
                                        </div>
                                    </div>
                                </div>
                                <div class="mb-3">
                                    <div class="row g-2">
                                        <div class="col-md-6">
                                            <label for="exampleFormControlInput1" class="form-label ms-1">Uplink
                                                BandWidth
                                                Green</label>
                                            <input type="number" class="form-control form-control-lg"
                                                placeholder="Uplink BandWidth Green" name="uplink_bw_g"
                                                v-model="this.form.uplink_bw_g">
                                        </div>
                                        <div class="col-md-6">
                                            <label for="exampleFormControlInput1" class="form-label ms-1">Uplink
                                                BandWidth
                                                Red</label>
                                            <input type="number" class="form-control form-control-lg"
                                                placeholder="Uplink BandWidth Red" name="uplink_bw_r"
                                                v-model="this.form.uplink_bw_r">
                                        </div>
                                    </div>
                                </div>
                                <div class="mb-3">
                                    <div class="row g-2">
                                        <div class="col-md-6">
                                            <label for="exampleFormControlInput1" class="form-label ms-1">Loss
                                                Green</label>
                                            <input type="number" class="form-control form-control-lg"
                                                placeholder="Loss Green" name="loss_g" v-model="this.form.loss_g">
                                        </div>
                                        <div class="col-md-6">
                                            <label for="exampleFormControlInput1" class="form-label ms-1">Loss
                                                Red</label>
                                            <input type="number" class="form-control form-control-lg"
                                                placeholder="Loss Red" name="loss_r" v-model="this.form.loss_r">
                                        </div>
                                    </div>
                                </div>
                                <div class="mb-3">
                                    <div class="row g-2">
                                        <div class="col-md-6">
                                            <label for="exampleFormControlInput1" class="form-label ms-1">Delay
                                                Green</label>
                                            <input type="number" class="form-control form-control-lg"
                                                placeholder="Delay Green" name="delay_g" v-model="this.form.delay_g">
                                        </div>
                                        <div class="col-md-6">
                                            <label for="exampleFormControlInput1" class="form-label ms-1">Delay
                                                Red</label>
                                            <input type="number" class="form-control form-control-lg"
                                                placeholder="Delay Red" name="delay_r" v-model="this.form.delay_r">
                                        </div>
                                    </div>
                                </div>
                                <div class="mb-3">
                                    <div class="row g-2">
                                        <div class="col-md-4">
                                            <label for="exampleFormControlInput1" class="form-label ms-1">Wait
                                                Time</label>
                                            <input type="number" class="form-control form-control-lg"
                                                placeholder="W Time" name="w_time" v-model="this.form.w_time">
                                        </div>
                                        <div class="col-md-4">
                                            <label for="exampleFormControlInput1" class="form-label ms-1">Dscp</label>
                                            <input type="number" class="form-control form-control-lg" placeholder="Dscp"
                                                name="dscp" v-model="this.form.dscp">
                                        </div>
                                        <div class="col-md-4">
                                            <label for="exampleFormControlInput1" class="form-label ms-1">Count</label>
                                            <input type="number" class="form-control form-control-lg"
                                                placeholder="Count" name="count" v-model="this.form.count">
                                        </div>
                                    </div>
                                </div>
                                <div class="mb-3">
                                    <div class="row g-2">
                                        <div class="col-md-4">
                                            <label for="exampleFormControlInput1" class="form-label ms-1">Number
                                                Packets</label>
                                            <input type="number" class="form-control form-control-lg"
                                                placeholder="No Packets" name="n_packets" v-model="this.form.n_packets">
                                        </div>
                                        <div class="col-md-4">
                                            <label for="exampleFormControlInput1" class="form-label ms-1">Packets
                                                Interval</label>
                                            <input type="number" class="form-control form-control-lg"
                                                placeholder="P Interval" name="p_interval"
                                                v-model="this.form.p_interval">
                                        </div>
                                        <div class="col-md-4">
                                            <label for="exampleFormControlInput1" class="form-label ms-1">Packets
                                                Size</label>
                                            <input type="number" class="form-control form-control-lg"
                                                placeholder="Packets Size" name="p_size" v-model="this.form.p_size">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <div class="d-flex justify-content-end">
                                <button type="button" class="modelCancelBtn" data-bs-dismiss="modal">Cancel</button>
                                <button type="button" class="modelSaveBtn ms-2" @click="handleEditMonitor"
                                    data-bs-dismiss="modal">
                                    Save
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </Teleport>

    </div>
</template>

<script>
import Toast from '../Toast';
import { updateMonitor } from '../../services/monitor_profile_Services';

export default {
    name: 'EditModel',
    props: {
        monitor: Object,
        modalId: String,
        handleMonitorList: Function
    },
    data() {
        return {
            form: {
                name: this.monitor.name,
                p_size: this.monitor.p_size,
                count: this.monitor.count,
                n_packets: this.monitor.n_packets,
                p_interval: this.monitor.p_interval,
                w_time: this.monitor.w_time,
                dscp: this.monitor.dscp,
                jitter_g: this.monitor.jitter_g,
                jitter_r: this.monitor.jitter_r,
                downlink_g: this.monitor.downlink_g,
                downlink_r: this.monitor.downlink_r,
                downlink_bw_g: this.monitor.downlink_bw_g,
                downlink_bw_r: this.monitor.downlink_bw_r,
                loss_g: this.monitor.loss_g,
                loss_r: this.monitor.loss_r,
                rtt_g: this.monitor.rtt_g,
                rtt_r: this.monitor.rtt_r,
                uplink_g: this.monitor.uplink_g,
                uplink_r: this.monitor.uplink_r,
                uplink_bw_g: this.monitor.uplink_bw_g,
                uplink_bw_r: this.monitor.uplink_bw_r,
                delay_g: this.monitor.delay_g,
                delay_r: this.monitor.delay_r
            }
        }
    },
    watch: {
        monitor: {
            immediate: true,
            handler(newMonitor) {
                if (newMonitor) {
                    this.form = { ...newMonitor }
                }
            }
        }
    },
    methods: {
        async handleEditMonitor() {
            const payload = {
                id: this.form.id,
                name: this.form.name,
                count: this.form.count,
                n_packets: this.form.n_packets,
                p_interval: this.form.p_interval,
                w_time: this.form.w_time,
                dscp: this.form.dscp,
                p_size: this.form.p_size,
                rtt_g: this.form.rtt_g,
                rtt_r: this.form.rtt_r,
                uplink_g: this.form.uplink_g,
                uplink_r: this.form.uplink_r,
                downlink_g: this.form.downlink_g,
                downlink_r: this.form.downlink_r,
                delay_g: this.form.delay_g,
                delay_r: this.form.delay_r,
                downlink_bw_g: this.form.downlink_bw_g,
                downlink_bw_r: this.form.downlink_bw_r,
                uplink_bw_g: this.form.uplink_bw_g,
                uplink_bw_r: this.form.uplink_bw_r,
                jitter_g: this.form.jitter_g,
                jitter_r: this.form.jitter_r,
                loss_g: this.form.loss_g,
                loss_r: this.form.loss_r,
                edit: true
            }
            try {
                await updateMonitor(payload)
                Toast.fire({ icon: "success", title: "Profile update successfully!" });
                this.handleMonitorList()
            } catch (error) {
                console.error(error);
            }
        }
    }
}
</script>

<style scoped>
/* Optional: styling buttons */
.modelCancelBtn {
    background-color: #ddd;
    border: none;
    padding: 6px 12px;
    border-radius: 4px;
}

.modelSaveBtn {
    background-color: #4caf50;
    color: white;
    border: none;
    padding: 6px 12px;
    border-radius: 4px;
}
</style>