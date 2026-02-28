'use client'

import { useState } from 'react'

type GoogleConsentFormProps = {
  showConsentError: boolean
  signInAction: (formData: FormData) => void | Promise<void>
}

export function GoogleConsentForm({
  showConsentError,
  signInAction,
}: GoogleConsentFormProps) {
  const [consentChecked, setConsentChecked] = useState(false)

  return (
    <form className="space-y-5 rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur-sm">
      <div className="rounded-md border border-slate-200 bg-slate-50 p-3 text-xs text-slate-600">
        By connecting Google, you consent to allowing Internship Finder to
        request permission to send outreach emails from your Gmail account on
        your behalf.
      </div>

      <label className="flex items-start gap-2 rounded-md border border-slate-200 bg-white p-3 text-xs text-slate-600">
        <input
          type="checkbox"
          name="gmail_consent"
          required
          checked={consentChecked}
          onChange={(event) => setConsentChecked(event.target.checked)}
          className="mt-0.5 h-4 w-4 rounded border-slate-300 text-accent focus:ring-accent"
        />
        <span>I consent to Gmail OAuth access for sending emails from the app.</span>
      </label>
      {showConsentError ? (
        <p className="text-xs font-medium text-red-600">
          Please confirm Gmail consent before continuing with Google.
        </p>
      ) : null}

      <button
        type="submit"
        formAction={signInAction}
        disabled={!consentChecked}
        className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-white"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
          <path
            fill="#4285F4"
            d="M23.49 12.27c0-.79-.07-1.54-.2-2.27H12v4.51h6.44a5.5 5.5 0 0 1-2.39 3.61v3h3.87c2.26-2.08 3.57-5.15 3.57-8.85z"
          />
          <path
            fill="#34A853"
            d="M12 24c3.24 0 5.96-1.07 7.95-2.9l-3.87-3c-1.07.72-2.44 1.15-4.08 1.15-3.13 0-5.78-2.11-6.73-4.95H1.27v3.09A12 12 0 0 0 12 24z"
          />
          <path
            fill="#FBBC05"
            d="M5.27 14.3a7.2 7.2 0 0 1 0-4.6V6.61H1.27a12 12 0 0 0 0 10.78l4-3.09z"
          />
          <path
            fill="#EA4335"
            d="M12 4.75c1.76 0 3.35.61 4.6 1.8l3.44-3.44C17.95 1.2 15.24 0 12 0A12 12 0 0 0 1.27 6.61l4 3.09c.95-2.84 3.6-4.95 6.73-4.95z"
          />
        </svg>
        Continue with Google
      </button>
    </form>
  )
}
