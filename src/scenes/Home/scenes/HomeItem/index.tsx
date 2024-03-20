import { useGetTracksForGuestQuery } from '@/api/hooks/get-tracks-for-guest'
import { ArrowBack, Search, PlayArrow, Pause } from '@mui/icons-material'
import { Avatar, Container, Divider, IconButton, InputAdornment, List, ListItem, ListItemAvatar, ListItemText, TextField, Typography } from '@mui/material'
import { ReactElement, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import usePlayer from '@/hooks/usePlayer'
import usePagination from '@/hooks/usePagination'
import Paginate from '@/components/Paginate'

export default function HomeItem(): ReactElement {
  const { playlistId = '' } = useParams()
  const pagination = usePagination({ limit: 50 })
  const [playlistState, setPlaylistState] = useState<string>('')
  const { audioRef, setTracks, setTrackIndex, trackIndex, trackStates, setTrackState } = usePlayer()
  const navigate = useNavigate()

  const { data, loading } = useGetTracksForGuestQuery({
    variables: {
      query: {
        playlistId,
        pagination: pagination.value
      }
    }
  })

  const { tracks = [], count = 0 } = data?.getTracksForGuest ?? {}

  const handleBack = (): void => navigate(-1)

  const handleTogglePlay = (index: number, realId: string): void => {
    if (trackIndex === index && playlistId === playlistState) {
      if (trackStates[realId]) audioRef?.current?.audio.current?.pause()
      else audioRef?.current?.audio.current?.play()

      setTrackState(realId, !trackStates[realId])
    } else {
      setPlaylistState(playlistId)
      setTracks(tracks)
      setTrackIndex(index)
      setTrackState(realId, true)
    }
  }

  if (loading) return <h1>Loading...</h1>

  return (
    <Container sx={{ display: 'flex', justifyContent: 'space-around' }}>
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
        {tracks.map(({ id, available, name, realId, artist, imageUrl }, index) => (
          <div key={id ?? realId}>
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
              <IconButton disabled={!available} onClick={() => handleTogglePlay(index, realId)}>
                {trackStates[realId] ? <Pause /> : <PlayArrow />}
              </IconButton>
            </ListItem>
            <Divider variant="inset" component="li" />
          </div>
        ))}
        <Paginate pagination={pagination} totalCount={count} />
      </List>
    </Container>
  )
}
