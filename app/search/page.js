import { Suspense } from 'react'
import CatalogView from '../components/CatalogView'
import {
  accessoryCategories,
  allProducts,
  apparelCategories,
} from '../lib/products'

export const metadata = {
  title: "Search | Sangeeta's Boutique",
  description: 'Search apparel and accessories at Sanji\'s Label.',
}

const allCategories = [...apparelCategories, ...accessoryCategories]

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-[60vh] bg-white" />}>
      <CatalogView
        title="Search"
        products={allProducts}
        categories={allCategories}
        basePath="/products"
        searchMode
      />
    </Suspense>
  )
}
