import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2'
import { useLanguage } from '../context/LanguageContext'

interface PaginationProps {
  currentPage: number
  totalPages: number
  totalItems: number
  onPageChange: (page: number) => void
}

export function Pagination({
  currentPage,
  totalPages,
  totalItems,
  onPageChange,
}: PaginationProps) {
  const { t } = useLanguage()

  if (totalItems === 0) return null

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm dark:border-slate-700 dark:bg-slate-800 sm:flex-row sm:items-center sm:justify-between">
      <span className="text-sm font-medium text-clinic-700 dark:text-clinic-300">
        {totalItems} {t.patientCount}
      </span>

      <div className="flex items-center justify-between gap-3 sm:justify-end">
        <span className="text-sm text-slate-500 dark:text-slate-400">
          {t.page} {currentPage} {t.of} {totalPages}
        </span>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage <= 1}
            className="rounded-lg border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700"
            aria-label={t.previous}
          >
            <HiChevronLeft className="h-4 w-4" />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter(
              (p) =>
                p === 1 ||
                p === totalPages ||
                Math.abs(p - currentPage) <= 1,
            )
            .reduce<number[]>((acc, p, i, arr) => {
              if (i > 0 && p - arr[i - 1] > 1) acc.push(-1)
              acc.push(p)
              return acc
            }, [])
            .map((p, i) =>
              p === -1 ? (
                <span
                  key={`ellipsis-${i}`}
                  className="px-1 text-slate-400 dark:text-slate-500"
                >
                  …
                </span>
              ) : (
                <button
                  key={p}
                  type="button"
                  onClick={() => onPageChange(p)}
                  className={`min-w-[2rem] rounded-lg px-2 py-1.5 text-sm font-medium transition ${
                    p === currentPage
                      ? 'bg-clinic-600 text-white'
                      : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700'
                  }`}
                >
                  {p}
                </button>
              ),
            )}

          <button
            type="button"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
            className="rounded-lg border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700"
            aria-label={t.next}
          >
            <HiChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
