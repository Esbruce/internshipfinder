'use client'

import { useState } from 'react'
import { OutreachChart } from './components/OutreachChart'
import { OutreachCompaniesList } from './components/OutreachCompaniesList'
import { MOCK_TEMPLATES, type EmailTemplate } from './components/email-templates'

export default function DashboardPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | null>(MOCK_TEMPLATES[0])
  const [editedSubject, setEditedSubject] = useState(selectedTemplate?.subject ?? '')
  const [editedBody, setEditedBody] = useState(selectedTemplate?.body ?? '')

  const handleSelectTemplate = (t: EmailTemplate) => {
    setSelectedTemplate(t)
    setEditedSubject(t.subject)
    setEditedBody(t.body)
  }

  const totalOutreach = 106

  return (
    <div className="grid h-full grid-cols-2 grid-rows-2 gap-4">
      {/* Top-left: Outreach chart */}
      <div className="min-h-0">
        <OutreachChart />
      </div>

      {/* Top-right: Total outreach */}
      <div className="flex min-h-0 flex-col items-center justify-center rounded-2xl border border-slate-300 bg-white p-8 text-center shadow-sm dark:border-slate-600 dark:bg-slate-800">
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-600 dark:text-slate-400">
          Total outreach
        </p>
        <p className="text-[clamp(6rem,15vw,12rem)] font-black leading-none tracking-tighter text-slate-900 dark:text-white">
          {totalOutreach}
        </p>
        <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">people outreached</p>
      </div>

      {/* Bottom-left: Companies outreached to */}
      <div className="flex min-h-0 flex-col overflow-hidden rounded-2xl border border-slate-300 bg-white shadow-sm dark:border-slate-600 dark:bg-slate-800">
        <div className="shrink-0 border-b border-slate-300 px-6 py-4 dark:border-slate-600">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-800 dark:text-slate-200">
            Companies outreached to
          </h2>
          <p className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">
            Companies you've contacted.
          </p>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto p-5">
          <OutreachCompaniesList />
        </div>
      </div>

      {/* Bottom-right: Edit template */}
      <div className="flex min-h-0 flex-col overflow-hidden rounded-2xl border border-slate-300 bg-white shadow-sm dark:border-slate-600 dark:bg-slate-800">
        <div className="shrink-0 border-b border-slate-300 px-6 py-4 dark:border-slate-600">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-800 dark:text-slate-200">
            Edit template
          </h3>
          {selectedTemplate && (
            <div className="mt-2 flex flex-wrap gap-2">
              {MOCK_TEMPLATES.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => handleSelectTemplate(t)}
                  className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-all duration-200 ${
                    selectedTemplate?.id === t.id
                      ? 'border-sky-400 bg-sky-50 text-sky-800 dark:border-sky-500 dark:bg-sky-900/30 dark:text-sky-200'
                      : 'border-slate-300 bg-slate-50 text-slate-700 hover:border-slate-400 hover:bg-slate-100 dark:border-slate-600 dark:bg-slate-800/80 dark:text-slate-300 dark:hover:border-slate-500 dark:hover:bg-slate-700/80'
                  }`}
                >
                  {t.name}
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-auto p-6">
          {selectedTemplate ? (
            <>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-700 dark:text-slate-300">
                  Subject
                </label>
                <input
                  type="text"
                  value={editedSubject}
                  onChange={(e) => setEditedSubject(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder-slate-500 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/25 dark:border-slate-500 dark:bg-slate-900 dark:text-slate-100 dark:placeholder-slate-500"
                  placeholder="Email subject"
                />
              </div>
              <div className="flex min-h-0 flex-1 flex-col">
                <label className="mb-1.5 block text-xs font-medium text-slate-700 dark:text-slate-300">
                  Body
                </label>
                <textarea
                  value={editedBody}
                  onChange={(e) => setEditedBody(e.target.value)}
                  className="w-full min-h-0 flex-1 resize-none rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm leading-relaxed text-slate-900 placeholder-slate-500 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/25 dark:border-slate-500 dark:bg-slate-900 dark:text-slate-100 dark:placeholder-slate-500"
                  placeholder="Email body..."
                />
                <p className="mt-2 text-xs text-slate-600 dark:text-slate-400">
                  Placeholders: {'{{company}}'}, {'{{recruiter_name}}'}, {'{{your_name}}'}
                </p>
              </div>
              <div className="flex shrink-0 justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setEditedSubject(selectedTemplate.subject)
                    setEditedBody(selectedTemplate.body)
                  }}
                  className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-800 transition hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
                >
                  Reset
                </button>
                <button
                  type="button"
                  className="rounded-lg bg-sky-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-sky-700 dark:bg-sky-500 dark:hover:bg-sky-600"
                >
                  Save changes
                </button>
              </div>
            </>
          ) : (
            <div className="flex flex-1 flex-col items-center justify-center py-12 text-center">
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Select a template to edit
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
