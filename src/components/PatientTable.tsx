import { HiEye, HiPencil, HiTrash } from 'react-icons/hi2'
import type { PatientRecord } from '../types/patient'
import { useLanguage } from '../context/LanguageContext'
import { formatDate } from '../utils/patientHelpers'
import { cardClass } from '../utils/styles'
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
      <div
        className={`py-16 text-center ${cardClass} border-dashed dark:border-slate-600`}
      >
        <p className="text-slate-500 dark:text-slate-400">{t.noResults}</p>
      </div>
    )
  }

  return (
    <div className={`hidden overflow-hidden md:block ${cardClass}`}>
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-slate-100 bg-slate-50/80 dark:border-slate-700 dark:bg-slate-900/50">
            <th className="px-4 py-3 font-semibold text-slate-600 dark:text-slate-300">
              {t.fullName}
            </th>
            <th className="px-4 py-3 font-semibold text-slate-600 dark:text-slate-300">
              {t.department}
            </th>
            <th className="px-4 py-3 font-semibold text-slate-600 dark:text-slate-300">
              {t.bloodType}
            </th>
            <th className="px-4 py-3 font-semibold text-slate-600 dark:text-slate-300">
              {t.status}
            </th>
            <th className="px-4 py-3 font-semibold text-slate-600 dark:text-slate-300">
              {t.priority}
            </th>
            <th className="px-4 py-3 font-semibold text-slate-600 dark:text-slate-300">
              {t.appointmentDate}
            </th>
            <th className="px-4 py-3 font-semibold text-slate-600 dark:text-slate-300">
              {t.diagnosis}
            </th>
            <th className="px-4 py-3 text-right font-semibold text-slate-600 dark:text-slate-300">
              {t.actions}
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50 dark:divide-slate-700">
          {patients.map((patient) => (
            <tr
              key={patient.id}
              className="transition-colors hover:bg-clinic-50/30 dark:hover:bg-slate-700/50"
            >
              <td className="px-4 py-3">
                <div className="font-medium text-slate-900 dark:text-slate-100">
                  {patient.fullName}
                </div>
                <div className="text-xs text-slate-400">{patient.id}</div>
              </td>
              <td className="px-4 py-3 text-slate-600 dark:text-slate-300">
                {getDepartmentLabel(patient.department)}
              </td>
              <td className="px-4 py-3">
                <span className="inline-flex rounded-md bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-700 dark:bg-slate-700 dark:text-slate-200">
                  {patient.bloodType}
                </span>
              </td>
              <td className="px-4 py-3">
                <StatusBadge status={patient.status} />
              </td>
              <td className="px-4 py-3">
                <PriorityBadge priority={patient.priority} />
              </td>
              <td className="px-4 py-3 text-slate-600 dark:text-slate-300">
                {formatDate(patient.appointmentDate, locale)}
              </td>
              <td className="max-w-[180px] truncate px-4 py-3 text-slate-600 dark:text-slate-300">
                {getDiagnosis(patient)}
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center justify-end gap-1">
                  <ActionButton
                    onClick={() => onView(patient)}
                    title={t.details}
                    icon={<HiEye className="h-4 w-4" />}
                    variant="view"
                  />
                  <ActionButton
                    onClick={() => onEdit(patient)}
                    title={t.editPatient}
                    icon={<HiPencil className="h-4 w-4" />}
                    variant="edit"
                  />
                  <ActionButton
                    onClick={() => onDelete(patient)}
                    title={t.deletePatient}
                    icon={<HiTrash className="h-4 w-4" />}
                    variant="delete"
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function ActionButton({
  onClick,
  title,
  icon,
  variant,
}: {
  onClick: () => void
  title: string
  icon: React.ReactNode
  variant: 'view' | 'edit' | 'delete'
}) {
  const styles = {
    view: 'text-slate-500 hover:bg-slate-100 hover:text-clinic-600 dark:hover:bg-slate-700 dark:hover:text-clinic-400',
    edit: 'text-slate-500 hover:bg-amber-50 hover:text-amber-600 dark:hover:bg-amber-900/30 dark:hover:text-amber-400',
    delete: 'text-slate-500 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-900/30 dark:hover:text-rose-400',
  }

  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`rounded-lg p-2 transition ${styles[variant]}`}
    >
      {icon}
    </button>
  )
}
