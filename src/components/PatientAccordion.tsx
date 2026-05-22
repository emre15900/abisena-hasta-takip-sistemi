import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
} from '@ant-design/icons'
import { Avatar, Button, Collapse, Descriptions, Tag, Typography } from 'antd'
import { PatientPriority, PatientStatus } from '../enums'
import { useLanguage } from '../hooks/useLanguage'
import type { PatientRecord } from '../types/patient'
import { formatDate } from '../utils/patientHelpers'

const STATUS_COLORS: Record<PatientStatus, string> = {
  [PatientStatus.WAITING]: 'gold',
  [PatientStatus.EXAMINING]: 'processing',
  [PatientStatus.COMPLETED]: 'success',
  [PatientStatus.CANCELLED]: 'error',
}

function getInitials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

interface PatientAccordionProps {
  patients: PatientRecord[]
  onView: (patient: PatientRecord) => void
  onEdit: (patient: PatientRecord) => void
  onDelete: (patient: PatientRecord) => void
}

export function PatientAccordion({
  patients,
  onView,
  onEdit,
  onDelete,
}: PatientAccordionProps) {
  const {
    t,
    locale,
    getDiagnosis,
    getNote,
    getDepartmentLabel,
    getStatusLabel,
    getPriorityLabel,
  } = useLanguage()

  if (patients.length === 0) {
    return (
      <div className="glass-panel p-8 text-center md:hidden">
        <Typography.Text type="secondary">{t.noResults}</Typography.Text>
      </div>
    )
  }

  const items = patients.map((patient) => ({
    key: patient.id,
    label: (
      <div className="flex items-center gap-3 py-1">
        <Avatar
          size={36}
          className="!bg-gradient-to-br !from-clinic-500 !to-clinic-700 !text-sm !font-semibold"
        >
          {getInitials(patient.fullName)}
        </Avatar>
        <div className="min-w-0 flex-1">
          <Typography.Text strong className="block truncate">
            {patient.fullName}
          </Typography.Text>
          <Typography.Text type="secondary" className="text-xs">
            {patient.id}
          </Typography.Text>
          <div className="mt-1.5 flex flex-wrap gap-1">
            <Tag color={STATUS_COLORS[patient.status]} className="!rounded-md !text-xs">
              {getStatusLabel(patient.status)}
            </Tag>
            <Tag
              color={
                patient.priority === PatientPriority.URGENT ? 'red' : 'default'
              }
              className="!rounded-md !text-xs"
            >
              {getPriorityLabel(patient.priority)}
            </Tag>
          </div>
        </div>
      </div>
    ),
    children: (
      <div className="space-y-3">
        <Descriptions column={1} size="small" bordered className="!rounded-xl">
          <Descriptions.Item label={t.department}>
            {getDepartmentLabel(patient.department)}
          </Descriptions.Item>
          <Descriptions.Item label={t.bloodType}>
            {patient.bloodType}
          </Descriptions.Item>
          <Descriptions.Item label={t.appointmentDate}>
            {formatDate(patient.appointmentDate, locale)}
          </Descriptions.Item>
          <Descriptions.Item label={t.birthDate}>
            {formatDate(patient.birthDate, locale)}
          </Descriptions.Item>
          <Descriptions.Item label={t.diagnosis}>
            {getDiagnosis(patient)}
          </Descriptions.Item>
          <Descriptions.Item label={t.note}>
            {getNote(patient)}
          </Descriptions.Item>
          <Descriptions.Item label={t.isInsured}>
            {patient.isInsured ? t.yes : t.no}
          </Descriptions.Item>
          <Descriptions.Item label={t.isFollowUp}>
            {patient.isFollowUp ? t.yes : t.no}
          </Descriptions.Item>
          <Descriptions.Item label={t.isVaccinated}>
            {patient.isVaccinated ? t.yes : t.no}
          </Descriptions.Item>
        </Descriptions>

        {patient.tags.length > 0 && (
          <div>
            <Typography.Text type="secondary" className="text-xs">
              {t.tags}
            </Typography.Text>
            <div className="mt-1 flex flex-wrap gap-1">
              {patient.tags.map((tag) => (
                <Tag key={tag} className="!rounded-md">
                  {tag}
                </Tag>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-3 gap-2 pt-1">
          <Button
            type="primary"
            ghost
            size="small"
            icon={<EyeOutlined className="!text-sm" />}
            onClick={() => onView(patient)}
            className="!h-8 !rounded-lg !px-1 !text-xs"
          >
            {t.details}
          </Button>
          <Button
            size="small"
            icon={<EditOutlined className="!text-sm" />}
            onClick={() => onEdit(patient)}
            className="!h-8 !rounded-lg !px-1 !text-xs"
            title={t.editPatient}
          >
            {t.editPatientShort}
          </Button>
          <Button
            danger
            size="small"
            icon={<DeleteOutlined className="!text-sm" />}
            onClick={() => onDelete(patient)}
            className="!h-8 !rounded-lg !px-1 !text-xs"
          >
            {t.deletePatient}
          </Button>
        </div>
      </div>
    ),
  }))

  return (
    <div className="md:hidden">
      <Collapse items={items} accordion className="mobile-patient-collapse" />
    </div>
  )
}
