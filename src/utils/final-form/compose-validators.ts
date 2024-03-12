import type { FieldValidator } from 'final-form'

type Validators<T> = ReadonlyArray<FieldValidator<T>>

export default function composeValidators<T>(...validators: Validators<T>): FieldValidator<T> {
  return (...args) =>
    validators.reduce((error, validator) => {
      if (error) return error
      return validator(...args)
    }, undefined)
}
