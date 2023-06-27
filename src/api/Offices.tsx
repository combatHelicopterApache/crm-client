import axiosInstance from 'services/AxiosInstance/axiosInstance'

const GET_LIST = '/office'

export const getOfficesList = params => {
  return axiosInstance.get(GET_LIST, { params }).then(data => data.data)
}
