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
                                <h3 class="text-secondary ms-3 mt-2">Rights Profile</h3>
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
                                <div class="mt-3 p-3 bg-warning bg-opacity-10 border border-warning rounded">
                                    To enjoy the experience as a organization,create new pro your employee
                                </div>
                                <div class="mt-3">
                                    <div class="row g-2">
                                        <div class="col-lg-3">
                                            <div class="card border border-2" style="height: 21rem;">
                                                <div class="card-body">
                                                    <div class="my-2 d-flex align-items-center">
                                                        <h5 class="card-title">Basic Information</h5>
                                                    </div>
                                                    <hr>
                                                    <div>
                                                        <div class="contact-form">
                                                            <div class="form-field">
                                                                <input id="name" type="text" class="input-text">
                                                                <label for="name" class="label"><i class="fa-solid fa-user me-2"></i> Name</label>
                                                            </div>
                                                            <div class="form-field">
                                                                <input id="UserName" type="text" class="input-text">
                                                                <label for="UserName" class="label"><i class="fa-solid fa-user me-2"></i> User Name</label>
                                                            </div>
                                                             <div class="form-field">
                                                                <input id="Email" type="email" class="input-text">
                                                                <label for="Email" class="label"><i class="fa-solid fa-envelope me-2"></i> Email</label>
                                                            </div>
                                                            <div class="form-field">
                                                                <input id="Designation" type="text" class="input-text">
                                                                <label for="Designation" class="label"><i class="fa-solid fa-medal me-2"></i> Designation</label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    <div class="col-lg-3">
                                            <div class="card border border-2" style="height: 21rem;">
                                                <div class="card-body">
                                                    <div class="my-2 d-flex align-items-center">
                                                        <h5 class="card-title">Home Page</h5>
                                                    </div>
                                                    <hr>
                                                    <div>
                                                        <div class="form-check">
                                                            <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" checked>
                                                            <label class="form-check-label" for="flexCheckChecked">
                                                                Map View
                                                            </label>
                                                        </div>
                                                        <hr>
                                                        <div class="form-check">
                                                            <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" checked>
                                                            <label class="form-check-label" for="flexCheckChecked">
                                                                Add Sentinel
                                                            </label>
                                                        </div>
                                                        <hr>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                         <div class="col-lg-3">
                                            <div class="card border border-2" style="height: 21rem;">
                                                <div class="card-body">
                                                    <div class="my-2 d-flex align-items-center">
                                                        <h5 class="card-title">Sentinel Page</h5>
                                                    </div>
                                                    <hr>
                                                    <div>
                                                        <div class="form-check">
                                                            <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" checked>
                                                            <label class="form-check-label" for="flexCheckChecked">
                                                                View Details
                                                            </label>
                                                        </div>
                                                        <hr>
                                                        <div class="form-check">
                                                            <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" checked>
                                                            <label class="form-check-label" for="flexCheckChecked">
                                                                Add Sentinel Edit
                                                            </label>
                                                        </div>
                                                        <hr>
                                                         <div class="form-check">
                                                            <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" checked>
                                                            <label class="form-check-label" for="flexCheckChecked">
                                                                Sentinel
                                                            </label>
                                                        </div>
                                                        <hr>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                         <div class="col-lg-3">
                                            <div class="card border border-2" style="height: 21rem;">
                                                <div class="card-body">
                                                    <div class="my-2 d-flex align-items-center">
                                                        <h5 class="card-title">Session Page</h5>
                                                    </div>
                                                    <hr>
                                                    <div>
                                                         <div class="form-check">
                                                            <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" checked>
                                                            <label class="form-check-label" for="flexCheckChecked">
                                                                View Details
                                                            </label>
                                                        </div>
                                                        <hr>
                                                        <div class="form-check">
                                                            <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" checked>
                                                            <label class="form-check-label" for="flexCheckChecked">
                                                                Add Session
                                                            </label>
                                                        </div>
                                                        <hr>
                                                         <div class="form-check">
                                                            <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" checked>
                                                            <label class="form-check-label" for="flexCheckChecked">
                                                                Edit Session
                                                            </label>
                                                        </div>
                                                        <hr>
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
    </div>
</template>

<script>
import { RouterLink } from 'vue-router';
import Header from '../../common/Header.vue';
import Sidebar from '../Sidebar.vue';
export default{
    name: 'RightsProfile',
    components:{
        Header,
        Sidebar
    },
    data(){
        return {

        }
    },
    mounted(){

    },
    methods:{

    }
}
</script>
