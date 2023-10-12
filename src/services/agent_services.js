import axios from "axios"

let base_url = import.meta.env.VITE_BASE_URL

let TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiODA2NjU1ZGI1ZDVkZGM5OTVkNDc4OGRjMTE0ZDdjYmY2MjAxNjg4MTk5NDlhNmZmZDQ1ZjgxMDhhMWMyNTQzMzNjNDk3MmE5YzYwMWI2ZWIiLCJpYXQiOjE2OTcwMTc2NjEuMDAzODQ2LCJuYmYiOjE2OTcwMTc2NjEuMDAzODUyLCJleHAiOjE3Mjg2NDAwNjAuOTgxMTA4LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.LkiqtbhPm2n38mokxv0qir5WSRcIHmzQnF4tO3-iMOl2UVOtiU-jiCaSv2kHXa6JmD01utIiAySC1UkxP21RSvMkaHvQMM6kmqifig02b75SQR_btoAvJo5kw54ehg_s1XmOML3_Kb97FfBqsoShZpf_sMGdVkEhSLPv3vLHSelNmbnf2qY08cPvYx6SjmquNo8Nv9kJpDHgjjiLJ8Kar-XxmXAFryNnegyIQJSUoESkudpfayfad6W74n6OQxWYjoD0-4BB11X7yur8FSbwYzsHVALCqiYh-qqDlB99SLNKmNyBOL68IJ7qtVyT0s-KwbKfOGrbsJjxOAuU1uowJO_HemkHPLSfz775xFajnjMG2OhhUG48Glk9eu6j9dc3SY-4AUzAipuY2SbFpytr6XM0VZjtI4viACcxMd5s2lsTj2PE09zxMWK3PF-Fqz4-NKHFsp-jJgeXFYePvY8b8LuAVDC6ADno0PN_BSCS2IquCJ9dLam32sEpHsy6tsujrklvpplAPvImFQkv-3j7fzIU5WPQzwrNqmy1K5axMLE_N91c6C46aZL2WkvfV7mwjfFuE_Vkj54J5j-AiTfLQZituGnfuK-1liAi8CZ9YwW26ztC9wn21ffEDaso4b7pd1ACFQVfhJ2g1uzhOuMKYwPMkVeJAMq5sUTs95vgmJE"


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
