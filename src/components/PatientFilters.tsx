import type { PatientRecord, SortDirection, SortField } from '../types/patient'
import { useLanguage } from '../context/LanguageContext'
import { STATUSES } from '../utils/patientHelpers'

interface PatientFiltersProps {
  search: string
  onSearchChange: (value: string) => void
  statusFilter: string
  onStatusFilterChange: (value: string) => void
  sortField: SortField
  onSortFieldChange: (value: SortField) => void
  sortDirection: SortDirection
  onSortDirectionChange: (value: SortDirection) => void
  resultCount: number
}

export function PatientFilters({
  search,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  sortField,
  onSortFieldChange,
  sortDirection,
  onSortDirectionChange,
  resultCount,
}: PatientFiltersProps) {
  const { t, getStatusLabel } = useLanguage()

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm lg:flex-row lg:items-end">
      <div className="flex-1">
        <label className="mb-1 block text-xs font-medium text-slate-500">
          {t.searchPlaceholder}
        </label>
        <div className="relative">
          <svg
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="search"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full rounded-lg border border-slate-200 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-clinic-500 focus:ring-2 focus:ring-clinic-100"
          />
        </div>
      </div>

      <div className="w-full lg:w-48">
        <label className="mb-1 block text-xs font-medium text-slate-500">
          {t.filterStatus}
        </label>
        <select
          value={statusFilter}
          onChange={(e) => onStatusFilterChange(e.target.value)}
          className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-clinic-500 focus:ring-2 focus:ring-clinic-100"
        >
          <option value="">{t.filterAll}</option>
          {STATUSES.map((status) => (
            <option key={status} value={status}>
              {getStatusLabel(status as PatientRecord['status'])}
            </option>
          ))}
        </select>
      </div>

      <div className="w-full lg:w-52">
        <label className="mb-1 block text-xs font-medium text-slate-500">
          {t.sortBy}
        </label>
        <select
          value={sortField}
          onChange={(e) => onSortFieldChange(e.target.value as SortField)}
          className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-clinic-500 focus:ring-2 focus:ring-clinic-100"
        >
          <option value="fullName">{t.sortName}</option>
          <option value="appointmentDate">{t.sortAppointment}</option>
          <option value="score">{t.sortScore}</option>
        </select>
      </div>

      <div className="w-full lg:w-36">
        <label className="mb-1 block text-xs font-medium text-slate-500">
          &nbsp;
        </label>
        <select
          value={sortDirection}
          onChange={(e) =>
            onSortDirectionChange(e.target.value as SortDirection)
          }
          className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-clinic-500 focus:ring-2 focus:ring-clinic-100"
        >
          <option value="asc">{t.asc}</option>
          <option value="desc">{t.desc}</option>
        </select>
      </div>

      <div className="flex items-center pb-1 lg:pb-2.5">
        <span className="whitespace-nowrap rounded-lg bg-clinic-50 px-3 py-2 text-sm font-medium text-clinic-700">
          {resultCount} {t.patientCount}
        </span>
      </div>
    </div>
  )
}
