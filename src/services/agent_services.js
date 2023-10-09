const base_url = import.meta.env.VITE_BASE_URL

const TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI1IiwianRpIjoiZjNjNDg1NmE2NWZlZWQwNGFhMWM0ODM1MTYxYzM5YmVmM2Q4NzBmZGJkNmNhZDcxMDUxNzg4N2NjMjQyMWVkNWNjYzBkODk0OTA2ODVmMjkiLCJpYXQiOjE2OTY4MTM4NDMuODg2OTAzLCJuYmYiOjE2OTY4MTM4NDMuODg2OTA4LCJleHAiOjE3Mjg0MzYyNDMuODY4Mjc4LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.i0cpx4WSsrCLtbBC2QtKuh-fzkT1v_1sRKwpSoP60VMgIiHZyZUFGFp9kH9i_quNP33U7KVOy9TZWklLyXM1kiSdfi-Jk0MUL31lCatAjQMvdCCsmJdWpbgaiV3stE2iETql6Uk9sAve5TUO-SK2CGxzjrJ5_rfb9DfdJ_Oo35uq6i1QdIvOAu7SScJX-ohFu-f0H4NBDJ_Gg7et2rip_GYXVhR_4tG282Gbi_npqgVviRTbM8OfYGcNYVblJQj4XqCrGM08sifgSKelaS5b9sG6nS1QwwCTWHp0QVBh6MwaRdxOFU2aTKNAMiLRzn9aHvEUpCkNLf0II5cCyOljisux0H6c6nSs6e8saHrHmbDCOg6y7tP9L-NHGAMjVizRwQE8VLLf3NByphuabNMGpZO-4R-2uyaxIELHZP7jlBpfns0r3vUYqJcvZRjKVBFZ-pUgBTBNGJaX9qIRq8fs6-EibWa-ZrNIOIrhotdxGLoqx5yGOTy7MHvATrO2s9qAwAv3FDUVZ2BPCOTa6d9FMjAxm80NPiJLV6YoHqkqPP6B8w4jLbpOtLgOPLHTH1d8kA3u13cPzL_pWNdJuxdIX6bSnn4CdPf6oB2jcPm3BYrx-uAQUeeczPimQ4SkUqY3qtrxDWH090I55PNRsDt7Bwx3msELm53zEuuTwe_d0-g"


export function agentList(page=1) {
    let data = fetch(`${base_url}/api/agents?page=${page}`, { 
        method: 'GET',
        headers: {'content_type': 'application/json', 'Authorization': `Bearer ${TOKEN}`}
    })
    if (data.ok) {
        const respJson = data.json()
        return respJson
    }
    return null
}
