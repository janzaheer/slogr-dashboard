<template>
    <div data-bs-toggle="modal" data-bs-target="#staticBackdrop2" class="card border-0" style="background-color: var(--icon-bg);">
        <div class="card-body d-flex justify-content-center align-items-center">
            <h1><i class="fa-solid fa-user-plus fa-lg" style="color: var(--primary_color); cursor: pointer;"></i></h1>
        </div>
    </div>

    <div class="modal fade" id="staticBackdrop2" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="staticBackdrop2Label" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header d-flex justify-content-center align-items-center">
                    <div class="">
                        <h2 class="text-dark">Assign Organization</h2>
                    </div>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
                        @click="resetForm"></button>
                </div>
                <div class="modal-body">
                    <div class="mb-3">
                        <label class="form-label ms-1">Assign Email <span class="text-danger">*</span></label>
                        <input type="email" class="form-control form-control-lg"
                            :class="{ 'is-invalid': emailTouched && !email.trim() }"
                            placeholder="Assign Email" name="email" v-model="email"
                            @blur="emailTouched = true" />
                        <div class="invalid-feedback" v-if="emailTouched && !email.trim()">Email is required.</div>
                    </div>
                </div>
                <div class="modal-footer">
                    <div class="d-flex justify-content-end">
                        <button type="button" class="modelCancelBtn" data-bs-dismiss="modal" id="assignOrgCancelBtn"
                            @click="resetForm">Cancel</button>
                        <button type="button" class="modelSaveBtn ms-2"
                            :disabled="!email.trim()"
                            @click="handleAssignOrg">Save</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { assignOrganization } from '../../../services/organization_services';
import Toast from '../../Toast';

export default {
    name: 'AssignOrg',
    props: {
        handleGetOrganization: Function
    },
    data() {
        return {
            email: '',
            emailTouched: false,
        }
    },
    methods: {
        resetForm() {
            this.email = ''
            this.emailTouched = false
        },
        async handleAssignOrg() {
            const payload = {
                email: this.email
            }
            try {
                await assignOrganization(payload)
                Toast.fire({ icon: 'success', title: 'Assign Organization Successfully' })
                this.handleGetOrganization()
                document.getElementById('assignOrgCancelBtn').click()
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
