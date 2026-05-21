import { FilterOutlined, SearchOutlined } from '@ant-design/icons'
import { Button, Card, Col, Input, Row, Select, Space, Tooltip, Typography } from 'antd'
import { PatientPriority, PatientStatus, PATIENT_STATUS_VALUES } from '../enums'
import { useLanguage } from '../hooks/useLanguage'

interface PatientFiltersProps {
  search: string
  onSearchChange: (value: string) => void
  statusFilter: string
  onStatusFilterChange: (value: string) => void
  priorityFilter: string
  onPriorityFilterChange: (value: string) => void
  onClearFilters: () => void
  hasActiveFilters: boolean
}

export function PatientFilters({
  search,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  priorityFilter,
  onPriorityFilterChange,
  onClearFilters,
  hasActiveFilters,
}: PatientFiltersProps) {
  const { t, getStatusLabel, getPriorityLabel } = useLanguage()

  return (
    <Card size="small" className="!shadow-sm">
      <Row gutter={[12, 12]} align="bottom">
        <Col xs={24} md={10} lg={7}>
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

        <Col xs={12} md={6} lg={5}>
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
              options={PATIENT_STATUS_VALUES.map((status) => ({
                value: status,
                label: getStatusLabel(status as PatientStatus),
              }))}
            />
          </Space>
        </Col>

        <Col xs={12} md={6} lg={5}>
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
                {
                  value: PatientPriority.URGENT,
                  label: getPriorityLabel(PatientPriority.URGENT),
                },
                {
                  value: PatientPriority.NORMAL,
                  label: getPriorityLabel(PatientPriority.NORMAL),
                },
              ]}
            />
          </Space>
        </Col>

        <Col xs={24} md={2} lg={2} className="flex items-end justify-end">
          <Tooltip title={t.clearFilters}>
            <Button
              type="default"
              icon={<FilterOutlined />}
              onClick={onClearFilters}
              disabled={!hasActiveFilters}
              aria-label={t.clearFilters}
            />
          </Tooltip>
        </Col>
      </Row>
    </Card>
  )
}
