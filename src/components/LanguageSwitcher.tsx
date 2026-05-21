import { Segmented } from 'antd'
import { useLanguage } from '../context/LanguageContext'
import type { Locale } from '../i18n/translations'

export function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage()

  return (
    <Segmented<Locale>
      value={locale}
      onChange={setLocale}
      options={[
        { value: 'tr', label: 'TR' },
        { value: 'en', label: 'EN' },
      ]}
    />
  )
}
