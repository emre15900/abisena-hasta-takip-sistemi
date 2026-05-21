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
      icon={isDark ? <SunOutlined /> : <MoonOutlined />}
      onClick={toggleTheme}
      aria-label={isDark ? t.lightMode : t.darkMode}
      title={isDark ? t.lightMode : t.darkMode}
    />
  )
}
