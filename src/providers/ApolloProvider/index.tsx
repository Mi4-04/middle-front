import { type ReactElement, type ReactNode } from 'react'
import { ApolloClient, concat, type DefaultOptions, HttpLink, InMemoryCache, ApolloProvider as Provider } from '@apollo/client'
import authValidationLink from '@/utils/apollo/auth-validation-link'
import { apiUrl } from '@/config'

type ApolloProviderProps = {
  children: ReactNode
}

const authToken = localStorage.getItem('auth_token')

const httpLink = new HttpLink({
  uri: apiUrl,
  credentials: 'include',
  headers: {
    authorization: authToken ? `Bearer ${authToken}` : ''
  }
})

const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: 'cache-and-network'
  }
}

const client = new ApolloClient({
  link: concat(authValidationLink, httpLink),
  cache: new InMemoryCache(),
  defaultOptions
})

export default function ApolloProvider({ children }: ApolloProviderProps): ReactElement {
  return <Provider client={client}>{children}</Provider>
}
