'use client'

import { FormEvent, useCallback, useEffect, useMemo, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import Seperator from '@/app/components/seperator'
import AgentsListSection from '@/app/components/agents/AgentsListSection'
import AgentFormSection from '@/app/components/agents/AgentFormSection'
import { Agent, AgentFormData } from '@/app/components/agents/types'



const defaultFormData: AgentFormData = {
  name: '',
  idealInternshipDescription: '',
  industry: '',
  location: '',
  workType: null,
  compensationType: null,
  autoOutreachEnabled: false,
}


export default function AgentsPage() {
  const supabase = useMemo(() => createClient(), [])

  const [agents, setAgents] = useState<Agent[]>([])
  const [loadingAgents, setLoadingAgents] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [cvFile, setCvFile] = useState<File | null>(null)
  const [formData, setFormData] = useState<AgentFormData>(defaultFormData)

  type AgentRow = {
    id: number
    created_at: string
    industry: string | null
    location: string | null
    agent_name: string
    cv: string | null
    ideal_internship: string | null
    type: Agent['work_type']
    compensation: Agent['compensation_type']
    auto_outreach: boolean
  }

  const fetchAgents = useCallback(async () => {
    setLoadingAgents(true)
    setErrorMessage(null)

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()
    if (authError || !user) {
      setErrorMessage('Please sign in to view and create intern agents.')
      setLoadingAgents(false)
      return
    }

    const { data, error } = await supabase
      .from('agents')
      .select(
        'id, created_at, industry, location, agent_name, cv, ideal_internship, type, compensation, auto_outreach'
      )
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (error) {
      setErrorMessage(error.message)
      setLoadingAgents(false)
      return
    }

    const normalizedAgents = ((data ?? []) as AgentRow[]).map((agent) => ({
      id: String(agent.id),
      name: agent.agent_name,
      cv_url: agent.cv,
      ideal_internship_description: agent.ideal_internship,
      industry: agent.industry,
      location: agent.location,
      work_type: agent.type,
      compensation_type: agent.compensation,      auto_outreach_enabled: agent.auto_outreach,
      created_at: agent.created_at,
    }))

    setAgents(normalizedAgents)
    setLoadingAgents(false)
  }, [supabase])

  useEffect(() => {
    fetchAgents()
  }, [fetchAgents])

  async function uploadCv(userId: string, file: File) {
    const extension = file.name.split('.').pop() ?? 'pdf'
    const path = `${userId}/-${Date.now()}.${extension}`

    const { error } = await supabase.storage.from('cv-uploads').upload(path, file, {
      upsert: true,
    })
    if (error) throw error
    return path
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitting(true)
    setErrorMessage(null)

    try {
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser()
      if (authError || !user) {
        throw new Error('Please sign in to create intern agents.')
      }

      let cvPath: string | null = null
      if (cvFile) {
        cvPath = await uploadCv(user.id, cvFile)
      }

      const { error: insertError } = await supabase.from('agents').insert({
        user_id: user.id,
        agent_name: formData.name.trim(),
        cv: cvPath,
        ideal_internship: formData.idealInternshipDescription.trim() || null,
        industry: formData.industry.trim() || null,
        location: formData.location.trim() || null,
        type: formData.workType,
        compensation: formData.compensationType,
        auto_outreach: formData.autoOutreachEnabled,
      })

      if (insertError) throw insertError

      setFormData(defaultFormData)
      setCvFile(null)
      await fetchAgents()
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to create intern agents.'
      setErrorMessage(message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="mx-auto flex items-center justify-center h-full w-full max-w-5xl flex-col gap-6">
      <AgentsListSection loadingAgents={loadingAgents} agents={agents} />
      <Seperator />
      <AgentFormSection
        formData={formData}
        setFormData={setFormData}
        setCvFile={setCvFile}
        handleSubmit={handleSubmit}
        submitting={submitting}
        errorMessage={errorMessage}
      />
    </div>
  )
}
