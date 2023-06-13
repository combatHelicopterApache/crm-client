import React, { lazy, Suspense, useMemo } from 'react'
import { Routes, Route } from 'react-router-dom'
import { NotAuthorized } from './helpers/NotAuthorized'
import { privateRoute } from './helpers/PrivateRoute'
import { publicRoute } from './helpers/PublicRoute'
import { RoutesPath, AdminRoutesPath } from './types'

export const AdminRoutes = ({ initialized }) => {
  const adminRoutes = useMemo(
    () => [
      {
        label: 'Companies',
        path: AdminRoutesPath.ADMIN_COMPANIES_ROUTE,
        element: lazy(() => import('admin/pages/CompaniesPage')),
        isAccess: true,
      },
      {
        label: 'Company',
        path: AdminRoutesPath.ADMIN_COMPANY_ROUTE,
        element: lazy(() => import('admin/pages/CompanyPage')),
        isAccess: true,
      },
      {
        label: 'Create Company',
        path: AdminRoutesPath.ADMIN_COMPANY_CREATE_ROUTE,
        element: lazy(() => import('admin/pages/CreateCompanyPage')),
        isAccess: true,
      },
      {
        label: 'Users',
        path: AdminRoutesPath.ADMIN_USERS_ROUTE,
        element: lazy(() => import('admin/pages/UsersPage')),
        isAccess: true,
      },
      {
        label: 'User',
        path: AdminRoutesPath.ADMIN_USER_ROUTE,
        element: lazy(() => import('admin/pages/UserPage')),
        isAccess: true,
      },
      {
        label: 'Create User',
        path: AdminRoutesPath.ADMIN_USER_CREATE_ROUTE,
        element: lazy(() => import('admin/pages/CreateUserPage')),
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
        {initialized && adminRoutes.map(privateRoute)}
        <Route
          path='*'
          element={
            <NotAuthorized path={AdminRoutesPath.ADMIN_COMPANIES_ROUTE} />
          }
        />{' '}
      </Routes>
    </Suspense>
  )
}
