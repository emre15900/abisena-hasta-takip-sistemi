import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
} from '@ant-design/icons'
import { Button, Space, Table, Tag, Typography } from 'antd'
import type { TableColumnsType, TableProps } from 'antd'
import { useMemo } from 'react'
import { PAGE_SIZE } from '../constants/pagination'
import { useLanguage } from '../context/LanguageContext'
import type { PatientRecord } from '../types/patient'
import {
  BLOOD_TYPES,
  DEPARTMENTS,
  formatDate,
  STATUSES,
} from '../utils/patientHelpers'

interface PatientTableProps {
  patients: PatientRecord[]
  onView: (patient: PatientRecord) => void
  onEdit: (patient: PatientRecord) => void
  onDelete: (patient: PatientRecord) => void
}

const STATUS_COLORS: Record<PatientRecord['status'], string> = {
  Bekliyor: 'gold',
  Muayenede: 'processing',
  Tamamlandı: 'success',
  İptal: 'error',
}

export function PatientTable({
  patients,
  onView,
  onEdit,
  onDelete,
}: PatientTableProps) {
  const {
    t,
    locale,
    getDiagnosis,
    getDepartmentLabel,
    getStatusLabel,
    getPriorityLabel,
  } = useLanguage()

  const columns: TableColumnsType<PatientRecord> = useMemo(
    () => [
      {
        title: t.fullName,
        dataIndex: 'fullName',
        key: 'fullName',
        sorter: (a, b) => a.fullName.localeCompare(b.fullName, 'tr'),
        render: (name: string, record) => (
          <div>
            <Typography.Text strong>{name}</Typography.Text>
            <br />
            <Typography.Text type="secondary" className="text-xs">
              {record.id}
            </Typography.Text>
          </div>
        ),
      },
      {
        title: t.department,
        dataIndex: 'department',
        key: 'department',
        filters: DEPARTMENTS.map((d) => ({
          text: getDepartmentLabel(d),
          value: d,
        })),
        onFilter: (value, record) => record.department === value,
        render: (dept: string) => getDepartmentLabel(dept),
      },
      {
        title: t.bloodType,
        dataIndex: 'bloodType',
        key: 'bloodType',
        filters: BLOOD_TYPES.map((bt) => ({ text: bt, value: bt })),
        onFilter: (value, record) => record.bloodType === value,
        sorter: (a, b) => a.bloodType.localeCompare(b.bloodType),
        render: (bt: string) => <Tag>{bt}</Tag>,
      },
      {
        title: t.status,
        dataIndex: 'status',
        key: 'status',
        filters: STATUSES.map((s) => ({
          text: getStatusLabel(s),
          value: s,
        })),
        onFilter: (value, record) => record.status === value,
        render: (status: PatientRecord['status']) => (
          <Tag color={STATUS_COLORS[status]}>{getStatusLabel(status)}</Tag>
        ),
      },
      {
        title: t.priority,
        dataIndex: 'priority',
        key: 'priority',
        filters: [
          { text: getPriorityLabel('acil'), value: 'acil' },
          { text: getPriorityLabel('normal'), value: 'normal' },
        ],
        onFilter: (value, record) => record.priority === value,
        render: (priority: PatientRecord['priority']) => (
          <Tag color={priority === 'acil' ? 'red' : 'default'}>
            {getPriorityLabel(priority)}
          </Tag>
        ),
      },
      {
        title: t.appointmentDate,
        dataIndex: 'appointmentDate',
        key: 'appointmentDate',
        sorter: (a, b) =>
          new Date(a.appointmentDate).getTime() -
          new Date(b.appointmentDate).getTime(),
        defaultSortOrder: 'descend',
        render: (date: string) => formatDate(date, locale),
      },
      {
        title: t.diagnosis,
        key: 'diagnosis',
        ellipsis: true,
        render: (_, record) => getDiagnosis(record),
      },
      {
        title: t.actions,
        key: 'actions',
        align: 'right',
        width: 140,
        render: (_, record) => (
          <Space size="small">
            <Button
              type="text"
              icon={<EyeOutlined />}
              onClick={() => onView(record)}
              title={t.details}
            />
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={() => onEdit(record)}
              title={t.editPatient}
            />
            <Button
              type="text"
              danger
              icon={<DeleteOutlined />}
              onClick={() => onDelete(record)}
              title={t.deletePatient}
            />
          </Space>
        ),
      },
    ],
    [
      t,
      locale,
      getDiagnosis,
      getDepartmentLabel,
      getStatusLabel,
      getPriorityLabel,
      onView,
      onEdit,
      onDelete,
    ],
  )

  const pagination: TableProps<PatientRecord>['pagination'] = {
    pageSize: PAGE_SIZE,
    showSizeChanger: false,
    showTotal: (total) => `${total} ${t.patientCount}`,
    position: ['bottomCenter'],
  }

  return (
    <div className="hidden md:block">
      <Table<PatientRecord>
        rowKey="id"
        columns={columns}
        dataSource={patients}
        pagination={pagination}
        locale={{ emptyText: t.noResults }}
        scroll={{ x: 900 }}
        size="middle"
      />
    </div>
  )
}
