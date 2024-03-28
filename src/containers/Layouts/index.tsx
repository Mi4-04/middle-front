import { type ReactElement, type ReactNode } from 'react'
import useCurrentUser from '@/hooks/useCurrentUser'
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
