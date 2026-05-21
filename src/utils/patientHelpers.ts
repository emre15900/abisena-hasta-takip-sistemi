import {
  BloodType,
  Department,
  PatientPriority,
  PatientStatus,
  PATIENT_STATUS_VALUES,
  PATIENT_PRIORITY_VALUES,
  DEPARTMENT_VALUES,
  BLOOD_TYPE_VALUES,
} from '../enums'
import { Locale } from '../enums/locale.enum'
import type { PatientFormData, PatientRecord } from '../types/patient'

export {
  PATIENT_STATUS_VALUES as STATUSES,
  PATIENT_PRIORITY_VALUES,
  DEPARTMENT_VALUES as DEPARTMENTS,
  BLOOD_TYPE_VALUES as BLOOD_TYPES,
}

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
    department: Department.INTERNAL,
    status: PatientStatus.WAITING,
    priority: PatientPriority.NORMAL,
    bloodType: BloodType.A_POS,
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

export function filterPatientsToolbar(
  patients: PatientRecord[],
  search: string,
  statusFilter: string,
  priorityFilter: string,
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

  if (priorityFilter) {
    result = result.filter((p) => p.priority === priorityFilter)
  }

  return result
}

export function formatDate(dateStr: string, locale: Locale): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString(locale === Locale.TR ? 'tr-TR' : 'en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}
