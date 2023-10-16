<template>
    <div class="card" style="height: 100vh;">
        <div class="card-body">
            <div class="d-flex flex-column flex-shrink-0 p-2">
                <ul class="nav nav-pills flex-column mb-auto">
                    <li class="nav-item">
                        <RouterLink to="/dashboard" class="nav-linker" aria-current="page">
                            Dashboard
                        </RouterLink>
                    </li>
                     <hr>
                    <li>
                        <RouterLink to="/createNewUser" class="nav-linker">
                            Create New User
                        </RouterLink>
                    </li>
                     <hr>
                    <li>
                        <RouterLink to="/rightsProfiles" class="nav-linker">
                            Rights Profile
                        </RouterLink>
                    </li>
                    <hr>
                    <li>
                        <a href="#" class="nav-linker">
                            Edit User Rights
                        </a>
                    </li>
                    <hr>
                    <li>
                        <a href="#" class="nav-linker">
                            Billing
                        </a>
                    </li>
                    <hr>
                    <li>
                        <a href="#" class="nav-linker">
                            Select Plan
                        </a>
                    </li>
                    <hr>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import { RouterLink } from 'vue-router';
export default {
    name: 'Sidebar',
    data() {
        return {

        }
    },
    mounted() {

    },
    methods: {

    }
}
</script>

<style>
.nav-linker{
    text-decoration: none;
    color: darkgray;
    font-size: 15px;
    border-radius: 5px;
}
a.router-link-exact-active.nav-linker{
    color: white;
    background-color: var(--primary_color); 
    font-size: 15px;
    padding: 3px 25px;
}
</style>