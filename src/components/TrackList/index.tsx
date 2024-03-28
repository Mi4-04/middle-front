import { ArrowBack } from '@mui/icons-material'
import { Container, IconButton, List } from '@mui/material'
import { type ReactElement } from 'react'
import { useNavigate } from 'react-router-dom'
import { type Pagination } from '@/hooks/usePagination'
import { type Search } from '@/hooks/useSearch'
import { type Track } from '@/api/types'
import Paginate from '../Paginate'
import SearchBar from '../SearchBar'
import TrackItem from './components/TrackItem'

type TrackListProps = {
  tracks: Track[]
  count: number
  pagination: Pagination
  search: Search
  onTogglePlay: (index: number, realId: string) => void
  onAddTrack?: (track: Track, playlistId: string) => void
  onDeleteTrack?: (trackId: string) => void
}

export default function TrackList(props: TrackListProps): ReactElement {
  const { tracks, count, pagination, search, onTogglePlay, onAddTrack, onDeleteTrack } = props
  const navigate = useNavigate()

  const handleBack = (): void => navigate(-1)

  return (
    <Container sx={{ display: 'flex', justifyContent: 'center' }}>
      <IconButton sx={{ display: 'flex', width: 20, height: 20, alignItems: 'flex-start' }} onClick={handleBack}>
        <ArrowBack />
      </IconButton>
      <List sx={{ width: '100%', maxWidth: 450 }}>
        <SearchBar value={search.value} onChange={search.change} />
        {tracks.map((track, index) => (
          <TrackItem key={index} track={track} index={index} onTogglePlay={onTogglePlay} onAddTrack={onAddTrack} onDeleteTrack={onDeleteTrack} />
        ))}
        <Paginate pagination={pagination} totalCount={count} />
      </List>
    </Container>
  )
}
