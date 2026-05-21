import { useCallback, useEffect, useState } from 'react'
import { fetchPatients } from '../api/patients'
import type { PatientFormData, PatientRecord } from '../types/patient'
import {
  formToPatient,
  generatePatientId,
} from '../utils/patientHelpers'

export function usePatients() {
  const [patients, setPatients] = useState<PatientRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadPatients = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchPatients()
      setPatients(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadPatients()
  }, [loadPatients])

  const addPatient = useCallback(
    (form: PatientFormData) => {
      const id = generatePatientId(patients)
      const createdAt = new Date().toISOString()
      const newPatient = formToPatient(form, id, createdAt)
      setPatients((prev) => [newPatient, ...prev])
    },
    [patients],
  )

  const updatePatient = useCallback(
    (id: string, form: PatientFormData) => {
      setPatients((prev) =>
        prev.map((p) => {
          if (p.id !== id) return p
          return formToPatient(form, id, p.createdAt)
        }),
      )
    },
    [],
  )

  const deletePatient = useCallback((id: string) => {
    setPatients((prev) => prev.filter((p) => p.id !== id))
  }, [])

  return {
    patients,
    loading,
    error,
    loadPatients,
    addPatient,
    updatePatient,
    deletePatient,
  }
}
