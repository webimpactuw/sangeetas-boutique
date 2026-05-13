import HeroBanner from './components/HeroBanner'
import ShopSection from './components/ShopSection'
import EleganceSection from './components/EleganceSection'
import CraftsmanshipSection from './components/CraftsmanshipSection'
import CustomerReviews from './components/CustomerReviews'
import ExploreJewelry from './components/ExploreJewelry'
import FiligreeBorder from './components/FiligreeBorder'
import { mapHomePage } from './lib/mapSanityContent'
import { getHomePage } from '../sanity/lib/fetchPublicContent'

export const revalidate = 60

export default async function Home() {
  const raw = await getHomePage()
  const content = mapHomePage(raw)

  return (
    <>
      <HeroBanner slides={content.heroSlides} />
      <FiligreeBorder />
      <ShopSection heading={content.shopHeading} categories={content.shopCategories} />
      <EleganceSection words={content.elegance.words} tagline={content.elegance.tagline} />
      <CraftsmanshipSection {...content.craftsmanship} />
      <CustomerReviews {...content.reviews} />
      <ExploreJewelry {...content.exploreJewelry} />
      <FiligreeBorder />
    </>
  )
}
