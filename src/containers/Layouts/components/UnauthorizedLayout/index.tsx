import { ReactElement, ReactNode } from 'react'
import { AppBar, Box, Button, Container, Toolbar, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

type UnauthorizedLayoutProps = {
  children: ReactNode
}

export default function UnauthorizedLayout({ children }: UnauthorizedLayoutProps): ReactElement {
  const navigate = useNavigate()

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
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <Button sx={{ color: '#fff' }} onClick={() => navigate('/sign-up')}>
              Sign up
            </Button>
            <Button sx={{ color: '#fff' }} onClick={() => navigate('/sign-in')}>
              Login
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {children}
    </Container>
  )
}
