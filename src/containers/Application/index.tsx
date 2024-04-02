import { type ReactElement } from 'react'
import ApolloProvider from '@/providers/ApolloProvider'
import PlayerProvider from '@/providers/PlayerProvider'
import AuthProvider from '@/providers/AuthProvider'
import Root from '@/scenes'
import ToastContainer from './components/ToastContainer'

function App(): ReactElement {
  return (
    <>
      <ApolloProvider>
        <PlayerProvider>
          <ToastContainer />
          <AuthProvider>
            <Root />
          </AuthProvider>
        </PlayerProvider>
      </ApolloProvider>
    </>
  )
}

export default App
