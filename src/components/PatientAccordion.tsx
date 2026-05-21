import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
} from '@ant-design/icons'
import { Button, Card, Collapse, Descriptions, Space, Tag, Typography } from 'antd'
import type { PatientRecord } from '../types/patient'
import { useLanguage } from '../context/LanguageContext'
import { formatDate } from '../utils/patientHelpers'

const STATUS_COLORS: Record<PatientRecord['status'], string> = {
  Bekliyor: 'gold',
  Muayenede: 'processing',
  Tamamlandı: 'success',
  İptal: 'error',
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
      <Card className="md:hidden">
        <Typography.Text type="secondary">{t.noResults}</Typography.Text>
      </Card>
    )
  }

  const items = patients.map((patient) => ({
    key: patient.id,
    label: (
      <div>
        <Typography.Text strong>{patient.fullName}</Typography.Text>
        <Typography.Text type="secondary" className="ml-2 text-xs">
          {patient.id}
        </Typography.Text>
        <div className="mt-1 flex flex-wrap gap-1">
          <Tag color={STATUS_COLORS[patient.status]}>
            {getStatusLabel(patient.status)}
          </Tag>
          <Tag color={patient.priority === 'acil' ? 'red' : 'default'}>
            {getPriorityLabel(patient.priority)}
          </Tag>
          <Tag>{patient.bloodType}</Tag>
        </div>
      </div>
    ),
    children: (
      <div className="space-y-3">
        <Descriptions column={1} size="small" bordered>
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
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
          </div>
        )}

        <Space wrap className="w-full">
          <Button
            icon={<EyeOutlined />}
            onClick={() => onView(patient)}
          >
            {t.details}
          </Button>
          <Button
            icon={<EditOutlined />}
            onClick={() => onEdit(patient)}
          >
            {t.editPatient}
          </Button>
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => onDelete(patient)}
          >
            {t.deletePatient}
          </Button>
        </Space>
      </div>
    ),
  }))

  return (
    <div className="md:hidden">
      <Collapse items={items} accordion />
    </div>
  )
}
