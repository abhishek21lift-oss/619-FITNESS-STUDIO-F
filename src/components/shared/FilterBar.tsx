import type { ReactNode, SelectHTMLAttributes, InputHTMLAttributes } from 'react'

interface FilterBarProps {
  children: ReactNode
  label?: string
  options?: string[]
  value?: string
  onChange?: (e: any) => void
  placeholder?: string
  className?: string
}

export default function FilterBar(props: FilterBarProps) {
  const { children, label, options, value, onChange } = props

  // If used as a simple filter with options/label, render inline
  if (options && label) {
    return (
      <div className="flex flex-col gap-1">
        <label className="text-[10px] font-medium text-gray-500">{label}</label>
        <select
          value={value}
          onChange={onChange}
          className="h-7 px-2 text-[11px] bg-white/5 border border-ydl-dark-border rounded-lg text-gray-300 focus:outline-none focus:border-ydl-yellow/30 cursor-pointer"
        >
          {options.map((opt) => (
            <option key={opt} value={opt} className="bg-[#111]">{opt}</option>
          ))}
        </select>
      </div>
    )
  }

  return <div className="flex flex-wrap gap-2 items-end">{children}</div>
}

export function FilterField({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-[10px] font-medium text-gray-500">{label}</label>
      {children}
    </div>
  )
}

export function FilterInput(props: InputHTMLAttributes<HTMLInputElement> & { placeholder?: string; className?: string }) {
  return (
    <input
      {...props}
      className={`h-7 px-2.5 text-[11px] bg-white/5 border border-ydl-dark-border rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-ydl-yellow/30 ${props.className || ''}`}
    />
  )
}

export function FilterSelect(props: SelectHTMLAttributes<HTMLSelectElement> & { options: string[]; className?: string }) {
  const { options, className, ...rest } = props
  return (
    <select
      {...rest}
      className={`h-7 px-2 text-[11px] bg-white/5 border border-ydl-dark-border rounded-lg text-gray-300 focus:outline-none focus:border-ydl-yellow/30 cursor-pointer ${className || ''}`}
    >
      {options.map((opt) => (
        <option key={opt} value={opt} className="bg-[#111]">{opt}</option>
      ))}
    </select>
  )
}
