import { createContext } from 'react'

export type User = {
  id: string
  email: string
}

export type UserContextType = {
  currentUser: User | null
  refetch: () => Promise<void>
}

const defaultContextValue = {
  currentUser: null,
  refetch: () => {
    throw new Error('Form context cannot be used outside its provider.')
  }
}

const UserContext = createContext<UserContextType>(defaultContextValue)

export default UserContext
