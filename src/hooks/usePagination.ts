import { useCallback, useMemo, useState } from 'react'

type UsePaginationParams = {
  defaultOffset?: number
  limit: number
}

type PaginationValue = {
  offset: number
  limit: number
}

export type Pagination = {
  value: PaginationValue
  change: (nextOffset: number) => void
  reset: () => void
}

export default function usePagination({ defaultOffset = 0, limit }: UsePaginationParams): Pagination {
  const [offset, setOffset] = useState<number>(defaultOffset)

  const change = useCallback((nextOffset: number): void => {
    setOffset?.(nextOffset)
  }, [])

  const reset = useCallback((): void => {
    setOffset(defaultOffset)
  }, [defaultOffset])

  return useMemo(
    () => ({
      value: { offset, limit },
      change,
      reset
    }),
    [change, limit, offset, reset]
  )
}
