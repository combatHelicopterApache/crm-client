import axiosInstance from 'services/AxiosInstance/axiosInstance'

enum PathEnum {
  CREATE_COMPANY = '/company/company-create',
  UPDATE_COMPANY = '/company/company-update',
  DELETE_COMPANY = '/company/company-delete',
  GET_COMPANIES = '/company/companies-list',
  GET_COMPANY = '/company/company-get',
  PATCH_COMPANY = '/company/company-update/',
}

export const createCompany = data => {
  return axiosInstance.post(PathEnum.CREATE_COMPANY, data)
}
export const deleteCompany = companyId => {
  return axiosInstance.delete(`${PathEnum.DELETE_COMPANY}/${companyId}`)
}
export const updateCompany = data => {
  return axiosInstance.post(PathEnum.UPDATE_COMPANY, data)
}
export const patchCompany = (data, companyId) => {
  return axiosInstance.patch(`${PathEnum.PATCH_COMPANY}/${companyId}`, data)
}
export const getCompanyById = companyId => {
  return axiosInstance
    .get(`${PathEnum.GET_COMPANY}/${companyId.id}`)
    .then(data => data?.data)
}

export const getCompaniesList = () => {
  return axiosInstance.get(PathEnum.GET_COMPANIES).then(data => data?.data)
}
