import { ReactElement } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGetDefaultPlaylistsQuery } from '@/api/hooks/get-default-playlists'
import PlaylistList from '@/components/PlaylistList'

export default function DefaultPlaylists(): ReactElement {
  const naviagate = useNavigate()
  const { data, loading } = useGetDefaultPlaylistsQuery()

  if (loading) return <h1>Loading...</h1>

  const defaultPlaylists = data?.getDefaultPlaylists.playlists ?? []

  const handleClick = (id: string): void => {
    naviagate(`/home/${id}`)
  }

  return <PlaylistList list={defaultPlaylists} onClick={handleClick} title={`Playlists`} />
}
