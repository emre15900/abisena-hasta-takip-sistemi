import type { PatientRecord } from '../types/patient'
import { Pagination } from './Pagination'
import { PatientAccordion } from './PatientAccordion'
import { PatientTable } from './PatientTable'

interface PatientListProps {
  patients: PatientRecord[]
  currentPage: number
  totalPages: number
  totalItems: number
  onPageChange: (page: number) => void
  onView: (patient: PatientRecord) => void
  onEdit: (patient: PatientRecord) => void
  onDelete: (patient: PatientRecord) => void
}

export function PatientList({
  patients,
  currentPage,
  totalPages,
  totalItems,
  onPageChange,
  onView,
  onEdit,
  onDelete,
}: PatientListProps) {
  return (
    <div className="space-y-4">
      <PatientTable
        patients={patients}
        onView={onView}
        onEdit={onEdit}
        onDelete={onDelete}
      />
      <PatientAccordion
        patients={patients}
        onView={onView}
        onEdit={onEdit}
        onDelete={onDelete}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        onPageChange={onPageChange}
      />
    </div>
  )
}
