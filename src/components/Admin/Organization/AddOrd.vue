<template>
    <div>
        <div class="d-flex align-items-center">
            <!-- <div>
                <h6>To create your own organization use this button </h6>
            </div> -->
            <div>
                <button class="editBtn ms-4" data-bs-toggle="modal" data-bs-target="#staticBackdrop3"><i
                        class="fa-solid fa-plus"></i> Add New Organization</button>
            </div>
        </div>
        <!-- Modal  add-->
        <div class="modal fade" id="staticBackdrop3" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
            aria-labelledby="staticBackdrop1Label" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered  modal-lg">
                <div class="modal-content">
                    <div class="modal-header d-flex justify-content-center align-items-center">
                        <div class="">
                            <h2 class="text-dark">Add New Organization</h2>
                        </div>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="">
                            <div class="mb-3">
                                <div class="row g-2">
                                    <div class="col-md-4">
                                        <label for="exampleFormControlInput1" class="form-label ms-1">Name</label>
                                        <input type="text" class="form-control form-control-lg" placeholder="name"
                                            name="name" v-model="this.form.name">
                                    </div>
                                    <div class="col-md-4">
                                        <label for="exampleFormControlInput1" class="form-label ms-1">Phone</label>
                                        <input type="text" class="form-control form-control-lg" placeholder="Phone"
                                            name="phone" v-model="this.form.phone">
                                    </div>
                                    <div class="col-md-4">
                                        <label for="exampleFormControlInput1" class="form-label ms-1">Address</label>
                                        <input type="text" class="form-control form-control-lg" placeholder="Address"
                                            name="address" v-model="this.form.address">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <div class="d-flex justify-content-end">
                            <button type="button" class="modelCancelBtn" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" data-bs-dismiss="modal" @click="handleAddOrg"
                                class="modelSaveBtn ms-2">Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { createToast } from 'mosha-vue-toastify';
import 'mosha-vue-toastify/dist/style.css';
import { addOrganization } from '../../../services/organization_services'
export default {
    name: 'AddOrg',
    props: {
        handleGetOrganization: Function
    },
    data() {
        return {
            form: {
                name: '',
                address: '',
                phone: ''
            }
        }
    },
    mounted() {

    },
    methods: {
        async handleAddOrg() {
            const payload = {
                name: this.form.name,
                address: this.form.address,
                phone: this.form.phone
            }
            try {
                await addOrganization(payload)
                createToast(`Add New Organization Successfully`, {
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

<style></style>