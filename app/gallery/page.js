import Image from 'next/image'

export const metadata = {
  title: "Gallery | Sangeeta's Boutique",
  description:
    "Explore Sanji's signature designs, where timeless craftsmanship meets refined detail and modern elegance.",
}

const galleryImages = [
  '/images/hero-main.png',
  '/images/product-lehenga.png',
  '/images/product-dress.png',
  '/images/product-sari.png',
  '/images/product-kurta.png',
  '/images/product-churidar.png',
  '/images/product-lehenga.png',
  '/images/product-dress.png',
  '/images/product-sari.png',
  '/images/product-kurta.png',
  '/images/product-churidar.png',
  '/images/product-lehenga.png',
  '/images/hero-main.png',
  '/images/product-dress.png',
  '/images/product-sari.png',
  '/images/product-kurta.png',
  '/images/product-churidar.png',
  '/images/product-lehenga.png',
]

export default function GalleryPage() {
  return (
    <main className="bg-white py-10 md:py-16 px-6 md:px-16">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-10 md:mb-14">
          <h1 className="font-cardo font-bold italic text-navy text-5xl md:text-7xl mb-3 md:mb-5">
            Gallery
          </h1>
          <p className="font-cardo italic text-navy/75 text-sm md:text-base max-w-md md:max-w-xl mx-auto leading-relaxed">
            Explore Sanji&rsquo;s signature designs, where timeless craftsmanship
            meets refined detail and modern elegance.
          </p>
        </header>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
          {galleryImages.map((src, i) => (
            <div
              key={i}
              className="relative w-full aspect-[3/4] overflow-hidden bg-light-bg group"
            >
              <Image
                src={src}
                alt={`Gallery image ${i + 1}`}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
