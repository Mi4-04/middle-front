import { useGetTracksForGuestQuery } from '@/api/hooks/get-tracks-for-guest'
import { ArrowBack, Search } from '@mui/icons-material'
import { Avatar, Container, Divider, IconButton, InputAdornment, List, ListItem, ListItemAvatar, ListItemText, TextField, Typography } from '@mui/material'
import { ReactElement } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function HomeItem(): ReactElement {
  const { playlistId = '' } = useParams()
  const navigate = useNavigate()

  const { data, loading } = useGetTracksForGuestQuery({
    variables: {
      query: {
        playlistId
      }
    }
  })

  const { tracks = [], count = 0 } = data?.getTracksForGuest ?? {}

  const handleBack = (): void => navigate(-1)

  if (loading) return <h1>Loading...</h1>

  return (
    <Container sx={{ display: 'flex', mt: 10, justifyContent: 'space-around' }}>
      <IconButton sx={{ display: 'flex', width: 20, height: 20, alignItems: 'flex-start' }} onClick={handleBack}>
        <ArrowBack />
      </IconButton>
      <List sx={{ width: '100%', maxWidth: 450 }}>
        <TextField
          name="search"
          sx={{ margin: '0 0 20px 25px' }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            )
          }}
          variant="standard"
        />
        {tracks.map(({ id, available, name, audioUrl, trackId, artist, imageUrl }) => (
          <>
            <ListItem alignItems="flex-start" sx={{ background: available ? 'white' : '#b0aeae' }}>
              <ListItemAvatar>
                <Avatar alt={name} src={imageUrl ?? ''} />
              </ListItemAvatar>
              <ListItemText
                primary={name}
                secondary={
                  <Typography sx={{ display: 'inline' }} component="span" variant="body2" color="text.primary">
                    {artist}
                  </Typography>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </>
        ))}
      </List>
    </Container>
  )
}
