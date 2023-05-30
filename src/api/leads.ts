import axios from 'axios'

export const createLead = (data: object) => {
    return axios.post(`/api/lead/create`, data)
}
export const getLeadById = (id: number) => {
    return axios.get(`/api/lead/${id}`)
}

export const getLeads = () => {
    return axios.get(`/api/lead/`)
}

export const deleteLead = (id: number) => {
    return axios.delete(`/api/lead/${id}`)
}

export const updateLead = (id: number) => {
    return axios.put(`/api/lead/${id}`)
}

export const changeLeadStatus = (id: number) => {
    return axios.put(`/api/lead/${id}`)
}