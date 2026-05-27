import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import {
  isValidFavoriteProductId,
  resolveFavoriteProducts,
} from '../app/lib/favorites.js'

describe('isValidFavoriteProductId', () => {
  it('accepts non-empty strings', () => {
    assert.equal(isValidFavoriteProductId('apparel-1'), true)
  })

  it('rejects empty or invalid values', () => {
    assert.equal(isValidFavoriteProductId(''), false)
    assert.equal(isValidFavoriteProductId(null), false)
  })
})

describe('resolveFavoriteProducts', () => {
  const catalog = [
    { id: 'a-1', name: 'A' },
    { id: 'b-2', name: 'B' },
  ]

  it('returns products in saved order and skips unknown ids', () => {
    const result = resolveFavoriteProducts(['b-2', 'missing', 'a-1'], catalog)
    assert.deepEqual(result.map((p) => p.id), ['b-2', 'a-1'])
  })
})
