import { type ReactElement, useState } from 'react'
import { Add } from '@mui/icons-material'
import { DialogContent, IconButton, Modal } from '@mui/material'
import ModalForm from './components/ModalForm'

type AddPlaylistProps = {
  onRefreshList: () => Promise<void>
}

export default function AddPlaylist(props: AddPlaylistProps): ReactElement {
  const { onRefreshList } = props
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const handleOpen = (): void => setIsOpen(true)
  const handleClose = (): void => setIsOpen(false)

  return (
    <>
      <IconButton onClick={handleOpen}>
        <Add sx={{ width: '4rem', height: '4rem' }} />
      </IconButton>
      <Modal sx={{ position: 'absolute' as 'absolute', top: '35%', left: '35%', maxWidth: '40rem', width: '100%' }} open={isOpen} onClose={handleClose}>
        <DialogContent>
          <ModalForm onRefreshList={onRefreshList} onClose={handleClose} />
        </DialogContent>
      </Modal>
    </>
  )
}
