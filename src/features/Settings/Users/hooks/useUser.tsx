import { fetchUser } from '../userSlice'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { useAppSelector } from 'store/store'

import { User } from '../types'

const useUser = (
  id: string,
): {
  currentUser: User
  status: 'idle' | 'loading' | 'success' | 'error'
  redirect: boolean
} => {
  const { currentUser, status, redirect } = useAppSelector(state => state.user)

  const dispatch = useDispatch()

  useEffect(() => {
    if (id && id !== 'new') dispatch(fetchUser(id))
  }, [id])

  return { currentUser, status, redirect }
}

export default useUser
