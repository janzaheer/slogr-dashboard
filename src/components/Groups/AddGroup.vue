<template>
    <div>
        <button class="addBtn" data-bs-toggle="modal" data-bs-target="#staticBackdrop"> <i
                class="fa-solid fa-plus fa-lg"></i> Create New Group</button>
        <!-- Modal  add-->
        <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
            aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-lg">
                <div class="modal-content">
                    <div class="modal-header d-flex justify-content-center align-items-center">
                        <div class="">
                            <h2 class="text-dark"> Add New Group</h2>
                        </div>
                    </div>
                    <div class="modal-body">
                        <div class="">
                            <div class="mb-3">
                                <input type="text" class="form-control form-control-lg" placeholder="Enter Group Name"
                                    name="name" v-model="this.form.name">
                            </div>
                            <div class="mb-3">
                                <div class="text-center m-5" v-if="loading">
                                    <VueSpinner size="80" color="#8cb63d" />
                                </div>
                                <div class="table-responsive" v-else>
                                    <table class="table table-striped table-hover text-center">
                                        <thead>
                                            <tr>
                                                <th scope="col"><a href="#" class="tableHead"></a></th>
                                                <th scope="col"><a href="#" class="tableHead">Server Name</a></th>
                                                <th scope="col"><a href="#" class="tableHead">Client Name</a>
                                                </th>
                                                <th scope="col"><a href="#" class="tableHead">Packet Name</a>

                                                </th>
                                                <th scope="col"><a href="#" class="tableHead"> Number Packets</a>
                                                </th>
                                                <th scope="col"><a href="#" class="tableHead">Packet Interval</a>
                                                </th>
                                                <th scope="col"><a href="#" class="tableHead">W Time</a>
                                                </th>
                                                <th scope="col"><a href="#" class="tableHead">Packet Length</a> </th>
                                                <th scope="col"><a href="#" class="tableHead">DSCP</a> </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="data in sessionsData" :key="data.id">
                                                <td>
                                                    <p class="tableP">
                                                    <div class="form-check">
                                                        <input class="form-check-input" type="checkbox"
                                                            id="flexCheckDefault"
                                                            v-on:click="handleSessionsCheck($event, data.id)">
                                                    </div>
                                                    </p>
                                                </td>
                                                <td>
                                                    <p class="tableP">{{ data?.s_name }}</p>
                                                </td>
                                                <td>
                                                    <p class="tableP">{{ data?.c_name }}</p>
                                                </td>
                                                <td>
                                                    <p class="tableP">{{ data?.p_name }}</p>
                                                </td>
                                                <td>
                                                    <p class="tableP">{{ data?.n_packets }}</p>
                                                </td>
                                                <td>
                                                    <p class="tableP">{{ data?.p_interval }}</p>
                                                </td>
                                                <td>
                                                    <p class="tableP">{{ data.w_time }}</p>
                                                </td>
                                                <td>
                                                    <p class="tableP">{{ data.p_size }}</p>
                                                </td>
                                                <td>
                                                    <p class="tableP">{{ data.dscp }}</p>
                                                </td>

                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <div class="d-flex justify-content-end">
                            <button type="button" class="modelCancelBtn" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" data-bs-dismiss="modal" @click="handleAddGroup"
                                class="modelSaveBtn ms-2">Create</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { sessionsList } from '../../services/sessions_services'
import { VueSpinner } from 'vue3-spinners';
import { createGroup } from '../../services/group_services';
import { createToast } from 'mosha-vue-toastify';
import 'mosha-vue-toastify/dist/style.css';
export default {
    name: 'AddGroup',
    components: {
        VueSpinner
    },
    data() {
        return {
            form: {
                name: '',
                sessions: []
            },
            loading: false,
            sessionsData: []
        }
    },
    props: {
        handleGroupId: Function,
        handleGroup: Function
    },
    mounted() {
        this.handleSessions()
    },
    methods: {
        async handleAddGroup() {
            const payload = {
                name: this.form.name,
                sessions: this.form.sessions
            }
            try {
                await createGroup(payload)
                this.handleGroup()
                this.handleGroupId()
                createToast(`add Group successfully`, {
                    type: 'success',
                    position: 'top-right',
                    transition: 'zoom',
                });
            } catch (error) {
                console.log(error)
            }
        },
        async handleSessions() {
            try {
                this.loading = true
                let res = await sessionsList()
                console.log('sessions', res.data.sessions)
                this.sessionsData = res.data.sessions
            } catch (error) {
                console.log(error)
            } finally {
                this.loading = false
            }
        },
        async handleSessionsCheck($event, id) {
            if ($event.target.checked) {
                this.form.sessions.push(id)
            } else {
                const index = this.form.sessions.indexOf(id)
                delete this.form.sessions[index]
            }
        }
    }
}
</script>

<style></style>