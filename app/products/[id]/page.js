import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getCatalogProducts, getProductById } from '../../lib/catalog'
import ProductDetail from './ProductDetail'

export const dynamic = 'force-dynamic'

export async function generateStaticParams() {
  try {
    const ids = await import('../../lib/catalog').then((m) => m.getAllProductIds())
    return ids.map((id) => ({ id }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }) {
  const { id } = await params
  const product = await getProductById(id)
  if (!product) return { title: "Product not found | Sangeeta's Boutique" }
  return {
    title: `${product.name} | Sangeeta's Boutique`,
    description: product.description,
  }
}

export default async function ProductPage({ params }) {
  const { id } = await params
  const product = await getProductById(id)
  if (!product) notFound()

  const all = await getCatalogProducts()
  const related = all
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 4)

  const isApparel = product.department === 'apparel'
  const breadcrumbHref = isApparel ? '/apparel' : '/accessories'
  const breadcrumbLabel = isApparel ? 'Apparel' : 'Accessories'

  return (
    <main className="bg-white py-8 md:py-12 px-6 md:px-16">
      <div className="max-w-7xl mx-auto">
        <nav className="mb-6 md:mb-10 font-cardo text-sm md:text-base text-navy/70">
          <Link href="/" className="hover:text-navy hover:underline">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href={breadcrumbHref} className="hover:text-navy hover:underline">
            {breadcrumbLabel}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-navy">{product.name}</span>
        </nav>

        <ProductDetail product={product} related={related} />
      </div>
    </main>
  )
}
