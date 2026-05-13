import Image from 'next/image'
import Link from 'next/link'
import { DEFAULT_CRAFTSMANSHIP } from '../lib/contentDefaults'

/**
 * @param {{ heading?: string; body?: string; ctaLabel?: string; ctaHref?: string; image?: string; imageAlt?: string }} props
 */
export default function CraftsmanshipSection(props) {
  const heading = props.heading?.trim() || DEFAULT_CRAFTSMANSHIP.heading
  const body = props.body?.trim() || DEFAULT_CRAFTSMANSHIP.body
  const ctaLabel = props.ctaLabel?.trim() || DEFAULT_CRAFTSMANSHIP.ctaLabel
  const ctaHref = props.ctaHref?.trim() || DEFAULT_CRAFTSMANSHIP.ctaHref
  const image = props.image || DEFAULT_CRAFTSMANSHIP.image
  const imageAlt = props.imageAlt?.trim() || DEFAULT_CRAFTSMANSHIP.imageAlt

  return (
    <section className="bg-navy text-white">
      <div className="grid grid-cols-1 md:grid-cols-2 max-w-7xl mx-auto">
        <div className="relative w-full aspect-[4/3] md:aspect-auto md:min-h-[420px]">
          <Image
            src={image}
            alt={imageAlt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        <div className="flex flex-col justify-center px-6 md:px-14 py-10 md:py-16">
          <h2 className="font-cardo font-bold text-3xl md:text-5xl tracking-wide mb-4 md:mb-6">
            {heading}
          </h2>
          <p className="font-cardo italic text-white/85 text-sm md:text-base leading-relaxed max-w-md">
            {body}
          </p>
          <Link
            href={ctaHref}
            className="mt-6 md:mt-8 inline-block w-fit font-cardo text-white text-sm md:text-base border border-white/80 rounded-sm px-6 md:px-10 py-2.5 md:py-3 hover:bg-white hover:text-navy transition-colors"
          >
            {ctaLabel}
          </Link>
        </div>
      </div>
    </section>
  )
}
