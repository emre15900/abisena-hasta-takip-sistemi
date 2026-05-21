import { useCallback, useEffect, useState } from 'react'
import { STATUSES } from '../utils/patientHelpers'

export interface PatientFiltersState {
  search: string
  statusFilter: string
  priorityFilter: string
}

const EMPTY_FILTERS: PatientFiltersState = {
  search: '',
  statusFilter: '',
  priorityFilter: '',
}

const VALID_PRIORITIES = ['acil', 'normal'] as const

function readFiltersFromUrl(): PatientFiltersState {
  const params = new URLSearchParams(window.location.search)
  const status = params.get('status') ?? ''
  const priority = params.get('priority') ?? ''

  return {
    search: params.get('q') ?? '',
    statusFilter: STATUSES.includes(status as (typeof STATUSES)[number])
      ? status
      : '',
    priorityFilter: VALID_PRIORITIES.includes(
      priority as (typeof VALID_PRIORITIES)[number],
    )
      ? priority
      : '',
  }
}

function buildFilterUrl(filters: PatientFiltersState): string {
  const params = new URLSearchParams()
  if (filters.search.trim()) params.set('q', filters.search.trim())
  if (filters.statusFilter) params.set('status', filters.statusFilter)
  if (filters.priorityFilter) params.set('priority', filters.priorityFilter)

  const qs = params.toString()
  return qs
    ? `${window.location.pathname}?${qs}`
    : window.location.pathname
}

export function useFilterQueryParams() {
  const [filters, setFilters] = useState<PatientFiltersState>(readFiltersFromUrl)

  const syncUrl = useCallback((next: PatientFiltersState) => {
    window.history.replaceState(null, '', buildFilterUrl(next))
  }, [])

  const setSearch = useCallback(
    (search: string) => {
      setFilters((prev) => {
        const next = { ...prev, search }
        syncUrl(next)
        return next
      })
    },
    [syncUrl],
  )

  const setStatusFilter = useCallback(
    (statusFilter: string) => {
      setFilters((prev) => {
        const next = { ...prev, statusFilter }
        syncUrl(next)
        return next
      })
    },
    [syncUrl],
  )

  const setPriorityFilter = useCallback(
    (priorityFilter: string) => {
      setFilters((prev) => {
        const next = { ...prev, priorityFilter }
        syncUrl(next)
        return next
      })
    },
    [syncUrl],
  )

  const clearFilters = useCallback(() => {
    setFilters(EMPTY_FILTERS)
    syncUrl(EMPTY_FILTERS)
  }, [syncUrl])

  const hasActiveFilters =
    Boolean(filters.search.trim()) ||
    Boolean(filters.statusFilter) ||
    Boolean(filters.priorityFilter)

  useEffect(() => {
    const onPopState = () => setFilters(readFiltersFromUrl())
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  return {
    ...filters,
    setSearch,
    setStatusFilter,
    setPriorityFilter,
    clearFilters,
    hasActiveFilters,
  }
}
