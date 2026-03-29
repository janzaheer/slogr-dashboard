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
                        <div class="px-2 pt-3 pb-2">
                            <div class="search-wrapper">
                                <i class="fa-solid fa-magnifying-glass search-icon"></i>
                                <input
                                    type="text"
                                    class="form-control search-input ps-5"
                                    placeholder="Search by server..."
                                    v-model="searchQuery"
                                />
                                <button v-if="searchQuery" class="search-clear-btn" @click="searchQuery = ''">
                                    <i class="fa-solid fa-xmark"></i>
                                </button>
                            </div>
                        </div>

                        <div class="text-center m-5" v-if="loading">
                            <VueSpinner size="80" color="#8cb63d" />
                        </div>
                        <div class="m-5" v-else-if="!loading && (!sessionsData || sessionsData.length === 0)">
                            <div class="empty-state-container">
                                <div class="empty-state-card text-center p-5 rounded-4 shadow-sm">
                                    <div class="empty-state-icon mb-4">
                                        <div class="icon-circle mx-auto">
                                            <img src="../../assets/group-24551.svg" class="icon-img" />
                                        </div>
                                    </div>
                                    <div class="empty-state-message mb-4">
                                        <template v-if="searchQuery">
                                            <h3 class="fw-semibold mb-2" style="color: #1f2937; font-size: 1.5rem;">
                                                No Results Found
                                            </h3>
                                            <p class="text-muted mb-0" style="font-size: 1rem; max-width: 500px; margin: 0 auto;">
                                                No sessions matched "<strong>{{ searchQuery }}</strong>". Try a different search.
                                            </p>
                                        </template>
                                        <template v-else>
                                            <h3 class="fw-semibold mb-2" style="color: #1f2937; font-size: 1.5rem;">
                                                No Sessions Found
                                            </h3>
                                            <p class="text-muted mb-0" style="font-size: 1rem; max-width: 500px; margin: 0 auto;">
                                                You haven't set up any Sessions yet. Create your first Session to stay updated.
                                            </p>
                                        </template>
                                    </div>
                                    <AddSessions v-if="!searchQuery" :getSessions="getSessions" />
                                </div>
                            </div>
                        </div>
                        <div class="table-responsive" v-else>
                            <table class="table table-striped table-hover text-center">
                                <thead>
                                    <tr>
                                        <th scope="col"><a href="#" class="tableHead">Server Name</a></th>
                                        <th scope="col"><a href="#" class="tableHead">Client Name</a></th>
                                        <th scope="col"><a href="#" class="tableHead">Number Packets</a></th>
                                        <th scope="col"><a href="#" class="tableHead">Profile Name</a></th>
                                        <th scope="col"><a href="#" class="tableHead">Packet Interval</a></th>
                                        <th scope="col"><a href="#" class="tableHead">Wait Time</a></th>
                                        <th scope="col"><a href="#" class="tableHead">Packet Length</a></th>
                                        <th scope="col"><a href="#" class="tableHead">DSCP</a></th>
                                        <th scope="col"></th>
                                        <th scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="data in sessionsData" :key="data.id">
                                        <td><p class="tableP"><span class="dot me-2" :style="{ backgroundColor: data.server_status === 'active' ? '#22c55e' : '#ef4444' }"></span>{{ data?.s_name }}</p></td>
                                        <td><p class="tableP"><span class="dot me-2" :style="{ backgroundColor: data.client_status === 'active' ? '#22c55e' : '#ef4444' }"></span>{{ data?.c_name }}</p></td>
                                        <td><p class="tableP">{{ data?.n_packets }}</p></td>
                                        <td><p class="tableP">{{ data?.p_name }}</p></td>
                                        <td><p class="tableP">{{ data?.p_interval }}</p></td>
                                        <td><p class="tableP">{{ data.w_time }}</p></td>
                                        <td><p class="tableP">{{ data.p_size }}</p></td>
                                        <td><p class="tableP">{{ data.dscp }}</p></td>
                                        <td class="fs-5">
                                            <!-- <RouterLink to="/sessionDetails" class="text-decoration-none text-dark tableP"> -->
                                                <i class="fa-solid fa-circle-play"></i>
                                            <!-- </RouterLink> -->
                                        </td>
                                        <td class="text-center">
                                            <div class="dropdown">
                                                <button class="btn btn-sm btn-light border-0 rounded-circle"
                                                    data-bs-toggle="dropdown" aria-expanded="false"
                                                    style="width:32px; height:32px;">
                                                    <i class="fa-solid fa-ellipsis-vertical"></i>
                                                </button>
                                                <ul class="dropdown-menu dropdown-menu-end shadow border-0 rounded-3 py-1">
                                                    <li>
                                                        <a href="#" class="dropdown-item rounded-2 py-2 px-3"
                                                            data-bs-toggle="modal"
                                                            data-bs-target="#staticBackdrop1"
                                                            @click="selectedSession = data">
                                                            <i class="fa-regular fa-pen-to-square me-2 text-primary"></i>Edit
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <RouterLink :to="`/sessionReports/` + data.id"
                                                            class="dropdown-item rounded-2 py-2 px-3">
                                                            <i class="fa-regular fa-eye me-2 text-success"></i>Details
                                                        </RouterLink>
                                                    </li>
                                                    <li><hr class="dropdown-divider my-1 mx-2"></li>
                                                    <li>
                                                        <a class="dropdown-item rounded-2 py-2 px-3 text-danger" href="#"
                                                            data-bs-toggle="modal" data-bs-target="#deleteConfirmModal"
                                                            @click="deleteId = data.id">
                                                            <i class="fa-regular fa-trash-can me-2"></i>Delete
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div v-if="loading"></div>
                        <div class="d-flex justify-content-between" v-else>
                            <div class="d-flex align-items-center text-muted" style="font-size: 0.9rem;">
                                Total Records: {{ sessionsData.length }}
                            </div>
                            <div>
                                <div class="pagination">
                                    <button class="prevBtn" :disabled="pages.previousPage === 0"
                                        v-on:click="getSessions(pages.previousPage)">
                                        <i class="fa-solid fa-angle-left"></i> Prev
                                    </button>
                                    <div class="pageNumber">-</div>
                                    <div class="pageNumber">-</div>
                                    <div class="pageNumber pageBtn">{{ pages.currentPage }}</div>
                                    <div class="pageNumber">-</div>
                                    <div class="pageNumber">-</div>
                                    <button class="nextBtn" :disabled="pages.nextPage === 0"
                                        v-on:click="getSessions(pages.nextPage)">
                                        Next <i class="fa-solid fa-angle-right"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <EditSessions :sessionData="selectedSession" :getSessions="getSessions" />

    <div class="modal fade" id="deleteConfirmModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header border-0">
                    <h5 class="modal-title text-dark fw-semibold">Delete Session</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p class="text-muted mb-0">Are you sure you want to delete this session? This action cannot be undone.</p>
                </div>
                <div class="modal-footer border-0">
                    <button type="button" class="modelCancelBtn" data-bs-dismiss="modal">Cancel</button>
                    <button type="button" class="modelSaveBtn ms-2" data-bs-dismiss="modal"
                        @click="handleDelete(deleteId)">Delete</button>
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
import EditSessions from './EditSessions.vue';
import Toast from '../Toast';

export default {
    name: 'Sessions',
    components: {
        Header,
        VueSpinner,
        AddSessions,
        EditSessions
    },
    data() {
        return {
            sessionsData: [],
            loading: false,
            searchQuery: '',
            selectedSession: null,
            deleteId: null,
            pages: {
                currentPage: 1,
                previousPage: 0,
                nextPage: 0,
            },
        }
    },
    watch: {
        searchQuery(val) {
            clearTimeout(this._searchTimer)
            if (!val) {
                this.getSessions(1)
            } else {
                this._searchTimer = setTimeout(() => {
                    this.getSessions(1)
                }, 400)
            }
        }
    },
    mounted() {
        this.getSessions()
    },
    methods: {
        async getSessions(page = 1) {
            try {
                this.loading = true
                let res = await sessionsList(page, this.searchQuery)
                this.sessionsData = res.data.sessions
                this.pages.currentPage = page
                this.pages.previousPage = res?.data?.prev || 0
                this.pages.nextPage = (res.data.sessions && res.data.sessions.length === 10) ? (res?.data?.next || page + 1) : 0
            } catch (error) {
                console.log(error)
            } finally {
                this.loading = false
            }
        },
        async handleDelete(id) {
            const payload = { delete: id }
            try {
                await deleteSessions(payload)
                this.getSessions()
                Toast.fire({ icon: "error", title: 'session delete' })
            } catch (error) {
                Toast.fire({ icon: "error", title: 'delete error' })
                console.log(error)
            }
        },
    }
}
</script>

<style>
.table-responsive {
    overflow: visible !important;
}

.table {
    overflow: visible !important;
}

.dropdown-menu li {
    list-style: none !important;
}

.search-wrapper {
    position: relative;
    max-width: 320px;
}

.search-icon {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: #adb5bd;
    font-size: 0.85rem;
    pointer-events: none;
}

.search-input {
    padding-left: 36px;
    padding-right: 34px;
    border-radius: 8px;
    border: 1px solid #e0e0e0;
    background-color: #f9f9f9;
    font-size: 0.875rem;
}

.search-input:focus {
    background-color: var(--white_color);
    border-color: var(--primary_color);
    box-shadow: 0 0 0 3px rgba(140, 182, 61, 0.15);
}

.search-clear-btn {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    color: #adb5bd;
    cursor: pointer;
    padding: 0 4px;
    font-size: 0.85rem;
    line-height: 1;
}

.search-clear-btn:hover {
    color: #495057;
}

.dot {
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
}

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
