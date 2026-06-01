import { Suspense } from 'react'
import CatalogView from '../components/CatalogView'
import { getCatalogProducts } from '../lib/catalog'
import { apparelCategories, accessoryCategories } from '../lib/products'

export const metadata = {
  title: "Search | Sangeeta's Boutique",
  description: "Search apparel and accessories at Sanji's Label.",
}

const allCategories = [...apparelCategories, ...accessoryCategories]

export default async function SearchPage() {
  const products = await getCatalogProducts()

  return (
    <Suspense fallback={<div className="min-h-[60vh] bg-white" />}>
      <CatalogView
        title="Search"
        products={products}
        categories={allCategories}
        basePath="/products"
        searchMode
      />
    </Suspense>
  )
}
