import { StorageKey } from '../enums'
import type { PatientRecord } from '../types/patient'

export interface PatientMutations {
  added: PatientRecord[]
  updated: Record<string, PatientRecord>
  deletedIds: string[]
}

const EMPTY_MUTATIONS: PatientMutations = {
  added: [],
  updated: {},
  deletedIds: [],
}

export function loadPatientMutations(): PatientMutations {
  try {
    const raw = localStorage.getItem(StorageKey.PATIENT_MUTATIONS)
    if (!raw) return { ...EMPTY_MUTATIONS }
    const parsed = JSON.parse(raw) as PatientMutations
    return {
      added: Array.isArray(parsed.added) ? parsed.added : [],
      updated: parsed.updated && typeof parsed.updated === 'object' ? parsed.updated : {},
      deletedIds: Array.isArray(parsed.deletedIds) ? parsed.deletedIds : [],
    }
  } catch {
    return { ...EMPTY_MUTATIONS }
  }
}

export function savePatientMutations(mutations: PatientMutations): void {
  localStorage.setItem(StorageKey.PATIENT_MUTATIONS, JSON.stringify(mutations))
}

export function mergePatientsWithMutations(
  apiPatients: PatientRecord[],
  mutations: PatientMutations,
): PatientRecord[] {
  const deletedSet = new Set(mutations.deletedIds)

  const fromApi = apiPatients
    .filter((p) => !deletedSet.has(p.id))
    .map((p) => mutations.updated[p.id] ?? p)

  const apiIds = new Set(apiPatients.map((p) => p.id))
  const addedOnly = mutations.added.filter(
    (p) => !apiIds.has(p.id) && !deletedSet.has(p.id),
  )

  return [...addedOnly, ...fromApi]
}
