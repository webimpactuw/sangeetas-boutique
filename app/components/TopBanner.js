import { DEFAULT_TOP_BANNER } from '../lib/contentDefaults'

export default function TopBanner({ prefix, promoCode }) {
  const p = prefix?.trim() || DEFAULT_TOP_BANNER.prefix
  const c = promoCode?.trim() || DEFAULT_TOP_BANNER.promoCode

  return (
    <div className="bg-navy text-white text-center text-[11px] md:text-sm font-cardo tracking-wider py-1.5 md:py-2 px-2">
      {p}
      &nbsp;
      <span className="font-bold">{c}</span>
    </div>
  )
}
