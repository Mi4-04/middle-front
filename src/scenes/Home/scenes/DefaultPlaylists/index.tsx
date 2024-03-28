import { type ReactElement } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container } from '@mui/material'
import PlaylistList from '@/components/PlaylistList'
import { useGetDefaultPlaylistsQuery } from '@/api/hooks/get-default-playlists'

export default function DefaultPlaylists(): ReactElement {
  const naviagate = useNavigate()
  const { data, loading } = useGetDefaultPlaylistsQuery()

  if (loading) return <h1>Loading...</h1>

  const defaultPlaylists = data?.getDefaultPlaylists.playlists ?? []

  const handleClick = (id: string): void => {
    naviagate(`/home/${id}`)
  }

  return (
    <Container>
      <PlaylistList list={defaultPlaylists} onClick={handleClick} title={`Playlists`} />
    </Container>
  )
}
