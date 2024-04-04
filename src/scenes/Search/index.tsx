import { useState, type ReactElement } from 'react'
import usePlayer from '@/hooks/usePlayer'
import usePagination from '@/hooks/usePagination'
import useSearch from '@/hooks/useSearch'
import TrackList from '@/components/TrackList'
import { useUpdatePlaylistMutation } from '@/api/hooks/update-playlist'
import { type Track } from '@/api/types'
import { useGetTracksForGuestQuery } from '@/api/hooks/get-tracks-for-guest'

export default function Search(): ReactElement {
  const pagination = usePagination({ limit: 50 })
  const [currentOffset, setCurrentOffset] = useState(pagination.value.offset)
  const search = useSearch({ onChange: () => pagination.reset() })
  const { data, loading } = useGetTracksForGuestQuery({
    variables: { query: { pagination: { limit: 100, offset: pagination.value.offset }, search: search.value } }
  })
  const [updatePlaylist] = useUpdatePlaylistMutation()
  const { audioRef, setTracks, setTrackIndex, trackIndex, trackStates, setTrackState } = usePlayer()

  const { tracks = [], count = 0 } = data?.getTracksForGuest ?? {}

  const handleTogglePlay = (index: number, realId: string): void => {
    if (trackIndex === index && currentOffset === pagination.value.offset) {
      if (trackStates[realId]) audioRef?.current?.audio.current?.pause()
      else audioRef?.current?.audio.current?.play()

      setTrackState(realId, !trackStates[realId])
    } else {
      setTracks(tracks)
      setTrackIndex(index)
      setTrackState(realId, true)
      setCurrentOffset(pagination.value.offset)
    }
  }

  const handleAddTrackToPlaylist = async (track: Track, playlistId: string): Promise<void> => {
    const { available, id, __typename, ...rest } = track
    await updatePlaylist({ variables: { input: { track: rest, playlistId } } })
  }

  if (loading) return <h1>Loading...</h1>

  return (
    <TrackList tracks={tracks} count={count} pagination={pagination} search={search} onTogglePlay={handleTogglePlay} onAddTrack={handleAddTrackToPlaylist} />
  )
}
