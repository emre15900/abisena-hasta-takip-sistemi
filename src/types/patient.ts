export type PatientStatus =
  | 'Bekliyor'
  | 'Muayenede'
  | 'Tamamlandı'
  | 'İptal'

export type PatientPriority = 'acil' | 'normal'

export interface PatientRecord {
  id: string
  fullName: string
  birthDate: string
  appointmentDate: string
  createdAt: string
  department: string
  status: PatientStatus
  priority: PatientPriority
  bloodType: string
  score: number
  note_tr: string
  note_en: string
  diagnosis_tr: string
  diagnosis_en: string
  isInsured: boolean
  isFollowUp: boolean
  isVaccinated: boolean
  tags: string[]
  notes: string | null
}

export type PatientFormData = Omit<PatientRecord, 'id' | 'createdAt'> & {
  id?: string
  createdAt?: string
}

export type SortField = 'fullName' | 'appointmentDate' | 'bloodType'
export type SortDirection = 'asc' | 'desc'
