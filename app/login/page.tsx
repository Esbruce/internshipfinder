import { signInWithGoogle } from './actions'
import { GoogleConsentForm } from './GoogleConsentForm'

type LoginPageProps = {
  searchParams?: Promise<{
    error?: string
  }>
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams
  const showConsentError = params?.error === 'gmail_consent_required'

  return (
    <main className="relative min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 text-slate-900">
      {/* Background blurs */}
      <div
        className="pointer-events-none absolute -left-32 -top-32 h-64 w-64 rounded-full bg-gradient-to-br from-sky-200/40 to-indigo-300/30 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-32 -top-32 h-64 w-64 rounded-full bg-gradient-to-bl from-indigo-200/40 to-sky-300/30 blur-3xl"
        aria-hidden
      />

      <div className="flex min-h-screen flex-col items-center justify-center px-6 py-10">
        <div className="w-full max-w-sm space-y-8">
          <div className="text-center">
            <h1 className="mt-4 text-2xl font-semibold tracking-tight text-slate-900">
              Continue with Google
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              Sign in or sign up using your Google account.
            </p>
          </div>

          <GoogleConsentForm
            showConsentError={showConsentError}
            signInAction={signInWithGoogle}
          />
        </div>
      </div>
    </main>
  )
}
