<template>
    <div class="modal fade" id="staticBackdrop2" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="staticBackdrop2Label" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-body">
                    <div class="my-2 text-center">
                        <h2 class="text-secondary">Add Sentinel</h2>
                        <p class="modelText">Add new Sentinel</p>
                    </div>
                    <div class="">
                        <div class="mb-3">
                            <label for="addSentinelName" class="form-label ms-1">Name <span class="text-danger">*</span></label>
                            <input
                                type="text"
                                class="form-control form-control-lg"
                                :class="{ 'is-invalid': nameTouched && !form.name }"
                                id="addSentinelName"
                                placeholder="Enter Name"
                                v-model="form.name"
                                @blur="nameTouched = true"
                            />
                            <div class="invalid-feedback" v-if="nameTouched && !form.name">Name is required.</div>
                        </div>
                        <div class="mb-3">
                            <label for="addSentinelCode" class="form-label ms-1">Agent Code <span class="text-danger">*</span></label>
                            <input
                                type="text"
                                class="form-control form-control-lg"
                                :class="{ 'is-invalid': codeTouched && !form.agent_code }"
                                id="addSentinelCode"
                                placeholder="Enter Agent Code"
                                v-model="form.agent_code"
                                @blur="codeTouched = true"
                            />
                            <div class="invalid-feedback" v-if="codeTouched && !form.agent_code">Agent Code is required.</div>
                        </div>
                        <div class="d-flex justify-content-end">
                            <button type="button" id="AddCancelButton" class="modelCancelBtn"
                                data-bs-dismiss="modal" @click="resetForm">Cancel</button>
                            <button type="button" class="modelSaveBtn ms-2"
                                :disabled="!form.name || !form.agent_code"
                                @click="handleAdd">Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { createAgent } from '../../services/agent_services';
import Toast from '../Toast';

export default {
    name: 'AddSentinel',
    emits: ['sentinelAdded'],
    data() {
        return {
            form: {
                name: null,
                agent_code: null,
            },
            nameTouched: false,
            codeTouched: false,
        }
    },
    methods: {
        resetForm() {
            this.form.name = null
            this.form.agent_code = null
            this.nameTouched = false
            this.codeTouched = false
        },
        async handleAdd() {
            if (!this.form.name || !this.form.agent_code) return
            try {
                await createAgent({ name: this.form.name, agent_code: this.form.agent_code })
                document.getElementById('AddCancelButton').click()
                this.resetForm()
                this.$emit('sentinelAdded')
                Toast.fire({ icon: 'success', title: 'Sentinel added successfully' })
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
