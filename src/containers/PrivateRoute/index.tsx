import { type ComponentType, createElement, type ReactElement, type ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import useCurrentUser from '@/hooks/useCurrentUser'

type PrivateRouteProps = {
  children?: ReactNode
  element?: ReactElement
  component?: ComponentType<{}>
}

export default function PrivateRoute(props: PrivateRouteProps): ReactElement | null {
  const { children, element, component } = props
  const { currentUser } = useCurrentUser()

  const isAuthenticated = currentUser != null

  if (!isAuthenticated) return <Navigate to="/sign-in" />
  if (children) return <>{children}</>
  if (element) return element
  if (component) return createElement(component)
  return null
}
