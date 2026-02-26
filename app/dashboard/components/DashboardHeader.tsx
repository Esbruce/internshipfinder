'use client'

import Link from 'next/link'

export function DashboardHeader() {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center border-b border-slate-300 bg-white px-8 dark:border-slate-600 dark:bg-slate-900">
      <div className="flex flex-1" aria-hidden />
      <div className="flex flex-1 items-center justify-end gap-3">
        <Link
          href="/get-started"
          className="rounded-lg border border-slate-300 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-800 transition hover:bg-slate-100 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
        >
          Settings
        </Link>
        <form action="/auth/signout" method="post">
          <button
            type="submit"
            className="rounded-lg border border-slate-300 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-800 transition hover:bg-slate-100 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
          >
            Sign out
          </button>
        </form>
      </div>
    </header>
  )
}
