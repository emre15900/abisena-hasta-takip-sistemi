import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { Locale, StorageKey } from '../../enums'

function getInitialLocale(): Locale {
  const stored = localStorage.getItem(StorageKey.LOCALE)
  if (stored === Locale.TR || stored === Locale.EN) return stored
  return Locale.TR
}

interface LanguageState {
  locale: Locale
}

const initialState: LanguageState = {
  locale: getInitialLocale(),
}

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLocale(state, action: PayloadAction<Locale>) {
      state.locale = action.payload
      localStorage.setItem(StorageKey.LOCALE, action.payload)
    },
  },
})

export const { setLocale } = languageSlice.actions
export const selectLocale = (state: { language: LanguageState }) =>
  state.language.locale

export default languageSlice.reducer
