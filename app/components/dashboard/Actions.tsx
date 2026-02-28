'use client'

import { useEffect, useMemo, useState } from 'react'
import { Prospect } from '@/app/components/dashboard/types'

type ActionsProps = {
  loadingProspects: boolean
  prospects: Prospect[]
}

function buildMailtoLink(prospect: Prospect) {
  const rawContact = (prospect.company_contact ?? '').trim()
  const hasEmail = rawContact.includes('@')
  if (!hasEmail) return null

  const subject = encodeURIComponent(`Internship Opportunity - ${prospect.company_name}`)
  const body = encodeURIComponent(
    prospect.outreach_email?.trim() || 'Hi team,\n\nI would love to connect regarding internship opportunities.'
  )
  return `mailto:${rawContact}?subject=${subject}&body=${body}`
}

export default function Actions({ loadingProspects, prospects }: ActionsProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex > prospects.length - 1) {
      setCurrentIndex(0)
    }
  }, [currentIndex, prospects.length])

  const currentProspect = prospects[currentIndex]
  const totalProspects = prospects.length
  const mailtoLink = useMemo(
    () => (currentProspect ? buildMailtoLink(currentProspect) : null),
    [currentProspect]
  )

  const showPrevious = () => {
    if (totalProspects === 0) return
    setCurrentIndex((prev) => (prev - 1 + totalProspects) % totalProspects)
  }

  const showNext = () => {
    if (totalProspects === 0) return
    setCurrentIndex((prev) => (prev + 1) % totalProspects)
  }

  return (
    <section className="rounded-2xl w-full h-full border border-slate-300 bg-white backdrop-blur-2xl p-10 dark:border-slate-600 dark:bg-slate-800">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-3xl text-center font-semibold text-slate-900 dark:text-white">Quick Actions</h2>
        {!loadingProspects && totalProspects > 0 ? (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={showPrevious}
              aria-label="Previous prospect"
              className="h-9 w-9 shrink-0 rounded-full border border-slate-300 text-base text-slate-700 transition hover:border-accent hover:text-accent dark:border-slate-600 dark:text-slate-200"
            >
              ←
            </button>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {currentIndex + 1} / {totalProspects}
            </span>
            <button
              type="button"
              onClick={showNext}
              aria-label="Next prospect"
              className="h-9 w-9 shrink-0 rounded-full border border-slate-300 text-base text-slate-700 transition hover:border-accent hover:text-accent dark:border-slate-600 dark:text-slate-200"
            >
              →
            </button>
          </div>
        ) : null}
      </div>

      {loadingProspects ? (
        <p className="text-sm text-slate-600 dark:text-slate-300">Preparing quick outreach actions...</p>
      ) : totalProspects === 0 ? (
        <p className="rounded-xl border border-dashed border-slate-300 px-4 py-6 text-sm text-slate-600 dark:border-slate-600 dark:text-slate-300">
          Add prospects first, then suggested outreach emails will appear here.
        </p>
      ) : (
        <div className="h-[calc(100%-2.5rem)] flex flex-col justify-between py-1">
          <div className="flex items-center">
            <div className="min-h-[190px] w-full rounded-xl border border-slate-300 bg-slate-50 p-5 dark:border-slate-600 dark:bg-slate-900/50">
              <p className="text-sm text-slate-500 dark:text-slate-400">Prospect</p>
              <h3 className="mt-1 text-lg font-semibold text-accent">{currentProspect.company_name}</h3>

              <p className="mt-4 text-sm font-medium text-slate-700 dark:text-slate-200">Suggested Email</p>
              <p className="mt-2 max-h-36 overflow-y-auto whitespace-pre-wrap text-sm text-slate-700 dark:text-slate-200">
                {currentProspect.outreach_email?.trim() || 'No suggested email yet for this prospect.'}
              </p>
            </div>
          </div>

          <div className="flex justify-center pt-1">
            {mailtoLink ? (
              <a
                href={mailtoLink}
                className="rounded-lg bg-accent px-5 py-2 text-sm font-medium text-accent-foreground transition hover:bg-accent/90 focus:outline-none focus:ring-2 focus:ring-accent-soft dark:focus:ring-accent-muted/50"
              >
                Send Email
              </a>
            ) : (
              <button
                type="button"
                disabled
                className="cursor-not-allowed rounded-lg bg-slate-300 px-5 py-2 text-sm font-medium text-slate-600 dark:bg-slate-700 dark:text-slate-300"
              >
                Send Email
              </button>
            )}
          </div>
        </div>
      )}
    </section>
  )
}
