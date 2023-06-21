import React from 'react'
import MainLayout from 'layouts/MainLayout/MainLayout'
import { UserForm } from 'features/Users/UserForm/UserForm'

export const UserPage = () => {
  return (
    <MainLayout>
      <UserForm />
    </MainLayout>
  )
}
