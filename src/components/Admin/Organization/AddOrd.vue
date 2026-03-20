<template>
    <div>
        <div class="d-flex align-items-center">
            <div>
                <button class="editBtn ms-4" data-bs-toggle="modal" data-bs-target="#staticBackdrop3">
                    <i class="fa-solid fa-plus"></i> Add New Organization
                </button>
            </div>
        </div>

        <div class="modal fade" id="staticBackdrop3" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
            aria-labelledby="staticBackdrop1Label" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-lg">
                <div class="modal-content">
                    <div class="modal-header d-flex justify-content-center align-items-center">
                        <div class="">
                            <h2 class="text-dark">Add New Organization</h2>
                        </div>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
                            @click="resetForm"></button>
                    </div>
                    <div class="modal-body">
                        <div class="">
                            <div class="mb-3">
                                <div class="row g-2">
                                    <div class="col-md-4">
                                        <label class="form-label ms-1">Name <span class="text-danger">*</span></label>
                                        <input type="text" class="form-control form-control-lg"
                                            :class="{ 'is-invalid': nameTouched && !form.name }"
                                            placeholder="Enter Organization Name" name="name" v-model="form.name"
                                            @blur="nameTouched = true" />
                                        <div class="invalid-feedback" v-if="nameTouched && !form.name">Name is required.</div>
                                    </div>
                                    <div class="col-md-4">
                                        <label class="form-label ms-1">Phone</label>
                                        <input type="text" class="form-control form-control-lg"
                                            placeholder="Enter Phone Number" name="phone" v-model="form.phone" />
                                    </div>
                                    <div class="col-md-4">
                                        <label class="form-label ms-1">Address</label>
                                        <input type="text" class="form-control form-control-lg"
                                            placeholder="Enter Address" name="address" v-model="form.address" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <div class="d-flex justify-content-end">
                            <button type="button" class="modelCancelBtn" data-bs-dismiss="modal" id="orgCancelBtn"
                                @click="resetForm">Cancel</button>
                            <button type="button" class="modelSaveBtn ms-2"
                                :disabled="!isFormValid"
                                @click="handleAddOrg">Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { addOrganization } from '../../../services/organization_services';
import Toast from '../../Toast';

export default {
    name: 'AddOrg',
    props: {
        handleGetOrganization: Function
    },
    computed: {
        isFormValid() {
            return !!this.form.name
        }
    },
    data() {
        return {
            form: {
                name: '',
                address: '',
                phone: ''
            },
            nameTouched: false,
        }
    },
    methods: {
        resetForm() {
            this.form = { name: '', address: '', phone: '' }
            this.nameTouched = false
        },
        async handleAddOrg() {
            const payload = {
                name: this.form.name,
                address: this.form.address,
                phone: this.form.phone
            }
            try {
                await addOrganization(payload)
                Toast.fire({ icon: 'success', title: 'Organization added successfully' })
                this.handleGetOrganization()
                document.getElementById('orgCancelBtn').click()
                this.resetForm()
            } catch (error) {
                console.log(error)
                Toast.fire({ icon: 'error', title: 'Something went wrong' })
            }
        }
    }
}
</script>

<style scoped>
button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    pointer-events: none;
}
</style>
