import axios from "axios"

let base_url = import.meta.env.VITE_BASE_URL

let TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiYzJjZjQzNDdkOTNkNDlkOTAwZTZiNTFmM2YzMmUwOWY0MWU5MWE1NzViZGRjOGMzMDMwYjhmY2VhZTQ1ZWMxMTVjNDNmMDg2ODViZDFlYTIiLCJpYXQiOjE3MDA3MjgzMzUuNzE5NjI3LCJuYmYiOjE3MDA3MjgzMzUuNzE5NjMyLCJleHAiOjE3MzIzNTA3MzUuNjc3Mzk5LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.iJKyeCL4pPxC4Uz0YzVjzsG2kB26vLnNTTaacREdS4IgGm1wp07P2RCVsc58N-OfI6UhfA_AEF9SPRVQOSvcQnN9oCklQcVw0AX0yjylcIwqp4x0M-wKxjUpG_jgSgoYd0mPMBGYiDsuKK0P-ozvC5HmTqtPGk7r8rLsJCzv7RCvQR4uU4P9_zcLQiprOLOyp77QZTUz4tvCqJzOICMcweVAc5tLiq5evyktQQ-84z1oAqEhDD72pWENHrAekefhtJhiDcBMC-r1QBpgvulC7r74NHEXW7cgcYNsCF698YFBTal9S8I2piiYPXkkz60j4hZ9oMkfmlNs4ROH66ILr4pLaQ7LOokr0e5lGNVE6ao_37cbvDj7NaCT4nQSsp8bi9mC7cXFG-lcl5Hbz0-aaTacGOGwt2kcp6llct4Q5rsYaIU5zNzhb_dHkVgSEq10dzgivQ6NTTbZCEariap-ODJPJfeqeKsWPc4fSsuiWf-tTtI6sIEyVH9VKECkXYK9kHO4pbsivFFdsk9Gyx-0v-wtU8YEOXrmPBpRoU2cf1ITBU9pDKKRmXDBihd9QmXOxnulvMt7uuq0EsAk57UiC4rjZp8vsgcAf_mq68s5KhS_LOlBo4LAJqKbsanKVJHAcdOndEXoKLsLcgLZb2blxxnDT7yMl_A5kcU9fBfswkc"


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