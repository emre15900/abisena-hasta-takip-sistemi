import { useState } from 'react'
import {
  HiChevronDown,
  HiEye,
  HiPencil,
  HiTrash,
} from 'react-icons/hi2'
import type { PatientRecord } from '../types/patient'
import { useLanguage } from '../context/LanguageContext'
import { formatDate } from '../utils/patientHelpers'
import { cardClass } from '../utils/styles'
import { PriorityBadge } from './PriorityBadge'
import { StatusBadge } from './StatusBadge'

interface PatientAccordionProps {
  patients: PatientRecord[]
  onView: (patient: PatientRecord) => void
  onEdit: (patient: PatientRecord) => void
  onDelete: (patient: PatientRecord) => void
}

export function PatientAccordion({
  patients,
  onView,
  onEdit,
  onDelete,
}: PatientAccordionProps) {
  const { t, locale, getDiagnosis, getNote, getDepartmentLabel } = useLanguage()
  const [openId, setOpenId] = useState<string | null>(null)

  if (patients.length === 0) {
    return (
      <div
        className={`py-16 text-center md:hidden ${cardClass} border-dashed dark:border-slate-600`}
      >
        <p className="text-slate-500 dark:text-slate-400">{t.noResults}</p>
      </div>
    )
  }

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id))
  }

  return (
    <div className="space-y-2 md:hidden">
      {patients.map((patient) => {
        const isOpen = openId === patient.id
        return (
          <div key={patient.id} className={cardClass}>
            <button
              type="button"
              onClick={() => toggle(patient.id)}
              className="flex w-full items-center justify-between gap-3 p-4 text-left"
            >
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold text-slate-900 dark:text-slate-100">
                  {patient.fullName}
                </p>
                <p className="text-xs text-slate-400">{patient.id}</p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  <StatusBadge status={patient.status} />
                  <PriorityBadge priority={patient.priority} />
                </div>
              </div>
              <HiChevronDown
                className={`h-5 w-5 shrink-0 text-slate-400 transition-transform ${
                  isOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {isOpen && (
              <div className="space-y-3 border-t border-slate-100 px-4 pb-4 pt-3 dark:border-slate-700">
                <InfoRow label={t.department} value={getDepartmentLabel(patient.department)} />
                <InfoRow label={t.bloodType} value={patient.bloodType} />
                <InfoRow
                  label={t.appointmentDate}
                  value={formatDate(patient.appointmentDate, locale)}
                />
                <InfoRow
                  label={t.birthDate}
                  value={formatDate(patient.birthDate, locale)}
                />
                <InfoRow label={t.diagnosis} value={getDiagnosis(patient)} />
                <InfoRow label={t.note} value={getNote(patient)} />
                <InfoRow label={t.isInsured} value={patient.isInsured ? t.yes : t.no} />
                <InfoRow label={t.isFollowUp} value={patient.isFollowUp ? t.yes : t.no} />
                <InfoRow label={t.isVaccinated} value={patient.isVaccinated ? t.yes : t.no} />

                {patient.tags.length > 0 && (
                  <div>
                    <p className="text-xs font-medium text-slate-400">{t.tags}</p>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {patient.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded bg-slate-100 px-2 py-0.5 text-xs text-slate-600 dark:bg-slate-700 dark:text-slate-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex gap-2 pt-1">
                  <MobileAction
                    onClick={() => onView(patient)}
                    label={t.details}
                    icon={<HiEye className="h-4 w-4" />}
                  />
                  <MobileAction
                    onClick={() => onEdit(patient)}
                    label={t.editPatient}
                    icon={<HiPencil className="h-4 w-4" />}
                  />
                  <MobileAction
                    onClick={() => onDelete(patient)}
                    label={t.deletePatient}
                    icon={<HiTrash className="h-4 w-4" />}
                    danger
                  />
                </div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 text-sm">
      <span className="shrink-0 text-slate-400">{label}</span>
      <span className="text-right text-slate-800 dark:text-slate-200">{value}</span>
    </div>
  )
}

function MobileAction({
  onClick,
  label,
  icon,
  danger,
}: {
  onClick: () => void
  label: string
  icon: React.ReactNode
  danger?: boolean
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-medium transition ${
        danger
          ? 'border-rose-200 text-rose-600 hover:bg-rose-50 dark:border-rose-800 dark:text-rose-400 dark:hover:bg-rose-900/30'
          : 'border-slate-200 text-slate-600 hover:bg-slate-50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700'
      }`}
    >
      {icon}
      {label}
    </button>
  )
}
