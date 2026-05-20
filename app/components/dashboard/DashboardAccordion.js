import Link from 'next/link'
import ChevronIcon from '@/app/components/auth/ChevronIcon'
import { DASHBOARD_LINKS } from '@/app/lib/auth/routes'

export default function DashboardAccordion() {
  return (
    <div className="w-full shadow-[0_4px_4px_rgba(0,0,0,0.15)] border border-[#828282]">
      {DASHBOARD_LINKS.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="flex items-center justify-between gap-3 px-4 md:px-6 py-3.5 md:py-4 border-b border-[#828282] last:border-b-0 bg-white hover:bg-cream-soft/40 transition-colors font-cardo text-navy text-lg md:text-xl"
        >
          <span>{item.label}</span>
          <ChevronIcon className="w-5 h-5 md:w-6 md:h-6 -rotate-90 shrink-0" />
        </Link>
      ))}
    </div>
  )
}
