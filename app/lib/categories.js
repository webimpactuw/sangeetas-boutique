/**
 * Product categories — aligned with how Sanji organizes inventory.
 * Used in nav, catalog filters, Sanity Studio, and demo products.
 */

export const APPAREL_CATEGORIES = [
  {
    id: 'lehengas',
    label: 'Lehengas',
    hint: 'Skirts with matching crop tops',
  },
  {
    id: 'sarees',
    label: 'Sarees',
    hint: 'Traditional saree fabric and styles',
  },
  {
    id: 'indo-western',
    label: 'Indo-Western Wear',
    hint: 'Also called fusion wear — coordinated pants and tops',
  },
  {
    id: 'readymade-sarees',
    label: 'Readymade Sarees',
    hint: 'Pre-draped looks with crop tops or blouses',
  },
]

export const ACCESSORY_CATEGORIES = [
  { id: 'jewelry', label: 'Jewelry' },
  { id: 'necklaces', label: 'Necklaces' },
  { id: 'earrings', label: 'Earrings' },
  { id: 'bags', label: 'Bags' },
  { id: 'watches', label: 'Watches' },
]

/** For Sanity schema option lists */
export const SANITY_APPAREL_CATEGORY_OPTIONS = APPAREL_CATEGORIES.map((c) => ({
  title: c.label,
  value: c.id,
}))

export const SANITY_ACCESSORY_CATEGORY_OPTIONS = ACCESSORY_CATEGORIES.map((c) => ({
  title: c.label,
  value: c.id,
}))

export function getCategoryLabel(id, department = 'apparel') {
  const list = department === 'accessories' ? ACCESSORY_CATEGORIES : APPAREL_CATEGORIES
  return list.find((c) => c.id === id)?.label ?? id
}
