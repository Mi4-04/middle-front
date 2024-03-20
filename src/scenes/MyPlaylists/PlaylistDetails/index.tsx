import { ReactElement } from 'react'
import { useParams } from 'react-router-dom'

export default function PlaylistDetails(): ReactElement {
  const { playlistId = '' } = useParams()

  return (
    <>
      <h1>Details</h1>
    </>
  )
}
