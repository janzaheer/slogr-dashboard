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
                                <h3 class="text-secondary ms-3 mt-2">Create New User</h3>
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
                                <div class="mt-5">
                                    <div class="row g-2">
                                        <div class="col-lg-4">
                                            <div class="card border border-3">
                                                <div class="card-body">
                                                    <div class="my-2 d-flex align-items-center">
                                                        <h5 class="card-title">Basic Information</h5>
                                                    </div>
                                                    <hr>
                                                    <div>
                                                        <div class="contact-form">
                                                            <div class="form-field">
                                                                <input id="Photo" type="text" class="input-text">
                                                                <label for="Photo" class="label"><i class="fa-solid fa-camera me-2"></i> Photo</label>
                                                            </div>
                                                            <div class="form-field">
                                                                <input id="name" type="text" class="input-text">
                                                                <label for="name" class="label"><i class="fa-solid fa-user me-2"></i> Name</label>
                                                            </div>
                                                            <div class="form-field">
                                                                <input id="UserName" type="text" class="input-text">
                                                                <label for="UserName" class="label"><i class="fa-solid fa-user me-2"></i> User Name</label>
                                                            </div>
                                                            <div class="form-field">
                                                                <input id="Location" type="text" class="input-text">
                                                                <label for="Location" class="label"><i class="fa-solid fa-location-dot me-2"></i> Location</label>
                                                            </div>
                                                            <div class="form-field">
                                                                <input id="Password" type="password" class="input-text">
                                                                <label for="Password" class="label"><i class="fa-solid fa-lock me-2"></i> Password</label>
                                                            </div>
                                                            <div class="form-field">
                                                                <input id="ConfirmPassword" type="password" class="input-text">
                                                                <label for="ConfirmPassword" class="label"><i class="fa-solid fa-lock me-2"></i> Confirm Password</label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-lg-4">
                                            <div class="card border border-3">
                                                <div class="card-body">
                                                    <div class="my-2 d-flex align-items-center">
                                                        <h5 class="card-title">Contact Information</h5>
                                                    </div>
                                                    <hr>
                                                    <div>
                                                        <div class="contact-form">
                                                            <div class="form-field">
                                                                <input id="Email" type="email" class="input-text">
                                                                <label for="Email" class="label"><i class="fa-solid fa-envelope me-2"></i> Email</label>
                                                            </div>
                                                            <div class="form-field">
                                                                <input id="Phone" type="number" class="input-text">
                                                                <label for="Phone" class="label"><i class="fa-solid fa-phone me-2"></i> Phone Number</label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-lg-4">
                                            <div class="card border border-3">
                                                <div class="card-body">
                                                    <div class="my-2 d-flex align-items-center">
                                                        <h5 class="card-title">Organization Information</h5>
                                                    </div>
                                                    <hr>
                                                    <div>
                                                        <div class="contact-form">
                                                            <div class="form-field">
                                                                <input id="Organization" type="text" class="input-text">
                                                                <label for="Organization" class="label"><i class="fa-solid fa-briefcase me-2"></i> Organization Name</label>
                                                            </div>
                                                            <div class="form-field">
                                                                <input id="Department" type="text" class="input-text">
                                                                <label for="Department" class="label"><i class="fa-solid fa-map me-2"></i> Department</label>
                                                            </div>
                                                            <div class="form-field">
                                                                <input id="Designation" type="text" class="input-text">
                                                                <label for="Designation" class="label"><i class="fa-solid fa-medal me-2"></i> Designation</label>
                                                            </div>
                                                            <div class="form-field">
                                                                <input id="Address" type="text" class="input-text">
                                                                <label for="Address" class="label"><i class="fa-solid fa-location-arrow me-2"></i> Address</label>
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
        </div>
    </div>
</template>

<script>
import { RouterLink } from 'vue-router';
import Header from '../../common/Header.vue';
import Sidebar from '../Sidebar.vue';
export default {
    name: 'CreateNewUser',
    components: {
        Header,
        Sidebar
    },
    data() {

    },
    mounted() {

    },
    methods: {

    }
}
</script>

<style>
.boxTop {
    margin-top: 200px;
}

.contact-form .form-field{
    position: relative;
    margin: 32px 0;
}

.contact-form .input-text {
    display: block;
    width: 100%;
    height: 36px;
    border-width: 0 0 2px 0;
    border-color: var(--dark_gray_color);
    font-size: 18px;
    line-height: 26px;
    font-weight: 400;
}
.contact-form .input-text:focus + .label,
.contact-form .input-text.not-empty + .label{
    transform: translateY(-24px);
}
.contact-form .input-text:focus{
    outline: none;
}
.contact-form .label{
    position: absolute;
    left: 20px;
    bottom: 11px;
    font-size: 18px;
    line-height: 26px;
    font-weight: 400;
    color: var(--dark_gray_color);
    cursor: text;
    text-transform: capitalize;
    transition: transform 0.2s ease-in-out;
}

</style>