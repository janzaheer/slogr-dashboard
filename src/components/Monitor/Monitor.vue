<template>
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
                                <h3 class="text-secondary ms-3 mt-2"> Profile</h3>
                            </div>
                            <div class="d-flex align-items-center">
                                <h6 class="mx-1 mt-2 text-muted">Home </h6>
                                <h6 class="me-4 mt-2"> - Profile</h6>
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
                        <div class="m-5" v-if="loading">
                            <Skeleton />
                        </div>
                        <div class="table-responsive" v-else>
                            <table class="table table-striped table-hover text-center custom-table">
                                <thead>
                                    <tr>
                                        <th><span class="tableHead">Profile Name</span></th>
                                        <th><span class="tableHead">Date</span></th>

                                        <th>
                                            <span class="tableHead head-green" data-bs-toggle="tooltip" title="Jitter">
                                                JITTER
                                            </span>
                                            <br>
                                            <div class="d-flex justify-content-center">
                                                <span class="badge text-bg-success me-1" data-bs-toggle="tooltip"
                                                    title="Green">G</span>
                                                <span class="badge text-bg-danger" data-bs-toggle="tooltip"
                                                    title="Red">R</span>
                                            </div>
                                        </th>

                                        <th>
                                            <span class="tableHead">Downlink</span><br>
                                            <div class="d-flex justify-content-center">
                                                <span class="badge text-bg-success me-1" data-bs-toggle="tooltip"
                                                    title="Green">G</span>
                                                <span class="badge text-bg-danger" data-bs-toggle="tooltip"
                                                    title="Red">R</span>
                                            </div>
                                        </th>

                                        <th>
                                            <span class="tableHead">Downlink Bandwidth</span>
                                            <div class="d-flex justify-content-center">
                                                <span class="badge text-bg-success me-1" data-bs-toggle="tooltip"
                                                    title="Green">G</span>
                                                <span class="badge text-bg-danger" data-bs-toggle="tooltip"
                                                    title="Red">R</span>
                                            </div>
                                        </th>

                                        <th>
                                            <span class="tableHead">Loss</span><br>
                                            <div class="d-flex justify-content-center">
                                                <span class="badge text-bg-success me-1" data-bs-toggle="tooltip"
                                                    title="Green">G</span>
                                                <span class="badge text-bg-danger" data-bs-toggle="tooltip"
                                                    title="Red">R</span>
                                            </div>
                                        </th>

                                        <th>
                                            <span class="tableHead">RTT</span><br>
                                            <div class="d-flex justify-content-center">
                                                <span class="badge text-bg-success me-1" data-bs-toggle="tooltip"
                                                    title="Green">G</span>
                                                <span class="badge text-bg-danger" data-bs-toggle="tooltip"
                                                    title="Red">R</span>
                                            </div>
                                        </th>

                                        <th>
                                            <span class="tableHead">Uplink</span><br>
                                            <div class="d-flex justify-content-center">
                                                <span class="badge text-bg-success me-1" data-bs-toggle="tooltip"
                                                    title="Green">G</span>
                                                <span class="badge text-bg-danger" data-bs-toggle="tooltip"
                                                    title="Red">R</span>
                                            </div>
                                        </th>

                                        <th>
                                            <span class="tableHead">Uplink Bandwidth</span><br>
                                            <div class="d-flex justify-content-center">
                                                <span class="badge text-bg-success me-1" data-bs-toggle="tooltip"
                                                    title="Green">G</span>
                                                <span class="badge text-bg-danger" data-bs-toggle="tooltip"
                                                    title="Red">R</span>
                                            </div>
                                        </th>

                                        <th><span class="tableHead">Number Packets</span></th>
                                        <th><span class="tableHead">Packet Interval</span></th>
                                        <th><span class="tableHead">Packet Size</span></th>

                                        <th>
                                            <span class="tableHead">Delay</span><br>
                                            <div class="d-flex justify-content-center">
                                                <span class="badge text-bg-success me-1" data-bs-toggle="tooltip"
                                                    title="Green">G</span>
                                                <span class="badge text-bg-danger" data-bs-toggle="tooltip"
                                                    title="Red">R</span>
                                            </div>
                                        </th>

                                        <th><span class="tableHead">Wait Time</span></th>
                                        <th><span class="tableHead">Dscp</span></th>
                                        <th><span class="tableHead">Actions</span></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="data in monitorData" :key="data.id">

                                        <td>{{ data.name }}</td>
                                        <td>{{ moment(data.created_at).format('l') }}</td>

                                        <td>
                                            <span class="value-green" title="Good Jitter">{{ data.jitter_g }}</span>
                                            <span class="value-red" title="Bad Jitter">{{ data.jitter_r }}</span>
                                        </td>

                                        <td>
                                            <span class="value-green">{{ data.downlink_g }}</span>
                                            <span class="value-red">{{ data.downlink_r }}</span>
                                        </td>

                                        <td>
                                            <span class="value-green">{{ data.downlink_bw_g }}</span>
                                            <span class="value-red">{{ data.downlink_bw_r }}</span>
                                        </td>

                                        <td>
                                            <span class="value-green">{{ data.loss_g }}</span>
                                            <span class="value-red">{{ data.loss_r }}</span>
                                        </td>

                                        <td>
                                            <span class="value-green">{{ data.rtt_g }}</span>
                                            <span class="value-red">{{ data.rtt_r }}</span>
                                        </td>

                                        <td>
                                            <span class="value-green">{{ data.uplink_g }}</span>
                                            <span class="value-red">{{ data.uplink_r }}</span>
                                        </td>

                                        <td>
                                            <span class="value-green">{{ data.uplink_bw_g }}</span>
                                            <span class="value-red">{{ data.uplink_bw_r }}</span>
                                        </td>

                                        <td>{{ data.n_packets }}</td>
                                        <td>{{ data.p_interval }}</td>
                                        <td>{{ data.p_size }}</td>

                                        <td>
                                            <span class="value-green">{{ data.delay_g }}</span>
                                            <span class="value-red">{{ data.delay_r }}</span>
                                        </td>

                                        <td>{{ data.w_time }}</td>
                                        <td>{{ data.dscp }}</td>
                                        <td class="fs-5 dropstart">
                                            <a href="#" class="text-decoration-none text-dark tableP"
                                                data-bs-toggle="dropdown" aria-expanded="false">
                                                <i class="fa-solid fa-ellipsis"></i>
                                            </a>

                                            <ul class="dropdown-menu">
                                                <li class="dropdown-item">
                                                    <EditModel :monitor="data" :modalId="'editModal' + data.id"
                                                        :handleMonitorList="handleMonitorList" />
                                                </li>
                                                <li>
                                                    <a class="dropdown-item" href="#">
                                                        👁 Details
                                                    </a>
                                                </li>
                                                <li>
                                                    <a class="dropdown-item text-danger" href="#"
                                                        @click="handleDelete(data.id, data.name)">
                                                        🗑 Delete
                                                    </a>
                                                </li>
                                            </ul>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div class="d-flex justify-content-between">
                                <div>
                                    <button class="addBtn2"><i class="fa-solid fa-chevron-down fa-lg"></i> Go to
                                        Page</button>
                                </div>
                                <div>
                                    <div class="pagination">
                                        <button class="prevBtn"><i class="fa-solid fa-angle-left"></i> Prev</button>
                                        <div class="pageNumber">-</div>
                                        <div class="pageNumber">-</div>
                                        <div class="pageNumber pageBtn">1</div>
                                        <div class="pageNumber">-</div>
                                        <div class="pageNumber">-</div>
                                        <button class="nextBtn">Next <i class="fa-solid fa-angle-right"></i></button>
                                    </div>
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
import { ProfileList, deleteMonitor } from '../../services/monitor_profile_Services';
import { VueSpinner } from 'vue3-spinners';
import moment from 'moment';
import Swal from "sweetalert2"
import EditModel from './EditModel.vue';
import Skeleton from '../Skeleton.vue';

export default {
    name: 'Monitor',
    components: {
        Header,
        VueSpinner,
        AddMonitor,
        Swal,
        EditModel,
        Skeleton
    },
    created: function () {
        this.moment = moment;
    },
    computed: {
        getToken() {
            return
        }
    },
    data() {
        return {
            monitorData: [],
            loading: false,
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

        async handleDelete(id, name) {

            Swal.fire({
                title: `${name}`,
                text: "Are you sure?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            }).then(async (result) => {

                if (result.isConfirmed) {

                    try {
                        await deleteMonitor(id)
                        Swal.fire({
                            title: "Deleted!",
                            text: `${name} deleted successfully.`,
                            icon: "success",
                        })
                        this.handleMonitorList()
                    } catch (error) {
                        console.log(error)
                        Swal.fire("Error!", "Delete failed.", "error")
                    }

                }
            })
        },
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
}

.tableP {
    font-size: 16px;
    display: inline-block;
}

/* Green / Red colors */
.value-green {
    color: #16a34a;
    font-weight: 600;
}

.value-red {
    color: #dc2626;
    font-weight: 600;
}

.head-green {
    color: #16a34a;
    font-weight: bold;
}

.head-red {
    color: #dc2626;
    font-weight: bold;
}

/* Date Badge */
.date-badge {
    background: #f1f3f5;
    padding: 4px 10px;
    border-radius: 6px;
    font-size: 13px;
    font-weight: 600;
}

/* Table UI */
/* Table Look */
.table {
    border-radius: 12px;
    overflow: hidden;
    background: white;
    font-size: 14px;
}

.table thead {
    background: #f6f8fa;
}

.table th {
    font-weight: 600;
    font-size: 13px;
    color: #555;
    text-transform: uppercase;
}

/* Row Hover */
.table tbody tr:hover {
    background: #f9fafb !important;
    transform: scale(1.001);
    transition: 0.15s;
}

/* Green Red Values */
.value-green {
    background: #e6f7ec;
    color: #1e9b4b;
    padding: 4px 8px;
    border-radius: 6px;
    font-weight: 600;
    font-size: 12px;
}

.value-red {
    background: #fdeaea;
    color: #e63946;
    padding: 4px 8px;
    border-radius: 6px;
    font-weight: 600;
    font-size: 12px;
    margin-left: 4px;
}

/* Table Head Link */
.tableHead {
    text-decoration: none;
    color: #444;
    font-size: 13px;
}

/* Align text */
.table td,
.table th {
    vertical-align: middle;
    text-align: center;
}
</style>