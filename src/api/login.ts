import axiosInstance from 'services/AxiosInstance/axiosInstance'

export const userLogin = (data: object) => {
  return axiosInstance.post(`/user/login`, data).then(data => data.data)
}
export const getUserByToken = params => {
  console.log(params, 'params')
  return axiosInstance.get(`/user/token`, { params }).then(data => data?.data)
}

export const userLogout = () => {
  return Promise.resolve()
  // return axiosInstance.post(`/user/logout`)
}
