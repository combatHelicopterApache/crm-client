import React, { Suspense } from 'react'
// import Router from './components/Router/Router'
import { MainRoutes } from 'routes/MainRoutes'
import store from './store/store'
import { Provider } from 'react-redux'

import './styles/index.scss'

export const App = () => {
  return (
    <Suspense fallback={null}>
      <Provider store={store}>
        <MainRoutes />
      </Provider>
    </Suspense>
  )
}
