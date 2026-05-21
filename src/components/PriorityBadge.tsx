import type { PatientRecord } from '../types/patient'
import { useLanguage } from '../context/LanguageContext'

interface PriorityBadgeProps {
  priority: PatientRecord['priority']
}

export function PriorityBadge({ priority }: PriorityBadgeProps) {
  const { getPriorityLabel } = useLanguage()
  const isUrgent = priority === 'acil'

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
        isUrgent
          ? 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300'
          : 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300'
      }`}
    >
      {getPriorityLabel(priority)}
    </span>
  )
}
