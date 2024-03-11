import { lazy, ReactElement } from 'react'
import { Route, Routes } from 'react-router-dom'

const DefaultPlaylists = lazy(async () => import('./scenes/DefaultPlaylists'))
const HomeItem = lazy(async () => import('./scenes/HomeItem'))

export default function Home(): ReactElement {
  return (
    <Routes>
      <Route index element={<DefaultPlaylists />} />
      <Route path=":playlistId" element={<HomeItem />} />
    </Routes>
  )
}
