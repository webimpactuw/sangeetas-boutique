import CheckoutView from './CheckoutView'

export const metadata = {
  title: "Checkout | Sangeeta's Boutique",
}

export default function CheckoutPage() {
  return (
    <main className="bg-white py-10 md:py-16 px-6 md:px-16">
      <CheckoutView />
    </main>
  )
}
