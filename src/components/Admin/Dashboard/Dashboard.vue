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
                        <div class="card" style="height: 100vh;">
                            <div class="card-body">
                                <h5 class="card-title">Special title treatment</h5>
                                <p class="card-text">With supporting text below as a natural lead-in to additional content.
                                </p>
                                <a href="#" class="btn btn-primary">Go somewhere</a>
                            </div>
                        </div>
                    </div>
                    <div class="col-9">
                        <div class="card" style="height: 100vh;">
                            <div class="card-body">
                                <div class="d-flex justify-content-start mt-3 ms-3">
                                    <div class="d-flex justify-content-between align-items-center">
                                        <div>
                                            <p>ddd</p>
                                        </div>
                                        <div class="mx-2">
                                            <p>ddd</p>
                                        </div>
                                        <div>
                                            <p>ddd</p>
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
export default {
    name: 'Dashboard',
    components: {
        Header
    },
    data() {

    },
    mounted() {

    },
    methods: {

    }
}
</script>

<style></style>