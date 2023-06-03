import React from 'react'
import AdminLayout from 'layouts/AdminLayout/AdminLayout'
import { CompaniesList } from 'admin/components/Companies/CompaniesList'

export const CompaniesPage = () => {
  return (
    <AdminLayout>
      <CompaniesList />
    </AdminLayout>
  )
}
