export enum PatientPriority {
  URGENT = 'acil',
  NORMAL = 'normal',
}

export const PATIENT_PRIORITY_VALUES = Object.values(
  PatientPriority,
) as PatientPriority[]
