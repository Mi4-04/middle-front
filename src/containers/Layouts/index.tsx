import { type ReactElement, type ReactNode } from 'react'
import useAuth from '@/hooks/useAuth'
import AuthroizedLayout from './components/AuthorizetedLayout'
import UnauthorizedLayout from './components/UnauthorizedLayout'

type LayoutProps = {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps): ReactElement {
  const { accessToken } = useAuth()
  const CurrentLayout = accessToken != null ? AuthroizedLayout : UnauthorizedLayout

  return <CurrentLayout>{children}</CurrentLayout>
}
