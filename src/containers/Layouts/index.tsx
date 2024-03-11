import useCurrentUser from '@/hooks/useCurrentUser'
import { ReactElement, ReactNode } from 'react'
import AuthroizedLayout from './components/AuthorizetedLayout'
import UnauthorizedLayout from './components/UnauthorizedLayout'

type LayoutProps = {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps): ReactElement {
  const { currentUser } = useCurrentUser()
  const CurrentLayout = currentUser != null ? AuthroizedLayout : UnauthorizedLayout

  return <CurrentLayout>{children}</CurrentLayout>
}
