import { FilterOutlined, SearchOutlined } from '@ant-design/icons'
import { Button, Col, Input, Row, Select, Tooltip, Typography } from 'antd'
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
    <div className="glass-panel animate-slide-up p-4 opacity-0 sm:p-5" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-clinic-500/10 text-clinic-600 dark:text-clinic-400">
            <SearchOutlined />
          </div>
          <Typography.Title level={5} className="!mb-0 !font-display !font-semibold">
            {t.filtersTitle}
          </Typography.Title>
        </div>
        <Tooltip title={t.clearFilters}>
          <Button
            type={hasActiveFilters ? 'primary' : 'default'}
            ghost={hasActiveFilters}
            icon={<FilterOutlined />}
            onClick={onClearFilters}
            disabled={!hasActiveFilters}
            className="!rounded-xl"
            aria-label={t.clearFilters}
          />
        </Tooltip>
      </div>

      <Row gutter={[12, 12]} align="bottom">
        <Col xs={24} lg={10}>
          <label className="section-title mb-1.5 block !normal-case">
            {t.searchPlaceholder}
          </label>
          <Input
            allowClear
            size="large"
            prefix={<SearchOutlined className="text-slate-400" />}
            placeholder={t.searchPlaceholder}
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="!rounded-xl"
          />
        </Col>

        <Col xs={12} lg={7}>
          <label className="section-title mb-1.5 block !normal-case">
            {t.filterStatus}
          </label>
          <Select
            allowClear
            size="large"
            className="w-full"
            placeholder={t.filterAllStatuses}
            value={statusFilter || undefined}
            onChange={(v) => onStatusFilterChange(v ?? '')}
            options={PATIENT_STATUS_VALUES.map((status) => ({
              value: status,
              label: getStatusLabel(status as PatientStatus),
            }))}
          />
        </Col>

        <Col xs={12} lg={7}>
          <label className="section-title mb-1.5 block !normal-case">
            {t.filterPriority}
          </label>
          <Select
            allowClear
            size="large"
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
        </Col>
      </Row>
    </div>
  )
}
