import axios from "axios"
import store from "../store/store"

let base_url = import.meta.env.VITE_BASE_URL

const getToken = () => store.getters.getToken

let TOKEN = getToken();

let HEADERS = {
    "Authorization": `Bearer ${TOKEN}`
}

export async function sessionsList(page=1, size=10, search='') {
    let url = `${base_url}/api/sessions?page=${page}&size=${size}`
    if (search) url += `&s_name=${search}`
    const resp = await axios.get(url, {headers: HEADERS})
    return resp.data
}

export async function getSessionsResults(id, page=1) {
    const resp = await axios.get(`${base_url}/api/analytics?sid=${id}&page=${page}`, {headers: HEADERS})
    return resp.data
}

export async function addSessions(payload){
    const resp = await axios.post(`${base_url}/api/add-session`, payload, {headers: HEADERS})
    return resp.data
}

export async function updateSessions(payload){
    const resp = await axios.post(`${base_url}/api/add-session`, payload, {headers: HEADERS})
    return resp.data
}

export async function deleteSessions(payload){
    const resp = await axios.post(`${base_url}/api/delete-session`, payload, {headers: HEADERS})
    return resp.data
}

export async function getSessionsNames() {
    const resp = await axios.get(`${base_url}/api/sessionnames`, {headers: HEADERS})
    return resp.data
}
export async function getTraceRoutesList(page=1, size=50) {
    const resp = await axios.get(`${base_url}/api/traceroutes?page=${page}&size=${size}`, {headers: HEADERS})
    return resp.data
}
export async function getTracerouteBySession(id) {
    const resp = await axios.get(`${base_url}/api/traceroutes/${id}`, {headers: HEADERS})
    return resp.data
}
