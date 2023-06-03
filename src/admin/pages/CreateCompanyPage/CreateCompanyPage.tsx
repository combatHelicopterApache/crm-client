import React from 'react'
import AdminLayout from 'layouts/AdminLayout/AdminLayout'
import { CompanyForm } from 'admin/components/Companies/CompanyForm'

export const CreateCompanyPage = () => {
  return (
    <AdminLayout>
      <CompanyForm />
    </AdminLayout>
  )
}
