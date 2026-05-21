import { Pagination } from 'antd'
import { useEffect, useMemo, useState } from 'react'
import { PAGE_SIZE } from '../constants/pagination'
import { useLanguage } from '../hooks/useLanguage'
import type { PatientRecord } from '../types/patient'
import { PatientAccordion } from './PatientAccordion'
import { PatientTable } from './PatientTable'

interface PatientListProps {
  patients: PatientRecord[]
  onView: (patient: PatientRecord) => void
  onEdit: (patient: PatientRecord) => void
  onDelete: (patient: PatientRecord) => void
}

export function PatientList({
  patients,
  onView,
  onEdit,
  onDelete,
}: PatientListProps) {
  const { t } = useLanguage()
  const [mobilePage, setMobilePage] = useState(1)

  useEffect(() => {
    setMobilePage(1)
  }, [patients])

  const mobilePagination = useMemo(() => {
    const totalPages = Math.max(1, Math.ceil(patients.length / PAGE_SIZE))
    const safePage = Math.min(mobilePage, totalPages)
    const start = (safePage - 1) * PAGE_SIZE
    return {
      items: patients.slice(start, start + PAGE_SIZE),
      currentPage: safePage,
      total: patients.length,
    }
  }, [patients, mobilePage])

  return (
    <div className="space-y-4">
      <PatientTable
        patients={patients}
        onView={onView}
        onEdit={onEdit}
        onDelete={onDelete}
      />

      <PatientAccordion
        patients={mobilePagination.items}
        onView={onView}
        onEdit={onEdit}
        onDelete={onDelete}
      />

      {patients.length > 0 && (
        <div className="flex flex-col items-center gap-2 md:hidden">
          <Pagination
            current={mobilePagination.currentPage}
            pageSize={PAGE_SIZE}
            total={mobilePagination.total}
            onChange={setMobilePage}
            showSizeChanger={false}
            showTotal={(total) => `${total} ${t.patientCount}`}
            size="small"
          />
        </div>
      )}
    </div>
  )
}
