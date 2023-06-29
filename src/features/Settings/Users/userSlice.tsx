import {
  createAsyncThunk,
  createSlice,
  SerializedError,
} from '@reduxjs/toolkit'
import { generateRandomLetters } from 'utils/generateRandomLatters'
import { notification } from 'components/Notification/Notification'
import * as userAPI from 'api/Users'
import { AxiosResponse } from 'axios'
import { User, UserRole, UserStatus } from './types'
import { getModulesByRole } from './helpers/helpers'
import { AppDispatch, RootState } from 'store/store'

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

const initialUser: User = {
  full_name: '',
  title: '',
  email: '',
  phone: '',
  password: '',
  is_admin: false,
  user_logo: '',
  active: true,
  role_id: UserRole.AGENT,
  role_name: 'AGENT',
  company_id: '',
  company_name: '',
  background_color: '#626ed4',
  notes: '',
  address: '',
  user_identifier: generateRandomLetters(2),
  permissions: getModulesByRole(5),
  user_ips: [],
  last_login: '',
  login_from_admin: false,
  brands: [],
  desk_id: '',
  desk_name: '',
  manager_id: '',
  manager_name: '',
  owner_id: '',
  owner_name: '',
  time_cards: { time_start: '10:00', time_end: '19:00' },
  user_sales_role_id: [1],
  languages: [],
  restrictions: {
    lead: {
      lead_upload: true,
      lead_download: true,
      lead_events: [2, 5],
    },
    affiliates: {
      affiliates_events: [2, 5],
    },
    deposits: {
      deposits_events: [2, 5],
    },
    calendar: {
      calendar_events: [2, 5],
    },
    groups: {
      groups_events: [2, 5],
    },
    analytics: {
      analytics_events: [2, 5],
    },
    settings: {
      user_events: [5],
      office_events: [5],
      company_events: [5],
    },
  },
}

export const fetchUser = createAsyncThunk<User, string>(
  'Users/fetchUser',
  async id => {
    const data = await userAPI.getUser(id)

    return data?.data
  },
)

export const createUser = createAsyncThunk<User, User, AsyncThunkAPI>(
  'Users/createUser',
  async (user, { rejectWithValue }) => {
    try {
      return await userAPI.createUser(user)
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  },
)

export const updateUser = createAsyncThunk<User, { user: User }, AsyncThunkAPI>(
  'Users/updateUser',
  async (user, { rejectWithValue }) => {
    try {
      const updatedUser: AxiosResponse<User> = await userAPI.updateUser(
        user.id,
        user,
      )

      return updatedUser
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  },
)

const initialState: {
  status: 'idle' | 'loading' | 'success' | 'error'
  currentUser: User
  error: { [key: string]: string } | null
  redirect: boolean
} = {
  status: 'idle',
  currentUser: initialUser,
  error: null,
  redirect: false,
}

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    resetUser: state => {
      state.redirect = false
      state.error = null
      state.status = 'idle'
      state.currentUser = initialUser
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchUser.fulfilled, (state, { payload }) => {
      state.currentUser = payload
      state.status = 'success'
    })
    builder.addCase(fetchUser.rejected, state => {
      state.status = 'error'
    })
    builder.addCase(createUser.fulfilled, (state, { payload }) => {
      state.redirect = true
      state.currentUser = payload
      notification('success', `User has been created`)
    })
    builder.addCase(createUser.rejected, (state, { payload }) => {
      state.error = payload?.errors
      notification('error', `Something went wrong`)
    })
    builder.addCase(updateUser.pending, state => {
      state.status = 'loading'
    })
    builder.addCase(updateUser.fulfilled, (state, { payload }) => {
      state.status = 'success'
      state.currentUser = payload
      state.error = null
      notification('success', `Your settings have been updated`)
    })
    builder.addCase(updateUser.rejected, (state, { payload }) => {
      state.status = 'error'
      state.error = payload
      notification('error', `Something went wrong`)
    })
  },
})

export default userSlice.reducer
export const { resetUser } = userSlice.actions

export const selectCurrentUser = (state: RootState) => state.user.currentUser
