import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { StorageKey, Theme } from '../../enums'

function getInitialTheme(): Theme {
  const stored = localStorage.getItem(StorageKey.THEME)
  if (stored === Theme.DARK || stored === Theme.LIGHT) return stored
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? Theme.DARK
    : Theme.LIGHT
}

function applyThemeToDocument(theme: Theme) {
  const root = document.documentElement
  if (theme === Theme.DARK) {
    root.classList.add('dark')
  } else {
    root.classList.remove('dark')
  }
  localStorage.setItem(StorageKey.THEME, theme)
}

const initialTheme = getInitialTheme()
applyThemeToDocument(initialTheme)

interface ThemeState {
  theme: Theme
}

const initialState: ThemeState = {
  theme: initialTheme,
}

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<Theme>) {
      state.theme = action.payload
      applyThemeToDocument(action.payload)
    },
    toggleTheme(state) {
      const next = state.theme === Theme.DARK ? Theme.LIGHT : Theme.DARK
      state.theme = next
      applyThemeToDocument(next)
    },
  },
})

export const { setTheme, toggleTheme } = themeSlice.actions
export const selectTheme = (state: { theme: ThemeState }) => state.theme.theme
export const selectIsDark = (state: { theme: ThemeState }) =>
  state.theme.theme === Theme.DARK

export default themeSlice.reducer
