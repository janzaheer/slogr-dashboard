import axios from "axios"

const base_url = import.meta.env.VITE_BASE_URL

const TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI3IiwianRpIjoiMjZlZmVkZjk1MzI1NGI0YWRiN2FiYWExMTA5MjQzYjUxNWQ0MjY4NTRlYTAxZGUyNDE5MTliM2FlYzE4MzNjMDhiY2I0MTQxNTMzN2EwZjIiLCJpYXQiOjE2OTY4MzQxNDUuNTQ5NzkyLCJuYmYiOjE2OTY4MzQxNDUuNTQ5Nzk4LCJleHAiOjE3Mjg0NTY1NDUuNTM3ODQ2LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.YoBZ-Xj8O7rmHtsHMO_5wG6NVpAEJL4N0UVxk6LNx2V0kFVyMJsxgHXD4Bc8C2kNDo7qAHMkL_-Ls0J5sDR7WTJN1xOddQgk-omTNze_bkxhkjDnll7QF0_2zdCALfFxRV8XeUzTFGLc3Tp03aIjZ6dMgZsD2vcg4EHWLInaxOnfVvSjVEDlRSYv4MbRlgSS5dB9RlOm5zX4fBY0BxPPJ2xnEQkJzHvGHlyOnrudpfC3Q7WZvkwtVvZhd3a21OLXZT1u6l_QmWYC6DD9lM6uUO_Hve_YVEsK9DzYrkQiWLsOwsH2-GQSVym5q8iP8E1nCeV8Gp-wY9E4BzADlfOtcbyL034GKRhdYNyh4tfbni_Nn_YLGA31WTBeo6U0BAN3aNUnM5MqYP5DU49mthJ9zmx3v2E60VV6V5WuLiWEq2Cfz7-Q4rur3L6OvPizy7VBVAMGcLYGjzQ5Br4s63rsoK5QwhnqTartXXEC_iFGP5gw2ogANQCeu1ioDMIq2MGz2u06sCj4hRY_QQG0JqfVT2EMTVrmzMvTeKGc3k88MrhXg0T0M6KQrfxLhC9UXR2s-r6xsV4DzST5YGvzA8ZVWWDey8eoM0vpWsfQzinzs1ebLK5QJr91iMSitttZClslPIp7D43dOYwUcS2XYORItB12RU7toUdy2OTv7KV_nMs"


export async function agentList(page=1) {
    const resp = await axios.get(`${base_url}/api/agents?page=${page}`, {
        'content_type': 'application/json', 'Authorization': `Bearer ${TOKEN}`
    })
    return resp.data
}

export async function createAgent(payload) {
    const resp = await axios.post(`${base_url}/api/add-agents`, payload, {
        'content_type': 'application/json', 'Authorization': `Bearer ${TOKEN}`
    })
    return resp.data
}
