import { Pagination as BsPagination } from 'react-bootstrap'
import { useSearchParams } from 'react-router-dom'

type Props = {
  total: number
  perPage: number
  currentPage: number
  lastPage: number
}
export const Pagination = ({
  total,
  perPage,
  currentPage,
  lastPage,
}: Props) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const searchParamsObject = Object.fromEntries(searchParams)

  const firstVisiblePage = currentPage - 3 > 0 ? currentPage - 3 : 1
  const lastVisiblepage =
    currentPage + 3 > lastPage ? lastPage : currentPage + 3
  const pagesArray = []

  for (let i = firstVisiblePage; i <= lastVisiblepage; i++) {
    pagesArray.push(i)
  }
  console.log(firstVisiblePage, lastVisiblepage, pagesArray)

  const changePage = (pageNumber: number) => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setSearchParams({ ...searchParamsObject, Page: pageNumber.toString() })
  }
  return (
    <BsPagination className="bg-white w-100 display-flex justify-content-center border-radius-6">
      {firstVisiblePage !== 1 && (
        <>
          <BsPagination.First onClick={() => changePage(1)} />
          <BsPagination.Prev onClick={() => changePage(currentPage - 1)} />
        </>
      )}
      {pagesArray.map((page) => (
        <BsPagination.Item
          active={currentPage === page}
          className={currentPage === page ? 'fw-700' : 'fw-600'}
          onClick={() => changePage(page)}
        >
          {page}
        </BsPagination.Item>
      ))}

      {lastVisiblepage !== lastPage && (
        <>
          <BsPagination.Next onClick={() => changePage(currentPage + 1)} />
          <BsPagination.Last onClick={() => changePage(lastPage)} />
        </>
      )}
    </BsPagination>
  )
}
