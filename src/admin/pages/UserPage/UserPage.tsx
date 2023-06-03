import React from 'react'
import AdminLayout from 'layouts/AdminLayout/AdminLayout'
import { UserInfo } from 'admin/components/Users/UserInfo'

export const UserPage = () => {
  return (
    <AdminLayout>
      <UserInfo />
    </AdminLayout>
  )
}
