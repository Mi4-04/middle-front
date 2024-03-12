import { isApolloError } from '@apollo/client'

class ErrorKey {
  constructor(public readonly key: string) {}

  is(e: unknown): boolean {
    const keys = getErrorKeys(e)
    return keys.some(key => key === this.key)
  }
}

const InvalidAuthToken = new ErrorKey('AUTH_TOKEN_ERROR')
const AuthTokenExpired = new ErrorKey('TOKEN_OUTDATED_ERROR')
const UserAlreadyExist = new ErrorKey('USER_ALREADY_EXIST_ERROR')
const UserNotFound = new ErrorKey('USER_NOT_FOUND_ERROR')
const IncorrectPassword = new ErrorKey('INCORRECT_PASSWORD_ERROR')

export default {
  InvalidAuthToken,
  AuthTokenExpired,
  UserAlreadyExist,
  UserNotFound,
  IncorrectPassword
}

export function getDefaultErrorMessage(e: unknown): string {
  if (e instanceof Error && isApolloError(e) && e.networkError) return `Network error. Please contact support.`

  return `Server error. Something went wrong.`
}

type ApiException = { key?: string } | undefined

function getErrorKeys(e: unknown): string[] {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  if (isApolloError(e) && e.graphQLErrors)
    return e.graphQLErrors.reduce<string[]>((memo, error) => {
      const apiException = error.extensions?.exception as ApiException
      if (typeof apiException?.key === 'string') memo.push(apiException.key)
      return memo
    }, [])

  return []
}
