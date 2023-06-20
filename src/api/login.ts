import axiosInstance from 'services/AxiosInstance/axiosInstance'

export const userLogin = (data: object) => {
  return axiosInstance.post(`/user/login`, data).then(data => data.data)
}

export const loginToCompany = (data: object) => {
  return axiosInstance
    .post(`/user/login-to-company`, data)
    .then(data => data.data)
}

export const logoutFromCompany = () => {
  return axiosInstance.post(`/user/back-to-admin`).then(data => data.data)
}

export const getUserByToken = params => {
  return axiosInstance.get(`/user/token`, { params }).then(data => data?.data)
}

export const userLogout = () => {
  return Promise.resolve()
  // return axiosInstance.post(`/user/logout`)
}
