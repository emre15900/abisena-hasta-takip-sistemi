import { MoonOutlined, SunOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { useLanguage } from '../hooks/useLanguage'
import { useTheme } from '../hooks/useTheme'

export function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme()
  const { t } = useLanguage()

  return (
    <Button
      type="default"
      shape="circle"
      size="large"
      icon={isDark ? <SunOutlined /> : <MoonOutlined />}
      onClick={toggleTheme}
      className="!flex !h-10 !w-10 !items-center !justify-center !border-slate-200/80 !bg-white/60 !shadow-sm backdrop-blur-sm dark:!border-slate-600 dark:!bg-slate-800/60"
      aria-label={isDark ? t.lightMode : t.darkMode}
      title={isDark ? t.lightMode : t.darkMode}
    />
  )
}
