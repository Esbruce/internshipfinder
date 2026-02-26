'use client'

import { useMemo, useState } from 'react'

type TimeMode = 'week' | 'day'

// Mock: people outreached over time (would come from API)
const OUTREACH_DATA = {
  week: [
    { label: 'Jan 6', count: 4 },
    { label: 'Jan 13', count: 12 },
    { label: 'Jan 20', count: 8 },
    { label: 'Jan 27', count: 15 },
    { label: 'Feb 3', count: 22 },
    { label: 'Feb 10', count: 18 },
    { label: 'Feb 17', count: 27 },
  ],
  day: [
    { label: 'Mon', count: 3 },
    { label: 'Tue', count: 7 },
    { label: 'Wed', count: 5 },
    { label: 'Thu', count: 9 },
    { label: 'Fri', count: 12 },
    { label: 'Sat', count: 4 },
    { label: 'Sun', count: 2 },
  ],
} satisfies Record<TimeMode, Array<{ label: string; count: number }>>

export function OutreachChart() {
  const [timeMode, setTimeMode] = useState<TimeMode>('week')

  const data = OUTREACH_DATA[timeMode]
  const maxCount = useMemo(() => Math.max(...data.map((d) => d.count), 1), [data])
  const total = useMemo(() => data.reduce((sum, item) => sum + item.count, 0), [data])

  return (
    <div className="flex h-full flex-col rounded-2xl border border-slate-300 bg-white p-6 shadow-sm dark:border-slate-600 dark:bg-slate-800">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div className="text-left">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-800 dark:text-slate-200">
            People outreached to
          </h2>
          <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
            By {timeMode === 'week' ? 'week' : 'day'}
          </p>
        </div>
        <div className="inline-flex rounded-lg border border-slate-300 bg-slate-100 p-1 dark:border-slate-600 dark:bg-slate-700/70">
          <button
            type="button"
            onClick={() => setTimeMode('day')}
            className={`rounded-md px-3 py-1 text-xs font-medium transition ${
              timeMode === 'day'
                ? 'bg-white text-slate-900 shadow-sm dark:bg-slate-800 dark:text-slate-100'
                : 'text-slate-600 hover:text-slate-800 dark:text-slate-300 dark:hover:text-slate-100'
            }`}
          >
            Day
          </button>
          <button
            type="button"
            onClick={() => setTimeMode('week')}
            className={`rounded-md px-3 py-1 text-xs font-medium transition ${
              timeMode === 'week'
                ? 'bg-white text-slate-900 shadow-sm dark:bg-slate-800 dark:text-slate-100'
                : 'text-slate-600 hover:text-slate-800 dark:text-slate-300 dark:hover:text-slate-100'
            }`}
          >
            Week
          </button>
        </div>
      </div>
      <div className="flex min-h-0 flex-1 flex-col">
        <div className="flex flex-1 items-end justify-center gap-0">
          {data.map((item) => (
            <div key={item.label} className="flex h-full flex-1 items-end">
              <div
                className="w-full bg-gradient-to-t from-sky-600 to-sky-400 transition-all hover:from-sky-500 hover:to-sky-300 dark:from-sky-500 dark:to-sky-400"
                style={{ height: `${Math.max(16, (item.count / maxCount) * 140)}px` }}
                title={`${item.count} people`}
              />
            </div>
          ))}
        </div>
        <div className="mt-2 grid grid-cols-7 gap-0">
          {data.map((item) => (
            <span
              key={`label-${item.label}`}
              className="truncate text-center text-xs font-medium text-slate-600 dark:text-slate-400"
            >
              {item.label}
            </span>
          ))}
        </div>
      </div>
      <div className="mt-6 flex justify-center border-t border-slate-300 pt-4 dark:border-slate-600">
        <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
          Total: {total} this period
        </span>
      </div>
    </div>
  )
}
