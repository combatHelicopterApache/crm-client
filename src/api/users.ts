import axiosInstance from 'services/AxiosInstance/axiosInstance'

export const createUser = (data: object) => {
  return axiosInstance.post(`/api/user/`, data)
}
export const getUser = (id: number) => {
  return axiosInstance.get(`/api/user/${id}`)
}

export const getUsers = () => {
  return axiosInstance.get(`/api/user/`)
}

export const deleteUser = (id: number) => {
  return axiosInstance.delete(`/api/user/${id}`)
}

export const updateUser = (id: number) => {
  return axiosInstance.put(`/api/user/${id}`)
}
