import React from 'react'
import AdminLayout from 'layouts/AdminLayout/AdminLayout'
import { UsersList } from 'admin/components/Users/UsersList'

export const UsersPage = () => {
  return (
    <AdminLayout>
      <UsersList />
    </AdminLayout>
  )
}
