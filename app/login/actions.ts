'use server'

import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

import { createClient } from '@/lib/supabase/server'

export async function signInWithGoogle(formData: FormData) {
  const consentGiven = formData.get('gmail_consent') === 'on'
  if (!consentGiven) {
    redirect('/login?error=gmail_consent_required')
  }

  const supabase = await createClient()
  const headersList = await headers()
  const host = headersList.get('x-forwarded-host') ?? headersList.get('host')
  const protocol =
    headersList.get('x-forwarded-proto') ?? (host?.includes('localhost') ? 'http' : 'https')
  const origin = headersList.get('origin') ?? (host ? `${protocol}://${host}` : null)
  const redirectTo =
    `${origin ?? process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'}/auth/callback?next=/dashboard`

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo,
      scopes:
        'openid email profile https://www.googleapis.com/auth/gmail.send',
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      },
    },
  })

  if (error || !data.url) {
    redirect('/error')
  }

  redirect(data.url)
}