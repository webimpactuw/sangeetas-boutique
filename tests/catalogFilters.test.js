import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import {
  EMPTY_FILTERS,
  filterAndSortProducts,
  getActiveFilterChips,
  productMatchesSearch,
} from '../app/lib/catalogFilters.js'

const sample = [
  {
    id: 'a-2',
    name: 'Lehengas 02',
    price: 175,
    category: 'lehengas',
    fabric: 'Silk',
    colors: ['Blue', 'Red'],
    sizes: ['M', 'L'],
  },
  {
    id: 'a-1',
    name: 'Sarees 01',
    price: 150,
    category: 'sarees',
    fabric: 'Cotton',
    colors: ['Green'],
    sizes: ['S'],
  },
]

describe('productMatchesSearch', () => {
  it('matches category labels and fabric', () => {
    const product = sample[0]
    assert.equal(
      productMatchesSearch(product, 'lehenga', { lehengas: 'Lehengas' }),
      true,
    )
    assert.equal(productMatchesSearch(product, 'silk', {}), true)
    assert.equal(productMatchesSearch(product, 'cotton', {}), false)
  })
})

describe('filterAndSortProducts', () => {
  it('filters by search query', () => {
    const result = filterAndSortProducts(
      sample,
      { ...EMPTY_FILTERS, search: 'saree' },
      [{ id: 'sarees', label: 'Sarees' }],
    )
    assert.equal(result.length, 1)
    assert.equal(result[0].category, 'sarees')
  })

  it('filters by category and sorts price ascending', () => {
    const result = filterAndSortProducts(sample, {
      categories: ['sarees'],
      fabrics: [],
      colors: [],
      sizes: [],
      priceMin: null,
      priceMax: null,
      sort: 'price-asc',
      search: '',
    })
    assert.equal(result.length, 1)
    assert.equal(result[0].category, 'sarees')
  })

  it('filters by fabric', () => {
    const result = filterAndSortProducts(sample, {
      categories: [],
      fabrics: ['Silk'],
      colors: [],
      sizes: [],
      priceMin: null,
      priceMax: null,
      sort: 'new',
      search: '',
    })
    assert.equal(result.length, 1)
    assert.equal(result[0].fabric, 'Silk')
  })

  it('filters by price range slider', () => {
    const result = filterAndSortProducts(sample, {
      ...EMPTY_FILTERS,
      priceMin: 160,
      priceMax: 200,
    })
    assert.equal(result.length, 1)
    assert.equal(result[0].id, 'a-2')
  })
})

describe('getActiveFilterChips', () => {
  it('builds chips for active filters', () => {
    const chips = getActiveFilterChips(
      {
        categories: ['sarees'],
        fabrics: ['Silk'],
        colors: [],
        sizes: [],
        priceMin: null,
      priceMax: null,
        sort: 'new',
        search: '',
      },
      [{ id: 'sarees', label: 'Sarees' }],
    )
    assert.equal(chips.length, 2)
  })
})
