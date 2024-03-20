import { Track } from '@/api/types'
import usePlayer from '@/hooks/usePlayer'
import { ReactElement } from 'react'
import { Avatar, Divider, IconButton, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material'
import { PlayArrow, Pause } from '@mui/icons-material'

type TrackItemProps = {
  track: Track
  index: number
  onTogglePlay: (index: number, realId: string) => void
}

export default function TrackItem(props: TrackItemProps): ReactElement {
  const { trackStates } = usePlayer()
  const { track, index, onTogglePlay } = props
  const { realId, name, artist, available, imageUrl } = track

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
        <IconButton disabled={!available} onClick={() => onTogglePlay(index, realId)}>
          {trackStates[realId] ? <Pause /> : <PlayArrow />}
        </IconButton>
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  )
}
