import { Playlist } from '@/api/types'
import { Container, ImageList, ImageListItem, ImageListItemBar, ListSubheader } from '@mui/material'
import { ReactElement } from 'react'
import defaultImage from './assets/default-img.png'
import { Image } from './styles'

type PlaylistListProps = {
  list: Playlist[]
  onClick: (id: string) => void
  title?: string
}

export default function PlaylistList(props: PlaylistListProps): ReactElement {
  const { list, onClick, title } = props

  return (
    <Container sx={{ width: '100%', maxWidth: 800 }}>
      <ImageList>
        <ImageListItem key="Subheader" cols={2}>
          {title != null ? <ListSubheader component="div">{title}</ListSubheader> : null}
        </ImageListItem>
        {list.map(({ id, name, imageUrl }) => (
          <ImageListItem key={id} onClick={() => onClick(id)} sx={{ cursor: 'pointer', margin: '0 2 rem 2rem 0' }}>
            {imageUrl != null ? <Image src={`${imageUrl}`} alt={name} /> : <Image src={defaultImage} alt={name} />}
            <ImageListItemBar title={name} sx={{ maxWidth: 'fit-content', fontSize: 22, fontWeight: 'bold' }} />
          </ImageListItem>
        ))}
      </ImageList>
    </Container>
  )
}
