'use client'

import { FormField } from './FormField'

export type AccountInfoData = {
  email: string
  fullName: string
  username: string
  website: string
}

export function AccountInfoSection({
  data,
  onChange,
  loading,
}: {
  data: AccountInfoData
  onChange: (data: AccountInfoData) => void
  loading?: boolean
}) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Account information</h2>
        <p className="mt-2 text-base text-slate-700 dark:text-slate-400">
          Your basic profile. Email cannot be changed here.
        </p>
      </div>
      <FormField
        id="account-email"
        label="Email"
        type="email"
        value={data.email}
        disabled
        className="space-y-2.5"
      />
      <FormField
        id="account-fullName"
        label="Full name"
        value={data.fullName}
        onChange={(e) => onChange({ ...data, fullName: e.target.value })}
        placeholder="Your full name"
        disabled={loading}
        className="space-y-2.5"
      />
      <FormField
        id="account-website"
        label="Linkedin"
        type="url"
        value={data.website}
        onChange={(e) => onChange({ ...data, website: e.target.value })}
        placeholder="https://..."
        disabled={loading}
        className="space-y-2.5"
      />
    </div>
  )
}
