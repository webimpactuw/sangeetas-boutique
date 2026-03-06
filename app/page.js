import Navbar from './components/navbar'
import HeroBanner from './components/HeroBanner'
import ShopSection from './components/ShopSection'
import EventsSection from './components/EventsSection'
import Footer from './components/Footer'

function SectionSeparator() {
  return <div className="w-full h-2 md:h-3 bg-sanji-border/40" />
}

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <HeroBanner />
      <SectionSeparator />
      <ShopSection />
      <SectionSeparator />
      <EventsSection />
      <SectionSeparator />
      <Footer />
    </main>
  )
}
