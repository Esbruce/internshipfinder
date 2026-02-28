import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import CompaniesDetail from '@/app/components/dashboard/CompaniesDetail'
import CompanyDescription from '@/app/components/dashboard/CompanyDescription'
import OutreachEmail from '@/app/components/dashboard/OutreachEmail'

type ProspectDetailPageProps = {
  params: Promise<{
    id: string
  }>
}

type ProspectRow = {
  id: string
  company_name: string
  status: string | null
  company_website: string | null
  company_contact: string | null
  company_location: string | null
  company_contact_name: string | null
  company_overview: string | null
  outreach_email: string | null
  created_at: string
}

export default async function ProspectDetailPage({ params }: ProspectDetailPageProps) {
  const { id } = await params
  const supabase = await createClient()

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    notFound()
  }

  const { data, error } = await supabase
    .from('prospects')
    .select(
      'id, company_name, status, company_website, company_contact, company_location, company_contact_name, company_overview, outreach_email, created_at'
    )
    .eq('id', id)
    .eq('user_id', user.id)
    .single()

  if (error || !data) {
    notFound()
  }

  const prospect = data as ProspectRow

  return (
    <>
      <CompaniesDetail prospect={prospect} />
      <CompanyDescription companyOverview={prospect.company_overview} />
      <OutreachEmail prospectId={prospect.id} outreachEmail={prospect.outreach_email} />
    </>
  )
}
