import { Track } from '@/api/types'
import { createContext } from 'react'

export type PlayerContextType = {
  track: Track | null
  setTrack: (value: Track | null) => void
}

const defaultContextValue = {
  track: null,
  setTrack: () => {}
}

const PlayerContext = createContext<PlayerContextType>(defaultContextValue)

export default PlayerContext
