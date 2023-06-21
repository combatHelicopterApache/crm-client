import React, { Suspense } from 'react'
import { Spin } from 'antd'
import store from './store/store'
import { Provider } from 'react-redux'
import ErrorBoundary from 'services/ErrorBoundary/ErrorBoundary'
import CookiesDetector from 'services/CookiesDetector/CookiesDetector'
import { ThemeProvider } from 'services/ThemeProvider/ThemeProvider'
import { Builder } from 'Builder'
import CacheBuster from 'services/CasheBuster/CasheBuster'
import './styles/index.scss'

export const App = () => {
  return (
    <Suspense fallback={null}>
      <CookiesDetector>
        <Provider store={store}>
          <ErrorBoundary>
            <ThemeProvider>
              <CacheBuster>
                {({ loading, isLatestVersion, refreshCacheAndReload }) => {
                  if (loading) return <Spin />
                  if (!loading && !isLatestVersion) refreshCacheAndReload()

                  return <Builder />
                }}
              </CacheBuster>
            </ThemeProvider>
          </ErrorBoundary>
        </Provider>
      </CookiesDetector>
    </Suspense>
  )
}
