import { useMemo, useState } from 'react'
import { Header } from './components/Header'
import { PatientDetailModal } from './components/PatientDetailModal'
import { PatientFilters } from './components/PatientFilters'
import { PatientFormModal } from './components/PatientFormModal'
import { PatientTable } from './components/PatientTable'
import { LanguageProvider, useLanguage } from './context/LanguageContext'
import { usePatients } from './hooks/usePatients'
import type { PatientFormData, PatientRecord, SortDirection, SortField } from './types/patient'
import { filterAndSortPatients } from './utils/patientHelpers'

type ModalMode = 'add' | 'edit' | null

function AppContent() {
  const { t } = useLanguage()
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
  const [sortField, setSortField] = useState<SortField>('appointmentDate')
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc')

  const [modalMode, setModalMode] = useState<ModalMode>(null)
  const [editingPatient, setEditingPatient] = useState<PatientRecord | null>(null)
  const [viewingPatient, setViewingPatient] = useState<PatientRecord | null>(null)

  const filteredPatients = useMemo(
    () =>
      filterAndSortPatients(
        patients,
        search,
        statusFilter,
        sortField,
        sortDirection,
      ),
    [patients, search, statusFilter, sortField, sortDirection],
  )

  const handleAdd = () => {
    setEditingPatient(null)
    setModalMode('add')
  }

  const handleEdit = (patient: PatientRecord) => {
    setEditingPatient(patient)
    setModalMode('edit')
  }

  const handleDelete = (patient: PatientRecord) => {
    if (window.confirm(t.confirmDelete)) {
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-clinic-50/20 to-slate-100">
      <Header onAddClick={handleAdd} />

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {loading && (
          <div className="flex flex-col items-center justify-center py-24">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-clinic-200 border-t-clinic-600" />
            <p className="mt-4 text-sm text-slate-500">{t.loading}</p>
          </div>
        )}

        {error && !loading && (
          <div className="rounded-xl border border-rose-200 bg-rose-50 p-6 text-center">
            <p className="text-rose-700">{t.error}</p>
            <p className="mt-1 text-sm text-rose-500">{error}</p>
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
              sortField={sortField}
              onSortFieldChange={setSortField}
              sortDirection={sortDirection}
              onSortDirectionChange={setSortDirection}
              resultCount={filteredPatients.length}
            />

            <PatientTable
              patients={filteredPatients}
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
