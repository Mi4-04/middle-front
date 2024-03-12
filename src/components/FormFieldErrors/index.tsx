import type { ReactElement } from 'react'
import { useField } from 'react-final-form'
import FormFieldMessage from '../FormFieldMessage'

type FormFieldErrorsProps = {
  className?: string
  name: string
}

export function FormFieldErrors(props: FormFieldErrorsProps): ReactElement | null {
  const { className, name } = props

  const {
    meta: { error, submitError, dirtySinceLastSubmit, touched }
  } = useField(name, { subscription: { error: true, submitError: true, dirtySinceLastSubmit: true, touched: true } })

  const shouldShowValidationError = Boolean(error && touched)
  const shouldShowSubmitError = Boolean(submitError && !dirtySinceLastSubmit)

  const errors = [shouldShowValidationError ? error : null, shouldShowSubmitError ? submitError : null].filter(Boolean)

  return <FormFieldMessage className={className} messages={errors} />
}
