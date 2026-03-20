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
                                <h3 class="text-secondary ms-3 mt-2">Sentinel</h3>
                            </div>
                            <div class="d-flex align-items-center">
                                <h6 class="mx-1 mt-2 text-muted">Home </h6>
                                <h6 class="me-4 mt-2"> - Sentinel</h6>
                                <button class="addBtn" data-bs-toggle="modal" data-bs-target="#staticBackdrop2"> <i
                                        class="fa-solid fa-plus fa-lg"></i> Add New Sentinel</button>
                                <div class="mx-3"><i class="fa-solid fa-ellipsis fa-2xl"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container-fluid tableDiv">
                <div class="row g-2">
                    <div id="col1" class="col-12">
                        <div class="card mx-md-2 mt-4 mb-5">
                            <div class="card-body">
                                <div class="text-center m-5" v-if="loading2">
                                    <VueSpinner size="100" color="#8cb63d" />
                                </div>
                                <div class="m-5" v-else-if="!loading2 && (!agents || agents.length === 0)">
                                    <div class="empty-state-container">
                                        <div class="empty-state-card text-center p-5 rounded-4 shadow-sm">
                                            <div class="empty-state-icon mb-4">
                                                <div class="icon-circle mx-auto">
                                                    <i class="fa-solid fa-location-dot"></i>
                                                </div>
                                            </div>
                                            <div class="empty-state-message mb-4">
                                                <h3 class="fw-semibold mb-2" style="color: #1f2937; font-size: 1.5rem;">
                                                    No Sentinels Found
                                                </h3>
                                                <p class="text-muted mb-0"
                                                    style="font-size: 1rem; max-width: 500px; margin: 0 auto;">
                                                    You haven't set up any Sentinels yet. Create your first Sentinel to
                                                    stay
                                                    updated.
                                                </p>
                                            </div>
                                            <button class="addBtn" data-bs-toggle="modal"
                                                data-bs-target="#staticBackdrop2"> <i
                                                    class="fa-solid fa-plus fa-lg"></i> Add New Sentinel</button>
                                        </div>
                                    </div>
                                </div>
                                <div class="table-responsive" v-else>
                                    <table class="table table-striped table-hover text-center">
                                        <thead>
                                            <tr>
                                                <th scope="col"><a href="#" class="tableHead" data-bs-toggle="dropdown"
                                                        aria-expanded="false">Name </a>
                                                </th>
                                                <th scope="col"><a href="#" class="tableHead" data-bs-toggle="dropdown"
                                                        aria-expanded="false">Ip
                                                        Address</a>
                                                </th>
                                                <th scope="col"><a href="#" class="tableHead" data-bs-toggle="dropdown"
                                                        aria-expanded="false">Organization</a>
                                                </th>
                                                <th scope="col"><a href="#" class="tableHead" data-bs-toggle="dropdown"
                                                        aria-expanded="false">
                                                        Machine</a>
                                                </th>
                                                <th scope="col"><a href="#" class="tableHead" data-bs-toggle="dropdown"
                                                        aria-expanded="false">Location</a>
                                                </th>
                                                <th scope="col"><a href="#" class="tableHead" data-bs-toggle="dropdown"
                                                        aria-expanded="false">Country</a>
                                                </th>
                                                <th scope="col"></th>
                                                <th scope="col"></th>
                                                <th scope="col"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="data in agents" :key="data">
                                                <td>
                                                    <p class="tableP">{{ data.name }}</p>
                                                </td>
                                                <td>
                                                    <p class="tableP">{{ data.ipaddress }}</p>
                                                </td>
                                                <td>
                                                    <p class="tableP">{{ data.Organization }}</p>
                                                </td>
                                                <td>
                                                    <p class="tableP">{{ data.machine }}</p>
                                                </td>
                                                <td>
                                                    <p class="tableP">{{ data.location }}</p>
                                                </td>
                                                <td>
                                                    <p class="tableP">{{ data.Country }}</p>
                                                </td>
                                                <td class="fs-5"><a href="#"
                                                        class="text-decoration-none text-dark tableP"
                                                        data-bs-toggle="modal" data-bs-target="#staticBackdrop"
                                                        @click="selectedSentinel = data"> <i
                                                            class="fa-solid fa-pen-to-square fa-lg"></i></a></td>
                                                <td class="fs-5"><a href="#"
                                                        class="text-decoration-none text-danger tableP"
                                                        data-bs-toggle="modal" data-bs-target="#deleteConfirmModal"
                                                        @click="deleteId = data.id">
                                                        <i class="fa-regular fa-trash-can fa-lg"></i></a></td>
                                                <td class="fs-5"><a href="#"
                                                        class="text-decoration-none text-dark tableP"
                                                        @click="handleGrids(data.id, data.name)">
                                                        <i class="fa-solid fa-chevron-right"></i></a></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div class="d-flex justify-content-between" v-if="loading2">

                                </div>
                                <div class="d-flex justify-content-between" v-else>
                                    <div class="d-flex align-items-center text-muted" style="font-size: 0.9rem;">
                                        Total Records: {{ agents.length }}
                                    </div>
                                    <div>
                                        <div class="pagination">
                                            <button class="prevBtn" :disabled="pages.previousPage === 0"
                                                @click="handleSentinelListing(pages.previousPage)"><i
                                                    class="fa-solid fa-angle-left"></i> Prev</button>
                                            <div class="pageNumber">-</div>
                                            <div class="pageNumber">-</div>
                                            <div class="pageNumber pageBtn">{{ pages.currentPage }}</div>
                                            <div class="pageNumber">-</div>
                                            <div class="pageNumber">-</div>
                                            <button class="nextBtn" :disabled="pages.nextPage === 0"
                                                @click="handleSentinelListing(pages.nextPage)">Next
                                                <i class="fa-solid fa-angle-right"></i></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="col2" class="col-2 d-none">
                        <div class="card mt-4 mb-5">
                            <div class="text-center m-5" v-if="loading">
                                <VueSpinner size="80" color="#8cb63d" />
                            </div>
                            <div class="text-center m-5" v-if="error">
                                <h3 class="text-danger">Sessions not found.</h3>
                            </div>
                            <div v-else>
                                <div class="card-body" v-for="data in refSessions" :key="data.id">
                                    <div class="d-flex justify-content-between align-items-center">
                                        <div>
                                            <p class="card-text ms-2">{{ data?.name }}</p>
                                            <span class="text-secondary ms-2" style="font-size: 13px;">{{
                                                data?.machine_name }}
                                            </span> <br>
                                            <span class="text-secondary ms-2" style="font-size: 13px;">Data</span>
                                        </div>
                                        <div>
                                            <RouterLink :to="`/sentinelReports/` + data.id"><i
                                                    class="fa-solid fa-chevron-right me-1 text-secondary"></i>
                                            </RouterLink>
                                        </div>
                                    </div>
                                    <hr class="">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <AddSentinel @sentinelAdded="handleSentinelListing(1)" />

    <EditSentinel :selectedSentinel="selectedSentinel" @sentinelUpdated="handleSentinelListing(1)" />

    <div class="modal fade" id="deleteConfirmModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header border-0">
                    <h5 class="modal-title text-dark fw-semibold">Delete Sentinel</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p class="text-muted mb-0">Are you sure you want to delete this sentinel? This action cannot be undone.</p>
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
import { agentList, agentRefSessions, deleteAgent } from '../../services/agent_services';
import { VueSpinner } from 'vue3-spinners';
import AddSentinel from './AddSentinel.vue';
import EditSentinel from './EditSentinel.vue';
import Toast from '../Toast';

export default {
    name: 'Sentinel',
    components: {
        Header,
        VueSpinner,
        AddSentinel,
        EditSentinel
    },
    data() {
        return {
            agents: [],
            pages: {
                currentPage: 1,
                previousPage: 0,
                nextPage: 0
            },
            selectedSentinel: null,
            deleteId: null,
            selectedGridId: 0,
            selectedGridName: null,
            refSessions: [],
            error: null,
            loading: false,
            loading2: false
        }
    },
    async mounted() {
        await this.handleSentinelListing()
    },
    methods: {
        async handleSentinelListing(page = 1) {
            try {
                this.loading2 = true
                const respData = await agentList(page)
                this.agents = respData.data.agents
                this.pages.currentPage = page
                this.pages.previousPage = page > 1 ? page - 1 : 0
                this.pages.nextPage = (respData.data.agents && respData.data.agents.length === 10) ? (respData.data.next || page + 1) : 0
            } catch (error) {
                console.log(error)
            } finally {
                this.loading2 = false
            }
        },
        async handleDelete(id) {
            try {
                await deleteAgent(id)
                await this.handleSentinelListing(1)
                Toast.fire({ icon: 'success', title: 'Sentinel deleted successfully' })
            } catch (error) {
                console.log(error)
                Toast.fire({ icon: 'error', title: 'Something went wrong' })
            }
        },
        async handleGrids(selectedId, selectedName) {
            let col1 = document.getElementById('col1')
            let col2 = document.getElementById('col2')
            if (selectedId == this.selectedGridId) {
                if (col2.classList.contains('d-none')) {
                    col1.classList.remove("col-12")
                    col1.classList.add("col-10")
                    col2.classList.remove("d-none")
                } else {
                    col1.classList.add("col-12")
                    col1.classList.remove("col-10")
                    col2.classList.add("d-none")
                }
            } else {
                col1.classList.remove("col-12")
                col1.classList.add("col-10")
                col2.classList.remove("d-none")
            }
            this.selectedGridId = selectedId
            this.selectedGridName = selectedName
            try {
                this.loading = true
                this.error = null
                let res = await agentRefSessions(selectedId)
                if (res.sessions.length === 0) {
                    this.error = "Sentinel not found."
                    this.refSessions = []
                } else {
                    this.refSessions = res.sessions
                }
            } catch (error) {
                console.log(error)
            } finally {
                this.loading = false
            }
        },
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

.icon-circle {
    animation: pulse 2s infinite;
}

.pageHeight {
    height: 100vh;
}

.addBtn {
    background-color: #8CB63D;
    border-radius: 6px;
    border: 1px solid #8CB63D;
    padding: 7px 15px;
    color: white;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.addBtn:hover {
    background-color: #72962f;
}

.addBtn2 {
    background-color: white;
    border-radius: 6px;
    border: 1px solid #8CB63D;
    padding: 10px 15px;
    color: #8CB63D;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.addBtn2:hover {
    background-color: #72962f;
    color: white;
}

.modelSaveBtn {
    background-color: #8CB63D;
    border-radius: 6px;
    border: 1px solid #8CB63D;
    padding: 7px 50px;
    color: white;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.modelSaveBtn:hover {
    background-color: #72962f;
}

.modelCancelBtn {
    border: none;
    background-color: white;
    color: darkgray;
    padding: 7px 30px;
    text-decoration: none;
}

.modelCancelBtn:hover {
    color: #8CB63D;
}

.createGroupBtn {
    background-color: white;
    border-radius: 6px;
    border: 1px solid #8CB63D;
    padding: 7px 40px;
    color: #8CB63D;
    cursor: pointer;
}

.createGroupBtn:hover {
    background-color: #8CB63D;
    color: white;
}

.bg {
    background-color: #f7f7f8;
    min-height: 100vh;
    top: 1;
}

.pagination {
    display: flex;
    justify-content: center;
    align-items: center;
}

.prevBtn,
.nextBtn {
    padding: 10px 15px;
    border-radius: 6px;
    border: 1px solid #8CB63D;
    cursor: pointer;
    transition: background-color 0.3s ease;
    background-color: white;
}

.prevBtn:hover,
.nextBtn:hover {
    background-color: #8CB63D;
    color: white;
}

.pageNumber {
    font-size: 15px;
    margin: 0 20px;
    color: darkgray;
}

.pageBtn {
    background-color: #8CB63D;
    padding: 5px 15px;
    border-radius: 7px;
    color: white;
}

.tableDiv {
    padding-bottom: 22px;
}

.pointer {
    cursor: pointer;
    color: darkgrey;
}

.modelText {
    font-size: 20px;
}

p {
    margin-bottom: 0 !important;
}

.tableP {
    font-size: 18px;
    margin-top: 15px !important;
    margin-bottom: 10px !important;
    display: inline-block;
}

.tableHead {
    text-decoration: none;
    color: #000;
    margin-top: 10px !important;
    margin-bottom: 10px !important;
    font-size: 16px;
    display: inline-block;
}

.ApplyBtn {
    background-color: #8CB63D;
    color: white;
    border-radius: 6px;
    border: 1px solid #8CB63D;
    padding: 5px 0;
}

.ApplyBtn:hover {
    background-color: #72962f;
}

.form-check-label {
    font-weight: normal;
    color: #333;
}

.form-check-input:checked {
    background-color: #8CB63D !important;
    border: 1px solid #8CB63D !important;
}
</style>
