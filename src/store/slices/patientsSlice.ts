import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { fetchPatients } from '../../api/patients'
import {
  loadPatientMutations,
  mergePatientsWithMutations,
  savePatientMutations,
  type PatientMutations,
} from '../../services/patientStorage'
import type { PatientFormData, PatientRecord } from '../../types/patient'
import { formToPatient, generatePatientId } from '../../utils/patientHelpers'

interface PatientsState {
  apiPatients: PatientRecord[]
  patients: PatientRecord[]
  mutations: PatientMutations
  loading: boolean
  error: string | null
}

function syncMergedPatients(state: PatientsState) {
  state.patients = mergePatientsWithMutations(
    state.apiPatients,
    state.mutations,
  )
}

const initialState: PatientsState = {
  apiPatients: [],
  patients: [],
  mutations: loadPatientMutations(),
  loading: false,
  error: null,
}

export const fetchPatientsThunk = createAsyncThunk(
  'patients/fetch',
  async () => fetchPatients(),
)

const patientsSlice = createSlice({
  name: 'patients',
  initialState,
  reducers: {
    addPatient(state, action: PayloadAction<PatientFormData>) {
      const id = generatePatientId(state.patients)
      const createdAt = new Date().toISOString()
      const newPatient = formToPatient(action.payload, id, createdAt)

      state.mutations.deletedIds = state.mutations.deletedIds.filter(
        (deletedId) => deletedId !== id,
      )
      const { [id]: _removed, ...restUpdated } = state.mutations.updated
      state.mutations.updated = restUpdated

      state.mutations.added = [
        newPatient,
        ...state.mutations.added.filter((p) => p.id !== id),
      ]

      savePatientMutations(state.mutations)
      syncMergedPatients(state)
    },
    updatePatient(
      state,
      action: PayloadAction<{ id: string; data: PatientFormData }>,
    ) {
      const { id, data } = action.payload
      const existing = state.patients.find((p) => p.id === id)
      if (!existing) return

      const updated = formToPatient(data, id, existing.createdAt)
      const isLocallyAdded = state.mutations.added.some((p) => p.id === id)

      if (isLocallyAdded) {
        state.mutations.added = state.mutations.added.map((p) =>
          p.id === id ? updated : p,
        )
      } else {
        state.mutations.updated = {
          ...state.mutations.updated,
          [id]: updated,
        }
      }

      savePatientMutations(state.mutations)
      syncMergedPatients(state)
    },
    deletePatient(state, action: PayloadAction<string>) {
      const id = action.payload

      state.mutations.added = state.mutations.added.filter((p) => p.id !== id)
      const { [id]: _removed, ...restUpdated } = state.mutations.updated
      state.mutations.updated = restUpdated

      if (!state.mutations.deletedIds.includes(id)) {
        state.mutations.deletedIds.push(id)
      }

      savePatientMutations(state.mutations)
      syncMergedPatients(state)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPatientsThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchPatientsThunk.fulfilled, (state, action) => {
        state.loading = false
        state.apiPatients = action.payload
        syncMergedPatients(state)
      })
      .addCase(fetchPatientsThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message ?? 'Unknown error'
      })
  },
})

export const { addPatient, updatePatient, deletePatient } = patientsSlice.actions

export const selectPatients = (state: { patients: PatientsState }) =>
  state.patients.patients
export const selectPatientsLoading = (state: { patients: PatientsState }) =>
  state.patients.loading
export const selectPatientsError = (state: { patients: PatientsState }) =>
  state.patients.error

export default patientsSlice.reducer
