import { Suspense } from 'react'
import CatalogView from '../components/CatalogView'
import { getApparelProducts } from '../lib/catalog'
import { apparelCategories } from '../lib/products'

export const metadata = {
  title: "All Apparel | Sangeeta's Boutique",
  description:
    'Browse lehengas, sarees, Indo-Western fusion wear, and readymade sarees from Sanji\'s Label.',
}

export default async function ApparelPage() {
  const products = await getApparelProducts()

  return (
    <Suspense fallback={<div className="min-h-[60vh]" />}>
      <CatalogView
        title="Shop All Apparel"
        description="Lehengas, sarees, Indo-Western wear, and readymade sarees — curated for every occasion."
        products={products}
        categories={apparelCategories}
        basePath="/products"
      />
    </Suspense>
  )
}
