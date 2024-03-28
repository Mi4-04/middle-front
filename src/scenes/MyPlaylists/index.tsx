import { lazy, type ReactElement } from 'react'
import { Route, Routes } from 'react-router-dom'

const PlaylistList = lazy(async () => import('./PlaylistList'))
const PlaylistDetails = lazy(async () => import('./PlaylistDetails'))

export default function MyPlaylists(): ReactElement {
  return (
    <Routes>
      <Route index element={<PlaylistList />} />
      <Route path=":playlistId" element={<PlaylistDetails />} />
    </Routes>
  )
}
