<template>
    <div class="card" style="height: 100vh;">
        <div class="card-body">
            <div class="mb-1">
                <input type="text" class="form-control" id="exampleFormControlInput1" v-model="searchQuery"
                    placeholder="search">
            </div>
            <perfect-scrollbar style="height: 820px;">
                <div class="d-flex flex-column flex-shrink-0 p-2">
                    <ul class="nav nav-pills flex-column mb-auto" v-for="filteredGroup in filteredGroupData"
                        :key="filteredGroup.id">
                        <li class="nav-item d-flex justify-content-between align-items-center">
                            <button :class="activeGroup == filteredGroup.id ? 'activeBtn' : 'groupBtn'"
                                v-on:click="handleGroup(filteredGroup.id)" aria-current="page">{{ filteredGroup?.name
                                }}</button>

                            <!-- <a href="#" class="text-decoration-none" v-on:click="handleDelete(filteredGroup.id)"><i class="fa-solid fa-delete-left"></i></a> -->
                            <div class="dropstart">
                                <a href="#" class="text-decoration-none text-dark tableP" data-bs-toggle="dropdown"
                                    aria-expanded="false">
                                    <i class="fa-solid fa-ellipsis"></i></a>
                                <ul class="dropdown-menu">
                                    <li><a class="dropdown-item" href="#"><i class="fa-regular fa-pen-to-square"></i>
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
        handleGroupId: Function,
        handleGroup: Function
    },
    data() {
        return {
            groupId: null,
            activeGroup: null,
            searchQuery: '',
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
                this.handleGroup()
                this.handleGroupId()
                createToast(`Delete Group successfully`, {
                    type: 'success',
                    position: 'top-right',
                    transition: 'zoom',
                });
            } catch (error) {
                console.log(error)
            }
        }
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