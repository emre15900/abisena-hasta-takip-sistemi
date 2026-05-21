import type { PatientRecord } from '../types/patient'
import { useLanguage } from '../context/LanguageContext'

const STATUS_STYLES: Record<PatientRecord['status'], string> = {
  Bekliyor: 'bg-amber-100 text-amber-800 ring-amber-200',
  Muayenede: 'bg-blue-100 text-blue-800 ring-blue-200',
  Tamamlandı: 'bg-emerald-100 text-emerald-800 ring-emerald-200',
  İptal: 'bg-rose-100 text-rose-800 ring-rose-200',
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
