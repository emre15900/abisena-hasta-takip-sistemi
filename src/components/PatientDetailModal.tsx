import type { PatientRecord } from '../types/patient'
import { useLanguage } from '../context/LanguageContext'
import { formatDate } from '../utils/patientHelpers'
import { PriorityBadge } from './PriorityBadge'
import { StatusBadge } from './StatusBadge'

interface PatientDetailModalProps {
  patient: PatientRecord | null
  onClose: () => void
}

export function PatientDetailModal({ patient, onClose }: PatientDetailModalProps) {
  const { t, locale, getDiagnosis, getNote, getDepartmentLabel } = useLanguage()

  if (!patient) return null

  const boolLabel = (value: boolean) => (value ? t.yes : t.no)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />
      <div className="relative z-10 max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white shadow-2xl">
        <div className="flex items-start justify-between border-b border-slate-100 px-6 py-4">
          <div>
            <h2 className="font-display text-xl font-semibold text-slate-900">
              {patient.fullName}
            </h2>
            <p className="mt-1 text-sm text-slate-500">{patient.id}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1 text-slate-400 transition hover:bg-slate-100"
            aria-label={t.close}
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-4 p-6">
          <div className="flex flex-wrap gap-2">
            <StatusBadge status={patient.status} />
            <PriorityBadge priority={patient.priority} />
          </div>

          <DetailGrid>
            <DetailItem label={t.department} value={getDepartmentLabel(patient.department)} />
            <DetailItem label={t.bloodType} value={patient.bloodType} />
            <DetailItem label={t.score} value={String(patient.score)} />
            <DetailItem
              label={t.birthDate}
              value={formatDate(patient.birthDate, locale)}
            />
            <DetailItem
              label={t.appointmentDate}
              value={formatDate(patient.appointmentDate, locale)}
            />
            <DetailItem label={t.diagnosis} value={getDiagnosis(patient)} />
            <DetailItem label={t.note} value={getNote(patient)} span />
            <DetailItem label={t.isInsured} value={boolLabel(patient.isInsured)} />
            <DetailItem label={t.isFollowUp} value={boolLabel(patient.isFollowUp)} />
            <DetailItem label={t.isVaccinated} value={boolLabel(patient.isVaccinated)} />
          </DetailGrid>

          {patient.tags.length > 0 && (
            <div>
              <p className="mb-2 text-xs font-medium text-slate-500">{t.tags}</p>
              <div className="flex flex-wrap gap-1.5">
                {patient.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md bg-slate-100 px-2 py-0.5 text-xs text-slate-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {patient.notes && (
            <div className="rounded-lg bg-slate-50 p-3 text-sm text-slate-600">
              {patient.notes}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function DetailGrid({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-3 sm:grid-cols-2">{children}</div>
}

function DetailItem({
  label,
  value,
  span,
}: {
  label: string
  value: string
  span?: boolean
}) {
  return (
    <div className={span ? 'sm:col-span-2' : ''}>
      <p className="text-xs font-medium text-slate-400">{label}</p>
      <p className="mt-0.5 text-sm text-slate-800">{value}</p>
    </div>
  )
}
