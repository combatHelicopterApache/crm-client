import React, { lazy, Suspense, useMemo } from 'react'
import { Routes } from 'react-router-dom'

import { privateRoute } from './helpers/PrivateRoute'

import { AdminRoutesPath } from './types'

export const AdminRoutes = () => {
  const routes = useMemo(
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

  return (
    <Suspense fallback={null}>
      <Routes>{routes.map(privateRoute)}</Routes>
    </Suspense>
  )
}
