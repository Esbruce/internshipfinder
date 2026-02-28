export type WorkType = 'on_site' | 'remote' | 'hybrid'

export type CompensationType = 'paid' | 'unpaid'

export type Agent = {
  id: string
  name: string
  cv_url: string | null
  ideal_internship_description: string | null
  industry: string | null
  location: string | null
  work_type: WorkType | null
  compensation_type: CompensationType | null
  auto_outreach_enabled: boolean
  created_at: string
}

export type AgentFormData = {
  name: string
  idealInternshipDescription: string
  industry: string
  location: string
  workType: WorkType | null
  compensationType: CompensationType | null
  autoOutreachEnabled: boolean
}
