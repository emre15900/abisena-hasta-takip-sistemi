import { useCallback } from 'react'
import { Locale, PatientPriority, PatientStatus } from '../enums'
import { translations } from '../i18n/translations'
import { setLocale, selectLocale } from '../store/slices/languageSlice'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import type { PatientRecord } from '../types/patient'

const STATUS_LABELS: Record<PatientStatus, { tr: string; en: string }> = {
  [PatientStatus.WAITING]: { tr: 'Bekliyor', en: 'Waiting' },
  [PatientStatus.EXAMINING]: { tr: 'Muayenede', en: 'In Examination' },
  [PatientStatus.COMPLETED]: { tr: 'Tamamlandı', en: 'Completed' },
  [PatientStatus.CANCELLED]: { tr: 'İptal', en: 'Cancelled' },
}

export function useLanguage() {
  const dispatch = useAppDispatch()
  const locale = useAppSelector(selectLocale)
  const t = translations[locale]

  const setLocaleAction = useCallback(
    (next: Locale) => dispatch(setLocale(next)),
    [dispatch],
  )

  const getDiagnosis = useCallback(
    (patient: PatientRecord) =>
      locale === Locale.TR ? patient.diagnosis_tr : patient.diagnosis_en,
    [locale],
  )

  const getNote = useCallback(
    (patient: PatientRecord) =>
      locale === Locale.TR ? patient.note_tr : patient.note_en,
    [locale],
  )

  const getStatusLabel = useCallback(
    (status: PatientStatus) =>
      STATUS_LABELS[status][locale === Locale.TR ? 'tr' : 'en'],
    [locale],
  )

  const getPriorityLabel = useCallback(
    (priority: PatientPriority) => {
      if (priority === PatientPriority.URGENT) {
        return locale === Locale.TR ? 'Acil' : 'Urgent'
      }
      return locale === Locale.TR ? 'Normal' : 'Normal'
    },
    [locale],
  )

  const getDepartmentLabel = useCallback(
    (department: string) => {
      const deptMap = t.departments as Record<string, string>
      return deptMap[department] ?? department
    },
    [t],
  )

  return {
    locale,
    setLocale: setLocaleAction,
    t,
    getDiagnosis,
    getNote,
    getStatusLabel,
    getPriorityLabel,
    getDepartmentLabel,
  }
}
