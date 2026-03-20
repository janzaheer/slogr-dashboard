<template>
    <div>
        <button class="addBtn" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
            <i class="fa-solid fa-plus fa-lg"></i> Create New Alerts
        </button>

        <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
            aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Add New Alert</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
                            @click="resetForm"></button>
                    </div>
                    <div class="modal-body">
                        <div class="">
                            <div class="mb-3">
                                <div class="row g-2">
                                    <div class="col-md-6">
                                        <label class="form-label ms-1">Alert Name <span class="text-danger">*</span></label>
                                        <input type="text" class="form-control form-control-lg"
                                            :class="{ 'is-invalid': nameTouched && !name }"
                                            placeholder="Enter Alert Name" v-model="name" name="name"
                                            @blur="nameTouched = true" />
                                        <div class="invalid-feedback" v-if="nameTouched && !name">Alert Name is required.</div>
                                    </div>
                                    <div class="col-md-6">
                                        <label class="form-label ms-1">Email <span class="text-danger">*</span></label>
                                        <input type="email" class="form-control form-control-lg"
                                            :class="{ 'is-invalid': emailTouched && !email }"
                                            placeholder="Enter Email" v-model="email" name="email"
                                            @blur="emailTouched = true" />
                                        <div class="invalid-feedback" v-if="emailTouched && !email">Email is required.</div>
                                    </div>
                                </div>
                            </div>

                            <div class="mb-3">
                                <label class="form-label ms-1">Group <span class="text-danger">*</span></label>
                                <select v-model="selectedGroup" class="form-select form-select-lg"
                                    :class="{ 'is-invalid': groupTouched && !selectedGroup }"
                                    @blur="groupTouched = true">
                                    <option :value="null" disabled>Select Group</option>
                                    <option v-for="group in groupsLIst" :key="group.id" :value="group.id">
                                        {{ group.name }}
                                    </option>
                                </select>
                                <div class="invalid-feedback" v-if="groupTouched && !selectedGroup">Group is required.</div>
                            </div>

                            <div class="mb-3">
                                <label class="form-label ms-1">Monitoring Profile <span class="text-danger">*</span></label>
                                <select v-model="selectedProfile" class="form-select form-select-lg custom-select"
                                    :class="{ 'is-invalid': profileTouched && !selectedProfile }"
                                    @blur="profileTouched = true">
                                    <option :value="null" disabled>Select Profile</option>
                                    <option v-for="profile in profiles" :key="profile.id" :value="profile.id">
                                        {{ profile.name }}
                                    </option>
                                </select>
                                <div class="invalid-feedback" v-if="profileTouched && !selectedProfile">Monitoring Profile is required.</div>
                            </div>

                            <div class="mb-3">
                                <div class="row g-2">
                                    <div class="col-md-6">
                                        <label class="form-label ms-1">SLA Breach Minutes <span class="text-danger">*</span></label>
                                        <input type="number" class="form-control form-control-lg"
                                            :class="{ 'is-invalid': slaMinutesTouched && sla_breach_minutes === '' }"
                                            v-model="sla_breach_minutes" placeholder="Enter SLA Breach Minutes"
                                            name="sla_breach_minutes" @blur="slaMinutesTouched = true" />
                                        <div class="invalid-feedback" v-if="slaMinutesTouched && sla_breach_minutes === ''">SLA Breach Minutes is required.</div>
                                    </div>
                                    <div class="col-md-6">
                                        <label class="form-label ms-1">SLA Breach Tests <span class="text-danger">*</span></label>
                                        <input type="number" class="form-control form-control-lg"
                                            :class="{ 'is-invalid': slaTestsTouched && sla_breach_tests === '' }"
                                            v-model="sla_breach_tests" placeholder="Enter SLA Breach Tests"
                                            name="sla_breach_tests" @blur="slaTestsTouched = true" />
                                        <div class="invalid-feedback" v-if="slaTestsTouched && sla_breach_tests === ''">SLA Breach Tests is required.</div>
                                    </div>
                                    <div class="col-md-6">
                                        <label class="form-label ms-1">Tests No-run <span class="text-danger">*</span></label>
                                        <input type="number" class="form-control form-control-lg"
                                            :class="{ 'is-invalid': testsNorunTouched && tests_norun === '' }"
                                            v-model="tests_norun" placeholder="Enter Tests No-run"
                                            name="tests_norun" @blur="testsNorunTouched = true" />
                                        <div class="invalid-feedback" v-if="testsNorunTouched && tests_norun === ''">Tests No-run is required.</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <div class="d-flex justify-content-end">
                            <button type="button" class="modelCancelBtn" data-bs-dismiss="modal" id="alertCancelBtn"
                                @click="resetForm">Cancel</button>
                            <button type="button" class="modelSaveBtn ms-2"
                                :disabled="!isFormValid"
                                @click="handleAddAlerts">Create</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ProfileListForm } from '../../../services/monitor_profile_Services';
import { GroupListForm } from '../../../services/group_services';
import { createAlert } from '../../../services/alerts_services';
import Toast from '../../Toast';

export default {
    name: 'AddAlerts',
    props: {
        handleAllAlerts: Function
    },
    computed: {
        isFormValid() {
            return this.name && this.email && this.selectedGroup && this.selectedProfile &&
                this.sla_breach_minutes !== '' && this.sla_breach_tests !== '' && this.tests_norun !== ''
        }
    },
    data() {
        return {
            name: '',
            email: '',
            sla_breach_minutes: '',
            sla_breach_tests: '',
            tests_norun: '',
            selectedProfile: null,
            profiles: [],
            selectedGroup: null,
            groupsLIst: [],
            nameTouched: false,
            emailTouched: false,
            groupTouched: false,
            profileTouched: false,
            slaMinutesTouched: false,
            slaTestsTouched: false,
            testsNorunTouched: false,
        }
    },
    async mounted() {
        await this.monitor()
        await this.groups()
    },
    methods: {
        resetForm() {
            this.name = ''
            this.email = ''
            this.selectedProfile = null
            this.selectedGroup = null
            this.sla_breach_minutes = ''
            this.sla_breach_tests = ''
            this.tests_norun = ''
            this.nameTouched = false
            this.emailTouched = false
            this.groupTouched = false
            this.profileTouched = false
            this.slaMinutesTouched = false
            this.slaTestsTouched = false
            this.testsNorunTouched = false
        },
        async handleAddAlerts() {
            const payload = {
                name: this.name,
                email: this.email,
                profile: this.selectedProfile,
                group: this.selectedGroup,
                sla_breach_minutes: this.sla_breach_minutes,
                sla_breach_tests: this.sla_breach_tests,
                tests_norun: this.tests_norun
            }
            try {
                await createAlert(payload)
                this.handleAllAlerts()
                Toast.fire({ icon: 'success', title: 'Alert added successfully' })
                document.getElementById('alertCancelBtn').click()
                this.resetForm()
            } catch (error) {
                console.log(error)
                Toast.fire({ icon: 'error', title: 'Something went wrong' })
            }
        },
        async monitor(size = 1000) {
            try {
                let res = await ProfileListForm(size)
                this.profiles = res.profiles
            } catch (error) {
                console.log(error)
            }
        },
        async groups(size = 1000) {
            try {
                let res = await GroupListForm(size)
                this.groupsLIst = res
            } catch (error) {
                console.log(error)
            }
        },
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
