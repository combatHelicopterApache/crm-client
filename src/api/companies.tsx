import axiosInstance from 'services/AxiosInstance/axiosInstance'

enum PathEnum {
  CREATE_COMPANY = '/company/company-create',
  UPDATE_COMPANY = '/company/company-update',
  DELETE_COMPANY = '/company/company-delete',
  GET_COMPANIES = '/company/companies-list',
  GET_COMPANY = '/company/company-get',
}

export const createCompany = data => {
  return axiosInstance.post(PathEnum.CREATE_COMPANY, data)
}
export const deleteCompany = companyId => {
  return axiosInstance.delete(`${PathEnum.DELETE_COMPANY}?id=${companyId}`)
}
export const updateCompany = data => {
  return axiosInstance.post(PathEnum.UPDATE_COMPANY, data)
}
export const getCompanyById = params => {
  return axiosInstance
    .get(PathEnum.GET_COMPANY, { params })
    .then(data => data?.data)
}

export const getCompaniesList = () => {
  return axiosInstance.get(PathEnum.GET_COMPANIES).then(data => data?.data)
}
