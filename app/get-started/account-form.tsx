'use client'

import { useCallback, useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { type User } from '@supabase/supabase-js'
import { StepIndicator, steps } from './components/StepIndicator'
import { AccountInfoSection, type AccountInfoData } from './components/AccountInfoSection'
import {
  InternshipPreferencesSection,
  type InternshipPreferencesData,
} from './components/InternshipPreferencesSection'
import {
  AutomationPreferencesSection,
  type AutomationPreferencesData,
} from './components/AutomationPreferencesSection'
import { HowAgentWorksSection } from './components/HowAgentWorksSection'
import Link from 'next/link'

const defaultAccountInfo = (user: User | null): AccountInfoData => ({
  email: user?.email ?? '',
  fullName: '',
  username: '',
  website: '',
})

const defaultInternshipPrefs: InternshipPreferencesData = {
  cvUrl: null,
  cvFileName: null,
  location: '',
  industry: '',
  idealInternshipDescription: '',
}

const defaultAutomationPrefs: AutomationPreferencesData = {
  searchFrequency: 'daily',
  emailDigest: true,
  autoApplyEnabled: false,
  maxApplicationsPerDay: 5,
  notifyNewMatches: true,
}

export default function AccountForm({ user }: { user: User | null }) {
  const supabase = createClient()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [accountInfo, setAccountInfo] = useState<AccountInfoData>(() => defaultAccountInfo(user))
  const [internshipPrefs, setInternshipPrefs] = useState<InternshipPreferencesData>(defaultInternshipPrefs)
  const [automationPrefs, setAutomationPrefs] = useState<AutomationPreferencesData>(defaultAutomationPrefs)

  const loadAll = useCallback(async () => {
    if (!user?.id) {
      setLoading(false)
      return
    }
    try {
      setLoading(true)
      const [profileRes, internshipRes, automationRes] = await Promise.all([
        supabase.from('profiles').select('full_name, username, website').eq('id', user.id).single(),
        supabase.from('internship_preferences').select('*').eq('user_id', user.id).single(),
        supabase.from('automation_preferences').select('*').eq('user_id', user.id).single(),
      ])

      if (profileRes.data) {
        setAccountInfo({
          email: user.email ?? '',
          fullName: profileRes.data.full_name ?? '',
          username: profileRes.data.username ?? '',
          website: profileRes.data.website ?? '',
        })
      } else {
        setAccountInfo(defaultAccountInfo(user))
      }

      if (internshipRes.data) {
        const d = internshipRes.data
        setInternshipPrefs({
          cvUrl: d.cv_url,
          cvFileName: d.cv_url ? d.cv_url.split('/').pop() ?? null : null,
          location: d.location ?? '',
          industry: d.industry ?? '',
          idealInternshipDescription: d.ideal_internship_description ?? '',
        })
      }

      if (automationRes.data) {
        const d = automationRes.data
        setAutomationPrefs({
          searchFrequency: (d.search_frequency as AutomationPreferencesData['searchFrequency']) ?? 'daily',
          emailDigest: d.email_digest ?? true,
          autoApplyEnabled: d.auto_apply_enabled ?? false,
          maxApplicationsPerDay: d.max_applications_per_day ?? 5,
          notifyNewMatches: d.notify_new_matches ?? true,
        })
      }
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }, [user, supabase])

  useEffect(() => {
    loadAll()
  }, [loadAll])

  async function saveAccountInfo() {
    if (!user?.id) return
    setSaving(true)
    try {
      const { error } = await supabase.from('profiles').upsert({
        id: user.id,
        full_name: accountInfo.fullName,
        username: accountInfo.username,
        website: accountInfo.website,
        updated_at: new Date().toISOString(),
      })
      if (error) throw error
    } catch (e) {
      console.error(e)
      alert('Failed to save account info.')
    } finally {
      setSaving(false)
    }
  }

  async function saveInternshipPrefs() {
    if (!user?.id) return
    setSaving(true)
    try {
      const { error } = await supabase.from('internship_preferences').upsert(
        {
          user_id: user.id,
          cv_url: internshipPrefs.cvUrl,
          location: internshipPrefs.location || null,
          industry: internshipPrefs.industry || null,
          ideal_internship_description: internshipPrefs.idealInternshipDescription || null,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'user_id' }
      )
      if (error) throw error
    } catch (e) {
      console.error(e)
      alert('Failed to save internship preferences.')
    } finally {
      setSaving(false)
    }
  }

  async function saveAutomationPrefs() {
    if (!user?.id) return
    setSaving(true)
    try {
      const { error } = await supabase.from('automation_preferences').upsert(
        {
          user_id: user.id,
          search_frequency: automationPrefs.searchFrequency,
          email_digest: automationPrefs.emailDigest,
          auto_apply_enabled: automationPrefs.autoApplyEnabled,
          max_applications_per_day: automationPrefs.maxApplicationsPerDay,
          notify_new_matches: automationPrefs.notifyNewMatches,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'user_id' }
      )
      if (error) throw error
    } catch (e) {
      console.error(e)
      alert('Failed to save automation preferences.')
    } finally {
      setSaving(false)
    }
  }

  async function handleCvUpload(file: File): Promise<string | null> {
    if (!user?.id) return null
    const ext = file.name.split('.').pop() ?? 'pdf'
    const path = `${user.id}/cv-${Date.now()}.${ext}`
    const { error } = await supabase.storage.from('cv-uploads').upload(path, file, {
      upsert: true,
    })
    if (error) throw error
    return path
  }

  async function getCvDownloadUrl(path: string): Promise<string | null> {
    const { data, error } = await supabase.storage
      .from('cv-uploads')
      .createSignedUrl(path, 60)
    if (error) return null
    return data.signedUrl
  }

  async function handleCvRemove(path: string): Promise<void> {
    await supabase.storage.from('cv-uploads').remove([path])
    if (!user?.id) return
    setInternshipPrefs((prev) => ({ ...prev, cvUrl: null, cvFileName: null }))
    await supabase
      .from('internship_preferences')
      .upsert(
        {
          user_id: user.id,
          cv_url: null,
          location: internshipPrefs.location || null,
          industry: internshipPrefs.industry || null,
          ideal_internship_description: internshipPrefs.idealInternshipDescription || null,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'user_id' }
      )
  }

  async function handleStepSave() {
    if (currentStep === 0) await saveAccountInfo()
    else if (currentStep === 1) await saveInternshipPrefs()
    else if (currentStep === 2) await saveAutomationPrefs()
    // step 3 is "How the agent works" — nothing to save
  }

  function goNext() {
    if (currentStep < steps.length - 1) {
      handleStepSave().then(() => setCurrentStep((s) => s + 1))
    } else {
      handleStepSave().then(() => {
        window.location.href = '/dashboard'
      })
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-slate-100 via-slate-50 to-slate-200 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800">
        <div className="flex min-h-[60vh] items-center justify-center">
          <p className="text-slate-600 dark:text-slate-500">Loading…</p>
        </div>
      </main>
    )
  }

  return (
    <main className="relative overflow-hidden flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-slate-100 via-slate-50 to-slate-200 text-slate-900 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 dark:text-slate-100">
      <div
        className="pointer-events-none absolute -left-32 -top-32 h-64 w-64 rounded-full bg-gradient-to-br from-sky-200/40 to-indigo-300/30 blur-3xl dark:from-sky-900/20 dark:to-indigo-900/20"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-32 -top-32 h-64 w-64 rounded-full bg-gradient-to-bl from-indigo-200/40 to-sky-300/30 blur-3xl dark:from-indigo-900/20 dark:to-sky-900/20"
        aria-hidden
      />

      <div className="relative mx-auto w-[75vw] min-w-[280px] max-w-6xl px- py-10 sm:px-6">

        <div className="flex min-h-[75vh] flex-col overflow-hidden rounded-2xl border border-slate-300 bg-white shadow-lg dark:border-slate-700 dark:bg-slate-800/90">
          <div className="shrink-0 p-8 sm:p-10">
            <StepIndicator currentStep={currentStep} onStepClick={setCurrentStep} />
          </div>

          <div className="flex-1 min-h-0 overflow-y-auto px-8 pb-8 sm:px-10 sm:pb-10">
            {currentStep === 0 && (
              <AccountInfoSection
                data={accountInfo}
                onChange={setAccountInfo}
                loading={saving}
              />
            )}
            {currentStep === 1 && (
              <InternshipPreferencesSection
                data={internshipPrefs}
                onChange={setInternshipPrefs}
                onCvUpload={handleCvUpload}
                getCvDownloadUrl={getCvDownloadUrl}
                onCvRemove={handleCvRemove}
                loading={saving}
              />
            )}
            {currentStep === 2 && (
              <AutomationPreferencesSection
                data={automationPrefs}
                onChange={setAutomationPrefs}
                loading={saving}
              />
            )}
            {currentStep === 3 && (
              <HowAgentWorksSection
                automationPrefs={automationPrefs}
                internshipPrefs={internshipPrefs}
              />
            )}
          </div>

          <div className="shrink-0 border-t border-slate-300 px-8 py-6 dark:border-slate-700 sm:px-10">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                {currentStep > 0 ? (
                <button
                  type="button"
                  onClick={() => setCurrentStep((s) => s - 1)}
                  className="rounded-full border border-slate-300 bg-white px-5 py-2.5 text-base font-medium text-slate-800 shadow-sm transition hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                >
                  Back
                </button>
              ) : (
                <form action="/auth/signout" method="post">
                  <button
                    type="submit"
                    className="rounded-full border border-slate-300 bg-white px-5 py-2.5 text-base font-medium text-slate-800 shadow-sm transition hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                  >
                    Sign out
                  </button>
                </form>
              )}
              </div>
              <button
              type="button"
              onClick={goNext}
              disabled={saving}
              className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-2.5 text-base font-medium text-white shadow-sm transition hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 disabled:opacity-70 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200"
            >
              {saving ? 'Saving…' : currentStep < steps.length - 1 ? 'Save & continue' : 'Create agent'}
            </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
