import { useGetDefaultPlaylistsQuery } from '@/api/hooks/get-default-playlists'
import { Container, ImageList, ImageListItem, ImageListItemBar, ListSubheader } from '@mui/material'
import { ReactElement } from 'react'
import { Image } from './styles'
import defaultImage from './assets/default-img.png'
import { useNavigate } from 'react-router-dom'

export default function DefaultPlaylists(): ReactElement {
  const naviagate = useNavigate()
  const { data, loading } = useGetDefaultPlaylistsQuery()

  if (loading) return <h1>Loading...</h1>

  const defaultPlaylists = data?.getDefaultPlaylists.playlists ?? []

  const handleClick = (id: string): void => {
    naviagate(`/home/${id}`)
  }

  return (
    <Container sx={{ width: '100%', maxWidth: 800 }}>
      <ImageList>
        <ImageListItem key="Subheader" cols={2}>
          <ListSubheader component="div">Playlists</ListSubheader>
        </ImageListItem>
        {defaultPlaylists.map(item => (
          <ImageListItem key={item.id} onClick={() => handleClick(item.id)} sx={{ cursor: 'pointer', margin: '0 2 rem 2rem 0' }}>
            {item.imageUrl != null ? <Image src={`${item.imageUrl}`} alt={item.name} /> : <Image src={defaultImage} />}
            <ImageListItemBar title={item.name} sx={{ maxWidth: 'fit-content', fontSize: 22, fontWeight: 'bold' }} />
          </ImageListItem>
        ))}
      </ImageList>
    </Container>
  )
}
