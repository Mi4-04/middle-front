import { Delete, MoreVert } from '@mui/icons-material'
import { IconButton, Menu, MenuItem } from '@mui/material'
import { type MouseEvent, type ReactElement, useState } from 'react'

type OptionMenuProps = {
  onDeletePlaylist: () => Promise<void>
}

export default function OptionMenu(props: OptionMenuProps): ReactElement {
  const { onDeletePlaylist } = props
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: MouseEvent<HTMLElement>): void => {
    event.stopPropagation()
    setAnchorEl(event.currentTarget)
  }
  const handleClose = (): void => setAnchorEl(null)

  const handleDeletePlaylist = async (event: MouseEvent<HTMLElement>): Promise<void> => {
    event.stopPropagation()
    await onDeletePlaylist()
    handleClose()
  }

  return (
    <>
      <IconButton sx={{ width: '20px', ml: 37, mt: -1 }} onClick={handleClick}>
        <MoreVert />
      </IconButton>
      <Menu
        id="demo-customized-menu"
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button'
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleDeletePlaylist} disableRipple>
          <Delete />
          Delete
        </MenuItem>
      </Menu>
    </>
  )
}
