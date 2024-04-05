import { type ReactElement, type ReactNode } from 'react'
import { ApolloClient, type DefaultOptions, HttpLink, InMemoryCache, ApolloProvider as Provider } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { apiUrl } from '@/config'

type ApolloProviderProps = {
  children: ReactNode
}

const authMiddleware = setContext((_, { headers }) => {
  const authToken = localStorage.getItem('auth_token')

  return {
    headers: {
      ...headers,
      authorization: authToken ? `Bearer ${authToken}` : ''
    }
  }
})

const httpLink = new HttpLink({
  uri: apiUrl,
  credentials: 'include'
})

const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: 'cache-and-network'
  }
}

const client = new ApolloClient({
  link: authMiddleware.concat(httpLink),
  cache: new InMemoryCache(),
  defaultOptions
})

export default function ApolloProvider({ children }: ApolloProviderProps): ReactElement {
  return <Provider client={client}>{children}</Provider>
}
