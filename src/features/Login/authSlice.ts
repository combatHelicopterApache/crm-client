import {
  createAsyncThunk,
  createSlice,
  SerializedError,
} from '@reduxjs/toolkit'
import { notification } from 'components/Notification/Notification'
import * as authAPI from 'api/login'
import { AppDispatch, RootState } from 'store/store'
import { setTokenToLS } from 'utils/setTokenToLS'

type RejectWithValue<T, E = any> = {
  error: E
  payload: T
  meta: { rejectedWithValue: true }
}

export interface AsyncThunkAPI<T = void> {
  dispatch: AppDispatch
  state: RootState
  rejectWithValue: (value: T) => RejectWithValue<T, SerializedError>
}

export const login = createAsyncThunk<any, any, AsyncThunkAPI>(
  'user/Login',
  async (credentials, { rejectWithValue, fulfillWithValue }) => {
    try {
      const authUser = await authAPI.userLogin(credentials)
      fulfillWithValue(authUser)
      return authUser
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  },
)

export const loginByToken = createAsyncThunk<any, any, AsyncThunkAPI>(
  'user/login_by_token',
  async (token, { rejectWithValue, fulfillWithValue }) => {
    try {
      const authUser = await authAPI.getUserByToken({ token })
      fulfillWithValue(authUser)
      return authUser
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  },
)

export const logout = createAsyncThunk<any, any, AsyncThunkAPI>(
  'user/logout',
  async () => await authAPI.userLogout(),
)

const initialState = {
  token: null,
  auth_user: null,
  initialized: false,
  is_admin: false,
  loading: false,
  error: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(login.pending, state => {
      state.loading = true
    })
    builder.addCase(login.fulfilled, (state, { payload }) => {
      state.token = payload.token
      state.auth_user = payload.data
      state.is_admin = payload.data.is_admin
      state.initialized = true
      state.loading = false
      notification('success', payload.message)
      setTokenToLS(payload.token)
    })
    builder.addCase(login.rejected, (state, { payload }) => {
      state.error = payload?.errors
      state.loading = false
      state.initialized = false
      notification('error', `Something went wrong`)
    })
    builder.addCase(logout.fulfilled, state => {
      state.auth_user = null
      state.initialized = false
      state.is_admin = false
      state.loading = false
      state.error = false
      setTokenToLS(null)
      notification('success', `User logout successfully!`)
    })
    builder.addCase(loginByToken.pending, state => {
      state.loading = true
    })
    builder.addCase(loginByToken.fulfilled, (state, { payload }) => {
      state.token = payload.token
      state.auth_user = payload.data
      state.is_admin = payload.data.is_admin
      state.initialized = true
      state.loading = false
      setTokenToLS(payload.token)
    })
    builder.addCase(loginByToken.rejected, (state, { payload }) => {
      state.error = payload?.errors
      state.loading = false
      state.initialized = false
      notification('error', `Something went wrong`)
    })
  },
})

export const authSelector = (state: any) => state.auth
export default authSlice.reducer
