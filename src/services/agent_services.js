import axios from "axios"
import store from "../store/store";

let base_url = import.meta.env.VITE_BASE_URL

const getToken = () => store.getters.getToken
// let TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiYzJjZjQzNDdkOTNkNDlkOTAwZTZiNTFmM2YzMmUwOWY0MWU5MWE1NzViZGRjOGMzMDMwYjhmY2VhZTQ1ZWMxMTVjNDNmMDg2ODViZDFlYTIiLCJpYXQiOjE3MDA3MjgzMzUuNzE5NjI3LCJuYmYiOjE3MDA3MjgzMzUuNzE5NjMyLCJleHAiOjE3MzIzNTA3MzUuNjc3Mzk5LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.iJKyeCL4pPxC4Uz0YzVjzsG2kB26vLnNTTaacREdS4IgGm1wp07P2RCVsc58N-OfI6UhfA_AEF9SPRVQOSvcQnN9oCklQcVw0AX0yjylcIwqp4x0M-wKxjUpG_jgSgoYd0mPMBGYiDsuKK0P-ozvC5HmTqtPGk7r8rLsJCzv7RCvQR4uU4P9_zcLQiprOLOyp77QZTUz4tvCqJzOICMcweVAc5tLiq5evyktQQ-84z1oAqEhDD72pWENHrAekefhtJhiDcBMC-r1QBpgvulC7r74NHEXW7cgcYNsCF698YFBTal9S8I2piiYPXkkz60j4hZ9oMkfmlNs4ROH66ILr4pLaQ7LOokr0e5lGNVE6ao_37cbvDj7NaCT4nQSsp8bi9mC7cXFG-lcl5Hbz0-aaTacGOGwt2kcp6llct4Q5rsYaIU5zNzhb_dHkVgSEq10dzgivQ6NTTbZCEariap-ODJPJfeqeKsWPc4fSsuiWf-tTtI6sIEyVH9VKECkXYK9kHO4pbsivFFdsk9Gyx-0v-wtU8YEOXrmPBpRoU2cf1ITBU9pDKKRmXDBihd9QmXOxnulvMt7uuq0EsAk57UiC4rjZp8vsgcAf_mq68s5KhS_LOlBo4LAJqKbsanKVJHAcdOndEXoKLsLcgLZb2blxxnDT7yMl_A5kcU9fBfswkc"
let TOKEN = getToken();

let HEADERS = {
    "Authorization": `Bearer ${TOKEN}`
}

export async function agentList(page=1) {
    const resp = await axios.get(`${base_url}/api/agents?page=${page}`, {headers: HEADERS})
    return resp.data
}

export async function agentListForm(size=1000) {
    const resp = await axios.get(`${base_url}/api/agents?size=${size}`, {headers: HEADERS})
    return resp.data
}

export async function createAgent(payload) {
    const resp = await axios.post(`${base_url}/api/add-agent`, payload, {headers: HEADERS})
    return resp.data
}

export async function agentUpdate(payload) {
    const resp = await axios.post(`${base_url}/api/edit-agent`, payload, {headers: HEADERS})
    return resp.data
}

export async function fetchClusters(id) {
    const resp = await axios.get(`${base_url}/api/cluster?group=${id}`, {headers: HEADERS})
    return resp.data
}

export async function fetchSessions(group_id) {
    const resp = await axios.get(`${base_url}/api/links?group=${group_id}`, {headers: HEADERS})
    return resp.data
}

export async function fetchAgentlinks(id) {
    const resp = await axios.get(`${base_url}/api/agentlinks?aid=${id}`, {headers: HEADERS})
    return resp.data
}

export async function fetchGroups() {
    const resp = await axios.get(`${base_url}/api/groups`, {headers: HEADERS})
    return resp.data
}
export async function fetchGroupData() {
    let resp = await axios.get(`${base_url}/api/groups`, {headers: HEADERS})
    const linkData = {};
    for (let i = 0; i < resp.data.length; i++) {
        const group = resp.data[i];
        try {
          const linksResp = await axios.get(
            `${base_url}/api/links?group=${group.id}`,
            { headers: HEADERS }
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
    let resp = await axios.get(`${base_url}/api/groups`, {headers: HEADERS})
    const clusterdata = {};
    for (let i = 0; i < resp.data.length; i++) {
        const group = resp.data[i];
        try {
          const linksResp = await axios.get(
            `${base_url}/api/cluster?group=${group.id}`,
            { headers: HEADERS }
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
    const resp = await axios.get(`${base_url}/api/get-ref-sessions?aid=` + id, {headers: HEADERS})
    return resp.data
}