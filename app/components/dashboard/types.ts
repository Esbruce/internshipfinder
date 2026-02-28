
export type CompensationType = 'paid' | 'unpaid'


export type Prospect = {
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




