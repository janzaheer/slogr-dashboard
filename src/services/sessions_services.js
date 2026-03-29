import axios from "axios"
import store from "../store/store"

let base_url = import.meta.env.VITE_BASE_URL

const getToken = () => store.getters.getToken

export async function sessionsList(page=1, search='') {
    let url = `${base_url}/api/sessions?page=${page}`
    if (search) url += `&s_name=${search}`
    const resp = await axios.get(url, {headers: { "Authorization": `Bearer ${getToken()}` }})
    return resp.data
}

export async function getSessionsResults(id, page=1) {
    const resp = await axios.get(`${base_url}/api/analytics?sid=${id}&page=${page}`, {headers: { "Authorization": `Bearer ${getToken()}` }})
    return resp.data
}

export async function addSessions(payload){
    const resp = await axios.post(`${base_url}/api/add-session`, payload, {headers: { "Authorization": `Bearer ${getToken()}` }})
    return resp.data
}

export async function updateSessions(payload){
    const resp = await axios.post(`${base_url}/api/add-session`, payload, {headers: { "Authorization": `Bearer ${getToken()}` }})
    return resp.data
}

export async function deleteSessions(payload){
    const resp = await axios.post(`${base_url}/api/delete-session`, payload, {headers: { "Authorization": `Bearer ${getToken()}` }})
    return resp.data
}

export async function getSessionsNames() {
    const resp = await axios.get(`${base_url}/api/sessionnames`, {headers: { "Authorization": `Bearer ${getToken()}` }})
    return resp.data
}

export async function getTraceRoutesList(page=1, size=50) {
    const resp = await axios.get(`${base_url}/api/traceroutes?page=${page}&size=${size}`, {headers: { "Authorization": `Bearer ${getToken()}` }})
    return resp.data
}

export async function getTracerouteBySession(id, dateFrom = '', dateTo = '') {
    const resp = await axios.get(
        `${base_url}/api/traceroutes/${id}`,
        {
            params: {
                session_id: id,
                asn: '',
                address: '',
                min_rtt: '',
                max_rtt: '',
                date_from: dateFrom,
                date_to: dateTo
            },
            headers: { "Authorization": `Bearer ${getToken()}` }
        }
    )
    return resp.data
}
