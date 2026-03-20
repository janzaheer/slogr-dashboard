<template>
<div>
    <button class="addBtn" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
        <i class="fa-solid fa-plus fa-lg"></i> Create New Reports
    </button>

    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content">
                <div class="modal-header d-flex justify-content-center align-items-center">
                    <div class="">
                        <h2 class="text-dark">Add New Report</h2>
                    </div>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
                        @click="resetForm"></button>
                </div>
                <div class="modal-body">
                    <div class="">
                        <div class="mb-3">
                            <label class="form-label ms-1">Report Name <span class="text-danger">*</span></label>
                            <input type="text" class="form-control form-control-lg"
                                :class="{ 'is-invalid': reportNameTouched && !report_name }"
                                placeholder="Enter Report Name" name="report_name" v-model="report_name"
                                @blur="reportNameTouched = true" />
                            <div class="invalid-feedback" v-if="reportNameTouched && !report_name">Report Name is required.</div>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="mb-3">
                                    <label class="form-label ms-1">Email <span class="text-danger">*</span></label>
                                    <input type="email" class="form-control form-control-lg"
                                        :class="{ 'is-invalid': emailTouched && !email }"
                                        placeholder="abc@email.com" name="email" v-model="email"
                                        @blur="emailTouched = true" />
                                    <div class="invalid-feedback" v-if="emailTouched && !email">Email is required.</div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="mb-3">
                                    <label class="form-label ms-1">Time <span class="text-danger">*</span></label>
                                    <input type="time" class="form-control form-control-lg"
                                        :class="{ 'is-invalid': timeTouched && !time }"
                                        placeholder="Enter Time" name="time" v-model="time"
                                        @blur="timeTouched = true" />
                                    <div class="invalid-feedback" v-if="timeTouched && !time">Time is required.</div>
                                </div>
                            </div>
                        </div>
                        <div class="row g-2 mt-1">
                            <div class="col-6">
                                <div class="card">
                                    <div class="card-header">
                                        List of Alerts
                                    </div>
                                    <div class="mt-1 mx-5">
                                        <input type="text" class="form-control" v-model="searchQuery"
                                            placeholder="Search by alert name">
                                    </div>
                                    <perfect-scrollbar style="height: 240px;">
                                        <div class="text-center m-5" v-if="filteredGroupData.length === 0">
                                            <h3 class="text-danger">No Alerts found.</h3>
                                        </div>
                                        <div class="card-body">
                                            <div class="d-flex align-items-center" v-for="data in filteredGroupData"
                                                :key="data.id">
                                                <div class="form-check">
                                                    <input class="form-check-input" type="checkbox"
                                                        :id="'report-' + data.id"
                                                        v-on:click="handleSessionsCheck($event, data.id, data.name)">
                                                </div>
                                                <p class="sessionFormText me-1">{{ data?.name }}</p>
                                            </div>
                                        </div>
                                    </perfect-scrollbar>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="card">
                                    <div class="card-header">
                                        Selected Alerts
                                    </div>
                                    <perfect-scrollbar style="height: 280px;">
                                        <div class="text-center m-5" v-if="selectedAlert.length === 0">
                                            <h3 class="text-danger">No Selected Alerts.</h3>
                                        </div>
                                        <div class="card-body" v-else>
                                            <div class="d-flex align-items-center" v-for="data in selectedAlert"
                                                :key="data.id">
                                                <a href="#" class="text-decoration-none" style="color: #b63d3d;"
                                                    @click="handleCancel(data.id)">
                                                    <i class="fa-solid fa-xmark"></i>
                                                </a>
                                                <p class="sessionFormText me-1">{{ data?.name }}</p>
                                            </div>
                                        </div>
                                    </perfect-scrollbar>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <div class="d-flex justify-content-end">
                        <button type="button" class="modelCancelBtn" data-bs-dismiss="modal" id="reportCancelBtn"
                            @click="resetForm">Cancel</button>
                        <button type="button" class="modelSaveBtn ms-2"
                            :disabled="!isFormValid"
                            @click="handleAddReports">Create</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import { getAlerts } from '../../../services/alerts_services';
import { AddReports } from '../../../services/reports_services';
import { PerfectScrollbar } from 'vue3-perfect-scrollbar';
import Toast from '../../Toast';

export default {
    name: 'AddReports',
    props: {
        handleGetReports: Function
    },
    components: {
        PerfectScrollbar
    },
    computed: {
        isFormValid() {
            return !!this.report_name && !!this.email && !!this.time
        },
        filteredGroupData() {
            if (!this.searchQuery) return this.alertsData
            return this.alertsData.filter(a => a.name.toLowerCase().includes(this.searchQuery.toLowerCase()))
        },
    },
    data() {
        return {
            report_name: '',
            email: '',
            time: '',
            alertId: [],
            selectedAlert: [],
            alertsData: [],
            searchQuery: '',
            reportNameTouched: false,
            emailTouched: false,
            timeTouched: false,
        }
    },
    mounted() {
        this.handleGetAlerts()
    },
    methods: {
        resetForm() {
            this.report_name = ''
            this.email = ''
            this.time = ''
            this.alertId = []
            this.searchQuery = ''
            this.selectedAlert.forEach(alert => {
                const el = document.getElementById(`report-${alert.id}`)
                if (el) el.checked = false
            })
            this.selectedAlert = []
            this.reportNameTouched = false
            this.emailTouched = false
            this.timeTouched = false
        },
        async handleAddReports() {
            const payload = {
                name: this.report_name,
                email: this.email,
                time: this.time,
                alerts: this.alertId
            }
            try {
                await AddReports(payload)
                Toast.fire({ icon: 'success', title: 'Report added successfully' })
                this.handleGetReports()
                document.getElementById('reportCancelBtn').click()
                this.resetForm()
            } catch (error) {
                console.log(error)
                Toast.fire({ icon: 'error', title: 'Something went wrong' })
            }
        },
        async handleSessionsCheck($event, id, name) {
            if ($event.target.checked) {
                this.alertId.push(id)
                this.selectedAlert.push({ id, name })
            } else {
                const index = this.alertId.indexOf(id)
                if (index !== -1) this.alertId.splice(index, 1)
                const index2 = this.selectedAlert.findIndex(item => item.id === id)
                if (index2 !== -1) this.selectedAlert.splice(index2, 1)
            }
        },
        handleCancel(id) {
            const index2 = this.selectedAlert.findIndex(item => item.id === id)
            if (index2 !== -1) {
                this.selectedAlert.splice(index2, 1)
                document.getElementById(`report-${id}`).checked = false
            }
            const index = this.alertId.indexOf(id)
            if (index !== -1) this.alertId.splice(index, 1)
        },
        async handleGetAlerts() {
            try {
                let res = await getAlerts()
                this.alertsData = res
            } catch (error) {
                console.log(error)
            }
        }
    }
}
</script>

<style scoped>
button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    pointer-events: none;
}

.sessionFormText {
    font-size: 12px;
    margin-left: 10px;
}
</style>
