 'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { Prospect } from '@/app/components/dashboard/types'

type ProspectListSectionProps = {
  loadingProspects: boolean
  prospects: Prospect[]
}



export default function ProspectListSection({loadingProspects, prospects }: ProspectListSectionProps) {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredProspects = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase()
    if (!normalizedQuery) return prospects

    return prospects.filter((prospect) => {
      const companyName = prospect.company_name.toLowerCase()
      const companyLocation =
        typeof prospect.company_location === 'string' ? prospect.company_location.toLowerCase() : ''

      return companyName.includes(normalizedQuery) || companyLocation.includes(normalizedQuery)
    })
  }, [prospects, searchQuery])

  return (
    <section className="rounded-2xl w-full h-full border border-slate-300 bg-white p-6 backdrop-blur-2xl dark:border-slate-600 dark:bg-slate-800 flex min-h-0 flex-col">
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
        <div className="flex min-h-0 flex-1 flex-col gap-3">
          <input
            type="text"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search prospects..."
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-accent dark:border-slate-600 dark:bg-slate-900 dark:text-white"
          />

          {filteredProspects.length === 0 ? (
            <p className="rounded-xl border border-dashed border-slate-300 px-4 py-6 text-sm text-slate-600 dark:border-slate-600 dark:text-slate-300">
              No prospects match your search.
            </p>
          ) : (
            <div className="flex-1 min-h-0 space-y-3 overflow-y-auto pr-1">
              {filteredProspects.map((prospect) => (
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
        </div>
      )}
    </section>
  )
}
