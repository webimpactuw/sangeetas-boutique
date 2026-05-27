import { Suspense } from 'react'
import CatalogView from '../components/CatalogView'
import { apparelProducts, apparelCategories } from '../lib/products'

export const metadata = {
  title: "All Apparel | Sangeeta's Boutique",
  description:
    "Browse the full apparel collection: lehengas, kurtas, sarees, dresses, indo-western, and salwar suits.",
}

export default function ApparelPage() {
  return (
    <Suspense fallback={<div className="min-h-[60vh]" />}>
      <CatalogView
        title="Shop All Apparel"
        description="Discover Sanji's collection of traditional and contemporary Indian attire, designed for every occasion."
        products={apparelProducts}
        categories={apparelCategories}
        basePath="/products"
      />
    </Suspense>
  )
}
