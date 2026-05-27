import { notFound } from 'next/navigation'
import Link from 'next/link'
import { allProducts, getProduct } from '../../lib/products'
import ProductDetail from './ProductDetail'

export async function generateStaticParams() {
  return allProducts.map((p) => ({ id: p.id }))
}

export async function generateMetadata({ params }) {
  const { id } = await params
  const product = getProduct(id)
  if (!product) return { title: "Product not found | Sangeeta's Boutique" }
  return {
    title: `${product.name} | Sangeeta's Boutique`,
    description: product.description,
  }
}

export default async function ProductPage({ params }) {
  const { id } = await params
  const product = getProduct(id)
  if (!product) notFound()

  const related = allProducts
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 4)

  const isApparel = product.id.startsWith('apparel')
  const breadcrumbHref = isApparel ? '/apparel' : '/accessories'
  const breadcrumbLabel = isApparel ? 'Apparel' : 'Accessories'

  return (
    <main className="bg-white py-8 md:py-12 px-6 md:px-16">
      <div className="max-w-7xl mx-auto">
        <nav className="mb-6 md:mb-10 font-cardo text-sm md:text-base text-navy/70">
          <Link href="/" className="hover:text-navy hover:underline">Home</Link>
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
