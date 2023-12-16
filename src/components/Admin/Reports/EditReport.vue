<template>
    <div>
    <!-- <button class="addBtn" data-bs-toggle="modal" data-bs-target="#staticBackdrop"> <i class="fa-solid fa-pen-to-square"></i></button> -->
    <a href="#" class="text-decoration-none" data-bs-toggle="modal" data-bs-target="#staticBackdrop"> <i class="fa-solid fa-pen-to-square"></i></a>
    <!-- Modal  add-->
    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content">
                <div class="modal-header d-flex justify-content-center align-items-center">
                    <div class="">
                        <h2 class="text-dark"> Add New Report</h2>
                    </div>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="">
                        <div class="mb-3">
                            <input type="text" class="form-control form-control-lg" placeholder="Enter Report Name" name="report_name" v-model="this.report_name">
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="mb-3">
                                    <input type="email" class="form-control form-control-lg" placeholder="abc@email.com" name="email" v-model="this.email">
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="mb-3">
                                    <input type="time" pattern="(?:[01]\d|2[0-3]):(?:[0-5]\d)" class="form-control form-control-lg" placeholder="Enter Time" name="time" v-model="this.time">
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
                                            <input type="text" class="form-control" id="exampleFormControlInput1"
                                                v-model="searchQuery" placeholder="search by alert name">
                                        </div>
                                        <perfect-scrollbar style="height: 240px;">
                                            <div class="text-center m-5" v-if="filteredGroupData.length === 0">
                                                <h3 class="text-danger"> No Alerts found.</h3>
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
                                            Selected Sessions
                                        </div>
                                        <perfect-scrollbar style="height: 280px;">
                                            <div class="text-center m-5" v-if="selectedAlert.length === 0">
                                                <h3 class="text-danger"> No Selected Alerts.</h3>
                                            </div>
                                            <div class="card-body" v-else>
                                                <div class="d-flex align-items-center" v-for="data in selectedAlert"
                                                    :key="data.id">
                                                    <a href="#" class="text-decoration-none" style="color: #b63d3d;"
                                                        @click="handleCancel(data.id)"><i class="fa-solid fa-xmark"></i></a>
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
                        <button type="button" class="modelCancelBtn" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" data-bs-dismiss="modal" @click="handleAddReports" class="modelSaveBtn ms-2">Create</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import {
    getAlerts
} from '../../../services/alerts_services';
import { AddReports } from '../../../services/reports_services'
import { createToast } from 'mosha-vue-toastify';
import 'mosha-vue-toastify/dist/style.css';
import { PerfectScrollbar } from 'vue3-perfect-scrollbar';
import { VueSpinner } from 'vue3-spinners';
export default {
    name: 'EditReport',
    props: {
        handleGetReports:Function
    },
    components: {
        VueSpinner,
        PerfectScrollbar
    },
    data() {
        return {
            report_name: '',
            email: '',
            time: '',
            alertId:[],
            selectedAlert: [],
            alertsData: [],
            searchQuery:''

        }
    },
    computed: {
        filteredGroupData() {
            if (!this.searchQuery) {
                return this.alertsData;
            }
            return this.alertsData.filter(group => group.name.toLowerCase().includes(this.searchQuery.toLowerCase()));
        },
    },
    mounted() {
        this.handleGetAlerts();
    },
    methods: {
        async handleAddReports() {
            const payload = {
                name: this.report_name,
                email: this.email,
                time: this.time,
                alerts: this.alertId
            }
            try {
                await AddReports(payload)
                this.selectedAlert.forEach(alert => {
                    const id = alert.id;
                    const checkboxElement = document.getElementById(`report-${id}`);
                    if (checkboxElement) {
                        checkboxElement.checked = false;
                    }
                });
                createToast(`add Report successfully`, {
                    type: 'success',
                    position: 'top-right',
                    transition: 'zoom',
                });
                this.handleGetReports();
                this.report_name = '',
                this.email = '',
                this.time = '',
                this.selectedAlert = []
            } catch (error) {
                console.log(error)
            }
        },
        async handleSessionsCheck($event, id, name) {
            if ($event.target.checked) {
                this.alertId.push(id);
                this.selectedAlert.push({ id, name });
            } else {
                const index = this.alertId.indexOf(id);
                if (index !== -1) {
                    this.alertId.splice(index, 1);
                }
                const index2 = this.selectedAlert.findIndex(item => item.id === id);
                if (index2 !== -1) {
                    this.selectedAlert.splice(index2, 1);
                }
            }
        },
        handleCancel(id) {
            const index2 = this.selectedAlert.findIndex(item => item.id === id);
            if (index2 !== -1) {
                this.selectedAlert.splice(index2, 1);
                document.getElementById(`report-${id}`).checked = false;
            }
            const index = this.alertId.indexOf(id);
            if (index !== -1) {
                this.alertId.splice(index, 1);
            }
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