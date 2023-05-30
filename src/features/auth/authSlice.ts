import { createSlice  } from '@reduxjs/toolkit'


const initialState = {
	token: null,
	data: null,
}

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setLoginData: (state, action) => {
			state.token = action.payload.token
			state.data = action.payload.data
		},
		logout: (state) => {
			state.token = null
			state.data = null
		},
	},
})



export const { setLoginData, logout } = authSlice.actions
export const selectData = (state:any) => state.auth?.data
export default authSlice.reducer
