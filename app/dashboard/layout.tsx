import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { DashboardHeader } from './components/DashboardHeader'
import { DashboardSidebar } from './components/DashboardSidebar'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  return (
    <div className="flex h-screen min-h-screen bg-slate-100 dark:bg-slate-950">
      <DashboardSidebar />
      <div className="flex flex-1 flex-col min-h-0 pl-64">
        <main className="flex-1 min-h-0 overflow-auto px-4 py-4">
          {children}
        </main>
      </div>
    </div>
  )
}
