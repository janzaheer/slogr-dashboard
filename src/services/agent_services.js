import axios from "axios"

let base_url = import.meta.env.VITE_BASE_URL

let TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMDNmYjU2MWM3YmNmMzM4MDM4ZjU4OTMyMjhkZWMyMzAwMDNmMjczNTI5ZjY3OGIzMWMyYTBkNzRjNTllOTlkMmEzODE2NTRiYTYxZWI2N2IiLCJpYXQiOjE3MDA3Mzk3ODQuNzE3NzA1LCJuYmYiOjE3MDA3Mzk3ODQuNzE3NzA5LCJleHAiOjE3MzIzNjIxODQuNzE1MjM2LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.YxOZ0AkmGwp30daEGOs3S5NH6WjPRbXyKLnsEnkSlhTOwFTBe0LaG9bdHTJWHNNrvWVm_iAWEAZHoYN57S22BpVXAYm7lXHoPZvqxcZ5ui0GatwY2OXHd-F0YRGL-RX232epdYZ9rMjZIPiahwXpckv_6x7RFLu7DS9dRfGcMGWOySB9t1oI7Su6N2HHtY7frxzXe1v1-a862MHsyVxdDUEDVLY1qsu7nHciUg4d1NlFA4n6ux3BZb8_ur4i7ZYOsV5mz8Fvv2XD3qDYrjBs2b4AdOnpXXlbW7nC9VcdvDePAFTlGpi-p4NBJ8mjtYv67l5VQEQAAmIKR18RHEyWBxRkIWm_MKindGiVjTkOfSemOS6pZQ0fJAe4zV_70l4RPy3dacwal5e_xxAHFTkQqxYODRLcQDxOHIKcMKbOW7u2TnImVM2bDvtx7LuXiUHfwCDZYkQKMBmdjb6UNZ2O_mMe0oZL9Dk35oeA6JPo2hqlkCA4Z5yOR6zynv06Rb4GRozmHOO4AN4ueWiTyQ5KUPYR4WFLpXPxQIL3hV2gPM-1EOEQa88pkLUOoAldMXFnZwOBjgI6W_ZTBZA5fZGtRg14LRWnNovwCQii-JbbnxjgYWn8sfDLzLva8_P8z852G-zpaVZIYn8XJA8pfibggSRiv3m9-Ip0QyjPllEabFQ"


let HEADERS = {
    "Authorization": `Bearer ${TOKEN}`
}

export async function agentList(page=1) {
    const resp = await axios.get(`${base_url}/api/agents?page=${page}`, {headers: HEADERS})
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