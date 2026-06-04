import Image from 'next/image'
import FaqSection from '../components/FaqSection'
import MeetTheDesigner from '../components/MeetTheDesigner'

export const metadata = {
  title: "About Sanji's | Sangeeta's Boutique",
  description:
    "Meet Sanji — designer of traditional Indian attire, jewelry, and curated collections in the Seattle area.",
}

const offerings = [
  {
    title: 'Traditional Attire',
    body: 'Saris, Lehengas, and traditional Indian garments for all occasions.',
  },
  {
    title: 'For All Ages',
    body: 'Curated collections for women, men, and kids.',
  },
  {
    title: 'Fine Jewelry',
    body: 'Handcrafted jewelry and accessories for women, men, and kids.',
  },
  {
    title: 'In-Person Consultations',
    body: 'Complimentary in-person styling and fitting sessions.',
  },
]

export default function AboutPage() {
  return (
    <main className="bg-white">
      <MeetTheDesigner />

      <section className="bg-cream py-12 md:py-20 px-6 md:px-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-cardo font-bold italic text-navy text-3xl md:text-5xl text-center mb-8 md:mb-12">
            What We Do
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            {offerings.map((item) => (
              <article
                key={item.title}
                className="bg-white border border-sanji-border rounded-sm px-6 md:px-8 py-6 md:py-8 shadow-sm"
              >
                <h3 className="font-cardo font-bold text-navy text-lg md:text-xl mb-2 md:mb-3 text-center">
                  {item.title}
                </h3>
                <p className="font-cardo italic text-navy/75 text-sm md:text-base text-center leading-relaxed">
                  {item.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 px-6 md:px-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div>
            <h2 className="font-cardo font-bold italic text-navy text-4xl md:text-6xl mb-4 md:mb-6">
              Our History
            </h2>
            <div className="w-16 h-px bg-navy/40 mb-5 md:mb-6" />
            <p className="font-cardo text-navy/85 text-base md:text-lg leading-relaxed mb-4">
              Located in Sammamish, Washington, Sanji&rsquo;s Label began as a
              small, passion-driven venture rooted in a love for traditional
              craftsmanship and thoughtful design.
            </p>
            <p className="font-cardo text-navy/85 text-base md:text-lg leading-relaxed mb-6">
              Over time, it has grown into a space where heritage and modern
              elegance come together, now continuing to evolve through new
              collections, custom pieces, and current showcases. You can find
              us at many local events and bazaars in the Eastside area.
            </p>
            <p className="font-cardo italic text-navy/60 text-sm md:text-base">
              &mdash; Sammamish, Washington
            </p>
          </div>
          <div className="relative w-full aspect-square">
            <Image
              src="/images/brand-logo.png"
              alt="Sanji's Label logo"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </section>

      <FaqSection />
    </main>
  )
}
