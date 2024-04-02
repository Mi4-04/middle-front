import { createContext } from 'react'

export type AuthContextType = {
  accessToken: string | null
  auth: (token: string) => void
  logout: () => void
}

const defaultContextValue = {
  accessToken: null,
  auth: () => {},
  logout: () => {}
}

const AuthContext = createContext<AuthContextType>(defaultContextValue)

export default AuthContext
