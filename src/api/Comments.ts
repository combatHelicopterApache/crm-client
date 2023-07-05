import axiosInstance from 'services/AxiosInstance/axiosInstance'

export const getComments = (id, route) => {
  return axiosInstance.get(`/comment/${route}/${id}`).then(data => data.data)
}

export const postComments = (id, route, data) => {
  return axiosInstance
    .post(`/comment/${route}/${id}`, data)
    .then(data => data.data)
}
