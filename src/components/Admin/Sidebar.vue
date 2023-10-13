<template>
    <div class="card" style="height: 100vh;">
        <div class="card-body">
            <div class="d-flex flex-column flex-shrink-0 p-3">
                <ul class="nav nav-pills flex-column mb-auto">
                    <li class="nav-item">
                        <RouterLink to="/dashboard" class="nav-link" aria-current="page">
                            Dashboard
                        </RouterLink>
                    </li>
                    <li>
                        <RouterLink to="/createNewUser" class="nav-link">
                            Create New User
                        </RouterLink>
                    </li>
                    <li>
                        <a href="#" class="nav-link">
                            Rights Profile
                        </a>
                    </li>
                    <hr>
                    <li>
                        <a href="#" class="nav-link">
                            Edit User Rights
                        </a>
                    </li>
                    <hr>
                    <li>
                        <a href="#" class="nav-link">
                            Billing
                        </a>
                    </li>
                    <hr>
                    <li>
                        <a href="#" class="nav-link">
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
.nav-link {
    color: var(--nav-color);
}
</style>