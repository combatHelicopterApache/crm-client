import axiosInstance from 'services/AxiosInstance/axiosInstance'

export const changeLeadStatus = (leadId, data) => {
  return axiosInstance.put(`status/${leadId}`, data)
}

export const getLeadStatusById = leadId => {
  return axiosInstance.get(`status/list/${leadId}`)
}
