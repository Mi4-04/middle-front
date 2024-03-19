import { Track } from '@/api/types'
import { PropsWithChildren, ReactElement, useState } from 'react'
import PlayerContext from './context'

type PlayerProviderProps = PropsWithChildren<{}>

export default function PlayerProvider({ children }: PlayerProviderProps): ReactElement {
  const [tracks, setTracks] = useState<Track[]>([])
  const [trackIndex, setTrackIndex] = useState<number | null>(null)

  return (
    <PlayerContext.Provider
      value={{
        tracks,
        setTracks,
        trackIndex,
        setTrackIndex
      }}
    >
      {children}
    </PlayerContext.Provider>
  )
}
