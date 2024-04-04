import { type ReactElement, useState } from 'react'
import { useParams } from 'react-router-dom'
import usePlayer from '@/hooks/usePlayer'
import usePagination from '@/hooks/usePagination'
import useSearch from '@/hooks/useSearch'
import TrackList from '@/components/TrackList'
import { useGetTracksForGuestQuery } from '@/api/hooks/get-tracks-for-guest'

export default function PlaylistDetails(): ReactElement {
  const { playlistId = '' } = useParams()
  const pagination = usePagination({ limit: 50 })
  const [playlistIdState, setPlaylistIdState] = useState<string>('')
  const [currentOffset, setCurrentOffset] = useState(pagination.value.offset)
  const search = useSearch({ onChange: () => pagination.reset() })
  const { audioRef, setTracks, setTrackIndex, trackIndex, trackStates, setTrackState } = usePlayer()

  const { data, loading } = useGetTracksForGuestQuery({
    variables: {
      query: {
        playlistId,
        pagination: pagination.value,
        search: search.value
      }
    }
  })

  const { tracks = [], count = 0 } = data?.getTracksForGuest ?? {}

  const handleTogglePlay = (index: number, realId: string): void => {
    if (trackIndex === index && playlistId === playlistIdState && currentOffset === pagination.value.offset) {
      if (trackStates[realId]) audioRef?.current?.audio.current?.pause()
      else audioRef?.current?.audio.current?.play()

      setTrackState(realId, !trackStates[realId])
    } else {
      setPlaylistIdState(playlistId)
      setTracks(tracks)
      setTrackIndex(index)
      setTrackState(realId, true)
      setCurrentOffset(pagination.value.offset)
    }
  }

  if (loading) return <h1>Loading...</h1>

  return <TrackList tracks={tracks} count={count} pagination={pagination} search={search} onTogglePlay={handleTogglePlay} />
}
