import { ReactElement, ReactNode } from 'react'
import { Alert } from '@mui/material'

type FormFieldMessageProps = {
  className?: string
  messages: ReactNode[]
  type?: 'error' | 'success' | 'info'
}

export default function FormFieldMessage(props: FormFieldMessageProps): ReactElement | null {
  const { messages, className, type = 'error' } = props

  if (messages.length === 0) return null

  return (
    <Alert className={className} severity={type}>
      {messages.map((message, index) => (
        <span key={index}>{message}</span>
      ))}
    </Alert>
  )
}
