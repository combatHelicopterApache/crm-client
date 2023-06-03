import React, { Suspense } from 'react'
import { MainRoutes } from 'routes/MainRoutes'
import { AdminRoutes } from 'routes/AdminRoutes'
import store from './store/store'
import { Provider } from 'react-redux'
import ErrorBoundary from 'services/ErrorBoundary/ErrorBoundary'
import CookiesDetector from 'services/CookiesDetector/CookiesDetector'
import { ThemeProvider } from 'services/ThemeProvider/ThemeProvider'
import './styles/index.scss'

export const App = () => {
  const isAdmin = false
  return (
    <Suspense fallback={null}>
      <CookiesDetector>
        <Provider store={store}>
          <ErrorBoundary>
            <ThemeProvider>
              {isAdmin ? <AdminRoutes /> : <MainRoutes />}
            </ThemeProvider>
          </ErrorBoundary>
        </Provider>
      </CookiesDetector>
    </Suspense>
  )
}
