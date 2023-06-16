import React from 'react'
import AdminLayout from 'layouts/AdminLayout/AdminLayout'
import { BrandInfo } from 'admin/components/Brands/BrandInfo'

export const BrandPage = () => {
  return (
    <AdminLayout>
      <BrandInfo />
    </AdminLayout>
  )
}
