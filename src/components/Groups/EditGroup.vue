<template>
    <div class="modal fade" id="editGroupModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="editGroupModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content">
                <div class="modal-header d-flex justify-content-center align-items-center">
                    <div class="">
                        <h2 class="text-dark">Edit Group</h2>
                    </div>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
                        @click="resetForm"></button>
                </div>
                <div class="modal-body">
                    <div class="mb-3">
                        <label class="form-label ms-1">Group Name <span class="text-danger">*</span></label>
                        <input type="text" class="form-control form-control-lg"
                            :class="{ 'is-invalid': nameTouched && !form.name.trim() }"
                            placeholder="Enter Group Name" name="name" v-model="form.name"
                            @blur="nameTouched = true" />
                        <div class="invalid-feedback" v-if="nameTouched && !form.name.trim()">Group Name is required.</div>
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
                                    <div class="text-center m-5" v-if="filteredSessions.length === 0">
                                        <h3 class="text-danger">No Sessions found.</h3>
                                    </div>
                                    <div class="card-body">
                                        <div class="d-flex align-items-center" v-for="data in filteredSessions"
                                            :key="data.id">
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox"
                                                    :id="'edit-sessions-' + data.id"
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
                <div class="modal-footer">
                    <div class="d-flex justify-content-end">
                        <button type="button" class="modelCancelBtn" data-bs-dismiss="modal" id="editGroupCancelBtn"
                            @click="resetForm">Cancel</button>
                        <button type="button" class="modelSaveBtn ms-2"
                            :disabled="!form.name.trim()"
                            @click="handleEditGroup">Save</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getSessionsNames, } from '../../services/sessions_services';
import { GroupsSessionsData, updateGroup } from '../../services/group_services';
import { PerfectScrollbar } from 'vue3-perfect-scrollbar';
import Toast from '../Toast';

export default {
    name: 'EditGroup',
    components: {
        PerfectScrollbar
    },
    props: {
        selectedGroup: { type: Object, default: null },
        handleGroupList: Function,
        handleGroupsSessionsData: Function
    },
    data() {
        return {
            form: {
                id: null,
                name: '',
                selectedData: []
            },
            sessionsData: [],
            selectedSessions: [],
            searchQuery: '',
            nameTouched: false
        }
    },
    computed: {
        filteredSessions() {
            if (!this.searchQuery) return this.sessionsData
            return this.sessionsData.filter(s => s.s_name.toLowerCase().includes(this.searchQuery.toLowerCase()))
        }
    },
    watch: {
        selectedGroup(data) {
            if (!data) return
            this.resetForm()
            this.form.id = data.id
            this.form.name = data.name
            this.loadGroupSessions(data.id)
        }
    },
    mounted() {
        this.handleSessionsName()
    },
    methods: {
        resetForm() {
            this.selectedSessions.forEach(session => {
                const el = document.getElementById(`edit-sessions-${session.id}`)
                if (el) el.checked = false
            })
            this.form = { id: null, name: '', selectedData: [] }
            this.selectedSessions = []
            this.searchQuery = ''
            this.nameTouched = false
        },
        async loadGroupSessions(id) {
            try {
                const resp = await GroupsSessionsData(id)
                const uniqueSessionIds = new Set()
                resp.group.sessions.forEach(data => {
                    const sessionId = data.id
                    if (!uniqueSessionIds.has(sessionId)) {
                        uniqueSessionIds.add(sessionId)
                        this.selectedSessions.push({ id: sessionId, s_name: data.s_name, c_name: data.c_name })
                        const checkbox = document.getElementById('edit-sessions-' + sessionId)
                        if (checkbox) checkbox.checked = true
                    }
                })
                this.form.selectedData = Array.from(uniqueSessionIds)
            } catch (error) {
                console.log(error)
            }
        },
        async handleEditGroup() {
            const payload = {
                id: this.form.id,
                name: this.form.name,
                sessions: this.form.selectedData
            }
            try {
                await updateGroup(payload)
                this.handleGroupList()
                this.handleGroupsSessionsData()
                Toast.fire({ icon: 'success', title: 'Group updated successfully' })
                document.getElementById('editGroupCancelBtn').click()
                this.resetForm()
            } catch (error) {
                console.log(error)
                Toast.fire({ icon: 'error', title: 'Something went wrong' })
            }
        },
        async handleSessionsName() {
            try {
                let res = await getSessionsNames()
                this.sessionsData = res
            } catch (error) {
                console.log(error)
            }
        },
        handleSessionsCheck($event, id, s_name, c_name) {
            if ($event.target.checked) {
                this.form.selectedData.push(id)
                this.selectedSessions.push({ id, s_name, c_name })
            } else {
                const index = this.form.selectedData.indexOf(id)
                if (index !== -1) this.form.selectedData.splice(index, 1)
                const index2 = this.selectedSessions.findIndex(item => item.id === id)
                if (index2 !== -1) this.selectedSessions.splice(index2, 1)
            }
        },
        handleCancel(id) {
            const index = this.form.selectedData.indexOf(id)
            if (index !== -1) this.form.selectedData.splice(index, 1)
            const index2 = this.selectedSessions.findIndex(item => item.id === id)
            if (index2 !== -1) this.selectedSessions.splice(index2, 1)
            const el = document.getElementById(`edit-sessions-${id}`)
            if (el) el.checked = false
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
