import axios from "axios"
import store from "../store/store"

let base_url = import.meta.env.VITE_BASE_URL

const getToken = () => store.getters.getToken

let TOKEN = getToken();

let HEADERS = {
    "Authorization": `Bearer ${TOKEN}`
}

export async function getAlerts(){
    const resp = await axios.get(`${base_url}/api/alerts`, {headers: HEADERS})
    return resp.data
}

export async function createAlert(payload) {
    const resp = await axios.post(`${base_url}/api/add-alert`, payload, {headers: HEADERS})
    return resp.data
}

export async function updateAlert(payload) {
    const resp = await axios.post(`${base_url}/api/edit-alert`, payload, {headers: HEADERS})
    return resp.data
}

export async function deleteAlert(id) {
    const resp = await axios.post(`${base_url}/api/delete-alert`, {id: id}, {headers: HEADERS})
    return resp.data
}