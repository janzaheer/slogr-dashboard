<template>
    <div>
        <button class="addBtn" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
            <i class="fa-solid fa-plus fa-lg"></i> Create New Group
        </button>

        <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
            aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-lg">
                <div class="modal-content">
                    <div class="modal-header d-flex justify-content-center align-items-center">
                        <div class="">
                            <h2 class="text-dark">Add New Group</h2>
                        </div>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
                            @click="resetForm"></button>
                    </div>
                    <div class="modal-body">
                        <div class="">
                            <div class="mb-3">
                                <label class="form-label ms-1">Group Name <span class="text-danger">*</span></label>
                                <input type="text" class="form-control form-control-lg"
                                    :class="{ 'is-invalid': nameTouched && !form.name.trim() }"
                                    placeholder="Enter Group Name" name="name" v-model="form.name"
                                    @blur="nameTouched = true" />
                                <div class="invalid-feedback" v-if="nameTouched && !form.name.trim()">
                                    Group Name is required.
                                </div>
                            </div>
                            <div class="row g-2 mt-1">
                                <div class="col-6">
                                    <div class="card">
                                        <div class="card-header">
                                            List of Sessions
                                        </div>
                                        <div class="mt-1 mx-5">
                                            <input type="text" class="form-control" v-model="searchQuery"
                                                placeholder="Search by server name">
                                        </div>
                                        <perfect-scrollbar style="height: 240px;">
                                            <div class="text-center m-5" v-if="filteredGroupData.length === 0">
                                                <h3 class="text-danger">No Sessions found.</h3>
                                            </div>
                                            <div class="card-body">
                                                <div class="d-flex align-items-center" v-for="data in filteredGroupData"
                                                    :key="data.id">
                                                    <div class="form-check">
                                                        <input class="form-check-input" type="checkbox"
                                                            :id="'sessions-' + data.id"
                                                            v-on:click="handleSessionsCheck($event, data.id, data.s_name, data.c_name)">
                                                    </div>
                                                    <p class="sessionFormText me-1">{{ data?.s_name }}</p> |
                                                    <p class="sessionFormText">{{ data?.c_name }}</p>
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
                                            <div class="text-center m-5" v-if="selectedSessions.length === 0">
                                                <h3 class="text-danger">No Selected Sessions.</h3>
                                            </div>
                                            <div class="card-body" v-else>
                                                <div class="d-flex align-items-center" v-for="data in selectedSessions"
                                                    :key="data.id">
                                                    <a href="#" class="text-decoration-none" style="color: #b63d3d;"
                                                        @click="handleCancel(data.id)">
                                                        <i class="fa-solid fa-xmark"></i>
                                                    </a>
                                                    <p class="sessionFormText me-1">{{ data?.s_name }}</p> |
                                                    <p class="sessionFormText">{{ data?.c_name }}</p>
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
                            <button type="button" class="modelCancelBtn" data-bs-dismiss="modal" id="groupCancelBtn"
                                @click="resetForm">Cancel</button>
                            <button type="button" class="modelSaveBtn ms-2"
                                :disabled="!isFormValid"
                                @click="handleAddGroup">Create</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getSessionsNames } from '../../services/sessions_services';
import { createGroup } from '../../services/group_services';
import { PerfectScrollbar } from 'vue3-perfect-scrollbar';
import Toast from '../Toast';

export default {
    name: 'AddGroup',
    components: {
        PerfectScrollbar
    },
    props: {
        handleGroupsSessionsData: Function,
        handleGroupList: Function
    },
    computed: {
        isFormValid() {
            return !!this.form.name.trim() && this.selectedSessions.length > 0
        },
        filteredGroupData() {
            if (!this.searchQuery) return this.sessionsData
            return this.sessionsData.filter(g => g.s_name.toLowerCase().includes(this.searchQuery.toLowerCase()))
        },
    },
    data() {
        return {
            form: {
                name: '',
                sessions: []
            },
            sessionsData: [],
            selectedSessions: [],
            searchQuery: '',
            nameTouched: false,
        }
    },
    mounted() {
        this.handleSessionsName()
    },
    methods: {
        resetForm() {
            this.selectedSessions.forEach(session => {
                const el = document.getElementById(`sessions-${session.id}`)
                if (el) el.checked = false
            })
            this.form = { name: '', sessions: [] }
            this.selectedSessions = []
            this.searchQuery = ''
            this.nameTouched = false
        },
        async handleAddGroup() {
            const payload = {
                name: this.form.name,
                sessions: this.form.sessions
            }
            try {
                await createGroup(payload)
                Toast.fire({ icon: 'success', title: 'Group added successfully' })
                this.handleGroupList()
                this.handleGroupsSessionsData()
                document.getElementById('groupCancelBtn').click()
                this.resetForm()
            } catch (error) {
                console.log(error)
                Toast.fire({ icon: 'error', title: 'Something went wrong' })
            }
        },
        async handleSessionsCheck($event, id, s_name, c_name) {
            if ($event.target.checked) {
                this.form.sessions.push(id)
                this.selectedSessions.push({ id, s_name, c_name })
            } else {
                const index = this.form.sessions.indexOf(id)
                if (index !== -1) this.form.sessions.splice(index, 1)
                const index2 = this.selectedSessions.findIndex(item => item.id === id)
                if (index2 !== -1) this.selectedSessions.splice(index2, 1)
            }
        },
        handleCancel(id) {
            const index2 = this.selectedSessions.findIndex(item => item.id === id)
            if (index2 !== -1) {
                this.selectedSessions.splice(index2, 1)
                document.getElementById(`sessions-${id}`).checked = false
            }
            const index = this.form.sessions.indexOf(id)
            if (index !== -1) this.form.sessions.splice(index, 1)
        },
        async handleSessionsName() {
            try {
                let res = await getSessionsNames()
                this.sessionsData = res
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
