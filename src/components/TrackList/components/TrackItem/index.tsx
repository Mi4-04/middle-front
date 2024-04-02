import { type ReactElement } from 'react'
import { Avatar, Divider, IconButton, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material'
import { Delete, Pause, PlayArrow } from '@mui/icons-material'
import usePlayer from '@/hooks/usePlayer'
import useAuth from '@/hooks/useAuth'
import { type Track } from '@/api/types'
import AddTrack from './components/AddTrack'

type TrackItemProps = {
  track: Track
  index: number
  onTogglePlay: (index: number, realId: string) => void
  onAddTrack?: (track: Track, playlistId: string) => void
  onDeleteTrack?: (trackId: string) => void
}

export default function TrackItem(props: TrackItemProps): ReactElement {
  const { track, index, onTogglePlay, onAddTrack, onDeleteTrack } = props
  const { id, realId, name, artist, available, imageUrl } = track

  const { accessToken } = useAuth()
  const { trackStates } = usePlayer()

  return (
    <>
      <ListItem alignItems="flex-start" sx={{ background: available ? 'white' : '#b0aeae' }}>
        <ListItemAvatar>
          <Avatar alt={name} src={imageUrl ?? ''} />
        </ListItemAvatar>
        <ListItemText
          primary={name}
          secondary={
            <Typography sx={{ display: 'inline' }} component="span" variant="body2" color="text.primary">
              {artist}
            </Typography>
          }
        />
        {accessToken != null && onAddTrack != null ? <AddTrack track={track} onUpdatePlaylist={onAddTrack} /> : null}
        {accessToken != null && onDeleteTrack != null && id != null ? (
          <IconButton onClick={() => onDeleteTrack(id)}>
            <Delete />
          </IconButton>
        ) : null}
        <IconButton disabled={!available} onClick={() => onTogglePlay(index, realId)}>
          {trackStates[realId] ? <Pause /> : <PlayArrow />}
        </IconButton>
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  )
}
