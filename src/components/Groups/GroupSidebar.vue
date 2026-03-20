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
                                v-on:click="handleGroup(filteredGroup.id)" aria-current="page">{{ filteredGroup?.name }}</button>
                            <div class="dropstart">
                                <a href="#" class="text-decoration-none text-dark tableP" data-bs-toggle="dropdown"
                                    aria-expanded="false">
                                    <i class="fa-solid fa-ellipsis"></i>
                                </a>
                                <ul class="dropdown-menu">
                                    <li>
                                        <a class="dropdown-item" href="#"
                                            @click="selectedGroup = { id: filteredGroup.id, name: filteredGroup.name }"
                                            data-bs-toggle="modal" data-bs-target="#editGroupModal">
                                            <i class="fa-regular fa-pen-to-square"></i> Edit
                                        </a>
                                    </li>
                                    <li>
                                        <a class="dropdown-item" href="#"
                                            @click="deleteId = filteredGroup.id"
                                            data-bs-toggle="modal" data-bs-target="#deleteGroupModal">
                                            <i class="fa-regular fa-trash-can"></i> Delete
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <hr>
                    </ul>
                </div>
            </perfect-scrollbar>
        </div>
    </div>

    <EditGroup
        :selectedGroup="selectedGroup"
        :handleGroupList="handleGroupList"
        :handleGroupsSessionsData="handleGroupsSessionsData"
    />

    <div class="modal fade" id="deleteGroupModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header border-0">
                    <h5 class="modal-title text-dark fw-semibold">Delete Group</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p class="text-muted mb-0">Are you sure you want to delete this group? This action cannot be undone.</p>
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
import { deleteGroup } from '../../services/group_services';
import { PerfectScrollbar } from 'vue3-perfect-scrollbar';
import EditGroup from './EditGroup.vue';
import Toast from '../Toast';

export default {
    name: 'GroupSidebar',
    components: {
        PerfectScrollbar,
        EditGroup
    },
    props: {
        groupData: Object,
        handleGroupsSessionsData: Function,
        handleGroupList: Function
    },
    data() {
        return {
            activeGroup: null,
            searchQuery: '',
            selectedGroup: null,
            deleteId: null
        }
    },
    computed: {
        filteredGroupData() {
            if (!this.searchQuery) return this.groupData
            return this.groupData.filter(group => group.name.toLowerCase().includes(this.searchQuery.toLowerCase()))
        }
    },
    watch: {
        groupData: {
            immediate: true,
            handler(newVal) {
                if (newVal && newVal.length >= 1) {
                    this.activeGroup = newVal[0].id
                }
            }
        }
    },
    methods: {
        handleGroup(id) {
            this.activeGroup = id
            this.$emit('groupid', id)
        },
        async handleDelete(id) {
            try {
                await deleteGroup(id)
                this.handleGroupList()
                this.handleGroupsSessionsData()
                Toast.fire({ icon: 'success', title: 'Group deleted successfully' })
            } catch (error) {
                console.log(error)
                Toast.fire({ icon: 'error', title: 'Something went wrong' })
            }
        }
    }
}
</script>

<style>
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
