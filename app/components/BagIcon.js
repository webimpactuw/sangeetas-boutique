import Image from 'next/image'

/**
 * Shopping bag icon from design asset `bag.png`.
 * @param {{ className?: string; light?: boolean }} props
 * `light` — white bag on navy buttons (Add to Bag)
 */
export default function BagIcon({ className = 'w-5 h-5', light = false }) {
  return (
    <Image
      src="/images/bag.png"
      alt=""
      width={36}
      height={36}
      aria-hidden
      className={`object-contain pointer-events-none ${className} ${
        light ? 'brightness-0 invert' : ''
      }`}
    />
  )
}
