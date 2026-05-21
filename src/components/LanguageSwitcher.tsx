import { Segmented } from 'antd'
import { Locale } from '../enums'
import { useLanguage } from '../hooks/useLanguage'

export function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage()

  return (
    <Segmented<Locale>
      value={locale}
      onChange={setLocale}
      options={[
        { value: Locale.TR, label: 'TR' },
        { value: Locale.EN, label: 'EN' },
      ]}
    />
  )
}
