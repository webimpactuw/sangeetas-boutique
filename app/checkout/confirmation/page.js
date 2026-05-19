import { Suspense } from 'react'
import ConfirmationClient from './ConfirmationClient'

export const metadata = {
  title: "Order inquiry received | Sangeeta's Boutique",
}

export default function PurchaseConfirmationPage() {
  return (
    <Suspense fallback={<main className="py-20 text-center font-cardo text-navy">Loading…</main>}>
      <ConfirmationClient />
    </Suspense>
  )
}
