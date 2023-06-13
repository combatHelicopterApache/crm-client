import React, { useEffect, Suspense } from 'react'

import { AdminRoutes } from 'routes/AdminRoutes'
import { MainRoutes } from 'routes/MainRoutes'

import { useAppSelector } from 'store/store'
import { authSelector, loginByToken } from 'features/Login/authSlice'
import { getTokenFromLS } from 'utils/getTokenFromLS'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Spin } from 'antd'
import { setTokenToLS } from 'utils/setTokenToLS'

export const Builder = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { auth_user, initialized, is_admin, loading } =
    useAppSelector(authSelector)

  useEffect(() => {
    const onAuthUser = async () => {
      try {
        const token = getTokenFromLS()

        if (!token) return navigate('/login')

        const { payload } = await dispatch(loginByToken(token))
        if (payload?.message?.status === 401) {
          setTokenToLS(null)
          navigate('/login')
        }
      } catch (error) {
        console.error(error)
      }
    }
    onAuthUser()
  }, [])

  if (loading) return <Spin />

  return is_admin ? (
    <AdminRoutes initialized={initialized} authUser={auth_user} />
  ) : (
    <MainRoutes initialized={initialized} authUser={auth_user} />
  )
}
