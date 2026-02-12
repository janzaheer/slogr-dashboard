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
                                <h3 class="text-secondary ms-3 mt-2">Alerts</h3>
                            </div>
                            <div class="d-flex align-items-center">
                                <h6 class="mx-1 mt-2 text-muted">Home </h6>
                                <h6 class="me-4 mt-2"> - Alerts</h6>
                                <AddAlerts :handleAllAlerts="handleAllAlerts" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container-fluid tableDiv">
                <div class="card mx-md-2 mt-4 mb-5" style="height: 100vh;">
                    <div class="card-body">
                        <div class="mt-3">
                            <div class="text-center m-5" v-if="loading">
                                <VueSpinner size="80" color="#8cb63d" />
                            </div>
                            <div class="m-5" v-else-if="error">
                                <!-- <h3 class="text-danger">Alerts not found Add new Alert</h3> -->
                                <div class="empty-state-container">
                                    <div class="empty-state-card text-center p-5 rounded-4 shadow-sm">
                                        <!-- Icon -->
                                        <div class="empty-state-icon mb-4">
                                            <div class="icon-circle mx-auto">
                                                <i class="bi bi-bell-slash"></i>
                                            </div>
                                        </div>

                                        <!-- Message - EXACTLY YOUR CODE -->
                                        <div class="empty-state-message mb-4">
                                            <h3 class="fw-semibold mb-2" style="color: #1f2937; font-size: 1.5rem;">
                                                No Alerts Found
                                            </h3>
                                            <p class="text-muted mb-0"
                                                style="font-size: 1rem; max-width: 500px; margin: 0 auto;">
                                                You haven't set up any alerts yet. Create your first alert to stay
                                                updated.
                                            </p>
                                        </div>
                                        <!-- Action Button -->
                                       <AddAlerts :handleAllAlerts="handleAllAlerts" />
                                    </div>
                                </div>
                            </div>
                            <div class="table-responsive" v-else>
                                <table class="table table-striped table-hover text-center">
                                    <thead>
                                        <tr>
                                            <th scope="col"><a href="#" class="tableHead">Name</a></th>
                                            <th scope="col"><a href="#" class="tableHead">Email</a></th>
                                            <th scope="col"><a href="#" class="tableHead">Sla Breach Minutes</a></th>
                                            <th scope="col"><a href="#" class="tableHead">Sla Breach Tests</a></th>
                                            <th scope="col"><a href="#" class="tableHead">Tests Norun</a> </th>
                                            <th scope="col"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="data in alertList" :key="data.id">
                                            <td>
                                                <p class="tableP">{{ data?.name }}</p>
                                            </td>
                                            <td>
                                                <p class="tableP">{{ data?.email }}</p>
                                            </td>
                                            <td>
                                                <p class="tableP">{{ data?.sla_breach_minutes }}</p>
                                            </td>
                                            <td>
                                                <p class="tableP">{{ data?.sla_breach_tests }}</p>
                                            </td>
                                            <td>
                                                <p class="tableP">{{ data?.tests_norun }}</p>
                                            </td>
                                            <td class="fs-5 dropstart">
                                                <a href="#" class="text-decoration-none text-dark tableP"
                                                    data-bs-toggle="dropdown" aria-expanded="false">
                                                    <i class="fa-solid fa-ellipsis"></i></a>
                                                <ul class="dropdown-menu">
                                                    <li>
                                                        <a href="#" class="dropdown-item" data-bs-toggle="modal"
                                                            data-bs-target="#staticBackdrop1"
                                                            @click="handleEditModel(data.name, data.email, data.group_id, data.profile_id, data.sla_breach_minutes, data.sla_breach_tests, data.tests_norun, data.id)"><i
                                                                class="fa-regular fa-pen-to-square"></i>
                                                            Edit</a>
                                                    </li>
                                                    <li><a class="dropdown-item" href="#"
                                                            @click="handleDelete(data.id)"><i
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
            <!-- Modal  add-->
            <div class="modal fade" id="staticBackdrop1" data-bs-backdrop="static" data-bs-keyboard="false"
                tabindex="-1" aria-labelledby="staticBackdrop1Label" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Edit Alert</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="">
                                <div class="mb-3">
                                    <div class="row g-2">
                                        <div class="col-md-6">
                                            <label for="exampleFormControlInput1" class="form-label ms-1">Alert
                                                Name*</label>
                                            <input type="text" class="form-control form-control-lg"
                                                placeholder="Enter Alert Name" v-model="this.name" name="name">
                                        </div>
                                        <div class="col-md-6">
                                            <label for="exampleFormControlInput1" class="form-label ms-1">Email*</label>
                                            <input type="email" class="form-control form-control-lg"
                                                placeholder="Enter Email" v-model="this.email" name="email">
                                        </div>
                                    </div>
                                </div>
                                <div class="mb-4">
                                    <label for="exampleFormControlInput1" class="form-label ms-1">Group*</label>
                                    <select v-model="selectedGroup" class="form-select form-select-lg mb-3"
                                        aria-label=".form-select-lg example">
                                        <option class="text-secondary" disabled>Select here
                                        </option>
                                        <option v-for="group in groupsLIst" :key="group.id" :value="group.id">{{
                                            group.name
                                            }}
                                        </option>
                                    </select>
                                </div>
                                <div class="mb-4">
                                    <label for="exampleFormControlInput1" class="form-label ms-1">Monitoring
                                        Profile*</label>
                                    <select v-model="selectedProfile"
                                        class="form-select form-select-lg mb-3 custom-select"
                                        aria-label=".form-select-lg example">
                                        <option class="text-secondary" disabled>select here</option>
                                        <option v-for="profile in profiles" :key="profile.id" :value="profile.id">{{
                                            profile.name }}</option>
                                    </select>
                                </div>
                                <div class="mb-3">
                                    <div class="row g-2">
                                        <div class="col-md-6">
                                            <label for="exampleFormControlInput1" class="form-label ms-1">Sla Breach
                                                Minutes*</label>
                                            <input type="number" class="form-control form-control-lg"
                                                v-model="this.sla_breach_minutes" placeholder="Enter sla_breach_minutes"
                                                name="sla_breach_minutes">
                                        </div>
                                        <div class="col-md-6">
                                            <label for="exampleFormControlInput1" class="form-label ms-1">Sla Breach
                                                Tests*</label>
                                            <input type="number" class="form-control form-control-lg" placeholder="Enter Sla Breach
                                            Tests*" v-model="this.sla_breach_tests" name="sla_breach_tests">
                                        </div>
                                        <div class="col-md-6">
                                            <label for="exampleFormControlInput1" class="form-label ms-1">Tests
                                                Norun*</label>
                                            <input type="number" class="form-control form-control-lg"
                                                v-model="this.tests_norun" placeholder="Enter Tests Norun*"
                                                name="tests_norun">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <div class="d-flex justify-content-end">
                                <button type="button" class="modelCancelBtn" data-bs-dismiss="modal">Cancel</button>
                                <button type="button" data-bs-dismiss="modal" class="modelSaveBtn ms-2"
                                    @click="handleUpdateAlerts">Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { RouterLink } from 'vue-router';
import Header from '../../common/Header.vue';
import AddAlerts from './AddAlerts.vue';
import { getAlerts, updateAlert, deleteAlert } from '../../../services/alerts_services';
import { createToast } from 'mosha-vue-toastify';
import 'mosha-vue-toastify/dist/style.css';
import { ProfileListForm } from '../../../services/monitor_profile_Services';
import { GroupListForm } from '../../../services/group_services';
import { VueSpinner } from 'vue3-spinners';
export default {
    name: 'Alerts',
    components: {
        Header,
        AddAlerts,
        VueSpinner
    },
    data() {
        return {
            alertList: [],
            id: '',
            name: '',
            email: '',
            sla_breach_minutes: '',
            sla_breach_tests: '',
            tests_norun: '',
            selectedProfile: 'Select Profile Here', // Will store the selected profile id
            profiles: [],
            selectedGroup: 'Select Group Here',
            groupsLIst: [],
            loading: false,
            error: null, // data not found check
        }
    },
    async mounted() {
        this.handleAllAlerts();
        await this.monitor()
        await this.groups()
    },
    methods: {
        async handleAllAlerts() {
            try {
                this.loading = true;
                this.error = null;
                let res = await getAlerts()
                if (res.length === 0) {
                    this.error = "Alerts not found Add new Alert";
                    this.alertList = []
                } else {
                    this.alertList = res
                    console.log('alerts', res)
                }
            } catch (error) {
                console.log(error)
            } finally {
                this.loading = false
            }
        },
        handleEditModel(name, email, group_id, profile_id, sla_breach_minutes, sla_breach_tests, tests_norun, id) {
            this.name = name
            this.email = email,
                this.selectedGroup = group_id,
                this.selectedProfile = profile_id,
                this.sla_breach_minutes = sla_breach_minutes,
                this.sla_breach_tests = sla_breach_tests,
                this.tests_norun = tests_norun,
                this.id = id
        },
        async handleUpdateAlerts() {
            const payload = {
                name: this.name,
                email: this.email,
                profile: this.selectedProfile,
                group: this.selectedGroup,
                sla_breach_minutes: this.sla_breach_minutes,
                sla_breach_tests: this.sla_breach_tests,
                tests_norun: this.tests_norun,
                id: this.id,
                edit: true
            }
            try {
                await updateAlert(payload)
                this.handleAllAlerts();
                createToast(`Alert update successfully`, {
                    type: 'success',
                    position: 'top-right',
                    transition: 'zoom',
                });
            } catch (error) {
                createToast(`Alert not update something is wrong`, {
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
        async groups(size = 1000) {
            try {
                let res = await GroupListForm(size)
                this.groupsLIst = res;
            } catch (error) {
                console.log(error)
            }
        },
        async handleDelete(id) {
            const payload = {
                id: id
            }
            try {
                await deleteAlert(payload)
                this.handleAllAlerts()
                createToast(`Alert delete`, {
                    type: 'success',
                    position: 'top-right',
                    transition: 'zoom',
                });
            } catch (error) {
                createToast(`delete error`, {
                    type: 'danger',
                    position: 'top-right',
                    transition: 'zoom',
                });
                console.log(error)
            }
        }
    }
}
</script>

<style>
.empty-state-container {
    min-height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
}

.empty-state-card {
    background: white;
    max-width: 500px;
    width: 100%;
    border: 1px solid rgba(0, 0, 0, 0.05);
}

.icon-circle {
    width: 80px;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #f0f4ff 0%, #e6f0ff 100%);
    border-radius: 50%;
    color: #667eea;
    font-size: 2rem;
}

.btn-primary {
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
}

.btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.3);
}

.btn-primary:active {
    transform: translateY(0);
}

/* Optional: Add pulse animation to icon */
.icon-circle {
    animation: pulse 2s infinite;
}

@keyframes pulse {
    0% {
        box-shadow: 0 0 0 0 rgba(102, 126, 234, 0.2);
    }

    70% {
        box-shadow: 0 0 0 15px rgba(102, 126, 234, 0);
    }

    100% {
        box-shadow: 0 0 0 0 rgba(102, 126, 234, 0);
    }
}

/* Responsive */
@media (max-width: 576px) {
    .empty-state-container {
        padding: 1rem;
    }

    .empty-state-card {
        padding: 2rem 1.5rem !important;
    }

    .icon-circle {
        width: 70px;
        height: 70px;
        font-size: 1.75rem;
    }

    h3 {
        font-size: 1.3rem !important;
    }

    p {
        font-size: 0.95rem !important;
    }
}
</style>