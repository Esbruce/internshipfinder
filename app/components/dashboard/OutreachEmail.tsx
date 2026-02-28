'use client'

import { useEffect, useRef, useState } from 'react'

type OutreachEmailProps = {
  prospectId: string
  outreachEmail: string | null
}

type SaveStatus = 'idle' | 'saving' | 'saved' | 'error'

export default function OutreachEmail({ prospectId, outreachEmail }: OutreachEmailProps) {
  const [emailDraft, setEmailDraft] = useState(outreachEmail ?? '')
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const latestSavedEmailRef = useRef(outreachEmail ?? '')

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (emailDraft === latestSavedEmailRef.current) return

      setSaveStatus('saving')
      setErrorMessage(null)

      const valueToSave = /^\s*$/.test(emailDraft) ? null : emailDraft
      const response = await fetch(`/api/prospects/${prospectId}/outreach-email`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ outreachEmail: valueToSave }),
      })

      if (!response.ok) {
        let message = 'Failed to save'
        try {
          const errorResponse = (await response.json()) as { error?: string }
          message = errorResponse.error ?? message
        } catch {
          // Keep default message if body is not JSON.
        }
        setSaveStatus('error')
        setErrorMessage(message)
        return
      }

      latestSavedEmailRef.current = emailDraft
      setSaveStatus('saved')
    }, 700)

    return () => clearTimeout(timeoutId)
  }, [emailDraft, prospectId])

  return (
    <section className="mx-auto mt-6 max-w-4xl rounded-2xl border border-slate-300 bg-white p-6 dark:border-slate-600 dark:bg-slate-800">
      <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Suggested Email</h2>

      <textarea
        value={emailDraft}
        onChange={(event) => setEmailDraft(event.target.value)}
        placeholder="No outreach email generated yet."
        className="mt-4 min-h-56 w-full rounded-xl border border-slate-300 bg-slate-50 p-4 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-accent focus:ring-2 focus:ring-accent-soft dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-accent dark:focus:ring-accent-muted/40"
      />

      <div className="mt-4 flex items-center justify-between gap-4">
        <p className="text-sm text-slate-600 dark:text-slate-300">
          {saveStatus === 'error' && (errorMessage ?? 'Failed to save')}
        </p>

        <button
          type="button"
          className="rounded-lg bg-accent px-5 py-2 text-sm font-medium text-accent-foreground transition hover:bg-accent/90 focus:outline-none focus:ring-2 focus:ring-accent-soft dark:focus:ring-accent-muted/50"
        >
            Send to Company
        </button>
      </div>
    </section>
  )
}
