import { type ReactElement, useCallback, useMemo } from 'react'
import clsx from 'clsx'
import type { Pagination } from '@/hooks/usePagination'
import { BreakIcon, Container, NextIcon, PreviousIcon } from './styles'

type PaginateProps = {
  className?: string
  pagination: Pagination
  totalCount: number
}

export default function Paginate(props: PaginateProps): ReactElement | null {
  const { className, pagination, totalCount } = props
  const { offset, limit } = pagination.value

  const currentPage = useMemo(() => Math.ceil(offset / limit), [limit, offset])
  const pagesCount = useMemo(() => Math.ceil(totalCount / limit), [limit, totalCount])

  const handlePageChange = useCallback(
    ({ selected }: { selected: number }): void => {
      pagination.change(selected * limit)
    },
    [limit, pagination]
  )

  if (pagesCount < 2) return null

  return (
    <Container
      className={clsx(className)}
      marginPagesDisplayed={2}
      pageCount={pagesCount}
      forcePage={currentPage}
      onPageChange={handlePageChange}
      nextLabel={<NextIcon />}
      previousLabel={<PreviousIcon />}
      breakLabel={<BreakIcon />}
    />
  )
}
