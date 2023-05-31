import axios from "axios"


export const userLogin = (data:object) => {
	return axios.post(`/api/user/login`, data)
}