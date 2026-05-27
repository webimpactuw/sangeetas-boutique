import CartView from './CartView'

export const metadata = {
  title: "My Bag | Sangeeta's Boutique",
}

export default function CartPage() {
  return (
    <main className="bg-white py-10 md:py-16 px-6 md:px-16">
      <CartView />
    </main>
  )
}
