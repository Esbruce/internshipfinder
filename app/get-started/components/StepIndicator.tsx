'use client'

const steps = [
  { key: 'get-started', label: 'Get started', short: 'Get started' },
  { key: 'internship', label: 'Internship preferences', short: 'Internship' },
  { key: 'automation', label: 'Automation', short: 'Automation' },
  { key: 'how-it-works', label: 'How the agent works', short: 'How it works' },
] as const

export type StepKey = (typeof steps)[number]['key']

export function StepIndicator({
  currentStep,
  onStepClick,
}: {
  currentStep: number
  onStepClick?: (index: number) => void
}) {
  return (
    <nav aria-label="Progress" className="mb-10">
      <ol className="flex items-center justify-between gap-1">
        {steps.map((step, index) => {
          const isActive = index === currentStep
          const isPast = index < currentStep
          const isClickable = onStepClick && (isPast || isActive)
          return (
            <li key={step.key} className="flex flex-1 items-center">
              {index > 0 && (
                <div
                  className={`mx-1 h-0.5 w-8 flex-shrink-0 rounded ${
                    isPast ? 'bg-sky-500' : 'bg-slate-300 dark:bg-slate-600'
                  }`}
                  aria-hidden
                />
              )}
              <button
                type="button"
                onClick={() => isClickable && onStepClick(index)}
                disabled={!isClickable}
                className={`flex flex-col items-center gap-1.5 rounded-lg px-3 py-2.5 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 disabled:cursor-default flex-1 ${
                  isClickable ? 'hover:bg-slate-100 dark:hover:bg-slate-800' : ''
                }`}
                aria-current={isActive ? 'step' : undefined}
              >
                <span
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 text-base font-medium ${
                    isActive
                      ? 'border-sky-500 bg-sky-500 text-white'
                      : isPast
                        ? 'border-sky-500 bg-sky-500 text-white'
                        : 'border-slate-300 bg-white text-slate-600 dark:border-slate-600 dark:bg-slate-800'
                  }`}
                >
                  {isPast ? (
                    <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    index + 1
                  )}
                </span>
                <span
                  className={`hidden text-sm font-medium sm:block ${
                    isActive ? 'text-sky-600 dark:text-sky-400' : isPast ? 'text-slate-700 dark:text-slate-400' : 'text-slate-600 dark:text-slate-500'
                  }`}
                >
                  {step.short}
                </span>
              </button>
              {index === steps.length - 1 && <div className="w-8 flex-shrink-0" aria-hidden />}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

export { steps }
