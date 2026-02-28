type CompanyDescriptionProps = {
  companyOverview: string | null
}

export default function CompanyDescription({ companyOverview }: CompanyDescriptionProps) {
  const hasDescription = Boolean(companyOverview?.trim())

  return (
    <section className="mx-auto mt-6 max-w-4xl rounded-2xl border border-slate-300 bg-white p-6 dark:border-slate-600 dark:bg-slate-800">
      <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Description</h2>
      <div
        className={`mt-4 min-h-40 whitespace-pre-wrap rounded-xl border border-slate-300 bg-slate-50 p-4 text-sm dark:border-slate-600 dark:bg-slate-900 ${
          hasDescription ? 'text-slate-900 dark:text-slate-100' : 'text-slate-400 dark:text-slate-500'
        }`}
      >
        {hasDescription ? companyOverview : 'No company description available yet.'}
      </div>
    </section>
  )
}
