import { Track } from '@/api/types'
import React, { createContext } from 'react'
import H5AudioPlayer from 'react-h5-audio-player'

export type PlayerContextType = {
  tracks: Track[]
  setTracks: (value: Track[]) => void
  trackIndex: number | null
  setTrackIndex: (value: number | null) => void
  trackStates: Record<string, boolean>
  setTrackState: (trackId: string, value: boolean) => void
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
