import { ConfigProvider, theme } from 'antd'
import trTR from 'antd/locale/tr_TR'
import enUS from 'antd/locale/en_US'
import type { ReactNode } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { useTheme } from '../context/ThemeContext'

export function AntDesignProvider({ children }: { children: ReactNode }) {
  const { locale } = useLanguage()
  const { isDark } = useTheme()

  return (
    <ConfigProvider
      locale={locale === 'tr' ? trTR : enUS}
      theme={{
        algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
          colorPrimary: '#0284c7',
          borderRadius: 8,
          fontFamily: "'DM Sans', system-ui, sans-serif",
        },
      }}
    >
      {children}
    </ConfigProvider>
  )
}
