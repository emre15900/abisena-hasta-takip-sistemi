import { HeartOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Layout, Space, Typography } from 'antd'
import { useLanguage } from '../context/LanguageContext'
import { useTheme } from '../context/ThemeContext'
import { LanguageSwitcher } from './LanguageSwitcher'
import { ThemeToggle } from './ThemeToggle'

const { Header: AntHeader } = Layout

interface HeaderProps {
  onAddClick: () => void
}

export function Header({ onAddClick }: HeaderProps) {
  const { t } = useLanguage()
  const { isDark } = useTheme()

  return (
    <AntHeader
      className="!h-auto !leading-normal"
      style={{
        background: isDark ? '#141414' : '#ffffff',
        borderBottom: `1px solid ${isDark ? '#303030' : '#f0f0f0'}`,
        padding: '16px 24px',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Space align="center" size="middle">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#0ea5e9] to-[#0369a1]">
            <HeartOutlined className="text-xl !text-white" />
          </div>
          <div>
            <Typography.Title
              level={4}
              className="!mb-0"
              style={{ color: isDark ? 'rgba(255,255,255,0.88)' : 'rgba(0,0,0,0.88)' }}
            >
              {t.appTitle}
            </Typography.Title>
            <Typography.Text
              type="secondary"
              className="text-sm"
              style={{ color: isDark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.45)' }}
            >
              {t.appSubtitle}
            </Typography.Text>
          </div>
        </Space>

        <Space wrap>
          <ThemeToggle />
          <LanguageSwitcher />
          <Button type="primary" icon={<PlusOutlined />} onClick={onAddClick}>
            {t.addPatient}
          </Button>
        </Space>
      </div>
    </AntHeader>
  )
}
