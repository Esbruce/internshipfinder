'use client'

import { Dispatch, FormEvent, SetStateAction } from 'react'
import { AgentFormData, CompensationType, WorkType } from '@/app/components/agents/types'

type AgentFormSectionProps = {
  formData: AgentFormData
  setFormData: Dispatch<SetStateAction<AgentFormData>>
  setCvFile: Dispatch<SetStateAction<File | null>>
  handleSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>
  submitting: boolean
  errorMessage: string | null
}

export default function AgentFormSection({
  formData,
  setFormData,
  setCvFile,
  handleSubmit,
  submitting,
  errorMessage,
}: AgentFormSectionProps) {
  return (
    <section className="rounded-2xl w-full border border-slate-300 bg-white p-6 dark:border-slate-600 dark:bg-slate-800">
      <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Set up New Intern Agents</h2>
      <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
        Submit this form to store a new intern agents record in Supabase.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-200">Intern Agents Name</span>
          <input
            required
            type="text"
            value={formData.name}
            onChange={(event) => setFormData((prev) => ({ ...prev, name: event.target.value }))}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-accent placeholder:text-slate-400 focus:ring-2 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100"
            placeholder="e.g. Kim K"
          />
        </label>

        <label className="block">
          <span className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-200">CV Upload</span>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(event) => setCvFile(event.target.files?.[0] ?? null)}
            className="block w-full cursor-pointer rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 file:mr-3 file:rounded-md file:border-0 file:bg-accent file:px-3 file:py-2 file:text-sm file:font-medium file:text-accent-foreground hover:file:bg-accent/90 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-200 dark:file:bg-slate-100 dark:file:text-slate-900 dark:hover:file:bg-slate-200"
          />
        </label>

        <label className="block">
          <span className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-200">
            Ideal Internship Description
          </span>
          <textarea
            rows={4}
            value={formData.idealInternshipDescription}
            onChange={(event) =>
              setFormData((prev) => ({ ...prev, idealInternshipDescription: event.target.value }))
            }
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-accent placeholder:text-slate-400 focus:ring-2 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100"
            placeholder="Describe your ideal internship..."
          />
        </label>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-200">Industry</span>
            <input
              type="text"
              value={formData.industry}
              onChange={(event) => setFormData((prev) => ({ ...prev, industry: event.target.value }))}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-accent placeholder:text-slate-400 focus:ring-2 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100"
              placeholder="e.g. Engineering, Data Science"
            />
          </label>

          <label className="block">
            <span className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-200">Location</span>
            <input
              type="text"
              value={formData.location}
              onChange={(event) => setFormData((prev) => ({ ...prev, location: event.target.value }))}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-accent placeholder:text-slate-400 focus:ring-2 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100"
              placeholder="e.g. Berlin, EU, Greater Bay Area"
            />
          </label>
        </div>

        <div>
          <p className="mb-2 text-sm font-medium text-slate-700 dark:text-slate-200">Type</p>
          <div className="flex flex-wrap gap-2">
            {[
              { label: 'On-site', value: 'on_site' },
              { label: 'Remote', value: 'remote' },
              { label: 'Hybrid', value: 'hybrid' },
            ].map((item) => (
              <button
                key={item.value}
                type="button"
                onClick={() => setFormData((prev) => ({ ...prev, workType: item.value as WorkType }))}
                className={`rounded-full border px-3 py-1.5 text-sm ${
                  formData.workType === item.value
                    ? 'border-accent bg-accent-soft text-accent dark:bg-accent/30 dark:text-accent-soft'
                    : 'border-slate-300 text-slate-700 dark:border-slate-600 dark:text-slate-200'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-2 text-sm font-medium text-slate-700 dark:text-slate-200">Compensation Type</p>
          <div className="flex flex-wrap gap-2">
            {[
              { label: 'Paid', value: 'paid' },
              { label: 'Unpaid', value: 'unpaid' },
            ].map((item) => (
              <button
                key={item.value}
                type="button"
                onClick={() => setFormData((prev) => ({ ...prev, compensationType: item.value as CompensationType }))}
                className={`rounded-full border px-3 py-1.5 text-sm ${
                  formData.compensationType === item.value
                    ? 'border-accent bg-accent-soft text-accent dark:bg-accent/30 dark:text-accent-soft'
                    : 'border-slate-300 text-slate-700 dark:border-slate-600 dark:text-slate-200'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <label className="flex items-center justify-between rounded-lg border border-slate-300 px-3 py-2 dark:border-slate-600">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Auto Outreach</span>
          <input
            type="checkbox"
            checked={formData.autoOutreachEnabled}
            onChange={(event) => setFormData((prev) => ({ ...prev, autoOutreachEnabled: event.target.checked }))}
            className="h-4 w-4 rounded border-slate-300 text-accent focus:ring-accent"
          />
        </label>

        {errorMessage ? (
          <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-900 dark:bg-red-900/20 dark:text-red-200">
            {errorMessage}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={submitting || formData.name.trim().length === 0}
          className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800 disabled:opacity-50 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200"
        >
          {submitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </section>
  )
}
