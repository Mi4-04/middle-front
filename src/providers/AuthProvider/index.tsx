import { useApolloClient } from '@apollo/client'
import { jwtDecode } from 'jwt-decode'
import { type PropsWithChildren, type ReactElement, useCallback, useEffect, useState } from 'react'
import AuthContext from './context'

type AuthProviderProps = PropsWithChildren<{}>

export default function UserProvider({ children }: AuthProviderProps): ReactElement | null {
  const token = localStorage.getItem('auth_token')
  const [accessToken, setAccessToken] = useState(token)
  const apolloClient = useApolloClient()

  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token)

      if ((decodedToken as any).exp * 1000 < Date.now()) {
        localStorage.removeItem('auth_token')
        setAccessToken(null)
      }
    }
  }, [token])

  const auth = useCallback(
    (token: string): void => {
      localStorage.setItem('auth_token', token)
      setAccessToken(token)
    },
    [setAccessToken]
  )

  const logout = useCallback((): void => {
    localStorage.removeItem('auth_token')
    setAccessToken(null)
    apolloClient.resetStore()
  }, [setAccessToken, apolloClient])

  return <AuthContext.Provider value={{ accessToken, auth, logout }}>{children}</AuthContext.Provider>
}
