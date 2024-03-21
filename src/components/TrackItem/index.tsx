import { ReactElement } from 'react'
import { Track } from '@/api/types'
import usePlayer from '@/hooks/usePlayer'
import { Avatar, Divider, IconButton, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material'
import { PlayArrow, Pause } from '@mui/icons-material'
import useCurrentUser from '@/hooks/useCurrentUser'
import AddTrack from './components/AddTrack'

type TrackItemProps = {
  track: Track
  index: number
  onTogglePlay: (index: number, realId: string) => void
  onUpdatePlaylist?: (track: Track, playlistId: string) => Promise<void>
}

export default function TrackItem(props: TrackItemProps): ReactElement {
  const { track, index, onTogglePlay, onUpdatePlaylist } = props
  const { realId, name, artist, available, imageUrl } = track

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
        {currentUser != null && onUpdatePlaylist != null ? <AddTrack track={track} onUpdatePlaylist={onUpdatePlaylist} /> : null}
        <IconButton disabled={!available} onClick={() => onTogglePlay(index, realId)}>
          {trackStates[realId] ? <Pause /> : <PlayArrow />}
        </IconButton>
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  )
}
