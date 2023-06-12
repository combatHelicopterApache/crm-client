import React, { useEffect } from 'react'
import { AdminRoutes } from 'routes/AdminRoutes'
import { MainRoutes } from 'routes/MainRoutes'
import { useAppSelector } from 'store/store'
import { authSelector } from 'features/Login/authSlice'
// import { getTokenFromLS } from 'utils/getTokenFromLS'

export const Builder = () => {
  const { auth_user, initialized, is_admin } = useAppSelector(authSelector)

  // useEffect(() => {
  //   const onAuthUser = async () => {
  //     try {
  //       const token = getTokenFromLS()
  //       if (!token) return
  //     } catch (error) {
  //       console.error(error)
  //     }
  //   }
  // }, [])

  return is_admin ? (
    <AdminRoutes initialized={initialized} authUser={auth_user} />
  ) : (
    <MainRoutes initialized={initialized} authUser={auth_user} />
  )
}
