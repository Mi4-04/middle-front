import { MouseEvent, ReactElement, useState } from 'react'
import { useGetPlaylistsLazyQuery } from '@/api/hooks/get-playlists'
import { Track } from '@/api/types'
import { Add } from '@mui/icons-material'
import { IconButton, Menu, MenuItem } from '@mui/material'

type AddTrackProps = {
  track: Track
  onUpdatePlaylist: (track: Track, playlistId: string) => Promise<void>
}

const ITEM_HEIGHT = 48

export default function AddTrack({ track, onUpdatePlaylist }: AddTrackProps): ReactElement {
  const [getPlaylists, { data }] = useGetPlaylistsLazyQuery({ variables: { realId: track.realId } })

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const open = Boolean(anchorEl)

  const handleClick = async (event: MouseEvent<HTMLElement>): Promise<void> => {
    setAnchorEl(event.currentTarget)
    await getPlaylists()
  }
  const handleClose = (): void => setAnchorEl(null)

  const handleAddTrackToPlaylist = async (playlistId: string): Promise<void> => {
    onUpdatePlaylist(track, playlistId)
    handleClose()
  }

  const playlists = data?.getPlaylists.playlists ?? []

  return (
    <>
      <IconButton disabled={!track.available} onClick={handleClick}>
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
          <MenuItem key={id} sx={{ dislay: 'flex', justifyContent: 'space-between' }} onClick={async () => handleAddTrackToPlaylist(id)}>
            {name} <Add />
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}
