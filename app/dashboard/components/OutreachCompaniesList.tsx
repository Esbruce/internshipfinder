'use client'

export type OutreachCompany = {
  id: string
  name: string
  description: string
  imageUrl: string
}

// Dummy data: companies outreached to
export const MOCK_OUTREACH_COMPANIES: OutreachCompany[] = [
  {
    id: '1',
    name: 'Stripe',
    description: 'Payments infrastructure for the internet. Reached out for Software Engineering Intern role.',
    imageUrl: 'https://picsum.photos/seed/stripe/96/96',
  },
  {
    id: '2',
    name: 'Vercel',
    description: 'Platform for frontend developers. Applied to Developer Experience internship.',
    imageUrl: 'https://picsum.photos/seed/vercel/96/96',
  },
  {
    id: '3',
    name: 'Linear',
    description: 'Issue tracking and project management. Cold outreach for Product Design intern position.',
    imageUrl: 'https://picsum.photos/seed/linear/96/96',
  },
  {
    id: '4',
    name: 'Notion',
    description: 'All-in-one workspace. Follow-up email sent for Data Science internship.',
    imageUrl: 'https://picsum.photos/seed/notion/96/96',
  },
  {
    id: '5',
    name: 'Figma',
    description: 'Collaborative interface design tool. Reached out via referral for Engineering intern.',
    imageUrl: 'https://picsum.photos/seed/figma/96/96',
  },
  {
    id: '6',
    name: 'Anthropic',
    description: 'AI safety and research. Applied to Research Internship (ML).',
    imageUrl: 'https://picsum.photos/seed/anthropic/96/96',
  },
]

type Props = {
  companies?: OutreachCompany[]
}

export function OutreachCompaniesList({ companies = MOCK_OUTREACH_COMPANIES }: Props) {
  return (
    <div className="flex flex-col gap-2.5">
      {companies.map((company) => (
        <article
          key={company.id}
          className="flex items-center gap-3 rounded-xl border border-slate-300 bg-slate-50 p-3.5 transition hover:border-slate-400 hover:bg-slate-100 dark:border-slate-600 dark:bg-slate-800/80 dark:hover:border-slate-500 dark:hover:bg-slate-700/80"
        >
          <div className="h-11 w-11 shrink-0 overflow-hidden rounded-lg border border-slate-300 bg-white dark:border-slate-500 dark:bg-slate-700">
            <img
              src={company.imageUrl}
              alt=""
              width={44}
              height={44}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-sm font-medium text-slate-900 dark:text-white">
              {company.name}
            </h3>
            <p className="mt-0.5 line-clamp-2 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
              {company.description}
            </p>
          </div>
        </article>
      ))}
    </div>
  )
}
