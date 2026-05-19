export const CART_STORAGE_KEY = 'sanji-cart-v1'
export const DEFAULT_TAX_RATE = 0.025

export function lineItemKey(productId, size, color) {
  return `${productId}::${size}::${color}`
}

export function addOrUpdateItem(items, incoming) {
  const id = lineItemKey(incoming.productId, incoming.size, incoming.color)
  const existing = items.find((it) => it.id === id)
  if (existing) {
    return items.map((it) =>
      it.id === id
        ? { ...it, quantity: Math.min(99, it.quantity + incoming.quantity) }
        : it,
    )
  }
  return [
    ...items,
    {
      id,
      productId: incoming.productId,
      name: incoming.name,
      price: incoming.price,
      color: incoming.color,
      size: incoming.size,
      quantity: Math.min(99, Math.max(1, incoming.quantity)),
      image: incoming.image,
    },
  ]
}

export function updateItemQuantity(items, id, delta) {
  return items
    .map((it) =>
      it.id === id
        ? { ...it, quantity: Math.min(99, it.quantity + delta) }
        : it,
    )
    .filter((it) => it.quantity > 0)
}

export function removeItemById(items, id) {
  return items.filter((it) => it.id !== id)
}

export function calculateTotals(items, { shippingCost = 0, taxRate = DEFAULT_TAX_RATE } = {}) {
  const subtotal = items.reduce((sum, it) => sum + it.price * it.quantity, 0)
  const tax = subtotal * taxRate
  const total = subtotal + tax + shippingCost
  return {
    subtotal: roundMoney(subtotal),
    tax: roundMoney(tax),
    total: roundMoney(total),
  }
}

function roundMoney(n) {
  return Math.round(n * 100) / 100
}

function isValidCartItem(item) {
  return (
    item &&
    typeof item.id === 'string' &&
    typeof item.productId === 'string' &&
    typeof item.name === 'string' &&
    typeof item.price === 'number' &&
    typeof item.color === 'string' &&
    typeof item.size === 'string' &&
    typeof item.quantity === 'number' &&
    typeof item.image === 'string' &&
    item.quantity >= 1
  )
}

export function parseStoredCart(raw) {
  if (!raw) return []
  try {
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed.filter(isValidCartItem)
  } catch {
    return []
  }
}

export function cartItemCount(items) {
  return items.reduce((sum, it) => sum + it.quantity, 0)
}
