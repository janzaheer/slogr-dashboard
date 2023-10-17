import axios from "axios"

let base_url = import.meta.env.VITE_BASE_URL

let TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMmQzMWMxYWFiNTE3YmQwMGM4YmRkMDhhYThmMjYxODE4MTcyZjA1YzA1YzY3Yjc0YTI3NWNmNTU3ZDNmZTRhMmViZWI0ZThhZjlkZjEzNjgiLCJpYXQiOjE2OTc0NjcxNDcuOTY0NDcsIm5iZiI6MTY5NzQ2NzE0Ny45NjQ0NzUsImV4cCI6MTcyOTA4OTU0Ny45Mzc3ODIsInN1YiI6IjEiLCJzY29wZXMiOltdfQ.vrDf3avPcL5W83JJYuiQcfzvmIx3jhhyQ1uTulvCZdZZH6wg0a8J4DsGj0L3bcD8yim9ksPGZZndWiG8gvJng6mdJOSXhM8tTbX_1s3maXSUQn_ZU4fImz4x3w31bLxqNHPTO6qoiDhMHOZQO1FNoErAwt5mXwa3pcDZAKRYgihYMl_UN07ymAhvyi1JKpkMqoAGCKlMdRrrJrXXUd199IfzVkcO5YSC90GDvmbcE9WIhZQHXa17V5-DxDDN3NN6KA4_hQ7KL4-FKsSSIQv44UNvKlIdre3RtynNi4YvZ81XSai2GJGuRmXTBSAFhYQA7CeTEEAjGMYLHEh6P5Gnazg6ok6Fp8ysgy3mwZprSvEPbBD8NJNWlLClP7DcyiWqsJNpDPGl8BiGl5noPRp6h5q5CJhO4MMBjSDLMpiVeAV9RrmKS8u0uAQYw-R9WvL93bg1Sp8yWtIco_xAGQr-E27yj1f5teifY_518Ywh4_Bl-pYjKxabFNszBeG3AtHdgL2jgIp0_e8w8j2s6luNnAsoAYQ5uXROXpoQmZxTGAOIy6yQuEAen8oAVuzxuoxk8QNwDxwkshEnNtsXFgRTJglTSvvv_ctHt9NA6P2VLv_MMpttA0PBVYtelV-07aRAQNioEDqXrGAdIUqbrw3IkKeOM8dOQry2ll9qHW0vuXw"


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

export async function fetchClusters() {
    const resp = await axios.get(`${base_url}/api/cluster`, {headers: HEADERS})
    return resp.data
}