'use client'

import {
  FABRIC_OPTIONS,
  SIZE_OPTIONS,
  SORT_OPTIONS,
  isPriceFilterActive,
} from '../../lib/catalogFilters'
import ColorFilterOptions from './ColorFilterOptions'
import FilterSection from './FilterSection'
import PriceRangeSlider from './PriceRangeSlider'

const checkClass = 'accent-navy w-4 h-4'

/**
 * @param {{
 *   open: boolean
 *   onClose: () => void
 *   filters: import('../../lib/catalogFilters').EMPTY_FILTERS extends infer T ? T : never
 *   setFilters: (updater: (f: typeof filters) => typeof filters) => void
 *   categories: Array<{ id: string; label: string }>
 *   onApply: () => void
 *   onClear: () => void
 * }} props
 */
export default function CatalogFilterDrawer({
  open,
  onClose,
  filters,
  setFilters,
  categories,
  onApply,
  onClear,
}) {
  if (!open) return null

  const toggleList = (key, value) => {
    setFilters((f) => {
      const list = f[key] ?? []
      const next = list.includes(value)
        ? list.filter((v) => v !== value)
        : [...list, value]
      return { ...f, [key]: next }
    })
  }

  return (
    <>
      <button
        type="button"
        className="fixed inset-0 bg-black/40 z-50 md:hidden"
        aria-label="Close filters"
        onClick={onClose}
      />
      <aside
        className="fixed top-0 right-0 h-full w-[min(100%,340px)] bg-white z-50 shadow-2xl flex flex-col overflow-hidden"
        role="dialog"
        aria-label="Filter and sort"
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-sanji-border">
          <h2 className="font-cardo font-bold text-navy text-xl">Filter &amp; Sort</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="text-navy text-2xl leading-none hover:opacity-70"
          >
            &times;
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5 space-y-6">
          <FilterSection
            title="Sort"
            showClear={filters.sort !== 'new'}
            onClear={() => setFilters((f) => ({ ...f, sort: 'new' }))}
          >
            <div className="space-y-2">
              {SORT_OPTIONS.map((opt) => (
                <label
                  key={opt.id}
                  className="flex items-center gap-2 font-cardo text-navy text-sm md:text-base cursor-pointer"
                >
                  <input
                    type="radio"
                    name="sort"
                    checked={filters.sort === opt.id}
                    onChange={() => setFilters((f) => ({ ...f, sort: opt.id }))}
                    className={checkClass}
                  />
                  {opt.label}
                </label>
              ))}
            </div>
          </FilterSection>

          <FilterSection
            title="Size"
            showClear={(filters.sizes?.length ?? 0) > 0}
            onClear={() => setFilters((f) => ({ ...f, sizes: [] }))}
          >
            <div className="flex flex-wrap gap-2">
              {SIZE_OPTIONS.map((size) => {
                const on = filters.sizes?.includes(size)
                return (
                  <button
                    key={size}
                    type="button"
                    onClick={() => toggleList('sizes', size)}
                    className={`font-cardo text-sm min-w-[44px] py-1.5 px-2 border rounded-sm transition-colors ${
                      on
                        ? 'bg-navy text-white border-navy'
                        : 'bg-white text-navy border-navy/40 hover:border-navy'
                    }`}
                  >
                    {size}
                  </button>
                )
              })}
            </div>
          </FilterSection>

          <FilterSection
            title="Price"
            showClear={isPriceFilterActive(filters)}
            onClear={() => setFilters((f) => ({ ...f, priceMin: null, priceMax: null }))}
          >
            <PriceRangeSlider
              valueMin={filters.priceMin}
              valueMax={filters.priceMax}
              onChange={(priceMin, priceMax) =>
                setFilters((f) => ({ ...f, priceMin, priceMax }))
              }
            />
          </FilterSection>

          <FilterSection
            title="Category"
            showClear={(filters.categories?.length ?? 0) > 0}
            onClear={() => setFilters((f) => ({ ...f, categories: [] }))}
          >
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {categories.map((cat) => (
                <label
                  key={cat.id}
                  className="flex items-center gap-2 font-cardo text-navy text-sm cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={filters.categories?.includes(cat.id)}
                    onChange={() => toggleList('categories', cat.id)}
                    className={checkClass}
                  />
                  {cat.label}
                </label>
              ))}
            </div>
          </FilterSection>

          <FilterSection
            title="Fabric"
            showClear={(filters.fabrics?.length ?? 0) > 0}
            onClear={() => setFilters((f) => ({ ...f, fabrics: [] }))}
          >
            <div className="space-y-2">
              {FABRIC_OPTIONS.map((fabric) => (
                <label
                  key={fabric}
                  className="flex items-center gap-2 font-cardo text-navy text-sm cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={filters.fabrics?.includes(fabric)}
                    onChange={() => toggleList('fabrics', fabric)}
                    className={checkClass}
                  />
                  {fabric}
                </label>
              ))}
            </div>
          </FilterSection>

          <FilterSection
            title="Color"
            showClear={(filters.colors?.length ?? 0) > 0}
            onClear={() => setFilters((f) => ({ ...f, colors: [] }))}
          >
            <ColorFilterOptions
              selected={filters.colors ?? []}
              onToggle={(color) => toggleList('colors', color)}
            />
          </FilterSection>
        </div>

        <div className="border-t border-sanji-border px-5 py-4 flex gap-3">
          <button
            type="button"
            onClick={onClear}
            className="flex-1 font-cardo text-navy text-sm border border-navy/40 rounded-sm py-2.5 hover:bg-cream transition-colors"
          >
            Clear all
          </button>
          <button
            type="button"
            onClick={() => {
              onApply()
              onClose()
            }}
            className="flex-1 font-cardo text-white text-sm bg-navy rounded-sm py-2.5 hover:bg-navy/90 transition-colors"
          >
            Apply filters
          </button>
        </div>
      </aside>
    </>
  )
}
