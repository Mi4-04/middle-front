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
    <ImageList>
      <ImageListItem key="Subheader" cols={3}>
        {title != null ? <ListSubheader component="div">{title}</ListSubheader> : null}
      </ImageListItem>
      {list.map(({ id, name, imageUrl }) => (
        <ImageListItem
          key={id}
          onClick={() => onClick(id)}
          sx={{ cursor: 'pointer', margin: '0 2rem 2rem 0', maxWidth: '20rem', width: '100%', height: '20rem' }}
        >
          {imageUrl != null ? <Image src={`${imageUrl}`} alt={name} /> : <Image src={defaultImage} alt={name} />}
          <ImageListItemBar title={name} sx={{ maxWidth: 'fit-content', fontSize: 22, fontWeight: 'bold' }} />
        </ImageListItem>
      ))}
    </ImageList>
  )
}
