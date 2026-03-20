<template>
  <div>
    <button class="addBtn" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
      <i class="fa-solid fa-plus fa-lg"></i> Add New Sessions
    </button>

    <div
      class="modal fade"
      id="staticBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Add New Session</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              @click="resetForm"
            ></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="handleAddSessions">
              <div class="">
                <div class="mb-3">
                  <label class="form-label ms-1">From <span class="text-danger">*</span></label>
                  <select
                    v-model="selectedAgentId"
                    class="form-select form-select-lg custom-select"
                    :class="{ 'is-invalid': fromTouched && !selectedAgentId }"
                    @blur="fromTouched = true"
                  >
                    <option :value="null" disabled>Please select sender sentinel</option>
                    <option v-for="agent in agents" :key="agent.id" :value="agent.id">
                      {{ agent.name }}
                    </option>
                  </select>
                  <div class="invalid-feedback" v-if="fromTouched && !selectedAgentId">
                    From is required.
                  </div>
                </div>

                <div class="mb-3">
                  <label class="form-label ms-1">To <span class="text-danger">*</span></label>
                  <select
                    v-model="selectedClientId"
                    class="form-select form-select-lg"
                    :class="{ 'is-invalid': toTouched && !selectedClientId }"
                    @blur="toTouched = true"
                  >
                    <option :value="null" disabled>Please select receiver sentinel</option>
                    <option v-for="client in clients" :key="client.id" :value="client.id">
                      {{ client.name }}
                    </option>
                  </select>
                  <div class="invalid-feedback" v-if="toTouched && !selectedClientId">
                    To is required.
                  </div>
                </div>

                <RouterLink to="#" @click="toggleAdvancedFields" class="ms-2 mt-2">
                  {{ showAdvancedFields ? "Hide Advanced -" : "Show Advanced +" }}
                </RouterLink>

                <div v-if="showAdvancedFields">
                  <div class="mb-3 mt-3">
                    <label class="form-label ms-1">Monitoring Profile <span class="text-danger">*</span></label>
                    <select
                      v-model="selectedProfile"
                      @change="updateSelectedProfileId"
                      @blur="monitoringProfileTouched = true"
                      class="form-select form-select-lg custom-select"
                      :class="{ 'is-invalid': monitoringProfileTouched && selectedProfile === null }"
                    >
                      <option :value="null" disabled>Select profile</option>
                      <option :value="0">Default</option>
                      <option v-for="profile in profiles" :key="profile.id" :value="profile">
                        {{ profile.name }}
                      </option>
                    </select>
                    <div class="invalid-feedback" v-if="monitoringProfileTouched && selectedProfile === null">
                      Monitoring Profile is required.
                    </div>
                  </div>

                  <div class="mb-3">
                    <div class="row g-2">
                      <div class="col-md-12">
                        <label class="form-label ms-1">Schedule <span class="text-danger">*</span></label>
                        <input
                          type="number"
                          class="form-control form-control-lg"
                          placeholder="Enter Schedule"
                          v-model="form.schedule"
                          name="schedule"
                        />
                      </div>
                      <div class="col-md-6">
                        <label class="form-label ms-1">Count <span class="text-danger">*</span></label>
                        <input
                          type="number"
                          class="form-control form-control-lg"
                          placeholder="Enter Count"
                          v-model="form.count"
                          name="count"
                        />
                      </div>
                      <div class="col-md-6">
                        <label class="form-label ms-1">Number Of Packets <span class="text-danger">*</span></label>
                        <input
                          type="number"
                          class="form-control form-control-lg"
                          placeholder="Enter number of packets"
                          v-model="form.n_packets"
                          name="n_packets"
                        />
                      </div>
                      <div class="col-md-6">
                        <label class="form-label ms-1">Packet Interval <span class="text-danger">*</span></label>
                        <input
                          type="number"
                          class="form-control form-control-lg"
                          placeholder="Enter packet interval"
                          v-model="form.p_interval"
                          name="p_interval"
                        />
                      </div>
                      <div class="col-md-6">
                        <label class="form-label ms-1">Wait Time <span class="text-danger">*</span></label>
                        <input
                          type="number"
                          class="form-control form-control-lg"
                          placeholder="Enter wait time"
                          v-model="form.w_time"
                          name="w_time"
                        />
                      </div>
                      <div class="col-md-6">
                        <label class="form-label ms-1">DSCP <span class="text-danger">*</span></label>
                        <input
                          type="number"
                          class="form-control form-control-lg"
                          placeholder="Enter DSCP"
                          v-model="form.dscp"
                          name="dscp"
                        />
                      </div>
                      <div class="col-md-6">
                        <label class="form-label ms-1">Packet Size <span class="text-danger">*</span></label>
                        <input
                          type="number"
                          class="form-control form-control-lg"
                          placeholder="Enter packet size"
                          v-model="form.p_size"
                          name="p_size"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <hr />
              <div class="d-flex justify-content-end">
                <button
                  type="button"
                  class="modelCancelBtn"
                  id="EditCancelButton"
                  data-bs-dismiss="modal"
                  @click="resetForm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  class="modelSaveBtn ms-2"
                  :disabled="!selectedAgentId || !selectedClientId"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { agentListForm } from "../../services/agent_services";
import { ProfileListForm } from "../../services/monitor_profile_Services";
import { addSessions } from "../../services/sessions_services";
import { RouterLink } from 'vue-router';
import Toast from "../Toast";

export default {
  name: "AddSessions",
  components: {},
  props: {
    getSessions: Function,
  },
  data() {
    return {
      form: {
        schedule: 600,
        count: 0,
        n_packets: 0,
        p_interval: 0,
        w_time: 0,
        dscp: 0,
        p_size: 0,
      },
      selectedProfileId: 0,
      selectedProfile: 0,
      profiles: [],
      selectedAgentId: null,
      agents: [],
      selectedClientId: null,
      clients: [],
      showAdvancedFields: false,
      fromTouched: false,
      toTouched: false,
      monitoringProfileTouched: false,
    };
  },
  async mounted() {
    await this.monitor();
    await this.server();
  },
  methods: {
    resetForm() {
      this.form = {
        schedule: 600,
        count: 0,
        n_packets: 0,
        p_interval: 0,
        w_time: 0,
        dscp: 0,
        p_size: 0,
      };
      this.selectedAgentId = null;
      this.selectedClientId = null;
      this.selectedProfileId = 0;
      this.selectedProfile = 0;
      this.showAdvancedFields = false;
      this.fromTouched = false;
      this.toTouched = false;
      this.monitoringProfileTouched = false;
    },
    async handleAddSessions(e) {
      e.preventDefault();
      const payload = {
        serve: this.selectedAgentId,
        client: this.selectedClientId,
        profile: this.selectedProfileId,
        schedule: this.form.schedule,
        count: this.form.count,
        n_packets: this.form.n_packets,
        p_interval: this.form.p_interval,
        w_time: this.form.w_time,
        dscp: this.form.dscp,
        p_size: this.form.p_size,
        edit: false,
      };
      try {
        await addSessions(payload);
        this.resetForm();
        Toast.fire({ icon: "success", title: 'Session added successfully' });
        await this.getSessions();
        document.getElementById("EditCancelButton").click();
      } catch (error) {
        if (error.response.status === 400) {
          Toast.fire({ icon: "error", title: error.response.data.error });
        } else if (error.response.status === 401) {
          Toast.fire({ icon: "warning", title: error.response.data.Unauthorized });
        } else {
          console.log("error", error);
        }
      }
    },
    async monitor(size = 1000) {
      try {
        let res = await ProfileListForm(size);
        this.profiles = res.profiles;
      } catch (error) {
        console.log(error);
      }
    },
    updateSelectedProfileId() {
      this.selectedProfileId = this.selectedProfile.id;
      this.form.count = this.selectedProfile.count;
      this.form.n_packets = this.selectedProfile.n_packets;
      this.form.p_interval = this.selectedProfile.p_interval;
      this.form.w_time = this.selectedProfile.w_time;
      this.form.dscp = this.selectedProfile.dscp;
      this.form.p_size = this.selectedProfile.p_size;
    },
    async server(size = 1000) {
      try {
        let res = await agentListForm(size);
        this.agents = res.data.agents;
        this.clients = res.data.agents;
      } catch (error) {
        console.log(error);
      }
    },
    toggleAdvancedFields() {
      this.showAdvancedFields = !this.showAdvancedFields;
    },
  },
};
</script>

<style scoped>
.custom-select {
  max-height: 100px;
  overflow: scroll;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  pointer-events: none;
}
</style>
