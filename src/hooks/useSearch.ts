import { useCallback, useState } from 'react'

export type Search = {
  value: string
  change: (newSearch: string) => void
  reset: () => void
}

type UseSearchParams = {
  onChange?: () => void
}

export default function useSearch(params?: UseSearchParams): Search {
  const { onChange } = params ?? {}
  const [search, setSearch] = useState<string>('')

  const change = useCallback(
    (newSearch: string): void => {
      onChange?.()
      setSearch(newSearch)
    },
    [onChange]
  )

  const reset = useCallback((): void => setSearch(''), [])

  return {
    value: search,
    change,
    reset
  }
}
