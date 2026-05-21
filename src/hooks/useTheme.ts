import { useCallback } from 'react'
import { toggleTheme, selectIsDark } from '../store/slices/themeSlice'
import { useAppDispatch, useAppSelector } from '../store/hooks'

export function useTheme() {
  const dispatch = useAppDispatch()
  const isDark = useAppSelector(selectIsDark)

  const toggle = useCallback(() => {
    dispatch(toggleTheme())
  }, [dispatch])

  return { isDark, toggleTheme: toggle }
}
