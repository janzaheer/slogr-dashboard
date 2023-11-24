<template>
    <div class="card" style="height: 100vh;">
        <div class="card-body">
            <div class="mb-1">
                <input type="text" class="form-control" v-model="searchQuery" placeholder="search">
            </div>
            <perfect-scrollbar style="height: 820px;">
                <div class="d-flex flex-column flex-shrink-0 p-2">
                    <ul class="nav nav-pills flex-column mb-auto" v-for="filteredGroup in filteredGroupData"
                        :key="filteredGroup.id">
                        <li class="nav-item d-flex justify-content-between align-items-center">
                            <button :class="activeGroup == filteredGroup.id ? 'activeBtn' : 'groupBtn'"
                                v-on:click="handleGroup(filteredGroup.id)" aria-current="page">{{ filteredGroup?.name
                                }}</button>
                            <div class="dropstart">
                                <a href="#" class="text-decoration-none text-dark tableP" data-bs-toggle="dropdown"
                                    aria-expanded="false">
                                    <i class="fa-solid fa-ellipsis"></i></a>
                                <ul class="dropdown-menu">
                                    <li><a class="dropdown-item" href="#"
                                            @click="handleUpdateModel(filteredGroup.id, filteredGroup?.name)"
                                            data-bs-toggle="modal" data-bs-target="#staticBackdrop2"><i
                                                class="fa-regular fa-pen-to-square"></i>
                                            Edit</a>
                                    </li>
                                    <li><a class="dropdown-item" href="#" v-on:click="handleDelete(filteredGroup.id)"><i
                                                class="fa-regular fa-trash-can"></i> Delete</a></li>
                                </ul>
                            </div>
                        </li>
                        <hr>
                    </ul>
                </div>
            </perfect-scrollbar>
        </div>
    </div>
    <!-- Modal  edit-->
    <div class="modal fade" id="staticBackdrop2" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="staticBackdrop2Label" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content">
                <div class="modal-header d-flex justify-content-center align-items-center">
                    <div class="">
                        <h2 class="text-dark"> Edit Group</h2>
                    </div>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="">
                        <div class="mb-3">
                            <input type="text" class="form-control form-control-lg" placeholder="Enter Group Name"
                                name="name" v-model="this.form.name">
                        </div>
                        <div class="row g-2 mt-1">
                            <div class="col-6">
                                <div class="card">
                                    <div class="card-header">
                                        List of Sessions
                                    </div>
                                    <div class="mt-1 mx-5">
                                        <input type="text" class="form-control"
                                            placeholder="search by server name">
                                    </div>
                                    <!-- <perfect-scrollbar style="height: 240px;">
                                        <div class="text-center m-5" v-if="searchGroupData.length === 0">
                                            <h3 class="text-danger"> No Sessions found.</h3>
                                        </div>
                                        <div class="card-body">
                                            <div class="d-flex align-items-center" v-for="data in searchGroupData"
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
                                    </perfect-scrollbar> -->
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="card">
                                    <div class="card-header">
                                        Selected Sessions
                                    </div>
                                    <!-- <perfect-scrollbar style="height: 280px;">
                                            <div class="text-center m-5" v-if="selectedSessions.length === 0">
                                                <h3 class="text-danger"> No Selected Sessions.</h3>
                                            </div>
                                            <div class="card-body" v-else>
                                                <div class="d-flex align-items-center" v-for="data in selectedSessions"
                                                    :key="data.id">
                                                    <a href="#" class="text-decoration-none" style="color: #b63d3d;"
                                                        @click="handleCancel(data.id)"><i class="fa-solid fa-xmark"></i></a>
                                                    <p class="sessionFormText me-1">{{ data?.s_name }}</p> |
                                                    <p class="sessionFormText">{{ data?.c_name }}</p>
                                                </div>
                                            </div>
                                        </perfect-scrollbar> -->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <div class="d-flex justify-content-end">
                        <button type="button" class="modelCancelBtn" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" data-bs-dismiss="modal" @click="handleEditGroup"
                            class="modelSaveBtn ms-2">Save</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import { PerfectScrollbar } from 'vue3-perfect-scrollbar'
import { deleteGroup } from '../../services/group_services';
import { createToast } from 'mosha-vue-toastify';
import 'mosha-vue-toastify/dist/style.css';
export default {
    name: 'GroupSidebar',
    components: {
        PerfectScrollbar
    },
    props: {
        groupData: Object,
        handleGroupsSessionsData: Function,
        handleGroupList: Function
    },
    data() {
        return {
            groupId: null,
            activeGroup: null,
            searchQuery: '',
            form: {
                id: null,
                name: '',
                sessions: []
            },
           
        }
    },
    computed: {
        filteredGroupData() {
            if (!this.searchQuery) {
                return this.groupData;
            }
            // Filter groupData based on searchQuery
            return this.groupData.filter(group => group.name.toLowerCase().includes(this.searchQuery.toLowerCase()));
        },
      
    },
    watch: {
        groupData: {
            immediate: true,
            handler(newVal) {
                if (newVal && newVal.length >= 1) {
                    this.activeGroup = newVal[0].id;
                }
            },
        },
    },
    mounted(){
    },
    methods: {
        async handleGroup(id) {
            this.groupId = id
            this.$emit("groupid", this.groupId)
            this.activeGroup = this.groupId

        },
        async handleDelete(id) {
            console.log('delete', id)
            try {
                await deleteGroup(id)
                this.handleGroupList()
                this.handleGroupsSessionsData()
                createToast(`Delete Group successfully`, {
                    type: 'success',
                    position: 'top-right',
                    transition: 'zoom',
                });
            } catch (error) {
                console.log(error)
            }
        },
        handleEditGroup() {
            const payload = {
                id: this.form.id,
                name: this.form.name,
                sessions: this.form.sessions
            }
        },
        handleUpdateModel(id, name) {
            console.log('update-id', id, name)
            this.form.id = id,
                this.form.name = name
            // this.form.sessions = sessions
        },
    }
}
</script>

<style>
/* .nav-linker {
    text-decoration: none;
    color: darkgray;
    font-size: 15px;
    border-radius: 5px;
}

a.router-link-exact-active.nav-linker {
    color: white;
    background-color: var(--primary_color);
    font-size: 15px;
    padding: 3px 76px;
} */

.groupBtn {
    border: none;
    background: none;
}

.activeBtn {
    color: var(--primary_color);
    border: none;
    background: none;
}
</style>