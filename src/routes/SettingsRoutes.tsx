import lazyWithRetry from 'services/LazyWithRetry/LazyWithRetry'
import { Suspense, useMemo } from 'react'
import { Routes, Route } from 'react-router-dom'
import { privateRoute } from './helpers/PrivateRoute'
import { RoutesPath } from 'routes/types'
import { authSelector } from 'features/Login/authSlice'

import { useAppSelector } from 'store/store'

export const SettingsRoutes = () => {
  const auth = useAppSelector(authSelector)

  const settingsRoutes = useMemo(
    () => [
      {
        path: RoutesPath.SETTINGS_ROUTE_COMPANY,
        title: 'Company Info',
        exact: true,
        element: lazyWithRetry(
          () => import('../pages/SettingsPage/CompanyPage'),
        ),
        isAccess: true,
      },
      {
        path: RoutesPath.SETTINGS_ROUTE_USERS,
        title: 'Users',
        exact: true,
        element: lazyWithRetry(() => import('../pages/SettingsPage/UsersPage')),
        isAccess: true,
      },
      {
        path: RoutesPath.SETTINGS_ROUTE_USER,
        title: 'User',
        exact: true,
        element: lazyWithRetry(() => import('../pages/SettingsPage/UserPage')),
        isAccess: true,
      },
      {
        path: RoutesPath.SETTINGS_ROUTE_OFFICES,
        title: 'Offices',
        exact: true,
        element: lazyWithRetry(
          () => import('../pages/SettingsPage/OfficesPage'),
        ),
        isAccess: true,
      },
      {
        path: RoutesPath.SETTINGS_ROUTE_STATUS,
        title: 'Statuses',
        exact: true,
        element: lazyWithRetry(
          () => import('../pages/SettingsPage/LeadStatusPage'),
        ),
        isAccess: true,
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
