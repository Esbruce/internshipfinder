'use client'

import { useState, useRef } from 'react'
import { FormField, FormTextarea } from './FormField'

export type InternshipPreferencesData = {
  cvUrl: string | null
  cvFileName: string | null
  location: string
  industry: string
  idealInternshipDescription: string
}

const INDUSTRY_OPTIONS = [
  '',
  'Technology / Software',
  'Finance / Banking',
  'Healthcare',
  'Consulting',
  'Marketing / Media',
  'Engineering / Manufacturing',
  'Non-profit / Government',
  'Retail / E-commerce',
  'Other',
]

export function InternshipPreferencesSection({
  data,
  onChange,
  onCvUpload,
  onCvRemove,
  getCvDownloadUrl,
  loading,
}: {
  data: InternshipPreferencesData
  onChange: (data: InternshipPreferencesData) => void
  onCvUpload: (file: File) => Promise<string | null>
  onCvRemove?: (path: string) => Promise<void>
  getCvDownloadUrl?: (path: string) => Promise<string | null>
  loading?: boolean
}) {
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [downloading, setDownloading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const allowedMimeTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ]
  const fiveMB = 5 * 1024 * 1024

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > fiveMB) {
      setUploadError('File must be 5 MB or smaller.')
      return
    }
    if (!allowedMimeTypes.includes(file.type)) {
      setUploadError('Please upload a PDF or Word document.')
      return
    }
    setUploadError(null)
    setUploading(true)
    try {
      const path = await onCvUpload(file)
      if (path) onChange({ ...data, cvUrl: path, cvFileName: file.name })
    } catch {
      setUploadError('Upload failed. Try again.')
    } finally {
      setUploading(false)
      e.target.value = ''
    }
  }

  async function handleDownload() {
    if (!data.cvUrl || !getCvDownloadUrl) return
    setDownloading(true)
    try {
      const url = await getCvDownloadUrl(data.cvUrl)
      if (url) window.open(url, '_blank', 'noopener,noreferrer')
    } finally {
      setDownloading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Internship preferences</h2>
        <p className="mt-2 text-base text-slate-700 dark:text-slate-400">
          Tell us what you're looking for and upload your CV for applications.
        </p>
      </div>

      <div className="space-y-2.5">
        <label className="block text-base font-medium text-slate-800 dark:text-slate-300">CV / Resume</label>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:flex-wrap">
          <input
            ref={inputRef}
            type="file"
            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            onChange={handleFileChange}
            disabled={loading || uploading}
            className="block w-full text-base text-slate-600 file:mr-4 file:rounded-lg file:border-0 file:bg-sky-100 file:px-4 file:py-2.5 file:text-base file:font-medium file:text-sky-800 dark:file:bg-sky-900/30 dark:file:text-sky-300"
          />
          {data.cvFileName && (
            <span className="flex items-center gap-2 text-base text-slate-700 dark:text-slate-400">
              <span>Current: {data.cvFileName}</span>
              {getCvDownloadUrl && (
                <button
                  type="button"
                  onClick={handleDownload}
                  disabled={downloading || loading}
                  className="text-sky-700 hover:text-sky-800 dark:text-sky-400 dark:hover:text-sky-300 disabled:opacity-70"
                >
                  {downloading ? 'Opening…' : 'Download'}
                </button>
              )}
              {onCvRemove && (
                <button
                  type="button"
                  onClick={async () => {
                    if (data.cvUrl) {
                      await onCvRemove(data.cvUrl)
                      onChange({ ...data, cvUrl: null, cvFileName: null })
                      if (inputRef.current) inputRef.current.value = ''
                    }
                  }}
                  disabled={loading}
                  className="text-rose-600 hover:text-rose-700 dark:text-rose-400 dark:hover:text-rose-300 disabled:opacity-70"
                >
                  Remove
                </button>
              )}
            </span>
          )}
        </div>
        {uploading && <p className="text-base text-slate-600">Uploading…</p>}
        {uploadError && <p className="text-base text-rose-600">{uploadError}</p>}
        <p className="text-sm text-slate-600">PDF or Word, max 5 MB</p>
      </div>

      <FormField
        id="pref-location"
        label="Preferred location"
        value={data.location}
        onChange={(e) => onChange({ ...data, location: e.target.value })}
        placeholder="e.g. London, Remote, UK"
        disabled={loading}
        className="space-y-2.5"
      />

      <div className="space-y-2.5">
        <label htmlFor="pref-industry" className="block text-base font-medium text-slate-800 dark:text-slate-300">
          Industry
        </label>
        <select
          id="pref-industry"
          value={data.industry}
          onChange={(e) => onChange({ ...data, industry: e.target.value })}
          disabled={loading}
          className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
        >
          {INDUSTRY_OPTIONS.map((opt) => (
            <option key={opt || 'empty'} value={opt}>
              {opt || 'Select industry…'}
            </option>
          ))}
        </select>
      </div>

      <FormTextarea
        id="pref-description"
        label="Description of your ideal internship"
        value={data.idealInternshipDescription}
        onChange={(e) => onChange({ ...data, idealInternshipDescription: e.target.value })}
        placeholder="e.g. Product or engineering role at a startup, with mentorship and flexible hours…"
        rows={5}
        className="space-y-2.5"
      />
    </div>
  )
}
