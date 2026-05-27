export const apparelCategories = [
  { id: 'sarees', label: 'Sarees' },
  { id: 'lehengas', label: 'Lehengas' },
  { id: 'dresses', label: 'Dresses' },
  { id: 'blouses', label: 'Ready-made Blouses' },
  { id: 'menswear', label: 'Menswear' },
  { id: 'kids', label: 'Kidswear' },
]

export const accessoryCategories = [
  { id: 'jewelry', label: 'Jewelry' },
  { id: 'bags', label: 'Bags' },
  { id: 'watches', label: 'Watches' },
  { id: 'necklaces', label: 'Necklaces' },
  { id: 'earrings', label: 'Earrings' },
]

const baseImages = [
  '/images/product-lehenga.png',
  '/images/product-dress.png',
  '/images/product-sari.png',
  '/images/product-kurta.png',
  '/images/product-churidar.png',
]

const FABRICS = ['Silk', 'Cotton', 'Georgette', 'Chiffon', 'Linen']

/** Category id → carousel image */
export const CATEGORY_IMAGES = {
  sarees: '/images/product-sari.png',
  lehengas: '/images/product-lehenga.png',
  dresses: '/images/product-dress.png',
  blouses: '/images/product-kurta.png',
  menswear: '/images/product-churidar.png',
  kids: '/images/product-kurta.png',
  jewelry: '/images/product-sari.png',
  bags: '/images/product-dress.png',
  watches: '/images/product-lehenga.png',
  necklaces: '/images/product-sari.png',
  earrings: '/images/product-dress.png',
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
      fabric: FABRICS[(i - 1) % FABRICS.length],
      colors: ['Blue', 'Red', 'Green', 'Cream'],
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      description:
        'Sed ut perspiciatis unde omnis iste natus error sit voluptatem ' +
        'accusantium doloremque laudantium, totam rem aperiam, eaque ipsa ' +
        'quae ab illo inventore veritatis et quasi architecto beatae vitae ' +
        'dicta sunt explicabo.',
    })
  }
  return products
}

export const apparelProducts = makeProducts('apparel', 18, apparelCategories, 150)
export const accessoryProducts = makeProducts('accessory', 18, accessoryCategories, 80)

export const allProducts = [...apparelProducts, ...accessoryProducts]

export function getProduct(id) {
  return allProducts.find((p) => p.id === id) ?? null
}
