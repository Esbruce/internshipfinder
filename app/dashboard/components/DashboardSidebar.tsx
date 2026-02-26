'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

function IconDashboard() {
  return (
    <svg className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  )
}
function IconTemplates() {
  return (
    <svg className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  )
}
function IconOutreach() {
  return (
    <svg className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  )
}

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: <IconDashboard /> },
  { href: '/dashboard/templates', label: 'Email templates', icon: <IconTemplates /> },
  { href: '/dashboard/outreach', label: 'Outreach', icon: <IconOutreach /> },
]

export function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col border-r border-slate-300 bg-white dark:border-slate-600 dark:bg-slate-900">
      <div className="flex h-16 shrink-0 items-center justify-center border-b border-slate-300 px-6 dark:border-slate-600">
        <span className="text-center text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
          Internship Finder
        </span>
      </div>
      <nav className="flex flex-1 flex-col gap-1 p-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href))
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-sky-100 text-sky-800 dark:bg-sky-500/25 dark:text-sky-200'
                  : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-slate-100'
              }`}
            >
              {item.icon}
              <span className="flex-1 text-left">{item.label}</span>
            </Link>
          )
        })}
      </nav>
      <div className="border-t border-slate-300 p-4 dark:border-slate-600">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-300 text-sm font-semibold text-slate-700 dark:bg-slate-600 dark:text-slate-200"
          aria-hidden
        >
          N
        </div>
      </div>
    </aside>
  )
}
