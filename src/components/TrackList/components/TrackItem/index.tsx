import { ReactElement } from 'react'
import { Track } from '@/api/types'
import usePlayer from '@/hooks/usePlayer'
import { Avatar, Divider, IconButton, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material'
import { PlayArrow, Pause, Delete } from '@mui/icons-material'
import useCurrentUser from '@/hooks/useCurrentUser'
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

  const { currentUser } = useCurrentUser()
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
        {currentUser != null && onAddTrack != null ? <AddTrack track={track} onUpdatePlaylist={onAddTrack} /> : null}
        {currentUser != null && onDeleteTrack != null && id != null ? (
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
