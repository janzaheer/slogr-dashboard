<template>
    <!-- <Header/> -->
    <div class="pageHeight">
        <div class="bg">
            <Header />
            <div class="container-fluid sentinel mt-2">
                <div class="d-flex justify-content-end">
                    <h1 class="me-2"><i class="fa-solid fa-xmark fa-xs" style="color: #d8dce2;"></i></h1>
                </div>
            </div>
            <div class="container-fluid">
                <div class="card mx-md-2">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-center ">
                            <div>
                                <h3 class="text-secondary ms-3 mt-2">Sessions</h3>
                            </div>
                            <div class="d-flex align-items-center">
                                <h6 class="mx-1 mt-2 text-muted">Home </h6>
                                <h6 class="me-4 mt-2"> - Sessions</h6>
                                <AddSessions :getSessions="getSessions" />
                                <div class="mx-3"><i class="fa-solid fa-ellipsis fa-2xl"></i></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container-fluid tableDiv">
                <div class="card mx-md-2 mt-4 mb-5">
                    <div class="card-body">
                        <div class="text-center m-5" v-if="loading">
                            <VueSpinner size="80" color="#8cb63d" />
                        </div>
                        <div class="table-responsive" v-else>
                            <table class="table table-striped table-hover text-center">
                                <thead>
                                    <tr>
                                        <th scope="col"><a href="#" class="tableHead">Server Name</a></th>
                                        <th scope="col"><a href="#" class="tableHead">Client Name</a>
                                        </th>
                                        <th scope="col"><a href="#" class="tableHead">Packet Name</a>

                                        </th>
                                        <th scope="col"><a href="#" class="tableHead"> Number Packets</a>
                                        </th>
                                        <th scope="col"><a href="#" class="tableHead">Packet Interval</a>
                                        </th>
                                        <th scope="col"><a href="#" class="tableHead">W Time</a>
                                        </th>
                                        <th scope="col"><a href="#" class="tableHead">Packet Length</a> </th>
                                        <th scope="col"><a href="#" class="tableHead">DSCP</a> </th>
                                        <th scope="col"> </th>
                                        <th scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="data in sessionsData" :key="data.id">
                                        <td>
                                            <p class="tableP">{{ data?.s_name }}</p>
                                        </td>
                                        <td>
                                            <p class="tableP">{{ data?.c_name }}</p>
                                        </td>
                                        <td>
                                            <p class="tableP">{{ data?.p_name }}</p>
                                        </td>
                                        <td>
                                            <p class="tableP">{{ data?.n_packets }}</p>
                                        </td>
                                        <td>
                                            <p class="tableP">{{ data?.p_interval }}</p>
                                        </td>
                                        <td>
                                            <p class="tableP">{{ data.w_time }}</p>
                                        </td>
                                        <td>
                                            <p class="tableP">{{ data.p_size }}</p>
                                        </td>
                                        <td>
                                            <p class="tableP">{{ data.dscp }}</p>
                                        </td>
                                        <td class="fs-5"><a href="#" class="text-decoration-none text-dark tableP">
                                                <i class="fa-solid fa-circle-play"></i></a></td>
                                        <td class="fs-5 dropstart"><a href="#" class="text-decoration-none text-dark tableP"
                                                data-bs-toggle="dropdown" aria-expanded="false">
                                                <i class="fa-solid fa-ellipsis"></i></a>
                                            <ul class="dropdown-menu">
                                                <li><a class="dropdown-item" href="#"><i
                                                            class="fa-regular fa-pen-to-square"></i> Edit</a></li>
                                                <li>
                                                    <RouterLink :to="`/sentinelReports/` + data.id" class="dropdown-item"><i
                                                            class="fa-regular fa-eye me-1 text-dark"></i>Details
                                                    </RouterLink>
                                                </li>
                                                <li><a class="dropdown-item" href="#" v-on:click="handleDelete(data.id)"><i
                                                            class="fa-regular fa-trash-can"></i> Delete</a></li>
                                            </ul>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="d-flex justify-content-between">
                            <div>
                                <button class="addBtn2"><i class="fa-solid fa-chevron-down fa-lg"></i> Go to
                                    Page</button>
                                <button class="addBtn2 mx-2" data-bs-toggle="modal" data-bs-target="#groupModal"><i
                                        class="fa-solid fa-plus fa-lg"></i> Add to
                                    Group</button>
                                <button class="addBtn2"><i class="fa-solid fa-plus fa-lg"></i> Create
                                    Report</button>
                            </div>
                            <div>
                                <div class="pagination">
                                    <button class="prevBtn" :disabled="pages.previousPage === 0"
                                        v-on:click="getSessions(pages.previousPage)"><i class="fa-solid fa-angle-left"></i>
                                        Prev</button>
                                    <div class="pageNumber">-</div>
                                    <div class="pageNumber">-</div>
                                    <div class="pageNumber pageBtn">{{ pages.currentPage }}</div>
                                    <div class="pageNumber">-</div>
                                    <div class="pageNumber">-</div>
                                    <button class="nextBtn" :disabled="pages.nextPage === 0"
                                        v-on:click="getSessions(pages.nextPage)">Next <i
                                            class="fa-solid fa-angle-right"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- go to Modal -->
    <div class="modal fade" id="groupModal" tabindex="-1" aria-labelledby="groupModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-body">
                    <div class="my-4 text-center">
                        <h2 class="text-dark">Add To Group</h2>
                    </div>
                    <div class="container mb-2">
                        <input type="text" class="form-control form-control-lg" style="background-color: #f3f3f3;"
                            id="exampleFormControlInput1" placeholder="">
                    </div>
                    <div class="">
                        <hr>
                        <button class="createGroupBtn"> <i class="fa-solid fa-plus fa-lg"></i> Create New Group</button>
                        <hr>
                    </div>
                    <div class="mx-2">
                        <div class="form-check mb-3">
                            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                            <label class="form-check-label" for="flexCheckDefault">
                                Group 01
                            </label>
                        </div>
                        <div class="form-check mb-3">
                            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault1">
                            <label class="form-check-label" for="flexCheckDefault1">
                                Group 024
                            </label>
                        </div>
                        <div class="form-check mb-3">
                            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault2">
                            <label class="form-check-label" for="flexCheckDefault2">
                                Group Number 021
                            </label>
                        </div>
                        <div class="form-check mb-3">
                            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault3">
                            <label class="form-check-label" for="flexCheckDefault3">
                                Group Number B23
                            </label>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="modelCancelBtn" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="modelSaveBtn ms-2">Add Group</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Header from '../common/Header.vue';
import { sessionsList, deleteSessions } from '../../services/sessions_services';
import { VueSpinner } from 'vue3-spinners';
import AddSessions from './AddSessions.vue';
import { RouterLink } from 'vue-router';
import { createToast } from 'mosha-vue-toastify';
import 'mosha-vue-toastify/dist/style.css';
export default {
    name: 'Sessions',
    components: {
        Header,
        VueSpinner,
        AddSessions
    },
    data() {
        return {
            sessionsData: [],
            loading: false,
            pages: {
                currentPage: 1,
                previousPage: 1,
                nextPage: 1
            },
        }
    },
    mounted() {
        this.getSessions();
    },
    methods: {
        async getSessions(page = 1) {
            try {
                this.loading = true
                let res = await sessionsList(page)
                this.sessionsData = res.data.sessions
                this.pages.previousPage = res?.data?.prev || 0
                this.pages.currentPage = this.pages.previousPage + 1
                this.pages.nextPage = res?.data?.next || 0
            } catch (error) {
                console.log(error)
            } finally {
                this.loading = false
            }
        },
        async handleDelete(id) {
            const payload = {
                id: id
            }
            console.log(id)
            try {
                await deleteSessions(payload)
                this.getSessions()
                createToast(`session delete`, {
                    type: 'danger',
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
.addBtnSessions {
    background-color: var(--white_color);
    border-radius: 6px;
    border: 1px solid var(--primary_color);
    padding: 7px 15px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    color: var(--primary_color);
}

.addBtnSessions:hover {
    background-color: var(--primary_color_Hover);
    color: var(--white_color);
}
</style>

