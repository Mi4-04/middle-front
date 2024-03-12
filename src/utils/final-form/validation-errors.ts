import { type FORM_ERROR } from 'final-form'

type ValidationErrors<TFormValues extends object> = {
  [FORM_ERROR]?: string
} & FieldErrors<TFormValues>

type FieldErrors<TFormValues> = TFormValues extends any[]
  ? string
  : TFormValues extends object
    ? { [K in keyof TFormValues]?: FieldErrors<TFormValues[K]> }
    : string

export default ValidationErrors
