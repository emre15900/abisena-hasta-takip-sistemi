import { SearchOutlined } from '@ant-design/icons'
import { Card, Col, Input, Row, Select, Space, Typography } from 'antd'
import type { PatientRecord } from '../types/patient'
import { useLanguage } from '../context/LanguageContext'
import { STATUSES } from '../utils/patientHelpers'

interface PatientFiltersProps {
  search: string
  onSearchChange: (value: string) => void
  statusFilter: string
  onStatusFilterChange: (value: string) => void
  priorityFilter: string
  onPriorityFilterChange: (value: string) => void
}

export function PatientFilters({
  search,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  priorityFilter,
  onPriorityFilterChange,
}: PatientFiltersProps) {
  const { t, getStatusLabel, getPriorityLabel } = useLanguage()

  return (
    <Card size="small" className="!shadow-sm">
      <Row gutter={[12, 12]} align="bottom">
        <Col xs={24} md={10} lg={8}>
          <Space direction="vertical" size={4} className="w-full">
            <Typography.Text type="secondary" className="text-xs">
              {t.searchPlaceholder}
            </Typography.Text>
            <Input
              allowClear
              prefix={<SearchOutlined />}
              placeholder={t.searchPlaceholder}
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </Space>
        </Col>

        <Col xs={12} md={7} lg={5}>
          <Space direction="vertical" size={4} className="w-full">
            <Typography.Text type="secondary" className="text-xs">
              {t.filterStatus}
            </Typography.Text>
            <Select
              allowClear
              className="w-full"
              placeholder={t.filterAllStatuses}
              value={statusFilter || undefined}
              onChange={(v) => onStatusFilterChange(v ?? '')}
              options={[
                ...STATUSES.map((status) => ({
                  value: status,
                  label: getStatusLabel(status as PatientRecord['status']),
                })),
              ]}
            />
          </Space>
        </Col>

        <Col xs={12} md={7} lg={5}>
          <Space direction="vertical" size={4} className="w-full">
            <Typography.Text type="secondary" className="text-xs">
              {t.filterPriority}
            </Typography.Text>
            <Select
              allowClear
              className="w-full"
              placeholder={t.filterAllPriorities}
              value={priorityFilter || undefined}
              onChange={(v) => onPriorityFilterChange(v ?? '')}
              options={[
                { value: 'acil', label: getPriorityLabel('acil') },
                { value: 'normal', label: getPriorityLabel('normal') },
              ]}
            />
          </Space>
        </Col>
      </Row>
    </Card>
  )
}
