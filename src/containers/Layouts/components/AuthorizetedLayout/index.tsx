import { ReactElement, ReactNode } from 'react'
import { Box, Button, Container, AppBar, Toolbar, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useSignOutMutation } from '@/api/hooks/sign-out'
import { SessionEmitter } from '@/utils/authentication'
import { showToast } from '@/utils/toast'
import { getDefaultErrorMessage } from '@/api/api-errors'
import AudioPlayer from '@/components/AudioPlayer'

type AuthorizedLayoutProps = {
  children: ReactNode
}

export default function AuthroizedLayout({ children }: AuthorizedLayoutProps): ReactElement {
  const navigate = useNavigate()
  const [signOut, { loading }] = useSignOutMutation()

  const handleSignOutClick = async (): Promise<void> => {
    if (loading) return
    try {
      await signOut()
      SessionEmitter.emit('signOut')
      navigate('/sign-in')
    } catch (e) {
      showToast(getDefaultErrorMessage(e), { type: 'error', autoClose: false })
    }
  }

  return (
    <Container sx={{ width: '100%' }}>
      <AppBar component="nav">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block', cursor: 'pointer' } }}
            onClick={() => navigate('/home')}
          >
            Music
          </Typography>
          <Box sx={{ display: 'flex', gap: '3rem' }}>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block', cursor: 'pointer' } }}
              onClick={() => navigate('/search')}
            >
              Search track
            </Typography>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block', cursor: 'pointer' } }}
              onClick={() => navigate('/my-playlists')}
            >
              My playlists
            </Typography>
            <div>
              <Button sx={{ color: '#fff' }} onClick={handleSignOutClick}>
                Sign out
              </Button>
            </div>
          </Box>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 10 }}>
        {children} <AudioPlayer />
      </Container>
    </Container>
  )
}
