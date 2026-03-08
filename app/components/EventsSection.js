import Image from 'next/image'

export default function EventsSection() {
  return (
    <section className="py-8 md:py-12 bg-white">
      {/* Title */}
      <h2 className="font-cardo font-bold text-navy text-xl md:text-3xl text-center md:text-left md:pl-16 mb-6 md:mb-8">
        UPCOMING EVENTS <span className="hidden md:inline">→</span>
      </h2>

      {/* Event poster */}
      <div className="flex justify-center px-6">
        <div className="relative w-full max-w-md md:max-w-lg aspect-[4/5] border-3 border-[#fff7ea] overflow-hidden">
          <Image
            src="/images/event-poster.png"
            alt="Spring Bazaar - Upcoming Event"
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Pagination dots */}
      <div className="flex items-center justify-center gap-3 mt-6 font-cardo text-navy text-xl">
        <button className="hover:opacity-70 transition-opacity" aria-label="Previous">&lt;</button>
        <span>●</span>
        <button className="hover:opacity-70 transition-opacity" aria-label="Next">&gt;</button>
      </div>
    </section>
  )
}
