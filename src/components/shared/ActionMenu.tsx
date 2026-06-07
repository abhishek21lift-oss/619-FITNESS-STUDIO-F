import { useState, useRef, useEffect } from 'react'
import type { ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Action {
  label: string
  icon?: any
  onClick: () => void
  color?: string
}

export default function ActionMenu({ actions, label = 'Actions' }: { actions: Action[]; label?: ReactNode }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="px-2.5 py-1 text-[10px] font-medium text-gray-400 bg-white/5 border border-ydl-dark-border rounded-lg hover:text-white hover:bg-white/10 transition-all"
      >
        {label}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.1 }}
            className="absolute right-0 top-full mt-1 w-44 rounded-lg border border-ydl-dark-border bg-[#1A1A1A] shadow-xl shadow-black/60 z-40 overflow-hidden"
          >
            <div className="py-1">
              {actions.map((action, i) => (
                <button
                  key={i}
                  onClick={() => { action.onClick(); setOpen(false) }}
                  className={`flex items-center gap-2 w-full px-3 py-2 text-xs font-medium text-left transition-colors hover:bg-white/5 ${action.color || 'text-gray-300 hover:text-white'}`}
                >
                  {action.icon && <action.icon className="w-3.5 h-3.5" />}
                  {action.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
