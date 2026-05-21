import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { translations, type Locale } from '../i18n/translations'
import type { PatientRecord } from '../types/patient'

type TranslationStrings = (typeof translations)[Locale]

interface LanguageContextValue {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: TranslationStrings
  getDiagnosis: (patient: PatientRecord) => string
  getNote: (patient: PatientRecord) => string
  getStatusLabel: (status: PatientRecord['status']) => string
  getPriorityLabel: (priority: PatientRecord['priority']) => string
  getDepartmentLabel: (department: string) => string
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

const STATUS_MAP: Record<PatientRecord['status'], { tr: string; en: string }> = {
  Bekliyor: { tr: 'Bekliyor', en: 'Waiting' },
  Muayenede: { tr: 'Muayenede', en: 'In Examination' },
  Tamamlandı: { tr: 'Tamamlandı', en: 'Completed' },
  İptal: { tr: 'İptal', en: 'Cancelled' },
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>('tr')

  const t = translations[locale]

  const getDiagnosis = useCallback(
    (patient: PatientRecord) =>
      locale === 'tr' ? patient.diagnosis_tr : patient.diagnosis_en,
    [locale],
  )

  const getNote = useCallback(
    (patient: PatientRecord) =>
      locale === 'tr' ? patient.note_tr : patient.note_en,
    [locale],
  )

  const getStatusLabel = useCallback(
    (status: PatientRecord['status']) => STATUS_MAP[status][locale],
    [locale],
  )

  const getPriorityLabel = useCallback(
    (priority: PatientRecord['priority']) =>
      priority === 'acil'
        ? locale === 'tr'
          ? 'Acil'
          : 'Urgent'
        : locale === 'tr'
          ? 'Normal'
          : 'Normal',
    [locale],
  )

  const getDepartmentLabel = useCallback(
    (department: string) => {
      const deptMap = t.departments as Record<string, string>
      return deptMap[department] ?? department
    },
    [t],
  )

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      t,
      getDiagnosis,
      getNote,
      getStatusLabel,
      getPriorityLabel,
      getDepartmentLabel,
    }),
    [
      locale,
      t,
      getDiagnosis,
      getNote,
      getStatusLabel,
      getPriorityLabel,
      getDepartmentLabel,
    ],
  )

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }
  return context
}
