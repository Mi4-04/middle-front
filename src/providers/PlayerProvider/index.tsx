import { Track } from '@/api/types'
import { PropsWithChildren, ReactElement, useState } from 'react'
import PlayerContext from './context'

type PlayerProviderProps = PropsWithChildren<{}>

export default function PlayerProvider({ children }: PlayerProviderProps): ReactElement {
  const [track, setTrack] = useState<Track | null>(null)

  return (
    <PlayerContext.Provider
      value={{
        track,
        setTrack
      }}
    >
      {children}
    </PlayerContext.Provider>
  )
}
