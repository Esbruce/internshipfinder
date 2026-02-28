'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { ReactElement, SVGProps } from 'react'

type NavItem = {
  href: string
  label: string
  icon: (props: SVGProps<SVGSVGElement>) => ReactElement
}

function DashboardIcon({ className }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="3" y="3" width="7" height="9" rx="1" />
      <rect x="14" y="3" width="7" height="5" rx="1" />
      <rect x="14" y="12" width="7" height="9" rx="1" />
      <rect x="3" y="16" width="7" height="5" rx="1" />
    </svg>
  )
}

function AgentsIcon({ className }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M9 3h6v4H9z" />
      <path d="M12 7v4" />
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M3 15h2M19 15h2M8 16v2M16 16v2" />
    </svg>
  )
}

function EmailIcon({ className }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  )
}

function AccountIcon({ className }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="8" r="4" />
      <path d="M5 20a7 7 0 0 1 14 0" />
    </svg>
  )
}

const navItems: NavItem[] = [
  { href: '/dashboard', label: 'Dashboard', icon: DashboardIcon },
  { href: '/agents', label: 'Intern Agents', icon: AgentsIcon },
  { href: '/email', label: 'Email', icon: EmailIcon },
  { href: '/account', label: 'Account', icon: AccountIcon },
]

export function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <aside className="flex h-screen w-64 flex-col border-r-2 border-slate-900 bg-white p-4 py-8 dark:border-slate-100 dark:bg-slate-900">
      <div className="mb-6 rounded-xl border-2 border-slate-900 bg-white px-3 py-2 text-sm font-black uppercase tracking-wide text-accent shadow-[1px_2px_0px_0px_rgba(15,23,42,1)] dark:border-slate-100 dark:bg-slate-800 dark:shadow-[4px_4px_0px_0px_rgba(248,250,252,0.7)]">
        Internship Finder
      </div>
      <nav className="space-y-2">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(`${item.href}/`)
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2 rounded-lg border-2 px-3 py-2 text-sm font-semibold transition ${
                isActive
                  ? 'border-slate-900 bg-accent text-accent-foreground shadow-[1px_2px_0px_0px_rgba(15,23,42,1)] dark:border-slate-100 dark:shadow-[4px_4px_0px_0px_rgba(248,250,252,0.7)]'
                  : 'border-slate-300 bg-white text-slate-700 hover:border-slate-900 hover:bg-sky-100 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>

      <form action="/auth/signout" method="post" className="mt-auto pt-4">
        <button
          type="submit"
          className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-900 hover:bg-sky-100 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-slate-100 dark:hover:bg-slate-700"
        >
          Sign out
        </button>
      </form>
    </aside>
  )
}
