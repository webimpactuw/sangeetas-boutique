import { cache } from 'react'

import { mapSanityProducts } from './mapSanityProducts'
import {
  allProducts as fallbackProducts,
  apparelProducts as fallbackApparel,
  accessoryProducts as fallbackAccessories,
} from './products'
import { getSanityProducts } from '../../sanity/lib/fetchPublicContent'

/**
 * Published products from Sanity, or demo catalog if none exist yet.
 */
export const getCatalogProducts = cache(async function getCatalogProducts() {
  try {
    const rows = await getSanityProducts()
    const mapped = mapSanityProducts(rows)
    if (mapped.length > 0) return mapped
  } catch (err) {
    console.error('Sanity products fetch failed, using demo catalog:', err)
  }
  return fallbackProducts
})

export async function getApparelProducts() {
  const all = await getCatalogProducts()
  const apparel = all.filter((p) => p.department === 'apparel')
  return apparel.length ? apparel : fallbackApparel
}

export async function getAccessoryProducts() {
  const all = await getCatalogProducts()
  const accessories = all.filter((p) => p.department === 'accessories')
  return accessories.length ? accessories : fallbackAccessories
}

export async function getProductById(id) {
  const all = await getCatalogProducts()
  return all.find((p) => p.id === id) ?? null
}

export async function getAllProductIds() {
  const all = await getCatalogProducts()
  return all.map((p) => p.id)
}
