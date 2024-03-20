import { ReactElement } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGetPlaylistsQuery } from '@/api/hooks/get-playlists'
import PlaylistListBase from '@/components/PlaylistList'

export default function PlaylistList(): ReactElement {
  const { data, loading } = useGetPlaylistsQuery()
  const navigate = useNavigate()

  if (loading) return <h1>Loading...</h1>

  const playlists = data?.getPlaylists.playlists ?? []

  const handleClick = (id: string): void => {
    navigate(`/my-playlists/${id}`)
  }

  return (
    <>
      <PlaylistListBase list={playlists} onClick={handleClick} />
    </>
  )
}
