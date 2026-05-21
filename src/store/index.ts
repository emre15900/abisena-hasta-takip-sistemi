import { configureStore } from '@reduxjs/toolkit'
import languageReducer from './slices/languageSlice'
import patientsReducer from './slices/patientsSlice'
import themeReducer from './slices/themeSlice'

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    language: languageReducer,
    patients: patientsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
