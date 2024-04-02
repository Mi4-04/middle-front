import { useContext } from 'react'
import AuthContext, { type AuthContextType } from '@/providers/AuthProvider/context'

export default function useAuth(): AuthContextType {
  return useContext(AuthContext)
}
