import type { PatientRecord } from '../types/patient'

const API_URL = 'https://v0-json-api-three.vercel.app/api/data'

export async function fetchPatients(): Promise<PatientRecord[]> {
  const response = await fetch(API_URL)

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`)
  }

  const data: unknown = await response.json()

  if (!Array.isArray(data)) {
    throw new Error('Invalid API response')
  }

  return data as PatientRecord[]
}
