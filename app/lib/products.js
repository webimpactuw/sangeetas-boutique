import { ACCESSORY_CATEGORIES, APPAREL_CATEGORIES } from './categories'
import { categoryImagePath, productImagesForCategory } from './galleryPhotoMap'

export const apparelCategories = APPAREL_CATEGORIES.map(({ id, label }) => ({ id, label }))
export const accessoryCategories = ACCESSORY_CATEGORIES.map(({ id, label }) => ({ id, label }))

const FABRICS = ['Silk', 'Cotton', 'Georgette', 'Chiffon', 'Linen']

/** Category id → carousel image */
export const CATEGORY_IMAGES = Object.fromEntries(
  [...apparelCategories, ...accessoryCategories].map((cat) => [cat.id, categoryImagePath(cat.id)]),
)

function makeProducts(prefix, count, categories, basePrice = 150) {
  const products = []
  for (let i = 1; i <= count; i++) {
    const cat = categories[(i - 1) % categories.length]
    const pool = productImagesForCategory(cat.id)
    products.push({
      id: `${prefix}-${i}`,
      name: `${cat.label} ${String(i).padStart(2, '0')}`,
      price: basePrice + (i % 6) * 25,
      image: pool[(i - 1) % pool.length],
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
