import {
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
} from '@heroicons/react/20/solid'
import { classNames } from '../utils/class-names'

interface PaginationProps {
  page: number
  total: number
  perPage: number
  onChange: (page: number) => void
}

/**
 * A general purpose pagination component
 *
 * @param props The current page, the total number of elements, the elements per page and the event listener
 */
export default function Pagination({
  page,
  total,
  perPage,
  onChange,
}: PaginationProps) {
  const pages = Math.ceil(total / perPage)

  // Create the button containing the page number or "..."
  const PaginationItem = ({ value }: { value?: number }) => {
    return (
      <button
        disabled={!value}
        aria-current="page"
        className={classNames([
          'inline-flex items-center border-t-2 px-4 pt-4 text-sm font-medium',
          value === page
            ? 'border-indigo-500 text-indigo-600'
            : 'border-transparent text-gray-500',
          value &&
            value !== page &&
            'hover:border-gray-300 hover:text-gray-700',
        ])}
        onClick={() => value && onChange(value)}
      >
        {value ?? '...'}
      </button>
    )
  }

  return (
    <nav className="flex items-center justify-between border-t border-gray-200 px-4 sm:px-0">
      <div className="-mt-px flex w-0 flex-1">
        <button
          className="inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700 disabled:opacity-50"
          onClick={() => onChange(page - 1)}
          disabled={page <= 1}
        >
          <ArrowLongLeftIcon
            className="mr-3 h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
          Previous
        </button>
      </div>
      <div className="hidden md:-mt-px md:flex">
        <PaginationItem value={1} />
        {pages >= 2 && (
          <PaginationItem value={page > 4 && pages > 7 ? undefined : 2} />
        )}
        {pages >= 3 && (
          <PaginationItem
            value={
              page > 4 && pages >= 7
                ? page < pages - 3
                  ? page - 1
                  : pages - 4
                : 3
            }
          />
        )}
        {pages >= 4 && (
          <PaginationItem
            value={
              page > 4 && pages >= 7 ? (page < pages - 3 ? page : pages - 3) : 4
            }
          />
        )}
        {pages >= 5 && (
          <PaginationItem
            value={
              page > 4 && pages >= 7
                ? page < pages - 3
                  ? page + 1
                  : pages - 2
                : 5
            }
          />
        )}
        {pages >= 7 && (
          <PaginationItem
            value={page < pages - 3 && pages > 7 ? undefined : pages - 1}
          />
        )}
        {pages >= 6 && <PaginationItem value={pages} />}
      </div>
      <div className="-mt-px flex w-0 flex-1 justify-end">
        <button
          className="inline-flex items-center border-t-2 border-transparent pl-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700 disabled:opacity-50"
          onClick={() => onChange(page + 1)}
          disabled={page >= pages}
        >
          Next
          <ArrowLongRightIcon
            className="ml-3 h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </button>
      </div>
    </nav>
  )
}
