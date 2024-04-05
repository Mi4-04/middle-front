import { lazy, type ReactElement } from 'react'
import { Route, Routes } from 'react-router-dom'

const PlaylistList = lazy(async () => import('./scenes/PlaylistList'))
const PlaylistDetails = lazy(async () => import('./scenes/PlaylistDetails'))

export default function MyPlaylists(): ReactElement {
  return (
    <Routes>
      <Route index element={<PlaylistList />} />
      <Route path=":playlistId" element={<PlaylistDetails />} />
    </Routes>
  )
}
