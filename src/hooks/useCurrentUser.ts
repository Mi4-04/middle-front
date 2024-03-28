import { useContext } from 'react'
import UserContext, { type UserContextType } from '@/providers/UserProvider/context'

export default function useCurrentUser(): UserContextType {
  return useContext(UserContext)
}
