import { redirect } from 'next/navigation'

const FAQ_REDIRECTS = {
  returns: 'returns',
  shipping: 'shipping',
  tailoring: 'tailoring',
}

export function generateStaticParams() {
  return Object.keys(FAQ_REDIRECTS).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const id = FAQ_REDIRECTS[slug]
  if (!id) return { title: "Policy not found | Sangeeta's Boutique" }
  const titles = {
    returns: 'Return Policy',
    shipping: 'Shipping Policy',
    tailoring: 'Tailoring Policy',
  }
  return { title: `${titles[id]} | Sangeeta's Boutique` }
}

export default async function PolicyPage({ params }) {
  const { slug } = await params
  const faqId = FAQ_REDIRECTS[slug]
  if (faqId) {
    redirect(`/about#faq-${faqId}`)
  }
  redirect('/about#faq')
}
