import React, { Suspense } from 'react'

import store from './store/store'
import { Provider } from 'react-redux'
import ErrorBoundary from 'services/ErrorBoundary/ErrorBoundary'
import CookiesDetector from 'services/CookiesDetector/CookiesDetector'
import { ThemeProvider } from 'services/ThemeProvider/ThemeProvider'
import { Builder } from 'Builder'
import './styles/index.scss'

export const App = () => {
  return (
    <Suspense fallback={null}>
      <CookiesDetector>
        <Provider store={store}>
          <ErrorBoundary>
            <ThemeProvider>
              <Builder />
            </ThemeProvider>
          </ErrorBoundary>
        </Provider>
      </CookiesDetector>
    </Suspense>
  )
}
