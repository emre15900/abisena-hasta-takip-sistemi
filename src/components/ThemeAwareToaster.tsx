import { Toaster } from 'react-hot-toast'
import { useTheme } from '../hooks/useTheme'
import { darkTheme, lightTheme } from '../styles/theme'

export function ThemeAwareToaster() {
  const { isDark } = useTheme()
  const palette = isDark ? darkTheme : lightTheme

  return (
    <Toaster
      position="top-right"
      gutter={12}
      toastOptions={{
        duration: 3200,
        style: {
          borderRadius: '14px',
          padding: '14px 18px',
          fontSize: '14px',
          fontWeight: 500,
          fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
          background: isDark ? 'rgba(30, 41, 59, 0.92)' : 'rgba(255, 255, 255, 0.95)',
          color: palette.text,
          border: `1px solid ${isDark ? 'rgba(45, 212, 191, 0.2)' : 'rgba(13, 148, 136, 0.15)'}`,
          boxShadow: isDark
            ? '0 12px 40px -12px rgba(0, 0, 0, 0.5)'
            : '0 12px 40px -12px rgba(13, 148, 136, 0.25), 0 4px 16px rgba(15, 23, 42, 0.08)',
          backdropFilter: 'blur(12px)',
        },
        success: {
          iconTheme: {
            primary: palette.primary,
            secondary: isDark ? '#1e293b' : '#fff',
          },
        },
      }}
    />
  )
}
