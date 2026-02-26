'use client'

export type EmailTemplate = {
  id: string
  name: string
  subject: string
  body: string
  roleContext?: string
}

// Mock AI-generated templates based on "user" (would come from API based on profile/preferences)
const MOCK_TEMPLATES: EmailTemplate[] = [
  {
    id: '1',
    name: 'Software intern – cold outreach',
    subject: 'Internship application – {{company}} software engineering',
    body: `Hi {{recruiter_name}},

I'm {{your_name}}, a student interested in software engineering internships at {{company}}. I came across your {{role_title}} opening and would love to contribute to your team.

I have experience with {{tech_stack}} and have built [brief project]. I'm drawn to {{company}} because of {{reason}}.

Could we schedule a short call to discuss the role? I've attached my CV and am happy to complete any assessment.

Best,
{{your_name}}`,
    roleContext: 'Software engineering intern',
  },
  {
    id: '2',
    name: 'Product / PM intern – follow-up',
    subject: 'Following up – {{company}} product internship',
    body: `Hi {{recruiter_name}},

I wanted to follow up on my application for the product internship at {{company}}. I'm very interested in the opportunity and would appreciate any update on the process.

I'm happy to provide more materials or meet to discuss how I can add value to your product team.

Thanks,
{{your_name}}`,
    roleContext: 'Product / PM intern',
  },
  {
    id: '3',
    name: 'Data / ML intern – referral ask',
    subject: 'Data science internship – introduction from {{referrer}}',
    body: `Hi {{recruiter_name}},

{{referrer}} suggested I reach out about the data science internship at {{company}}. I'm a student with experience in {{tools}} and have worked on [project]. I'm excited about {{company}}'s work in {{domain}}.

I've attached my CV. Would you have 15 minutes for a quick chat about the role?

Best,
{{your_name}}`,
    roleContext: 'Data / ML intern',
  },
]

export { MOCK_TEMPLATES }
