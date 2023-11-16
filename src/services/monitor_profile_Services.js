import axios from "axios"

let base_url = import.meta.env.VITE_BASE_URL

let TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiODdiMjNjYTlhZmJkZDRhZWY5ZjQ4NmM4MzQwYzgxNTJjMzQ1MGM3MzJhOGFkMjQ4MWNlZTBiNGQ0OTNmYzM2YTIyMzY2NzE5MGVjYWZhZTUiLCJpYXQiOjE2OTc0MTUxMzEuOTQyMTAyLCJuYmYiOjE2OTc0MTUxMzEuOTQyMTA3LCJleHAiOjE3MjkwMzc1MzEuODk4OTc0LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.jpzcPuDShzJ0XziTSq1SxjtWsJPPU4Q3gM9uxATvKMKELPThEZKAzkknmhfwiE0B6bjwqU2Ne0AH4z5XY9cO2Cuj1c9cHtLFXj0fqS3mvssBY0OosOTYyybzc0QUqURHUTc6uY2MGbseR6JiBnnjSHRJpB1K-SUgAuFfJFQQDI35_N-5FYSaUclQYDduJr2s2JjWcuMXdO9tDz_BWW0Tj-QNGW-2JNxAJu8c5YE32S7Q6bq3ytPwWm31fBZQskNfoIwny8T1AM5eab4BIzSPAiOhsEEu3_JjHH12BSlt3sHFeYIJ9BMtoRJ5tzjSZtq5wRhVgWlYUB1SS1_teXQ5c8AJWMV0MMGGNwxegzefVa2DbZ-N-lDScttq28EuKx9JcKF3llpMm19zKtGTQaZ9c54iBmW3WRpfLLJxi8yjWC5pvkEExyDUdjrlT7lmvv4MB-LP7QtNATg2NqnzQ9GMoQjTpR3TKyJiMPIdKHe2FjmmVTB1nALyalKYx4IrnOKsCWbvEG6kgkBksFtXkACdAsTKF2TNsgWj392RJqchLpwYbAru5JRW77LiWN8ovhtUqHy5TdnPK8VBwinG1dQWKG6aDp0_3s6_yr5SPx_wne4KCOg4uNC4YnoKT1CVPuPLu_u_cj0ZH2zgTUid57D4uU3-JKqHqS2kFYxKiC0xMTE"


let HEADERS = {
    "Authorization": `Bearer ${TOKEN}`
}

export async function ProfileList() {
    const resp = await axios.get(`${base_url}/api/profiles`, {headers: HEADERS})
    return resp.data
}

export async function createMonitor(payload) {
    const resp = await axios.post(`${base_url}/api/add-profile`, payload, {headers: HEADERS})
    return resp.data
}

export async function deleteMonitor(id) {
    const resp = await axios.post(`${base_url}/api/delete-profile`, {id: id}, {headers: HEADERS})
    return resp.data
}