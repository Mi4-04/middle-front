import { Track } from '@/api/types'
import { createContext } from 'react'

export type PlayerContextType = {
  tracks: Track[]
  setTracks: (value: Track[]) => void
  trackIndex: number | null
  setTrackIndex: (value: number | null) => void
}

const defaultContextValue = {
  tracks: [],
  setTracks: () => {},
  trackIndex: null,
  setTrackIndex: () => {}
}

const PlayerContext = createContext<PlayerContextType>(defaultContextValue)

export default PlayerContext
