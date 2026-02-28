import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { DashboardSidebar } from '@/app/components/layout/Sidebar'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  return (
    <div className="relative flex h-screen min-h-screen items-stretch overflow-hidden bg-slate-100/20 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900">
      <div className="relative z-10">
        <DashboardSidebar />
      </div>
      <div className="relative z-10 flex min-h-0 flex-1 flex-col">
        <main className="flex-1 min-h-0 overflow-auto px-10 py-10">
          {children}
        </main>
      </div>
    </div>
  )
}
