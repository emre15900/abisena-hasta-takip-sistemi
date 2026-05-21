import { HiHeart, HiPlus } from 'react-icons/hi2'
import { useLanguage } from '../context/LanguageContext'
import { LanguageSwitcher } from './LanguageSwitcher'
import { ThemeToggle } from './ThemeToggle'

interface HeaderProps {
  onAddClick: () => void
}

export function Header({ onAddClick }: HeaderProps) {
  const { t } = useLanguage()

  return (
    <header className="border-b border-slate-200/80 bg-white/80 backdrop-blur-md dark:border-slate-700/80 dark:bg-slate-900/80">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-clinic-500 to-clinic-700 shadow-lg shadow-clinic-500/25">
            <HiHeart className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="font-display text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-2xl">
              {t.appTitle}
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {t.appSubtitle}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <LanguageSwitcher />
          <button
            type="button"
            onClick={onAddClick}
            className="inline-flex items-center gap-2 rounded-xl bg-clinic-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-clinic-600/25 transition hover:bg-clinic-700 active:scale-[0.98]"
          >
            <HiPlus className="h-4 w-4" />
            {t.addPatient}
          </button>
        </div>
      </div>
    </header>
  )
}
