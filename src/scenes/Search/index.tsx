import { ReactElement } from 'react'
import { Container, List } from '@mui/material'
import { useGetTracksForGuestQuery } from '@/api/hooks/get-tracks-for-guest'
import TrackItem from '@/components/TrackItem'
import usePlayer from '@/hooks/usePlayer'
import usePagination from '@/hooks/usePagination'
import Paginate from '@/components/Paginate'
import useSearch from '@/hooks/useSearch'
import SearchBar from '@/components/SearchBar'
import { useUpdatePlaylistMutation } from '@/api/hooks/update-playlist'
import { Track } from '@/api/types'

export default function Search(): ReactElement {
  const pagination = usePagination({ limit: 50 })
  const search = useSearch({ onChange: () => pagination.reset() })
  const { data, loading } = useGetTracksForGuestQuery({
    variables: { query: { pagination: { limit: 100, offset: pagination.value.offset }, search: search.value } }
  })
  const [updatePlaylist] = useUpdatePlaylistMutation()
  const { audioRef, setTracks, setTrackIndex, trackIndex, trackStates, setTrackState } = usePlayer()

  const { tracks = [], count = 0 } = data?.getTracksForGuest ?? {}

  const handleTogglePlay = (index: number, realId: string): void => {
    if (trackIndex === index) {
      if (trackStates[realId]) audioRef?.current?.audio.current?.pause()
      else audioRef?.current?.audio.current?.play()

      setTrackState(realId, !trackStates[realId])
    } else {
      setTracks(tracks)
      setTrackIndex(index)
      setTrackState(realId, true)
    }
  }

  const handleUpdatePlaylist = async (track: Track, playlistId: string): Promise<void> => {
    const { available, id, __typename, ...rest} = track
    await updatePlaylist({ variables: { input: { track: rest, playlistId } } })
  }

  if (loading) return <h1>Loading...</h1>
  return (
    <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
      <List sx={{ width: '100%', maxWidth: 450 }}>
        <SearchBar value={search.value} onChange={search.change} />
        {tracks.map((track, index) => (
          <TrackItem key={index} track={track} index={index} onTogglePlay={handleTogglePlay} onUpdatePlaylist={handleUpdatePlaylist} />
        ))}
        <Paginate pagination={pagination} totalCount={count} />
      </List>
    </Container>
  )
}
