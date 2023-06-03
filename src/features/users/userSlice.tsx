import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

// import * as userAPI from 'api/Users'

import { notification } from 'components/Notification/Notification'
import moment from 'moment-timezone'
// import { AppStateType } from 'store'
// import { setMe } from 'store/Orcatec/actions/settings/user'
// import { AsyncThunkAPI } from 'features/Dispatch/types'
// import { User, UserRole, UserStatus } from 'types/User'
import { User, UserRole, UserStatus } from './types'
import { getModulesByRole } from './helpers/helpers'
import { AppDispatch, RootState } from 'store/store'

export interface AsyncThunkAPI<T = void> {
  dispatch: AppDispatch
  state: RootState
  rejectValue: T
}

const initialUser: User = {
  background_color: '#626ed4',
  commission_type: 1,
  commission_percent: 0,
  full_name: '',
  email: '',
  info: {
    address: {
      address: '',
      city: '',
      state: '',
      lat: '',
      lng: '',
      unit: '',
      zip: '',
    },
    coordination: [],
    number_prefix: '',
    profile_picture: '',
    use_office_address: true,
    change_date_status: moment().utc().format(),
  },
  labor_rate: '0',
  permissions: getModulesByRole(1),
  phone: '',
  project_status_change: true,
  restrict_contract_access: false,
  role_id: UserRole.ADMIN,
  status: UserStatus.Pending,
  title: '',
  useAsTech: false,
  use_clock_in_with_gps: false,
  has_access_to_proposal_insights: false,
  proposal_insights_action_level: 1,
}

export const fetchUser = createAsyncThunk<User, string>(
  'users/fetchUser',
  async id => {
    const data = await userAPI.getUser(id)

    return data
  },
)

interface PostUser extends User {
  make_column: boolean
}

export const createUser = createAsyncThunk<User, PostUser, AsyncThunkAPI>(
  'users/createUser',
  async (user, { rejectWithValue }) => {
    try {
      return await userAPI.createUser(user)
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  },
)

export const updateUser = createAsyncThunk<
  User,
  { user: User; confirm: boolean },
  AsyncThunkAPI
>(
  'users/updateUser',
  async ({ user, confirm }, { rejectWithValue, getState, dispatch }) => {
    try {
      const updatedUser = await userAPI.updateUser(user.id, user, confirm)

      // const me = getState().orcatec.user.me
      // if (user.id === me.id) dispatch(setMe(updatedUser))

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
    setUserAddress: (state, { payload }) => {
      state.currentUser.info.address = payload
    },
    resetUser: state => {
      state.redirect = false
      state.error = null
      state.status = 'idle'
      state.currentUser = initialUser
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchUser.pending, state => {
      state.loading = true
    })
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
export const { setUserAddress, resetUser } = userSlice.actions

export const selectCurrentUser = (state: AppStateType) =>
  state.orcatec.usersSlice.currentUser
