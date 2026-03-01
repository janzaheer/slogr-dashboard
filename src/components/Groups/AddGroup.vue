<template>
    <div>
        <button class="addBtn" data-bs-toggle="modal" data-bs-target="#staticBackdrop"> <i
                class="fa-solid fa-plus fa-lg"></i> Create New Group</button>
        <!-- Modal  add-->
        <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
            aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-lg">
                <div class="modal-content">
                    <div class="modal-header d-flex justify-content-center align-items-center">
                        <div class="">
                            <h2 class="text-dark"> Add New Group</h2>
                        </div>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="">
                            <div class="mb-3">
                                <input type="text" class="form-control form-control-lg"
                                    :class="{ 'is-invalid': showNameError }" placeholder="Enter Group Name" name="name"
                                    v-model="form.name" @blur="handleBlur" @input="validateName">
                                <div class="invalid-feedback" v-if="showNameError">
                                    You need to put in the name to create the group
                                </div>
                            </div>
                            <div class="row g-2 mt-1">
                                <div class="col-6">
                                    <div class="card">
                                        <div class="card-header">
                                            List of Sessions
                                        </div>
                                        <div class="mt-1 mx-5">
                                            <input type="text" class="form-control" id="exampleFormControlInput1"
                                                v-model="searchQuery" placeholder="search by server name">
                                        </div>
                                        <perfect-scrollbar style="height: 240px;">
                                            <div class="text-center m-5" v-if="filteredGroupData.length === 0">
                                                <h3 class="text-danger"> No Sessions found.</h3>
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
                                                <h3 class="text-danger"> No Selected Sessions.</h3>
                                            </div>
                                            <div class="card-body" v-else>
                                                <div class="d-flex align-items-center" v-for="data in selectedSessions"
                                                    :key="data.id">
                                                    <a href="#" class="text-decoration-none" style="color: #b63d3d;"
                                                        @click="handleCancel(data.id)"><i
                                                            class="fa-solid fa-xmark"></i></a>
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
                            <button type="button" class="modelCancelBtn" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" data-bs-dismiss="modal" @click="handleAddGroup"
                                class="modelSaveBtn ms-2"
                                :disabled="this.selectedSessions.length === 0 || !this.form.name || this.form.name.trim() === ''">Create</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getSessionsNames } from '../../services/sessions_services'
import { VueSpinner } from 'vue3-spinners';
import { createGroup } from '../../services/group_services';
import { PerfectScrollbar } from 'vue3-perfect-scrollbar';
import Toast from '../Toast';
export default {
    name: 'AddGroup',
    components: {
        VueSpinner,
        PerfectScrollbar
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
            showNameError: false,
            nameTouched: false
        }
    },
    computed: {
        filteredGroupData() {
            if (!this.searchQuery) {
                return this.sessionsData;
            }
            return this.sessionsData.filter(group => group.s_name.toLowerCase().includes(this.searchQuery.toLowerCase()));
        },
    },
    props: {
        handleGroupsSessionsData: Function,
        handleGroupList: Function
    },
    mounted() {
        this.handleSessionsName()
    },
    methods: {
        handleBlur() {
            this.nameTouched = true;
            this.validateName();
        },

        validateName() {
            if (this.nameTouched) {
                this.showNameError = !this.form.name || this.form.name.trim() === '';
            }
        },

        async handleAddGroup() {
            this.nameTouched = true;
            if (!this.form.name || this.form.name.trim() === '') {
                this.showNameError = true;
                this.nameTouched = true;
                return; // Stop form submission
            }
            const payload = {
                name: this.form.name,
                sessions: this.form.sessions
            }
            try {
                await createGroup(payload)
                this.form.name = '';
                this.showNameError = false;
                this.nameTouched = false;
                this.selectedSessions.forEach(session => {
                    const id = session.id;
                    const checkboxElement = document.getElementById(`sessions-${id}`);
                    if (checkboxElement) {
                        checkboxElement.checked = false;
                    }
                });
                this.selectedSessions = [];
                this.handleGroupList()
                this.handleGroupsSessionsData()
                Toast.fire({ icon: "success", title: "add Group successfully" })

            } catch (error) {
                console.log(error)
            }

        },

        async handleSessionsCheck($event, id, s_name, c_name) {
            if ($event.target.checked) {
                this.form.sessions.push(id);
                this.selectedSessions.push({ id, s_name, c_name });
            } else {
                const index = this.form.sessions.indexOf(id);
                if (index !== -1) {
                    this.form.sessions.splice(index, 1);
                }
                const index2 = this.selectedSessions.findIndex(item => item.id === id);
                if (index2 !== -1) {
                    this.selectedSessions.splice(index2, 1);
                }
            }
        },

        handleCancel(id) {
            const index2 = this.selectedSessions.findIndex(item => item.id === id);
            if (index2 !== -1) {
                this.selectedSessions.splice(index2, 1);
                document.getElementById(`sessions-${id}`).checked = false;
            }
            const index = this.form.sessions.indexOf(id);
            if (index !== -1) {
                this.form.sessions.splice(index, 1);
            }
        },
        
        async handleSessionsName() {
            this.showNameError = false;
            this.nameTouched = false;
            try {
                let res = await getSessionsNames()
                this.sessionsData = res;
            } catch (error) {
                console.log(error)
            }

        }
    }
}
</script>

<style>
.sessionFormText {
    font-size: 12px;
    margin-left: 10px;
}
</style>