import type {
  PatientFormData,
  PatientRecord,
  SortDirection,
  SortField,
} from '../types/patient'

export function generatePatientId(existing: PatientRecord[]): string {
  const maxNum = existing.reduce((max, p) => {
    const match = p.id.match(/pat-(\d+)/)
    return match ? Math.max(max, parseInt(match[1], 10)) : max
  }, 0)
  return `pat-${String(maxNum + 1).padStart(3, '0')}`
}

export function createEmptyPatient(): PatientFormData {
  const now = new Date().toISOString().split('T')[0]
  return {
    fullName: '',
    birthDate: now,
    appointmentDate: now,
    department: 'Dahiliye',
    status: 'Bekliyor',
    priority: 'normal',
    bloodType: 'A+',
    score: 3,
    note_tr: '',
    note_en: '',
    diagnosis_tr: '',
    diagnosis_en: '',
    isInsured: false,
    isFollowUp: false,
    isVaccinated: false,
    tags: [],
    notes: null,
  }
}

export function formToPatient(
  form: PatientFormData,
  id: string,
  createdAt: string,
): PatientRecord {
  return {
    id,
    fullName: form.fullName.trim(),
    birthDate: form.birthDate,
    appointmentDate: form.appointmentDate,
    createdAt,
    department: form.department,
    status: form.status,
    priority: form.priority,
    bloodType: form.bloodType,
    score: form.score,
    note_tr: form.note_tr,
    note_en: form.note_en,
    diagnosis_tr: form.diagnosis_tr,
    diagnosis_en: form.diagnosis_en,
    isInsured: form.isInsured,
    isFollowUp: form.isFollowUp,
    isVaccinated: form.isVaccinated,
    tags: form.tags,
    notes: form.notes,
  }
}

export function patientToForm(patient: PatientRecord): PatientFormData {
  return { ...patient }
}

export function filterAndSortPatients(
  patients: PatientRecord[],
  search: string,
  statusFilter: string,
  sortField: SortField,
  sortDirection: SortDirection,
): PatientRecord[] {
  let result = [...patients]

  const query = search.trim().toLowerCase()
  if (query) {
    result = result.filter((p) =>
      p.fullName.toLowerCase().includes(query),
    )
  }

  if (statusFilter) {
    result = result.filter((p) => p.status === statusFilter)
  }

  result.sort((a, b) => {
    let cmp = 0
    switch (sortField) {
      case 'fullName':
        cmp = a.fullName.localeCompare(b.fullName, 'tr')
        break
      case 'appointmentDate':
        cmp =
          new Date(a.appointmentDate).getTime() -
          new Date(b.appointmentDate).getTime()
        break
      case 'score':
        cmp = a.score - b.score
        break
    }
    return sortDirection === 'asc' ? cmp : -cmp
  })

  return result
}

export function formatDate(dateStr: string, locale: 'tr' | 'en'): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString(locale === 'tr' ? 'tr-TR' : 'en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

export const DEPARTMENTS = [
  'Dahiliye',
  'Nöroloji',
  'Kardiyoloji',
  'Ortopedi',
  'Pediatri',
] as const

export const STATUSES = [
  'Bekliyor',
  'Muayenede',
  'Tamamlandı',
  'İptal',
] as const

export const BLOOD_TYPES = [
  'A+',
  'A-',
  'B+',
  'B-',
  'AB+',
  'AB-',
  '0+',
  '0-',
] as const
