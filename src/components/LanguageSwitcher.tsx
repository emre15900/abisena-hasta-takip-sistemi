import { useLanguage } from '../context/LanguageContext'
import type { Locale } from '../i18n/translations'

export function LanguageSwitcher() {
  const { locale, setLocale, t } = useLanguage()

  const options: { value: Locale; label: string }[] = [
    { value: 'tr', label: 'TR' },
    { value: 'en', label: 'EN' },
  ]

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-medium text-slate-500">{t.language}</span>
      <div className="flex rounded-lg border border-slate-200 bg-white p-0.5 shadow-sm">
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => setLocale(opt.value)}
            className={`rounded-md px-3 py-1 text-xs font-semibold transition-colors ${
              locale === opt.value
                ? 'bg-clinic-600 text-white'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  )
}
