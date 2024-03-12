/* eslint-disable deprecation/deprecation */
import { useEffect, useMemo, useState } from 'react'

export default function useMedia(query: string): boolean {
  const mediaQuery = useMemo(() => window.matchMedia(`(${query})`), [query])
  const [matches, setMatches] = useState(() => mediaQueryToMatches(mediaQuery))

  useEffect(() => {
    setMatches(mediaQueryToMatches(mediaQuery))
    if (!mediaQuery) return

    const handleMediaChange = (): void => {
      setMatches(mediaQueryToMatches(mediaQuery))
    }

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', handleMediaChange)
      return () => {
        mediaQuery.removeEventListener('change', handleMediaChange)
      }
    } else {
      mediaQuery.addListener(handleMediaChange)
      return () => {
        mediaQuery.removeListener(handleMediaChange)
      }
    }
  }, [mediaQuery])

  return matches
}

function mediaQueryToMatches(mediaQuery: MediaQueryList | null): boolean {
  return mediaQuery?.matches ?? false
}
