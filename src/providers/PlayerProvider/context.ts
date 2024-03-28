import type React from 'react'
import { createContext } from 'react'
import type H5AudioPlayer from 'react-h5-audio-player'
import { type Track } from '@/api/types'

export type PlayerContextType = {
  tracks: Track[]
  setTracks: (value: Track[]) => void
  trackIndex: number | null
  setTrackIndex: (value: number | null) => void
  trackStates: Record<string, boolean>
  setTrackState: (realId: string, value: boolean) => void
  audioRef?: React.RefObject<H5AudioPlayer>
}

const defaultContextValue = {
  tracks: [],
  setTracks: () => {},
  trackIndex: null,
  setTrackIndex: () => {},
  trackStates: {},
  setTrackState: () => {}
}

const PlayerContext = createContext<PlayerContextType>(defaultContextValue)

export default PlayerContext
