import { ReactElement, ReactNode } from 'react'
import { isEmail } from '../is-email'

export type Message = ReactNode | ReactElement | string

type EmptyValues = undefined | null | '' | 0 | false | []

type FieldValidatorBase<FieldValue> = (value: FieldValue) => Message | undefined
export type FieldValidator<FieldValue> = FieldValidatorBase<FieldValue | undefined>
export type Validator = (value: any) => string | undefined

export function email(message: Message = `Email is incorrect.`): FieldValidator<string> {
  return skipEmpty(value => (!isEmail(value) ? message : undefined))
}

export function maxLength(maxLength: number, message: Message = `The text is too long.`): FieldValidator<string> {
  return skipEmpty(value => (value.trim().length > maxLength ? message : undefined))
}

export function minLength(minLength: number, message: Message = `The text is too short.`): FieldValidator<string> {
  return skipEmpty(value => (value.trim().length < minLength ? message : undefined))
}

function isEmpty<T>(value: T): value is Extract<T, EmptyValues> {
  return (
    value == null ||
    (typeof value === 'string' && value.trim().length === 0) ||
    (typeof value === 'number' && value === 0) ||
    (typeof value === 'boolean' && value === false) ||
    (Array.isArray(value) && value.length === 0)
  )
}

export function skipEmpty<T>(validate: FieldValidatorBase<Exclude<T, EmptyValues>>): FieldValidator<T> {
  return value => (!isEmpty(value) ? validate(value as Exclude<T, EmptyValues>) : undefined)
}
