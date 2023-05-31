import React from 'react'
import AdminLayout from 'layouts/AdminLayout/AdminLayout'
import { UserForm } from 'admin/components/Users/UserForm'

export const CreateUserPage = () => {
  return (
    <AdminLayout>
      <UserForm />
    </AdminLayout>
  )
}
