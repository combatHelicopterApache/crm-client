import React from 'react'
import MainLayout from '../../layouts/MainLayout/MainLayout'

import { UsersTable } from 'features/Users/tables/UsersTable'

const HomePage = () => {
  return (
    <MainLayout>
      <UsersTable />
    </MainLayout>
  )
}

export default HomePage
