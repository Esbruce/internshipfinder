'use client'

import { useEffect, useState } from 'react'
import type { AutomationPreferencesData } from './AutomationPreferencesSection'
import type { InternshipPreferencesData } from './InternshipPreferencesSection'

const FREQUENCY_LABELS: Record<AutomationPreferencesData['searchFrequency'], string> = {
  hourly: 'every few hours',
  daily: 'once a day',
  weekly: 'once a week',
}

const STEPS = [
  {
    id: 'preferences',
    title: 'Your preferences',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 010 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 010-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    getDescription: (_automation: AutomationPreferencesData, internship: InternshipPreferencesData) => {
      const parts: string[] = []
      if (internship.location) parts.push(`location: ${internship.location}`)
      if (internship.industry) parts.push(internship.industry)
      if (internship.idealInternshipDescription) parts.push('your ideal role description')
      if (internship.cvUrl) parts.push('your CV for applications')
      if (parts.length === 0) return 'We use your profile, location, industry, and ideal role to know what to look for.'
      return `We use ${parts.join(', ')} to know what to look for.`
    },
  },
  {
    id: 'search',
    title: 'We search',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
      </svg>
    ),
    getDescription: (automation: AutomationPreferencesData) =>
      `Our agent scans internship listings ${FREQUENCY_LABELS[automation.searchFrequency]}, so you don't have to.`,
  },
  {
    id: 'match',
    title: 'We match & rank',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    getDescription: () =>
      'Listings are scored against your preferences. You see the best fits first and can filter or ignore the rest.',
  },
  {
    id: 'notify',
    title: 'You stay in the loop',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
      </svg>
    ),
    getDescription: (automation: AutomationPreferencesData) => {
      const parts: string[] = []
      if (automation.emailDigest) parts.push('email digests with new matches')
      if (automation.notifyNewMatches) parts.push('notifications when something fits')
      if (automation.autoApplyEnabled)
        parts.push(`auto-apply (up to ${automation.maxApplicationsPerDay} per day)`)
      if (parts.length === 0) return 'You can come back anytime to see new matches and apply manually.'
      return `You get ${parts.join(', ')}. You can always review and apply manually too.`
    },
  },
] as const

export function HowAgentWorksSection({
  automationPrefs,
  internshipPrefs,
}: {
  automationPrefs: AutomationPreferencesData
  internshipPrefs: InternshipPreferencesData
}) {
  const [visible, setVisible] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const t = requestAnimationFrame(() => {
      requestAnimationFrame(() => setVisible(true))
    })
    return () => cancelAnimationFrame(t)
  }, [])

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">How the agent works</h2>
        <p className="mt-2 text-base text-slate-700 dark:text-slate-400">
          Here's the high-level flow. Your choices in the previous steps shape what happens below.
        </p>
      </div>

      <ol className="relative space-y-0">
        {STEPS.map((step, index) => (
          <li
            key={step.id}
            className="relative flex gap-4"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(8px)',
              transition: `opacity 0.35s ease ${index * 0.08}s, transform 0.35s ease ${index * 0.08}s`,
            }}
          >
            <div className="relative flex shrink-0 flex-col items-center">
              <div
                className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-sky-600 bg-sky-100 text-sky-700 dark:border-sky-400/60 dark:bg-sky-900/30 dark:text-sky-400"
                aria-hidden
              >
                {step.icon}
              </div>
              {index < STEPS.length - 1 && (
                <div
                  className="absolute left-1/2 top-12 h-8 w-0.5 -translate-x-1/2 bg-slate-300 dark:bg-slate-600"
                  aria-hidden
                />
              )}
            </div>
            <div className="min-w-0 flex-1 pb-8">
              <h3 className="text-base font-semibold text-slate-900 dark:text-white">{step.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-700 dark:text-slate-400">
                {step.id === 'preferences'
                  ? step.getDescription(automationPrefs, internshipPrefs)
                  : step.getDescription(automationPrefs)}
              </p>
            </div>
          </li>
        ))}
      </ol>

      {mounted && (
        <p className="rounded-lg border border-slate-300 bg-slate-100 px-4 py-3 text-sm text-slate-700 dark:border-slate-600 dark:bg-slate-800/50 dark:text-slate-400">
          You can change your preferences and automation settings anytime from this page.
        </p>
      )}
    </div>
  )
}
