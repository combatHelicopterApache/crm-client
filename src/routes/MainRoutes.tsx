import React, { lazy, Suspense, useMemo } from 'react'
import { Routes } from 'react-router-dom'

import { privateRoute } from './helpers/PrivateRoute'
import { publicRoute } from './helpers/PublicRoute'
import { RoutesPath } from './types'

export const MainRoutes = ({ initialized }) => {
  const privateRoutes = useMemo(
    () => [
      {
        label: 'Home',
        path: RoutesPath.HOME_ROUTE,
        element: lazy(() => import('../pages/HomePage/HomePage')),
        isAccess: true,
      },
      {
        label: 'Leads',
        path: RoutesPath.LEADS_ROUTE,
        element: lazy(() => import('../pages/LeadsPage/LeadsPage')),
        isAccess: true,
      },
      {
        label: 'Groups',
        path: RoutesPath.GROUPS_ROUTE,
        element: lazy(() => import('../pages/GroupsPage/GroupsPage')),
        isAccess: true,
      },
      {
        label: 'Group detail',
        path: RoutesPath.GROUPS_ROUTE + '/:id',
        element: lazy(() => import('../pages/GroupsPage/GroupPageDetail')),
        isAccess: true,
      },
      {
        label: 'Users',
        path: RoutesPath.USERS_ROUTE,
        element: lazy(() => import('../pages/UsersPage/UsersPage')),
        isAccess: true,
      },
      {
        label: 'User',
        path: RoutesPath.USER_ROUTE,
        element: lazy(() => import('../pages/UserPage')),
        isAccess: true,
      },
      {
        label: 'Analytics',
        path: RoutesPath.ANALYTICS_ROUTE,
        element: lazy(() => import('../pages/AnalyticsPage/AnalyticsPage')),
        isAccess: true,
      },
      {
        label: 'Deposits',
        path: RoutesPath.DEPOSITS_ROUTE,
        element: lazy(() => import('../pages/DepositsPage/DepositsPage')),
        isAccess: true,
      },
      {
        label: 'Affiliates',
        path: RoutesPath.AFFILIATES_ROUTE,
        element: lazy(() => import('../pages/AffiliatesPage/AffiliatesPage')),
        isAccess: true,
      },
      {
        label: 'Calendar',
        path: RoutesPath.CALENDAR_ROUTE,
        element: lazy(() => import('../pages/CalendarPage/CalendarPage')),
        isAccess: true,
      },
      {
        label: 'Settings',
        path: RoutesPath.SETTINGS_ROUTE,
        element: lazy(() => import('../pages/SettingsPage/SettingsPage')),
        isAccess: true,
      },
      {
        label: 'Login',
        path: RoutesPath.LOGIN_ROUTE,
        element: lazy(() => import('../pages/LoginPage/LoginPage')),
        isAccess: true,
      },
      {
        label: 'Brands',
        path: RoutesPath.BRANDS_ROUTE,
        element: lazy(() => import('../pages/BrandsPage')),
        isAccess: true,
      },
    ],
    [],
  )
  const publicRoutes = useMemo(
    () => [
      {
        label: 'Login',
        path: RoutesPath.LOGIN,
        element: lazy(() => import('../pages/LoginPage/LoginPage')),
        isAccess: true,
      },
    ],
    [],
  )

  return (
    <Suspense fallback={null}>
      <Routes>
        {publicRoutes.map(publicRoute)}
        {initialized && privateRoutes.map(privateRoute)}
      </Routes>
    </Suspense>
  )
}
