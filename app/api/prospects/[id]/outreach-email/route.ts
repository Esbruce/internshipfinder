import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

type RouteContext = {
  params: Promise<{
    id: string
  }>
}

export async function PATCH(request: NextRequest, { params }: RouteContext) {
  const { id } = await params
  const supabase = await createClient()

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let payload: { outreachEmail?: string | null }
  try {
    payload = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const outreachEmail = payload.outreachEmail
  if (outreachEmail !== null && typeof outreachEmail !== 'string') {
    return NextResponse.json({ error: 'Invalid outreachEmail value' }, { status: 400 })
  }

  const { data, error } = await supabase
    .from('prospects')
    .update({ outreach_email: outreachEmail })
    .eq('id', id)
    .eq('user_id', user.id)
    .select('id')
    .single()

  if (error || !data) {
    return NextResponse.json(
      { error: error?.message ?? 'Could not update outreach email' },
      { status: 400 }
    )
  }

  return NextResponse.json({ success: true })
}
