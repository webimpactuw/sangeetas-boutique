'use client'

import { useEffect, useMemo, useState } from 'react'
import ProductCard from './ProductCard'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import CategoryCarousel from './catalog/CategoryCarousel'
import CatalogFilterDrawer from './catalog/CatalogFilterDrawer'
import FilterDropdown from './catalog/FilterDropdown'
import {
  COLOR_OPTIONS,
  EMPTY_FILTERS,
  FABRIC_OPTIONS,
  countActiveFilters,
  filterAndSortProducts,
  getActiveFilterChips,
} from '../lib/catalogFilters'

const PAGE_SIZE = 9

export default function CatalogView(props) {
  const searchParams = useSearchParams()
  const urlCategory = searchParams.get('category') ?? ''
  const urlQuery = searchParams.get('q') ?? ''

  return (
    <CatalogViewInner
      urlCategory={urlCategory}
      urlQuery={urlQuery}
      {...props}
    />
  )
}

function CatalogViewInner({
  title,
  description,
  products,
  categories,
  basePath,
  urlCategory,
  urlQuery,
  searchMode = false,
}) {
  const router = useRouter()
  const pathname = usePathname()
  const [filters, setFilters] = useState(() => ({
    ...EMPTY_FILTERS,
    categories:
      !searchMode && urlCategory && urlCategory !== 'all' ? [urlCategory] : [],
    search: urlQuery,
  }))
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [page, setPage] = useState(1)

  useEffect(() => {
    setFilters((f) => ({
      ...f,
      search: urlQuery,
      categories:
        searchMode || !urlCategory || urlCategory === 'all'
          ? f.categories
          : [urlCategory],
    }))
    setPage(1)
  }, [urlQuery, urlCategory, searchMode])

  const filtered = useMemo(() => {
    if (searchMode && !urlQuery.trim()) return []
    return filterAndSortProducts(products, filters, categories)
  }, [products, filters, categories, searchMode, urlQuery])

  const visible = filtered.slice(0, page * PAGE_SIZE)
  const hasMore = visible.length < filtered.length
  const chips = getActiveFilterChips(filters, categories)
  const activeCount = countActiveFilters(filters)

  const handleCategorySelect = (categoryId) => {
    setFilters((f) => ({
      ...f,
      categories: categoryId ? [categoryId] : [],
    }))
    setPage(1)
  }

  const removeChip = (chip) => {
    if (chip.type === 'search') {
      const params = new URLSearchParams(window.location.search)
      params.delete('q')
      const qs = params.toString()
      router.push(qs ? `${window.location.pathname}?${qs}` : window.location.pathname)
      return
    }
    setFilters((f) => {
      if (chip.type === 'priceRangeId') {
        return { ...f, priceRangeId: null }
      }
      const list = f[chip.type] ?? []
      return { ...f, [chip.type]: list.filter((v) => v !== chip.value) }
    })
    setPage(1)
  }

  const clearAllFilters = () => {
    const params = new URLSearchParams(window.location.search)
    params.delete('category')
    params.delete('q')
    const qs = params.toString()
    router.push(qs ? `${pathname}?${qs}` : pathname)
    setFilters({ ...EMPTY_FILTERS, search: '' })
    setPage(1)
  }

  const fabricOptions = FABRIC_OPTIONS.map((f) => ({ id: f, label: f }))
  const colorOptions = COLOR_OPTIONS.map((c) => ({ id: c, label: c }))

  return (
    <main className="bg-white py-10 md:py-16 px-6 md:px-16">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-8 md:mb-10">
          <h1 className="font-cardo font-bold italic text-navy text-4xl md:text-6xl mb-3 md:mb-4">
            {title}
          </h1>
          {description && (
            <p className="font-cardo italic text-navy/75 text-sm md:text-base max-w-2xl mx-auto">
              {description}
            </p>
          )}
          {urlQuery ? (
            <p className="font-cardo text-navy/70 text-sm mt-3">
              {filtered.length} result{filtered.length === 1 ? '' : 's'} for &ldquo;
              {urlQuery}&rdquo;
            </p>
          ) : searchMode ? (
            <p className="font-cardo italic text-navy/60 text-sm mt-3">
              Use the search bar above to find apparel and accessories.
            </p>
          ) : null}
        </header>

        <CategoryCarousel
          categories={categories}
          activeIds={filters.categories}
          onSelect={handleCategorySelect}
        />

        <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-4">
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            className="font-cardo text-sm md:text-base px-4 py-2 border border-navy/40 rounded-sm bg-white text-navy hover:border-navy flex items-center gap-2 transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
              <path d="M4 6h16M7 12h10M10 18h4" strokeLinecap="round" />
            </svg>
            Filter &amp; Sort
            {activeCount > 0 ? (
              <span className="bg-navy text-white text-xs rounded-full min-w-[20px] h-5 px-1.5 flex items-center justify-center">
                {activeCount}
              </span>
            ) : null}
          </button>

          <FilterDropdown
            label="Category"
            options={categories.map((c) => ({ id: c.id, label: c.label }))}
            selected={filters.categories}
            onChange={(categories) => {
              setFilters((f) => ({ ...f, categories }))
              setPage(1)
            }}
          />
          <FilterDropdown
            label="Fabric"
            options={fabricOptions}
            selected={filters.fabrics}
            onChange={(fabrics) => {
              setFilters((f) => ({ ...f, fabrics }))
              setPage(1)
            }}
          />
          <FilterDropdown
            label="Color"
            options={colorOptions}
            selected={filters.colors}
            onChange={(colors) => {
              setFilters((f) => ({ ...f, colors }))
              setPage(1)
            }}
          />
        </div>

        {(chips.length > 0 || activeCount > 0) && (
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <button
              type="button"
              onClick={clearAllFilters}
              className="font-cardo text-sm text-navy underline underline-offset-2 hover:no-underline"
            >
              Clear all
            </button>
            {chips.map((chip) => (
              <button
                key={chip.key}
                type="button"
                onClick={() => removeChip(chip)}
                className="font-cardo text-xs md:text-sm px-3 py-1 bg-cream border border-sanji-border rounded-sm text-navy flex items-center gap-1.5 hover:bg-navy hover:text-white transition-colors"
              >
                {chip.label}
                <span aria-hidden>&times;</span>
              </button>
            ))}
          </div>
        )}

        <p className="font-cardo text-navy/70 text-sm md:text-base mb-6 md:mb-8">
          Showing {visible.length} of {filtered.length} results
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-8">
          {visible.map((product) => (
            <ProductCard key={product.id} product={product} basePath={basePath} />
          ))}
        </div>

        {visible.length === 0 && (
          <p className="font-cardo italic text-navy/60 text-center py-16">
            {urlQuery
              ? `No products found for "${urlQuery}". Try another term or clear filters.`
              : 'No products match your filters. Try clearing some filters.'}
          </p>
        )}

        {hasMore && (
          <div className="flex justify-center mt-10 md:mt-14">
            <button
              type="button"
              onClick={() => setPage((p) => p + 1)}
              className="font-cardo text-navy text-sm md:text-base border border-navy rounded-sm px-10 md:px-14 py-2.5 md:py-3 hover:bg-navy hover:text-white transition-colors"
            >
              Load More
            </button>
          </div>
        )}
      </div>

      <CatalogFilterDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        filters={filters}
        setFilters={setFilters}
        categories={categories}
        onApply={() => setPage(1)}
        onClear={clearAllFilters}
      />
    </main>
  )
}
