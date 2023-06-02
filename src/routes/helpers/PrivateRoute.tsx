import { ComponentType } from 'react'
import { Route, RouteProps } from 'react-router-dom'
import { NotAuthorized } from './NotAuthorized'

interface PrivateRouteProps {
  element: ComponentType<any>
  isAccess: boolean
}

type ExtendedRouteProps = PrivateRouteProps & RouteProps

export const privateRoute: React.FC<ExtendedRouteProps> = ({
  element,
  isAccess,
  ...route
}) => {
  const Component = isAccess ? element : NotAuthorized
  return <Route path={route.path} {...route} element={<Component />} />
}
