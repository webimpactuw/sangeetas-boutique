import Image from 'next/image'
import Link from 'next/link'

export default function HeroBanner() {
  return (
    <section className="relative w-full h-[40vw] min-h-[200px] max-h-[500px] overflow-hidden">
      <Image
        src="/images/hero-main.png"
        alt="New collection"
        fill
        className="object-cover"
        priority
      />
      {/* Overlay text */}
      <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-16">
        <p className="font-cardo text-white text-lg md:text-5xl leading-snug">
          New Saris in
        </p>
        <Link
          href="#apparel"
          className="font-cardo font-bold text-white text-lg md:text-5xl underline underline-offset-4 hover:opacity-80 transition-opacity w-fit"
        >
          SHOP NOW
        </Link>
      </div>
    </section>
  )
}
