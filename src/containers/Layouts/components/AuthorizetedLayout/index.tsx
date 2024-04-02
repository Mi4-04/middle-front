import { type ReactElement, type ReactNode } from 'react'
import { AppBar, Box, Button, Container, Toolbar, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { showToast } from '@/utils/toast'
import useAuth from '@/hooks/useAuth'
import AudioPlayer from '@/components/AudioPlayer'
import { getDefaultErrorMessage } from '@/api/api-errors'

type AuthorizedLayoutProps = {
  children: ReactNode
}

export default function AuthroizedLayout({ children }: AuthorizedLayoutProps): ReactElement {
  const navigate = useNavigate()
  const { logout } = useAuth()

  const handleSignOutClick = (): void => {
    try {
      logout()
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
      <Container sx={{ mt: 10, position: 'relative' }}>
        {children} <AudioPlayer />
      </Container>
    </Container>
  )
}
