import { HeartOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Layout, Space, Typography } from 'antd'
import { useLanguage } from '../context/LanguageContext'
import { LanguageSwitcher } from './LanguageSwitcher'
import { ThemeToggle } from './ThemeToggle'

const { Header: AntHeader } = Layout

interface HeaderProps {
  onAddClick: () => void
}

export function Header({ onAddClick }: HeaderProps) {
  const { t } = useLanguage()

  return (
    <AntHeader className="!h-auto !px-4 !py-4 sm:!px-6 lg:!px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Space align="center" size="middle">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#0ea5e9] to-[#0369a1]">
            <HeartOutlined className="text-xl !text-white" />
          </div>
          <div>
            <Typography.Title level={4} className="!mb-0">
              {t.appTitle}
            </Typography.Title>
            <Typography.Text type="secondary" className="text-sm">
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
