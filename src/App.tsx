import { ExclamationCircleOutlined } from '@ant-design/icons'
import { Alert, Button, Layout, Modal, Spin } from 'antd'
import { useMemo, useState } from 'react'
import { Header } from './components/Header'
import { PatientDetailModal } from './components/PatientDetailModal'
import { PatientFilters } from './components/PatientFilters'
import { PatientFormModal } from './components/PatientFormModal'
import { PatientList } from './components/PatientList'
import { LanguageProvider, useLanguage } from './context/LanguageContext'
import { usePatients } from './hooks/usePatients'
import { AntDesignProvider } from './providers/AntDesignProvider'
import type { PatientFormData, PatientRecord } from './types/patient'
import { filterPatientsToolbar } from './utils/patientHelpers'

const { Content } = Layout

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
  const [priorityFilter, setPriorityFilter] = useState('')

  const [modalMode, setModalMode] = useState<ModalMode>(null)
  const [editingPatient, setEditingPatient] = useState<PatientRecord | null>(null)
  const [viewingPatient, setViewingPatient] = useState<PatientRecord | null>(null)

  const filteredPatients = useMemo(
    () =>
      filterPatientsToolbar(patients, search, statusFilter, priorityFilter),
    [patients, search, statusFilter, priorityFilter],
  )

  const handleAdd = () => {
    setEditingPatient(null)
    setModalMode('add')
  }

  const handleEdit = (patient: PatientRecord) => {
    Modal.confirm({
      title: t.confirmEditTitle,
      content: t.confirmEdit,
      icon: <ExclamationCircleOutlined />,
      okText: t.yes,
      cancelText: t.cancel,
      onOk: () => {
        setEditingPatient(patient)
        setModalMode('edit')
      },
    })
  }

  const handleDelete = (patient: PatientRecord) => {
    Modal.confirm({
      title: t.confirmDeleteTitle,
      content: t.confirmDelete,
      icon: <ExclamationCircleOutlined />,
      okText: t.deletePatient,
      okType: 'danger',
      cancelText: t.cancel,
      onOk: () => deletePatient(patient.id),
    })
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
    <Layout className="min-h-screen">
      <Header onAddClick={handleAdd} />

      <Content className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {loading && (
          <div className="flex flex-col items-center justify-center py-24">
            <Spin size="large" />
            <p className="mt-4 text-sm opacity-60">{t.loading}</p>
          </div>
        )}

        {error && !loading && (
          <Alert
            type="error"
            message={t.error}
            description={error}
            showIcon
            action={
              <Button size="small" danger onClick={loadPatients}>
                {t.retry}
              </Button>
            }
          />
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
            />

            <PatientList
              patients={filteredPatients}
              onView={setViewingPatient}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>
        )}
      </Content>

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
    </Layout>
  )
}

export default function App() {
  return (
    <LanguageProvider>
      <AntDesignProvider>
        <AppContent />
      </AntDesignProvider>
    </LanguageProvider>
  )
}
