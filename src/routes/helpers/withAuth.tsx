import { Navigate, RouteProps } from 'react-router-dom'
import { ComponentType } from 'react'

export const withAuth = (Component: ComponentType<any>) => {
  const isAuth: null | string = JSON.parse(localStorage.getItem('auth'))?.token

  return function AuthenticatedRoute(props: RouteProps) {
    if (!isAuth) {
      return <Navigate to='/login' />
    }
    return <Component {...props} />
  }
}
