import axiosInstance from 'services/AxiosInstance/axiosInstance'

const GET_LIST = '/office'
const CREATE = '/office/create'
const DELETE = '/office/'
const UPDATE = '/office/'

export const getOfficesList = params => {
  return axiosInstance.get(GET_LIST, { params }).then(data => data.data)
}
export const createOffice = data => {
  return axiosInstance.post(CREATE, data).then(data => data.data)
}

export const updateOffice = data => {
  return axiosInstance.put(`${UPDATE}${data.id}`, data).then(data => data.data)
}

export const deleteOffice = id => {
  return axiosInstance.delete(`${DELETE}${id}`).then(data => data.data)
}
