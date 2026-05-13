import { Suspense } from 'react'
import ConfirmationContent from './ConfirmationContent'

export const metadata = {
  title: "Booking Confirmed | Sangeeta's Boutique",
}

export default function BookingConfirmationPage() {
  return (
    <main className="bg-white py-10 md:py-20 px-6 md:px-16">
      <Suspense fallback={<div className="min-h-[40vh]" />}>
        <ConfirmationContent />
      </Suspense>
    </main>
  )
}
