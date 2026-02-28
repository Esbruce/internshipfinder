import { Prospect } from '@/app/components/dashboard/types'

type StatisticsProps = {
  loadingProspects?: boolean
  prospects: Prospect[]
}

function formatMetric(value: number) {
  return new Intl.NumberFormat('en-US').format(value)
}

export default function Statistics({ loadingProspects = false, prospects }: StatisticsProps) {
  const totalDiscoveries = prospects.length
  const sentOutreach = prospects.filter(
    (prospect) => prospect.status?.trim().toLowerCase() === 'outreach'
  ).length

  return (
    <section className="h-full w-full rounded-2xl border border-slate-300 bg-white p-6 backdrop-blur-2xl dark:border-slate-600 dark:bg-slate-800">
      <h2 className="text-3xl font-semibold uppercase tracking-wide text-slate-900 dark:text-white">
        Statistics
      </h2>

      {loadingProspects ? (
        <p className="mt-5 rounded-xl border border-dashed border-slate-300 px-4 py-6 text-sm text-slate-600 dark:border-slate-600 dark:text-slate-300">
          Crunching your numbers...
        </p>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <article className="rounded-xl border border-slate-300 bg-slate-50 p-5 dark:border-slate-600 dark:bg-slate-900/50">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400">
              Total Discoveries
            </p>
            <p className="mt-2 text-5xl font-black leading-none text-accent">
              {formatMetric(totalDiscoveries)}
            </p>
          </article>

          <article className="rounded-xl border border-slate-300 bg-slate-50 p-5 dark:border-slate-600 dark:bg-slate-900/50">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400">
              Sent Outreach
            </p>
            <p className="mt-2 text-5xl font-black leading-none text-slate-900 dark:text-slate-100">
              {formatMetric(sentOutreach)}
            </p>
          </article>
        </div>
      )}
    </section>
  )
}
