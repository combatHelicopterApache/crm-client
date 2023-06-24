import React, { Suspense, useMemo } from 'react'
import { Routes, Route } from 'react-router-dom'
import { NotAuthorized } from './helpers/NotAuthorized'
import { privateRoute } from './helpers/PrivateRoute'
import { publicRoute } from './helpers/PublicRoute'
import { RoutesPath } from './types'
import lazyWithRetry from 'services/LazyWithRetry/LazyWithRetry'

export const MainRoutes = ({ initialized, authUser }) => {
  const {
    users,
    settings,
    offices,
    leads,
    groups,
    deposits,
    company_info,
    calendar,
    analytics,
    affiliates,
  } = authUser?.permissions

  const privateRoutes = useMemo(
    () => [
      {
        label: 'Home',
        path: RoutesPath.HOME_ROUTE,
        element: lazyWithRetry(() => import('../pages/HomePage/HomePage')),
        isAccess: authUser?.active,
      },
      {
        label: 'Leads',
        path: RoutesPath.LEADS_ROUTE,
        element: lazyWithRetry(() => import('../pages/LeadsPage/LeadsPage')),
        // isAccess: authUser?.active && leads,
        isAccess: false,
      },
      {
        label: 'Groups',
        path: RoutesPath.GROUPS_ROUTE,
        element: lazyWithRetry(() => import('../pages/GroupsPage/GroupsPage')),
        isAccess: authUser?.active,
      },
      {
        label: 'Group detail',
        path: RoutesPath.GROUPS_ROUTE + '/:id',
        element: lazyWithRetry(
          () => import('../pages/GroupsPage/GroupPageDetail'),
        ),
        isAccess: authUser?.active,
      },

      {
        label: 'Analytics',
        path: RoutesPath.ANALYTICS_ROUTE,
        element: lazyWithRetry(
          () => import('../pages/AnalyticsPage/AnalyticsPage'),
        ),
        isAccess: authUser?.active && analytics,
      },
      {
        label: 'Deposits',
        path: RoutesPath.DEPOSITS_ROUTE,
        element: lazyWithRetry(
          () => import('../pages/DepositsPage/DepositsPage'),
        ),
        isAccess: authUser?.active && deposits,
      },
      {
        label: 'Affiliates',
        path: RoutesPath.AFFILIATES_ROUTE,
        element: lazyWithRetry(
          () => import('../pages/AffiliatesPage/AffiliatesPage'),
        ),
        isAccess: authUser?.active && affiliates,
      },
      {
        label: 'Calendar',
        path: RoutesPath.CALENDAR_ROUTE,
        element: lazyWithRetry(
          () => import('../pages/CalendarPage/CalendarPage'),
        ),
        isAccess: authUser?.active && calendar,
      },
      {
        label: 'Settings',
        path: RoutesPath.SETTINGS_ROUTE,
        element: lazyWithRetry(() => import('../pages/SettingsPage/index')),
        isAccess: authUser?.active && settings,
      },
      {
        label: 'Login',
        path: RoutesPath.LOGIN_ROUTE,
        element: lazyWithRetry(() => import('../pages/LoginPage/LoginPage')),
        isAccess: true,
      },
      {
        label: 'Brands',
        path: RoutesPath.BRANDS_ROUTE,
        element: lazyWithRetry(() => import('../pages/BrandsPage')),
        isAccess: authUser?.active,
      },
    ],
    [],
  )
  const publicRoutes = useMemo(
    () => [
      {
        label: 'Login',
        path: RoutesPath.LOGIN,
        element: lazyWithRetry(() => import('../pages/LoginPage/LoginPage')),
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

        <Route
          path='*'
          element={<NotAuthorized path={RoutesPath.HOME_ROUTE} />}
        />
      </Routes>
    </Suspense>
  )
}
