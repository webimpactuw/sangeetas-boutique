import { ACCESSORY_CATEGORIES, APPAREL_CATEGORIES } from './categories'

export const apparelCategories = APPAREL_CATEGORIES.map(({ id, label }) => ({ id, label }))
export const accessoryCategories = ACCESSORY_CATEGORIES.map(({ id, label }) => ({ id, label }))

const baseImages = [
  '/images/gallery/photo-13.jpg',
  '/images/gallery/photo-14.jpg',
  '/images/gallery/photo-15.jpg',
  '/images/gallery/photo-16.jpg',
  '/images/gallery/photo-17.jpg',
]

const FABRICS = ['Silk', 'Cotton', 'Georgette', 'Chiffon', 'Linen']

/** Category id → carousel image */
export const CATEGORY_IMAGES = {
  lehengas: '/images/gallery/photo-05.jpg',
  sarees: '/images/gallery/photo-04.jpg',
  'indo-western': '/images/gallery/photo-06.jpg',
  'readymade-sarees': '/images/gallery/photo-20.jpg',
  jewelry: '/images/gallery/photo-07.jpg',
  bags: '/images/gallery/photo-10.jpg',
  watches: '/images/gallery/photo-11.jpg',
  necklaces: '/images/gallery/photo-12.jpg',
  earrings: '/images/gallery/photo-15.jpg',
}

function makeProducts(prefix, count, categories, basePrice = 150) {
  const products = []
  for (let i = 1; i <= count; i++) {
    const cat = categories[(i - 1) % categories.length]
    products.push({
      id: `${prefix}-${i}`,
      name: `${cat.label} ${String(i).padStart(2, '0')}`,
      price: basePrice + (i % 6) * 25,
      image: baseImages[(i - 1) % baseImages.length],
      category: cat.id,
      department: prefix === 'accessory' ? 'accessories' : 'apparel',
      fabric: FABRICS[(i - 1) % FABRICS.length],
      colors: ['Blue', 'Red', 'Green', 'Cream'],
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      description:
        'Handcrafted piece from Sanji\'s Label. Contact us for sizing, tailoring, and availability.',
    })
  }
  return products
}

export const apparelProducts = makeProducts('apparel', 16, apparelCategories, 150)
export const accessoryProducts = makeProducts('accessory', 12, accessoryCategories, 80)

export const allProducts = [...apparelProducts, ...accessoryProducts]

export function getProduct(id) {
  return allProducts.find((p) => p.id === id) ?? null
}

export function filterByDepartment(products, department) {
  return products.filter((p) => p.department === department)
}
