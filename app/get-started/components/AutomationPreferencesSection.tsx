'use client'

import { FormField } from './FormField'

export type AutomationPreferencesData = {
  searchFrequency: 'hourly' | 'daily' | 'weekly'
  emailDigest: boolean
  autoApplyEnabled: boolean
  maxApplicationsPerDay: number
  notifyNewMatches: boolean
}

const FREQUENCY_OPTIONS: { value: AutomationPreferencesData['searchFrequency']; label: string }[] = [
  { value: 'hourly', label: 'Hourly' },
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
]

export function AutomationPreferencesSection({
  data,
  onChange,
  loading,
}: {
  data: AutomationPreferencesData
  onChange: (data: AutomationPreferencesData) => void
  loading?: boolean
}) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Automation preferences</h2>
        <p className="mt-2 text-base text-slate-700 dark:text-slate-400">
          Control how often we search for roles and whether to auto-apply or send digests.
        </p>
      </div>

      <div className="space-y-2.5">
        <label className="block text-base font-medium text-slate-800 dark:text-slate-300">
          Search frequency
        </label>
      </div>


      <div className="space-y-5">
        <label className="flex cursor-pointer items-center gap-3">
          <input
            type="checkbox"
            checked={data.emailDigest}
            onChange={(e) => onChange({ ...data, emailDigest: e.target.checked })}
            disabled={loading}
            className="h-5 w-5 rounded border-slate-400 text-sky-600 focus:ring-sky-500"
          />
          <span className="text-base font-medium text-slate-800 dark:text-slate-300">Email digest</span>
        </label>
        <p className="text-sm text-slate-600">Receive a summary of new matches by email</p>
      </div>

      <div className="space-y-5">
        <label className="flex cursor-pointer items-center gap-3">
          <input
            type="checkbox"
            checked={data.autoApplyEnabled}
            onChange={(e) => onChange({ ...data, autoApplyEnabled: e.target.checked })}
            disabled={loading}
            className="h-5 w-5 rounded border-slate-400 text-sky-600 focus:ring-sky-500"
          />
          <span className="text-base font-medium text-slate-800 dark:text-slate-300">Auto-apply</span>
        </label>
        <p className="text-sm text-slate-600">Automatically apply to matches that fit your preferences (up to max per day)</p>
      </div>

      <div className="space-y-5">
        <label className="flex cursor-pointer items-center gap-3">
          <input
            type="checkbox"
            checked={data.notifyNewMatches}
            onChange={(e) => onChange({ ...data, notifyNewMatches: e.target.checked })}
            disabled={loading}
            className="h-5 w-5 rounded border-slate-400 text-sky-600 focus:ring-sky-500"
          />
          <span className="text-base font-medium text-slate-800 dark:text-slate-300">Notify on new matches</span>
        </label>
        <p className="text-sm text-slate-600">Get notified when new internships match your preferences</p>
      </div>
    </div>
  )
}
