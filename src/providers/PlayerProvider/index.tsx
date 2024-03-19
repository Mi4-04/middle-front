import { Track } from '@/api/types'
import { createRef, PropsWithChildren, ReactElement, useState } from 'react'
import AudioPlayerBase from 'react-h5-audio-player'
import PlayerContext from './context'

type PlayerProviderProps = PropsWithChildren<{}>

export default function PlayerProvider({ children }: PlayerProviderProps): ReactElement {
  const [tracks, setTracks] = useState<Track[]>([])
  const [trackIndex, setTrackIndex] = useState<number | null>(null)
  const [trackStates, setTrackStates] = useState<Record<string, boolean>>({})
  const audioRef = createRef<AudioPlayerBase>()

  const setTrackIndexWithReset = (index: number | null) => {
    if (trackIndex !== null && tracks[trackIndex]?.id) {
      setTrackStates(prevState => ({
        ...prevState,
        [tracks[trackIndex].trackId]: false
      }))
    }
    setTrackIndex(index)
  }

  const setTrackState = (trackId: string, value: boolean): void => {
    setTrackStates(prevState => ({
      ...prevState,
      [trackId]: value
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
