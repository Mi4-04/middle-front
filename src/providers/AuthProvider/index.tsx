import usePlayer from '@/hooks/usePlayer'
import { jwtDecode } from 'jwt-decode'
import { type PropsWithChildren, type ReactElement, useEffect, useState } from 'react'
import AuthContext from './context'

type AuthProviderProps = PropsWithChildren<{}>

export default function UserProvider({ children }: AuthProviderProps): ReactElement | null {
  const token = localStorage.getItem('auth_token')
  const { setTracks } = usePlayer()

  const [accessToken, setAccessToken] = useState(token)

  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token)

      if ((decodedToken as any).exp * 1000 < Date.now()) {
        localStorage.removeItem('auth_token')
        setAccessToken(null)
      }
    }
  }, [token, setAccessToken])

  const auth = (token: string): void => {
    localStorage.setItem('auth_token', token)
    setAccessToken(token)
    setTracks([])
  }

  const logout = (): void => {
    localStorage.removeItem('auth_token')
    setAccessToken(null)
    setTracks([])
  }

  return <AuthContext.Provider value={{ accessToken, auth, logout }}>{children}</AuthContext.Provider>
}
