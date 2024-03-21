import { useGetTracksQuery } from '@/api/hooks/get-tracks'
import { useUpdatePlaylistMutation } from '@/api/hooks/update-playlist'
import TrackList from '@/components/TrackList'
import usePagination from '@/hooks/usePagination'
import usePlayer from '@/hooks/usePlayer'
import useSearch from '@/hooks/useSearch'
import { ReactElement, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function PlaylistDetails(): ReactElement {
  const { playlistId = '' } = useParams()
  const pagination = usePagination({ limit: 50 })
  const [playlistState, setPlaylistState] = useState<string>('')
  const search = useSearch({ onChange: () => pagination.reset() })
  const { audioRef, setTracks, setTrackIndex, trackIndex, trackStates, setTrackState } = usePlayer()
  const [updatePlaylists] = useUpdatePlaylistMutation()
  const { data, loading, refetch } = useGetTracksQuery({
    variables: {
      query: {
        playlistId,
        pagination: pagination.value,
        search: search.value
      }
    }
  })

  const { tracks = [], count = 0 } = data?.getTracks ?? {}

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

  const handleDeleteTrackFromPlaylist = async (trackId: string): Promise<void> => {
    await updatePlaylists({ variables: { input: { playlistId, trackId } } })
    await refetch()
  }

  if (loading) return <h1>Loading...</h1>

  return (
    <TrackList
      tracks={tracks}
      count={count}
      pagination={pagination}
      search={search}
      onTogglePlay={handleTogglePlay}
      onDeleteTrack={handleDeleteTrackFromPlaylist}
    />
  )
}
