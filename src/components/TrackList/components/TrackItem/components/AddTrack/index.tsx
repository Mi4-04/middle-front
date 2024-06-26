import { type MouseEvent, type ReactElement, useState } from 'react'
import { Add } from '@mui/icons-material'
import { IconButton, Menu, MenuItem } from '@mui/material'
import { useGetPlaylistsLazyQuery } from '@/api/hooks/get-playlists'
import { type Track } from '@/api/types'

type AddTrackProps = {
  track: Track
  onUpdatePlaylist: (track: Track, playlistId: string) => void
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

  const handleAddTrackToPlaylist = (playlistId: string): void => {
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
          <MenuItem key={id} sx={{ dislay: 'flex', justifyContent: 'space-between' }} onClick={() => handleAddTrackToPlaylist(id)}>
            {name} <Add />
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}
