import axios from "axios"
import store from "../store/store"

let base_url = import.meta.env.VITE_BASE_URL

const getToken = () => store.getters.getToken

let TOKEN = getToken();

let HEADERS = {
    "Authorization": `Bearer ${TOKEN}`
}

export async function sessionsList(page=1, size=10) {
    const resp = await axios.get(`${base_url}/api/sessions?page=${page}&size=${size}`, {headers: HEADERS})
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