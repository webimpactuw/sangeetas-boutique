export const FAVORITES_TABLE = 'favorites'

/**
 * @param {string[]} productIds
 * @param {Array<{ id: string }>} catalog
 * @returns {Array<{ id: string }>}
 */
export function resolveFavoriteProducts(productIds, catalog) {
  if (!productIds?.length || !catalog?.length) return []
  const byId = new Map(catalog.map((p) => [p.id, p]))
  return productIds.map((id) => byId.get(id)).filter(Boolean)
}

/**
 * @param {unknown} productId
 */
export function isValidFavoriteProductId(productId) {
  return typeof productId === 'string' && productId.length > 0 && productId.length <= 128
}
