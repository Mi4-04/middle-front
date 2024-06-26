import { type ReactElement } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container } from '@mui/material'
import PlaylistListBase from '@/components/PlaylistList'
import { useGetPlaylistsQuery } from '@/api/hooks/get-playlists'
import { useDeletePlaylistMutation } from '@/api/hooks/delete-playlist'
import AddPlaylist from './components/AddPlaylist'

export default function PlaylistList(): ReactElement {
  const { data, loading, refetch } = useGetPlaylistsQuery()
  const [deletePlaylist] = useDeletePlaylistMutation()
  const navigate = useNavigate()

  if (loading) return <h1>Loading...</h1>

  const playlists = data?.getPlaylists.playlists ?? []

  const handleClick = (id: string): void => {
    navigate(`/my-playlists/${id}`)
  }

  const handleRefreshList = async (): Promise<void> => {
    await refetch()
  }

  const handleDeletePlaylist = async (id: string): Promise<void> => {
    await deletePlaylist({ variables: { id } })
    await refetch()
  }

  return (
    <Container>
      <AddPlaylist onRefreshList={handleRefreshList} />
      <PlaylistListBase list={playlists} onClick={handleClick} onDeletePlaylist={handleDeletePlaylist} />
    </Container>
  )
}
