import axiosInstance from 'services/AxiosInstance/axiosInstance'

const GET_LIST = '/lead'
const CREATE = '/lead/create'
const DELETE = '/lead/'
const UPDATE = '/lead/'
const GET_BY_ID = '/lead/'


export const createLead = (data: object) => {
    return axiosInstance.post(CREATE, data).then(data => data.data)
}
export const getLeadById = (id: number) => {
    return axiosInstance.get(`${GET_BY_ID}${id}`).then(data => data.data)
}

export const getLeads = () => {
    return axiosInstance.get(GET_LIST).then(data => data.data)
}

export const deleteLead = (id: number) => {
    return axiosInstance.delete(`${DELETE}${id}`).then(data => data.data)
}

export const updateLead = (id: number) => {
    return axiosInstance.put(`${UPDATE}${id}`).then(data => data.data)
}
//
// export const changeLeadStatus = (id: number) => {
//     return axiosInstance.put(`/lead/${id}`).then(data => data.data)
// }