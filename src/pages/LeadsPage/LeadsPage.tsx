import React from 'react'
import MainLayout from '../../layouts/MainLayout/MainLayout'
import { LeadsTable } from '../../features/leads/tables/LeadsTable'

const LeadsPage = () => {
  return (
    <MainLayout>
      <LeadsTable />
    </MainLayout>
  )
}

export default LeadsPage
