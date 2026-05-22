import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
} from '@ant-design/icons'
import { Avatar, Button, Space, Table, Tag, Typography } from 'antd'
import type { TableColumnsType, TableProps } from 'antd'
import { useMemo } from 'react'
import { PAGE_SIZE } from '../constants/pagination'
import { PatientPriority, PatientStatus, PATIENT_STATUS_VALUES } from '../enums'
import { useLanguage } from '../hooks/useLanguage'
import type { PatientRecord } from '../types/patient'
import { BLOOD_TYPES, DEPARTMENTS, formatDate } from '../utils/patientHelpers'

interface PatientTableProps {
  patients: PatientRecord[]
  onView: (patient: PatientRecord) => void
  onEdit: (patient: PatientRecord) => void
  onDelete: (patient: PatientRecord) => void
}

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
          <div className="flex items-center gap-3 py-1">
            <Avatar
              size={40}
              className="!bg-gradient-to-br !from-clinic-500 !to-clinic-700 !font-semibold !shadow-sm"
            >
              {getInitials(name)}
            </Avatar>
            <div>
              <Typography.Text strong className="!text-[15px]">
                {name}
              </Typography.Text>
              <br />
              <Typography.Text type="secondary" className="!text-xs">
                {record.id}
              </Typography.Text>
            </div>
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
        render: (dept: string) => (
          <span className="text-slate-600 dark:text-slate-300">
            {getDepartmentLabel(dept)}
          </span>
        ),
      },
      {
        title: t.bloodType,
        dataIndex: 'bloodType',
        key: 'bloodType',
        filters: BLOOD_TYPES.map((bt) => ({ text: bt, value: bt })),
        onFilter: (value, record) => record.bloodType === value,
        sorter: (a, b) => a.bloodType.localeCompare(b.bloodType),
        render: (bt: string) => (
          <Tag className="!rounded-lg !px-2.5 !font-semibold">{bt}</Tag>
        ),
      },
      {
        title: t.status,
        dataIndex: 'status',
        key: 'status',
        filters: PATIENT_STATUS_VALUES.map((s) => ({
          text: getStatusLabel(s),
          value: s,
        })),
        onFilter: (value, record) => record.status === value,
        render: (status: PatientStatus) => (
          <Tag
            color={STATUS_COLORS[status]}
            className="!rounded-lg !px-2.5 !font-medium"
          >
            {getStatusLabel(status)}
          </Tag>
        ),
      },
      {
        title: t.priority,
        dataIndex: 'priority',
        key: 'priority',
        filters: [
          {
            text: getPriorityLabel(PatientPriority.URGENT),
            value: PatientPriority.URGENT,
          },
          {
            text: getPriorityLabel(PatientPriority.NORMAL),
            value: PatientPriority.NORMAL,
          },
        ],
        onFilter: (value, record) => record.priority === value,
        render: (priority: PatientPriority) => (
          <Tag
            color={priority === PatientPriority.URGENT ? 'red' : 'default'}
            className="!rounded-lg !px-2.5 !font-medium"
          >
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
        render: (date: string) => (
          <span className="tabular-nums text-slate-600 dark:text-slate-300">
            {formatDate(date, locale)}
          </span>
        ),
      },
      {
        title: t.diagnosis,
        key: 'diagnosis',
        ellipsis: true,
        render: (_, record) => (
          <span className="text-slate-600 dark:text-slate-400">
            {getDiagnosis(record)}
          </span>
        ),
      },
      {
        title: t.actions,
        key: 'actions',
        align: 'right',
        width: 150,
        render: (_, record) => (
          <Space size={4}>
            <Button
              type="text"
              shape="circle"
              icon={<EyeOutlined />}
              onClick={() => onView(record)}
              title={t.details}
              className="!text-clinic-600 hover:!bg-clinic-50 dark:!text-clinic-400 dark:hover:!bg-clinic-900/30"
            />
            <Button
              type="text"
              shape="circle"
              icon={<EditOutlined />}
              onClick={() => onEdit(record)}
              title={t.editPatient}
              className="!text-amber-600 hover:!bg-amber-50 dark:!text-amber-400"
            />
            <Button
              type="text"
              shape="circle"
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
    showTotal: (total) => (
      <span className="font-medium text-slate-600 dark:text-slate-400">
        {total} {t.patientCount}
      </span>
    ),
    position: ['bottomCenter'],
  }

  return (
    <div
      className="glass-panel hidden overflow-hidden p-1 opacity-0 animate-slide-up md:block"
      style={{ animationDelay: '320ms', animationFillMode: 'forwards' }}
    >
      <Table<PatientRecord>
        rowKey="id"
        columns={columns}
        dataSource={patients}
        pagination={pagination}
        locale={{ emptyText: t.noResults }}
        scroll={{ x: 960 }}
        size="middle"
        className="modern-table"
      />
    </div>
  )
}
