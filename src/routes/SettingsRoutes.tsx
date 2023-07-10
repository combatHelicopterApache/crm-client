import lazyWithRetry from 'services/LazyWithRetry/LazyWithRetry'
import { Suspense, useMemo } from 'react'
import { Routes, Route } from 'react-router-dom'
import { privateRoute } from './helpers/PrivateRoute'
import { RoutesPath } from 'routes/types'
import { authSelector } from 'features/Login/authSlice'

import { useAppSelector } from 'store/store'

export const SettingsRoutes = () => {
  const auth = useAppSelector(authSelector)
  const { users, settings, company_info } = auth?.auth_user?.permissions || {}

  const isActiveUser = auth?.auth_user?.active

  const settingsRoutes = useMemo(
    () => [
      {
        path: RoutesPath.SETTINGS_ROUTE_COMPANY,
        title: 'Company Info',
        exact: true,
        element: lazyWithRetry(
          () => import('../pages/SettingsPage/CompanyPage'),
        ),
        isAccess: isActiveUser && company_info && settings,
      },
      {
        path: RoutesPath.SETTINGS_ROUTE_USERS,
        title: 'Users',
        exact: true,
        element: lazyWithRetry(() => import('../pages/SettingsPage/UsersPage')),
        isAccess: isActiveUser && users,
      },
      {
        path: RoutesPath.SETTINGS_ROUTE_USER,
        title: 'User',
        exact: true,
        element: lazyWithRetry(() => import('../pages/SettingsPage/UserPage')),
        isAccess: isActiveUser && users && settings,
      },
      {
        path: RoutesPath.SETTINGS_ROUTE_OFFICES,
        title: 'Offices',
        exact: true,
        element: lazyWithRetry(
          () => import('../pages/SettingsPage/OfficesPage'),
        ),
        isAccess: isActiveUser && settings,
      },
      {
        path: RoutesPath.SETTINGS_ROUTE_STATUS,
        title: 'Statuses',
        exact: true,
        element: lazyWithRetry(
          () => import('../pages/SettingsPage/LeadStatusPage'),
        ),
        isAccess: isActiveUser && settings,
      },
    ],
    [window.location.pathname],
  )

  return (
    <Suspense fallback={null}>
      <Routes>{settingsRoutes.map(privateRoute)}</Routes>
    </Suspense>
  )
}
