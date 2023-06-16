import axiosInstance from 'services/AxiosInstance/axiosInstance'

export const createBrand = (data: object) => {
  return axiosInstance.post(`/brand/create`, data)
}
export const updateBrand = (id: number) => {
  return axiosInstance.put(`/brand/${id}`)
}
export const deleteBrand = (id: number) => {
  return axiosInstance.put(`/brand/${id}`)
}
export const getBrandsList = params => {
  return axiosInstance.get(`/brand`, { params }).then(data => data.data)
}
export const getBrandById = (id: number) => {
  return axiosInstance.get(`/brand/${id}`)
}