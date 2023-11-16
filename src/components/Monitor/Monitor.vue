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
                                <h3 class="text-secondary ms-3 mt-2">Monitor</h3>
                            </div>
                            <div class="d-flex align-items-center">
                                <h6 class="mx-1 mt-2 text-muted">Home </h6>
                                <h6 class="me-4 mt-2"> - Monitor</h6>
                                <AddMonitor :handleMonitorList="handleMonitorList" />
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
                                        <th><a href="#" class="tableHead">Name</a></th>
                                        <th><a href="#" class="tableHead">Date</a></th>
                                        <th><a href="#" class="tableHead">Max Jitter </a></th>
                                        <th><a href="#" class="tableHead">Max Downlink</a> </th>
                                        <th><a href="#" class="tableHead">Max Loss</a></th>
                                        <th><a href="#" class="tableHead">Max RTT</a></th>
                                        <th><a href="#" class="tableHead">Max Uplink</a></th>
                                        <th><a href="#" class="tableHead">Number Packets</a></th>
                                        <th><a href="#" class="tableHead">Packet Interval </a></th>
                                        <th><a href="#" class="tableHead">Packet Size</a></th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="data in monitorData" :key="data.id">
                                        <td>
                                            <p class="tableP">
                                                {{ data.name }}
                                            </p>
                                        </td>
                                        <td>
                                            <p class="tableP">{{ moment(data?.created_at).format('l') }}</p>
                                        </td>
                                        <td>
                                            <p class="tableP">{{ data.max_jitter }}</p>
                                        </td>
                                        <td>
                                            <p class="tableP">{{ data.max_downlink }}</p>
                                        </td>
                                        <td>
                                            <p class="tableP">{{ data.max_loss }}</p>
                                        </td>
                                        <td>
                                            <p class="tableP">{{ data.max_rtt }}</p>
                                        </td>
                                        <td>
                                            <p class="tableP">{{ data.max_uplink }}</p>
                                        </td>
                                        <td>
                                            <p class="tableP">{{ data.n_packets }}</p>
                                        </td>
                                        <td>
                                            <p class="tableP">{{ data.p_interval }}</p>
                                        </td>
                                        <td>
                                            <p class="tableP">{{ data.p_size }}</p>
                                        </td>
                                        <td class="fs-5 dropstart"><a href="#" class="text-decoration-none text-dark tableP"
                                                data-bs-toggle="dropdown" aria-expanded="false">
                                                <i class="fa-solid fa-ellipsis"></i></a>
                                            <ul class="dropdown-menu">
                                                <li><a class="dropdown-item" href="#"><i
                                                            class="fa-regular fa-pen-to-square"></i> Edit</a></li>
                                                <li><a class="dropdown-item" href="#"><i class="fa-regular fa-eye"></i>
                                                        Details</a></li>
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
                            </div>
                            <div>
                                <div class="pagination">
                                    <button class="prevBtn"><i class="fa-solid fa-angle-left"></i> Prev</button>
                                    <div class="pageNumber">1</div>
                                    <div class="pageNumber">2</div>
                                    <div class="pageNumber pageBtn">3</div>
                                    <div class="pageNumber">4</div>
                                    <div class="pageNumber">5</div>
                                    <button class="nextBtn">Next <i class="fa-solid fa-angle-right"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

   
</template>

<script>
import AddMonitor from './AddMonitor.vue';
import Header from '../common/Header.vue';
import { ProfileList,deleteMonitor } from '../../services/monitor_profile_Services';
import { VueSpinner } from 'vue3-spinners';
import moment from 'moment'
export default {
    name: 'Monitor',
    components: {
        Header,
        VueSpinner,
        AddMonitor
    },
    created: function () {
        this.moment = moment;
    },
    data() {
        return {
            monitorData: [],
            loading: false
        }
    },
    mounted() {
        this.handleMonitorList()
    },
    methods: {
        async handleMonitorList() {
            try {
                this.loading = true
                let res = await ProfileList()
                this.monitorData = res.profiles
            } catch (error) {
                console.log(error)
            } finally {
                this.loading = false
            }
        },
        async handleDelete(id){
            console.log('delete',id)
            try {
                await deleteMonitor(id)
                this.handleMonitorList()
            } catch (error) {
                console.log(error)
            }
        }
    }
}
</script>

<style>
.addBtn {
    background-color: var(--primary_color);
    border-radius: 6px;
    border: 1px solid var(--primary_color);
    padding: 7px 15px;
    color: var(--white_color);
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.addBtn:hover {
    background-color: var(--primary_color_Hover);
}

.modelSaveBtn {
    background-color: var(--primary_color);
    border-radius: 6px;
    border: 1px solid var(--primary_color);
    padding: 7px 50px;
    color: var(--white_color);
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.modelSaveBtn:hover {
    background-color: var(--primary_color_Hover);
}

.modelCancelBtn {
    border: none;
    background-color: var(--white_color);
    color: var(--dark_gray_Color);
    padding: 7px 30px;
    text-decoration: none;
}

.modelCancelBtn:hover {
    color: var(--primary_color_Hover);
}

.css {
    line-height: 1.2;
}</style>