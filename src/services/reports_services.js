import axios from "axios";

let base_url = import.meta.env.VITE_BASE_URL

export async function ReportsList() {
    const resp = await axios.get(`${base_url}/api/reports`)
    return resp.data
}

export async function AddReports(payload) {
    const resp = await axios.post(`${base_url}/api/add-report`,payload)
    return resp.data
}

export async function ReportDetail(id) {
    const resp = await axios.get(`${base_url}/api/get-report/${id}`)
    return resp.data
}

export async function UpdateReport(payload) {
    const resp = await axios.post(`${base_url}/api/edit-report`,payload)
    return resp.data
}