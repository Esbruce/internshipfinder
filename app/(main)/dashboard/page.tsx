'use client'


import ProspectsListSection from '@/app/components/dashboard/CompaniesList'
import { createClient } from '@/lib/supabase/client'
import { Prospect} from '@/app/components/dashboard/types'
import { Agent } from '@/app/components/agents/types'
import Graph from '@/app/components/dashboard/Graph'
import Actions from '@/app/components/dashboard/Actions'
import AgentListSection from '@/app/components/dashboard/AgentListSection'
import Statistics from '@/app/components/dashboard/Statistics'
import { useMemo } from 'react'
import { useState, useCallback, useEffect} from 'react'


export default function DashboardPage() {
    const supabase = useMemo(() => createClient(), [])
  
    const [prospects, setProspects] = useState<Prospect[]>([])
    const [agents, setAgents] = useState<Agent[]>([])
    const [loadingProspects, setLoadingProspects] = useState(true)
    const [loadingAgents, setLoadingAgents] = useState(true)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    type ProspectRow = {
      id: string
      company_name: string
      status: string 
      company_website: string | 'Not found'
      company_contact: string | 'Not found'
      company_location: string | 'Not found'
      company_contact_name: string | null 
      outreach_email: string | null
      created_at: string    
    }

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
  
    const fetchProspects = useCallback(async () => {
      setLoadingProspects(true)
      setErrorMessage(null)
  
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser()
      if (authError || !user) {
        setErrorMessage('Please sign in to view and create intern agents.')
        setLoadingProspects(false)
        return
      }
  
      const { data, error } = await supabase
        .from('prospects')
        .select(
          'id, created_at, status, company_name, company_website, company_contact, company_location, company_contact_name, outreach_email'
        )
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
  
      if (error) {
        setErrorMessage(error.message)
        setLoadingProspects(false)
        return
      }
  
      const normalizedProspects = ((data ?? []) as ProspectRow[]).map((prospect) => ({
        id: String(prospect.id),
        status: prospect.status,
        company_name: prospect.company_name,
        company_website: prospect.company_website,
        company_contact: prospect.company_contact,
        company_location: prospect.company_location,
        company_contact_name: prospect.company_contact_name,
        outreach_email: prospect.outreach_email,
        created_at: prospect.created_at,
      }))
  
      setProspects(normalizedProspects)
      setLoadingProspects(false)
    }, [supabase])

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
        compensation_type: agent.compensation,
        auto_outreach_enabled: agent.auto_outreach,
        created_at: agent.created_at,
      }))

      setAgents(normalizedAgents)
      setLoadingAgents(false)
    }, [supabase])
  
    useEffect(() => {
      fetchProspects()
    }, [fetchProspects])

    useEffect(() => {
      fetchAgents()
    }, [fetchAgents])
  
  
    return (
      <div className="mx-auto w-full space-y-6">
        <div className="grid w-full h-[80vh] grid-cols-[1.6fr_1fr] grid-rows-[1fr_1fr] gap-6">
          <Graph loadingProspects={loadingProspects} prospects={prospects} />
          <div className="row-span-2 h-full">
            <ProspectsListSection loadingProspects={loadingProspects} prospects={prospects} />
          </div>
          <Actions loadingProspects={loadingProspects} prospects={prospects} />
        </div>

        <div className="grid h-[80vh] w-full grid-cols-2 grid-rows-[1fr_1fr] gap-6">
          <div className="h-full">
            <AgentListSection loadingAgents={loadingAgents} agents={agents} />
          </div>
          <div className="h-full">
            <Statistics loadingProspects={loadingProspects} prospects={prospects} />
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-4">Dummy 3</div>
          <div className="rounded-lg border border-gray-200 bg-white p-4">Dummy 4</div>
        </div>
      </div>
    )
  }
  

