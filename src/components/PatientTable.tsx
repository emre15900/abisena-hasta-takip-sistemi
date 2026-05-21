import type { PatientRecord } from '../types/patient'
import { useLanguage } from '../context/LanguageContext'
import { formatDate } from '../utils/patientHelpers'
import { PriorityBadge } from './PriorityBadge'
import { StatusBadge } from './StatusBadge'

interface PatientTableProps {
  patients: PatientRecord[]
  onView: (patient: PatientRecord) => void
  onEdit: (patient: PatientRecord) => void
  onDelete: (patient: PatientRecord) => void
}

export function PatientTable({
  patients,
  onView,
  onEdit,
  onDelete,
}: PatientTableProps) {
  const { t, locale, getDiagnosis, getDepartmentLabel } = useLanguage()

  if (patients.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-200 bg-white py-16 text-center">
        <p className="text-slate-500">{t.noResults}</p>
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] text-left text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/80">
              <th className="px-4 py-3 font-semibold text-slate-600">{t.fullName}</th>
              <th className="px-4 py-3 font-semibold text-slate-600">{t.department}</th>
              <th className="px-4 py-3 font-semibold text-slate-600">{t.status}</th>
              <th className="px-4 py-3 font-semibold text-slate-600">{t.priority}</th>
              <th className="px-4 py-3 font-semibold text-slate-600">{t.appointmentDate}</th>
              <th className="px-4 py-3 font-semibold text-slate-600">{t.diagnosis}</th>
              <th className="px-4 py-3 font-semibold text-slate-600">{t.score}</th>
              <th className="px-4 py-3 font-semibold text-slate-600 text-right">
                {t.actions}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {patients.map((patient) => (
              <tr
                key={patient.id}
                className="transition-colors hover:bg-clinic-50/30"
              >
                <td className="px-4 py-3">
                  <div className="font-medium text-slate-900">{patient.fullName}</div>
                  <div className="text-xs text-slate-400">{patient.id}</div>
                </td>
                <td className="px-4 py-3 text-slate-600">
                  {getDepartmentLabel(patient.department)}
                </td>
                <td className="px-4 py-3">
                  <StatusBadge status={patient.status} />
                </td>
                <td className="px-4 py-3">
                  <PriorityBadge priority={patient.priority} />
                </td>
                <td className="px-4 py-3 text-slate-600">
                  {formatDate(patient.appointmentDate, locale)}
                </td>
                <td className="max-w-[180px] truncate px-4 py-3 text-slate-600">
                  {getDiagnosis(patient)}
                </td>
                <td className="px-4 py-3">
                  <ScoreIndicator score={patient.score} />
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-1">
                    <ActionButton
                      onClick={() => onView(patient)}
                      title={t.details}
                      variant="view"
                    />
                    <ActionButton
                      onClick={() => onEdit(patient)}
                      title={t.editPatient}
                      variant="edit"
                    />
                    <ActionButton
                      onClick={() => onDelete(patient)}
                      title={t.deletePatient}
                      variant="delete"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function ScoreIndicator({ score }: { score: number }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }, (_, i) => (
        <div
          key={i}
          className={`h-2 w-2 rounded-full ${
            i < score ? 'bg-clinic-500' : 'bg-slate-200'
          }`}
        />
      ))}
    </div>
  )
}

function ActionButton({
  onClick,
  title,
  variant,
}: {
  onClick: () => void
  title: string
  variant: 'view' | 'edit' | 'delete'
}) {
  const styles = {
    view: 'text-slate-500 hover:bg-slate-100 hover:text-clinic-600',
    edit: 'text-slate-500 hover:bg-amber-50 hover:text-amber-600',
    delete: 'text-slate-500 hover:bg-rose-50 hover:text-rose-600',
  }

  const icons = {
    view: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    ),
    edit: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
    ),
    delete: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    ),
  }

  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`rounded-lg p-2 transition ${styles[variant]}`}
    >
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        {icons[variant]}
      </svg>
    </button>
  )
}
