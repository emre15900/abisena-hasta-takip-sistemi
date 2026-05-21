export enum PatientStatus {
  WAITING = 'Bekliyor',
  EXAMINING = 'Muayenede',
  COMPLETED = 'Tamamlandı',
  CANCELLED = 'İptal',
}

export const PATIENT_STATUS_VALUES = Object.values(PatientStatus) as PatientStatus[]
