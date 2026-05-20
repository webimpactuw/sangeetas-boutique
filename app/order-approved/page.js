import Link from 'next/link'

export const metadata = {
  title: "Order approved | Sangeeta's Boutique",
}

export default async function OrderApprovedPage({ searchParams }) {
  const params = await searchParams
  const sent = params.sent === '1'
  const order = params.order || ''
  const customer = params.customer ? decodeURIComponent(params.customer) : ''
  const error = params.error ? decodeURIComponent(params.error) : ''

  let title = 'Something went wrong'
  let message = error || 'This approval link is invalid or has expired.'
  let tone = 'error'

  if (sent) {
    title = 'Payment email sent'
    message = customer
      ? `We emailed payment instructions to ${customer}${order ? ` for order ${order}` : ''}.`
      : 'The customer has been emailed payment instructions.'
    tone = 'success'
  } else if (error === 'missing') {
    message = 'No approval token was provided.'
  } else if (error === 'invalid') {
    message = 'This link is invalid or has expired. Open the latest order email from the boutique.'
  }

  return (
    <main className="bg-white py-10 md:py-20 px-6 md:px-16">
      <div className="max-w-xl mx-auto bg-light-bg border border-sanji-border rounded-sm px-6 md:px-10 py-10 md:py-12 text-center">
        <h1
          className={`font-cardo font-bold italic text-3xl md:text-5xl mb-4 ${
            tone === 'success' ? 'text-navy' : 'text-red-800'
          }`}
        >
          {title}
        </h1>
        <p className="font-cardo text-navy/80 text-base md:text-lg mb-8">{message}</p>
        {tone === 'success' && (
          <p className="font-cardo text-navy/70 text-sm mb-8">
            You can close this tab. The customer pays Sanji directly on PayPal — nothing is processed on this website.
          </p>
        )}
        <Link
          href="/"
          className="inline-block font-cardo text-white text-base bg-navy hover:bg-navy/90 transition-colors py-3 px-8 rounded-sm"
        >
          Back to boutique
        </Link>
      </div>
    </main>
  )
}
