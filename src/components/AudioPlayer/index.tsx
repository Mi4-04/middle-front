import usePlayer from '@/hooks/usePlayer'
import { ReactElement, ReactNode } from 'react'
import AudioPlayerBase from 'react-h5-audio-player'
import 'react-h5-audio-player/lib/styles.css'
import { HeaderContainer, Image, NameContainer } from './styles'

export default function AudioPlayer(): ReactElement | null {
  const { track, setTrack } = usePlayer()

  if (track == null || track.audioUrl == null) return null

  const { artist, audioUrl, imageUrl, name } = track

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
    <div>
      <AudioPlayerBase
        src={audioUrl}
        hasDefaultKeyBindings
        showSkipControls
        autoPlay
        onEnded={() => setTrack(null)}
        header={getHeader()}
        style={{ position: 'fixed', bottom: 0, left: 20, maxWidth: '450px', width: '100%' }}
      />
    </div>
  )
}
