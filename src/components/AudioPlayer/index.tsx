import usePlayer from '@/hooks/usePlayer'
import { ReactElement } from 'react'
import AudioPlayerBase from 'react-h5-audio-player'
import 'react-h5-audio-player/lib/styles.css'
import { HeaderContainer, Image, NameContainer } from './styles'

export default function AudioPlayer(): ReactElement | null {
  const { tracks, trackIndex, setTrackIndex } = usePlayer()

  if (tracks.length === 0 || trackIndex == null) return null

  const { name, audioUrl, artist, imageUrl } = tracks[trackIndex]

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
      {imageUrl != null ? <Image src={imageUrl} /> : null}
      <NameContainer>
        <p>{name}</p>
        <p>{artist}</p>
      </NameContainer>
    </HeaderContainer>
  )

  return (
    <AudioPlayerBase
      src={audioUrl}
      hasDefaultKeyBindings
      showSkipControls
      autoPlay
      onClickNext={handleNextTrack}
      onClickPrevious={handlePrevTrack}
      onEnded={handleEndedTrack}
      header={getHeader()}
      style={{ position: 'fixed', bottom: 0, left: 20, maxWidth: '450px', width: '100%', zIndex: 2 }}
    />
  )
}
