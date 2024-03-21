import { Track } from '@/api/types'
import usePlayer from '@/hooks/usePlayer'
import { MouseEvent, ReactElement, useState } from 'react'
import { Avatar, Divider, IconButton, ListItem, ListItemAvatar, ListItemText, Menu, MenuItem, Typography } from '@mui/material'
import { PlayArrow, Pause, Add } from '@mui/icons-material'
import useCurrentUser from '@/hooks/useCurrentUser'
import { useGetPlaylistsLazyQuery } from '@/api/hooks/get-playlists'

type TrackItemProps = {
  track: Track
  index: number
  onTogglePlay: (index: number, realId: string) => void
  onUpdatePlaylist?: (track: Track, playlistId: string) => Promise<void>
}

const ITEM_HEIGHT = 48

export default function TrackItem(props: TrackItemProps): ReactElement {
  const { track, index, onTogglePlay, onUpdatePlaylist } = props
  const { realId, name, artist, available, imageUrl } = track

  const [getPlaylists, { data }] = useGetPlaylistsLazyQuery({ variables: { realId } })
  const { currentUser } = useCurrentUser()
  const { trackStates } = usePlayer()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const open = Boolean(anchorEl)

  const handleClick = async (event: MouseEvent<HTMLElement>): Promise<void> => {
    setAnchorEl(event.currentTarget)
    if (currentUser != null) {
      await getPlaylists()
    }
  }
  const handleClose = (): void => setAnchorEl(null)

  const handleAddTrackToPlaylist = async (track: Track, playlistId: string): Promise<void> => {
    onUpdatePlaylist?.(track, playlistId)
    handleClose()
  }

  const playlists = data?.getPlaylists.playlists ?? []

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
        {currentUser != null && onUpdatePlaylist != null ? (
          <>
            <IconButton disabled={!available} onClick={handleClick}>
              <Add />
            </IconButton>

            <Menu
              id="long-menu"
              MenuListProps={{
                'aria-labelledby': 'long-button'
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              PaperProps={{
                style: {
                  maxHeight: ITEM_HEIGHT * 4.5,
                  width: '20ch'
                }
              }}
            >
              {playlists.map(({ id, name }) => (
                <MenuItem key={id} sx={{ dislay: 'flex', justifyContent: 'space-between' }} onClick={async () => handleAddTrackToPlaylist(track, id)}>
                  {name} <Add />
                </MenuItem>
              ))}
            </Menu>
          </>
        ) : null}
        <IconButton disabled={!available} onClick={() => onTogglePlay(index, realId)}>
          {trackStates[realId] ? <Pause /> : <PlayArrow />}
        </IconButton>
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  )
}
