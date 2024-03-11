import { useGetTracksForGuestQuery } from '@/api/hooks/get-tracks-for-guest'
import { Avatar, Container, Divider, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material'
import { Fragment, ReactElement } from 'react'
import { useParams } from 'react-router-dom'

export default function HomeItem(): ReactElement {
  const { playlistId = '' } = useParams()
  console.log({ playlistId })
  const { data, loading } = useGetTracksForGuestQuery({
    variables: {
      query: {
        playlistId
      }
    }
  })

  const { tracks = [], count = 0 } = data?.getTracksForGuest ?? {}

  return (
    <Container sx={{ width: '100%', maxWidth: 450 }}>
      <List>
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
