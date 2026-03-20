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
                            <h3 class="text-secondary ms-3 mt-2">Profile Setting</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="container-fluid tableDiv">
            <div class="row g-2 mx-md-2 mt-4 mb-4">
                <div class="col-3">
                    <Sidebar />
                </div>
                <div class="col-9">
                    <div class="card" style="height: 100vh;">
                        <div class="card-body">
                            <div v-if="userData.user.organization_id == null">
                                <AddOrd />
                            </div>
                            <div class="mb-4" style="min-height: 90px;">
                                <div class="text-center py-2" v-if="loading">
                                    <VueSpinner size="80" color="#8cb63d" />
                                </div>
                                <div v-else>
                                    <div v-for="(data, index) in organizationData" :key="data.id">
                                        <div class="card border mb-2"
                                            v-if="index === 0 || (userData.user.organization_id && userData.user.organization_id === data.id)">
                                            <div class="card-body d-flex justify-content-between align-items-center">
                                                <div class="d-flex align-items-center gap-3">
                                                    <div v-if="userData.user.organization_id && userData.user.organization_id === data.id">
                                                        <AssignOrg :handleGetOrganization="handleGetOrganization" />
                                                    </div>
                                                    <div v-else class="card border-0" style="background-color: var(--icon-bg);">
                                                        <div class="card-body d-flex justify-content-center align-items-center p-3">
                                                            <i class="fa-solid fa-user-plus fa-lg" style="color: gray;"></i>
                                                        </div>
                                                    </div>
                                                    <div class="me-3">
                                                        <h5 class="mb-0">{{ data.name }}</h5>
                                                        <small class="text-muted">Organization</small>
                                                    </div>
                                                    <div>
                                                        <div style="font-size: 13px;">
                                                            <i class="fa-solid fa-id-badge me-1" style="color: #5b9bd5;"></i> Designation
                                                        </div>
                                                        <div style="font-size: 13px;">
                                                            <i class="fa-solid fa-mobile-screen me-1" style="color: #5b9bd5;"></i> Phone: {{ data.phone || '-' }}
                                                        </div>
                                                        <div style="font-size: 13px;">
                                                            <i class="fa-solid fa-location-dot me-1" style="color: #5b9bd5;"></i> Address: {{ data.address || '-' }}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div v-if="userData.user.organization_id && userData.user.organization_id === data.id">
                                                    <EditOrg :name="data.name" :phone="data.phone" :address="data.address" :handleGetOrganization="handleGetOrganization" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row g-2" style="margin-top: 15%;">
                                <div class="col-lg-3">
                                    <div class="card border border-2">
                                        <div class="card-body">
                                            <div class="my-2 d-flex align-items-center">
                                                <h5 class="card-title">Create New User</h5>
                                            </div>
                                            <hr>
                                            <p>To enjoy the experience as a organization,
                                                create new pro your employee</p>
                                            <div class="d-flex justify-content-end align-items-center my-3">
                                                <h1><i class="fa-solid fa-user-plus fa-2xl" style="color: #e9efc6;"></i></h1>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-3">
                                    <div class="card border border-2">
                                        <div class="card-body">
                                            <div class="my-2 d-flex align-items-center">
                                                <h5 class="card-title">Rights Profile</h5>
                                            </div>
                                            <hr>
                                            <p>To enjoy the experience as a organization,
                                                create new pro your employee</p>
                                            <div class="d-flex justify-content-end align-items-center my-3">
                                                <h1><i class="fa-solid fa-shield-halved fa-2xl" style="color: #e9efc6;"></i></h1>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-3">
                                    <div class="card border border-2">
                                        <div class="card-body">
                                            <div class="my-2 d-flex align-items-center">
                                                <h5 class="card-title">Billing</h5>
                                            </div>
                                            <hr>
                                            <p>To enjoy the experience as a organization,
                                                create new pro your employee</p>
                                            <div class="d-flex justify-content-end align-items-center my-3">
                                                <h1><i class="fa-solid fa-dollar-sign fa-2xl" style="color: #e9efc6;"></i></h1>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-3">
                                    <div class="card border border-2">
                                        <div class="card-body">
                                            <div class="my-2 d-flex align-items-center">
                                                <h5 class="card-title">Select Plan</h5>
                                            </div>
                                            <hr>
                                            <p>To enjoy the experience as a organization,
                                                create new pro your employee</p>
                                            <div class="d-flex justify-content-end align-items-center my-3">
                                                <h1><i class="fa-solid fa-file-lines fa-2xl" style="color: #e9efc6;"></i></h1>
                                            </div>
                                        </div>
                                    </div>
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
import {
    RouterLink
} from 'vue-router';
import Header from '../../common/Header.vue';
import Sidebar from '../Sidebar.vue';
import {
    getOrganization
} from '../../../services/organization_services';
import EditOrg from '../Organization/EditOrg.vue';
import AddOrd from '../Organization/AddOrd.vue';
import AssignOrg from '../Organization/AssignOrg.vue';
import {
    VueSpinner
} from 'vue3-spinners';

export default {
    name: 'Dashboard',
    components: {
        Header,
        Sidebar,
        EditOrg,
        AddOrd,
        AssignOrg,
        VueSpinner
    },
    data() {
        return {
            organizationData: [],
            loading: false,
        }
    },
    computed: {
        userData() {
            return this.$store.getters.getUserData;
        },
    },
    mounted() {
        this.handleGetOrganization()
    },
    methods: {
        async handleGetOrganization() {
            try {
                this.loading = true;
                let res = await getOrganization()
                this.organizationData = res.data.organizations
            } catch (error) {
                console.log('error', error)
            } finally {
                this.loading = false
            }
        }
    }
}
</script>

<style>
.editBtn {
    background-color: var(--white_color);
    border-radius: 6px;
    border: 1px solid var(--primary_color);
    padding: 2px 15px;
    color: var(--primary_color);
    cursor: pointer;
    transition: background-color 0.3s ease;
    margin-top: 5px;
}

.editBtn:hover {
    color: var(--white_color);
    background-color: var(--primary_color_Hover);
}
</style>
