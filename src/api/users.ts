import axios from 'axios'

export const createUser = (data: object) => {
    return axios.post(`/api/user/`, data)
}
export const getUser = (id: number) => {
    return axios.get(`/api/user/${id}`)
}

export const getUsers = () => {
    return axios.get(`/api/user/`)
}

export const deleteUser = (id: number) => {
    return axios.delete(`/api/user/${id}`)
}

export const updateUser = (id: number) => {
    return axios.put(`/api/user/${id}`)
}