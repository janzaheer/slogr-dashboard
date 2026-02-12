<template>
    <div class="pageHeight">
        <div class="bg">
            <Header />
            <div class="container-fluid sentinel mt-2">
                <div class="d-flex justify-content-end">
                    <h1 class="me-2">
                        <RouterLink to="/"> <i class="fa-solid fa-xmark fa-xs" style="color: #d8dce2;"></i></RouterLink>
                    </h1>
                </div>
            </div>
            <div class="container-fluid">
                <div class="card mx-md-2">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-center ">
                            <div>
                                <h3 class="text-secondary ms-3 mt-2">Reports</h3>
                            </div>
                            <div class="d-flex align-items-center">
                                <h6 class="mx-1 mt-2 text-muted">Home </h6>
                                <h6 class="me-4 mt-2"> - Reports</h6>
                                <AddReports :handleGetReports="handleGetReports" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container-fluid tableDiv">
                <div class="card  mx-md-2 mt-4 mb-5" style="height: 100vh;">
                    <div class="card-body">
                        <div class="mt-3">
                            <div class="text-center m-5" v-if="loading">
                                <VueSpinner size="80" color="#8cb63d" />
                            </div>
                            <div class="text-center m-5" v-else-if="error">
                                <div class="mb-4">
                                    <div class="icon-circle mx-auto d-flex align-items-center justify-content-center"
                                        style="width: 80px; height: 80px; background: #f0f9ff; border-radius: 50%;">
                                        <i class="bi bi-file-earmark-text" style="font-size: 2rem; color: #0ea5e9;"></i>
                                    </div>
                                </div>

                                <!-- Message -->
                                <div class="mb-4">
                                    <h3 class="fw-semibold mb-2" style="color: #1f2937; font-size: 1.5rem;">
                                        No Reports Found
                                    </h3>
                                    <p class="text-muted mb-0"
                                        style="font-size: 1rem; max-width: 500px; margin: 0 auto;">
                                        Reports not found. Generate your first report to get insights.
                                    </p>
                                </div>

                                <!-- Action Button -->
                                <div class="mt-4">
                                    <AddReports :handleGetReports="handleGetReports" />
                                </div>
                            </div>
                            <div class="table-responsive" v-else>
                                <table class="table table-striped table-hover text-center">
                                    <thead>
                                        <tr>
                                            <th scope="col"><a href="#" class="tableHead">Name</a></th>
                                            <th scope="col"><a href="#" class="tableHead">Email</a></th>
                                            <th scope="col"><a href="#" class="tableHead">Time</a> </th>
                                            <th scope="col"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="data in reportsData" :key="data.id">
                                            <td>
                                                <p class="tableP">{{ data?.name }}</p>
                                            </td>
                                            <td>
                                                <p class="tableP">{{ data?.email }}</p>
                                            </td>
                                            <td>
                                                <p class="tableP">{{ data?.time }}</p>
                                            </td>
                                            <td class="fs-5 dropstart"><a href="#"
                                                    class="text-decoration-none text-dark tableP"
                                                    data-bs-toggle="dropdown" aria-expanded="false">
                                                    <i class="fa-solid fa-ellipsis"></i></a>
                                                <ul class="dropdown-menu">
                                                    <li>
                                                        <a href="#" class="dropdown-item" data-bs-toggle="modal"
                                                            data-bs-target="#staticBackdrop1"
                                                            @click="handleEditModel(data.id, data.name, data.email, data.time)"><i
                                                                class="fa-regular fa-pen-to-square"></i>
                                                            Edit</a>
                                                    </li>
                                                    <li><a class="dropdown-item" href="#"
                                                            v-on:click="handleDelete(data.id)"><i
                                                                class="fa-regular fa-trash-can"></i> Delete</a></li>
                                                </ul>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Modal  edit-->
        <div class="modal fade" id="staticBackdrop1" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
            aria-labelledby="staticBackdrop1Label" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-lg">
                <div class="modal-content">
                    <div class="modal-header d-flex justify-content-center align-items-center">
                        <div class="">
                            <h2 class="text-dark"> Edit Report</h2>
                        </div>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="">
                            <div class="mb-3">
                                <input type="text" class="form-control form-control-lg" placeholder="Enter Report Name"
                                    name="report_name" v-model="this.report_name">
                            </div>
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="mb-3">
                                        <label for="exampleFormControlInput3" class="form-label ms-1">Enter
                                            Email*</label>
                                        <input type="email" class="form-control form-control-lg"
                                            placeholder="abc@email.com" name="email" v-model="this.email">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="mb-3">
                                        <label for="exampleFormControlInput2" class="form-label ms-1">Select Time (?)
                                            Generating report on daily basis</label>
                                        <input type="time" pattern="(?:[01]\d|2[0-3]):(?:[0-5]\d)"
                                            class="form-control form-control-lg" placeholder="Enter Time" name="time"
                                            v-model="this.time">
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
                                                            :id="'edit-report-' + data.id"
                                                            :checked="isSelected(data.id)"
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
                                                        @click="handleCancel(data.id)"><i
                                                            class="fa-solid fa-xmark"></i></a>
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
                            <button type="button" data-bs-dismiss="modal" @click="handleUpdateReports"
                                class="modelSaveBtn ms-2">Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {
    RouterLink
} from 'vue-router';
import Header from '../../common/Header.vue';
import AddReports from './AddReports.vue';
// import EditReport from './EditReport.vue';
import {
    ReportDetail,
    UpdateReport, DeleteReport
} from '../../../services/reports_services'
import {
    VueSpinner
} from 'vue3-spinners';
import {
    ReportsList
} from '.././../../services/reports_services';
import {
    createToast
} from 'mosha-vue-toastify';
import 'mosha-vue-toastify/dist/style.css';
import {
    PerfectScrollbar
} from 'vue3-perfect-scrollbar';
export default {
    name: 'Reports',
    components: {
        Header,
        AddReports,
        VueSpinner,
        // EditReport
        PerfectScrollbar

    },
    computed: {
        filteredGroupData() {
            if (!this.searchQuery) {
                return this.selectedAlert;
            }
            return this.selectedAlert.filter(group => group.name.toLowerCase().includes(this.searchQuery.toLowerCase()));
        },
    },
    data() {
        return {
            reportsData: [],
            loading: false,
            error: null, // data not found check
            id: null,
            report_name: '',
            email: '',
            time: '',
            alertId: [],
            selectedAlert: [],
            alertsData: [],
            searchQuery: '',
            searchQueryListOne: '',
            activeGroup: null,
        }
    },
    mounted() {
        this.handleGetReports()
    },
    methods: {
        async handleGetReports() {
            try {
                this.loading = true;
                this.error = null;
                let res = await ReportsList()
                if (res.length === 0) {
                    this.error = "Reports not found.";
                    this.reportsData = []
                } else {
                    this.reportsData = res
                }
            } catch (error) {
                console.log(error)
            } finally {
                this.loading = false;
            }
        },
        isSelected(id) {
            return this.selectedAlert.some(alert => alert.id === id);
        },
        async handleEditModel(id, name, email, time) {
            this.id = id;
            this.report_name = name;
            this.email = email;

            const parts = time.split(':');

            const hours = parts[0];
            const minutes = parts[1];
            this.time = hours + ':' + minutes;

            let res = await ReportDetail(id)
            console.log('detail', res)
            const uniqueSessionIds = new Set(this.alertId);
            res.alerts.forEach(data => {
                const newId = data.id;
                console.log('newId', newId)

                if (!uniqueSessionIds.has(newId)) {
                    uniqueSessionIds.add(newId);

                    const name = data.name;
                    if (!this.selectedAlert.some(alert => alert.id === newId)) {
                        this.selectedAlert.push({
                            id: newId,
                            name
                        });
                    }
                    const checkbox = document.getElementById('edit-report-' + newId);
                    if (checkbox) {
                        checkbox.checked = true;
                    }
                }
            });
            this.alertId = Array.from(uniqueSessionIds);
        },
        async handleUpdateReports() {
            const payload = {
                name: this.report_name,
                email: this.email,
                time: this.time,
                alerts: this.alertId,
                id: this.id
            }
            try {
                await UpdateReport(payload)
                createToast(`Update Report successfully`, {
                    type: 'success',
                    position: 'top-right',
                    transition: 'zoom',
                });
                this.handleGetReports()
            } catch (error) {
                console.log(error)
            }
        },
        async handleSessionsCheck($event, id, name) {
            if ($event.target.checked) {
                this.alertId.push(id);
                this.selectedAlert.push({
                    id,
                    name
                });
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
                document.getElementById(`edit-report-${id}`).checked = false;
            }
            const index = this.alertId.indexOf(id);
            if (index !== -1) {
                this.alertId.splice(index, 1);
            }
        },
        async handleDelete(id) {
            const payload = {
                id: id
            }
            try {
                await DeleteReport(payload)
                createToast(`Delete Report Successfully`, {
                    type: 'success',
                    position: 'top-right',
                    transition: 'zoom',
                });
                this.handleGetReports()
            } catch (error) {
                console.log('error', error)
            }
        }
    }
}
</script>
