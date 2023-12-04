import axios from "axios"
import store from "../store/store";

let base_url = import.meta.env.VITE_BASE_URL

axios.interceptors.request.use(
  (config) => {
    config.headers[
      "Authorization"
    ] = `Bearer ${store.getters.getToken}`;
    return Promise.resolve(config);
  },
  (error) => {
    return Promise.reject(error);
  }
);

export async function agentList(page=1) {
    const resp = await axios.get(`${base_url}/api/agents?page=${page}`)
    return resp.data
}

export async function agentListForm(size=1000) {
    const resp = await axios.get(`${base_url}/api/agents?size=${size}`)
    return resp.data
}

export async function createAgent(payload) {
    const resp = await axios.post(`${base_url}/api/add-agent`, payload)
    return resp.data
}

export async function agentUpdate(payload) {
    const resp = await axios.post(`${base_url}/api/edit-agent`, payload)
    return resp.data
}

export async function fetchClusters(id) {
    const resp = await axios.get(`${base_url}/api/cluster?group=${id}`)
    return resp.data
}

export async function fetchSessions(group_id) {
    const resp = await axios.get(`${base_url}/api/links?group=${group_id}`)
    return resp.data
}

export async function fetchAgentlinks(id) {
    const resp = await axios.get(`${base_url}/api/agentlinks?aid=${id}`)
    return resp.data
}

export async function fetchGroups() {
    const resp = await axios.get(`${base_url}/api/groups`)
    return resp.data
}
export async function fetchGroupData() {
    let resp = await axios.get(`${base_url}/api/groups`)
    const linkData = {};
    for (let i = 0; i < resp.data.length; i++) {
        const group = resp.data[i];
        try {
          const linksResp = await axios.get(
            `${base_url}/api/links?group=${group.id}&profiles=true`
          );
          linkData[group.id] = linksResp.data;
        } catch (linksError) {
          console.error('Error fetching links:', linksError);
          throw linksError;
        }
      }

    return linkData
}

export async function fetchClustersData() {
    let resp = await axios.get(`${base_url}/api/groups`)
    const clusterdata = {};
    for (let i = 0; i < resp.data.length; i++) {
        const group = resp.data[i];
        try {
          const linksResp = await axios.get(
            `${base_url}/api/cluster?group=${group.id}`
          );
          clusterdata[group.id] = linksResp.data;
        } catch (linksError) {
          console.error('Error fetching links:', linksError);
          throw linksError;
        }
      }

    return clusterdata
}
export async function agentRefSessions(id){
    const resp = await axios.get(`${base_url}/api/get-ref-sessions?aid=` + id)
    return resp.data
}