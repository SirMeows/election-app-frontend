import { SERVER_URL } from "../settings.js"

export const getAllParties = async () => await fetch(`${SERVER_URL}parties`, makeOptions("get")).then(res => handleErrors(res)).then(res => parseJson(res))
export const getCandidatesForParty = async (id) => await fetch(`${SERVER_URL}parties/${id}/candidates`, makeOptions("get")).then(res => handleErrors(res)).then(res => parseJson(res))
export const getAllCandidates = async () => await fetch(`${SERVER_URL}candidates`, makeOptions("get")).then(res => handleErrors(res)).then(res => parseJson(res))
export const deleteCandidateRequest = async (id) => await fetch(`${SERVER_URL}candidates/${id}`, makeOptions("delete")).then(res => handleErrors(res))
export const addCandidateRequest = async (id, candidateDto) => await fetch(`${SERVER_URL}parties/${id}/candidates`, makeOptions("post", candidateDto)).then(res => handleErrors(res)).then(res => parseJson(res))

export function makeOptions(method, body, addToken) {
    const opts = {
        method: method,
        headers: {
            "Content-type": "application/json",
            "Accept": "application/json"
        }
    }
    if (body) opts.body = JSON.stringify(body) // Add optional body
    if (addToken) {
        let jwt = sessionStorage.getItem("token") // Authentication
        if (jwt) opts.headers.Authorization = `Bearer ${jwt}`
    }
    return opts
}


export async function handleErrors(res) {
    if (!res.ok) {
        const errorResponse = await res.json()
        const error = new Error(errorResponse.error)
        throw error
    }
    return res
}

export async function parseJson(res){
    return res.json()
}