export const SORT_OPTIONS = [
  { id: 'new', label: 'New Arrivals' },
  { id: 'price-asc', label: 'Price: Low to High' },
  { id: 'price-desc', label: 'Price: High to Low' },
]

export const FABRIC_OPTIONS = ['Silk', 'Cotton', 'Georgette', 'Chiffon', 'Linen']

export const COLOR_OPTIONS = ['Blue', 'Red', 'Green', 'Cream', 'Gold', 'Black']

export const SIZE_OPTIONS = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

export const PRICE_RANGES = [
  { id: '0-100', label: '$0 – $100', min: 0, max: 100 },
  { id: '101-200', label: '$101 – $200', min: 101, max: 200 },
  { id: '201-300', label: '$201 – $300', min: 201, max: 300 },
  { id: '301+', label: '$301+', min: 301, max: Infinity },
]

export const EMPTY_FILTERS = {
  categories: [],
  fabrics: [],
  colors: [],
  sizes: [],
  priceRangeId: null,
  sort: 'new',
  search: '',
}

/**
 * @param {{ name: string; category: string; fabric?: string; description?: string; colors?: string[] }} product
 * @param {string} query
 * @param {Record<string, string>} [categoryLabels]
 */
export function productMatchesSearch(product, query, categoryLabels = {}) {
  const search = query.trim().toLowerCase()
  if (!search) return true

  const haystack = [
    product.name,
    product.category,
    categoryLabels[product.category],
    product.fabric,
    product.description,
    ...(product.colors ?? []),
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase()

  return haystack.includes(search)
}

/**
 * @param {Array<{ id: string; name: string; price: number; category: string; fabric?: string; colors?: string[]; sizes?: string[]; description?: string }>} products
 * @param {typeof EMPTY_FILTERS} filters
 * @param {Array<{ id: string; label: string }>} [categories]
 */
export function filterAndSortProducts(products, filters, categories = []) {
  let list = [...products]

  const search = filters.search?.trim()
  if (search) {
    const categoryLabels = Object.fromEntries(
      categories.map((c) => [c.id, c.label]),
    )
    list = list.filter((p) => productMatchesSearch(p, search, categoryLabels))
  }

  if (filters.categories?.length) {
    list = list.filter((p) => filters.categories.includes(p.category))
  }

  if (filters.fabrics?.length) {
    list = list.filter((p) => p.fabric && filters.fabrics.includes(p.fabric))
  }

  if (filters.colors?.length) {
    list = list.filter((p) =>
      p.colors?.some((c) => filters.colors.includes(c)),
    )
  }

  if (filters.sizes?.length) {
    list = list.filter((p) =>
      p.sizes?.some((s) => filters.sizes.includes(s)),
    )
  }

  if (filters.priceRangeId) {
    const range = PRICE_RANGES.find((r) => r.id === filters.priceRangeId)
    if (range) {
      list = list.filter((p) => p.price >= range.min && p.price <= range.max)
    }
  }

  if (filters.sort === 'price-asc') {
    list.sort((a, b) => a.price - b.price)
  } else if (filters.sort === 'price-desc') {
    list.sort((a, b) => b.price - a.price)
  } else {
    list.sort((a, b) => b.id.localeCompare(a.id))
  }

  return list
}

/**
 * @param {typeof EMPTY_FILTERS} filters
 * @param {Array<{ id: string; label: string }>} categories
 */
export function getActiveFilterChips(filters, categories) {
  const chips = []
  const catMap = Object.fromEntries(categories.map((c) => [c.id, c.label]))

  for (const id of filters.categories ?? []) {
    chips.push({ key: `cat-${id}`, type: 'categories', value: id, label: catMap[id] ?? id })
  }
  for (const f of filters.fabrics ?? []) {
    chips.push({ key: `fab-${f}`, type: 'fabrics', value: f, label: f })
  }
  for (const c of filters.colors ?? []) {
    chips.push({ key: `col-${c}`, type: 'colors', value: c, label: c })
  }
  for (const s of filters.sizes ?? []) {
    chips.push({ key: `size-${s}`, type: 'sizes', value: s, label: s })
  }
  if (filters.priceRangeId) {
    const range = PRICE_RANGES.find((r) => r.id === filters.priceRangeId)
    if (range) {
      chips.push({
        key: `price-${range.id}`,
        type: 'priceRangeId',
        value: range.id,
        label: range.label,
      })
    }
  }
  if (filters.search?.trim()) {
    chips.push({
      key: 'search',
      type: 'search',
      value: filters.search.trim(),
      label: `Search: ${filters.search.trim()}`,
    })
  }

  return chips
}

export function countActiveFilters(filters) {
  return (
    (filters.categories?.length ?? 0) +
    (filters.fabrics?.length ?? 0) +
    (filters.colors?.length ?? 0) +
    (filters.sizes?.length ?? 0) +
    (filters.priceRangeId ? 1 : 0) +
    (filters.search?.trim() ? 1 : 0)
  )
}
