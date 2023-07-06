import axiosInstance from 'services/AxiosInstance/axiosInstance'

export const getComments = (id, route) => {
  return axiosInstance.get(`/comment/${route}/${id}`).then(data => data.data)
}

export const postComments = (id, route, data) => {
  return axiosInstance
    .post(`/comment/${route}/${id}`, data)
    .then(data => data.data)
}

export const getEntityComments = route => {
  return axiosInstance.get(route).then(data => data?.data?.data)
}

export const postEntityComments = (route, data) => {
  return axiosInstance.post(route, data).then(data => data?.data?.data)
}
export const putEntityComments = (route, data) => {
  return axiosInstance.put(route, data).then(data => data.data)
}

export const deleteEntityComments = route => {
  return axiosInstance.delete(route).then(data => data.data)
}
