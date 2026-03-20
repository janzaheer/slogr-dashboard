<template>
    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-body">
                    <div class="my-2 text-center">
                        <h2 class="text-secondary">Edit Sentinel</h2>
                        <p class="modelText">Enter your Sentinel Below Field</p>
                    </div>
                    <div class="">
                        <div class="mb-3">
                            <label for="editSentinelName" class="form-label ms-1">Name</label>
                            <input type="text" class="form-control form-control-lg" id="editSentinelName"
                                placeholder="Enter Name" v-model="form.name">
                            <span class="text-danger" v-if="!form.name">This field is required.</span>
                        </div>
                        <div class="d-flex justify-content-end">
                            <button type="button" id="EditCancelButton" class="modelCancelBtn"
                                data-bs-dismiss="modal">Cancel</button>
                            <button type="button" class="modelSaveBtn ms-2" @click="handleUpdate">Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { agentUpdate } from '../../services/agent_services';
import Toast from '../Toast';

export default {
    name: 'EditSentinel',
    props: {
        selectedSentinel: {
            type: Object,
            default: null
        }
    },
    emits: ['sentinelUpdated'],
    data() {
        return {
            form: {
                id: null,
                name: null
            }
        }
    },
    watch: {
        selectedSentinel(data) {
            if (!data) return
            this.form.id = data.id
            this.form.name = data.name
        }
    },
    methods: {
        async handleUpdate() {
            if (!this.form.name) return
            try {
                await agentUpdate({ aid: this.form.id, name: this.form.name })
                document.getElementById('EditCancelButton').click()
                this.$emit('sentinelUpdated')
                Toast.fire({ icon: 'success', title: 'Sentinel updated successfully' })
            } catch (error) {
                console.log(error)
                Toast.fire({ icon: 'error', title: 'Something went wrong' })
            }
        }
    }
}
</script>
