import { DEFAULT_TOP_BANNER } from '../lib/contentDefaults'

export default function TopBanner({ prefix, promoCode }) {
  const p = prefix?.trim() || DEFAULT_TOP_BANNER.prefix
  const c = promoCode?.trim() || DEFAULT_TOP_BANNER.promoCode

  return (
    <div className="bg-navy text-white font-cardo tracking-wider py-1.5 md:py-2 px-3 md:px-4">
      <div className="max-w-7xl mx-auto flex items-center justify-center">
        <p className="text-[11px] md:text-sm text-center leading-snug m-0">
          {p}
          <span className="font-bold whitespace-nowrap"> {c}</span>
        </p>
      </div>
    </div>
  )
}
