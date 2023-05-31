import React, { lazy, Suspense, useMemo } from 'react'
import { Routes } from 'react-router-dom'

import { privateRoute } from './helpers/PrivateRoute'
import { RoutesPath } from './types'

export const MainRoutes = () => {
  const routes = useMemo(
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
        element: lazy(() => import('../pages/Leads/LeadsPage')),
        isAccess: true,
      },
      {
        label: 'Groups',
        path: RoutesPath.GROUPS_ROUTE,
        element: lazy(() => import('../pages/Groups/GroupsPage')),
        isAccess: true,
      },
      {
        label: 'Group detail',
        path: RoutesPath.GROUPS_ROUTE + '/:id',
        element: lazy(() => import('../pages/Groups/GroupPageDetail')),
        isAccess: true,
      },
      {
        label: 'Users',
        path: RoutesPath.USERS_ROUTE,
        element: lazy(() => import('../pages/Users/UsersPage')),
        isAccess: true,
      },
      {
        label: 'Analytics',
        path: RoutesPath.ANALYTICS_ROUTE,
        element: lazy(() => import('../pages/Analytics/AnalyticsPage')),
        isAccess: true,
      },
      {
        label: 'Deposits',
        path: RoutesPath.DEPOSITS_ROUTE,
        element: lazy(() => import('../pages/Deposits/DepositsPage')),
        isAccess: true,
      },
      {
        label: 'Affiliates',
        path: RoutesPath.AFFILIATES_ROUTE,
        element: lazy(() => import('../pages/Affiliates/AffiliatesPage')),
        isAccess: true,
      },
      {
        label: 'Calendar',
        path: RoutesPath.CALENDAR_ROUTE,
        element: lazy(() => import('../pages/Calendar/CalendarPage')),
        isAccess: true,
      },
      {
        label: 'Settings',
        path: RoutesPath.SETTINGS_ROUTE,
        element: lazy(() => import('../pages/Settings/SettingsPage')),
        isAccess: true,
      },
      {
        label: 'Login',
        path: RoutesPath.LOGIN_ROUTE,
        element: lazy(() => import('../pages/LoginPage/LoginPage')),
        isAccess: true,
      },
    ],
    [],
  )

  return (
    <Suspense fallback={null}>
      <Routes>{routes.map(privateRoute)}</Routes>
    </Suspense>
  )
}
