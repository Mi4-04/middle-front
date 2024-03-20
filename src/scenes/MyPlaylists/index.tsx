import { lazy, ReactElement } from 'react'
import { Route, Routes } from 'react-router-dom'
import PlaylistDetails from './PlaylistDetails'

const PlaylistList = lazy(async () => import('./PlaylistList'))

export default function MyPlaylists(): ReactElement {
  return (
    <Routes>
      <Route index element={<PlaylistList />} />
      <Route path=":playlistId" element={<PlaylistDetails />} />
    </Routes>
  )
}
