<template>
    <div>
        <button class="editBtn ms-4" data-bs-toggle="modal" data-bs-target="#staticBackdrop2"><i
                class="fa-solid fa-plus"></i> AssignOrganization</button>
    </div>
    <!-- Modal  add-->
    <div class="modal fade" id="staticBackdrop2" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="staticBackdrop2Label" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header d-flex justify-content-center align-items-center">
                    <div class="">
                        <h2 class="text-dark">Assign Organization</h2>
                    </div>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="">
                        <div class="mb-3">
                            <label for="exampleFormControlInput1" class="form-label ms-1">Assign</label>
                            <input type="email" class="form-control form-control-lg" placeholder="Assign Email" name="email"
                                v-model="this.email">
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <div class="d-flex justify-content-end">
                        <button type="button" class="modelCancelBtn" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" data-bs-dismiss="modal" @click="handleAssignOrg"
                            class="modelSaveBtn ms-2">Save</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { createToast } from 'mosha-vue-toastify';
import 'mosha-vue-toastify/dist/style.css';
import { assignOrganization } from '../../../services/organization_services';
export default {
    name: 'AssignOrg',
    data() {
        return {
            email: ''
        }
    },
    props: {
        handleGetOrganization: Function
    },
    mounted() {

    },
    methods: {
        async handleAssignOrg() {
            const payload = {
                email: this.email
            }
            try {
                await assignOrganization(payload)
                createToast(`Assign Organization Successfully`, {
                    type: 'success',
                    position: 'top-right',
                    transition: 'zoom',
                });
                this.handleGetOrganization()
            } catch (error) {
                console.log(error)
            }
        }
    }
}
</script>