import BookingForm from './BookingForm'
import BookingHours from '../components/BookingHours'

export const metadata = {
  title: "Book an Appointment | Sangeeta's Boutique",
  description:
    "Schedule your appointment with Sanji for a complimentary in-person styling and fitting session.",
}

export default function BookingPage() {
  return (
    <main className="bg-white py-10 md:py-16 px-6 md:px-16">
      <div className="max-w-5xl mx-auto">
        <header className="text-center mb-8 md:mb-12">
          <h1 className="font-cardo font-bold italic text-navy text-4xl md:text-6xl mb-3 md:mb-4">
            Schedule Your Appointment with Sanji
          </h1>
          <p className="font-cardo italic text-navy/75 text-sm md:text-base max-w-2xl mx-auto">
            Complimentary in-person styling and fitting. Share your preferred date and time —
            Sanji will follow up to confirm and learn about your needs before you visit.
          </p>
        </header>

        <BookingHours />

        <BookingForm />
      </div>
    </main>
  )
}
