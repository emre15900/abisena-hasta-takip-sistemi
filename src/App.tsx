import { ExclamationCircleOutlined } from '@ant-design/icons'
import { Alert, Button, Layout, Modal, Spin, Typography } from 'antd'
import { useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { DashboardStats } from './components/DashboardStats'
import { Header } from './components/Header'
import { PageBackground } from './components/PageBackground'
import { PatientDetailModal } from './components/PatientDetailModal'
import { PatientFilters } from './components/PatientFilters'
import { PatientFormModal } from './components/PatientFormModal'
import { PatientList } from './components/PatientList'
import { PatientPriority, PatientStatus } from './enums'
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

  const stats = useMemo(
    () => ({
      urgentCount: filteredPatients.filter(
        (p) => p.priority === PatientPriority.URGENT,
      ).length,
      waitingCount: filteredPatients.filter(
        (p) => p.status === PatientStatus.WAITING,
      ).length,
    }),
    [filteredPatients],
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
    <Layout className="relative min-h-screen !bg-transparent">
      <PageBackground />
      <Header onAddClick={handleAdd} />

      <Content className="relative z-10 mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {loading && (
          <div className="flex flex-col items-center justify-center rounded-2xl py-32">
            <Spin size="large" />
            <p className="mt-6 text-sm font-medium text-slate-500 dark:text-slate-400">
              {t.loading}
            </p>
          </div>
        )}

        {error && !loading && (
          <Alert
            type="error"
            message={t.error}
            description={error}
            showIcon
            className="!rounded-2xl"
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
          <div className="space-y-5">
            <DashboardStats
              totalCount={patients.length}
              filteredCount={filteredPatients.length}
              urgentCount={stats.urgentCount}
              waitingCount={stats.waitingCount}
            />

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

            <div
              className="animate-slide-up opacity-0"
              style={{ animationDelay: '280ms', animationFillMode: 'forwards' }}
            >
              <div className="mb-3 flex items-center gap-2 px-1">
                <Typography.Title level={5} className="!mb-0 !font-display">
                  {t.patientListTitle}
                </Typography.Title>
                <span className="rounded-full bg-clinic-500/10 px-2.5 py-0.5 text-xs font-semibold text-clinic-700 dark:text-clinic-300">
                  {filteredPatients.length}
                </span>
              </div>

              <PatientList
                patients={filteredPatients}
                onView={setViewingPatient}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </div>
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

function AppWithProviders() {
  return (
    <AntDesignProvider>
      <AppContent />
    </AntDesignProvider>
  )
}

export default function App() {
  return <AppWithProviders />
}
