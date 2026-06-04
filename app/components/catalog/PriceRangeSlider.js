'use client'

import { PRICE_SLIDER } from '../../lib/catalogFilters'

/**
 * @param {{ valueMin: number | null; valueMax: number | null; onChange: (min: number, max: number) => void }} props
 */
export default function PriceRangeSlider({ valueMin, valueMax, onChange }) {
  const { min, max, step } = PRICE_SLIDER
  const low = valueMin ?? min
  const high = valueMax ?? max
  const pct = (value) => ((value - min) / (max - min)) * 100

  const setLow = (nextLow) => {
    onChange(Math.min(nextLow, high), high)
  }

  const setHigh = (nextHigh) => {
    onChange(low, Math.max(nextHigh, low))
  }

  return (
    <div className="px-1 pt-1 pb-2">
      <div className="relative h-8">
        <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-1.5 bg-navy/15 rounded-full" />
        <div
          className="absolute top-1/2 -translate-y-1/2 h-1.5 bg-navy rounded-full"
          style={{
            left: `${pct(low)}%`,
            width: `${Math.max(pct(high) - pct(low), 0)}%`,
          }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={low}
          onChange={(e) => setLow(Number(e.target.value))}
          className="price-range-input absolute inset-0 w-full"
          aria-label="Minimum price"
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={high}
          onChange={(e) => setHigh(Number(e.target.value))}
          className="price-range-input absolute inset-0 w-full"
          aria-label="Maximum price"
        />
      </div>
      <p className="font-cardo text-sm text-navy text-center mt-3">
        ${low} – ${high}
      </p>
    </div>
  )
}
