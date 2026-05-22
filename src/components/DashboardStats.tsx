import {
  AlertOutlined,
  FilterOutlined,
  TeamOutlined,
  ThunderboltOutlined,
} from '@ant-design/icons'
import { useLanguage } from '../hooks/useLanguage'

interface DashboardStatsProps {
  totalCount: number
  filteredCount: number
  urgentCount: number
  waitingCount: number
}

export function DashboardStats({
  totalCount,
  filteredCount,
  urgentCount,
  waitingCount,
}: DashboardStatsProps) {
  const { t } = useLanguage()

  const stats = [
    {
      label: t.statTotal,
      value: totalCount,
      icon: TeamOutlined,
      gradient: 'from-clinic-500 to-clinic-700',
      iconBg: 'bg-clinic-500/10 text-clinic-600 dark:text-clinic-400',
    },
    {
      label: t.statFiltered,
      value: filteredCount,
      icon: FilterOutlined,
      gradient: 'from-indigo-500 to-violet-600',
      iconBg: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400',
    },
    {
      label: t.statUrgent,
      value: urgentCount,
      icon: ThunderboltOutlined,
      gradient: 'from-rose-500 to-orange-500',
      iconBg: 'bg-rose-500/10 text-rose-600 dark:text-rose-400',
    },
    {
      label: t.statWaiting,
      value: waitingCount,
      icon: AlertOutlined,
      gradient: 'from-amber-500 to-yellow-500',
      iconBg: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
    },
  ]

  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon
        return (
          <div
            key={stat.label}
            className="stat-card animate-slide-up opacity-0"
            style={{ animationDelay: `${index * 80}ms`, animationFillMode: 'forwards' }}
          >
            <div
              className={`absolute -right-4 -top-4 h-20 w-20 rounded-full bg-gradient-to-br ${stat.gradient} opacity-[0.08] blur-2xl`}
            />
            <div className="relative flex items-start justify-between gap-3">
              <div>
                <p className="section-title !text-[10px]">{stat.label}</p>
                <p className="font-display mt-1 text-2xl font-bold tracking-tight text-slate-900 dark:text-white lg:text-3xl">
                  {stat.value}
                </p>
              </div>
              <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${stat.iconBg}`}
              >
                <Icon className="text-lg" />
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
