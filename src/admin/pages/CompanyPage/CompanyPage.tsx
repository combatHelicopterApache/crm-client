import React from 'react'
import AdminLayout from 'layouts/AdminLayout/AdminLayout'
import { CompanyInfo } from 'admin/components/Companies/CompanyInfo'

export const CompanyPage = () => {
  return (
    <AdminLayout>
      <CompanyInfo />
    </AdminLayout>
  )
}
