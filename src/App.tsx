import React, { Suspense } from 'react'
import { MainRoutes } from 'routes/MainRoutes'
import { AdminRoutes } from 'routes/AdminRoutes'
import store from './store/store'
import { Provider } from 'react-redux'
import ErrorBoundary from 'services/ErrorBoundary/ErrorBoundary'
import './styles/index.scss'

export const App = () => {
  const isAdmin = true
  return (
    <Suspense fallback={null}>
      <Provider store={store}>
        <ErrorBoundary>
          {isAdmin ? <AdminRoutes /> : <MainRoutes />}
        </ErrorBoundary>
      </Provider>
    </Suspense>
  )
}
