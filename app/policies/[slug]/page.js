import { notFound } from 'next/navigation'

const policies = {
  returns: {
    title: 'Return Policy',
    body: [
      'We accept returns on unworn, unwashed items within 14 days of delivery.',
      'Custom and tailored pieces are final sale and cannot be returned or exchanged.',
      'To start a return, email Sanji@gmail.com with your order number and a brief description.',
    ],
  },
  shipping: {
    title: 'Shipping Policy',
    body: [
      'Standard shipping is free within the Greater Seattle area.',
      'Two-day and overnight options are available at checkout for an additional fee.',
      'Most orders ship within 1\u20133 business days. You will receive tracking by email once your order leaves the studio.',
    ],
  },
  tailoring: {
    title: 'Tailoring Policy',
    body: [
      'Complimentary tailoring is offered with every full-price garment purchased in-store.',
      'Online orders qualify for a free virtual fitting consultation \u2014 book one anytime through our Booking page.',
      'For complex alterations, additional fees may apply and will be quoted before any work begins.',
    ],
  },
}

export function generateStaticParams() {
  return Object.keys(policies).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const policy = policies[slug]
  if (!policy) return { title: "Policy not found | Sangeeta's Boutique" }
  return { title: `${policy.title} | Sangeeta's Boutique` }
}

export default async function PolicyPage({ params }) {
  const { slug } = await params
  const policy = policies[slug]
  if (!policy) notFound()

  return (
    <main className="bg-white py-12 md:py-20 px-6 md:px-16">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-cardo font-bold italic text-navy text-4xl md:text-6xl mb-6 md:mb-10">
          {policy.title}
        </h1>
        <div className="flex flex-col gap-4 md:gap-5 font-cardo text-navy/85 text-base md:text-lg leading-relaxed">
          {policy.body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </div>
    </main>
  )
}
