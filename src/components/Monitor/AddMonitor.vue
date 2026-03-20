<template>
    <div>
        <button class="addBtn" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
            <i class="fa-solid fa-plus fa-lg"></i> Create New Profile
        </button>

        <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
            aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-lg">
                <div class="modal-content">
                    <div class="modal-header d-flex justify-content-center align-items-center">
                        <div class="">
                            <h2 class="text-dark">New Monitoring Profile</h2>
                        </div>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
                            @click="resetForm"></button>
                    </div>
                    <div class="modal-body">
                        <form @submit.prevent="handleAddMonitor">
                            <div class="">
                                <div class="mb-3">
                                    <label class="form-label ms-1">Profile Name <span class="text-danger">*</span></label>
                                    <input type="text" class="form-control form-control-lg"
                                        :class="{ 'is-invalid': nameTouched && form.name === '' }"
                                        placeholder="Enter Profile Name" name="name" v-model="form.name"
                                        @blur="nameTouched = true" />
                                    <div class="invalid-feedback" v-if="nameTouched && form.name === ''">Profile Name is required.</div>
                                </div>

                                <div class="mb-3">
                                    <div class="row g-2">
                                        <div class="col-md-6">
                                            <label class="form-label ms-1">RTT Green <span class="text-danger">*</span></label>
                                            <input type="number" class="form-control form-control-lg"
                                                :class="{ 'is-invalid': rttGTouched && form.rtt_g === '' }"
                                                placeholder="RTT Green" name="rtt_g" v-model="form.rtt_g"
                                                @blur="rttGTouched = true" />
                                            <div class="invalid-feedback" v-if="rttGTouched && form.rtt_g === ''">RTT Green is required.</div>
                                        </div>
                                        <div class="col-md-6">
                                            <label class="form-label ms-1">RTT Red <span class="text-danger">*</span></label>
                                            <input type="number" class="form-control form-control-lg"
                                                :class="{ 'is-invalid': rttRTouched && form.rtt_r === '' }"
                                                placeholder="RTT Red" name="rtt_r" v-model="form.rtt_r"
                                                @blur="rttRTouched = true" />
                                            <div class="invalid-feedback" v-if="rttRTouched && form.rtt_r === ''">RTT Red is required.</div>
                                        </div>
                                    </div>
                                </div>

                                <div class="mb-3">
                                    <div class="row g-2">
                                        <div class="col-md-6">
                                            <label class="form-label ms-1">Jitter Green <span class="text-danger">*</span></label>
                                            <input type="number" class="form-control form-control-lg"
                                                :class="{ 'is-invalid': jitterGTouched && form.jitter_g === '' }"
                                                placeholder="Jitter Green" name="jitter_g" v-model="form.jitter_g"
                                                @blur="jitterGTouched = true" />
                                            <div class="invalid-feedback" v-if="jitterGTouched && form.jitter_g === ''">Jitter Green is required.</div>
                                        </div>
                                        <div class="col-md-6">
                                            <label class="form-label ms-1">Jitter Red <span class="text-danger">*</span></label>
                                            <input type="number" class="form-control form-control-lg"
                                                :class="{ 'is-invalid': jitterRTouched && form.jitter_r === '' }"
                                                placeholder="Jitter Red" name="jitter_r" v-model="form.jitter_r"
                                                @blur="jitterRTouched = true" />
                                            <div class="invalid-feedback" v-if="jitterRTouched && form.jitter_r === ''">Jitter Red is required.</div>
                                        </div>
                                    </div>
                                </div>

                                <div class="mb-3">
                                    <div class="row g-2">
                                        <div class="col-md-6">
                                            <label class="form-label ms-1">Downlink Green <span class="text-danger">*</span></label>
                                            <input type="number" class="form-control form-control-lg"
                                                :class="{ 'is-invalid': downlinkGTouched && form.downlink_g === '' }"
                                                placeholder="Downlink Green" name="downlink_g" v-model="form.downlink_g"
                                                @blur="downlinkGTouched = true" />
                                            <div class="invalid-feedback" v-if="downlinkGTouched && form.downlink_g === ''">Downlink Green is required.</div>
                                        </div>
                                        <div class="col-md-6">
                                            <label class="form-label ms-1">Downlink Red <span class="text-danger">*</span></label>
                                            <input type="number" class="form-control form-control-lg"
                                                :class="{ 'is-invalid': downlinkRTouched && form.downlink_r === '' }"
                                                placeholder="Downlink Red" name="downlink_r" v-model="form.downlink_r"
                                                @blur="downlinkRTouched = true" />
                                            <div class="invalid-feedback" v-if="downlinkRTouched && form.downlink_r === ''">Downlink Red is required.</div>
                                        </div>
                                    </div>
                                </div>

                                <div class="mb-3">
                                    <div class="row g-2">
                                        <div class="col-md-6">
                                            <label class="form-label ms-1">Downlink BandWidth Green <span class="text-danger">*</span></label>
                                            <input type="number" class="form-control form-control-lg"
                                                :class="{ 'is-invalid': downlinkBwGTouched && form.downlink_bw_g === '' }"
                                                placeholder="Downlink BandWidth Green" name="downlink_bw_g"
                                                v-model="form.downlink_bw_g" @blur="downlinkBwGTouched = true" />
                                            <div class="invalid-feedback" v-if="downlinkBwGTouched && form.downlink_bw_g === ''">Downlink BandWidth Green is required.</div>
                                        </div>
                                        <div class="col-md-6">
                                            <label class="form-label ms-1">Downlink BandWidth Red <span class="text-danger">*</span></label>
                                            <input type="number" class="form-control form-control-lg"
                                                :class="{ 'is-invalid': downlinkBwRTouched && form.downlink_bw_r === '' }"
                                                placeholder="Downlink BandWidth Red" name="downlink_bw_r"
                                                v-model="form.downlink_bw_r" @blur="downlinkBwRTouched = true" />
                                            <div class="invalid-feedback" v-if="downlinkBwRTouched && form.downlink_bw_r === ''">Downlink BandWidth Red is required.</div>
                                        </div>
                                    </div>
                                </div>

                                <div class="mb-3">
                                    <div class="row g-2">
                                        <div class="col-md-6">
                                            <label class="form-label ms-1">Uplink Green <span class="text-danger">*</span></label>
                                            <input type="number" class="form-control form-control-lg"
                                                :class="{ 'is-invalid': uplinkGTouched && form.uplink_g === '' }"
                                                placeholder="Uplink Green" name="uplink_g" v-model="form.uplink_g"
                                                @blur="uplinkGTouched = true" />
                                            <div class="invalid-feedback" v-if="uplinkGTouched && form.uplink_g === ''">Uplink Green is required.</div>
                                        </div>
                                        <div class="col-md-6">
                                            <label class="form-label ms-1">Uplink Red <span class="text-danger">*</span></label>
                                            <input type="number" class="form-control form-control-lg"
                                                :class="{ 'is-invalid': uplinkRTouched && form.uplink_r === '' }"
                                                placeholder="Uplink Red" name="uplink_r" v-model="form.uplink_r"
                                                @blur="uplinkRTouched = true" />
                                            <div class="invalid-feedback" v-if="uplinkRTouched && form.uplink_r === ''">Uplink Red is required.</div>
                                        </div>
                                    </div>
                                </div>

                                <div class="mb-3">
                                    <div class="row g-2">
                                        <div class="col-md-6">
                                            <label class="form-label ms-1">Uplink BandWidth Green <span class="text-danger">*</span></label>
                                            <input type="number" class="form-control form-control-lg"
                                                :class="{ 'is-invalid': uplinkBwGTouched && form.uplink_bw_g === '' }"
                                                placeholder="Uplink BandWidth Green" name="uplink_bw_g"
                                                v-model="form.uplink_bw_g" @blur="uplinkBwGTouched = true" />
                                            <div class="invalid-feedback" v-if="uplinkBwGTouched && form.uplink_bw_g === ''">Uplink BandWidth Green is required.</div>
                                        </div>
                                        <div class="col-md-6">
                                            <label class="form-label ms-1">Uplink BandWidth Red <span class="text-danger">*</span></label>
                                            <input type="number" class="form-control form-control-lg"
                                                :class="{ 'is-invalid': uplinkBwRTouched && form.uplink_bw_r === '' }"
                                                placeholder="Uplink BandWidth Red" name="uplink_bw_r"
                                                v-model="form.uplink_bw_r" @blur="uplinkBwRTouched = true" />
                                            <div class="invalid-feedback" v-if="uplinkBwRTouched && form.uplink_bw_r === ''">Uplink BandWidth Red is required.</div>
                                        </div>
                                    </div>
                                </div>

                                <div class="mb-3">
                                    <div class="row g-2">
                                        <div class="col-md-6">
                                            <label class="form-label ms-1">Loss Green <span class="text-danger">*</span></label>
                                            <input type="number" class="form-control form-control-lg"
                                                :class="{ 'is-invalid': lossGTouched && form.loss_g === '' }"
                                                placeholder="Loss Green" name="loss_g" v-model="form.loss_g"
                                                @blur="lossGTouched = true" />
                                            <div class="invalid-feedback" v-if="lossGTouched && form.loss_g === ''">Loss Green is required.</div>
                                        </div>
                                        <div class="col-md-6">
                                            <label class="form-label ms-1">Loss Red <span class="text-danger">*</span></label>
                                            <input type="number" class="form-control form-control-lg"
                                                :class="{ 'is-invalid': lossRTouched && form.loss_r === '' }"
                                                placeholder="Loss Red" name="loss_r" v-model="form.loss_r"
                                                @blur="lossRTouched = true" />
                                            <div class="invalid-feedback" v-if="lossRTouched && form.loss_r === ''">Loss Red is required.</div>
                                        </div>
                                    </div>
                                </div>

                                <div class="mb-3">
                                    <div class="row g-2">
                                        <div class="col-md-6">
                                            <label class="form-label ms-1">Delay Green <span class="text-danger">*</span></label>
                                            <input type="number" class="form-control form-control-lg"
                                                :class="{ 'is-invalid': delayGTouched && form.delay_g === '' }"
                                                placeholder="Delay Green" name="delay_g" v-model="form.delay_g"
                                                @blur="delayGTouched = true" />
                                            <div class="invalid-feedback" v-if="delayGTouched && form.delay_g === ''">Delay Green is required.</div>
                                        </div>
                                        <div class="col-md-6">
                                            <label class="form-label ms-1">Delay Red <span class="text-danger">*</span></label>
                                            <input type="number" class="form-control form-control-lg"
                                                :class="{ 'is-invalid': delayRTouched && form.delay_r === '' }"
                                                placeholder="Delay Red" name="delay_r" v-model="form.delay_r"
                                                @blur="delayRTouched = true" />
                                            <div class="invalid-feedback" v-if="delayRTouched && form.delay_r === ''">Delay Red is required.</div>
                                        </div>
                                    </div>
                                </div>

                                <div class="mb-3">
                                    <div class="row g-2">
                                        <div class="col-md-4">
                                            <label class="form-label ms-1">Wait Time <span class="text-danger">*</span></label>
                                            <input type="number" class="form-control form-control-lg"
                                                :class="{ 'is-invalid': wTimeTouched && form.w_time === '' }"
                                                placeholder="Enter Wait Time" name="w_time" v-model="form.w_time"
                                                @blur="wTimeTouched = true" />
                                            <div class="invalid-feedback" v-if="wTimeTouched && form.w_time === ''">Wait Time is required.</div>
                                        </div>
                                        <div class="col-md-4">
                                            <label class="form-label ms-1">DSCP <span class="text-danger">*</span></label>
                                            <input type="number" class="form-control form-control-lg"
                                                :class="{ 'is-invalid': dscpTouched && form.dscp === '' }"
                                                placeholder="Enter DSCP" name="dscp" v-model="form.dscp"
                                                @blur="dscpTouched = true" />
                                            <div class="invalid-feedback" v-if="dscpTouched && form.dscp === ''">DSCP is required.</div>
                                        </div>
                                        <div class="col-md-4">
                                            <label class="form-label ms-1">Count <span class="text-danger">*</span></label>
                                            <input type="number" class="form-control form-control-lg"
                                                :class="{ 'is-invalid': countTouched && form.count === '' }"
                                                placeholder="Enter Count" name="count" v-model="form.count"
                                                @blur="countTouched = true" />
                                            <div class="invalid-feedback" v-if="countTouched && form.count === ''">Count is required.</div>
                                        </div>
                                    </div>
                                </div>

                                <div class="mb-3">
                                    <div class="row g-2">
                                        <div class="col-md-4">
                                            <label class="form-label ms-1">Number Packets <span class="text-danger">*</span></label>
                                            <input type="number" class="form-control form-control-lg"
                                                :class="{ 'is-invalid': nPacketsTouched && form.n_packets === '' }"
                                                placeholder="Enter Number Packets" name="n_packets" v-model="form.n_packets"
                                                @blur="nPacketsTouched = true" />
                                            <div class="invalid-feedback" v-if="nPacketsTouched && form.n_packets === ''">Number Packets is required.</div>
                                        </div>
                                        <div class="col-md-4">
                                            <label class="form-label ms-1">Packets Interval <span class="text-danger">*</span></label>
                                            <input type="number" class="form-control form-control-lg"
                                                :class="{ 'is-invalid': pIntervalTouched && form.p_interval === '' }"
                                                placeholder="Enter Packets Interval" name="p_interval"
                                                v-model="form.p_interval" @blur="pIntervalTouched = true" />
                                            <div class="invalid-feedback" v-if="pIntervalTouched && form.p_interval === ''">Packets Interval is required.</div>
                                        </div>
                                        <div class="col-md-4">
                                            <label class="form-label ms-1">Packets Size <span class="text-danger">*</span></label>
                                            <input type="number" class="form-control form-control-lg"
                                                :class="{ 'is-invalid': pSizeTouched && form.p_size === '' }"
                                                placeholder="Enter Packets Size" name="p_size" v-model="form.p_size"
                                                @blur="pSizeTouched = true" />
                                            <div class="invalid-feedback" v-if="pSizeTouched && form.p_size === ''">Packets Size is required.</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr>
                            <div class="d-flex justify-content-end">
                                <button type="button" class="modelCancelBtn" data-bs-dismiss="modal" id="cancelButton"
                                    @click="resetForm">Cancel</button>
                                <button type="submit" class="modelSaveBtn ms-2" :disabled="!isFormValid">Create</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { createMonitor } from '../../services/monitor_profile_Services';
import Toast from '../Toast';

export default {
    name: 'AddMonitor',
    props: {
        handleMonitorList: Function
    },
    computed: {
        isFormValid() {
            const numericFields = [
                'rtt_g', 'rtt_r', 'jitter_g', 'jitter_r',
                'downlink_g', 'downlink_r', 'downlink_bw_g', 'downlink_bw_r',
                'uplink_g', 'uplink_r', 'uplink_bw_g', 'uplink_bw_r',
                'loss_g', 'loss_r', 'delay_g', 'delay_r',
                'w_time', 'dscp', 'count', 'n_packets', 'p_interval', 'p_size'
            ]
            return this.form.name !== '' && numericFields.every(f => this.form[f] !== '')
        }
    },
    data() {
        return {
            form: {
                name: '',
                w_time: '', dscp: '', count: '',
                n_packets: '', p_interval: '', p_size: '',
                jitter_g: '', jitter_r: '',
                downlink_g: '', downlink_r: '',
                downlink_bw_g: '', downlink_bw_r: '',
                loss_g: '', loss_r: '',
                rtt_g: '', rtt_r: '',
                uplink_g: '', uplink_r: '',
                uplink_bw_g: '', uplink_bw_r: '',
                delay_g: '', delay_r: '',
            },
            nameTouched: false,
            rttGTouched: false, rttRTouched: false,
            jitterGTouched: false, jitterRTouched: false,
            downlinkGTouched: false, downlinkRTouched: false,
            downlinkBwGTouched: false, downlinkBwRTouched: false,
            uplinkGTouched: false, uplinkRTouched: false,
            uplinkBwGTouched: false, uplinkBwRTouched: false,
            lossGTouched: false, lossRTouched: false,
            delayGTouched: false, delayRTouched: false,
            wTimeTouched: false, dscpTouched: false, countTouched: false,
            nPacketsTouched: false, pIntervalTouched: false, pSizeTouched: false,
        }
    },
    methods: {
        resetForm() {
            this.form = {
                name: '',
                w_time: '', dscp: '', count: '',
                n_packets: '', p_interval: '', p_size: '',
                jitter_g: '', jitter_r: '',
                downlink_g: '', downlink_r: '',
                downlink_bw_g: '', downlink_bw_r: '',
                loss_g: '', loss_r: '',
                rtt_g: '', rtt_r: '',
                uplink_g: '', uplink_r: '',
                uplink_bw_g: '', uplink_bw_r: '',
                delay_g: '', delay_r: '',
            }
            this.nameTouched = false
            this.rttGTouched = false; this.rttRTouched = false
            this.jitterGTouched = false; this.jitterRTouched = false
            this.downlinkGTouched = false; this.downlinkRTouched = false
            this.downlinkBwGTouched = false; this.downlinkBwRTouched = false
            this.uplinkGTouched = false; this.uplinkRTouched = false
            this.uplinkBwGTouched = false; this.uplinkBwRTouched = false
            this.lossGTouched = false; this.lossRTouched = false
            this.delayGTouched = false; this.delayRTouched = false
            this.wTimeTouched = false; this.dscpTouched = false; this.countTouched = false
            this.nPacketsTouched = false; this.pIntervalTouched = false; this.pSizeTouched = false
        },
        async handleAddMonitor(e) {
            e.preventDefault()
            const payload = {
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
            }
            try {
                await createMonitor(payload)
                this.handleMonitorList()
                Toast.fire({ icon: 'success', title: 'Profile added successfully' })
                document.getElementById('cancelButton').click()
                this.resetForm()
            } catch (error) {
                console.log(error)
                Toast.fire({ icon: 'error', title: 'Something went wrong' })
            }
        },
    }
}
</script>

<style scoped>
button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    pointer-events: none;
}
</style>
