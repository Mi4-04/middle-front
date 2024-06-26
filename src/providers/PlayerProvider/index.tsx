import { createRef, type PropsWithChildren, type ReactElement, useState } from 'react'
import type H5AudioPlayer from 'react-h5-audio-player'
import { type Track } from '@/api/types'
import PlayerContext from './context'

type PlayerProviderProps = PropsWithChildren<{}>

export default function PlayerProvider({ children }: PlayerProviderProps): ReactElement {
  const [tracks, setTracks] = useState<Track[]>([])
  const [trackIndex, setTrackIndex] = useState<number | null>(null)
  const [trackStates, setTrackStates] = useState<Record<string, boolean>>({})
  const audioRef = createRef<H5AudioPlayer>()

  const setTrackIndexWithReset = (index: number | null) => {
    if (trackIndex !== null && tracks[trackIndex]?.id) {
      setTrackStates(prevState => ({
        ...prevState,
        [tracks[trackIndex].realId]: false
      }))
    }
    setTrackIndex(index)
  }

  const setTrackState = (realId: string, value: boolean): void => {
    setTrackStates(() => ({
      [realId]: value
    }))
  }

  return (
    <PlayerContext.Provider
      value={{
        tracks,
        setTracks,
        trackIndex,
        setTrackIndex: setTrackIndexWithReset,
        trackStates,
        setTrackState,
        audioRef
      }}
    >
      {children}
    </PlayerContext.Provider>
  )
}
