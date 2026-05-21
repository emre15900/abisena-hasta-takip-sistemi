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
      <span className="hidden text-xs font-medium text-slate-500 dark:text-slate-400 sm:inline">
        {t.language}
      </span>
      <div className="flex rounded-lg border border-slate-200 bg-white p-0.5 shadow-sm dark:border-slate-600 dark:bg-slate-800">
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => setLocale(opt.value)}
            className={`rounded-md px-3 py-1 text-xs font-semibold transition-colors ${
              locale === opt.value
                ? 'bg-clinic-600 text-white'
                : 'text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-700'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  )
}
