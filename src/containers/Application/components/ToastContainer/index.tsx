import { type ReactElement } from 'react'
import useMediaQuery from '@/hooks/useMediaQuery'
import { StyledToastContainer } from './styles'

export default function ToastContainer(): ReactElement {
  const isMobile = useMediaQuery('max-width: 599px')

  return <StyledToastContainer limit={isMobile ? 3 : 5} />
}
