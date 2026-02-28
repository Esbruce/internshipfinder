'use client'

const inputClass =
  'w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 placeholder:text-slate-500 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500'

export function FormField({
  id,
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  disabled,
  required,
  className = '',
  ...props
}: {
  id: string
  label: string
  type?: string
  value?: string | number
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void
  placeholder?: string
  disabled?: boolean
  required?: boolean
  className?: string
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'id' | 'type' | 'value' | 'onChange'>) {
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-base font-medium text-slate-800 dark:text-slate-300">
        {label}
        {required && <span className="text-rose-500"> *</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value ?? ''}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        className={inputClass}
        {...props}
      />
    </div>
  )
}

export function FormTextarea({
  id,
  label,
  value,
  onChange,
  placeholder,
  rows = 4,
  required,
  className = '',
}: {
  id: string
  label: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  placeholder?: string
  rows?: number
  required?: boolean
  className?: string
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-base font-medium text-slate-800 dark:text-slate-300">
        {label}
        {required && <span className="text-rose-500"> *</span>}
      </label>
      <textarea
        id={id}
        value={value ?? ''}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        required={required}
        className={`${inputClass} min-h-[120px] resize-y`}
      />
    </div>
  )
}

export { inputClass }
