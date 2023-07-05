import axiosInstance from 'services/AxiosInstance/axiosInstance'

export const getStatus = () => {
  return axiosInstance.get(`/status`).then(data => data.data)
}

export const postStatus = data => {
  return axiosInstance.post(`/status/create`, data).then(data => data.data)
}
export const putStatus = (id, data) => {
  return axiosInstance.put(`/status/${id}`, data).then(data => data.data)
}
export const deleteStatus = id => {
  return axiosInstance.delete(`/status/${id}`).then(data => data.data)
}
