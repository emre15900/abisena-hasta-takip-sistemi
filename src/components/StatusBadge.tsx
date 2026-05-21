import type { PatientRecord } from '../types/patient'
import { useLanguage } from '../context/LanguageContext'

const STATUS_STYLES: Record<PatientRecord['status'], string> = {
  Bekliyor:
    'bg-amber-100 text-amber-800 ring-amber-200 dark:bg-amber-900/40 dark:text-amber-300 dark:ring-amber-800',
  Muayenede:
    'bg-blue-100 text-blue-800 ring-blue-200 dark:bg-blue-900/40 dark:text-blue-300 dark:ring-blue-800',
  Tamamlandı:
    'bg-emerald-100 text-emerald-800 ring-emerald-200 dark:bg-emerald-900/40 dark:text-emerald-300 dark:ring-emerald-800',
  İptal:
    'bg-rose-100 text-rose-800 ring-rose-200 dark:bg-rose-900/40 dark:text-rose-300 dark:ring-rose-800',
}

interface StatusBadgeProps {
  status: PatientRecord['status']
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const { getStatusLabel } = useLanguage()

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${STATUS_STYLES[status]}`}
    >
      {getStatusLabel(status)}
    </span>
  )
}
