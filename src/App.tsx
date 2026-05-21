import { ExclamationCircleOutlined } from '@ant-design/icons'
import { Alert, Button, Layout, Modal, Spin } from 'antd'
import { useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { Header } from './components/Header'
import { PatientDetailModal } from './components/PatientDetailModal'
import { PatientFilters } from './components/PatientFilters'
import { PatientFormModal } from './components/PatientFormModal'
import { PatientList } from './components/PatientList'
import { useFilterQueryParams } from './hooks/useFilterQueryParams'
import { useLanguage } from './hooks/useLanguage'
import { AntDesignProvider } from './providers/AntDesignProvider'
import { useAppDispatch, useAppSelector } from './store/hooks'
import {
  addPatient,
  deletePatient,
  fetchPatientsThunk,
  selectPatients,
  selectPatientsError,
  selectPatientsLoading,
  updatePatient,
} from './store/slices/patientsSlice'
import type { PatientFormData, PatientRecord } from './types/patient'
import { filterPatientsToolbar } from './utils/patientHelpers'

const { Content } = Layout

type ModalMode = 'add' | 'edit' | null

function AppContent() {
  const { t } = useLanguage()
  const dispatch = useAppDispatch()
  const patients = useAppSelector(selectPatients)
  const loading = useAppSelector(selectPatientsLoading)
  const error = useAppSelector(selectPatientsError)

  const {
    search,
    statusFilter,
    priorityFilter,
    setSearch,
    setStatusFilter,
    setPriorityFilter,
    clearFilters,
    hasActiveFilters,
  } = useFilterQueryParams()

  const [modalMode, setModalMode] = useState<ModalMode>(null)
  const [editingPatient, setEditingPatient] = useState<PatientRecord | null>(null)
  const [viewingPatient, setViewingPatient] = useState<PatientRecord | null>(null)

  useEffect(() => {
    dispatch(fetchPatientsThunk())
  }, [dispatch])

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
      onOk: () => {
        dispatch(deletePatient(patient.id))
        toast.success(t.toastDeleteSuccess)
      },
    })
  }

  const handleFormSubmit = (data: PatientFormData) => {
    if (modalMode === 'edit' && editingPatient) {
      dispatch(updatePatient({ id: editingPatient.id, data }))
      toast.success(t.toastEditSuccess)
    } else {
      dispatch(addPatient(data))
      toast.success(t.toastAddSuccess)
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
              <Button
                size="small"
                danger
                onClick={() => dispatch(fetchPatientsThunk())}
              >
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
              onClearFilters={clearFilters}
              hasActiveFilters={hasActiveFilters}
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
    <AntDesignProvider>
      <AppContent />
    </AntDesignProvider>
  )
}
