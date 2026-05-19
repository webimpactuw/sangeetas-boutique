import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import {
  lineItemKey,
  addOrUpdateItem,
  calculateTotals,
  parseStoredCart,
  updateItemQuantity,
  removeItemById,
  cartItemCount,
} from '../app/lib/cart.js'

describe('lineItemKey', () => {
  it('combines productId size and color', () => {
    assert.equal(lineItemKey('apparel-1', 'L', 'Blue'), 'apparel-1::L::Blue')
  })
})

describe('addOrUpdateItem', () => {
  it('adds a new line', () => {
    const items = []
    const next = addOrUpdateItem(items, {
      productId: 'apparel-1',
      name: 'Lehengas 01',
      price: 150,
      color: 'Blue',
      size: 'L',
      quantity: 2,
      image: '/images/product-lehenga.png',
    })
    assert.equal(next.length, 1)
    assert.equal(next[0].quantity, 2)
    assert.equal(next[0].id, 'apparel-1::L::Blue')
  })

  it('merges quantity for same variant', () => {
    const items = [
      {
        id: 'apparel-1::L::Blue',
        productId: 'apparel-1',
        name: 'Lehengas 01',
        price: 150,
        color: 'Blue',
        size: 'L',
        quantity: 1,
        image: '/images/product-lehenga.png',
      },
    ]
    const next = addOrUpdateItem(items, {
      productId: 'apparel-1',
      name: 'Lehengas 01',
      price: 150,
      color: 'Blue',
      size: 'L',
      quantity: 3,
      image: '/images/product-lehenga.png',
    })
    assert.equal(next.length, 1)
    assert.equal(next[0].quantity, 4)
  })
})

describe('calculateTotals', () => {
  it('computes subtotal tax and total', () => {
    const items = [
      { price: 100, quantity: 2 },
      { price: 50, quantity: 1 },
    ]
    const { subtotal, tax, total } = calculateTotals(items, {
      shippingCost: 10.99,
      taxRate: 0.025,
    })
    assert.equal(subtotal, 250)
    assert.equal(tax, 6.25)
    assert.equal(total, 267.24)
  })
})

describe('parseStoredCart', () => {
  it('returns empty array for invalid JSON', () => {
    assert.deepEqual(parseStoredCart('not-json'), [])
  })

  it('filters invalid items', () => {
    const raw = JSON.stringify([
      { id: 'x', productId: 'a', name: 'A', price: 10, color: 'Red', size: 'M', quantity: 1, image: '/a.png' },
      { id: 'bad' },
    ])
    assert.equal(parseStoredCart(raw).length, 1)
  })
})

const sampleLine = {
  id: 'apparel-1::L::Blue',
  productId: 'apparel-1',
  name: 'Lehengas 01',
  price: 150,
  color: 'Blue',
  size: 'L',
  quantity: 1,
  image: '/images/product-lehenga.png',
}

describe('updateItemQuantity', () => {
  it('removes line when quantity decrements below 1', () => {
    const next = updateItemQuantity([sampleLine], sampleLine.id, -1)
    assert.equal(next.length, 0)
  })

  it('increments quantity up to 99', () => {
    const next = updateItemQuantity([sampleLine], sampleLine.id, 2)
    assert.equal(next[0].quantity, 3)
  })
})

describe('removeItemById', () => {
  it('removes matching line', () => {
    const next = removeItemById([sampleLine], sampleLine.id)
    assert.equal(next.length, 0)
  })
})

describe('cartItemCount', () => {
  it('sums quantities across lines', () => {
    assert.equal(
      cartItemCount([
        { quantity: 2 },
        { quantity: 3 },
      ]),
      5,
    )
  })
})
