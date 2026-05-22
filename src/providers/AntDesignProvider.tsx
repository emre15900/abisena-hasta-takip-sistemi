import { ConfigProvider, theme } from 'antd'
import trTR from 'antd/locale/tr_TR'
import enUS from 'antd/locale/en_US'
import type { ReactNode } from 'react'
import { useLanguage } from '../hooks/useLanguage'
import { useTheme } from '../hooks/useTheme'
import { darkTheme, lightTheme } from '../styles/theme'

export function AntDesignProvider({ children }: { children: ReactNode }) {
  const { locale } = useLanguage()
  const { isDark } = useTheme()
  const palette = isDark ? darkTheme : lightTheme

  return (
    <ConfigProvider
      locale={locale === 'tr' ? trTR : enUS}
      theme={{
        algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
          colorPrimary: palette.primary,
          colorBgContainer: palette.surface,
          colorBgLayout: palette.bg,
          colorBorder: palette.border,
          colorText: palette.text,
          colorTextSecondary: palette.textMuted,
          borderRadius: 12,
          borderRadiusLG: 16,
          fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
          fontSize: 14,
          controlHeight: 40,
          boxShadow: '0 4px 24px -4px rgba(15, 23, 42, 0.08)',
          boxShadowSecondary: '0 2px 8px rgba(15, 23, 42, 0.04)',
        },
        components: {
          Layout: {
            headerBg: 'transparent',
            bodyBg: 'transparent',
            siderBg: palette.surface,
          },
          Card: {
            borderRadiusLG: 16,
            paddingLG: 20,
          },
          Table: {
            borderRadius: 16,
            headerBg: isDark ? 'rgba(30, 41, 59, 0.5)' : 'rgba(248, 250, 252, 0.8)',
            rowHoverBg: isDark
              ? 'rgba(45, 212, 191, 0.06)'
              : 'rgba(13, 148, 136, 0.04)',
          },
          Button: {
            borderRadius: 10,
            primaryShadow: '0 4px 14px rgba(13, 148, 136, 0.35)',
            fontWeight: 600,
          },
          Input: {
            borderRadius: 10,
            activeShadow: '0 0 0 2px rgba(13, 148, 136, 0.15)',
          },
          Select: {
            borderRadius: 10,
          },
          Modal: {
            borderRadiusLG: 20,
          },
          Tag: {
            borderRadiusSM: 6,
          },
          Pagination: {
            borderRadius: 8,
          },
          Collapse: {
            borderRadiusLG: 16,
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  )
}
