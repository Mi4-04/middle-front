import { ReactElement, ReactNode } from 'react'
import { Container } from '@mui/material'

type UnauthorizedLayoutProps = {
  children: ReactNode
}

export default function UnauthorizedLayout({ children }: UnauthorizedLayoutProps): ReactElement {
  return (
    <Container>
      <h1>Unathorized layout</h1>
      {children}
    </Container>
  )
}
