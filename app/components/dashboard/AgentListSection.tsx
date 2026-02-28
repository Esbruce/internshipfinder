import { Agent } from '@/app/components/agents/types'

type AgentListSectionProps = {
  loadingAgents: boolean
  agents: Agent[]
}

export default function AgentListSection({ loadingAgents, agents }: AgentListSectionProps) {
  return (
    <section className="h-full w-full rounded-2xl border border-slate-300 bg-white p-6 backdrop-blur-2xl dark:border-slate-600 dark:bg-slate-800">
      <div className="mb-4">
        <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">Existing Intern Agents</h1>
      </div>

      {loadingAgents ? (
        <p className="text-sm text-slate-600 dark:text-slate-300">Loading intern agents...</p>
      ) : agents.length === 0 ? (
        <p className="rounded-xl border border-dashed border-slate-300 px-4 py-6 text-sm text-slate-600 dark:border-slate-600 dark:text-slate-300">
          No intern agents yet. Create your first one using the form below.
        </p>
      ) : (
        <div className="space-y-3">
          {agents.map((agent) => (
            <article
              key={agent.id}
              className="rounded-xl border border-slate-300 bg-slate-50 p-4 dark:border-slate-600 dark:bg-slate-900/50"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-base text-accent text-xl font-semibold dark:text-white">{agent.name}</h2>
              </div>
              <div className="text-sm text-slate-700 dark:text-slate-200 sm:grid-cols-2">
                <p>{agent.industry ?? '—'}</p>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  {new Date(agent.created_at).toLocaleDateString()}
                </span>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}
