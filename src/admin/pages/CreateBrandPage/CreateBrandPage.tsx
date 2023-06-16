import React from 'react'
import AdminLayout from 'layouts/AdminLayout/AdminLayout'
import { BrandForm } from 'admin/components/Brands/BrandForm'

export const CreateBrandPage = () => {
  return (
    <AdminLayout>
      <BrandForm />
    </AdminLayout>
  )
}
