import { useContext } from 'react'
import PlayerContext, { type PlayerContextType } from '@/providers/PlayerProvider/context'

export default function usePlayer(): PlayerContextType {
  return useContext(PlayerContext)
}
