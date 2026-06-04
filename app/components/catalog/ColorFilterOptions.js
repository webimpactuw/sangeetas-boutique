'use client'

import { COLOR_OPTIONS, COLOR_SWATCHES } from '../../lib/catalogFilters'

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden className="text-navy">
      <path
        d="M3 8.5L6.5 12L13 4"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/**
 * @param {{ selected: string[]; onToggle: (color: string) => void }} props
 */
export default function ColorFilterOptions({ selected, onToggle }) {
  return (
    <div className="space-y-1">
      {COLOR_OPTIONS.map((color) => {
        const isSelected = selected.includes(color)
        const swatch = COLOR_SWATCHES[color] ?? '#ccc'
        const needsBorder = color === 'Cream'

        return (
          <button
            key={color}
            type="button"
            onClick={() => onToggle(color)}
            className="flex items-center gap-3 w-full py-1.5 font-cardo text-navy text-sm hover:opacity-80 transition-opacity"
            aria-pressed={isSelected}
          >
            <span
              className={`w-5 h-5 rounded-sm shrink-0 ${needsBorder ? 'border border-navy/25' : ''}`}
              style={{ backgroundColor: swatch }}
              aria-hidden
            />
            <span className="flex-1 text-left">{color}</span>
            <span className="w-4 flex justify-end shrink-0">
              {isSelected ? <CheckIcon /> : null}
            </span>
          </button>
        )
      })}
    </div>
  )
}
