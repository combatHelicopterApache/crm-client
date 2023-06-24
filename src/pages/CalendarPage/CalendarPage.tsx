import React from 'react'
import MainLayout from '../../layouts/MainLayout/MainLayout'
import { Schedule } from 'features/Schedule/Schedule'

const CalendarPage = () => {
  return (
    <MainLayout>
      <Schedule />
    </MainLayout>
  )
}

export default CalendarPage
