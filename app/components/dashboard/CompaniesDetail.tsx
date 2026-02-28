import Link from 'next/link'

type CompaniesDetailProps = {
  prospect: {
    id: string
    company_name: string
    status: string | null
    company_website: string | null
    company_contact: string | null
    company_location: string | null
    company_contact_name: string | null
    outreach_email: string | null
    created_at: string
  }
}

export default function CompaniesDetail({ prospect }: CompaniesDetailProps) {
  return (
    <section className="mx-auto max-w-4xl rounded-2xl border border-slate-300 bg-white p-6 dark:border-slate-600 dark:bg-slate-800">
      <div className="mb-6">
        <Link
          href="/dashboard"
          className="text-sm font-medium text-accent hover:underline"
        >
          Back to dashboard
        </Link>
      </div>

      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">
            {prospect.company_name}
          </h1>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
            Added {new Date(prospect.created_at).toLocaleDateString()}
          </p>
        </div>

        <div className="grid gap-4 rounded-xl border border-slate-200 p-4 dark:border-slate-700 sm:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">Status</p>
            <p className="mt-1 text-sm text-slate-900 dark:text-slate-100">{prospect.status ?? '—'}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">Location</p>
            <p className="mt-1 text-sm text-slate-900 dark:text-slate-100">
              {prospect.company_location ?? '—'}
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">Website</p>
            <p className="mt-1 text-sm text-slate-900 dark:text-slate-100">
              {prospect.company_website ?? '—'}
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">Contact</p>
            <p className="mt-1 text-sm text-slate-900 dark:text-slate-100">
              {prospect.company_contact ?? '—'}
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Contact Name
            </p>
            <p className="mt-1 text-sm text-slate-900 dark:text-slate-100">
              {prospect.company_contact_name ?? '—'}
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Outreach Email
            </p>
            <p className="mt-1 text-sm text-slate-900 dark:text-slate-100">
              {prospect.outreach_email ? 'Found' : '—'}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
