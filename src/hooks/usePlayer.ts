import { useContext } from 'react'
import PlayerContext, { PlayerContextType } from '@/providers/PlayerProvider/context'

export default function usePlayer(): PlayerContextType {
  return useContext(PlayerContext)
}
