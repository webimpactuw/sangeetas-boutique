'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * @param {{
 *   label: string
 *   options: Array<{ id: string; label: string }>
 *   selected: string[]
 *   onChange: (selected: string[]) => void
 * }} props
 */
export default function FilterDropdown({ label, options, selected, onChange }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const onDoc = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [])

  const toggle = (id) => {
    const next = selected.includes(id)
      ? selected.filter((v) => v !== id)
      : [...selected, id]
    onChange(next)
  }

  const count = selected.length

  return (
    <div className="relative hidden md:block" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`font-cardo text-sm md:text-base px-4 py-2 border rounded-sm flex items-center gap-2 transition-colors ${
          count
            ? 'bg-navy text-white border-navy'
            : 'bg-white text-navy border-navy/40 hover:border-navy'
        }`}
      >
        {label}
        {count > 0 ? (
          <span className="text-xs bg-white/20 rounded-full px-1.5">{count}</span>
        ) : null}
        <span className="text-xs opacity-70" aria-hidden>
          ▾
        </span>
      </button>
      {open && (
        <ul className="absolute left-0 top-full mt-1 min-w-[180px] bg-white border border-sanji-border shadow-lg rounded-sm py-2 z-30 max-h-56 overflow-y-auto">
          {options.map((opt) => (
            <li key={opt.id}>
              <label className="flex items-center gap-2 px-4 py-2 font-cardo text-sm text-navy cursor-pointer hover:bg-cream">
                <input
                  type="checkbox"
                  checked={selected.includes(opt.id)}
                  onChange={() => toggle(opt.id)}
                  className="accent-navy"
                />
                {opt.label}
              </label>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
