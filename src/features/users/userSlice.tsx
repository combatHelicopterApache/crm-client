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
  email: '',
  phone: '',
  address: '',
  permissions: getModulesByRole(2),
  role_id: UserRole.AGENT,
  manager_id: null,
  admin_id: null,
  brand_id: null,
  status: UserStatus.Active,
  title: '',
  background_color: '#626ed4',
  user_identifier: generateRandomLetters(2),
  notes: '',
}

export const fetchUser = createAsyncThunk<User, string>(
  'users/fetchUser',
  async id => {
    const data = await userAPI.getUser(id)

    return data
  },
)

export const createUser = createAsyncThunk<User, User, AsyncThunkAPI>(
  'users/createUser',
  async (user, { rejectWithValue }) => {
    try {
      return await userAPI.createUser(user)
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  },
)

export const updateUser = createAsyncThunk<User, { user: User }, AsyncThunkAPI>(
  'users/updateUser',
  async ({ user }, { rejectWithValue }) => {
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
