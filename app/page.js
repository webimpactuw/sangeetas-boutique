import HeroBanner from './components/HeroBanner'
import ShopSection from './components/ShopSection'
import EleganceSection from './components/EleganceSection'
import CraftsmanshipSection from './components/CraftsmanshipSection'
import CustomerReviews from './components/CustomerReviews'
import ExploreJewelry from './components/ExploreJewelry'
import FiligreeBorder from './components/FiligreeBorder'

export default function Home() {
  return (
    <>
      <HeroBanner />
      <FiligreeBorder />
      <ShopSection />
      <EleganceSection />
      <CraftsmanshipSection />
      <CustomerReviews />
      <ExploreJewelry />
      <FiligreeBorder />
    </>
  )
}
