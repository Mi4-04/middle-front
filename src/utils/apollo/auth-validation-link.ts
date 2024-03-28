import { onError } from '@apollo/client/link/error'
import ApiErrors from '@/api/api-errors'
import { SessionEmitter } from '../authentication'

const authValidationLink = onError(e => {
  const isUnauthorized = ApiErrors.InvalidAuthToken.is(e) || ApiErrors.AuthTokenExpired.is(e)
  if (isUnauthorized) {
    if (e.response) e.response.errors = undefined
    SessionEmitter.emit('signOut')
  }
})

export default authValidationLink
