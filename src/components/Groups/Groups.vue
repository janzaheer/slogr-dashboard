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
                                <h3 class="text-secondary ms-3 mt-2">Groups</h3>
                            </div>
                            <div class="d-flex align-items-center">
                                <h6 class="mx-1 mt-2 text-muted">Home </h6>
                                <h6 class="me-4 mt-2"> - Groups</h6>
                                <AddGroup :handleGroupList="handleGroupList"
                                    :handleGroupsSessionsData="handleGroupsSessionsData" />
                                <div class="mx-3"><i class="fa-solid fa-ellipsis fa-2xl"></i></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container-fluid tableDiv">
                <div class="card mx-2 mt-4">
                    <div class="card-header">
                        <div class="d-flex justify-content-between align-items-center mx-5">
                            <h6>Groups</h6>
                            <h6>Sessions</h6>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="row g-2">
                            <div class="col-2">
                                <GroupSidebar @groupid="handleGroupId" :groupData="groupData"
                                    :handleGroupList="handleGroupList"
                                    :handleGroupsSessionsData="handleGroupsSessionsData" />
                            </div>
                            <div class="col-10">
                                <div class="card" style="height: 100vh;">
                                    <div class="card-body">
                                        <perfect-scrollbar style="height: 820px;">
                                            <div class="text-center m-5" v-if="loading">
                                                <VueSpinner size="80" color="#8cb63d" />
                                            </div>
                                            <div class="m-5"
                                                v-else-if="!loading && (!groupListSessionsData || groupListSessionsData.length === 0)">
                                                <!-- <h3 class="text-danger">Alerts not found Add new Alert</h3> -->
                                                <div class="empty-state-container">
                                                    <div class="empty-state-card text-center p-5 rounded-4 shadow-sm">
                                                        <!-- Icon -->
                                                        <div class="empty-state-icon mb-4">
                                                            <div class="icon-circle mx-auto">
                                                               <img src="../../assets/group-25271.svg" class="icon-img" />
                                                            </div>
                                                        </div>

                                                        <!-- Message - EXACTLY YOUR CODE -->
                                                        <div class="empty-state-message mb-4">
                                                            <h3 class="fw-semibold mb-2"
                                                                style="color: #1f2937; font-size: 1.5rem;">
                                                                No Groups Found
                                                            </h3>
                                                            <p class="text-muted mb-0"
                                                                style="font-size: 1rem; max-width: 500px; margin: 0 auto;">
                                                                You haven't set up any Groups yet. Create your first
                                                                Group to stay
                                                                updated.
                                                            </p>
                                                        </div>
                                                        <!-- Action Button -->
                                                        <AddGroup :handleGroupList="handleGroupList"
                                                            :handleGroupsSessionsData="handleGroupsSessionsData" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="table-responsive" v-else>
                                                <table class="table table-striped table-hover text-center">
                                                    <thead>
                                                        <tr>
                                                            <th><a href="#" class="tableHead">Client Name</a></th>
                                                            <th><a href="#" class="tableHead">Server Name</a></th>
                                                            <th><a href="#" class="tableHead">Profile Name </a></th>
                                                            <th></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr v-for="data in groupListSessionsData" :key="data.id">
                                                            <td>
                                                                <p class="tableP">{{ data?.c_name }}</p>
                                                            </td>
                                                            <td>
                                                                <p class="tableP">{{ data?.s_name }}</p>
                                                            </td>
                                                            <td>
                                                                <p class="tableP">{{ data?.p_name }}</p>
                                                            </td>
                                                            <td class="fs-5 dropstart">
                                                                <RouterLink :to="`/sentinelReports/` + data.id"
                                                                    class="text-decoration-none text-dark tableP">
                                                                    <i class="fa-solid fa-chevron-right"></i>
                                                                </RouterLink>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </perfect-scrollbar>
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
import { RouterLink } from 'vue-router';
import Header from '../common/Header.vue';
import { getGroups, GroupsSessionsData } from '../../services/group_services';
import GroupSidebar from '../Groups/GroupSidebar.vue';
import { PerfectScrollbar } from 'vue3-perfect-scrollbar';
import { VueSpinner } from 'vue3-spinners';
import AddGroup from './AddGroup.vue';

export default {
    name: 'Groups',
    components: {
        Header,
        GroupSidebar,
        PerfectScrollbar,
        VueSpinner,
        AddGroup,

    },
    data() {
        return {
            groupData: [],
            receivedGroupId: '',
            groupListSessionsData: [],
            loading: false,
            sessionsData: [],
        }
    },

    mounted() {
        this.handleGroupList()
        this.handleGroupsSessionsData()
    },
    methods: {
        async handleGroupList() {
            let res = await getGroups()
            this.groupData = res
            if (this.groupData.length >= 1) {
                await this.handleGroupId(this.groupData[0].id)
            }
        },
        async handleGroupId(data) {
            let id = this.receivedGroupId = data
            await this.handleGroupsSessionsData(id)
        },
        async handleGroupsSessionsData(id) {
            try {
                this.loading = true
                let res = await GroupsSessionsData(id)
                this.groupListSessionsData = res.group.sessions
            } catch (error) {
                console.log(error)
            } finally {
                this.loading = false;
            }
        }
    }
}
</script>

<style></style>