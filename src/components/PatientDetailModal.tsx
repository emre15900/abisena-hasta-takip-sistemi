import { Descriptions, Modal, Tag } from 'antd'
import type { PatientRecord } from '../types/patient'
import { PatientPriority, PatientStatus } from '../enums'
import { useLanguage } from '../hooks/useLanguage'
import { formatDate } from '../utils/patientHelpers'

const STATUS_COLORS: Record<PatientStatus, string> = {
  [PatientStatus.WAITING]: 'gold',
  [PatientStatus.EXAMINING]: 'processing',
  [PatientStatus.COMPLETED]: 'success',
  [PatientStatus.CANCELLED]: 'error',
}

interface PatientDetailModalProps {
  patient: PatientRecord | null
  onClose: () => void
}

export function PatientDetailModal({ patient, onClose }: PatientDetailModalProps) {
  const {
    t,
    locale,
    getDiagnosis,
    getNote,
    getDepartmentLabel,
    getStatusLabel,
    getPriorityLabel,
  } = useLanguage()

  const boolLabel = (value: boolean) => (value ? t.yes : t.no)

  return (
    <Modal
      title={patient?.fullName}
      open={Boolean(patient)}
      onCancel={onClose}
      footer={null}
      width={560}
    >
      {patient && (
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Tag color={STATUS_COLORS[patient.status]}>
              {getStatusLabel(patient.status)}
            </Tag>
            <Tag
              color={
                patient.priority === PatientPriority.URGENT ? 'red' : 'default'
              }
            >
              {getPriorityLabel(patient.priority)}
            </Tag>
            <Tag>{patient.bloodType}</Tag>
          </div>

          <Descriptions bordered column={1} size="small">
            <Descriptions.Item label="ID">{patient.id}</Descriptions.Item>
            <Descriptions.Item label={t.department}>
              {getDepartmentLabel(patient.department)}
            </Descriptions.Item>
            <Descriptions.Item label={t.birthDate}>
              {formatDate(patient.birthDate, locale)}
            </Descriptions.Item>
            <Descriptions.Item label={t.appointmentDate}>
              {formatDate(patient.appointmentDate, locale)}
            </Descriptions.Item>
            <Descriptions.Item label={t.diagnosis}>
              {getDiagnosis(patient)}
            </Descriptions.Item>
            <Descriptions.Item label={t.note}>
              {getNote(patient)}
            </Descriptions.Item>
            <Descriptions.Item label={t.isInsured}>
              {boolLabel(patient.isInsured)}
            </Descriptions.Item>
            <Descriptions.Item label={t.isFollowUp}>
              {boolLabel(patient.isFollowUp)}
            </Descriptions.Item>
            <Descriptions.Item label={t.isVaccinated}>
              {boolLabel(patient.isVaccinated)}
            </Descriptions.Item>
          </Descriptions>

          {patient.tags.length > 0 && (
            <div>
              <p className="mb-1 text-xs opacity-60">{t.tags}</p>
              <div className="flex flex-wrap gap-1">
                {patient.tags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </div>
            </div>
          )}

          {patient.notes && (
            <div className="rounded-lg bg-black/5 p-3 text-sm dark:bg-white/5">
              {patient.notes}
            </div>
          )}
        </div>
      )}
    </Modal>
  )
}
