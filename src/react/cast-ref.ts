import type { MutableRefObject } from 'react'

type Nullable<T> = T | null | undefined

export type AnyRef<T> = MutableRefObject<Nullable<T>> | Nullable<T>

/**
 * Pick value from any ref like object
 */

export default function castRef<T>(ref: AnyRef<T>): NonNullable<T> | null {
  return nullable(isRefLike(ref) ? ref.current : ref)
}

function isRefLike<T>(value: any): value is MutableRefObject<T> {
  return Boolean(value && Object.prototype.hasOwnProperty.call(value, 'current'))
}

function nullable<T>(value: T): NonNullable<T> | null {
  return value ?? null
}
