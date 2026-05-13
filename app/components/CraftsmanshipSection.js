import Image from 'next/image'
import Link from 'next/link'

export default function CraftsmanshipSection() {
  return (
    <section className="bg-navy text-white">
      <div className="grid grid-cols-1 md:grid-cols-2 max-w-7xl mx-auto">
        <div className="relative w-full aspect-[4/3] md:aspect-auto md:min-h-[420px]">
          <Image
            src="/images/product-sari.png"
            alt="Handcrafted sari embroidery work"
            fill
            className="object-cover"
          />
        </div>

        <div className="flex flex-col justify-center px-6 md:px-14 py-10 md:py-16">
          <h2 className="font-cardo font-bold text-3xl md:text-5xl tracking-wide mb-4 md:mb-6">
            CRAFTSMANSHIP
          </h2>
          <p className="font-cardo italic text-white/85 text-sm md:text-base leading-relaxed max-w-md">
            Every piece from Sanji&rsquo;s is handcrafted with the same care, precision,
            and appreciation for detail. Our apparel is made from real silk and
            thoughtfully designed to reflect true craftsmanship and quality.
          </p>
          <Link
            href="/gallery"
            className="mt-6 md:mt-8 inline-block w-fit font-cardo text-white text-sm md:text-base border border-white/80 rounded-sm px-6 md:px-10 py-2.5 md:py-3 hover:bg-white hover:text-navy transition-colors"
          >
            Explore Gallery
          </Link>
        </div>
      </div>
    </section>
  )
}
