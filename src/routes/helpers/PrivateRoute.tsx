import { ComponentType } from 'react'
import { Route, RouteProps } from 'react-router-dom'
import { NotAuthorized } from './NotAuthorized'

interface PrivateRouteProps extends RouteProps {
  element: ComponentType<any>
  isAccess: boolean
}

export const privateRoute = ({
  element,
  isAccess,
  ...route
}: PrivateRouteProps) => {
  const Component = isAccess ? element : NotAuthorized
  return <Route path={route.path} {...route} element={<Component />} />
}
