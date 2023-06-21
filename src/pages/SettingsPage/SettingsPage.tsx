import React from 'react'
import { SettingsLayout } from 'layouts/SettingsLayout/SettingsLayout'
import { SettingsRoutes } from 'routes/SettingsRoutes'

export const SettingsPage = () => {
  return (
    <SettingsLayout>
      <SettingsRoutes />
    </SettingsLayout>
  )
}
