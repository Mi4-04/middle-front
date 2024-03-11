import { useGetDefaultPlaylistsQuery } from '@/api/hooks/get-default-playlists'
import { Container, IconButton, ImageList, ImageListItem, ImageListItemBar, ListSubheader } from '@mui/material'
import { ReactElement } from 'react'
import { Image } from './styles'
import defaultImage from './assets/default-img.png'
import InfoIcon from '@mui/icons-material/Info'
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
    <Container sx={{ width: 800 }}>
      <ImageList>
        <ImageListItem key="Subheader" cols={2}>
          <ListSubheader component="div">Playlists</ListSubheader>
        </ImageListItem>
        {defaultPlaylists.map(item => (
          <ImageListItem key={item.id} sx={{ margin: '0 2rem 2rem 0' }}>
            {item.imageUrl != null ? <Image src={`${item.imageUrl}`} alt={item.name} /> : <Image src={defaultImage} />}
            <ImageListItemBar
              title={item.name}
              actionIcon={
                <IconButton sx={{ color: 'rgba(255, 255, 255, 0.54)' }} onClick={() => handleClick(item.id)} aria-label={`info about ${item.name}`}>
                  <InfoIcon />
                </IconButton>
              }
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Container>
  )
}
