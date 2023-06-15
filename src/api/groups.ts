import axios from 'axios'

export const createGroup = (data: []) => {
  return axios.post(`/api/v1/group/create`, data)
}
export const getGroupById = (id: string) => {
  return axios.get(`/api/v1/group/${id}`)
}

export const getGroups = (props: any) => {
  return axios.get(`/api/v1/group?${props}`)
}

export const deleteGroup = (id: string) => {
  return axios.delete(`/api/v1/group/${id}`)
}

export const updateGroup = (id: number, data: []) => {
  return axios.put(`/api/v1/group/${id}`, data)
}
