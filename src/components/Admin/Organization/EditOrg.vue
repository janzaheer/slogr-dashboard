<template>
    <div>
        <button class="editBtn ms-4" data-bs-toggle="modal" data-bs-target="#staticBackdrop1">Edit</button>
        <!-- Modal  edit-->
        <div class="modal fade" id="staticBackdrop1" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
            aria-labelledby="staticBackdrop1Label" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered  modal-lg">
                <div class="modal-content">
                    <div class="modal-header d-flex justify-content-center align-items-center">
                        <div class="">
                            <h2 class="text-dark">Edit Organization</h2>
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
                                        <input type="number" class="form-control form-control-lg" placeholder="Phone"
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
                            <button type="button" data-bs-dismiss="modal" @click="handleEditMonitor"
                                class="modelSaveBtn ms-2">Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { editOrganization } from '../../../services/organization_services'

export default {
    name: 'EditOrg',
    props: {
        name: String,
        phone: String,
        address: String,
        handleGetOrganization:Function
    },
    data() {
        return {
            form: {
                name: this.name,
                address: this.address,
                phone: this.phone
            }
        }
    },
    watch: {
        name: function (newName) {
            this.form.name = newName;
        },
        phone: function (newPhone) {
            this.form.phone = newPhone;
        },
        address: function (newAddress) {
            this.form.address = newAddress;
        },
    },
    mounted() {

    },
    methods: {
        async handleEditMonitor() {
            const payload = {
                name: this.form.name,
                address: this.form.address,
                phone: this.form.phone
            }
            try {
                await editOrganization(payload)
                this.handleGetOrganization()
            } catch (error) {
                console.log(error)
            }
        }
    }
}
</script>

<style></style>