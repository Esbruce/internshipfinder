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

const navItems: NavItem[] = [
  { href: '/dashboard', label: 'Dashboard', icon: DashboardIcon },
  { href: '/agents', label: 'Intern Agents', icon: AgentsIcon },
]

export function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <aside className="h-screen w-64 border-r border-slate-300 bg-white py-10 p-3 dark:border-slate-700 dark:bg-slate-900">
      <nav className="space-y-1">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(`${item.href}/`)
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition ${
                isActive
                  ? 'text-slate-700 bg-slate-200 dark:text-slate-200 dark:hover:bg-slate-800'
                  : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800'
              }`}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
