import usePlayer from '@/hooks/usePlayer'
import { ReactElement } from 'react'
import H5AudioPlayer from 'react-h5-audio-player'
import 'react-h5-audio-player/lib/styles.css'
import { HeaderContainer, Image, NameContainer } from './styles'

export default function AudioPlayer(): ReactElement | null {
  const { audioRef, tracks, trackIndex, setTrackIndex, setTrackState } = usePlayer()

  if (tracks.length === 0 || trackIndex == null) return null

  const { name, audioUrl, trackId, artist, imageUrl } = tracks[trackIndex]

  const handlePrevTrack = (): void => {
    if (trackIndex - 1 < 0) {
      setTrackIndex(tracks.length - 1)
    } else {
      setTrackIndex(trackIndex - 1)
    }
  }

  const handleNextTrack = (): void => {
    if (trackIndex < tracks.length - 1) {
      setTrackIndex(trackIndex + 1)
    } else {
      setTrackIndex(0)
    }
  }

  const handleEndedTrack = (): void => {
    if (tracks.length > 0) {
      handleNextTrack()
    }
  }

  const getHeader = (): ReactElement => (
    <HeaderContainer>
      {imageUrl != null ? <Image src={imageUrl} alt="image" /> : null}
      <NameContainer>
        <p>{name}</p>
        <p>{artist ?? `Unknown`}</p>
      </NameContainer>
    </HeaderContainer>
  )

  return (
    <H5AudioPlayer
      ref={audioRef}
      src={audioUrl}
      hasDefaultKeyBindings
      showSkipControls
      autoPlay
      onPause={() => setTrackState(trackId, false)}
      onPlay={() => setTrackState(trackId, true)}
      onClickNext={handleNextTrack}
      onClickPrevious={handlePrevTrack}
      onEnded={handleEndedTrack}
      header={getHeader()}
      style={{ position: 'fixed', bottom: 0, left: 20, maxWidth: '450px', width: '100%', zIndex: 2 }}
    />
  )
}
