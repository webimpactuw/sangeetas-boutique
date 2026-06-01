import { Suspense } from 'react'
import CatalogView from '../components/CatalogView'
import { getAccessoryProducts } from '../lib/catalog'
import { accessoryCategories } from '../lib/products'

export const metadata = {
  title: "All Accessories | Sangeeta's Boutique",
  description:
    'Curated handcrafted jewelry and accessories — necklaces, earrings, bracelets, and more.',
}

export default async function AccessoriesPage() {
  const products = await getAccessoryProducts()

  return (
    <Suspense fallback={<div className="min-h-[60vh]" />}>
      <CatalogView
        title="Shop All Accessories"
        description="Handcrafted jewelry and accessories designed to elevate any look."
        products={products}
        categories={accessoryCategories}
        basePath="/products"
      />
    </Suspense>
  )
}
