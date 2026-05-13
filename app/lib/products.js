export const apparelCategories = [
  { id: 'lehengas', label: 'Lehengas' },
  { id: 'kurtas', label: 'Kurtas' },
  { id: 'sarees', label: 'Sarees' },
  { id: 'dresses', label: 'Dresses' },
  { id: 'indowestern', label: 'Indo-Western' },
  { id: 'salwar', label: 'Salwar Suits' },
]

export const accessoryCategories = [
  { id: 'jewelry', label: 'Jewelry' },
  { id: 'necklaces', label: 'Necklaces' },
  { id: 'earrings', label: 'Earrings' },
  { id: 'bracelets', label: 'Bracelets' },
  { id: 'purses', label: 'Purses' },
]

const baseImages = [
  '/images/product-lehenga.png',
  '/images/product-dress.png',
  '/images/product-sari.png',
  '/images/product-kurta.png',
  '/images/product-churidar.png',
]

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
