import { Suspense } from 'react'
import CatalogView from '../components/CatalogView'
import { accessoryProducts, accessoryCategories } from '../lib/products'

export const metadata = {
  title: "All Accessories | Sangeeta's Boutique",
  description:
    "Curated handcrafted jewelry and accessories \u2014 necklaces, earrings, bracelets, and purses.",
}

export default function AccessoriesPage() {
  return (
    <Suspense fallback={<div className="min-h-[60vh]" />}>
      <CatalogView
        title="Shop All Accessories"
        description="Handcrafted jewelry and accessories designed to elevate any look."
        products={accessoryProducts}
        categories={accessoryCategories}
        basePath="/products"
      />
    </Suspense>
  )
}
