import Link from 'next/link'
import { Prospect } from '@/app/components/dashboard/types'

type ProspectListSectionProps = {
  loadingProspects: boolean
  prospects: Prospect[]
}



export default function ProspectListSection({loadingProspects, prospects }: ProspectListSectionProps) {
  return (
    <section className="rounded-2xl w-full h-full border border-slate-300 bg-white backdrop-blur-2xl p-6 dark:border-slate-600 dark:bg-slate-800">
      <div className="mb-4">
        <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">Recent Prospects</h1>
      </div>

      {loadingProspects ? (
        <p className="text-sm text-slate-600 dark:text-slate-300">Loading Prospects...</p>
      ) : prospects.length === 0 ? (
        <p className="rounded-xl border border-dashed border-slate-300 px-4 py-6 text-sm text-slate-600 dark:border-slate-600 dark:text-slate-300">
          No prospects yet. Our Intern Agents run at different time throughout the day.
        </p>
      ) : (
        <div className="space-y-3">
          {prospects.map((prospect) => (
            <Link
              key={prospect.id}
              href={`/dashboard/prospects/${prospect.id}`}
              className="block rounded-xl border border-slate-300 bg-slate-50 p-4 transition hover:border-accent dark:border-slate-600 dark:bg-slate-900/50 dark:hover:border-accent"
            >
              <article>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h2 className="text-base text-accent text-xl font-semibold dark:text-white">{prospect.company_name}</h2>
                </div>
                <div className="text-sm text-slate-700 dark:text-slate-200 sm:grid-cols-2">
                  <p>{prospect.company_location ?? '—'}</p>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    {new Date(prospect.created_at).toLocaleDateString()}
                  </span>
                </div>
              </article>
            </Link>
          ))}
        </div>
      )}
    </section>
  )
}
