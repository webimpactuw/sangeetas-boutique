import Image from 'next/image'

/**
 * About page hero — Meet the Designer (Figma About Sanji's).
 */
export default function MeetTheDesigner({
  imageSrc = '/images/sanji-designer.png',
  imageAlt = 'Sanji in her studio with a dress on display',
}) {
  return (
    <section className="bg-cream py-12 md:py-20 px-6 md:px-16 lg:px-20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 lg:gap-20 items-center">
        <div>
          <p className="font-cardo text-navy text-xs md:text-sm uppercase tracking-[0.22em] mb-4 md:mb-5">
            Meet the Designer
          </p>
          <h1 className="font-cardo font-bold italic text-navy text-[2.75rem] sm:text-6xl lg:text-7xl leading-none mb-4 md:mb-5">
            Sanji
          </h1>
          <div className="w-18 md:w-20 h-px bg-navy mb-6 md:mb-8" aria-hidden />
          <p className="font-cardo text-navy text-base md:text-lg leading-relaxed mb-5 md:mb-6">
            Inspired by tradition and driven by a passion for detail, Sanji
            creates pieces that blend timeless craftsmanship with a modern,
            elegant perspective.
          </p>
          <p className="font-cardo text-navy text-base md:text-lg leading-relaxed">
            Her work celebrates both cultural heritage and personal
            expression, bringing traditional Indian artistry into contemporary
            life with grace and authenticity.
          </p>
        </div>

        <div className="relative w-full max-w-sm mx-auto md:max-w-none md:mx-0 aspect-417/424">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>
      </div>
    </section>
  )
}
