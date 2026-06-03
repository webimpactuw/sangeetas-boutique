import { galleryImagePath } from './galleryImages'

/**
 * Curated gallery indices — matched to what is actually in each photo.
 * 01–18, 21–22 = apparel · 19–20, 23–41 = jewelry
 */
export const PHOTOS = {
  lehengas: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
  sarees: [2, 4, 18, 22],
  indoWestern: [21],
  readymadeSarees: [4, 16, 22],
  jewelry: [31, 34, 36, 37, 38, 39],
  necklaces: [24, 25, 26, 27, 35, 41],
  earrings: [23, 28, 29, 30],
  rings: [19, 20],
  jewelrySets: [33, 37, 40],
}

/** Best single image per catalog category (carousel tiles, nav, etc.). */
export const CATEGORY_PHOTO = {
  lehengas: 10,
  sarees: 22,
  'indo-western': 21,
  'readymade-sarees': 16,
  jewelry: 34,
  necklaces: 35,
  earrings: 28,
  bags: null,
  watches: null,
}

const PLACEHOLDER_IMAGES = {
  bags: '/images/product-dress.png',
  watches: '/images/product-kurta.png',
}

export function categoryImagePath(categoryId) {
  const index = CATEGORY_PHOTO[categoryId]
  if (index != null) return galleryImagePath(index)
  return PLACEHOLDER_IMAGES[categoryId] ?? '/images/product-sari.png'
}

/** Flat list of paths for demo product placeholders. */
export function productImagesForDepartment(department) {
  const pools =
    department === 'accessories'
      ? [...PHOTOS.jewelry, ...PHOTOS.necklaces, ...PHOTOS.earrings, ...PHOTOS.rings]
      : [
          ...PHOTOS.lehengas,
          ...PHOTOS.sarees,
          ...PHOTOS.indoWestern,
          ...PHOTOS.readymadeSarees,
        ]

  return pools.map((n) => galleryImagePath(n))
}

/** Images for a specific product category id. */
export function productImagesForCategory(categoryId) {
  const map = {
    lehengas: PHOTOS.lehengas,
    sarees: PHOTOS.sarees,
    'indo-western': PHOTOS.indoWestern,
    'readymade-sarees': PHOTOS.readymadeSarees,
    jewelry: PHOTOS.jewelry,
    necklaces: PHOTOS.necklaces,
    earrings: PHOTOS.earrings,
    bags: [],
    watches: [],
  }
  const indices = map[categoryId] ?? []
  if (!indices.length) return [categoryImagePath(categoryId)]
  return indices.map((n) => galleryImagePath(n))
}
