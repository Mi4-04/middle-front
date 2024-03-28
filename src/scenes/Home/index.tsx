import { lazy, type ReactElement } from 'react'
import { Route, Routes } from 'react-router-dom'

const DefaultPlaylists = lazy(async () => import('./scenes/DefaultPlaylists'))
const PlaylistDetails = lazy(async () => import('./scenes/PlaylistDetails'))

export default function Home(): ReactElement {
  return (
    <Routes>
      <Route index element={<DefaultPlaylists />} />
      <Route path=":playlistId" element={<PlaylistDetails />} />
    </Routes>
  )
}
