import { ReactElement, useState } from 'react'
import { useGetTracksForGuestQuery } from '@/api/hooks/get-tracks-for-guest'
import { useParams } from 'react-router-dom'
import usePlayer from '@/hooks/usePlayer'
import usePagination from '@/hooks/usePagination'
import useSearch from '@/hooks/useSearch'
import TrackList from '@/components/TrackList'

export default function PlaylistDetails(): ReactElement {
  const { playlistId = '' } = useParams()
  const pagination = usePagination({ limit: 50 })
  const [playlistState, setPlaylistState] = useState<string>('')
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

  return <TrackList tracks={tracks} count={count} pagination={pagination} search={search} onTogglePlay={handleTogglePlay} />
}
