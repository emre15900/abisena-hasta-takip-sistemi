import { HeartOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Layout, Space, Typography } from 'antd'
import { useLanguage } from '../hooks/useLanguage'
import { useTheme } from '../hooks/useTheme'
import { darkTheme, lightTheme } from '../styles/theme'
import { LanguageSwitcher } from './LanguageSwitcher'
import { ThemeToggle } from './ThemeToggle'

const { Header: AntHeader } = Layout

interface HeaderProps {
  onAddClick: () => void
}

export function Header({ onAddClick }: HeaderProps) {
  const { t } = useLanguage()
  const { isDark } = useTheme()
  const palette = isDark ? darkTheme : lightTheme

  return (
    <AntHeader
      className="!h-auto !leading-normal !px-0 !py-0"
      style={{
        background: palette.headerBg,
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: `1px solid ${palette.border}`,
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}
    >
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Space align="center" size="middle">
            <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-clinic-500 via-clinic-600 to-clinic-800 shadow-glow">
              <div className="absolute inset-0 rounded-2xl bg-white/20" />
              <HeartOutlined className="relative text-xl !text-white" />
            </div>
            <div>
              <Typography.Title
                level={3}
                className="!mb-0 !font-display !text-xl !font-bold !tracking-tight sm:!text-2xl"
                style={{ color: palette.text }}
              >
                {t.appTitle}
              </Typography.Title>
              <Typography.Text
                className="!text-sm"
                style={{ color: palette.textMuted }}
              >
                {t.appSubtitle}
              </Typography.Text>
            </div>
          </Space>

          <Space wrap size="small" className="toolbar-actions">
            <ThemeToggle />
            <LanguageSwitcher />
            <Button
              type="primary"
              size="large"
              icon={<PlusOutlined />}
              onClick={onAddClick}
              className="!h-10 !px-5 !shadow-glow"
            >
              {t.addPatient}
            </Button>
          </Space>
        </div>
      </div>
    </AntHeader>
  )
}
