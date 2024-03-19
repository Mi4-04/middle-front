import ApolloProvider from '@/providers/ApolloProvider'
import PlayerProvider from '@/providers/PlayerProvider'
import UserProvider from '@/providers/UserProvider'
import Root from '@/scenes'
import { ReactElement } from 'react'
import SessionListener from './components/SessionEmitter'
import ToastContainer from './components/ToastContainer'

function App(): ReactElement {
  return (
    <>
      <ApolloProvider>
        <PlayerProvider>
          <SessionListener />
          <ToastContainer />
          <UserProvider>
            <Root />
          </UserProvider>
        </PlayerProvider>
      </ApolloProvider>
    </>
  )
}

export default App
