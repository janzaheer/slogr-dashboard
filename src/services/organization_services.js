import axios from "axios"
import store from "../store/store"

let base_url = import.meta.env.VITE_BASE_URL

const getToken = () => store.getters.getToken

let TOKEN = getToken();


let HEADERS = {
    "Authorization": `Bearer ${TOKEN}`
}

export async function getOrganization(){
    const resp = await axios.get(`${base_url}/api/organizations`, {headers: HEADERS})
    return resp.data
}

export async function editOrganization(payload){
    const resp = await axios.post(`${base_url}/api/edit-organization`,payload, {headers: HEADERS})
    return resp.data
}

export async function addOrganization(payload){
    const resp = await axios.post(`${base_url}/api/add-organization`,payload, {headers: HEADERS})
    return resp.data
}