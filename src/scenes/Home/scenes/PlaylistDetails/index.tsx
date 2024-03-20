import { useGetTracksForGuestQuery } from '@/api/hooks/get-tracks-for-guest'
import { ArrowBack, Search } from '@mui/icons-material'
import { Container, IconButton, InputAdornment, List, TextField } from '@mui/material'
import { ReactElement, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import usePlayer from '@/hooks/usePlayer'
import usePagination from '@/hooks/usePagination'
import Paginate from '@/components/Paginate'
import TrackItem from '@/components/TrackItem'

export default function PlaylistDetails(): ReactElement {
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
        {tracks.map((track, index) => (
          <TrackItem key={index} track={track} index={index} onTogglePlay={handleTogglePlay} />
        ))}
        <Paginate pagination={pagination} totalCount={count} />
      </List>
    </Container>
  )
}
