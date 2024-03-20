import { ReactElement } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGetPlaylistsQuery } from '@/api/hooks/get-playlists'
import PlaylistListBase from '@/components/PlaylistList'
import AddPlaylist from './components/AddPlaylist'
import { Container } from '@mui/material'
import { useCreatePlaylistMutation } from '@/api/hooks/create-playlist'
import { showToast } from '@/utils/toast'
import { getDefaultErrorMessage } from '@/api/api-errors'

export default function PlaylistList(): ReactElement {
  const { data, loading, refetch } = useGetPlaylistsQuery()
  const navigate = useNavigate()

  if (loading) return <h1>Loading...</h1>

  const playlists = data?.getPlaylists.playlists ?? []

  const handleClick = (id: string): void => {
    navigate(`/my-playlists/${id}`)
  }

  const handleRefreshList = async (): Promise<void> => {
    await refetch()
  }

  return (
    <Container>
      <AddPlaylist onRefreshList={handleRefreshList} />
      <PlaylistListBase list={playlists} onClick={handleClick} />
    </Container>
  )
}
