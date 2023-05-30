import axios from 'axios'

export const createGroup = (data: []) => {
    return axios.post(`/api/group/create`, data)
}
export const getGroupById = (id: string) => {
    return axios.get(`/api/group/${id}`)
}

export const getGroups = ( props:any) => {
    return axios.get(`/api/group?${props}`)
}

export const deleteGroup = (id: string) => {
    return axios.delete(`/api/group/${id}`)
}

export const updateGroup = (id: number, data: [] ) => {
    return axios.put(`/api/group/${id}`, data)
}
