import { onError } from '@apollo/client/link/error'
import ApiErrors from '@/api/api-errors'

const authValidationLink = onError(e => {
  const isUnauthorized = ApiErrors.InvalidAuthToken.is(e) || ApiErrors.AuthTokenExpired.is(e)
  if (isUnauthorized) {
    if (e.response) e.response.errors = undefined
    localStorage.removeItem('auth_token')
  }
})

export default authValidationLink
