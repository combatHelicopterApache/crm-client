import axiosInstance from 'services/AxiosInstance/axiosInstance'

export const createUser = (data: object) => {
  return axiosInstance.post(`/user/create`, data)
}
export const getUser = (id: number) => {
  return axiosInstance.get(`/user/${id}`).then(data => data?.data)
}

export const getUsers = params => {
  return axiosInstance.get(`/user`, { params }).then(data => data?.data)
}

export const deleteUser = (id: number) => {
  return axiosInstance.delete(`/user/${id}`)
}

export const updateUser = (id: number, data) => {
  return axiosInstance.put(`/user/${id}`, data)
}

export const getUserSAUsers = () => {
  return axiosInstance.get(`/user/admin-user`).then(data => data?.data)
}

export const getUserByToken = params => {
  return axiosInstance.get(`/user/token`, { params }).then(data => data?.data)
}

export const getUsersList = () => {
  return axiosInstance.get(`user/user-list`).then(data => data?.data)
}
