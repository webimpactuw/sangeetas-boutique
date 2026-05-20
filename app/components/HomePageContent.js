import HeroBanner from './HeroBanner'
import ShopSection from './ShopSection'
import EleganceSection from './EleganceSection'
import CraftsmanshipSection from './CraftsmanshipSection'
import CustomerReviews from './CustomerReviews'
import ExploreJewelry from './ExploreJewelry'
import FiligreeBorder from './FiligreeBorder'
import { mapHomePage } from '@/app/lib/mapSanityContent'
import { getHomePage } from '@/sanity/lib/fetchPublicContent'

export const revalidate = 60

/** Homepage sections — reused behind auth drawers when signed out. */
export default async function HomePageContent() {
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
