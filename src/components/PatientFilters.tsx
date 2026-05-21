import { HiMagnifyingGlass } from 'react-icons/hi2'
import type { PatientRecord, SortDirection, SortField } from '../types/patient'
import { useLanguage } from '../context/LanguageContext'
import { cardClass, inputClass, labelClass, selectClass } from '../utils/styles'
import { STATUSES } from '../utils/patientHelpers'

interface PatientFiltersProps {
  search: string
  onSearchChange: (value: string) => void
  statusFilter: string
  onStatusFilterChange: (value: string) => void
  priorityFilter: string
  onPriorityFilterChange: (value: string) => void
  sortField: SortField
  onSortFieldChange: (value: SortField) => void
  sortDirection: SortDirection
  onSortDirectionChange: (value: SortDirection) => void
}

export function PatientFilters({
  search,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  priorityFilter,
  onPriorityFilterChange,
  sortField,
  onSortFieldChange,
  sortDirection,
  onSortDirectionChange,
}: PatientFiltersProps) {
  const { t, getStatusLabel, getPriorityLabel } = useLanguage()

  return (
    <div
      className={`flex flex-col gap-4 p-4 lg:flex-row lg:items-end lg:flex-wrap ${cardClass}`}
    >
      <div className="min-w-[200px] flex-1">
        <label className={labelClass}>{t.searchPlaceholder}</label>
        <div className="relative">
          <HiMagnifyingGlass className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={t.searchPlaceholder}
            className={`${inputClass} pl-10`}
          />
        </div>
      </div>

      <div className="w-full sm:w-44 lg:w-40">
        <label className={labelClass}>{t.filterStatus}</label>
        <select
          value={statusFilter}
          onChange={(e) => onStatusFilterChange(e.target.value)}
          className={selectClass}
        >
          <option value="">{t.filterAllStatuses}</option>
          {STATUSES.map((status) => (
            <option key={status} value={status}>
              {getStatusLabel(status as PatientRecord['status'])}
            </option>
          ))}
        </select>
      </div>

      <div className="w-full sm:w-44 lg:w-40">
        <label className={labelClass}>{t.filterPriority}</label>
        <select
          value={priorityFilter}
          onChange={(e) => onPriorityFilterChange(e.target.value)}
          className={selectClass}
        >
          <option value="">{t.filterAllPriorities}</option>
          <option value="acil">{getPriorityLabel('acil')}</option>
          <option value="normal">{getPriorityLabel('normal')}</option>
        </select>
      </div>

      <div className="w-full sm:w-48 lg:w-44">
        <label className={labelClass}>{t.sortBy}</label>
        <select
          value={sortField}
          onChange={(e) => onSortFieldChange(e.target.value as SortField)}
          className={selectClass}
        >
          <option value="fullName">{t.sortName}</option>
          <option value="appointmentDate">{t.sortAppointment}</option>
          <option value="bloodType">{t.sortBloodType}</option>
        </select>
      </div>

      <div className="w-full sm:w-36 lg:w-32">
        <label className={labelClass}>&nbsp;</label>
        <select
          value={sortDirection}
          onChange={(e) =>
            onSortDirectionChange(e.target.value as SortDirection)
          }
          className={selectClass}
        >
          <option value="asc">{t.asc}</option>
          <option value="desc">{t.desc}</option>
        </select>
      </div>
    </div>
  )
}
