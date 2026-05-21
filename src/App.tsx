import { useEffect, useMemo, useState } from 'react'
import { Header } from './components/Header'
import { PatientDetailModal } from './components/PatientDetailModal'
import { PatientFilters } from './components/PatientFilters'
import { PatientFormModal } from './components/PatientFormModal'
import { PatientList } from './components/PatientList'
import { PAGE_SIZE } from './constants/pagination'
import { LanguageProvider, useLanguage } from './context/LanguageContext'
import { useTheme } from './context/ThemeContext'
import { usePatients } from './hooks/usePatients'
import type { PatientFormData, PatientRecord, SortDirection, SortField } from './types/patient'
import {
  filterAndSortPatients,
  paginatePatients,
} from './utils/patientHelpers'
import { confirmAction, confirmDelete } from './utils/sweetAlert'

type ModalMode = 'add' | 'edit' | null

function AppContent() {
  const { t } = useLanguage()
  const { isDark } = useTheme()
  const {
    patients,
    loading,
    error,
    loadPatients,
    addPatient,
    updatePatient,
    deletePatient,
  } = usePatients()

  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [priorityFilter, setPriorityFilter] = useState('')
  const [sortField, setSortField] = useState<SortField>('appointmentDate')
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc')
  const [currentPage, setCurrentPage] = useState(1)

  const [modalMode, setModalMode] = useState<ModalMode>(null)
  const [editingPatient, setEditingPatient] = useState<PatientRecord | null>(null)
  const [viewingPatient, setViewingPatient] = useState<PatientRecord | null>(null)

  const filteredPatients = useMemo(
    () =>
      filterAndSortPatients(
        patients,
        search,
        statusFilter,
        priorityFilter,
        sortField,
        sortDirection,
      ),
    [patients, search, statusFilter, priorityFilter, sortField, sortDirection],
  )

  const pagination = useMemo(
    () => paginatePatients(filteredPatients, currentPage, PAGE_SIZE),
    [filteredPatients, currentPage],
  )

  useEffect(() => {
    setCurrentPage(1)
  }, [search, statusFilter, priorityFilter, sortField, sortDirection])

  const handleAdd = () => {
    setEditingPatient(null)
    setModalMode('add')
  }

  const handleEdit = async (patient: PatientRecord) => {
    const confirmed = await confirmAction({
      title: t.confirmEditTitle,
      text: t.confirmEdit,
      confirmText: t.yes,
      cancelText: t.cancel,
      isDark,
    })
    if (confirmed) {
      setEditingPatient(patient)
      setModalMode('edit')
    }
  }

  const handleDelete = async (patient: PatientRecord) => {
    const confirmed = await confirmDelete(
      t.confirmDelete,
      t.confirmDeleteTitle,
      t.deletePatient,
      t.cancel,
      isDark,
    )
    if (confirmed) {
      deletePatient(patient.id)
    }
  }

  const handleFormSubmit = (data: PatientFormData) => {
    if (modalMode === 'edit' && editingPatient) {
      updatePatient(editingPatient.id, data)
    } else {
      addPatient(data)
    }
  }

  const closeFormModal = () => {
    setModalMode(null)
    setEditingPatient(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-clinic-50/20 to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <Header onAddClick={handleAdd} />

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {loading && (
          <div className="flex flex-col items-center justify-center py-24">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-clinic-200 border-t-clinic-600 dark:border-clinic-800 dark:border-t-clinic-400" />
            <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
              {t.loading}
            </p>
          </div>
        )}

        {error && !loading && (
          <div className="rounded-xl border border-rose-200 bg-rose-50 p-6 text-center dark:border-rose-800 dark:bg-rose-900/30">
            <p className="text-rose-700 dark:text-rose-300">{t.error}</p>
            <p className="mt-1 text-sm text-rose-500 dark:text-rose-400">
              {error}
            </p>
            <button
              type="button"
              onClick={loadPatients}
              className="mt-4 rounded-lg bg-rose-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-rose-700"
            >
              {t.retry}
            </button>
          </div>
        )}

        {!loading && !error && (
          <div className="space-y-4">
            <PatientFilters
              search={search}
              onSearchChange={setSearch}
              statusFilter={statusFilter}
              onStatusFilterChange={setStatusFilter}
              priorityFilter={priorityFilter}
              onPriorityFilterChange={setPriorityFilter}
              sortField={sortField}
              onSortFieldChange={setSortField}
              sortDirection={sortDirection}
              onSortDirectionChange={setSortDirection}
            />

            <PatientList
              patients={pagination.items}
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
              totalItems={pagination.totalItems}
              onPageChange={setCurrentPage}
              onView={setViewingPatient}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>
        )}
      </main>

      <PatientFormModal
        isOpen={modalMode !== null}
        onClose={closeFormModal}
        onSubmit={handleFormSubmit}
        patient={editingPatient}
      />

      <PatientDetailModal
        patient={viewingPatient}
        onClose={() => setViewingPatient(null)}
      />
    </div>
  )
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  )
}
