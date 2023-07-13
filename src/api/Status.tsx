import axiosInstance from 'services/AxiosInstance/axiosInstance'

export const changeLeadStatus = (leadId, statusId) => {
  return axiosInstance
    .put(`lead/change-status`, {
      lead_id: leadId,
      status_id: statusId,
    })
    .then(data => data.data)
}

export const getLeadStatusById = leadId => {
  return axiosInstance.get(`status/list-log/${leadId}`).then(data => data.data)
}
