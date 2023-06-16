import React from 'react'
import { BrandsList } from 'admin/components/Brands/BrandsList'
import AdminLayout from 'layouts/AdminLayout/AdminLayout'

export const BrandsPage = () => {
  return (
    <AdminLayout>
      <BrandsList />
    </AdminLayout>
  )
}
